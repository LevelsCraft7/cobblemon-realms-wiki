import fs from 'node:fs';
import path from 'node:path';
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

function pageTemplate({ title, body, nav, language, alternate }) {
  return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#191919">
  <title>${escapeHtml(title)} | Cobblemon Realms Wiki</title>
  <link rel="stylesheet" href="/assets/wiki.css?v=${buildVersion}">
  <script defer src="/assets/wiki.js?v=${buildVersion}"></script>
</head>
<body>
  <header class="topbar">
    <button id="menu" class="menu-button" type="button" aria-label="Ouvrir le menu">☰</button>
    <a class="brand" href="/${language === 'fr' ? 'fr-FR/' : ''}" aria-label="Cobblemon Realms Wiki">
      <span class="brand-mark" aria-hidden="true">C</span>
      <span class="brand-copy"><strong>Cobblemon Realms</strong><small>Wiki</small></span>
    </a>
    <div class="search-wrap">
      <span class="search-icon" aria-hidden="true"></span>
      <input id="search" type="search" autocomplete="off" spellcheck="false" placeholder="${language === 'fr' ? 'Rechercher dans le wiki…' : 'Search the wiki…'}" aria-label="${language === 'fr' ? 'Rechercher dans le wiki' : 'Search the wiki'}" aria-controls="search-results" aria-expanded="false">
      <kbd>Ctrl K</kbd>
      <div id="search-results" class="search-results" role="listbox" hidden></div>
    </div>
    <a class="language" href="${alternate.href}">${alternate.label}</a>
  </header>
  <div class="layout">
    <nav id="sidebar" aria-label="Wiki navigation">${nav}</nav>
    <main><article>${body}</article></main>
  </div>
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
  const outputRelative = relative.replace(/README\.md$/i, 'index.html').replace(/\.md$/i, '.html');
  const currentPath = `/${outputRelative}`;
  const alternatePath = isFrench ? `/${outputRelative.replace(/^fr-FR\//, '')}` : `/fr-FR/${outputRelative}`;
  const html = pageTemplate({
    title: firstHeading,
    body,
    nav: renderNav(isFrench ? navGroupsFr : navGroupsEn, currentPath),
    language: isFrench ? 'fr' : 'en',
    alternate: { href: alternatePath, label: isFrench ? 'EN' : 'FR' }
  });
  const destination = path.join(out, outputRelative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}

fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, 'search-index.json'), JSON.stringify(searchIndex));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('Wiki generated in dist/');
