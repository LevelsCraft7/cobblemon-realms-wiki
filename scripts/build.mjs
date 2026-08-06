import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { marked } from 'marked';

const root = process.cwd();
const out = path.join(root, 'dist');
const ignored = new Set(['.git', 'node_modules', 'dist', '.github', 'scripts']);
const buildVersion = Date.now().toString(36);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
}

function stripMarkdown(value = '') {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{%[^%]+%\}/g, ' ')
    .replace(/[`*_>#\[\](){}|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeHref(href, sourceDir) {
  if (/^(https?:|mailto:|#|\/\/)/i.test(href)) return href;
  const [target, hash = ''] = href.split('#');
  if (!target) return href;
  const resolved = path.posix.normalize(path.posix.join(sourceDir, target));
  const converted = resolved.endsWith('.md')
    ? resolved.replace(/README\.md$/i, 'index.html').replace(/\.md$/i, '.html')
    : resolved;
  return `/${converted}${hash ? `#${hash}` : ''}`;
}

marked.use({
  gfm: true,
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const current = this.options.sourceDir || '';
      const normalized = normalizeHref(href, current);
      return `<a href="${escapeHtml(normalized)}"${title ? ` title="${escapeHtml(title)}"` : ''}>${text}</a>`;
    }
  }
});

function renderGitBookMarkdown(source, sourceDir) {
  const blocks = [];
  let text = source.replace(/\{%\s*hint\s+style="([^"]+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g, (_, style, inner) => {
    const token = `@@GITBOOK_BLOCK_${blocks.length}@@`;
    marked.setOptions({ sourceDir });
    let innerHtml = marked.parse(inner.trim());
    innerHtml = innerHtml
      .replace(/^\s*<p>\s*<\/p>\s*/i, '')
      .replace(/\s*<p>\s*<\/p>\s*$/i, '');
    blocks.push(`<div class="hint hint-${escapeHtml(style)}">${innerHtml}</div>`);
    return `\n${token}\n`;
  });

  text = text.replace(/\{%\s*tabs\s*%\}|\{%\s*endtabs\s*%\}/g, '');
  text = text.replace(/\{%\s*tab\s+title="([^"]+)"\s*%\}/g, '\n### $1\n');
  text = text.replace(/\{%\s*endtab\s*%\}/g, '');
  text = text.replace(/\{%\s*stepper\s*%\}|\{%\s*endstepper\s*%\}/g, '');
  text = text.replace(/\{%\s*step\s*%\}/g, '\n<div class="step">\n');
  text = text.replace(/\{%\s*endstep\s*%\}/g, '\n</div>\n');
  text = text.replace(/\{%\s*[^%]+\s*%\}/g, '');

  marked.setOptions({ sourceDir });
  let html = marked.parse(text);
  blocks.forEach((block, index) => {
    const token = `@@GITBOOK_BLOCK_${index}@@`;
    html = html.replace(new RegExp(`<p>\\s*${token}\\s*<\\/p>`), block);
    html = html.replace(token, block);
  });
  return html;
}

function pageHref(relative) {
  return `/${relative.replace(/README\.md$/i, 'index.html').replace(/\.md$/i, '.html')}`;
}

function parseSummary(summaryPath, prefix = '') {
  if (!fs.existsSync(summaryPath)) return [];
  const lines = fs.readFileSync(summaryPath, 'utf8').split(/\r?\n/);
  const groups = [];
  let current = { title: 'Pages', items: [] };

  for (const line of lines) {
    const section = line.match(/^##\s+(.+)/);
    if (section) {
      if (current.items.length) groups.push(current);
      current = { title: section[1], items: [] };
      continue;
    }
    const link = line.match(/^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (!link) continue;
    const depth = Math.floor(link[1].length / 2);
    const raw = path.posix.join(prefix, link[3]);
    current.items.push({ depth, href: pageHref(raw), label: link[2] });
  }
  if (current.items.length) groups.push(current);
  return groups;
}

function renderNav(groups, currentPath) {
  return groups.map((group, index) => {
    const active = group.items.some((item) => item.href === currentPath);
    const open = active || index < 3;
    const items = group.items.map((item) => {
      const activeClass = item.href === currentPath ? ' class="active" aria-current="page"' : '';
      return `<li style="--depth:${item.depth}"><a href="${item.href}"${activeClass}>${escapeHtml(item.label)}</a></li>`;
    }).join('\n');
    return `<details class="nav-group"${open ? ' open' : ''}>
      <summary><span>${escapeHtml(group.title)}</span><span class="nav-chevron" aria-hidden="true"></span></summary>
      <ul>${items}</ul>
    </details>`;
  }).join('\n');
}

function renderCredits(language) {
  const french = language === 'fr';
  return `<footer class="sidebar-credits" aria-label="${french ? 'Crédits du wiki' : 'Wiki credits'}">
    <div class="sidebar-credits-title">
      <span class="sidebar-credits-mark" aria-hidden="true">C</span>
      <span>${french ? 'Crédits du wiki' : 'Wiki Credits'}</span>
    </div>
    <div class="sidebar-credit-person">
      <a class="sidebar-credit-link" href="https://www.curseforge.com/members/levelsfr/projects" target="_blank" rel="noopener noreferrer">
        <strong>LevelsFR</strong>
      </a>
      <small>${french ? 'Créateur de Cobblemon Realms' : 'Creator of Cobblemon Realms'}</small>
    </div>
    <div class="sidebar-credit-person">
      <strong>FabLeKebab</strong>
      <small>${french ? 'Gestion et contribution principale du wiki' : 'Wiki management and primary contributor'}</small>
    </div>
  </footer>`;
}

function getLastUpdated(file) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  try {
    const value = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', relative],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    if (value) {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) return date;
    }
  } catch {
    // A deployment may not expose the complete Git history.
  }
  return fs.statSync(file).mtime;
}

function formatUpdatedDate(date, language) {
  return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

const markdownFiles = walk(root).filter((file) => {
  const relative = path.relative(root, file).split(path.sep).join('/');
  return relative.endsWith('.md') && relative !== 'SUMMARY.md' && relative !== 'fr-FR/SUMMARY.md';
});

const searchIndex = markdownFiles.map((file) => {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const raw = fs.readFileSync(file, 'utf8');
  const title = raw.match(/^#\s+(.+)$/m)?.[1]?.replace(/\*\*/g, '') || path.basename(relative, '.md');
  return {
    title: stripMarkdown(title),
    href: pageHref(relative),
    text: stripMarkdown(raw).slice(0, 8000),
    language: relative.startsWith('fr-FR/') ? 'fr' : 'en'
  };
});

const navGroupsEn = parseSummary(path.join(root, 'SUMMARY.md'));
const navGroupsFr = parseSummary(path.join(root, 'fr-FR', 'SUMMARY.md'), 'fr-FR');

function pageTemplate({ title, body, nav, language, alternate, updatedIso, updatedLabel }) {
  const french = language === 'fr';
  const themeLabel = french ? 'Activer le mode jour' : 'Enable light mode';
  return `<!doctype html>
<html lang="${language}" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#191919">
  <title>${escapeHtml(title)} | Cobblemon Realms Wiki</title>
  <script>(()=>{try{const t=localStorage.getItem('cobblemon-wiki-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}})();</script>
  <link rel="stylesheet" href="/assets/wiki.css?v=${buildVersion}">
  <link rel="stylesheet" href="/assets/wiki-enhancements.css?v=${buildVersion}">
  <script defer src="/assets/wiki.js?v=${buildVersion}"></script>
  <script defer src="/assets/wiki-enhancements.js?v=${buildVersion}"></script>
</head>
<body>
  <div id="reading-progress" class="reading-progress" aria-hidden="true"><span></span></div>
  <header class="topbar">
    <button id="menu" class="menu-button" type="button" aria-label="${french ? 'Ouvrir le menu' : 'Open menu'}">☰</button>
    <a class="brand" href="/${french ? 'fr-FR/' : ''}" aria-label="Cobblemon Realms Wiki">
      <img class="brand-logo" src="/assets/cobblemon-realms-server-icon.svg?v=brand-1" width="34" height="34" alt="">
      <span class="brand-copy"><strong>Cobblemon Realms</strong><small>Wiki</small></span>
    </a>
    <div class="search-wrap">
      <span class="search-icon" aria-hidden="true"></span>
      <input id="search" type="search" autocomplete="off" spellcheck="false" placeholder="${french ? 'Rechercher dans le wiki…' : 'Search the wiki…'}" aria-label="${french ? 'Rechercher dans le wiki' : 'Search the wiki'}" aria-controls="search-results" aria-expanded="false">
      <kbd>Ctrl K</kbd>
      <div id="search-results" class="search-results" role="listbox" hidden></div>
    </div>
    <a class="language" href="${alternate.href}">${alternate.label}</a>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="${themeLabel}" aria-pressed="false" title="${themeLabel}">
      <span class="theme-icon theme-icon-sun" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path></svg></span>
      <span class="theme-icon theme-icon-moon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path></svg></span>
    </button>
  </header>
  <div class="layout">
    <nav id="sidebar" aria-label="${french ? 'Navigation du wiki' : 'Wiki navigation'}">
      <div class="sidebar-navigation">${nav}</div>
      ${renderCredits(language)}
    </nav>
    <main>
      <article>
        ${body}
        <footer class="article-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 8v4l2.5 1.5"></path><circle cx="12" cy="12" r="8.5"></circle></svg>
          <span>${french ? 'Dernière mise à jour' : 'Last updated'} <time datetime="${escapeHtml(updatedIso)}">${escapeHtml(updatedLabel)}</time></span>
        </footer>
      </article>
    </main>
    <aside id="page-toc" class="page-toc" aria-label="${french ? 'Sommaire de cette page' : 'On this page'}">
      <strong class="page-toc-title">${french ? 'Sur cette page' : 'On this page'}</strong>
      <nav></nav>
    </aside>
  </div>
  <button id="back-to-top" class="back-to-top" type="button" aria-label="${french ? 'Retour en haut' : 'Back to top'}" title="${french ? 'Retour en haut' : 'Back to top'}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 14 6-6 6 6"></path></svg>
  </button>
</body>
</html>`;
}

for (const file of walk(root)) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  if (relative === 'SUMMARY.md' || relative === 'fr-FR/SUMMARY.md') continue;

  if (!relative.endsWith('.md')) {
    const destination = path.join(out, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(file, destination);
    continue;
  }

  const sourceDir = path.posix.dirname(relative) === '.' ? '' : path.posix.dirname(relative);
  const raw = fs.readFileSync(file, 'utf8');
  const body = renderGitBookMarkdown(raw, sourceDir);
  const firstHeading = raw.match(/^#\s+(.+)$/m)?.[1]?.replace(/\*\*/g, '') || 'Cobblemon Realms Wiki';
  const isFrench = relative.startsWith('fr-FR/');
  const language = isFrench ? 'fr' : 'en';
  const outputRelative = relative.replace(/README\.md$/i, 'index.html').replace(/\.md$/i, '.html');
  const currentPath = `/${outputRelative}`;
  const alternatePath = isFrench ? `/${outputRelative.replace(/^fr-FR\//, '')}` : `/fr-FR/${outputRelative}`;
  const updatedDate = getLastUpdated(file);
  const html = pageTemplate({
    title: firstHeading,
    body,
    nav: renderNav(isFrench ? navGroupsFr : navGroupsEn, currentPath),
    language,
    alternate: { href: alternatePath, label: isFrench ? 'EN' : 'FR' },
    updatedIso: updatedDate.toISOString(),
    updatedLabel: formatUpdatedDate(updatedDate, language)
  });
  const destination = path.join(out, outputRelative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}

fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, 'search-index.json'), JSON.stringify(searchIndex));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('Wiki generated in dist/');
