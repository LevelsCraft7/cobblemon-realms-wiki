import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const out = path.join(root, 'dist');
const siteOrigin = 'https://wiki.cobblemon-realms.com';
const assetVersion = Date.now().toString(36);

function runGit(args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore']
  }).trim();
}

function ensureCompleteGitHistory() {
  try {
    const shallow = runGit(['rev-parse', '--is-shallow-repository']);
    if (shallow !== 'true') return true;

    try {
      runGit(['fetch', '--unshallow', '--quiet', 'origin', 'main']);
    } catch {
      runGit(['fetch', '--quiet', '--depth=1000', 'origin', 'main']);
    }

    return runGit(['rev-parse', '--is-shallow-repository']) === 'false';
  } catch {
    return false;
  }
}

function resolveCommitSha() {
  const environmentSha = process.env.CF_PAGES_COMMIT_SHA
    || process.env.CLOUDFLARE_COMMIT_SHA
    || process.env.GITHUB_SHA;
  if (environmentSha) return environmentSha;

  try {
    return runGit(['rev-parse', 'HEAD']);
  } catch {
    return 'unknown';
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function canonicalPath(relativePath) {
  let urlPath = `/${relativePath.split(path.sep).join('/')}`;
  if (urlPath === '/index.html') return '/';
  if (urlPath.endsWith('/index.html')) return urlPath.slice(0, -'index.html'.length);
  return urlPath.replace(/\.html$/i, '');
}

function markdownSourceForHtml(relativePath) {
  const normalized = relativePath.split(path.sep).join('/');
  if (normalized === '404.html') return null;
  if (normalized === 'index.html') return 'README.md';
  if (normalized.endsWith('/index.html')) return normalized.replace(/index\.html$/i, 'README.md');
  return normalized.replace(/\.html$/i, '.md');
}

function getRealLastUpdated(sourcePath) {
  if (!sourcePath || !fs.existsSync(path.join(root, sourcePath))) return null;

  try {
    const value = runGit(['log', '-1', '--follow', '--format=%cI', '--', sourcePath]);
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

function formatUpdatedDate(date, language) {
  return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function replaceArticleDate(html, date, language) {
  const timePattern = /<time\s+datetime="[^"]*">[\s\S]*?<\/time>/i;
  if (!timePattern.test(html)) return html;

  if (!date) {
    const unavailable = language === 'fr'
      ? 'Historique Git indisponible'
      : 'Git history unavailable';
    return html.replace(timePattern, `<span class="article-updated-unavailable">${unavailable}</span>`);
  }

  return html.replace(
    timePattern,
    `<time datetime="${date.toISOString()}">${formatUpdatedDate(date, language)}</time>`
  );
}

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeEntities(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function extractTitle(html, fallback) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (h1) return decodeEntities(stripHtml(h1));
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return decodeEntities(stripHtml(title || fallback));
}

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
  }[character]));
}

const gitHistoryComplete = ensureCompleteGitHistory();
const commitSha = resolveCommitSha();
const builtAt = new Date().toISOString();
const htmlFiles = walk(out).filter((file) => file.endsWith('.html'));
const sitemapEntries = [];
const pageUpdates = [];
let datedPages = 0;
let unavailableDates = 0;

const pageMetaSource = path.join(root, 'page-meta.json');
if (fs.existsSync(pageMetaSource)) {
  fs.copyFileSync(pageMetaSource, path.join(out, 'page-meta.json'));
}

for (const file of htmlFiles) {
  const relative = path.relative(out, file);
  const normalizedRelative = relative.split(path.sep).join('/');
  const pagePath = canonicalPath(relative);
  const canonicalUrl = `${siteOrigin}${pagePath}`;
  const sourcePath = markdownSourceForHtml(relative);
  const language = normalizedRelative.startsWith('fr-FR/') ? 'fr' : 'en';
  const updatedDate = getRealLastUpdated(sourcePath);
  let html = fs.readFileSync(file, 'utf8');

  if (sourcePath) {
    html = replaceArticleDate(html, updatedDate, language);
    if (updatedDate) datedPages += 1;
    else unavailableDates += 1;

    pageUpdates.push({
      title: extractTitle(html, pagePath),
      path: pagePath,
      source: sourcePath,
      language,
      updatedAt: updatedDate ? updatedDate.toISOString() : null
    });
  }

  const headAssets = [
    `<link rel="canonical" href="${canonicalUrl}">`,
    `<meta name="wiki-build" content="${commitSha}">`,
    '<link rel="icon" href="/assets/cobblemon-realms-server-icon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/assets/cobblemon-realms-server-icon.svg">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<meta name="application-name" content="Cobblemon Realms Wiki">',
    '<meta name="mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    `<link rel="stylesheet" href="/assets/site-features.css?v=${assetVersion}">`,
    `<link rel="stylesheet" href="/assets/search-filter-polish.css?v=${assetVersion}">`,
    `<link rel="stylesheet" href="/assets/page-toc-collapse.css?v=${assetVersion}">`,
    `<link rel="stylesheet" href="/assets/page-meta-badges.css?v=${assetVersion}">`,
    `<link rel="stylesheet" href="/assets/section-links.css?v=${assetVersion}">`,
    `<link rel="stylesheet" href="/assets/wiki-feedback.css?v=${assetVersion}">`,
    `<script defer src="/assets/site-features.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/page-meta-badges.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/search-filter-polish.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/page-toc-collapse.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/section-links.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/wiki-feedback.js?v=${assetVersion}"></script>`
  ].join('\n  ');

  html = html.replace('</head>', `  ${headAssets}\n</head>`);
  fs.writeFileSync(file, html);

  if (normalizedRelative !== '404.html') {
    sitemapEntries.push({
      url: canonicalUrl,
      lastmod: updatedDate ? updatedDate.toISOString().slice(0, 10) : null
    });
  }
}

sitemapEntries.sort((a, b) => a.url.localeCompare(b.url));
pageUpdates.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')) || a.path.localeCompare(b.path));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map((entry) => `  <url>\n    <loc>${escapeXml(entry.url)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'page-updates.json'), JSON.stringify(pageUpdates, null, 2));
fs.writeFileSync(path.join(out, 'build-info.json'), JSON.stringify({
  commit: commitSha,
  builtAt,
  gitHistoryComplete,
  pageDates: {
    verified: datedPages,
    unavailable: unavailableDates
  },
  pages: pageUpdates.length,
  features: [
    'article-pagination',
    'smart-search',
    'smart-search-categories',
    'polished-search-filters',
    'technical-badges',
    'custom-404',
    'version-history',
    'anonymous-analytics',
    'verified-git-page-dates',
    'hierarchical-breadcrumbs',
    'local-favorites',
    'recent-pages',
    'image-lightbox',
    'collapsible-page-toc',
    'page-meta-config',
    'section-link-copy',
    'article-feedback',
    'page-update-index',
    'admin-dashboard'
  ]
}, null, 2));

console.log(`SEO and interface enhancements added to ${htmlFiles.length} pages for ${commitSha}.`);
console.log(`Verified Git dates: ${datedPages}; unavailable dates: ${unavailableDates}; complete history: ${gitHistoryComplete}.`);
