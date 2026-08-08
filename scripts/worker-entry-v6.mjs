import baseWorker from './worker-entry-v5.mjs';

const ADMIN_TABS = new Set(['readiness', 'translation-drift', 'search-quality']);
const DRIFT_THRESHOLD_MS = 12 * 60 * 60 * 1000;
const SEARCH_CUTOFF_MS = 30 * 86400000;

function h(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
}
function cleanPath(value) {
  if (typeof value !== 'string') return '/';
  const path = value.slice(0, 240).replace(/[^a-zA-Z0-9_./-]/g, '');
  return path.startsWith('/') ? (path.replace(/\/+$/, '') || '/') : '/';
}
function db(env) { return env.WIKI_DB?.prepare ? env.WIKI_DB : null; }
function pct(a, b) { return b ? Math.round(Number(a || 0) / Number(b || 0) * 100) : 0; }
function n(value) { return Number(value || 0).toLocaleString('fr-FR'); }
function fmt(value) {
  if (!value) return 'Unknown';
  try { return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }
  catch { return String(value); }
}
function status(text, kind = 'info') { return `<span class="status ${kind}">${h(text)}</span>`; }
function card(title, value, note = '') { return `<article class="card"><small>${h(title)}</small><strong>${h(value)}</strong><small>${h(note)}</small></article>`; }

async function assetJson(req, env, pathname) {
  const url = new URL(req.url); url.pathname = pathname; url.search = '';
  const response = await env.ASSETS.fetch(new Request(url, { method: 'GET' }));
  if (!response.ok) return null;
  try { return await response.json(); } catch { return null; }
}

function pairPath(path) { return cleanPath(path).replace(/^\/fr-FR(?=\/|$)/i, '') || '/'; }
function driftRows(pages) {
  const pairs = new Map();
  for (const page of pages || []) {
    const key = pairPath(page.path || '/');
    const pair = pairs.get(key) || { key, en: null, fr: null };
    if (page.language === 'fr' || cleanPath(page.path).startsWith('/fr-FR')) pair.fr = page;
    else pair.en = page;
    pairs.set(key, pair);
  }
  const out = [];
  for (const pair of pairs.values()) {
    if (!pair.en || !pair.fr) continue;
    const en = Date.parse(pair.en.updatedAt || ''), fr = Date.parse(pair.fr.updatedAt || '');
    if (!Number.isFinite(en) || !Number.isFinite(fr)) continue;
    const delta = en - fr;
    if (Math.abs(delta) < DRIFT_THRESHOLD_MS) continue;
    out.push({
      path: pair.key,
      title: pair.en.title || pair.fr.title || pair.key,
      newer: delta > 0 ? 'EN' : 'FR',
      enPath: cleanPath(pair.en.path),
      frPath: cleanPath(pair.fr.path),
      enUpdatedAt: pair.en.updatedAt || '',
      frUpdatedAt: pair.fr.updatedAt || '',
      deltaHours: Math.max(1, Math.round(Math.abs(delta) / 3600000))
    });
  }
  return out.sort((a, b) => b.deltaHours - a.deltaHours || a.path.localeCompare(b.path));
}

async function fallbackData(req, env) {
  const [pagesRaw, audit] = await Promise.all([
    assetJson(req, env, '/page-updates.json'),
    assetJson(req, env, '/wiki-audit.json')
  ]);
  const pages = Array.isArray(pagesRaw) ? pagesRaw : [];
  const drift = driftRows(pages);
  const d = db(env);
  const empty = () => ({ results: [] });
  let search = [], redirects = [], feedback = [], overrides = [];
  if (d) {
    const cutoff = new Date(Date.now() - SEARCH_CUTOFF_MS).toISOString();
    const results = await Promise.all([
      d.prepare('SELECT query,event,category,language,SUM(count) AS count FROM search_query_events WHERE bucket >= ? GROUP BY query,event,category,language LIMIT 2500').bind(cutoff).all().catch(empty),
      d.prepare('SELECT old_path AS oldPath,new_path AS newPath,active FROM wiki_redirects LIMIT 2000').all().catch(empty),
      d.prepare("SELECT id FROM article_feedback_comments WHERE hidden=0 AND moderation_status IN ('open','read') LIMIT 2500").all().catch(empty),
      d.prepare("SELECT path,status FROM page_meta_overrides WHERE status IN ('unknown','draft','needs-review') LIMIT 2500").all().catch(empty)
    ]);
    search = results[0].results || [];
    redirects = results[1].results || [];
    feedback = results[2].results || [];
    overrides = results[3].results || [];
  }

  let searches = 0, clicks = 0, zeros = 0;
  const failures = new Map();
  for (const row of search) {
    const count = Number(row.count || 0);
    if (row.event === 'search') searches += count;
    if (row.event === 'click') clicks += count;
    if (row.event === 'zero') {
      zeros += count;
      const key = `${row.language || 'en'}|${row.category || 'other'}|${row.query || ''}`;
      const current = failures.get(key) || { query: row.query || '', language: row.language || 'en', category: row.category || 'other', zeros: 0 };
      current.zeros += count; failures.set(key, current);
    }
  }
  const searchQuality = {
    searches, clicks, zeros,
    successRate: searches ? Math.max(0, 100 - Math.min(100, pct(zeros, searches))) : 100,
    clickRate: searches ? Math.min(100, pct(clicks, searches)) : 0,
    zeroRate: searches ? Math.min(100, pct(zeros, searches)) : 0,
    failures: [...failures.values()].sort((a, b) => b.zeros - a.zeros || a.query.localeCompare(b.query)).slice(0, 30)
  };

  const live = new Set(pages.map(page => cleanPath(page.path)));
  const activeRedirects = redirects.filter(row => Number(row.active || 0));
  const redirectMap = new Map(activeRedirects.map(row => [cleanPath(row.oldPath), cleanPath(row.newPath)]));
  const missingTargets = activeRedirects.filter(row => !live.has(cleanPath(row.newPath)) && !redirectMap.has(cleanPath(row.newPath)));
  const loops = [];
  for (const row of activeRedirects) {
    const start = cleanPath(row.oldPath); let cursor = cleanPath(row.newPath); const seen = new Set([start]);
    for (let depth = 0; depth < 12 && redirectMap.has(cursor); depth += 1) {
      if (seen.has(cursor)) { loops.push({ oldPath: start, at: cursor }); break; }
      seen.add(cursor); cursor = redirectMap.get(cursor);
    }
  }
  const redirectIssues = missingTargets.length + loops.length;
  const critical = Number(audit?.counts?.critical || 0), warnings = Number(audit?.counts?.warning || 0);
  const deductions = Math.min(45, critical * 15) + Math.min(15, warnings) + Math.min(16, drift.length * 2) + Math.min(12, overrides.length * 3) + Math.min(8, feedback.length * 2) + Math.min(30, redirectIssues * 10);
  const score = Math.max(0, Math.round(100 - deductions));
  const readiness = {
    score,
    label: score >= 95 ? 'Ready' : score >= 85 ? 'Almost ready' : score >= 70 ? 'Needs review' : 'Not release-ready',
    critical, warnings, translationDrift: drift.length, needsReview: overrides.length, openFeedback: feedback.length, redirectIssues
  };
  return { drift, searchQuality, readiness, redirectHealth: { active: activeRedirects.length, missingTargets, loops } };
}

function navLinks(base) {
  return `<div class="nav-group" data-v6-server-nav><small>Release</small><a href="${h(base)}?tab=readiness">🚦 Release Readiness</a><a href="${h(base)}?tab=translation-drift">🌍 Translation Drift</a><a href="${h(base)}?tab=search-quality">🎯 Search Quality</a></div>`;
}

function fallbackPanel(tab, data) {
  if (tab === 'translation-drift') {
    return `<section class="section v6-server-fallback"><div class="section-head"><h2>🌍 Translation Drift · Server fallback</h2>${status(`${n(data.drift.length)} flagged`, data.drift.length ? 'warn' : 'ok')}</div><p class="data-note">Rendered server-side. Pairs are flagged only when verified Git update timestamps differ by at least 12 hours.</p>${data.drift.length ? `<table><thead><tr><th>Page</th><th>Newer</th><th>EN</th><th>FR</th><th>Gap</th><th>Open</th></tr></thead><tbody>${data.drift.slice(0, 100).map(row => `<tr><td><strong>${h(row.title)}</strong><br><code>${h(row.path)}</code></td><td>${status(row.newer, 'warn')}</td><td>${h(fmt(row.enUpdatedAt))}</td><td>${h(fmt(row.frUpdatedAt))}</td><td>${n(row.deltaHours)}h</td><td><a class="button mini" href="${h(row.enPath)}" target="_blank">EN</a> <a class="button mini" href="${h(row.frPath)}" target="_blank">FR</a></td></tr>`).join('')}</tbody></table>` : '<div class="empty">No translation drift detected.</div>'}</section>`;
  }
  if (tab === 'search-quality') {
    const q = data.searchQuality;
    return `<section class="section v6-server-fallback"><div class="section-head"><h2>🎯 Search Quality · Server fallback</h2>${status(`${n(q.successRate)}% success`, q.successRate >= 85 ? 'ok' : 'warn')}</div><div class="hero-grid">${card('Stable searches', q.searches, '30 days')}${card('Success rate', `${q.successRate}%`, 'with results')}${card('Click rate', `${q.clickRate}%`, 'result opened')}${card('Zero-result rate', `${q.zeroRate}%`, 'needs improvement')}</div>${q.failures.length ? `<table><thead><tr><th>Query</th><th>Language</th><th>Category</th><th>Zeros</th></tr></thead><tbody>${q.failures.map(row => `<tr><td><strong>${h(row.query)}</strong></td><td>${h(String(row.language).toUpperCase())}</td><td>${h(row.category)}</td><td>${n(row.zeros)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">No failing search recorded in the last 30 days.</div>'}</section>`;
  }
  const r = data.readiness, redirects = data.redirectHealth;
  return `<section class="section v6-server-fallback"><div class="section-head"><h2>🚦 Release Readiness · Server fallback</h2>${status(`${r.score}% · ${r.label}`, r.score >= 95 ? 'ok' : r.score >= 70 ? 'warn' : 'danger')}</div><div class="hero-grid">${card('Readiness', `${r.score}%`, r.label)}${card('Critical audit', r.critical, 'build')}${card('Translation drift', r.translationDrift, 'pairs')}${card('Redirect issues', r.redirectIssues, 'integrity')}</div><ul class="check-list"><li>Build warnings: <strong>${n(r.warnings)}</strong></li><li>Pages marked unknown / draft / needs-review in D1: <strong>${n(r.needsReview)}</strong></li><li>Active feedback items: <strong>${n(r.openFeedback)}</strong></li><li>Active redirects: <strong>${n(redirects.active)}</strong></li><li>Missing redirect targets: <strong>${n(redirects.missingTargets.length)}</strong></li><li>Redirect loops: <strong>${n(redirects.loops.length)}</strong></li></ul><p class="data-note">This fallback is rendered by the Worker and remains readable if the enhanced admin JavaScript fails.</p></section>`;
}

class NavInjector {
  constructor(base, tab) { this.base = base; this.tab = tab; }
  element(element) { element.append(navLinks(this.base), { html: true }); }
}
class MainInjector {
  constructor(tab, data) { this.tab = tab; this.data = data; }
  element(element) { element.append(fallbackPanel(this.tab, this.data), { html: true }); }
}

export default {
  async fetch(req, env, ctx) {
    const response = await baseWorker.fetch(req, env, ctx);
    const url = new URL(req.url);
    if (!ADMIN_TABS.has(url.searchParams.get('tab')) || !response.ok) return response;
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;
    const data = await fallbackData(req, env);
    const base = url.pathname.replace(/\/$/, '') || '/__cr-admin';
    return new HTMLRewriter()
      .on('.admin-nav', new NavInjector(base, url.searchParams.get('tab')))
      .on('.admin-main', new MainInjector(url.searchParams.get('tab'), data))
      .transform(response);
  }
};
