const INVITE_CODE = 'kb8NSTF45n';
const INVITE_URL = `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true&with_expiration=true`;
const CURSEFORGE_PROJECT_ID = '1175360';
const CURSEFORGE_PAGE_URL = 'https://www.curseforge.com/minecraft/modpacks/cobblemon-realms';
const CURSEFORGE_BADGE_URL = `https://img.shields.io/curseforge/dt/${CURSEFORGE_PROJECT_ID}.json`;
const MINECRAFT_SERVER_ADDRESS = '184.170.201.211:25565';
const MINECRAFT_STATUS_URL = `https://api.mcsrvstat.us/3/${encodeURIComponent(MINECRAFT_SERVER_ADDRESS)}`;
const ANALYTICS_EVENTS = new Set(['pageview', 'not_found', 'search_zero', 'outbound']);
const ANALYTICS_DETAILS = new Set(['', 'installation', 'server', 'pokemon', 'gameplay', 'performance', 'support', 'version', 'other', 'curseforge', 'discord', 'github', 'bisecthosting', 'gitbook', 'external']);
const ALLOWED_STATUSES = new Set(['verified-v6', 'needs-review', 'legacy-5', 'draft', 'unknown']);
const ALLOWED_FILTERS = new Set(['gameplay', 'mods', 'legendary', 'server', 'commands']);
const COMMENT_STATUSES = new Set(['open', 'read', 'resolved', 'archived']);
const SAFE_BADGE_KEY = /^[a-z0-9][a-z0-9_-]{1,30}$/i;

function json(payload, status = 200, cacheControl = 'no-store') {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cacheControl,
      'access-control-allow-origin': '*',
      'x-content-type-options': 'nosniff'
    }
  });
}

async function getCached(request, context, cachePath, loader) {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = cachePath;
  cacheUrl.search = '';
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;
  const output = await loader();
  if (output.ok) context.waitUntil(cache.put(cacheKey, output.clone()));
  return output;
}

async function getDiscordStats(request, context) {
  return getCached(request, context, '/__cache/discord-stats', async () => {
    try {
      const response = await fetch(INVITE_URL, { headers: { accept: 'application/json', 'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)' } });
      if (!response.ok) return json({ error: 'Discord unavailable' }, 502);
      const invite = await response.json();
      return json({
        name: invite.guild?.name ?? 'Cobblemon Realms',
        online: invite.approximate_presence_count ?? invite.guild?.approximate_presence_count ?? null,
        members: invite.approximate_member_count ?? invite.guild?.approximate_member_count ?? null,
        inviteUrl: `https://discord.gg/${INVITE_CODE}`
      }, 200, 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
    } catch {
      return json({ error: 'Discord unavailable' }, 502);
    }
  });
}

async function getCurseForgeStats(request, context) {
  return getCached(request, context, '/__cache/curseforge-stats', async () => {
    try {
      const response = await fetch(CURSEFORGE_BADGE_URL, { headers: { accept: 'application/json', 'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)' } });
      if (!response.ok) return json({ error: 'CurseForge unavailable' }, 502);
      const badge = await response.json();
      const downloads = typeof badge.message === 'string' ? badge.message.trim() : '';
      if (!downloads || downloads.toLowerCase() === 'invalid') return json({ error: 'CurseForge count unavailable' }, 502);
      return json({ downloads, projectId: Number(CURSEFORGE_PROJECT_ID), projectUrl: CURSEFORGE_PAGE_URL }, 200, 'public, max-age=120, s-maxage=600, stale-while-revalidate=1800');
    } catch {
      return json({ error: 'CurseForge unavailable' }, 502);
    }
  });
}

async function getMinecraftServerStats(request, context) {
  return getCached(request, context, '/__cache/minecraft-server-stats-v2', async () => {
    try {
      const response = await fetch(MINECRAFT_STATUS_URL, { headers: { accept: 'application/json', 'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)' }, signal: AbortSignal.timeout(8000) });
      if (!response.ok) return json({ error: 'Minecraft server status unavailable' }, 502);
      const status = await response.json();
      const online = status.online === true;
      return json({
        online,
        players: { online: online && Number.isFinite(status.players?.online) ? status.players.online : 0, max: online && Number.isFinite(status.players?.max) ? status.players.max : 0 },
        icon: typeof status.icon === 'string' && status.icon.startsWith('data:image/png;base64,') ? status.icon : null,
        joinUrl: `https://discord.gg/${INVITE_CODE}`
      }, 200, 'public, max-age=30, s-maxage=60, stale-while-revalidate=180');
    } catch {
      return json({ error: 'Minecraft server status unavailable' }, 502);
    }
  });
}

function sanitizeAnalyticsPath(value) {
  if (typeof value !== 'string') return '/';
  const path = value.slice(0, 240).replace(/[^a-zA-Z0-9_./-]/g, '');
  return path.startsWith('/') ? path.replace(/\/+$/, '') || '/' : '/';
}

function sanitizeComment(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 700);
}

function sanitizeBadgeKey(value) {
  if (typeof value !== 'string') return '';
  const key = value.trim().toLowerCase();
  return SAFE_BADGE_KEY.test(key) ? key : '';
}

function sanitizeColor(value) {
  if (typeof value !== 'string') return '';
  const color = value.trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : '';
}

function parseJsonArray(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function d1Available(env) {
  return Boolean(env.WIKI_DB?.prepare);
}

async function safeD1Run(env, sql) {
  if (!d1Available(env)) return;
  await env.WIKI_DB.prepare(sql).run().catch(() => null);
}

async function initD1(env) {
  if (!d1Available(env)) return false;
  await env.WIKI_DB.exec(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      event TEXT NOT NULL,
      path TEXT NOT NULL,
      detail TEXT NOT NULL DEFAULT '',
      language TEXT NOT NULL DEFAULT 'en',
      count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (event, path, detail, language)
    );
    CREATE TABLE IF NOT EXISTS article_feedback (
      path TEXT NOT NULL,
      language TEXT NOT NULL DEFAULT 'en',
      yes_count INTEGER NOT NULL DEFAULT 0,
      no_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (path, language)
    );
    CREATE TABLE IF NOT EXISTS article_feedback_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      language TEXT NOT NULL DEFAULT 'en',
      comment TEXT NOT NULL,
      moderation_status TEXT NOT NULL DEFAULT 'open',
      hidden INTEGER NOT NULL DEFAULT 0,
      handled_by TEXT NOT NULL DEFAULT '',
      handled_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS page_meta_overrides (
      path TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'unknown',
      badges_json TEXT NOT NULL DEFAULT '[]',
      filters_json TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_by TEXT NOT NULL DEFAULT 'system'
    );
    CREATE TABLE IF NOT EXISTS badge_definitions (
      key TEXT PRIMARY KEY,
      label_fr TEXT NOT NULL,
      label_en TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '',
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_by TEXT NOT NULL DEFAULT 'system'
    );
    CREATE TABLE IF NOT EXISTS wiki_options (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_by TEXT NOT NULL DEFAULT 'system'
    );
    CREATE TABLE IF NOT EXISTS admin_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      actor TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      action TEXT NOT NULL,
      target TEXT NOT NULL DEFAULT '',
      payload_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_analytics_count ON analytics_events(count DESC);
    CREATE INDEX IF NOT EXISTS idx_feedback_no ON article_feedback(no_count DESC);
    CREATE INDEX IF NOT EXISTS idx_feedback_comments_path ON article_feedback_comments(path);
    CREATE INDEX IF NOT EXISTS idx_feedback_comments_status ON article_feedback_comments(moderation_status, hidden);
    CREATE INDEX IF NOT EXISTS idx_admin_logs_created ON admin_logs(created_at DESC);
  `);
  await safeD1Run(env, "ALTER TABLE article_feedback_comments ADD COLUMN moderation_status TEXT NOT NULL DEFAULT 'open'");
  await safeD1Run(env, "ALTER TABLE article_feedback_comments ADD COLUMN hidden INTEGER NOT NULL DEFAULT 0");
  await safeD1Run(env, "ALTER TABLE article_feedback_comments ADD COLUMN handled_by TEXT NOT NULL DEFAULT ''");
  await safeD1Run(env, "ALTER TABLE article_feedback_comments ADD COLUMN handled_at TEXT");
  await safeD1Run(env, "ALTER TABLE badge_definitions ADD COLUMN icon TEXT NOT NULL DEFAULT ''");
  await safeD1Run(env, "ALTER TABLE badge_definitions ADD COLUMN color TEXT NOT NULL DEFAULT ''");
  await safeD1Run(env, "ALTER TABLE badge_definitions ADD COLUMN active INTEGER NOT NULL DEFAULT 1");
  return true;
}

async function logAdminAction(env, session, action, target = '', payload = {}) {
  if (!d1Available(env)) return;
  await initD1(env);
  await env.WIKI_DB.prepare('INSERT INTO admin_logs (actor, role, action, target, payload_json, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(session?.user || 'unknown', session?.role || 'admin', action, target, JSON.stringify(payload), new Date().toISOString())
    .run()
    .catch(() => null);
}

async function recordAnalyticsD1(env, event, path, detail, language) {
  if (!d1Available(env)) return false;
  await initD1(env);
  const now = new Date().toISOString();
  await env.WIKI_DB.prepare(`
    INSERT INTO analytics_events (event, path, detail, language, count, created_at, updated_at)
    VALUES (?, ?, ?, ?, 1, ?, ?)
    ON CONFLICT(event, path, detail, language)
    DO UPDATE SET count = count + 1, updated_at = excluded.updated_at
  `).bind(event, path, detail || '', language, now, now).run();
  return true;
}

async function recordFeedbackD1(env, path, language, vote, comment) {
  if (!d1Available(env)) return { stored: false, commentStored: false };
  await initD1(env);
  const now = new Date().toISOString();
  const yesDelta = vote === 'yes' ? 1 : 0;
  const noDelta = vote === 'no' ? 1 : 0;
  await env.WIKI_DB.prepare(`
    INSERT INTO article_feedback (path, language, yes_count, no_count, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(path, language)
    DO UPDATE SET yes_count = yes_count + ?, no_count = no_count + ?, updated_at = excluded.updated_at
  `).bind(path, language, yesDelta, noDelta, now, now, yesDelta, noDelta).run();
  let commentStored = false;
  const cleanComment = vote === 'no' ? sanitizeComment(comment) : '';
  if (cleanComment) {
    await env.WIKI_DB.prepare('INSERT INTO article_feedback_comments (path, language, comment, moderation_status, hidden, created_at) VALUES (?, ?, ?, ?, 0, ?)')
      .bind(path, language, cleanComment, 'open', now)
      .run();
    commentStored = true;
  }
  return { stored: true, commentStored };
}

async function incrementCounterKV(env, key, patch = {}) {
  if (!env.WIKI_STATS) return false;
  const previous = await env.WIKI_STATS.get(key, 'json').catch(() => null) || {};
  await env.WIKI_STATS.put(key, JSON.stringify({ ...previous, ...patch, count: Number(previous.count || 0) + 1, updatedAt: new Date().toISOString() }));
  return true;
}

async function recordAnonymousAnalytics(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return json({ error: 'Cross-site request denied' }, 403);
  if (Number(request.headers.get('content-length') || 0) > 2048) return json({ error: 'Payload too large' }, 413);
  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const event = typeof payload?.event === 'string' ? payload.event : '';
  const detail = typeof payload?.detail === 'string' ? payload.detail : '';
  const language = payload?.language === 'fr' ? 'fr' : 'en';
  if (!ANALYTICS_EVENTS.has(event) || !ANALYTICS_DETAILS.has(detail)) return json({ error: 'Invalid analytics event' }, 400);
  const path = sanitizeAnalyticsPath(payload?.path);
  if (env.WIKI_ANALYTICS) env.WIKI_ANALYTICS.writeDataPoint({ indexes: [event], blobs: [event, path, detail, language], doubles: [1] });
  const stored = await recordAnalyticsD1(env, event, path, detail, language).catch(() => false);
  if (!stored) await incrementCounterKV(env, `stats:${event}:${language}:${detail || 'none'}:${path}`, { event, path, detail, language });
  return new Response(null, { status: 204, headers: { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
}

async function recordArticleFeedback(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return json({ error: 'Cross-site request denied' }, 403);
  if (Number(request.headers.get('content-length') || 0) > 4096) return json({ error: 'Payload too large' }, 413);
  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const vote = payload?.vote === 'yes' ? 'yes' : payload?.vote === 'no' ? 'no' : '';
  if (!vote) return json({ error: 'Invalid vote' }, 400);
  const language = payload?.language === 'fr' ? 'fr' : 'en';
  const path = sanitizeAnalyticsPath(payload?.path);
  const d1 = await recordFeedbackD1(env, path, language, vote, payload?.comment).catch(() => ({ stored: false, commentStored: false }));
  if (d1.stored) return json({ ok: true, stored: true, provider: 'd1', commentStored: d1.commentStored });
  let stored = false;
  if (env.WIKI_STATS) {
    const key = `feedback:${language}:${path}`;
    const previous = await env.WIKI_STATS.get(key, 'json').catch(() => null) || { yes: 0, no: 0 };
    previous[vote] = Number(previous[vote] || 0) + 1;
    previous.path = path;
    previous.language = language;
    previous.updatedAt = new Date().toISOString();
    await env.WIKI_STATS.put(key, JSON.stringify(previous));
    stored = true;
  }
  return json({ ok: true, stored, provider: stored ? 'kv' : 'none', commentStored: false });
}

function adminToken(env) { return typeof env.CR_ADMIN_PATH_TOKEN === 'string' ? env.CR_ADMIN_PATH_TOKEN.trim() : ''; }
function adminBasePath(env) { const token = adminToken(env); return token ? `/__cr-admin/${encodeURIComponent(token)}` : '/__cr-admin'; }
function adminActionPath(env, action) { const token = adminToken(env); return token ? `/api/admin/${encodeURIComponent(token)}/${action}` : `/api/admin/${action}`; }
function adminLink(env, tab, extra = {}) {
  const params = new URLSearchParams({ tab });
  for (const [key, value] of Object.entries(extra)) if (value !== undefined && value !== null && value !== '') params.set(key, value);
  return `${adminBasePath(env)}?${params.toString()}`;
}
function isAdminDashboardPath(url, env) { const token = adminToken(env); return token ? url.pathname === `/__cr-admin/${token}` || url.pathname === `/__cr-admin/${token}/` : url.pathname === '/__cr-admin' || url.pathname === '/__cr-admin/'; }
function isAdminActionPath(url, env, action) { const token = adminToken(env); return token ? url.pathname === `/api/admin/${token}/${action}` : url.pathname === `/api/admin/${action}`; }
function unauthorizedAdmin(message = 'Unauthorized') { return new Response(message, { status: 401, headers: { 'www-authenticate': 'Basic realm="Cobblemon Realms Wiki Admin", charset="UTF-8"', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } }); }

function configuredAccounts(env) {
  const raw = typeof env.CR_ADMIN_ACCOUNTS === 'string' ? env.CR_ADMIN_ACCOUNTS.trim() : '';
  if (raw) {
    try {
      const accounts = JSON.parse(raw);
      if (Array.isArray(accounts)) {
        return accounts.filter((item) => item && typeof item.user === 'string' && typeof item.password === 'string').map((item) => ({ user: item.user, password: item.password, role: item.role === 'wiki' ? 'wiki' : 'owner' }));
      }
    } catch {}
  }
  const user = typeof env.CR_ADMIN_USER === 'string' ? env.CR_ADMIN_USER : '';
  const password = typeof env.CR_ADMIN_PASSWORD === 'string' ? env.CR_ADMIN_PASSWORD : '';
  return user && password ? [{ user, password, role: 'owner' }] : [];
}

function getAdminSession(env, request) {
  const accounts = configuredAccounts(env);
  if (!accounts.length) return { denied: new Response('Wiki admin is locked: admin credentials are not configured.', { status: 503, headers: { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } }) };
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return { denied: unauthorizedAdmin() };
  let decoded = '';
  try { decoded = atob(header.slice(6)); } catch { return { denied: unauthorizedAdmin() }; }
  const separator = decoded.indexOf(':');
  const providedUser = separator >= 0 ? decoded.slice(0, separator) : '';
  const providedPassword = separator >= 0 ? decoded.slice(separator + 1) : '';
  const account = accounts.find((item) => item.user === providedUser && item.password === providedPassword);
  if (!account) return { denied: unauthorizedAdmin() };
  return { session: { user: account.user, role: account.role } };
}

function adminAccessDenied(env, request) { return getAdminSession(env, request).denied || null; }
function canUseAdminTools(session) { return session?.role === 'owner' || session?.role === 'wiki'; }

async function readAssetJson(request, env, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = '';
  const response = await env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }));
  if (!response.ok) return null;
  try { return await response.json(); } catch { return null; }
}

async function readStatsKV(env) {
  if (!env.WIKI_STATS) return { enabled: false, provider: 'none', feedback: [], analytics: [], comments: [], overrides: [], badges: [], logs: [] };
  const feedback = [];
  const analytics = [];
  const feedbackList = await env.WIKI_STATS.list({ prefix: 'feedback:', limit: 1000 }).catch(() => ({ keys: [] }));
  for (const key of feedbackList.keys || []) { const value = await env.WIKI_STATS.get(key.name, 'json').catch(() => null); if (value) feedback.push(value); }
  const statsList = await env.WIKI_STATS.list({ prefix: 'stats:', limit: 1000 }).catch(() => ({ keys: [] }));
  for (const key of statsList.keys || []) { const value = await env.WIKI_STATS.get(key.name, 'json').catch(() => null); if (value) analytics.push(value); }
  feedback.sort((a, b) => Number(b.no || 0) - Number(a.no || 0) || Number(b.yes || 0) - Number(a.yes || 0));
  analytics.sort((a, b) => Number(b.count || 0) - Number(a.count || 0));
  return { enabled: true, provider: 'kv', feedback, analytics, comments: [], overrides: [], badges: [], logs: [] };
}

async function readStatsD1(env) {
  if (!d1Available(env)) return null;
  await initD1(env);
  const [analytics, feedback, comments, overrides, badges, logs] = await Promise.all([
    env.WIKI_DB.prepare('SELECT event, path, detail, language, count, updated_at AS updatedAt FROM analytics_events ORDER BY count DESC, updated_at DESC LIMIT 1600').all(),
    env.WIKI_DB.prepare('SELECT path, language, yes_count AS yes, no_count AS no, updated_at AS updatedAt FROM article_feedback ORDER BY no_count DESC, yes_count DESC LIMIT 1200').all(),
    env.WIKI_DB.prepare('SELECT id, path, language, comment, moderation_status AS status, hidden, handled_by AS handledBy, handled_at AS handledAt, created_at AS createdAt FROM article_feedback_comments ORDER BY created_at DESC LIMIT 400').all(),
    env.WIKI_DB.prepare('SELECT path, status, badges_json AS badgesJson, filters_json AS filtersJson, updated_at AS updatedAt, updated_by AS updatedBy FROM page_meta_overrides ORDER BY updated_at DESC LIMIT 1200').all(),
    env.WIKI_DB.prepare('SELECT key, label_fr AS labelFr, label_en AS labelEn, icon, color, active, updated_at AS updatedAt, updated_by AS updatedBy FROM badge_definitions ORDER BY key ASC').all(),
    env.WIKI_DB.prepare('SELECT id, actor, role, action, target, payload_json AS payloadJson, created_at AS createdAt FROM admin_logs ORDER BY created_at DESC LIMIT 180').all()
  ]);
  return {
    enabled: true,
    provider: 'd1',
    analytics: analytics.results || [],
    feedback: feedback.results || [],
    comments: (comments.results || []).map((item) => ({ ...item, hidden: Number(item.hidden || 0) })),
    overrides: (overrides.results || []).map((item) => ({ path: item.path, status: item.status, badges: parseJsonArray(item.badgesJson), filters: parseJsonArray(item.filtersJson), updatedAt: item.updatedAt, updatedBy: item.updatedBy })),
    badges: (badges.results || []).map((item) => ({ ...item, active: Number(item.active || 0) })),
    logs: logs.results || []
  };
}

async function readStats(env) { const d1 = await readStatsD1(env).catch(() => null); return d1 || readStatsKV(env); }

function applyDynamicBadges(baseMeta, badges = []) {
  const meta = JSON.parse(JSON.stringify(baseMeta || {}));
  meta.labels = meta.labels || {}; meta.labels.fr = meta.labels.fr || {}; meta.labels.en = meta.labels.en || {};
  meta.labels.fr.badges = meta.labels.fr.badges || {}; meta.labels.en.badges = meta.labels.en.badges || {}; meta.badgeDefinitions = meta.badgeDefinitions || {};
  for (const badge of badges) {
    if (!badge.active) continue;
    meta.labels.fr.badges[badge.key] = badge.labelFr || badge.key;
    meta.labels.en.badges[badge.key] = badge.labelEn || badge.labelFr || badge.key;
    meta.badgeDefinitions[badge.key] = { icon: badge.icon || '', color: badge.color || '', source: 'd1', updatedAt: badge.updatedAt, updatedBy: badge.updatedBy };
  }
  return meta;
}

function applyPageMetaOverrides(baseMeta, overrides = [], badges = []) {
  const meta = applyDynamicBadges(baseMeta, badges);
  meta.pages = meta.pages || {};
  meta.dynamicOverrides = { enabled: overrides.length > 0 || badges.length > 0, count: overrides.length, badgeCount: badges.length, source: 'd1' };
  for (const item of overrides) {
    meta.pages[item.path] = { ...(meta.pages[item.path] || {}), status: item.status || 'unknown', badges: item.badges || [], filters: item.filters || [], source: 'd1', updatedAt: item.updatedAt, updatedBy: item.updatedBy };
  }
  return meta;
}

async function getDynamicPageMeta(request, env) { const baseMeta = await readAssetJson(request, env, '/page-meta.json') || {}; const stats = await readStats(env); return applyPageMetaOverrides(baseMeta, stats.overrides || [], stats.badges || []); }
async function servePageMeta(request, env) { return json(await getDynamicPageMeta(request, env), 200, 'no-store'); }
function allowedBadges(pageMeta, stats) { return new Set([...Object.keys(pageMeta?.labels?.fr?.badges || pageMeta?.labels?.en?.badges || {}), ...(stats?.badges || []).filter((item) => item.active).map((item) => item.key)]); }
function normalizeArray(value, allowed) { const source = Array.isArray(value) ? value : typeof value === 'string' ? [value] : []; const out = []; for (const item of source) { if (typeof item !== 'string') continue; const clean = item.trim(); if (!clean || (allowed && !allowed.has(clean))) continue; if (!out.includes(clean)) out.push(clean); } return out; }

async function parsePayload(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return request.json();
  const form = await request.formData();
  const payload = {};
  for (const [key, value] of form.entries()) { if (payload[key]) { if (!Array.isArray(payload[key])) payload[key] = [payload[key]]; payload[key].push(value); } else payload[key] = value; }
  return payload;
}

async function savePageMetaOverride(request, env) {
  const { session, denied } = getAdminSession(env, request);
  if (denied) return denied;
  if (!canUseAdminTools(session)) return json({ error: 'Forbidden' }, 403);
  if (!d1Available(env)) return json({ error: 'D1 WIKI_DB binding is not configured.' }, 503);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let payload;
  try { payload = await parsePayload(request); } catch { return json({ error: 'Invalid payload' }, 400); }
  const path = sanitizeAnalyticsPath(payload.path);
  if (!path || path === '/') return json({ error: 'A concrete page path is required.' }, 400);
  const baseMeta = await readAssetJson(request, env, '/page-meta.json') || {};
  const stats = await readStats(env);
  const status = ALLOWED_STATUSES.has(payload.status) ? payload.status : 'unknown';
  const badges = normalizeArray(payload.badges, allowedBadges(baseMeta, stats));
  const filters = normalizeArray(payload.filters, ALLOWED_FILTERS);
  const now = new Date().toISOString();
  await initD1(env);
  await env.WIKI_DB.prepare(`INSERT INTO page_meta_overrides (path, status, badges_json, filters_json, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(path) DO UPDATE SET status = excluded.status, badges_json = excluded.badges_json, filters_json = excluded.filters_json, updated_at = excluded.updated_at, updated_by = excluded.updated_by`).bind(path, status, JSON.stringify(badges), JSON.stringify(filters), now, session.user).run();
  await logAdminAction(env, session, 'page_meta.update', path, { status, badges, filters });
  if ((request.headers.get('accept') || '').includes('text/html')) return Response.redirect(new URL(adminLink(env, 'badges', { edit: path, saved: '1' }), request.url).toString(), 303);
  return json({ ok: true, override: { path, status, badges, filters, updatedAt: now, updatedBy: session.user } });
}

async function saveBadgeDefinition(request, env) {
  const { session, denied } = getAdminSession(env, request);
  if (denied) return denied;
  if (!canUseAdminTools(session)) return json({ error: 'Forbidden' }, 403);
  if (!d1Available(env)) return json({ error: 'D1 WIKI_DB binding is not configured.' }, 503);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let payload;
  try { payload = await parsePayload(request); } catch { return json({ error: 'Invalid payload' }, 400); }
  const key = sanitizeBadgeKey(payload.key);
  if (!key) return json({ error: 'Invalid badge key.' }, 400);
  const labelFr = sanitizeComment(payload.label_fr || payload.labelFr || key).slice(0, 80) || key;
  const labelEn = sanitizeComment(payload.label_en || payload.labelEn || labelFr).slice(0, 80) || labelFr;
  const icon = sanitizeComment(payload.icon).slice(0, 8);
  const color = sanitizeColor(payload.color);
  const active = payload.active === '0' || payload.active === 0 || payload.active === false ? 0 : 1;
  const now = new Date().toISOString();
  await initD1(env);
  await env.WIKI_DB.prepare(`INSERT INTO badge_definitions (key, label_fr, label_en, icon, color, active, created_at, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET label_fr = excluded.label_fr, label_en = excluded.label_en, icon = excluded.icon, color = excluded.color, active = excluded.active, updated_at = excluded.updated_at, updated_by = excluded.updated_by`).bind(key, labelFr, labelEn, icon, color, active, now, now, session.user).run();
  await logAdminAction(env, session, 'badge_definition.upsert', key, { labelFr, labelEn, icon, color, active });
  if ((request.headers.get('accept') || '').includes('text/html')) return Response.redirect(new URL(adminLink(env, 'badges', { badgeSaved: '1' }), request.url).toString(), 303);
  return json({ ok: true, badge: { key, labelFr, labelEn, icon, color, active } });
}

async function moderateFeedback(request, env) {
  const { session, denied } = getAdminSession(env, request);
  if (denied) return denied;
  if (!canUseAdminTools(session)) return json({ error: 'Forbidden' }, 403);
  if (!d1Available(env)) return json({ error: 'D1 WIKI_DB binding is not configured.' }, 503);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let payload;
  try { payload = await parsePayload(request); } catch { return json({ error: 'Invalid payload' }, 400); }
  const id = Number(payload.id || 0);
  const status = COMMENT_STATUSES.has(payload.status) ? payload.status : 'read';
  const hidden = status === 'archived' || payload.hidden === '1' ? 1 : 0;
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'Invalid comment id.' }, 400);
  const now = new Date().toISOString();
  await initD1(env);
  await env.WIKI_DB.prepare('UPDATE article_feedback_comments SET moderation_status = ?, hidden = ?, handled_by = ?, handled_at = ? WHERE id = ?').bind(status, hidden, session.user, now, id).run();
  await logAdminAction(env, session, 'feedback.moderate', String(id), { status, hidden });
  if ((request.headers.get('accept') || '').includes('text/html')) return Response.redirect(new URL(adminLink(env, 'feedback', { moderated: '1' }), request.url).toString(), 303);
  return json({ ok: true, id, status, hidden });
}

async function getAdminPayload(request, env) {
  const [buildInfo, pageUpdates, pageMetaRaw, searchIndex, stats] = await Promise.all([readAssetJson(request, env, '/build-info.json'), readAssetJson(request, env, '/page-updates.json'), readAssetJson(request, env, '/page-meta.json'), readAssetJson(request, env, '/search-index.json'), readStats(env)]);
  const pageMeta = applyPageMetaOverrides(pageMetaRaw || {}, stats.overrides || [], stats.badges || []);
  return { buildInfo: buildInfo || {}, pageUpdates: Array.isArray(pageUpdates) ? pageUpdates : [], pageMeta, pageMetaBase: pageMetaRaw || {}, pageCount: Array.isArray(searchIndex) ? searchIndex.length : null, stats, security: { basicAuthConfigured: configuredAccounts(env).length > 0, secretPathEnabled: Boolean(adminToken(env)), d1Enabled: d1Available(env), statsStorageEnabled: d1Available(env) || Boolean(env.WIKI_STATS), provider: d1Available(env) ? 'd1' : env.WIKI_STATS ? 'kv' : 'none' } };
}

async function getAdminStatus(request, env) { const denied = adminAccessDenied(env, request); if (denied) return denied; return json(await getAdminPayload(request, env)); }

function h(value = '') { return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c])); }
function n(value) { return Number(value || 0).toLocaleString('fr-FR'); }
function pct(part, total) { return total ? Math.round((Number(part || 0) / total) * 100) : 0; }
function formatDate(value) { if (!value) return 'Unknown'; try { return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)); } catch { return String(value); } }
function pill(values = []) { return values.length ? values.map((v) => `<span class="pill">${h(v)}</span>`).join('') : '<span class="muted">None</span>'; }
function badge(text, type = 'info') { return `<span class="status ${type}">${h(text)}</span>`; }
function card(title, value, note = '') { return `<article class="card"><small>${h(title)}</small><strong>${h(value)}</strong><small>${h(note)}</small></article>`; }

function metaFor(pageMeta, pagePath) {
  const defaults = pageMeta?.defaults || { status: 'unknown', badges: [], filters: [] };
  let out = { status: defaults.status || 'unknown', badges: defaults.badges || [], filters: defaults.filters || [] };
  const normalized = String(pagePath || '').replace(/\/$/, '') || '/';
  const noLang = normalized.replace(/^\/fr-FR/i, '');
  for (const rule of pageMeta?.rules || []) { try { const re = new RegExp(rule.match); if (re.test(normalized) || re.test(noLang)) out = { ...out, ...rule }; } catch {} }
  const exact = pageMeta?.pages?.[normalized] || pageMeta?.pages?.[noLang];
  return exact ? { ...out, ...exact } : out;
}

function updatesTable(items, limit = 80) { if (!items.length) return '<div class="empty">No page update index available.</div>'; return `<table><thead><tr><th>Title</th><th>Path</th><th>Lang</th><th>Updated</th></tr></thead><tbody>${items.slice(0, limit).map((item) => `<tr><td>${h(item.title || item.path)}</td><td><code>${h(item.path)}</code></td><td>${h(item.language || '')}</td><td>${h(formatDate(item.updatedAt))}</td></tr>`).join('')}</tbody></table>`; }

function feedbackTable(items, comments, env) {
  if (!items.length) return '<div class="empty">No feedback stored yet.</div>';
  const latestByPath = new Map();
  for (const item of comments || []) if (!latestByPath.has(item.path)) latestByPath.set(item.path, item.comment);
  return `<table><thead><tr><th>Page</th><th>Yes</th><th>No</th><th>Score</th><th>Latest comment</th><th>Actions</th></tr></thead><tbody>${items.slice(0, 160).map((item) => { const total = Number(item.yes || 0) + Number(item.no || 0); return `<tr><td><code>${h(item.path)}</code></td><td>${n(item.yes)}</td><td>${n(item.no)}</td><td>${pct(item.yes, total)}%</td><td>${h(latestByPath.get(item.path) || '')}</td><td><a class="button mini" href="${h(adminLink(env, 'pages', { focus: item.path }))}">Page</a></td></tr>`; }).join('')}</tbody></table>`;
}

function commentsTable(items, env) {
  if (!items.length) return '<div class="empty">No written feedback comments yet.</div>';
  return `<table><thead><tr><th>Page</th><th>Comment</th><th>Status</th><th>Moderation</th></tr></thead><tbody>${items.slice(0, 220).map((item) => `<tr><td><code>${h(item.path)}</code><br><small>${h(item.language || '')} - ${h(formatDate(item.createdAt))}</small></td><td>${h(item.comment || '')}</td><td>${badge(item.hidden ? 'archived' : item.status || 'open', item.status === 'resolved' ? 'ok' : item.status === 'open' ? 'warn' : 'info')}</td><td><form method="post" action="${h(adminActionPath(env, 'feedback'))}" class="inline-form"><input type="hidden" name="id" value="${h(item.id)}"><button class="button mini" name="status" value="read">Read</button><button class="button mini" name="status" value="resolved">Resolved</button><button class="button mini" name="status" value="archived">Archive</button></form></td></tr>`).join('')}</tbody></table>`;
}

function analyticsTable(items) { if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>'; return `<table><thead><tr><th>Event</th><th>Detail</th><th>Path</th><th>Count</th><th>Updated</th></tr></thead><tbody>${items.slice(0, 220).map((item) => `<tr><td>${h(item.event || '')}</td><td>${h(item.detail || '')}</td><td><code>${h(item.path || '')}</code></td><td>${n(item.count)}</td><td>${h(formatDate(item.updatedAt))}</td></tr>`).join('')}</tbody></table>`; }
function overridesTable(items) { if (!items.length) return '<div class="empty">No dynamic D1 override yet.</div>'; return `<table><thead><tr><th>Path</th><th>Status</th><th>Badges</th><th>Filters</th><th>Updated</th></tr></thead><tbody>${items.map((item) => `<tr><td><code>${h(item.path)}</code></td><td>${h(item.status || '')}</td><td>${pill(item.badges || [])}</td><td>${pill(item.filters || [])}</td><td>${h(formatDate(item.updatedAt))}<br><small>${h(item.updatedBy || '')}</small></td></tr>`).join('')}</tbody></table>`; }
function badgesTable(items) { if (!items.length) return '<div class="empty">No dynamic badge definition yet. Static badge labels still come from page-meta.json.</div>'; return `<table><thead><tr><th>Key</th><th>Labels</th><th>Style</th><th>Status</th></tr></thead><tbody>${items.map((item) => `<tr><td><code>${h(item.key)}</code></td><td>FR: ${h(item.labelFr)}<br>EN: ${h(item.labelEn)}</td><td>${h(item.icon || '')} ${h(item.color || '')}</td><td>${badge(item.active ? 'active' : 'disabled', item.active ? 'ok' : 'warn')}<br><small>${h(item.updatedBy || '')}</small></td></tr>`).join('')}</tbody></table>`; }
function rulesTable(items) { if (!items.length) return '<div class="empty">No page-meta rules configured.</div>'; return `<table><thead><tr><th>Match</th><th>Status</th><th>Badges</th><th>Filters</th></tr></thead><tbody>${items.map((rule) => `<tr><td><code>${h(rule.match || '')}</code></td><td>${h(rule.status || '')}</td><td>${pill(rule.badges || [])}</td><td>${pill(rule.filters || [])}</td></tr>`).join('')}</tbody></table>`; }
function logsTable(items) { if (!items.length) return '<div class="empty">No admin log yet.</div>'; return `<table><thead><tr><th>Actor</th><th>Action</th><th>Target</th><th>Date</th></tr></thead><tbody>${items.map((item) => `<tr><td>${h(item.actor || '')}<br><small>${h(item.role || '')}</small></td><td>${h(item.action || '')}</td><td><code>${h(item.target || '')}</code></td><td>${h(formatDate(item.createdAt))}</td></tr>`).join('')}</tbody></table>`; }
function bars(items) { if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>'; const total = items.reduce((sum, item) => sum + Number(item.count || 0), 0); return `<div class="bars">${items.slice(0, 12).map((item) => `<div class="bar"><span><code>${h(item.event || item.name || '')}</code></span><div class="bar-track"><div class="bar-fill" style="width:${pct(item.count, total)}%"></div></div><span>${n(item.count)}</span></div>`).join('')}</div>`; }
function breakdown(items, key) { const map = new Map(); for (const item of items) map.set(item[key] || 'none', (map.get(item[key] || 'none') || 0) + Number(item.count || 0)); return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ event: name, name, count })); }

function pageCards(pages, pageMeta, env) {
  if (!pages.length) return '<div class="empty">No pages indexed yet.</div>';
  return pages.slice(0, 300).map((page) => { const meta = metaFor(pageMeta, page.path); const statusType = meta.status === 'verified-v6' ? 'ok' : meta.status === 'draft' || meta.status === 'needs-review' ? 'warn' : 'info'; return `<article class="page-card"><div><strong>${h(page.title || page.path)}</strong><small><code>${h(page.path || '')}</code></small><div class="admin-actions compact"><a class="button mini" href="${h(page.path)}" target="_blank" rel="noopener">Open</a><a class="button mini" href="${h(adminLink(env, 'badges', { edit: page.path }))}">Edit badges</a><a class="button mini" href="${h(adminLink(env, 'feedback', { path: page.path }))}">Feedback</a></div></div><div><small>Status</small>${badge(meta.status || 'unknown', statusType)}<div class="pill-row">${pill(meta.badges || [])}</div></div><div><small>Filters</small><div class="pill-row">${pill(meta.filters || [])}</div><small>Updated ${h(formatDate(page.updatedAt))}</small></div></article>`; }).join('');
}

function auditWiki(pages, pageMeta, feedback, comments) {
  const withoutStatus = [], withoutBadges = [], withoutFilters = [], stale = [], byCanonical = new Map();
  const feedbackRisk = feedback.filter((item) => Number(item.no || 0) > 0).slice(0, 40);
  const openComments = comments.filter((item) => !item.hidden && (item.status || 'open') === 'open');
  for (const page of pages) {
    if (!page.path || page.path === '/') continue;
    const meta = metaFor(pageMeta, page.path);
    if (!meta.status || meta.status === 'unknown') withoutStatus.push(page);
    if (!Array.isArray(meta.badges) || meta.badges.length === 0) withoutBadges.push(page);
    if (!Array.isArray(meta.filters) || meta.filters.length === 0) withoutFilters.push(page);
    if (page.updatedAt) { const ageDays = (Date.now() - new Date(page.updatedAt).getTime()) / 86400000; if (Number.isFinite(ageDays) && ageDays > 180) stale.push({ ...page, ageDays: Math.round(ageDays) }); }
    const key = page.path.replace(/^\/fr-FR/i, '') || '/'; const entry = byCanonical.get(key) || {}; entry[page.language || 'en'] = page; byCanonical.set(key, entry);
  }
  const missingTranslations = [];
  for (const [key, pair] of byCanonical.entries()) if (key !== '/' && (!pair.fr || !pair.en)) missingTranslations.push({ path: key, fr: Boolean(pair.fr), en: Boolean(pair.en) });
  return { withoutStatus, withoutBadges, withoutFilters, stale, missingTranslations, feedbackRisk, openComments };
}

function auditList(items, type, env) {
  if (!items.length) return '<div class="empty">Nothing to report.</div>';
  return `<table><thead><tr><th>Page</th><th>Info</th><th>Action</th></tr></thead><tbody>${items.slice(0, 80).map((item) => { const path = item.path || ''; const label = item.title || item.path || 'Translation pair'; const info = type === 'translations' ? `FR ${item.fr ? '✅' : '❌'} / EN ${item.en ? '✅' : '❌'}` : type === 'stale' ? `${item.ageDays} days` : ''; return `<tr><td>${h(label)}<br><code>${h(path)}</code></td><td>${h(info)}</td><td><a class="button mini" href="${h(adminLink(env, 'badges', { edit: path }))}">Edit options</a></td></tr>`; }).join('')}</tbody></table>`;
}

function selectOption(value, label, selectedValue) { return `<option value="${h(value)}"${value === selectedValue ? ' selected' : ''}>${h(label)}</option>`; }
function checkbox(name, value, checked) { return `<label class="check"><input type="checkbox" name="${h(name)}" value="${h(value)}"${checked ? ' checked' : ''}> ${h(value)}</label>`; }
function adminNav(env, active) { const tabs = [['overview','🏠 Overview'],['pages','📄 Pages'],['stats','📊 Stats'],['feedback','👍 Feedback'],['badges','🏷️ Badges & Filters'],['audit','🧪 Audit'],['logs','📜 Logs'],['security','🔐 Security'],['maintenance','⚙️ Maintenance']]; return tabs.map(([tab,label]) => `<a class="${tab === active ? 'is-active' : ''}" href="${h(adminLink(env, tab))}">${h(label)}</a>`).join(''); }

function adminDashboardHtml(payload, request, env, session) {
  const url = new URL(request.url); const validTabs = ['overview','pages','stats','feedback','badges','audit','logs','security','maintenance']; const activeTab = validTabs.includes(url.searchParams.get('tab')) ? url.searchParams.get('tab') : 'overview';
  const build = payload.buildInfo || {}; const pages = payload.pageUpdates || []; const pageMeta = payload.pageMeta || {}; const baseMeta = payload.pageMetaBase || {}; const stats = payload.stats || {}; const feedback = stats.feedback || []; const analytics = stats.analytics || []; const commentsAll = stats.comments || []; const comments = url.searchParams.get('path') ? commentsAll.filter((item) => item.path === url.searchParams.get('path')) : commentsAll; const overrides = stats.overrides || []; const logs = stats.logs || []; const dynamicBadges = stats.badges || []; const security = payload.security || {};
  const frPages = pages.filter((page) => page.language === 'fr').length; const enPages = pages.filter((page) => page.language === 'en').length; const yesVotes = feedback.reduce((sum, item) => sum + Number(item.yes || 0), 0); const noVotes = feedback.reduce((sum, item) => sum + Number(item.no || 0), 0); const eventCount = analytics.reduce((sum, item) => sum + Number(item.count || 0), 0); const pageviews = analytics.filter((item) => item.event === 'pageview').reduce((sum, item) => sum + Number(item.count || 0), 0); const zeroSearches = analytics.filter((item) => item.event === 'search_zero').reduce((sum, item) => sum + Number(item.count || 0), 0); const notFound = analytics.filter((item) => item.event === 'not_found').reduce((sum, item) => sum + Number(item.count || 0), 0); const outbound = analytics.filter((item) => item.event === 'outbound').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const rules = baseMeta.rules || []; const badgeKeys = [...new Set([...Object.keys(baseMeta.labels?.fr?.badges || baseMeta.labels?.en?.badges || {}), ...dynamicBadges.filter((item) => item.active).map((item) => item.key)])].sort(); const statusKeys = ['verified-v6','needs-review','legacy-5','draft','unknown']; const filterKeys = [...ALLOWED_FILTERS]; const features = build.features || []; const saved = url.searchParams.get('saved') === '1'; const badgeSaved = url.searchParams.get('badgeSaved') === '1'; const moderated = url.searchParams.get('moderated') === '1';
  const selectedPath = pages.some((page) => page.path === url.searchParams.get('edit')) ? url.searchParams.get('edit') : (pages.find((page) => page.path !== '/')?.path || pages[0]?.path || '/'); const selectedMeta = metaFor(pageMeta, selectedPath); const pageOptions = pages.map((page) => selectOption(page.path, `${page.title || page.path} - ${page.path}`, selectedPath)).join(''); const badgeChecks = badgeKeys.map((key) => checkbox('badges', key, (selectedMeta.badges || []).includes(key))).join(''); const filterChecks = filterKeys.map((key) => checkbox('filters', key, (selectedMeta.filters || []).includes(key))).join(''); const statusOptions = statusKeys.map((key) => selectOption(key, key, selectedMeta.status || 'unknown')).join(''); const audit = auditWiki(pages, pageMeta, feedback, commentsAll); const topPages = analytics.filter((item) => item.event === 'pageview').slice(0, 20); const top404 = analytics.filter((item) => item.event === 'not_found').slice(0, 20); const topOutbound = analytics.filter((item) => item.event === 'outbound').slice(0, 20);
  const panels = {
    overview: `<div class="hero-grid">${card('Pages', n(build.pages || pages.length), `FR ${frPages} / EN ${enPages}`)}${card('Build commit', String(build.commit || 'unknown').slice(0, 8), formatDate(build.builtAt))}${card('D1 storage', security.d1Enabled ? 'Ready' : 'Missing', security.provider)}${card('Open feedback', n(audit.openComments.length), `${n(commentsAll.length)} total comments`)}</div><div class="grid-2"><section class="section"><div class="section-head"><h2>Recently updated</h2>${badge('latest 20','info')}</div>${updatesTable(pages,20)}</section><section class="section"><div class="section-head"><h2>Quick signals</h2>${badge(stats.enabled ? `${stats.provider} enabled` : 'stats disabled', stats.enabled ? 'ok' : 'warn')}</div><div class="grid-3">${card('Pageviews', n(pageviews), 'tracked views')}${card('Zero searches', n(zeroSearches), 'search misses')}${card('Audit issues', n(audit.withoutStatus.length + audit.withoutBadges.length + audit.withoutFilters.length), 'metadata gaps')}</div></section></div>`,
    pages: `<section class="section"><div class="section-head"><h2>Pages</h2>${badge(`${n(pages.length)} pages`,'info')}</div><p class="muted">Actions here are only visible inside the protected admin. Nothing is exposed to regular wiki visitors.</p><div class="page-list" style="margin-top:14px">${pageCards(pages,pageMeta,env)}</div></section>`,
    stats: `<div class="hero-grid">${card('Stats storage', stats.enabled ? 'Enabled' : 'Disabled', stats.provider || 'none')}${card('Events stored', n(eventCount), `${analytics.length} counters`)}${card('404 paths', n(notFound), 'not_found events')}${card('Outbound clicks', n(outbound), 'external clicks')}</div><div class="grid-2"><section class="section"><div class="section-head"><h2>Pages les plus vues</h2>${badge('pageview','info')}</div>${analyticsTable(topPages)}</section><section class="section"><div class="section-head"><h2>Recherches sans résultat</h2>${badge(n(zeroSearches), zeroSearches ? 'warn' : 'info')}</div>${analyticsTable(analytics.filter((item) => item.event === 'search_zero'))}</section></div><div class="grid-2"><section class="section"><div class="section-head"><h2>404 fréquentes</h2>${badge(n(notFound), notFound ? 'warn' : 'info')}</div>${analyticsTable(top404)}</section><section class="section"><div class="section-head"><h2>Liens externes cliqués</h2>${badge(n(outbound),'info')}</div>${analyticsTable(topOutbound)}</section></div><section class="section"><div class="section-head"><h2>Event breakdown</h2>${badge('by type','info')}</div>${bars(breakdown(analytics,'event'))}</section><section class="section"><div class="section-head"><h2>All linked stats</h2>${badge('D1 counters','info')}</div>${analyticsTable(analytics)}</section>`,
    feedback: `<div class="hero-grid">${card('Feedback storage', stats.enabled ? 'Enabled' : 'Disabled', stats.provider || 'none')}${card('Helpful votes', n(yesVotes), 'yes')}${card('Needs work', n(noVotes), 'no')}${card('Open comments', n(audit.openComments.length), 'to moderate')}</div>${moderated ? '<p class="notice">Feedback moderation updated.</p>' : ''}<section class="section"><div class="section-head"><h2>Article feedback</h2>${badge(`${feedback.length} pages`, noVotes ? 'warn' : 'info')}</div>${feedbackTable(feedback, commentsAll, env)}</section><section class="section"><div class="section-head"><h2>Feedback comments moderation</h2>${badge(`${comments.length} visible`, comments.length ? 'warn' : 'info')}</div>${commentsTable(comments, env)}</section>`,
    badges: `<div class="grid-2"><section class="section"><div class="section-head"><h2>Edit page options</h2>${badge(security.d1Enabled ? 'D1 active' : 'D1 missing', security.d1Enabled ? 'ok' : 'warn')}</div>${saved ? '<p class="notice">Saved. The dynamic /page-meta.json now includes this override.</p>' : ''}<form method="get" action="${h(adminBasePath(env))}" class="form-grid"><input type="hidden" name="tab" value="badges"><label>Choose page<select name="edit">${pageOptions}</select></label><button class="button" type="submit">Load page</button></form><hr><form method="post" action="${h(adminActionPath(env,'page-meta'))}" class="form-grid"><input type="hidden" name="path" value="${h(selectedPath)}"><p class="muted">Editing <code>${h(selectedPath)}</code></p><label>Status<select name="status">${statusOptions}</select></label><div><strong>Badges</strong><div class="checks">${badgeChecks}</div></div><div><strong>Filters</strong><div class="checks">${filterChecks}</div></div><button class="button primary" type="submit"${security.d1Enabled ? '' : ' disabled'}>Save page override</button></form></section><section class="section"><div class="section-head"><h2>Create or update badge</h2>${badge(badgeSaved ? 'saved' : 'D1 badge definitions', badgeSaved ? 'ok' : 'info')}</div><form method="post" action="${h(adminActionPath(env,'badge'))}" class="form-grid"><label>Badge key<input name="key" placeholder="example: needs-update" required pattern="[A-Za-z0-9][A-Za-z0-9_-]{1,30}"></label><label>Label FR<input name="label_fr" placeholder="À vérifier"></label><label>Label EN<input name="label_en" placeholder="Needs review"></label><label>Icon<input name="icon" placeholder="⚠️"></label><label>Color<input name="color" placeholder="#f59e0b"></label><label>Status<select name="active"><option value="1">Active</option><option value="0">Disabled</option></select></label><button class="button primary" type="submit"${security.d1Enabled ? '' : ' disabled'}>Save badge definition</button></form></section></div><div class="grid-2"><section class="section"><div class="section-head"><h2>Dynamic badge definitions</h2>${badge(`${dynamicBadges.length} badges`,'info')}</div>${badgesTable(dynamicBadges)}</section><section class="section"><div class="section-head"><h2>Dynamic page overrides</h2>${badge(`${overrides.length} overrides`,'info')}</div>${overridesTable(overrides)}</section></div><section class="section"><div class="section-head"><h2>Static rules from page-meta.json</h2>${badge(`${rules.length} rules`,'info')}</div>${rulesTable(rules)}</section>`,
    audit: `<div class="hero-grid">${card('No status', n(audit.withoutStatus.length), 'unknown status')}${card('No badge', n(audit.withoutBadges.length), 'metadata gap')}${card('No filter', n(audit.withoutFilters.length), 'search category gap')}${card('Open feedback', n(audit.openComments.length), 'needs moderation')}</div><div class="grid-2"><section class="section"><div class="section-head"><h2>Pages sans statut clair</h2>${badge(n(audit.withoutStatus.length), audit.withoutStatus.length ? 'warn':'ok')}</div>${auditList(audit.withoutStatus,'status',env)}</section><section class="section"><div class="section-head"><h2>Pages sans badge</h2>${badge(n(audit.withoutBadges.length), audit.withoutBadges.length ? 'warn':'ok')}</div>${auditList(audit.withoutBadges,'badges',env)}</section></div><div class="grid-2"><section class="section"><div class="section-head"><h2>Pages sans filtre</h2>${badge(n(audit.withoutFilters.length), audit.withoutFilters.length ? 'warn':'ok')}</div>${auditList(audit.withoutFilters,'filters',env)}</section><section class="section"><div class="section-head"><h2>Traductions manquantes</h2>${badge(n(audit.missingTranslations.length), audit.missingTranslations.length ? 'warn':'ok')}</div>${auditList(audit.missingTranslations,'translations',env)}</section></div><section class="section"><div class="section-head"><h2>Pages anciennes</h2>${badge(n(audit.stale.length), audit.stale.length ? 'warn':'ok')}</div>${auditList(audit.stale,'stale',env)}</section>`,
    logs: `<div class="grid-2"><section class="section"><div class="section-head"><h2>Admin history</h2>${badge(`${logs.length} recent`,'info')}</div>${logsTable(logs)}</section><section class="section"><h2>Log de préparation pour Fab</h2><ul class="check-list"><li>✅ L’admin est séparé du wiki public et n’apparaît pas dans la navigation.</li><li>✅ Les pages Markdown restent gérées dans GitHub.</li><li>✅ Les badges, statuts, filtres, feedbacks et stats sont gérés dynamiquement via D1.</li><li>✅ Le rôle Wiki Manager peut gérer les contenus dynamiques sans toucher aux secrets, bindings, API ou base.</li><li>✅ Les actions importantes sont tracées dans cet historique.</li><li>➡️ Workflow Fab : Pages → trouver une page → Edit badges → Save page override.</li></ul></section></div>`,
    security: `<div class="hero-grid">${card('Current user', session.user, session.role)}${card('Basic Auth', security.basicAuthConfigured ? 'Configured' : 'Missing', 'CR_ADMIN_ACCOUNTS preferred')}${card('D1 database', security.d1Enabled ? 'Ready' : 'Missing', 'WIKI_DB binding')}${card('Stats provider', security.provider || 'none', 'D1 preferred')}</div><section class="section"><h2>Permissions</h2><ul class="check-list"><li>Owner: full admin console access.</li><li>Wiki Manager: can manage pages metadata, badges, feedback, audits and logs.</li><li>Dangerous database/API/secret actions are not exposed in this console.</li><li>Keep Cloudflare Access on <code>/__cr-admin/*</code> and <code>/api/admin/*</code>.</li></ul></section>`,
    maintenance: `<div class="grid-3">${card('Current build', String(build.commit || 'unknown').slice(0,8), formatDate(build.builtAt))}${card('Pages indexed', n(build.pages || pages.length), 'page-updates.json')}${card('Features', n(features.length), 'enabled modules')}</div><section class="section"><h2>Maintenance checklist</h2><ul class="check-list"><li>${security.d1Enabled ? '✅' : '⚠'} D1 <code>WIKI_DB</code> stores feedback, analytics, overrides, badge definitions and logs.</li><li>✅ GitHub keeps the raw Markdown content.</li><li>✅ Admin changes only affect dynamic site options.</li><li>✅ Review open feedback comments first.</li><li>✅ Check <code>/page-meta.json</code> after editing badges or filters.</li></ul></section><section class="section"><h2>Build features</h2><p>${pill(features)}</p></section>`
  };
  const subtitles = { overview:'Global wiki health, build state, and quick signals.', pages:'Admin-only quick actions for indexed wiki pages.', stats:'Readable D1 analytics: top pages, search misses, 404 and outbound clicks.', feedback:'Moderate negative feedback and written comments.', badges:'Edit page options and manage badge definitions stored in D1.', audit:'Automatic wiki audit for missing metadata, translations and stale pages.', logs:'Visible admin history for Owner and Wiki Manager accounts.', security:'Admin roles, access boundaries and D1 status.', maintenance:'Operational checklist and safe maintenance notes.' };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Cobblemon Realms Wiki Admin</title><style>
:root{color-scheme:dark;--bg:#0d0d0f;--panel:#151517;--card:#1b1b1f;--line:#303039;--line2:#24242b;--text:#f5f7fb;--muted:#a5adbb;--accent:#4c91ff;--good:#20c875;--warn:#f59e0b;--bad:#ef4444;--violet:#a78bfa}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top left,rgba(76,145,255,.13),transparent 32%),linear-gradient(180deg,#121214,#0b0b0d);color:var(--text);font:14px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.admin-shell{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:100vh}.admin-sidebar{position:sticky;top:0;height:100vh;padding:22px 18px;border-right:1px solid var(--line);background:rgba(15,15,18,.88);overflow:auto}.admin-brand{display:flex;gap:12px;align-items:center;margin-bottom:22px}.admin-logo{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,rgba(76,145,255,.24),rgba(167,139,250,.2));border:1px solid rgba(255,255,255,.12);font-size:22px}.admin-brand strong{display:block;font-size:18px}.admin-brand small{display:block;color:var(--muted);font-size:12px}.admin-nav{display:grid;gap:7px}.admin-nav a{display:flex;align-items:center;gap:10px;width:100%;border:1px solid transparent;border-radius:12px;background:transparent;color:#d9e3f3;text-align:left;padding:10px 12px;text-decoration:none;font-weight:750}.admin-nav a:hover{background:rgba(255,255,255,.045);border-color:rgba(255,255,255,.08)}.admin-nav a.is-active{background:rgba(76,145,255,.14);border-color:rgba(76,145,255,.45);color:#fff}.admin-main{padding:26px min(42px,4vw) 42px;max-width:1460px;width:100%}.admin-topbar{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:20px}.admin-topbar h1{margin:0 0 5px;font-size:30px}.muted{color:var(--muted)}.admin-actions{display:flex;gap:8px;flex-wrap:wrap}.admin-actions.compact{margin-top:8px}.button{display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.04);color:var(--text);padding:8px 11px;text-decoration:none;font-weight:800;cursor:pointer}.button.primary{background:rgba(76,145,255,.16);border-color:rgba(76,145,255,.5)}.button.mini{padding:5px 8px;font-size:12px}.button:disabled{opacity:.5;cursor:not-allowed}.hero-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}.card{border:1px solid var(--line);border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.026));padding:17px}.card small{display:block;color:var(--muted);font-weight:750}.card strong{display:block;margin-top:6px;font-size:25px}.section{margin-top:16px;border:1px solid var(--line);border-radius:18px;background:rgba(24,24,28,.88);padding:18px;overflow:auto}.section-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:13px}.section h2{margin:0;font-size:19px}.section h3{margin:0 0 10px;font-size:16px}.status{display:inline-flex;padding:4px 9px;border-radius:999px;background:rgba(76,145,255,.12);color:#8ab4ff;font-weight:850;font-size:12px}.ok{background:rgba(32,200,117,.13);color:#71e0a6}.warn{background:rgba(245,158,11,.14);color:#f8c46a}.info{background:rgba(76,145,255,.13);color:#a8c9ff}.grid-2{display:grid;grid-template-columns:1.05fr .95fr;gap:16px}.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}table{width:100%;border-collapse:collapse}th,td{padding:10px 9px;border-top:1px solid var(--line2);text-align:left;vertical-align:top}th{color:#d8deea;font-size:11px;text-transform:uppercase;letter-spacing:.055em}code{padding:2px 6px;border-radius:7px;background:#25252d;color:#dbeafe;font-size:12px}.pill{display:inline-flex;margin:2px 4px 2px 0;padding:3px 8px;border:1px solid #454550;border-radius:999px;color:#e8ecf6;font-size:12px;font-weight:750}.pill-row{margin-top:7px}.form-grid{display:grid;gap:14px}.form-grid label{display:grid;gap:7px}.form-grid input,.form-grid select{min-height:40px;border:1px solid var(--line);border-radius:12px;background:#111116;color:#fff;padding:8px 11px}.checks{display:flex;flex-wrap:wrap;gap:8px}.check{display:inline-flex!important;gap:7px;align-items:center;border:1px solid var(--line2);border-radius:999px;padding:7px 10px;background:rgba(255,255,255,.025)}.inline-form{display:flex;gap:6px;flex-wrap:wrap}.page-list{display:grid;gap:8px}.page-card{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(180px,.8fr) minmax(150px,.6fr);gap:12px;align-items:center;border:1px solid var(--line2);border-radius:13px;background:rgba(255,255,255,.025);padding:12px}.page-card strong,.page-card small{display:block}.page-card small{color:var(--muted)}.bars{display:grid;gap:9px;margin-bottom:18px}.bar{display:grid;grid-template-columns:160px 1fr 58px;gap:10px;align-items:center}.bar-track{height:9px;border-radius:999px;background:#25252d;overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--violet))}.empty{padding:18px;border:1px dashed #3a3a45;border-radius:14px;color:var(--muted);background:rgba(255,255,255,.02)}.notice{padding:12px 14px;border:1px solid rgba(32,200,117,.35);border-radius:12px;background:rgba(32,200,117,.1);color:#8df0bb}.check-list{display:grid;gap:9px;margin:0;padding:0;list-style:none}.check-list li{padding:11px;border:1px solid var(--line2);border-radius:12px;background:rgba(255,255,255,.025)}.admin-footer-note{margin-top:18px;color:var(--muted);font-size:12px}hr{border:0;border-top:1px solid var(--line);margin:18px 0}@media(max-width:1000px){.admin-shell{grid-template-columns:1fr}.admin-sidebar{position:relative;height:auto}.admin-nav{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-grid,.grid-3{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-2{grid-template-columns:1fr}.page-card{grid-template-columns:1fr}}@media(max-width:620px){.admin-main{padding:18px 12px 30px}.hero-grid,.grid-3,.admin-nav{grid-template-columns:1fr}.admin-topbar{display:block}.bar{grid-template-columns:1fr}.section{padding:14px}}
</style></head><body><div class="admin-shell"><aside class="admin-sidebar"><div class="admin-brand"><div class="admin-logo">🛠️</div><div><strong>Cobblemon Realms</strong><small>Wiki Admin Console</small></div></div><nav class="admin-nav">${adminNav(env, activeTab)}</nav><p class="admin-footer-note">Signed in as ${h(session.user)} (${h(session.role)}). Hidden dashboard. Keep this URL private.</p></aside><main class="admin-main"><div class="admin-topbar"><div><h1>${h(activeTab[0].toUpperCase() + activeTab.slice(1).replace('-', ' '))}</h1><p class="muted">${h(subtitles[activeTab])}</p></div><div class="admin-actions"><a class="button" href="/" target="_blank" rel="noopener">Open wiki</a><a class="button" href="${h(adminLink(env, activeTab, url.searchParams.get('edit') ? { edit: url.searchParams.get('edit') } : {}))}">Refresh</a></div></div>${panels[activeTab] || panels.overview}</main></div></body></html>`;
}

async function serveAdminDashboard(request, env) {
  const auth = getAdminSession(env, request);
  if (auth.denied) return auth.denied;
  const payload = await getAdminPayload(request, env);
  await logAdminAction(env, auth.session, 'admin.view', new URL(request.url).searchParams.get('tab') || 'overview', {}).catch(() => null);
  return new Response(adminDashboardHtml(payload, request, env, auth.session), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow', 'x-content-type-options': 'nosniff' } });
}

class HeadStylesheetInjector {
  element(element) {
    element.append('<link rel="stylesheet" href="/assets/discord.css?v=community-badges-4" data-community-badges="true"><link rel="stylesheet" href="/assets/gitbook-blocks.css?v=gitbook-reference-3" data-gitbook-blocks="true">', { html: true });
  }
}
class BodyScriptInjector {
  element(element) {
    element.append('<script src="/assets/gitbook-blocks.js?v=gitbook-reference-3"></script>', { html: true });
  }
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (isAdminDashboardPath(url, env)) return serveAdminDashboard(request, env);
    if (isAdminActionPath(url, env, 'status')) return getAdminStatus(request, env);
    if (isAdminActionPath(url, env, 'page-meta')) return savePageMetaOverride(request, env);
    if (isAdminActionPath(url, env, 'badge')) return saveBadgeDefinition(request, env);
    if (isAdminActionPath(url, env, 'feedback')) return moderateFeedback(request, env);
    if (url.pathname === '/page-meta.json') return servePageMeta(request, env);
    if (url.pathname === '/api/discord') { if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405); return getDiscordStats(request, context); }
    if (url.pathname === '/api/curseforge') { if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405); return getCurseForgeStats(request, context); }
    if (url.pathname === '/api/server') { if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405); return getMinecraftServerStats(request, context); }
    if (url.pathname === '/api/analytics') return recordAnonymousAnalytics(request, env);
    if (url.pathname === '/api/feedback') return recordArticleFeedback(request, env);
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) return new HTMLRewriter().on('head', new HeadStylesheetInjector()).on('body', new BodyScriptInjector()).transform(response);
    return response;
  }
};