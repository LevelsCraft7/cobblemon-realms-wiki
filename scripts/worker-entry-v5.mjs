import baseWorker from './worker-entry.mjs';

const DRIFT_THRESHOLD_MS = 12 * 60 * 60 * 1000;
const SEARCH_PERIOD_MS = 30 * 86400000;

function cleanPath(value) {
  if (typeof value !== 'string') return '/';
  const path = value.slice(0, 240).replace(/[^a-zA-Z0-9_./-]/g, '');
  return path.startsWith('/') ? (path.replace(/\/+$/, '') || '/') : '/';
}

function db(env) {
  return env.WIKI_DB?.prepare ? env.WIKI_DB : null;
}

async function assetJson(req, env, pathname) {
  const url = new URL(req.url);
  url.pathname = pathname;
  url.search = '';
  const response = await env.ASSETS.fetch(new Request(url, { method: 'GET' }));
  if (!response.ok) return null;
  try { return await response.json(); } catch { return null; }
}

function isAdminPage(url) {
  return url.pathname === '/__cr-admin' || url.pathname === '/__cr-admin/' || url.pathname.startsWith('/__cr-admin/');
}

function normalizePairPath(path) {
  return cleanPath(path).replace(/^\/fr-FR(?=\/|$)/i, '') || '/';
}

function translationDrift(pages) {
  const pairs = new Map();
  for (const page of pages || []) {
    const key = normalizePairPath(page.path || '/');
    const pair = pairs.get(key) || { key, en: null, fr: null };
    if (page.language === 'fr' || cleanPath(page.path).startsWith('/fr-FR')) pair.fr = page;
    else pair.en = page;
    pairs.set(key, pair);
  }

  const drift = [];
  for (const pair of pairs.values()) {
    if (!pair.en || !pair.fr) continue;
    const enAt = Date.parse(pair.en.updatedAt || '');
    const frAt = Date.parse(pair.fr.updatedAt || '');
    if (!Number.isFinite(enAt) || !Number.isFinite(frAt)) continue;
    const delta = enAt - frAt;
    if (Math.abs(delta) < DRIFT_THRESHOLD_MS) continue;
    const newer = delta > 0 ? 'en' : 'fr';
    const older = newer === 'en' ? pair.fr : pair.en;
    const newerPage = newer === 'en' ? pair.en : pair.fr;
    drift.push({
      path: pair.key,
      title: newerPage.title || older.title || pair.key,
      newer,
      enPath: cleanPath(pair.en.path),
      frPath: cleanPath(pair.fr.path),
      enUpdatedAt: pair.en.updatedAt || '',
      frUpdatedAt: pair.fr.updatedAt || '',
      deltaHours: Math.max(1, Math.round(Math.abs(delta) / 3600000))
    });
  }

  return drift.sort((a, b) => b.deltaHours - a.deltaHours || a.path.localeCompare(b.path));
}

function ruleMatches(rule, path) {
  try {
    const re = new RegExp(rule.match);
    return re.test(path) || re.test(path.replace(/^\/fr-FR/i, ''));
  } catch { return false; }
}

function baseStatus(meta, path) {
  let status = meta?.defaults?.status || 'unknown';
  for (const rule of meta?.rules || []) if (ruleMatches(rule, path) && rule.status) status = rule.status;
  const short = cleanPath(path).replace(/^\/fr-FR/i, '') || '/';
  const override = meta?.pages?.[cleanPath(path)] || meta?.pages?.[short];
  return override?.status || status;
}

function searchQuality(rows) {
  const byQuery = new Map();
  let searches = 0;
  let clicks = 0;
  let zeros = 0;

  for (const row of rows || []) {
    const count = Number(row.count || 0);
    if (row.event === 'search') searches += count;
    if (row.event === 'click') clicks += count;
    if (row.event === 'zero') zeros += count;
    const key = `${row.language || 'en'}|${row.category || 'other'}|${row.query || ''}`;
    const current = byQuery.get(key) || {
      query: row.query || '', language: row.language || 'en', category: row.category || 'other', searches: 0, clicks: 0, zeros: 0
    };
    if (row.event === 'search') current.searches += count;
    if (row.event === 'click') current.clicks += count;
    if (row.event === 'zero') current.zeros += count;
    byQuery.set(key, current);
  }

  const successful = Math.max(0, searches - Math.min(searches, zeros));
  const successRate = searches ? Math.round(successful / searches * 100) : 100;
  const clickRate = searches ? Math.min(100, Math.round(clicks / searches * 100)) : 0;
  const zeroRate = searches ? Math.min(100, Math.round(zeros / searches * 100)) : 0;
  const failures = [...byQuery.values()]
    .filter(row => row.zeros > 0)
    .sort((a, b) => b.zeros - a.zeros || b.searches - a.searches || a.query.localeCompare(b.query))
    .slice(0, 30);

  return { searches, clicks, zeros, successful, successRate, clickRate, zeroRate, uniqueQueries: byQuery.size, failures };
}

function redirectHealth(rows, pages) {
  const currentPages = new Set((pages || []).map(page => cleanPath(page.path)));
  const active = (rows || []).filter(row => Number(row.active || 0));
  const map = new Map(active.map(row => [cleanPath(row.oldPath), cleanPath(row.newPath)]));
  const missingTargets = [];
  const chains = [];
  const loops = [];

  for (const row of active) {
    const oldPath = cleanPath(row.oldPath);
    const newPath = cleanPath(row.newPath);
    if (!currentPages.has(newPath) && !map.has(newPath)) missingTargets.push({ oldPath, newPath });

    const seen = new Set([oldPath]);
    let cursor = newPath;
    let depth = 1;
    while (map.has(cursor) && depth <= 12) {
      if (seen.has(cursor)) {
        loops.push({ oldPath, at: cursor });
        break;
      }
      seen.add(cursor);
      cursor = map.get(cursor);
      depth += 1;
    }
    if (depth > 1 && !seen.has(cursor)) chains.push({ oldPath, finalPath: cursor, depth });
  }

  const dedupe = items => [...new Map(items.map(item => [JSON.stringify(item), item])).values()];
  return {
    total: rows?.length || 0,
    active: active.length,
    disabled: Math.max(0, (rows?.length || 0) - active.length),
    missingTargets: dedupe(missingTargets),
    chains: dedupe(chains),
    loops: dedupe(loops),
    healthy: missingTargets.length === 0 && loops.length === 0
  };
}

function readinessScore({ audit, drift, needsReview, openFeedback, redirects }) {
  const critical = Number(audit?.counts?.critical || 0);
  const warnings = Number(audit?.counts?.warning || 0);
  const redirectIssues = Number(redirects?.missingTargets?.length || 0) + Number(redirects?.loops?.length || 0);
  const deductions = Math.min(45, critical * 15)
    + Math.min(15, warnings)
    + Math.min(16, drift.length * 2)
    + Math.min(12, needsReview * 3)
    + Math.min(8, openFeedback * 2)
    + Math.min(30, redirectIssues * 10);
  const score = Math.max(0, Math.round(100 - deductions));
  const label = score >= 95 ? 'Ready' : score >= 85 ? 'Almost ready' : score >= 70 ? 'Needs review' : 'Not release-ready';
  return { score, label, critical, warnings, translationDrift: drift.length, needsReview, openFeedback, redirectIssues };
}

async function buildAdminIntelligence(req, env) {
  const [pagesRaw, audit, meta] = await Promise.all([
    assetJson(req, env, '/page-updates.json'),
    assetJson(req, env, '/wiki-audit.json'),
    assetJson(req, env, '/page-meta.json')
  ]);
  const pages = Array.isArray(pagesRaw) ? pagesRaw : [];
  const drift = translationDrift(pages);
  const d = db(env);
  const empty = () => ({ results: [] });
  const cutoff = new Date(Date.now() - SEARCH_PERIOD_MS).toISOString();

  let searchRows = [], redirectRows = [], overrideRows = [], feedbackRows = [];
  if (d) {
    const [search, redirects, overrides, feedback] = await Promise.all([
      d.prepare('SELECT query,event,category,language,SUM(count) AS count,MAX(updated_at) AS updatedAt FROM search_query_events WHERE bucket >= ? GROUP BY query,event,category,language ORDER BY count DESC LIMIT 2500').bind(cutoff).all().catch(empty),
      d.prepare('SELECT old_path AS oldPath,new_path AS newPath,active,updated_at AS updatedAt,updated_by AS updatedBy FROM wiki_redirects ORDER BY updated_at DESC LIMIT 2000').all().catch(empty),
      d.prepare('SELECT path,status FROM page_meta_overrides LIMIT 2500').all().catch(empty),
      d.prepare("SELECT id,path,moderation_status AS status,hidden FROM article_feedback_comments WHERE hidden=0 AND moderation_status IN ('open','read') LIMIT 2500").all().catch(empty)
    ]);
    searchRows = search.results || [];
    redirectRows = redirects.results || [];
    overrideRows = overrides.results || [];
    feedbackRows = feedback.results || [];
  }

  const overrides = new Map(overrideRows.map(row => [cleanPath(row.path), row.status || 'unknown']));
  let needsReview = 0;
  for (const page of pages) {
    if (!page.path || page.path === '/') continue;
    const path = cleanPath(page.path);
    const short = path.replace(/^\/fr-FR/i, '') || '/';
    const status = overrides.get(path) || overrides.get(short) || baseStatus(meta || {}, path);
    if (status === 'needs-review' || status === 'draft' || status === 'unknown') needsReview += 1;
  }

  const redirects = redirectHealth(redirectRows, pages);
  const search = searchQuality(searchRows);
  const readiness = readinessScore({ audit: audit || {}, drift, needsReview, openFeedback: feedbackRows.length, redirects });

  return {
    generatedAt: new Date().toISOString(),
    translationDrift: { thresholdHours: DRIFT_THRESHOLD_MS / 3600000, count: drift.length, items: drift.slice(0, 250) },
    searchQuality: search,
    redirectHealth: redirects,
    readiness
  };
}

function safeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/-->/g, '--\\u003e');
}

class AdminV5Injector {
  constructor(data) { this.data = data; }
  element(element) {
    element.append(`<script>window.__CR_WIKI_V5__=${safeJsonForScript(this.data)};</script><script src="/assets/wiki-admin-v5.js?v=admin-v5"></script>`, { html: true });
  }
}

export default {
  async fetch(req, env, ctx) {
    const response = await baseWorker.fetch(req, env, ctx);
    const url = new URL(req.url);
    if (!isAdminPage(url) || !response.ok) return response;
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;
    const intelligence = await buildAdminIntelligence(req, env);
    return new HTMLRewriter().on('body', new AdminV5Injector(intelligence)).transform(response);
  }
};
