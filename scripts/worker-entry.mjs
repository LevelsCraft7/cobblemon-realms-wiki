import baseWorker from './worker.mjs';

const GENERIC_RELATED_TOPICS = new Set(['overview','support','pokemon','pokemon-exclusive','custom-content','mod-guide','settings','configuration','multiplayer']);
let redirectCache = { at: 0, map: new Map() };

function json(data, status = 200, cache = 'no-store') {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache, 'x-content-type-options': 'nosniff' } });
}
function cleanText(v, max = 700) { return typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : ''; }
function cleanPath(v) { if (typeof v !== 'string') return '/'; const p = v.slice(0, 240).replace(/[^a-zA-Z0-9_./-]/g, ''); return p.startsWith('/') ? (p.replace(/\/+$/, '') || '/') : '/'; }
function cleanTopic(v) { const t = cleanText(v, 50).toLowerCase(); return /^[a-z0-9][a-z0-9_-]{1,48}$/.test(t) ? t : ''; }
function cleanVersion(v) { const x = cleanText(v, 24); return /^[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,23}$/.test(x) ? x : ''; }
function unique(v = []) { return [...new Set(v.filter(Boolean))]; }
function arr(v) { try { const x = JSON.parse(v || '[]'); return Array.isArray(x) ? x.filter(i => typeof i === 'string') : []; } catch { return []; } }
function db(env) { return env.WIKI_DB?.prepare ? env.WIKI_DB : null; }
function isOwner(s) { return s?.role === 'owner'; }
function canAdmin(s) { return s?.role === 'owner' || s?.role === 'wiki'; }
function token(env) { return cleanText(env.CR_ADMIN_PATH_TOKEN || '', 300); }
function adminApi(env, suffix = '') { return token(env) ? `/api/admin/${encodeURIComponent(token(env))}/v4${suffix}` : `/api/admin/v4${suffix}`; }
function isAdminPage(url) { return url.pathname === '/__cr-admin' || url.pathname === '/__cr-admin/' || url.pathname.startsWith('/__cr-admin/'); }
function isV4Path(url, env, suffix) { return url.pathname === adminApi(env, suffix); }

function accounts(env) {
  const raw = cleanText(env.CR_ADMIN_ACCOUNTS || '', 8000);
  if (raw) {
    try {
      const a = JSON.parse(raw);
      if (Array.isArray(a)) return a.filter(x => x?.user && x?.password).map(x => ({ user: String(x.user), password: String(x.password), role: x.role === 'wiki' ? 'wiki' : 'owner' }));
    } catch {}
  }
  return env.CR_ADMIN_USER && env.CR_ADMIN_PASSWORD ? [{ user: env.CR_ADMIN_USER, password: env.CR_ADMIN_PASSWORD, role: 'owner' }] : [];
}
function unauthorized() { return new Response('Unauthorized', { status: 401, headers: { 'www-authenticate': 'Basic realm="Cobblemon Realms Wiki Admin", charset="UTF-8"', 'cache-control': 'no-store' } }); }
function session(env, req) {
  const a = accounts(env);
  if (!a.length) return { denied: new Response('Wiki admin locked: credentials missing.', { status: 503 }) };
  const head = req.headers.get('authorization') || '';
  if (!head.startsWith('Basic ')) return { denied: unauthorized() };
  let raw = '';
  try { raw = atob(head.slice(6)); } catch { return { denied: unauthorized() }; }
  const i = raw.indexOf(':');
  const u = i >= 0 ? raw.slice(0, i) : '';
  const p = i >= 0 ? raw.slice(i + 1) : '';
  const found = a.find(x => x.user === u && x.password === p);
  if (!found) return { denied: unauthorized() };
  return { session: { user: found.user, role: found.role } };
}

async function initV4(env) {
  const d = db(env); if (!d) return false;
  await d.exec(`
CREATE TABLE IF NOT EXISTS page_taxonomy_overrides (path TEXT PRIMARY KEY,topics_json TEXT NOT NULL DEFAULT '[]',introduced_version TEXT NOT NULL DEFAULT '',updated_version TEXT NOT NULL DEFAULT '',removed_version TEXT NOT NULL DEFAULT '',updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_by TEXT NOT NULL DEFAULT 'system');
CREATE TABLE IF NOT EXISTS wiki_redirects (old_path TEXT PRIMARY KEY,new_path TEXT NOT NULL,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_by TEXT NOT NULL DEFAULT 'system');
CREATE TABLE IF NOT EXISTS search_synonyms (term TEXT PRIMARY KEY,aliases_json TEXT NOT NULL DEFAULT '[]',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_by TEXT NOT NULL DEFAULT 'system');
CREATE TABLE IF NOT EXISTS audit_snapshots (commit_sha TEXT PRIMARY KEY,critical INTEGER NOT NULL DEFAULT 0,warning INTEGER NOT NULL DEFAULT 0,info INTEGER NOT NULL DEFAULT 0,audit_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS admin_logs (id INTEGER PRIMARY KEY AUTOINCREMENT,actor TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'admin',action TEXT NOT NULL,target TEXT NOT NULL DEFAULT '',payload_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_v4_redirect_active ON wiki_redirects(active,old_path);
CREATE INDEX IF NOT EXISTS idx_v4_synonym_active ON search_synonyms(active,term);
CREATE INDEX IF NOT EXISTS idx_v4_audit_created ON audit_snapshots(created_at DESC);
`);
  return true;
}
async function log(env, s, action, target = '', payload = {}) {
  const d = db(env); if (!d) return;
  await initV4(env);
  await d.prepare('INSERT INTO admin_logs (actor,role,action,target,payload_json,created_at) VALUES (?,?,?,?,?,?)')
    .bind(s?.user || 'unknown', s?.role || 'admin', action, target, JSON.stringify(payload), new Date().toISOString()).run().catch(() => null);
}

async function assetJson(req, env, path) {
  const u = new URL(req.url); u.pathname = path; u.search = '';
  const r = await env.ASSETS.fetch(new Request(u, { method: 'GET' }));
  if (!r.ok) return null;
  try { return await r.json(); } catch { return null; }
}

function ruleMatches(rule, path) {
  try {
    const re = new RegExp(rule.match);
    return re.test(path) || re.test(path.replace(/^\/fr-FR/i, ''));
  } catch { return false; }
}
function resolveMeta(meta, path) {
  const def = meta?.defaults || {};
  let out = {
    status: def.status || 'unknown',
    badges: [...(def.badges || [])],
    filters: [...(def.filters || [])],
    topics: [...(def.topics || [])],
    version: { ...(def.version || {}) }
  };
  for (const r of meta?.rules || []) {
    if (!ruleMatches(r, path)) continue;
    out = {
      status: r.status || out.status,
      badges: unique(r.badges || out.badges),
      filters: unique(r.filters || out.filters),
      topics: unique(r.topics || out.topics),
      version: { ...out.version, ...(r.version || {}) }
    };
  }
  const p = cleanPath(path), short = p.replace(/^\/fr-FR/i, '') || '/';
  const override = meta?.pages?.[p] || meta?.pages?.[short];
  if (override) {
    out = {
      status: override.status || out.status,
      badges: unique(override.badges || out.badges),
      filters: unique(override.filters || out.filters),
      topics: unique(override.topics || out.topics),
      version: { ...out.version, ...(override.version || {}) },
      source: override.source,
      updatedAt: override.updatedAt,
      updatedBy: override.updatedBy
    };
  }
  return out;
}

async function loadMergedMeta(req, env) {
  const base = await assetJson(req, env, '/page-meta.json') || {};
  const d = db(env);
  if (!d) return base;
  await initV4(env);
  const [oldOverrides, badges, taxonomy] = await Promise.all([
    d.prepare('SELECT path,status,badges_json AS badgesJson,filters_json AS filtersJson,updated_at AS updatedAt,updated_by AS updatedBy FROM page_meta_overrides ORDER BY updated_at DESC LIMIT 2000').all().catch(() => ({ results: [] })),
    d.prepare('SELECT key,label_fr AS labelFr,label_en AS labelEn,icon,color,active,updated_at AS updatedAt,updated_by AS updatedBy FROM badge_definitions ORDER BY key ASC').all().catch(() => ({ results: [] })),
    d.prepare('SELECT path,topics_json AS topicsJson,introduced_version AS introducedVersion,updated_version AS updatedVersion,removed_version AS removedVersion,updated_at AS updatedAt,updated_by AS updatedBy FROM page_taxonomy_overrides ORDER BY updated_at DESC LIMIT 2000').all().catch(() => ({ results: [] }))
  ]);
  const m = JSON.parse(JSON.stringify(base));
  m.labels ||= {}; m.labels.fr ||= {}; m.labels.en ||= {}; m.labels.fr.badges ||= {}; m.labels.en.badges ||= {}; m.badgeDefinitions ||= {}; m.pages ||= {};
  for (const b of badges.results || []) {
    if (!Number(b.active || 0)) continue;
    m.labels.fr.badges[b.key] = b.labelFr || b.key;
    m.labels.en.badges[b.key] = b.labelEn || b.labelFr || b.key;
    m.badgeDefinitions[b.key] = { icon: b.icon || '', color: b.color || '', source: 'd1' };
  }
  for (const o of oldOverrides.results || []) {
    m.pages[o.path] = { ...(m.pages[o.path] || {}), status: o.status || 'unknown', badges: arr(o.badgesJson), filters: arr(o.filtersJson), source: 'd1', updatedAt: o.updatedAt, updatedBy: o.updatedBy };
  }
  for (const t of taxonomy.results || []) {
    const version = {};
    if (t.introducedVersion) version.introduced = t.introducedVersion;
    if (t.updatedVersion) version.updated = t.updatedVersion;
    if (t.removedVersion) version.removed = t.removedVersion;
    m.pages[t.path] = { ...(m.pages[t.path] || {}), topics: arr(t.topicsJson), version, source: 'd1', updatedAt: t.updatedAt, updatedBy: t.updatedBy };
  }
  m.dynamicOverrides = {
    enabled: Boolean((oldOverrides.results || []).length || (badges.results || []).length || (taxonomy.results || []).length),
    count: (oldOverrides.results || []).length,
    badgeCount: (badges.results || []).length,
    taxonomyCount: (taxonomy.results || []).length,
    source: 'd1'
  };
  return m;
}

function parentPath(value = '') {
  const path = cleanPath(value).replace(/^\/fr-FR/i, '');
  const parts = path.split('/').filter(Boolean);
  return parts.length > 1 ? parts.slice(0, -1).join('/') : '';
}
function normText(value = '') { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['the','and','for','with','from','guide','guides','page','pages','cobblemon','realms','pokemon','about','system','your','les','des','pour','avec','dans','sur','une','un']);
function tokens(v = '') { return normText(v).split(' ').filter(x => x.length >= 3 && !STOP.has(x)); }
function relatedScore(current, candidate, currentMeta, candidateMeta) {
  const ct = new Set(currentMeta.topics || []);
  const shared = unique((candidateMeta.topics || []).filter(t => ct.has(t)));
  const specific = shared.filter(t => !GENERIC_RELATED_TOPICS.has(t));
  const sameParent = Boolean(parentPath(current.path)) && parentPath(current.path) === parentPath(candidate.path);
  const title = new Set(tokens(current.title));
  const sharedTitle = unique(tokens(candidate.title).filter(t => title.has(t)));
  const pathTokens = new Set(tokens(current.path));
  const sharedPath = unique(tokens(candidate.path).filter(t => pathTokens.has(t)));
  const strong = specific.length > 0 || (sameParent && shared.length > 0) || (sameParent && sharedTitle.length > 0);
  if (!strong) return { score: 0, sharedTopics: [] };
  let score = Math.min(48, specific.length * 24) + Math.min(8, shared.length * 4) + (sameParent ? 12 : 0) + Math.min(18, sharedTitle.length * 6) + Math.min(6, sharedPath.length * 3);
  const filters = new Set(currentMeta.filters || []);
  score += Math.min(4, (candidateMeta.filters || []).filter(f => filters.has(f)).length * 2);
  return { score, sharedTopics: shared, sameParent };
}
function relatedPreview(path, pages, meta) {
  const current = pages.find(p => cleanPath(p.path) === cleanPath(path));
  if (!current) return [];
  const cm = resolveMeta(meta, current.path);
  return pages.filter(p => p.language === current.language && cleanPath(p.path) !== cleanPath(current.path)).map(p => {
    const r = relatedScore(current, p, cm, resolveMeta(meta, p.path));
    return { path: p.path, title: p.title, ...r };
  }).filter(x => x.score >= 24).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, 8);
}

function taxonomyHealth(pages, meta) {
  const definitions = new Set(meta?.topicDefinitions || []);
  const usage = new Map();
  const noTopics = [], unknown = [], overTagged = [], broadOnly = [];
  const pageRows = [];
  for (const p of pages) {
    if (!p.path || p.path === '/') continue;
    const m = resolveMeta(meta, p.path), topics = unique(m.topics || []);
    pageRows.push({ ...p, topics });
    if (!topics.length) noTopics.push({ path: p.path, title: p.title, language: p.language });
    if (topics.length > 6) overTagged.push({ path: p.path, title: p.title, count: topics.length, topics });
    if (topics.length && topics.every(t => GENERIC_RELATED_TOPICS.has(t))) broadOnly.push({ path: p.path, title: p.title, topics });
    for (const t of topics) {
      usage.set(t, (usage.get(t) || 0) + 1);
      if (definitions.size && !definitions.has(t)) unknown.push({ path: p.path, title: p.title, topic: t });
    }
  }
  const singleUse = [...usage.entries()].filter(([, count]) => count === 1).map(([topic, count]) => ({ topic, count }));
  const families = new Map();
  for (const p of pageRows) {
    const noLang = cleanPath(p.path).replace(/^\/fr-FR/i, '');
    const parts = noLang.split('/').filter(Boolean);
    const family = parts.length > 1 ? parts.slice(0, -1).join('/') : '__root__';
    const list = families.get(family) || []; list.push(p); families.set(family, list);
  }
  const outliers = [];
  for (const [family, list] of families) {
    if (list.length < 3 || family === '__root__') continue;
    const counts = new Map();
    list.forEach(p => p.topics.filter(t => !GENERIC_RELATED_TOPICS.has(t)).forEach(t => counts.set(t, (counts.get(t) || 0) + 1)));
    const common = [...counts].filter(([, c]) => c >= Math.ceil(list.length * .5)).map(([t]) => t);
    if (!common.length) continue;
    for (const p of list) if (!p.topics.some(t => common.includes(t))) outliers.push({ family, path: p.path, title: p.title, expectedTopics: common });
  }
  return { noTopics, singleUse, unknown, overTagged, broadOnly, outliers, topicUsage: [...usage.entries()].map(([topic, count]) => ({ topic, count })).sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic)) };
}

async function storeAuditSnapshot(env, audit, build) {
  const d = db(env); if (!d) return { current: null, previous: null, delta: null };
  await initV4(env);
  const commit = cleanText(build?.commit || audit?.commit || '', 80);
  if (!commit || commit === 'unknown') return { current: null, previous: null, delta: null };
  const c = audit?.counts || {};
  const createdAt = build?.builtAt || audit?.generatedAt || new Date().toISOString();
  await d.prepare('INSERT OR IGNORE INTO audit_snapshots (commit_sha,critical,warning,info,audit_json,created_at) VALUES (?,?,?,?,?,?)')
    .bind(commit, Number(c.critical || 0), Number(c.warning || 0), Number(c.info || 0), JSON.stringify(audit || {}), createdAt).run().catch(() => null);
  const rows = (await d.prepare('SELECT commit_sha AS commitSha,critical,warning,info,created_at AS createdAt FROM audit_snapshots ORDER BY datetime(created_at) DESC LIMIT 12').all().catch(() => ({ results: [] }))).results || [];
  const current = rows.find(x => x.commitSha === commit) || { commitSha: commit, critical: Number(c.critical || 0), warning: Number(c.warning || 0), info: Number(c.info || 0), createdAt };
  const previous = rows.find(x => x.commitSha !== commit) || null;
  const delta = previous ? { critical: Number(current.critical) - Number(previous.critical), warning: Number(current.warning) - Number(previous.warning), info: Number(current.info) - Number(previous.info) } : null;
  return { current, previous, delta };
}

function deployHealth(build, audit, updates, meta, searchIndex, d1Enabled, regression) {
  const checks = [
    { key: 'build', label: 'Build info', ok: Boolean(build?.commit && build.commit !== 'unknown') },
    { key: 'search', label: 'Search index', ok: Array.isArray(searchIndex) && searchIndex.length > 0 },
    { key: 'meta', label: 'Page metadata', ok: Boolean(meta?.schemaVersion) },
    { key: 'audit', label: 'Audit generated', ok: Boolean(audit?.generatedAt) },
    { key: 'updates', label: 'Page updates', ok: Array.isArray(updates) && updates.length > 0 },
    { key: 'd1', label: 'D1', ok: d1Enabled }
  ];
  const alerts = [];
  checks.filter(x => !x.ok).forEach(x => alerts.push({ level: 'critical', message: `${x.label} is unavailable after the current deploy.` }));
  if (regression?.delta) {
    if (regression.delta.critical > 0) alerts.push({ level: 'critical', message: `Critical audit issues increased by ${regression.delta.critical} since the previous deploy.` });
    if (regression.delta.warning >= 5) alerts.push({ level: 'warning', message: `Audit warnings increased by ${regression.delta.warning} since the previous deploy.` });
  }
  return { checks, healthy: checks.every(x => x.ok) && !alerts.some(x => x.level === 'critical'), alerts };
}

async function adminState(req, env, s) {
  const [updates, audit, build, searchIndex, meta] = await Promise.all([
    assetJson(req, env, '/page-updates.json'),
    assetJson(req, env, '/wiki-audit.json'),
    assetJson(req, env, '/build-info.json'),
    assetJson(req, env, '/search-index.json'),
    loadMergedMeta(req, env)
  ]);
  const pages = Array.isArray(updates) ? updates : [];
  const d = db(env); await initV4(env);
  const cutoff = new Date(Date.now() - 30 * 86400000).toISOString();
  const empty = () => ({ results: [] });
  const [redirects, synonyms, zeroTerms, views, feedback, comments, reviews, notFound] = d ? await Promise.all([
    d.prepare('SELECT old_path AS oldPath,new_path AS newPath,active,created_at AS createdAt,updated_at AS updatedAt,updated_by AS updatedBy FROM wiki_redirects ORDER BY updated_at DESC LIMIT 1000').all().catch(empty),
    d.prepare('SELECT term,aliases_json AS aliasesJson,active,created_at AS createdAt,updated_at AS updatedAt,updated_by AS updatedBy FROM search_synonyms ORDER BY term ASC LIMIT 1000').all().catch(empty),
    d.prepare('SELECT query,category,language,SUM(count) AS count,MAX(updated_at) AS updatedAt FROM search_zero_terms WHERE bucket >= ? GROUP BY query,category,language ORDER BY count DESC LIMIT 100').bind(cutoff).all().catch(empty),
    d.prepare("SELECT path,language,SUM(count) AS count,MAX(updated_at) AS updatedAt FROM analytics_hourly WHERE bucket >= ? AND event='pageview' GROUP BY path,language ORDER BY count DESC LIMIT 2000").bind(cutoff).all().catch(empty),
    d.prepare('SELECT path,language,yes_count AS yes,no_count AS no,updated_at AS updatedAt FROM article_feedback ORDER BY updated_at DESC LIMIT 2000').all().catch(empty),
    d.prepare("SELECT id,path,language,reason,comment,moderation_status AS status,hidden,created_at AS createdAt FROM article_feedback_comments WHERE hidden=0 AND moderation_status IN ('open','read') ORDER BY id DESC LIMIT 1000").all().catch(empty),
    d.prepare('SELECT path,snoozed_until AS snoozedUntil,reviewed_at AS reviewedAt,reviewed_by AS reviewedBy FROM page_review_snoozes ORDER BY snoozed_until ASC LIMIT 2000').all().catch(empty),
    d.prepare("SELECT path,language,SUM(count) AS count,MAX(updated_at) AS updatedAt FROM analytics_hourly WHERE bucket >= ? AND event='not_found' GROUP BY path,language ORDER BY count DESC LIMIT 100").bind(cutoff).all().catch(empty)
  ]) : Array.from({ length: 8 }, empty);
  const regression = await storeAuditSnapshot(env, audit || {}, build || {});
  const health = deployHealth(build || {}, audit || {}, pages, meta || {}, Array.isArray(searchIndex) ? searchIndex : [], Boolean(d), regression);
  const path = cleanPath(new URL(req.url).searchParams.get('path') || pages.find(p => p.path !== '/')?.path || '/');
  const page = pages.find(p => cleanPath(p.path) === path) || null;
  const pageFeedback = (feedback.results || []).filter(x => cleanPath(x.path) === path).reduce((a, x) => ({ yes: a.yes + Number(x.yes || 0), no: a.no + Number(x.no || 0) }), { yes: 0, no: 0 });
  const activeComments = (comments.results || []).filter(x => cleanPath(x.path) === path);
  const viewCount = (views.results || []).filter(x => cleanPath(x.path) === path).reduce((a, x) => a + Number(x.count || 0), 0);
  const review = (reviews.results || []).find(x => cleanPath(x.path) === path) || null;
  const a = audit || {};
  const auditFlags = {
    orphan: Boolean((a.links?.orphanPages || []).some(x => cleanPath(x.path) === path)),
    content: (a.content?.warnings || []).filter(x => cleanPath(x.path) === path),
    images: (a.images?.missing || []).filter(x => cleanPath(x.source) === path),
    brokenFromPage: (a.links?.broken || []).filter(x => (x.sources || []).some(src => cleanPath(src) === path)),
    translation: [...(a.translations?.missingFr || []), ...(a.translations?.missingEn || [])].filter(x => cleanPath(x.path) === path || cleanPath(x.expected) === path)
  };
  return {
    role: s.role,
    user: s.user,
    pages,
    topicDefinitions: meta?.topicDefinitions || [],
    taxonomy: taxonomyHealth(pages, meta || {}),
    redirects: (redirects.results || []).map(x => ({ ...x, active: Number(x.active || 0) })),
    synonyms: (synonyms.results || []).map(x => ({ ...x, aliases: arr(x.aliasesJson), active: Number(x.active || 0) })),
    zeroTerms: zeroTerms.results || [],
    notFound: notFound.results || [],
    health,
    regression,
    build: build || {},
    auditCounts: audit?.counts || {},
    inspector: {
      page,
      meta: resolveMeta(meta || {}, path),
      feedback: pageFeedback,
      activeComments: activeComments.length,
      comments: activeComments.slice(0, 8),
      views30d: viewCount,
      review,
      auditFlags,
      related: relatedPreview(path, pages, meta || {}),
      redirectsToPage: (redirects.results || []).filter(x => cleanPath(x.newPath) === path && Number(x.active || 0))
    }
  };
}

async function saveTaxonomy(req, env, s) {
  if (!canAdmin(s) || !db(env)) return json({ error: 'Forbidden' }, 403);
  let p; try { p = await req.json(); } catch { return json({ error: 'JSON' }, 400); }
  const path = cleanPath(p.path);
  const pages = await assetJson(req, env, '/page-updates.json') || [];
  if (!Array.isArray(pages) || !pages.some(x => cleanPath(x.path) === path)) return json({ error: 'Unknown page' }, 400);
  const meta = await assetJson(req, env, '/page-meta.json') || {};
  const allowed = new Set(meta.topicDefinitions || []);
  const topics = unique([].concat(p.topics || []).map(cleanTopic).filter(x => x && allowed.has(x)));
  const introduced = cleanVersion(p.introduced || ''), updated = cleanVersion(p.updated || ''), removed = cleanVersion(p.removed || '');
  const now = new Date().toISOString(); await initV4(env);
  await db(env).prepare('INSERT INTO page_taxonomy_overrides (path,topics_json,introduced_version,updated_version,removed_version,updated_at,updated_by) VALUES (?,?,?,?,?,?,?) ON CONFLICT(path) DO UPDATE SET topics_json=excluded.topics_json,introduced_version=excluded.introduced_version,updated_version=excluded.updated_version,removed_version=excluded.removed_version,updated_at=excluded.updated_at,updated_by=excluded.updated_by')
    .bind(path, JSON.stringify(topics), introduced, updated, removed, now, s.user).run();
  await log(env, s, 'page_meta.taxonomy', path, { topics, introduced, updated, removed });
  return json({ ok: true });
}

async function saveRedirect(req, env, s) {
  if (!canAdmin(s) || !db(env)) return json({ error: 'Forbidden' }, 403);
  let p; try { p = await req.json(); } catch { return json({ error: 'JSON' }, 400); }
  const action = cleanText(p.action || 'save', 20), oldPath = cleanPath(p.oldPath), newPath = cleanPath(p.newPath);
  await initV4(env);
  if (action === 'delete') {
    if (!isOwner(s)) return json({ error: 'Owner only' }, 403);
    await db(env).prepare('DELETE FROM wiki_redirects WHERE old_path=?').bind(oldPath).run();
    await log(env, s, 'redirect.delete', oldPath); redirectCache.at = 0; return json({ ok: true });
  }
  if (action === 'toggle') {
    const active = p.active ? 1 : 0;
    await db(env).prepare('UPDATE wiki_redirects SET active=?,updated_at=?,updated_by=? WHERE old_path=?').bind(active, new Date().toISOString(), s.user, oldPath).run();
    await log(env, s, 'redirect.toggle', oldPath, { active }); redirectCache.at = 0; return json({ ok: true });
  }
  if (oldPath === '/' || newPath === '/' || oldPath === newPath) return json({ error: 'Invalid redirect path' }, 400);
  const pages = await assetJson(req, env, '/page-updates.json') || [];
  const currentPaths = new Set((Array.isArray(pages) ? pages : []).map(x => cleanPath(x.path)));
  if (currentPaths.has(oldPath)) return json({ error: 'Old path is a current live page' }, 400);
  if (!currentPaths.has(newPath)) return json({ error: 'Destination must be a current page' }, 400);
  const active = p.active === false ? 0 : 1, now = new Date().toISOString();
  await db(env).prepare('INSERT INTO wiki_redirects (old_path,new_path,active,created_at,updated_at,updated_by) VALUES (?,?,?,?,?,?) ON CONFLICT(old_path) DO UPDATE SET new_path=excluded.new_path,active=excluded.active,updated_at=excluded.updated_at,updated_by=excluded.updated_by')
    .bind(oldPath, newPath, active, now, now, s.user).run();
  await log(env, s, 'redirect.upsert', oldPath, { newPath, active }); redirectCache.at = 0; return json({ ok: true });
}

async function saveSynonym(req, env, s) {
  if (!canAdmin(s) || !db(env)) return json({ error: 'Forbidden' }, 403);
  let p; try { p = await req.json(); } catch { return json({ error: 'JSON' }, 400); }
  const action = cleanText(p.action || 'save', 20), term = cleanText(p.term, 80).toLowerCase();
  if (term.length < 2) return json({ error: 'Invalid term' }, 400);
  await initV4(env);
  if (action === 'delete') {
    if (!isOwner(s)) return json({ error: 'Owner only' }, 403);
    await db(env).prepare('DELETE FROM search_synonyms WHERE term=?').bind(term).run(); await log(env, s, 'synonym.delete', term); return json({ ok: true });
  }
  const aliases = unique([].concat(p.aliases || []).flatMap(x => String(x).split(',')).map(x => cleanText(x, 80).toLowerCase()).filter(x => x.length >= 2 && x !== term));
  if (!aliases.length) return json({ error: 'At least one alias is required' }, 400);
  const active = p.active === false ? 0 : 1, now = new Date().toISOString();
  await db(env).prepare('INSERT INTO search_synonyms (term,aliases_json,active,created_at,updated_at,updated_by) VALUES (?,?,?,?,?,?) ON CONFLICT(term) DO UPDATE SET aliases_json=excluded.aliases_json,active=excluded.active,updated_at=excluded.updated_at,updated_by=excluded.updated_by')
    .bind(term, JSON.stringify(aliases), active, now, now, s.user).run();
  await log(env, s, 'synonym.upsert', term, { aliases, active }); return json({ ok: true });
}

async function activeSynonyms(env) {
  const d = db(env); if (!d) return [];
  await initV4(env);
  const r = await d.prepare('SELECT term,aliases_json AS aliasesJson FROM search_synonyms WHERE active=1 ORDER BY term ASC LIMIT 1000').all().catch(() => ({ results: [] }));
  return (r.results || []).map(x => ({ term: x.term, aliases: arr(x.aliasesJson) }));
}
async function popularPages(env, language) {
  const d = db(env); if (!d) return [];
  const cutoff = new Date(Date.now() - 30 * 86400000).toISOString();
  const lang = language === 'fr' ? 'fr' : 'en';
  const r = await d.prepare("SELECT path,SUM(count) AS count,MAX(updated_at) AS updatedAt FROM analytics_hourly WHERE bucket >= ? AND event='pageview' AND language=? AND path <> '/' AND path <> '/fr-FR/' GROUP BY path ORDER BY count DESC LIMIT 8")
    .bind(cutoff, lang).all().catch(() => ({ results: [] }));
  return r.results || [];
}
async function getRedirectMap(env) {
  if (Date.now() - redirectCache.at < 60000) return redirectCache.map;
  const d = db(env); if (!d) return new Map(); await initV4(env);
  const r = await d.prepare('SELECT old_path AS oldPath,new_path AS newPath FROM wiki_redirects WHERE active=1 LIMIT 2000').all().catch(() => ({ results: [] }));
  redirectCache = { at: Date.now(), map: new Map((r.results || []).map(x => [cleanPath(x.oldPath), cleanPath(x.newPath)])) };
  return redirectCache.map;
}

class HeadInject {
  constructor(admin) { this.admin = admin; }
  element(e) {
    e.append(this.admin
      ? '<link rel="stylesheet" href="/assets/wiki-admin-v4.css?v=admin-v4">'
      : '<link rel="stylesheet" href="/assets/wiki-public-v4.css?v=public-v4">', { html: true });
  }
}
class BodyInject {
  constructor(admin) { this.admin = admin; }
  element(e) {
    e.append(this.admin
      ? '<script src="/assets/wiki-admin-v4.js?v=admin-v4"></script>'
      : '<script src="/assets/wiki-public-v4.js?v=public-v4"></script>', { html: true });
  }
}

async function handleV4(req, env) {
  const url = new URL(req.url);
  if (url.pathname === '/api/search-synonyms') return json(await activeSynonyms(env), 200, 'public, max-age=60');
  if (url.pathname === '/api/popular-pages') return json(await popularPages(env, url.searchParams.get('language')), 200, 'public, max-age=120');
  if (url.pathname === '/page-meta.json') return json(await loadMergedMeta(req, env));

  const adminSuffix = ['/state','/meta','/redirect','/synonym'].find(suffix => isV4Path(url, env, suffix));
  if (adminSuffix) {
    const auth = session(env, req); if (auth.denied) return auth.denied; const s = auth.session;
    if (!canAdmin(s)) return json({ error: 'Forbidden' }, 403);
    if (adminSuffix === '/state') return json(await adminState(req, env, s));
    if (req.method !== 'POST') return json({ error: 'Method' }, 405);
    if (adminSuffix === '/meta') return saveTaxonomy(req, env, s);
    if (adminSuffix === '/redirect') return saveRedirect(req, env, s);
    if (adminSuffix === '/synonym') return saveSynonym(req, env, s);
  }

  if ((req.method === 'GET' || req.method === 'HEAD') && !/^\/(api|assets|__cr-admin)(\/|$)/.test(url.pathname)) {
    const map = await getRedirectMap(env);
    const dest = map.get(cleanPath(url.pathname));
    if (dest && dest !== cleanPath(url.pathname)) {
      const target = new URL(dest, url.origin); target.search = url.search;
      return Response.redirect(target.toString(), 308);
    }
  }
  return null;
}

export default {
  async fetch(req, env, ctx) {
    const handled = await handleV4(req, env);
    if (handled) return handled;
    const url = new URL(req.url);
    const res = await baseWorker.fetch(req, env, ctx);
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('text/html')) return res;
    const admin = isAdminPage(url);
    return new HTMLRewriter().on('head', new HeadInject(admin)).on('body', new BodyInject(admin)).transform(res);
  }
};
