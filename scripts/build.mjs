import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const root = process.cwd();
const out = path.join(root, 'dist');
const ignored = new Set(['.git', 'node_modules', 'dist', '.github', 'scripts']);

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
    const innerHtml = marked.parse(inner.trim());
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
    html = html.replace(`<p>@@GITBOOK_BLOCK_${index}@@</p>`, block);
    html = html.replace(`@@GITBOOK_BLOCK_${index}@@`, block);
  });
  return html;
}

function pageHref(relative) {
  return `/${relative.replace(/README\.md$/i, 'index.html').replace(/\.md$/i, '.html')}`;
}

function parseSummary(summaryPath, prefix = '') {
  if (!fs.existsSync(summaryPath)) return '';
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
    current.items.push({
      depth,
      href: pageHref(raw),
      label: link[2]
    });
  }
  if (current.items.length) groups.push(current);

  return groups.map((group, index) => `
    <section class="nav-group" data-nav-group>
      <button class="nav-section" type="button" aria-expanded="${index < 3 ? 'true' : 'false'}">
        <span>${escapeHtml(group.title)}</span><span class="nav-chevron">⌄</span>
      </button>
      <ul${index < 3 ? '' : ' hidden'}>
        ${group.items.map((item) => `<li style="--depth:${item.depth}"><a href="${item.href}">${escapeHtml(item.label)}</a></li>`).join('\n')}
      </ul>
    </section>`).join('\n');
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
    text: stripMarkdown(raw).slice(0, 5000),
    language: relative.startsWith('fr-FR/') ? 'fr' : 'en'
  };
});

const navEn = parseSummary(path.join(root, 'SUMMARY.md'));
const navFr = parseSummary(path.join(root, 'fr-FR', 'SUMMARY.md'), 'fr-FR');

function pageTemplate({ title, body, nav, language, alternate }) {
  const serializedSearch = JSON.stringify(searchIndex).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#191919">
  <title>${escapeHtml(title)} | Cobblemon Realms Wiki</title>
  <link rel="stylesheet" href="/assets/wiki.css">
</head>
<body>
  <header class="topbar">
    <button id="menu" aria-label="Ouvrir le menu">☰</button>
    <a class="brand" href="/${language === 'fr' ? 'fr-FR/' : ''}">Cobblemon Realms</a>
    <div class="search-wrap">
      <input id="search" type="search" autocomplete="off" placeholder="${language === 'fr' ? 'Rechercher dans le wiki…' : 'Search the wiki…'}" aria-label="Rechercher">
      <kbd>Ctrl K</kbd>
      <div id="search-results" class="search-results" hidden></div>
    </div>
    <a class="language" href="${alternate.href}">${alternate.label}</a>
  </header>
  <div class="layout">
    <aside id="sidebar">${nav}</aside>
    <main><article>${body}</article></main>
  </div>
  <script>
    const SEARCH_INDEX = ${serializedSearch};
    const language = document.documentElement.lang;
    const input = document.getElementById('search');
    const results = document.getElementById('search-results');

    document.getElementById('menu').addEventListener('click', () => document.body.classList.toggle('menu-open'));

    document.querySelectorAll('[data-nav-group] > .nav-section').forEach((button) => {
      button.addEventListener('click', () => {
        const list = button.nextElementSibling;
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        list.hidden = expanded;
      });
    });

    const currentPath = location.pathname.replace(/\/$/, '/index.html');
    document.querySelectorAll('#sidebar a').forEach((link) => {
      const linkPath = new URL(link.href).pathname.replace(/\/$/, '/index.html');
      if (linkPath === currentPath) {
        link.classList.add('active');
        const group = link.closest('[data-nav-group]');
        if (group) {
          group.querySelector('ul').hidden = false;
          group.querySelector('.nav-section').setAttribute('aria-expanded', 'true');
        }
      }
    });

    function closeSearch() {
      results.hidden = true;
      results.innerHTML = '';
    }

    function runSearch() {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) return closeSearch();
      const matches = SEARCH_INDEX
        .filter((entry) => entry.language === language)
        .map((entry) => {
          const title = entry.title.toLowerCase();
          const text = entry.text.toLowerCase();
          let score = 0;
          if (title === query) score += 100;
          if (title.startsWith(query)) score += 50;
          if (title.includes(query)) score += 25;
          if (text.includes(query)) score += 5;
          return { ...entry, score };
        })
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      results.innerHTML = matches.length
        ? matches.map((entry) => '<a href="' + entry.href + '"><strong>' + entry.title + '</strong><span>' + entry.href + '</span></a>').join('')
        : '<div class="search-empty">${language === 'fr' ? 'Aucun résultat' : 'No results'}</div>';
      results.hidden = false;
    }

    input.addEventListener('input', runSearch);
    input.addEventListener('focus', runSearch);
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.search-wrap')) closeSearch();
    });
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.focus();
        input.select();
      }
      if (event.key === 'Escape') closeSearch();
    });
  </script>
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
  const alternatePath = isFrench ? `/${outputRelative.replace(/^fr-FR\//, '')}` : `/fr-FR/${outputRelative}`;
  const html = pageTemplate({
    title: firstHeading,
    body,
    nav: isFrench ? navFr : navEn,
    language: isFrench ? 'fr' : 'en',
    alternate: { href: alternatePath, label: isFrench ? 'EN' : 'FR' }
  });
  const destination = path.join(out, outputRelative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}

fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('Wiki generated in dist/');
