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

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
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

function transformGitBook(source) {
  let text = source;
  text = text.replace(/\{%\s*hint\s+style="([^"]+)"\s*%\}/g, '<div class="hint hint-$1">');
  text = text.replace(/\{%\s*endhint\s*%\}/g, '</div>');
  text = text.replace(/\{%\s*tabs\s*%\}|\{%\s*endtabs\s*%\}/g, '');
  text = text.replace(/\{%\s*tab\s+title="([^"]+)"\s*%\}/g, '\n### $1\n');
  text = text.replace(/\{%\s*endtab\s*%\}/g, '');
  text = text.replace(/\{%\s*stepper\s*%\}|\{%\s*endstepper\s*%\}/g, '');
  text = text.replace(/\{%\s*step\s*%\}/g, '\n<div class="step">\n');
  text = text.replace(/\{%\s*endstep\s*%\}/g, '\n</div>\n');
  text = text.replace(/\{%\s*[^%]+\s*%\}/g, '');
  return text;
}

function parseSummary(summaryPath, prefix = '') {
  if (!fs.existsSync(summaryPath)) return '';
  const lines = fs.readFileSync(summaryPath, 'utf8').split(/\r?\n/);
  const items = [];
  for (const line of lines) {
    const section = line.match(/^##\s+(.+)/);
    if (section) {
      items.push(`<li class="nav-section">${escapeHtml(section[1])}</li>`);
      continue;
    }
    const link = line.match(/^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (!link) continue;
    const depth = Math.floor(link[1].length / 2);
    const raw = path.posix.join(prefix, link[3]);
    const href = `/${raw.replace(/README\.md$/i, 'index.html').replace(/\.md$/i, '.html')}`;
    items.push(`<li style="--depth:${depth}"><a href="${href}">${escapeHtml(link[2])}</a></li>`);
  }
  return `<ul>${items.join('\n')}</ul>`;
}

const navEn = parseSummary(path.join(root, 'SUMMARY.md'));
const navFr = parseSummary(path.join(root, 'fr-FR', 'SUMMARY.md'), 'fr-FR');

function pageTemplate({ title, body, nav, language, alternate }) {
  return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#151a24">
  <title>${escapeHtml(title)} | Cobblemon Realms Wiki</title>
  <link rel="stylesheet" href="/assets/wiki.css">
</head>
<body>
  <header class="topbar">
    <button id="menu" aria-label="Ouvrir le menu">☰</button>
    <a class="brand" href="/${language === 'fr' ? 'fr-FR/' : ''}">Cobblemon Realms Wiki</a>
    <a class="language" href="${alternate.href}">${alternate.label}</a>
  </header>
  <div class="layout">
    <aside id="sidebar">${nav}</aside>
    <main><article>${body}</article></main>
  </div>
  <script>
    document.getElementById('menu').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  </script>
</body>
</html>`;
}

marked.use({
  gfm: true,
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const current = this.options.sourceDir || '';
      const normalized = normalizeHref(href, current);
      return `<a href="${normalized}"${title ? ` title="${escapeHtml(title)}"` : ''}>${text}</a>`;
    }
  }
});

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
  const transformed = transformGitBook(raw);
  marked.setOptions({ sourceDir });
  const body = marked.parse(transformed);
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
fs.writeFileSync(path.join(out, 'CNAME'), 'wiki.cobblemon-realms.com\n');
console.log('Wiki generated in dist/');
