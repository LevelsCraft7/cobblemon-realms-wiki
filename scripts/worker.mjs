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
        players: {
          online: online && Number.isFinite(status.players?.online) ? status.players.online : 0,
          max: online && Number.isFinite(status.players?.max) ? status.players.max : 0
        },
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
  const path = value.slice(0, 180).replace(/[^a-zA-Z0-9_./-]/g, '');
  return path.startsWith('/') ? path : '/';
}

function sanitizeComment(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 700);
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
    CREATE INDEX IF NOT EXISTS idx_admin_logs_created ON admin_logs(created_at DESC);
  `);
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
    await env.WIKI_DB.prepare('INSERT INTO article_feedback_comments (path, language, comment, created_at) VALUES (?, ?, ?, ?)')
      .bind(path, language, cleanComment, now)
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
function isAdminDashboardPath(url, env) { const token = adminToken(env); return token ? url.pathname === `/__cr-admin/${token}` || url.pathname === `/__cr-admin/${token}/` : url.pathname === '/__cr-admin' || url.pathname === '/__cr-admin/'; }
function isAdminStatusPath(url, env) { const token = adminToken(env); return token ? url.pathname === `/api/admin/${token}/status` : url.pathname === '/api/admin/status'; }
function isAdminMetaPath(url, env) { const token = adminToken(env); return token ? url.pathname === `/api/admin/${token}/page-meta` : url.pathname === '/api/admin/page-meta'; }
function unauthorizedAdmin(message = 'Unauthorized') { return new Response(message, { status: 401, headers: { 'www-authenticate': 'Basic realm="Cobblemon Realms Wiki Admin", charset="UTF-8"', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } }); }

function configuredAccounts(env) {
  const raw = typeof env.CR_ADMIN_ACCOUNTS === 'string' ? env.CR_ADMIN_ACCOUNTS.trim() : '';
  if (raw) {
    try {
      const accounts = JSON.parse(raw);
      if (Array.isArray(accounts)) {
        return accounts
          .filter((item) => item && typeof item.user === 'string' && typeof item.password === 'string')
          .map((item) => ({ user: item.user, password: item.password, role: item.role === 'wiki' ? 'wiki' : 'owner' }));
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

function adminAccessDenied(env, request) {
  return getAdminSession(env, request).denied || null;
}

async function readAssetJson(request, env, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = '';
  const response = await env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }));
  if (!response.ok) return null;
  try { return await response.json(); } catch { return null; }
}

async function readStatsKV(env) {
  if (!env.WIKI_STATS) return { enabled: false, provider: 'none', feedback: [], analytics: [], comments: [], overrides: [], logs: [] };
  const feedback = [];
  const analytics = [];
  const feedbackList = await env.WIKI_STATS.list({ prefix: 'feedback:', limit: 1000 }).catch(() => ({ keys: [] }));
  for (const key of feedbackList.keys || []) {
    const value = await env.WIKI_STATS.get(key.name, 'json').catch(() => null);
    if (value) feedback.push(value);
  }
  const statsList = await env.WIKI_STATS.list({ prefix: 'stats:', limit: 1000 }).catch(() => ({ keys: [] }));
  for (const key of statsList.keys || []) {
    const value = await env.WIKI_STATS.get(key.name, 'json').catch(() => null);
    if (value) analytics.push(value);
  }
  feedback.sort((a, b) => Number(b.no || 0) - Number(a.no || 0) || Number(b.yes || 0) - Number(a.yes || 0));
  analytics.sort((a, b) => Number(b.count || 0) - Number(a.count || 0));
  return { enabled: true, provider: 'kv', feedback, analytics, comments: [], overrides: [], logs: [] };
}

async function readStatsD1(env) {
  if (!d1Available(env)) return null;
  await initD1(env);
  const [analytics, feedback, comments, overrides, logs] = await Promise.all([
    env.WIKI_DB.prepare('SELECT event, path, detail, language, count, updated_at AS updatedAt FROM analytics_events ORDER BY count DESC, updated_at DESC LIMIT 1000').all(),
    env.WIKI_DB.prepare('SELECT path, language, yes_count AS yes, no_count AS no, updated_at AS updatedAt FROM article_feedback ORDER BY no_count DESC, yes_count DESC LIMIT 1000').all(),
    env.WIKI_DB.prepare('SELECT id, path, language, comment, created_at AS createdAt FROM article_feedback_comments ORDER BY created_at DESC LIMIT 250').all(),
    env.WIKI_DB.prepare('SELECT path, status, badges_json AS badgesJson, filters_json AS filtersJson, updated_at AS updatedAt, updated_by AS updatedBy FROM page_meta_overrides ORDER BY updated_at DESC LIMIT 1000').all(),
    env.WIKI_DB.prepare('SELECT id, actor, role, action, target, payload_json AS payloadJson, created_at AS createdAt FROM admin_logs ORDER BY created_at DESC LIMIT 120').all()
  ]);
  return {
    enabled: true,
    provider: 'd1',
    analytics: analytics.results || [],
    feedback: feedback.results || [],
    comments: comments.results || [],
    overrides: (overrides.results || []).map((item) => ({
      path: item.path,
      status: item.status,
      badges: parseJsonArray(item.badgesJson),
      filters: parseJsonArray(item.filtersJson),
      updatedAt: item.updatedAt,
      updatedBy: item.updatedBy
    })),
    logs: logs.results || []
  };
}

async function readStats(env) {
  const d1 = await readStatsD1(env).catch(() => null);
  if (d1) return d1;
  return readStatsKV(env);
}

function applyPageMetaOverrides(baseMeta, overrides = []) {
  const meta = JSON.parse(JSON.stringify(baseMeta || {}));
  meta.pages = meta.pages || {};
  meta.dynamicOverrides = { enabled: overrides.length > 0, count: overrides.length, source: 'd1' };
  for (const item of overrides) {
    meta.pages[item.path] = {
      ...(meta.pages[item.path] || {}),
      status: item.status || 'unknown',
      badges: item.badges || [],
      filters: item.filters || [],
      source: 'd1',
      updatedAt: item.updatedAt,
      updatedBy: item.updatedBy
    };
  }
  return meta;
}

async function getDynamicPageMeta(request, env) {
  const baseMeta = await readAssetJson(request, env, '/page-meta.json') || {};
  const stats = await readStats(env);
  return applyPageMetaOverrides(baseMeta, stats.overrides || []);
}

async function servePageMeta(request, env) {
  return json(await getDynamicPageMeta(request, env), 200, 'no-store');
}

function allowedBadges(pageMeta) {
  return new Set(Object.keys(pageMeta?.labels?.fr?.badges || pageMeta?.labels?.en?.badges || {}));
}

function normalizeArray(value, allowed) {
  if (!Array.isArray(value)) return [];
  const out = [];
  for (const item of value) {
    if (typeof item !== 'string') continue;
    const clean = item.trim();
    if (!clean || (allowed && !allowed.has(clean))) continue;
    if (!out.includes(clean)) out.push(clean);
  }
  return out;
}

async function savePageMetaOverride(request, env) {
  const { session, denied } = getAdminSession(env, request);
  if (denied) return denied;
  if (!d1Available(env)) return json({ error: 'D1 WIKI_DB binding is not configured.' }, 503);
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const path = sanitizeAnalyticsPath(payload?.path);
  if (!path || path === '/') return json({ error: 'A concrete page path is required.' }, 400);
  const baseMeta = await readAssetJson(request, env, '/page-meta.json') || {};
  const status = ALLOWED_STATUSES.has(payload?.status) ? payload.status : 'unknown';
  const badges = normalizeArray(payload?.badges, allowedBadges(baseMeta));
  const filters = normalizeArray(payload?.filters, ALLOWED_FILTERS);
  const now = new Date().toISOString();
  await initD1(env);
  await env.WIKI_DB.prepare(`
    INSERT INTO page_meta_overrides (path, status, badges_json, filters_json, updated_at, updated_by)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(path)
    DO UPDATE SET status = excluded.status, badges_json = excluded.badges_json, filters_json = excluded.filters_json, updated_at = excluded.updated_at, updated_by = excluded.updated_by
  `).bind(path, status, JSON.stringify(badges), JSON.stringify(filters), now, session.user).run();
  await logAdminAction(env, session, 'page_meta.update', path, { status, badges, filters });
  return json({ ok: true, override: { path, status, badges, filters, updatedAt: now, updatedBy: session.user } });
}

async function getAdminPayload(request, env) {
  const [buildInfo, pageUpdates, pageMetaRaw, searchIndex, stats] = await Promise.all([
    readAssetJson(request, env, '/build-info.json'),
    readAssetJson(request, env, '/page-updates.json'),
    readAssetJson(request, env, '/page-meta.json'),
    readAssetJson(request, env, '/search-index.json'),
    readStats(env)
  ]);
  const pageMeta = applyPageMetaOverrides(pageMetaRaw || {}, stats.overrides || []);
  return {
    buildInfo: buildInfo || {},
    pageUpdates: Array.isArray(pageUpdates) ? pageUpdates : [],
    pageMeta,
    pageMetaBase: pageMetaRaw || {},
    pageCount: Array.isArray(searchIndex) ? searchIndex.length : null,
    stats,
    security: {
      basicAuthConfigured: configuredAccounts(env).length > 0,
      secretPathEnabled: Boolean(adminToken(env)),
      d1Enabled: d1Available(env),
      statsStorageEnabled: d1Available(env) || Boolean(env.WIKI_STATS),
      provider: d1Available(env) ? 'd1' : env.WIKI_STATS ? 'kv' : 'none'
    }
  };
}

async function getAdminStatus(request, env) {
  const denied = adminAccessDenied(env, request);
  if (denied) return denied;
  return json(await getAdminPayload(request, env));
}

function h(value = '') { return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c])); }
function scriptJson(value) { return JSON.stringify(value).replace(/<\//g, '<\\/'); }
function n(value) { return Number(value || 0).toLocaleString('fr-FR'); }
function pct(part, total) { return total ? Math.round((Number(part || 0) / total) * 100) : 0; }
function formatDate(value) {
  if (!value) return 'Unknown';
  try { return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)); } catch { return String(value); }
}
function pill(values = []) { return values.length ? values.map((v) => `<span class="pill">${h(v)}</span>`).join('') : '<span class="muted">None</span>'; }
function badge(text, type = 'info') { return `<span class="status ${type}">${h(text)}</span>`; }
function card(title, value, note = '') { return `<article class="card"><small>${h(title)}</small><strong>${h(value)}</strong><small>${h(note)}</small></article>`; }

function metaFor(pageMeta, pagePath) {
  const defaults = pageMeta?.defaults || { status: 'unknown', badges: [], filters: [] };
  let out = { status: defaults.status || 'unknown', badges: defaults.badges || [], filters: defaults.filters || [] };
  const normalized = String(pagePath || '').replace(/\/$/, '') || '/';
  const noLang = normalized.replace(/^\/fr-FR/i, '');
  for (const rule of pageMeta?.rules || []) {
    try {
      const re = new RegExp(rule.match);
      if (re.test(normalized) || re.test(noLang)) out = { ...out, ...rule };
    } catch {}
  }
  const exact = pageMeta?.pages?.[normalized] || pageMeta?.pages?.[noLang];
  return exact ? { ...out, ...exact } : out;
}

function updatesTable(items, limit = 80) {
  if (!items.length) return '<div class="empty">No page update index available.</div>';
  return `<table><thead><tr><th>Title</th><th>Path</th><th>Lang</th><th>Updated</th></tr></thead><tbody>${items.slice(0, limit).map((item) => `<tr><td>${h(item.title || item.path)}</td><td><code>${h(item.path)}</code></td><td>${h(item.language || '')}</td><td>${h(formatDate(item.updatedAt))}</td></tr>`).join('')}</tbody></table>`;
}

function feedbackTable(items, comments) {
  if (!items.length) return '<div class="empty">No feedback stored yet.</div>';
  const latestByPath = new Map();
  for (const item of comments || []) if (!latestByPath.has(item.path)) latestByPath.set(item.path, item.comment);
  return `<table><thead><tr><th>Page</th><th>Yes</th><th>No</th><th>Score</th><th>Latest comment</th><th>Updated</th></tr></thead><tbody>${items.slice(0, 160).map((item) => { const total = Number(item.yes || 0) + Number(item.no || 0); return `<tr><td><code>${h(item.path)}</code></td><td>${n(item.yes)}</td><td>${n(item.no)}</td><td>${pct(item.yes, total)}%</td><td>${h(latestByPath.get(item.path) || '')}</td><td>${h(formatDate(item.updatedAt))}</td></tr>`; }).join('')}</tbody></table>`;
}

function commentsTable(items) {
  if (!items.length) return '<div class="empty">No written feedback comments yet.</div>';
  return `<table><thead><tr><th>Page</th><th>Lang</th><th>Comment</th><th>Date</th></tr></thead><tbody>${items.slice(0, 160).map((item) => `<tr><td><code>${h(item.path)}</code></td><td>${h(item.language || '')}</td><td>${h(item.comment || '')}</td><td>${h(formatDate(item.createdAt))}</td></tr>`).join('')}</tbody></table>`;
}

function analyticsTable(items) {
  if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>';
  return `<table><thead><tr><th>Event</th><th>Detail</th><th>Path</th><th>Count</th><th>Updated</th></tr></thead><tbody>${items.slice(0, 180).map((item) => `<tr><td>${h(item.event || '')}</td><td>${h(item.detail || '')}</td><td><code>${h(item.path || '')}</code></td><td>${n(item.count)}</td><td>${h(formatDate(item.updatedAt))}</td></tr>`).join('')}</tbody></table>`;
}

function rulesTable(items) {
  if (!items.length) return '<div class="empty">No page-meta rules configured.</div>';
  return `<table><thead><tr><th>Match</th><th>Status</th><th>Badges</th><th>Filters</th></tr></thead><tbody>${items.map((rule) => `<tr><td><code>${h(rule.match || '')}</code></td><td>${h(rule.status || '')}</td><td>${pill(rule.badges || [])}</td><td>${pill(rule.filters || [])}</td></tr>`).join('')}</tbody></table>`;
}

function overridesTable(items) {
  if (!items.length) return '<div class="empty">No dynamic D1 override yet.</div>';
  return `<table><thead><tr><th>Path</th><th>Status</th><th>Badges</th><th>Filters</th><th>Updated</th></tr></thead><tbody>${items.map((item) => `<tr><td><code>${h(item.path)}</code></td><td>${h(item.status || '')}</td><td>${pill(item.badges || [])}</td><td>${pill(item.filters || [])}</td><td>${h(formatDate(item.updatedAt))}<br><small>${h(item.updatedBy || '')}</small></td></tr>`).join('')}</tbody></table>`;
}

function logsTable(items) {
  if (!items.length) return '<div class="empty">No admin log yet.</div>';
  return `<table><thead><tr><th>Actor</th><th>Action</th><th>Target</th><th>Date</th></tr></thead><tbody>${items.map((item) => `<tr><td>${h(item.actor || '')}<br><small>${h(item.role || '')}</small></td><td>${h(item.action || '')}</td><td><code>${h(item.target || '')}</code></td><td>${h(formatDate(item.createdAt))}</td></tr>`).join('')}</tbody></table>`;
}

function bars(items) {
  if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>';
  const total = items.reduce((sum, item) => sum + Number(item.count || 0), 0);
  return `<div class="bars">${items.slice(0, 12).map((item) => `<div class="bar"><span><code>${h(item.event || '')}</code></span><div class="bar-track"><div class="bar-fill" style="width:${pct(item.count, total)}%"></div></div><span>${n(item.count)}</span></div>`).join('')}</div>`;
}

function breakdown(items, key) {
  const map = new Map();
  for (const item of items) map.set(item[key] || 'none', (map.get(item[key] || 'none') || 0) + Number(item.count || 0));
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ event: name, count }));
}

function pageCards(pages, pageMeta) {
  if (!pages.length) return '<div class="empty">No pages indexed yet.</div>';
  return pages.map((page) => {
    const meta = metaFor(pageMeta, page.path);
    const statusType = meta.status === 'verified-v6' ? 'ok' : meta.status === 'draft' || meta.status === 'needs-review' ? 'warn' : 'info';
    return `<article class="page-card" data-search="${h(`${page.title || ''} ${page.path || ''}`.toLowerCase())}" data-lang="${h(page.language || '')}" data-filters="${h((meta.filters || []).join(' '))}"><div><strong>${h(page.title || page.path)}</strong><small><code>${h(page.path || '')}</code></small></div><div><small>Status</small>${badge(meta.status || 'unknown', statusType)}<div class="pill-row">${pill(meta.badges || [])}</div></div><div><small>Filters</small><div class="pill-row">${pill(meta.filters || [])}</div><small>Updated ${h(formatDate(page.updatedAt))}</small></div></article>`;
  }).join('');
}

function adminDashboardHtml(payload, request, env) {
  const token = adminToken(env);
  const adminMetaPath = token ? `/api/admin/${token}/page-meta` : '/api/admin/page-meta';
  const build = payload.buildInfo || {};
  const pages = payload.pageUpdates || [];
  const pageMeta = payload.pageMeta || {};
  const baseMeta = payload.pageMetaBase || {};
  const stats = payload.stats || {};
  const feedback = stats.feedback || [];
  const analytics = stats.analytics || [];
  const comments = stats.comments || [];
  const overrides = stats.overrides || [];
  const logs = stats.logs || [];
  const security = payload.security || {};
  const frPages = pages.filter((page) => page.language === 'fr').length;
  const enPages = pages.filter((page) => page.language === 'en').length;
  const yesVotes = feedback.reduce((sum, item) => sum + Number(item.yes || 0), 0);
  const noVotes = feedback.reduce((sum, item) => sum + Number(item.no || 0), 0);
  const eventCount = analytics.reduce((sum, item) => sum + Number(item.count || 0), 0);
  const pageviews = analytics.filter((item) => item.event === 'pageview').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const zeroSearches = analytics.filter((item) => item.event === 'search_zero').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const notFound = analytics.filter((item) => item.event === 'not_found').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const outbound = analytics.filter((item) => item.event === 'outbound').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const rules = baseMeta.rules || [];
  const badgeKeys = Object.keys(baseMeta.labels?.fr?.badges || baseMeta.labels?.en?.badges || {});
  const statusKeys = ['verified-v6', 'needs-review', 'legacy-5', 'draft', 'unknown'];
  const filterKeys = [...ALLOWED_FILTERS];
  const features = build.features || [];
  const pageOptions = pages.map((page) => `<option value="${h(page.path)}">${h(page.title || page.path)} - ${h(page.path)}</option>`).join('');
  const badgeChecks = badgeKeys.map((key) => `<label class="check"><input type="checkbox" name="badges" value="${h(key)}"> ${h(key)}</label>`).join('');
  const filterChecks = filterKeys.map((key) => `<label class="check"><input type="checkbox" name="filters" value="${h(key)}"> ${h(key)}</label>`).join('');
  const statusOptions = statusKeys.map((key) => `<option value="${h(key)}">${h(key)}</option>`).join('');
  const metaScriptData = { pages: pages.map((page) => ({ path: page.path, title: page.title })), meta: pageMeta, overrides, savePath: adminMetaPath };

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Cobblemon Realms Wiki Admin</title><style>
:root{color-scheme:dark;--bg:#0d0d0f;--panel:#151517;--card:#1b1b1f;--line:#303039;--line2:#24242b;--text:#f5f7fb;--muted:#a5adbb;--accent:#4c91ff;--good:#20c875;--warn:#f59e0b;--bad:#ef4444;--violet:#a78bfa}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top left,rgba(76,145,255,.13),transparent 32%),linear-gradient(180deg,#121214,#0b0b0d);color:var(--text);font:14px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.admin-shell{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:100vh}.admin-sidebar{position:sticky;top:0;height:100vh;padding:22px 18px;border-right:1px solid var(--line);background:rgba(15,15,18,.88);overflow:auto}.admin-brand{display:flex;gap:12px;align-items:center;margin-bottom:22px}.admin-logo{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,rgba(76,145,255,.24),rgba(167,139,250,.2));border:1px solid rgba(255,255,255,.12);font-size:22px}.admin-brand strong{display:block;font-size:18px}.admin-brand small{display:block;color:var(--muted);font-size:12px}.admin-nav{display:grid;gap:7px}.admin-nav button{display:flex;align-items:center;gap:10px;width:100%;border:1px solid transparent;border-radius:12px;background:transparent;color:#d9e3f3;text-align:left;padding:10px 12px;cursor:pointer;font-weight:750}.admin-nav button:hover{background:rgba(255,255,255,.045);border-color:rgba(255,255,255,.08)}.admin-nav button.is-active{background:rgba(76,145,255,.14);border-color:rgba(76,145,255,.45);color:#fff}.admin-main{padding:26px min(42px,4vw) 42px;max-width:1460px;width:100%}.admin-topbar{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:20px}.admin-topbar h1{margin:0 0 5px;font-size:30px}.muted{color:var(--muted)}.admin-actions{display:flex;gap:8px;flex-wrap:wrap}.button{border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.04);color:var(--text);padding:8px 11px;text-decoration:none;font-weight:800;cursor:pointer}.button.primary{background:rgba(76,145,255,.16);border-color:rgba(76,145,255,.5)}.tab-panel{display:none}.tab-panel.is-active{display:block}.hero-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}.card{border:1px solid var(--line);border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.026));padding:17px}.card small{display:block;color:var(--muted);font-weight:750}.card strong{display:block;margin-top:6px;font-size:25px}.section{margin-top:16px;border:1px solid var(--line);border-radius:18px;background:rgba(24,24,28,.88);padding:18px;overflow:hidden}.section-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:13px}.section h2{margin:0;font-size:19px}.section h3{margin:0 0 10px;font-size:16px}.status{display:inline-flex;padding:4px 9px;border-radius:999px;background:rgba(76,145,255,.12);color:#8ab4ff;font-weight:850;font-size:12px}.ok{background:rgba(32,200,117,.13);color:#71e0a6}.warn{background:rgba(245,158,11,.14);color:#f8c46a}.info{background:rgba(76,145,255,.13);color:#a8c9ff}.grid-2{display:grid;grid-template-columns:1.05fr .95fr;gap:16px}.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}table{width:100%;border-collapse:collapse}th,td{padding:10px 9px;border-top:1px solid var(--line2);text-align:left;vertical-align:top}th{color:#d8deea;font-size:11px;text-transform:uppercase;letter-spacing:.055em}code{padding:2px 6px;border-radius:7px;background:#25252d;color:#dbeafe;font-size:12px}.pill{display:inline-flex;margin:2px 4px 2px 0;padding:3px 8px;border:1px solid #454550;border-radius:999px;color:#e8ecf6;font-size:12px;font-weight:750}.pill-row{margin-top:7px}.search-row,.form-row{display:flex;gap:10px;flex-wrap:wrap}.search-row input,.search-row select,.form-row input,.form-row select{min-height:40px;border:1px solid var(--line);border-radius:12px;background:#111116;color:#fff;padding:8px 11px}.search-row input{flex:1 1 280px}.form-grid{display:grid;gap:14px}.checks{display:flex;flex-wrap:wrap;gap:8px}.check{display:inline-flex;gap:7px;align-items:center;border:1px solid var(--line2);border-radius:999px;padding:7px 10px;background:rgba(255,255,255,.025)}.page-list{display:grid;gap:8px}.page-card{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(180px,.8fr) minmax(150px,.6fr);gap:12px;align-items:center;border:1px solid var(--line2);border-radius:13px;background:rgba(255,255,255,.025);padding:12px}.page-card[hidden]{display:none}.page-card strong,.page-card small{display:block}.page-card small{color:var(--muted)}.bars{display:grid;gap:9px;margin-bottom:18px}.bar{display:grid;grid-template-columns:160px 1fr 58px;gap:10px;align-items:center}.bar-track{height:9px;border-radius:999px;background:#25252d;overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--violet))}.empty{padding:18px;border:1px dashed #3a3a45;border-radius:14px;color:var(--muted);background:rgba(255,255,255,.02)}pre{max-height:360px;overflow:auto;padding:14px;border:1px solid var(--line);border-radius:14px;background:#101015;color:#d9e4ff}.check-list{display:grid;gap:9px;margin:0;padding:0;list-style:none}.check-list li{padding:11px;border:1px solid var(--line2);border-radius:12px;background:rgba(255,255,255,.025)}.admin-footer-note{margin-top:18px;color:var(--muted);font-size:12px}@media(max-width:1000px){.admin-shell{grid-template-columns:1fr}.admin-sidebar{position:relative;height:auto}.admin-nav{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-grid,.grid-3{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-2{grid-template-columns:1fr}.page-card{grid-template-columns:1fr}}@media(max-width:620px){.admin-main{padding:18px 12px 30px}.hero-grid,.grid-3,.admin-nav{grid-template-columns:1fr}.admin-topbar{display:block}.bar{grid-template-columns:1fr}.section{padding:14px}}
</style></head><body><div class="admin-shell"><aside class="admin-sidebar"><div class="admin-brand"><div class="admin-logo">🛠️</div><div><strong>Cobblemon Realms</strong><small>Wiki Admin Console</small></div></div><nav class="admin-nav"><button type="button" data-admin-tab="overview" class="is-active">🏠 Overview</button><button type="button" data-admin-tab="pages">📄 Pages</button><button type="button" data-admin-tab="stats">📊 Stats</button><button type="button" data-admin-tab="feedback">👍 Feedback</button><button type="button" data-admin-tab="badges">🏷️ Badges & Filters</button><button type="button" data-admin-tab="security">🔐 Security</button><button type="button" data-admin-tab="maintenance">⚙️ Maintenance</button></nav><p class="admin-footer-note">Hidden dashboard. Keep this URL private.</p></aside><main class="admin-main"><div class="admin-topbar"><div><h1 id="tab-title">Overview</h1><p class="muted" id="tab-subtitle">Global wiki health, build state, and quick signals.</p></div><div class="admin-actions"><a class="button" href="/" target="_blank" rel="noopener">Open wiki</a><button class="button" type="button" onclick="location.reload()">Refresh</button></div></div>
<section class="tab-panel is-active" data-panel="overview"><div class="hero-grid">${card('Pages', n(build.pages || pages.length), `FR ${frPages} / EN ${enPages}`)}${card('Build commit', String(build.commit || 'unknown').slice(0, 8), formatDate(build.builtAt))}${card('D1 storage', security.d1Enabled ? 'Ready' : 'Missing', security.provider)}${card('Feedback issues', n(noVotes), `${n(comments.length)} comments`)}</div><div class="grid-2"><section class="section"><div class="section-head"><h2>Recently updated</h2>${badge('latest 20', 'info')}</div>${updatesTable(pages, 20)}</section><section class="section"><div class="section-head"><h2>Quick signals</h2>${badge(stats.enabled ? `${stats.provider} enabled` : 'stats disabled', stats.enabled ? 'ok' : 'warn')}</div><div class="grid-3">${card('Analytics events', n(eventCount), `${analytics.length} rows`)}${card('Pageviews', n(pageviews), 'tracked views')}${card('Zero searches', n(zeroSearches), 'search misses')}</div></section></div></section>
<section class="tab-panel" data-panel="pages"><section class="section"><div class="section-head"><h2>Pages</h2>${badge(`${n(pages.length)} pages`, 'info')}</div><div class="search-row"><input id="page-search" placeholder="Search title or path"><select id="page-lang"><option value="all">All languages</option><option value="fr">French</option><option value="en">English</option></select><select id="page-filter"><option value="all">All filters</option><option value="gameplay">Gameplay</option><option value="mods">Mods</option><option value="legendary">Legendary</option><option value="server">Server</option><option value="commands">Commands</option></select></div><div class="page-list" style="margin-top:14px">${pageCards(pages, pageMeta)}</div><div class="empty" id="page-empty" hidden>No matching page.</div></section></section>
<section class="tab-panel" data-panel="stats"><div class="hero-grid">${card('Stats storage', stats.enabled ? 'Enabled' : 'Disabled', stats.provider || 'none')}${card('Events stored', n(eventCount), `${analytics.length} counters`)}${card('404 paths', n(notFound), 'not_found events')}${card('Outbound clicks', n(outbound), 'external clicks')}</div><div class="grid-2"><section class="section"><div class="section-head"><h2>Event breakdown</h2>${badge('by type', 'info')}</div>${bars(breakdown(analytics, 'event'))}</section><section class="section"><div class="section-head"><h2>Search misses</h2>${badge(n(zeroSearches), zeroSearches ? 'warn' : 'info')}</div>${analyticsTable(analytics.filter((item) => item.event === 'search_zero'))}</section></div><section class="section"><div class="section-head"><h2>All linked stats</h2>${badge('D1 counters', 'info')}</div>${analyticsTable(analytics)}</section></section>
<section class="tab-panel" data-panel="feedback"><div class="hero-grid">${card('Feedback storage', stats.enabled ? 'Enabled' : 'Disabled', stats.provider || 'none')}${card('Helpful votes', n(yesVotes), 'yes')}${card('Needs work', n(noVotes), 'no')}${card('Written comments', n(comments.length), 'from negative votes')}</div><section class="section"><div class="section-head"><h2>Article feedback</h2>${badge(`${feedback.length} pages`, noVotes ? 'warn' : 'info')}</div>${feedbackTable(feedback, comments)}</section><section class="section"><div class="section-head"><h2>Latest written comments</h2>${badge(`${comments.length} comments`, comments.length ? 'warn' : 'info')}</div>${commentsTable(comments)}</section></section>
<section class="tab-panel" data-panel="badges"><div class="grid-2"><section class="section"><div class="section-head"><h2>Edit page options</h2>${badge(security.d1Enabled ? 'D1 active' : 'D1 missing', security.d1Enabled ? 'ok' : 'warn')}</div><div class="form-grid"><label>Page<select id="meta-page">${pageOptions}</select></label><label>Status<select id="meta-status">${statusOptions}</select></label><div><strong>Badges</strong><div class="checks" id="meta-badges">${badgeChecks}</div></div><div><strong>Filters</strong><div class="checks" id="meta-filters">${filterChecks}</div></div><div class="admin-actions"><button class="button primary" type="button" id="meta-save" ${security.d1Enabled ? '' : 'disabled'}>Save D1 override</button><span class="muted" id="meta-result"></span></div></div></section><section class="section"><div class="section-head"><h2>Dynamic D1 overrides</h2>${badge(`${overrides.length} overrides`, 'info')}</div>${overridesTable(overrides)}</section></div><section class="section"><div class="section-head"><h2>Static rules from page-meta.json</h2>${badge(`${rules.length} rules`, 'info')}</div>${rulesTable(rules)}</section></section>
<section class="tab-panel" data-panel="security"><div class="hero-grid">${card('Basic Auth', security.basicAuthConfigured ? 'Configured' : 'Missing', 'CR_ADMIN_USER or CR_ADMIN_ACCOUNTS')}${card('Secret path', security.secretPathEnabled ? 'Enabled' : 'Disabled', 'CR_ADMIN_PATH_TOKEN')}${card('D1 database', security.d1Enabled ? 'Ready' : 'Missing', 'WIKI_DB binding')}${card('Stats provider', security.provider || 'none', 'D1 preferred')}</div><section class="section"><h2>Recommended protection</h2><ul class="check-list"><li>✅ Keep the secret URL private and rotate the path token after tests.</li><li>✅ Use Cloudflare Access on <code>/__cr-admin/*</code>.</li><li>✅ Use Cloudflare Access on <code>/api/admin/*</code>.</li><li>✅ Keep Basic Auth as a second lock behind Cloudflare Access.</li><li>✅ Use D1 for feedback, analytics, dynamic badges, filters and admin logs.</li></ul></section></section>
<section class="tab-panel" data-panel="maintenance"><div class="grid-3">${card('Current build', String(build.commit || 'unknown').slice(0,8), formatDate(build.builtAt))}${card('Pages indexed', n(build.pages || pages.length), 'page-updates.json')}${card('Features', n(features.length), 'enabled modules')}</div><section class="section"><h2>Maintenance checklist</h2><ul class="check-list"><li>${security.d1Enabled ? '✅' : '⚠'} D1 <code>WIKI_DB</code> stores feedback, analytics, overrides and logs.</li><li>✅ GitHub keeps the raw Markdown content.</li><li>✅ Admin changes only affect dynamic site options.</li><li>✅ Review pages with negative comments first.</li><li>✅ Check <code>/page-meta.json</code> after editing badges or filters.</li></ul></section><section class="section"><div class="section-head"><h2>Admin logs</h2>${badge(`${logs.length} recent`, 'info')}</div>${logsTable(logs)}</section><section class="section"><h2>Build features</h2><p>${pill(features)}</p></section></section>
</main></div><script id="admin-data" type="application/json">${h(scriptJson(metaScriptData))}</script><script>
(function(){
  const titles = { overview:['Overview','Global wiki health, build state, and quick signals.'], pages:['Pages','Search pages, review dates, badges, and filters.'], stats:['Stats','Analytics counters stored in D1.'], feedback:['Feedback','Article feedback, negative votes, and written comments.'], badges:['Badges & Filters','Edit dynamic page options stored in D1.'], security:['Security','Admin access, runtime secrets, and D1 status.'], maintenance:['Maintenance','Operational checklist and admin logs.'] };
  const buttons = Array.from(document.querySelectorAll('[data-admin-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-panel]'));
  const title = document.getElementById('tab-title');
  const subtitle = document.getElementById('tab-subtitle');
  function activate(tab) { if (!titles[tab]) tab = 'overview'; buttons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.adminTab === tab)); panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.panel === tab)); title.textContent = titles[tab][0]; subtitle.textContent = titles[tab][1]; if (location.hash.replace('#','') !== tab) history.replaceState(null, '', '#' + tab); }
  buttons.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.adminTab)));
  window.addEventListener('hashchange', () => activate(location.hash.replace('#','') || 'overview'));
  activate(location.hash.replace('#','') || 'overview');
  const search = document.getElementById('page-search');
  const lang = document.getElementById('page-lang');
  const filter = document.getElementById('page-filter');
  const cards = Array.from(document.querySelectorAll('.page-card'));
  const empty = document.getElementById('page-empty');
  function filterPages() { const query = (search && search.value || '').toLowerCase().trim(); const selectedLang = lang ? lang.value : 'all'; const selectedFilter = filter ? filter.value : 'all'; let visible = 0; cards.forEach(card => { const matchesSearch = !query || (card.dataset.search || '').includes(query); const matchesLang = selectedLang === 'all' || card.dataset.lang === selectedLang; const matchesFilter = selectedFilter === 'all' || (card.dataset.filters || '').split(' ').includes(selectedFilter); const show = matchesSearch && matchesLang && matchesFilter; card.hidden = !show; if (show) visible += 1; }); if (empty) empty.hidden = visible !== 0; }
  [search, lang, filter].forEach(el => { if (el) el.addEventListener('input', filterPages); });
  [lang, filter].forEach(el => { if (el) el.addEventListener('change', filterPages); });
  filterPages();
  const dataNode = document.getElementById('admin-data');
  let adminData = { meta: {}, overrides: [], savePath: '' };
  try { adminData = JSON.parse(dataNode.textContent || '{}'); } catch {}
  const metaPage = document.getElementById('meta-page');
  const metaStatus = document.getElementById('meta-status');
  const metaResult = document.getElementById('meta-result');
  function currentMeta(path) {
    const override = (adminData.overrides || []).find(item => item.path === path);
    if (override) return override;
    const pages = adminData.meta?.pages || {};
    return pages[path] || pages[path.replace(/^\/fr-FR/i, '')] || { status: 'unknown', badges: [], filters: [] };
  }
  function setChecks(name, values) { document.querySelectorAll('input[name="' + name + '"]').forEach(input => { input.checked = (values || []).includes(input.value); }); }
  function readChecks(name) { return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(input => input.value); }
  function syncMetaForm() { if (!metaPage) return; const meta = currentMeta(metaPage.value); if (metaStatus) metaStatus.value = meta.status || 'unknown'; setChecks('badges', meta.badges || []); setChecks('filters', meta.filters || []); }
  if (metaPage) metaPage.addEventListener('change', syncMetaForm);
  syncMetaForm();
  const save = document.getElementById('meta-save');
  if (save) save.addEventListener('click', async () => {
    metaResult.textContent = 'Saving...';
    try {
      const response = await fetch(adminData.savePath, { method: 'POST', headers: { 'content-type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ path: metaPage.value, status: metaStatus.value, badges: readChecks('badges'), filters: readChecks('filters') }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Save failed');
      metaResult.textContent = 'Saved. Refreshing...';
      setTimeout(() => location.reload(), 550);
    } catch (error) {
      metaResult.textContent = error.message;
    }
  });
})();
</script></body></html>`;
}

async function serveAdminDashboard(request, env) {
  const auth = getAdminSession(env, request);
  if (auth.denied) return auth.denied;
  const payload = await getAdminPayload(request, env);
  await logAdminAction(env, auth.session, 'admin.view', 'dashboard', {}).catch(() => null);
  return new Response(adminDashboardHtml(payload, request, env), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow', 'x-content-type-options': 'nosniff' } });
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
    if (isAdminStatusPath(url, env)) return getAdminStatus(request, env);
    if (isAdminMetaPath(url, env)) return savePageMetaOverride(request, env);
    if (url.pathname === '/page-meta.json') return servePageMeta(request, env);
    if (url.pathname === '/api/discord') { if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405); return getDiscordStats(request, context); }
    if (url.pathname === '/api/curseforge') { if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405); return getCurseForgeStats(request, context); }
    if (url.pathname === '/api/server') { if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405); return getMinecraftServerStats(request, context); }
    if (url.pathname === '/api/analytics') return recordAnonymousAnalytics(request, env);
    if (url.pathname === '/api/feedback') return recordArticleFeedback(request, env);
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      return new HTMLRewriter().on('head', new HeadStylesheetInjector()).on('body', new BodyScriptInjector()).transform(response);
    }
    return response;
  }
};