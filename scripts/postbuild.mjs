import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const out = path.join(root, 'dist');
const siteOrigin = 'https://wiki.cobblemon-realms.com';
const assetVersion = Date.now().toString(36);

const searchSynonymGroups = [
  ['installation', 'installer', 'install', 'setup', 'configuration'],
  ['server', 'serveur', 'multiplayer', 'multijoueur', 'hosting', 'hebergement'],
  ['pokemon', 'pokémon', 'creature', 'créature', 'mob'],
  ['spawn', 'spawns', 'apparition', 'apparitions', 'encounter', 'rencontre'],
  ['breeding', 'breed', 'reproduction', 'elevage', 'élevage', 'egg', 'eggs', 'oeuf', 'oeufs'],
  ['evolution', 'évolution', 'evolve', 'evoluer', 'évoluer'],
  ['craft', 'crafting', 'recipe', 'recipes', 'recette', 'recettes', 'fabrication'],
  ['command', 'commands', 'commande', 'commandes'],
  ['raid', 'raids', 'den', 'dens', 'antre', 'antres'],
  ['storage', 'stockage', 'inventory', 'inventaire'],
  ['season', 'seasons', 'saison', 'saisons'],
  ['biome', 'biomes'],
  ['trade', 'trading', 'exchange', 'echange', 'échange'],
  ['quest', 'quests', 'quete', 'quêtes', 'mission'],
  ['legendary', 'legendaire', 'légendaire', 'mythical', 'mythique'],
  ['performance', 'optimize', 'optimisation', 'lag', 'fps'],
  ['dimension', 'world', 'monde', 'realm'],
  ['item', 'items', 'objet', 'objets'],
  ['form', 'forms', 'forme', 'formes', 'appearance', 'apparence'],
  ['starter', 'starters', 'depart', 'départ'],
  ['version', 'versions', 'changelog', 'history', 'historique', 'update', 'mise a jour', 'mise à jour'],
  ['bug', 'issue', 'report', 'signaler', 'probleme', 'problème', 'support']
];

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
  return value.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function normalizeSearchText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function enrichSearchIndex() {
  const searchIndexPath = path.join(out, 'search-index.json');
  if (!fs.existsSync(searchIndexPath)) return 0;

  let entries;
  try {
    entries = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  } catch {
    return 0;
  }
  if (!Array.isArray(entries)) return 0;

  let enriched = 0;
  for (const entry of entries) {
    const haystack = normalizeSearchText(`${entry.title || ''} ${entry.text || ''}`);
    const aliases = new Set();
    for (const group of searchSynonymGroups) {
      const normalized = group.map(normalizeSearchText).filter(Boolean);
      if (!normalized.some((term) => haystack.includes(term))) continue;
      normalized.forEach((term) => aliases.add(term));
    }
    if (!aliases.size) continue;
    entry.aliases = [...aliases].join(' ');
    entry.text = `${entry.text || ''} ${entry.aliases}`.trim();
    enriched += 1;
  }

  fs.writeFileSync(searchIndexPath, JSON.stringify(entries));
  return enriched;
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

function normalizedPagePath(value) {
  try {
    const url = new URL(value, siteOrigin);
    return url.pathname
      .replace(/\/index(?:\.html)?$/i, '/')
      .replace(/\.html$/i, '')
      .replace(/\/$/, '') || '/';
  } catch {
    return '/';
  }
}

function extractAttributeValues(html, attribute) {
  const values = [];
  const pattern = new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, 'gi');
  let match;
  while ((match = pattern.exec(html))) values.push(match[1]);
  return values;
}

function articleHtml(html) {
  return html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] || '';
}

function pageWordCount(html) {
  return stripHtml(articleHtml(html)).split(/\s+/).filter(Boolean).length;
}

function resolveInternalLink(href, sourcePath) {
  if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  try {
    const base = new URL(sourcePath === '/' ? '/' : sourcePath, siteOrigin);
    const url = new URL(href, base);
    if (url.origin !== siteOrigin) return null;
    if (/^\/(assets|api|__cr-admin)(\/|$)/.test(url.pathname)) return null;
    return normalizedPagePath(url.pathname);
  } catch {
    return null;
  }
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(href || '');
}

function buildAuditReport(pageRecords, pageMetaBase, commit) {
  const pagePaths = new Set(pageRecords.map((page) => normalizedPagePath(page.path)));
  const inbound = new Map([...pagePaths].map((pagePath) => [pagePath, 0]));
  const brokenMap = new Map();
  const malformedExternal = [];
  const imageIssues = [];
  const contentWarnings = [];
  const sourceWarnings = [];
  const titleGroups = new Map();

  for (const page of pageRecords) {
    const currentPath = normalizedPagePath(page.path);
    const titleKey = `${page.language}:${normalizeSearchText(page.title)}`;
    const titleList = titleGroups.get(titleKey) || [];
    titleList.push(page.path);
    titleGroups.set(titleKey, titleList);

    if (!page.sourceExists) {
      sourceWarnings.push({ type: 'generated-without-source', path: page.path, source: page.source || '', severity: 'critical' });
    }

    if (page.wordCount < 120) contentWarnings.push({ type: 'very-short', path: page.path, title: page.title, value: page.wordCount, severity: 'info' });
    if (page.h2Count === 0 && page.wordCount >= 120) contentWarnings.push({ type: 'no-sections', path: page.path, title: page.title, severity: 'info' });
    if (page.internalLinks.length === 0 && currentPath !== '/') contentWarnings.push({ type: 'no-internal-link', path: page.path, title: page.title, severity: 'info' });
    if (!page.hasDescription) contentWarnings.push({ type: 'missing-description', path: page.path, title: page.title, severity: 'info' });

    for (const href of page.hrefs) {
      if (isExternalHref(href)) {
        try { new URL(href); } catch { malformedExternal.push({ source: page.path, href, severity: 'warning' }); }
        continue;
      }
      const destination = resolveInternalLink(href, page.path);
      if (!destination || destination === currentPath) continue;
      if (pagePaths.has(destination)) {
        inbound.set(destination, (inbound.get(destination) || 0) + 1);
        continue;
      }
      const item = brokenMap.get(destination) || { destination, sources: [], hits: 0, severity: 'critical' };
      item.hits += 1;
      if (!item.sources.includes(page.path)) item.sources.push(page.path);
      brokenMap.set(destination, item);
    }

    for (const src of page.imageSources) {
      if (/^(https?:|data:)/i.test(src)) continue;
      try {
        const pageDir = path.dirname(page.outputFile);
        const cleanSrc = src.split('#')[0].split('?')[0];
        const target = cleanSrc.startsWith('/') ? path.join(out, cleanSrc.replace(/^\//, '')) : path.resolve(pageDir, cleanSrc);
        if (!fs.existsSync(target)) imageIssues.push({ source: page.path, image: src, severity: 'warning' });
      } catch {}
    }
  }

  const orphanPages = pageRecords
    .filter((page) => normalizedPagePath(page.path) !== '/' && (inbound.get(normalizedPagePath(page.path)) || 0) === 0)
    .map((page) => ({ path: page.path, title: page.title, language: page.language, severity: 'warning' }));

  const duplicateTitles = [...titleGroups.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([key, paths]) => ({ title: key.split(':').slice(1).join(':'), language: key.split(':')[0], paths, severity: 'warning' }));

  const enPaths = new Set(pageRecords
    .filter((page) => page.language === 'en')
    .map((page) => normalizedPagePath(page.path)));
  const frPaths = new Set(pageRecords
    .filter((page) => page.language === 'fr')
    .map((page) => {
      const normalized = normalizedPagePath(page.path);
      return normalized.replace(/^\/fr-FR(?=\/|$)/i, '') || '/';
    }));
  const missingFr = [...enPaths]
    .filter((pagePath) => !frPaths.has(pagePath))
    .map((pagePath) => ({ path: pagePath, expected: pagePath === '/' ? '/fr-FR/' : `/fr-FR${pagePath}`, severity: 'warning' }));
  const missingEn = [...frPaths]
    .filter((pagePath) => !enPaths.has(pagePath))
    .map((pagePath) => ({ path: pagePath === '/' ? '/fr-FR/' : `/fr-FR${pagePath}`, expected: pagePath, severity: 'warning' }));

  const markdownFiles = walk(root)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => {
      const rel = path.relative(root, file).split(path.sep).join('/');
      return !/^(dist|node_modules|\.git|\.github|assets|scripts)\//.test(rel);
    })
    .map((file) => path.relative(root, file).split(path.sep).join('/'));
  const sourceSet = new Set(pageRecords.map((page) => page.source).filter(Boolean));
  const markdownWithoutPage = markdownFiles
    .filter((file) => !sourceSet.has(file))
    .map((source) => ({ source, severity: 'info' }));

  const knownStatuses = new Set(['verified-v6', 'needs-review', 'legacy-5', 'draft', 'unknown']);
  const knownBadges = new Set(Object.keys(pageMetaBase?.labels?.en?.badges || {}));
  const metaIssues = [];
  if (pageMetaBase?.defaults?.status && !knownStatuses.has(pageMetaBase.defaults.status)) metaIssues.push({ type: 'invalid-default-status', value: pageMetaBase.defaults.status, severity: 'critical' });
  for (const badge of pageMetaBase?.defaults?.badges || []) if (!knownBadges.has(badge)) metaIssues.push({ type: 'invalid-default-badge', value: badge, severity: 'warning' });
  for (const [index, rule] of (pageMetaBase?.rules || []).entries()) {
    try { new RegExp(rule.match); } catch { metaIssues.push({ type: 'invalid-rule-regex', value: String(rule.match || ''), rule: index, severity: 'critical' }); }
    if (rule.status && !knownStatuses.has(rule.status)) metaIssues.push({ type: 'invalid-rule-status', value: rule.status, rule: index, severity: 'critical' });
    for (const badge of rule.badges || []) if (!knownBadges.has(badge)) metaIssues.push({ type: 'invalid-rule-badge', value: badge, rule: index, severity: 'warning' });
  }

  const brokenLinks = [...brokenMap.values()].sort((a, b) => b.hits - a.hits || a.destination.localeCompare(b.destination));
  const allIssues = [
    ...brokenLinks,
    ...imageIssues,
    ...sourceWarnings,
    ...malformedExternal,
    ...orphanPages,
    ...duplicateTitles,
    ...missingFr,
    ...missingEn,
    ...contentWarnings,
    ...markdownWithoutPage,
    ...metaIssues
  ];
  const counts = {
    critical: allIssues.filter((item) => item.severity === 'critical').length,
    warning: allIssues.filter((item) => item.severity === 'warning').length,
    info: allIssues.filter((item) => item.severity === 'info').length
  };

  return {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    commit,
    counts,
    links: { broken: brokenLinks, malformedExternal, orphanPages },
    translations: {
      englishPages: enPaths.size,
      frenchPages: pageRecords.filter((page) => page.language === 'fr').length,
      missingFr,
      missingEn,
      coveragePercent: enPaths.size ? Math.round(((enPaths.size - missingFr.length) / enPaths.size) * 100) : 100
    },
    content: { warnings: contentWarnings },
    sources: { generatedWithoutSource: sourceWarnings, markdownWithoutPage },
    images: { missing: imageIssues },
    metadata: { issues: metaIssues },
    duplicateTitles
  };
}

const gitHistoryComplete = ensureCompleteGitHistory();
const commitSha = resolveCommitSha();
const builtAt = new Date().toISOString();
const htmlFiles = walk(out).filter((file) => file.endsWith('.html'));
const sitemapEntries = [];
const pageUpdates = [];
const auditPages = [];
let datedPages = 0;
let unavailableDates = 0;
let pageMetaBase = {};

const pageMetaSource = path.join(root, 'page-meta.json');
if (fs.existsSync(pageMetaSource)) {
  fs.copyFileSync(pageMetaSource, path.join(out, 'page-meta.json'));
  try { pageMetaBase = JSON.parse(fs.readFileSync(pageMetaSource, 'utf8')); } catch { pageMetaBase = {}; }
}

const enrichedSearchPages = enrichSearchIndex();

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

    const contentHtml = articleHtml(html);
    const hrefs = extractAttributeValues(html, 'href');
    const articleHrefs = extractAttributeValues(contentHtml, 'href');
    auditPages.push({
      title: extractTitle(html, pagePath),
      path: pagePath,
      source: sourcePath,
      sourceExists: fs.existsSync(path.join(root, sourcePath)),
      language,
      outputFile: file,
      wordCount: pageWordCount(html),
      h2Count: (contentHtml.match(/<h2\b/gi) || []).length,
      hasDescription: /<meta\s+name=["']description["']\s+content=["'][^"']{20,}["']/i.test(html) || /<meta\s+content=["'][^"']{20,}["']\s+name=["']description["']/i.test(html),
      hrefs,
      internalLinks: articleHrefs.map((href) => resolveInternalLink(href, pagePath)).filter(Boolean),
      imageSources: extractAttributeValues(contentHtml, 'src')
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
    `<link rel="stylesheet" href="/assets/wiki-intelligence.css?v=${assetVersion}">`,
    `<script defer src="/assets/site-features.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/page-meta-badges.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/search-filter-polish.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/page-toc-collapse.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/section-links.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/wiki-feedback.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/wiki-intelligence.js?v=${assetVersion}"></script>`,
    `<script defer src="/assets/wiki-search-telemetry.js?v=${assetVersion}"></script>`
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
const auditReport = buildAuditReport(auditPages, pageMetaBase, commitSha);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map((entry) => `  <url>\n    <loc>${escapeXml(entry.url)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'page-updates.json'), JSON.stringify(pageUpdates, null, 2));
fs.writeFileSync(path.join(out, 'wiki-audit.json'), JSON.stringify(auditReport, null, 2));
fs.writeFileSync(path.join(out, 'build-info.json'), JSON.stringify({
  commit: commitSha,
  builtAt,
  gitHistoryComplete,
  pageDates: {
    verified: datedPages,
    unavailable: unavailableDates
  },
  pages: pageUpdates.length,
  audit: auditReport.counts,
  searchSynonyms: {
    groups: searchSynonymGroups.length,
    enrichedPages: enrichedSearchPages
  },
  features: [
    'article-pagination',
    'smart-search',
    'smart-search-categories',
    'search-synonym-expansion',
    'zero-result-search-terms',
    'search-conversion-analytics',
    'polished-search-filters',
    'technical-badges',
    'custom-404',
    'smart-404-suggestions',
    'version-history',
    'anonymous-analytics',
    'verified-git-page-dates',
    'page-freshness',
    'page-status-notices',
    'related-pages',
    'mobile-quick-nav',
    'hierarchical-breadcrumbs',
    'local-favorites',
    'recent-pages',
    'image-lightbox',
    'collapsible-page-toc',
    'page-meta-config',
    'section-link-copy',
    'article-feedback',
    'page-update-index',
    'wiki-audit-v2',
    'admin-dashboard'
  ]
}, null, 2));

console.log(`SEO and interface enhancements added to ${htmlFiles.length} pages for ${commitSha}.`);
console.log(`Verified Git dates: ${datedPages}; unavailable dates: ${unavailableDates}; complete history: ${gitHistoryComplete}.`);
console.log(`Search synonym expansion enriched ${enrichedSearchPages} pages across ${searchSynonymGroups.length} generic groups.`);
console.log(`Wiki audit: ${auditReport.counts.critical} critical, ${auditReport.counts.warning} warning, ${auditReport.counts.info} info.`);
