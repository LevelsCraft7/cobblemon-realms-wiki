import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
const siteOrigin = 'https://wiki.cobblemon-realms.com';
const assetVersion = Date.now().toString(36);

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

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
  }[character]));
}

const htmlFiles = walk(out).filter((file) => file.endsWith('.html'));
const sitemapEntries = [];

for (const file of htmlFiles) {
  const relative = path.relative(out, file);
  const pagePath = canonicalPath(relative);
  const canonicalUrl = `${siteOrigin}${pagePath}`;
  let html = fs.readFileSync(file, 'utf8');

  const headAssets = [
    `<link rel="canonical" href="${canonicalUrl}">`,
    '<link rel="icon" href="/assets/cobblemon-realms-server-icon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/assets/cobblemon-realms-server-icon.svg">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<meta name="application-name" content="Cobblemon Realms Wiki">',
    '<meta name="mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    `<link rel="stylesheet" href="/assets/site-features.css?v=${assetVersion}">`,
    `<script defer src="/assets/site-features.js?v=${assetVersion}"></script>`
  ].join('\n  ');

  html = html.replace('</head>', `  ${headAssets}\n</head>`);
  fs.writeFileSync(file, html);

  const updated = html.match(/<time\s+datetime="([^"]+)"/i)?.[1];
  sitemapEntries.push({
    url: canonicalUrl,
    lastmod: updated && !Number.isNaN(Date.parse(updated)) ? new Date(updated).toISOString().slice(0, 10) : null
  });
}

sitemapEntries.sort((a, b) => a.url.localeCompare(b.url));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map((entry) => `  <url>\n    <loc>${escapeXml(entry.url)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
console.log(`SEO and interface enhancements added to ${htmlFiles.length} pages.`);
