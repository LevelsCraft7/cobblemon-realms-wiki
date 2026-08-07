const INVITE_CODE = 'kb8NSTF45n';
const INVITE_URL = `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true&with_expiration=true`;

const CURSEFORGE_PROJECT_ID = '1175360';
const CURSEFORGE_PAGE_URL = 'https://www.curseforge.com/minecraft/modpacks/cobblemon-realms';
const CURSEFORGE_BADGE_URL = `https://img.shields.io/curseforge/dt/${CURSEFORGE_PROJECT_ID}.json`;

const MINECRAFT_SERVER_ADDRESS = '184.170.201.211:25565';
const MINECRAFT_STATUS_URL = `https://api.mcsrvstat.us/3/${encodeURIComponent(MINECRAFT_SERVER_ADDRESS)}`;

const ANALYTICS_EVENTS = new Set(['pageview', 'not_found', 'search_zero', 'outbound']);
const ANALYTICS_DETAILS = new Set([
  '', 'installation', 'server', 'pokemon', 'gameplay', 'performance', 'support', 'version', 'other',
  'curseforge', 'discord', 'github', 'bisecthosting', 'gitbook', 'external'
]);

const DB_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS analytics_events (
    event TEXT NOT NULL,
    path TEXT NOT NULL,
    detail TEXT NOT NULL DEFAULT '',
    language TEXT NOT NULL DEFAULT 'en',
    count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event, path, detail, language)
  )`,
  `CREATE TABLE IF NOT EXISTS article_feedback (
    path TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    yes_count INTEGER NOT NULL DEFAULT 0,
    no_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (path, language)
  )`,
  `CREATE TABLE IF NOT EXISTS page_meta_overrides (
    path TEXT PRIMARY KEY,
    status TEXT,
    badges_json TEXT NOT NULL DEFAULT '[]',
    filters_json TEXT NOT NULL DEFAULT '[]',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT NOT NULL DEFAULT 'system'
  )`,
  `CREATE TABLE IF NOT EXISTS wiki_options (
    key TEXT PRIMARY KEY,
    value_json TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT NOT NULL DEFAULT 'system'
  )`,
  `CREATE TABLE IF NOT EXISTS admin_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor TEXT NOT NULL DEFAULT 'system',
    role TEXT NOT NULL DEFAULT 'unknown',
    action TEXT NOT NULL,
    target TEXT NOT NULL DEFAULT '',
    payload_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`
];

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
      const response = await fetch(INVITE_URL, {
        headers: {
          accept: 'application/json',
          'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)'
        }
      });

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
      const response = await fetch(CURSEFORGE_BADGE_URL, {
        headers: {
          accept: 'application/json',
          'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)'
        }
      });

      if (!response.ok) return json({ error: 'CurseForge unavailable' }, 502);

      const badge = await response.json();
      const downloads = typeof badge.message === 'string' ? badge.message.trim() : '';
      if (!downloads || downloads.toLowerCase() === 'invalid') return json({ error: 'CurseForge count unavailable' }, 502);

      return json({
        downloads,
        projectId: Number(CURSEFORGE_PROJECT_ID),
        projectUrl: CURSEFORGE_PAGE_URL
      }, 200, 'public, max-age=120, s-maxage=600, stale-while-revalidate=1800');
    } catch {
      return json({ error: 'CurseForge unavailable' }, 502);
    }
  });
}

async function getMinecraftServerStats(request, context) {
  return getCached(request, context, '/__cache/minecraft-server-stats-v2', async () => {
    try {
      const response = await fetch(MINECRAFT_STATUS_URL, {
        headers: {
          accept: 'application/json',
          'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)'
        },
        signal: AbortSignal.timeout(8000)
      });

      if (!response.ok) return json({ error: 'Minecraft server status unavailable' }, 502);

      const status = await response.json();
      const online = status.online === true;
      const playersOnline = online && Number.isFinite(status.players?.online) ? status.players.online : 0;
      const playersMax = online && Number.isFinite(status.players?.max) ? status.players.max : 0;
      const icon = typeof status.icon === 'string' && status.icon.startsWith('data:image/png;base64,')
        ? status.icon
        : null;

      return json({
        online,
        players: {
          online: playersOnline,
          max: playersMax
        },
        icon,
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

function sanitizeDetail(value) {
  return typeof value === 'string' ? value.slice(0, 64).replace(/[^a-zA-Z0-9_-]/g, '') : '';
}

function utcNow() {
  return new Date().toISOString();
}

async function ensureWikiDb(env) {
  if (!env.WIKI_DB) return { enabled: false, ready: false, error: 'WIKI_DB binding missing' };
  try {
    for (const sql of DB_SCHEMA) {
      await env.WIKI_DB.prepare(sql).run();
    }
    return { enabled: true, ready: true, error: null };
  } catch (error) {
    return { enabled: true, ready: false, error: error?.message || String(error) };
  }
}

async function logAdminAction(env, actor, role, action, target = '', payload = {}) {
  const db = await ensureWikiDb(env);
  if (!db.ready) return false;
  try {
    await env.WIKI_DB.prepare(
      `INSERT INTO admin_logs (actor, role, action, target, payload_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(actor || 'system', role || 'unknown', action, target, JSON.stringify(payload || {}), utcNow()).run();
    return true;
  } catch {
    return false;
  }
}

async function recordD1Analytics(env, { event, path, detail, language }) {
  const db = await ensureWikiDb(env);
  if (!db.ready) return false;

  const now = utcNow();
  await env.WIKI_DB.prepare(
    `INSERT INTO analytics_events (event, path, detail, language, count, created_at, updated_at)
     VALUES (?, ?, ?, ?, 1, ?, ?)
     ON CONFLICT(event, path, detail, language)
     DO UPDATE SET count = count + 1, updated_at = excluded.updated_at`
  ).bind(event, path, detail || '', language, now, now).run();

  return true;
}

async function recordKVAnalytics(env, { event, path, detail, language }) {
  if (!env.WIKI_STATS) return false;
  const key = `stats:${event}:${language}:${detail || 'none'}:${path}`;
  const previous = await env.WIKI_STATS.get(key, 'json').catch(() => null) || {};
  const next = {
    ...previous,
    event,
    path,
    detail,
    language,
    count: Number(previous.count || 0) + 1,
    updatedAt: utcNow()
  };
  await env.WIKI_STATS.put(key, JSON.stringify(next));
  return true;
}

async function recordAnonymousAnalytics(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return json({ error: 'Cross-site request denied' }, 403);
  if (Number(request.headers.get('content-length') || 0) > 2048) return json({ error: 'Payload too large' }, 413);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const event = typeof payload?.event === 'string' ? payload.event : '';
  const detail = sanitizeDetail(payload?.detail);
  const language = payload?.language === 'fr' ? 'fr' : 'en';
  if (!ANALYTICS_EVENTS.has(event) || !ANALYTICS_DETAILS.has(detail)) return json({ error: 'Invalid analytics event' }, 400);

  const path = sanitizeAnalyticsPath(payload?.path);

  if (env.WIKI_ANALYTICS) {
    env.WIKI_ANALYTICS.writeDataPoint({
      indexes: [event],
      blobs: [event, path, detail, language],
      doubles: [1]
    });
  }

  const stored = await recordD1Analytics(env, { event, path, detail, language })
    || await recordKVAnalytics(env, { event, path, detail, language });

  return new Response(null, {
    status: 204,
    headers: {
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'x-wiki-stored': String(stored)
    }
  });
}

async function recordD1Feedback(env, { vote, path, language }) {
  const db = await ensureWikiDb(env);
  if (!db.ready) return false;

  const now = utcNow();
  const yes = vote === 'yes' ? 1 : 0;
  const no = vote === 'no' ? 1 : 0;

  await env.WIKI_DB.prepare(
    `INSERT INTO article_feedback (path, language, yes_count, no_count, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(path, language)
     DO UPDATE SET yes_count = yes_count + ?, no_count = no_count + ?, updated_at = excluded.updated_at`
  ).bind(path, language, yes, no, now, now, yes, no).run();

  return true;
}

async function recordKVFeedback(env, { vote, path, language }) {
  if (!env.WIKI_STATS) return false;
  const key = `feedback:${language}:${path}`;
  const previous = await env.WIKI_STATS.get(key, 'json').catch(() => null) || { yes: 0, no: 0 };
  previous[vote] = Number(previous[vote] || 0) + 1;
  previous.path = path;
  previous.language = language;
  previous.updatedAt = utcNow();
  await env.WIKI_STATS.put(key, JSON.stringify(previous));
  return true;
}

async function recordArticleFeedback(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return json({ error: 'Cross-site request denied' }, 403);
  if (Number(request.headers.get('content-length') || 0) > 2048) return json({ error: 'Payload too large' }, 413);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const vote = payload?.vote === 'yes' ? 'yes' : payload?.vote === 'no' ? 'no' : '';
  if (!vote) return json({ error: 'Invalid vote' }, 400);

  const language = payload?.language === 'fr' ? 'fr' : 'en';
  const path = sanitizeAnalyticsPath(payload?.path);
  const stored = await recordD1Feedback(env, { vote, path, language })
    || await recordKVFeedback(env, { vote, path, language });

  return json({ ok: true, stored });
}

function adminToken(env) {
  return typeof env.CR_ADMIN_PATH_TOKEN === 'string' ? env.CR_ADMIN_PATH_TOKEN.trim() : '';
}

function isAdminDashboardPath(url, env) {
  const token = adminToken(env);
  if (token) return url.pathname === `/__cr-admin/${token}` || url.pathname === `/__cr-admin/${token}/`;
  return url.pathname === '/__cr-admin' || url.pathname === '/__cr-admin/';
}

function isAdminStatusPath(url, env) {
  const token = adminToken(env);
  if (token) return url.pathname === `/api/admin/${token}/status`;
  return url.pathname === '/api/admin/status';
}

function unauthorizedAdmin(message = 'Unauthorized') {
  return new Response(message, {
    status: 401,
    headers: {
      'www-authenticate': 'Basic realm="Cobblemon Realms Wiki Admin", charset="UTF-8"',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

function adminAccessDenied(env, request) {
  const user = typeof env.CR_ADMIN_USER === 'string' ? env.CR_ADMIN_USER : '';
  const password = typeof env.CR_ADMIN_PASSWORD === 'string' ? env.CR_ADMIN_PASSWORD : '';
  if (!user || !password) {
    return new Response('Wiki admin is locked: CR_ADMIN_USER and CR_ADMIN_PASSWORD are not configured.', {
      status: 503,
      headers: { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }
    });
  }

  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return unauthorizedAdmin();

  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorizedAdmin();
  }

  const separator = decoded.indexOf(':');
  const providedUser = separator >= 0 ? decoded.slice(0, separator) : '';
  const providedPassword = separator >= 0 ? decoded.slice(separator + 1) : '';
  if (providedUser !== user || providedPassword !== password) return unauthorizedAdmin();
  return null;
}

function currentAdminActor(request) {
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return { user: 'unknown', role: 'unknown' };
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(':');
    return { user: separator >= 0 ? decoded.slice(0, separator) : 'unknown', role: 'admin' };
  } catch {
    return { user: 'unknown', role: 'unknown' };
  }
}

async function readAssetJson(request, env, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = '';
  const response = await env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }));
  if (!response.ok) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function parseJsonArray(value) {
  try {
    const output = JSON.parse(value || '[]');
    return Array.isArray(output) ? output : [];
  } catch {
    return [];
  }
}

async function readD1Stats(env) {
  const db = await ensureWikiDb(env);
  if (!db.ready) {
    return {
      enabled: false,
      backend: env.WIKI_DB ? 'd1-error' : 'none',
      db,
      feedback: [],
      analytics: [],
      topPages: [],
      topSearchMisses: [],
      notFound: [],
      outbound: [],
      eventBreakdown: [],
      pageMetaOverrides: [],
      logs: []
    };
  }

  const [
    analyticsResult,
    feedbackResult,
    overridesResult,
    logsResult,
    eventBreakdownResult,
    topPagesResult,
    topSearchMissesResult,
    notFoundResult,
    outboundResult
  ] = await Promise.all([
    env.WIKI_DB.prepare('SELECT event, path, detail, language, count, updated_at AS updatedAt FROM analytics_events ORDER BY count DESC, updated_at DESC LIMIT 500').all(),
    env.WIKI_DB.prepare('SELECT path, language, yes_count AS yes, no_count AS no, updated_at AS updatedAt FROM article_feedback ORDER BY no_count DESC, yes_count DESC, updated_at DESC LIMIT 500').all(),
    env.WIKI_DB.prepare('SELECT path, status, badges_json AS badgesJson, filters_json AS filtersJson, updated_at AS updatedAt, updated_by AS updatedBy FROM page_meta_overrides ORDER BY updated_at DESC LIMIT 500').all(),
    env.WIKI_DB.prepare('SELECT actor, role, action, target, payload_json AS payloadJson, created_at AS createdAt FROM admin_logs ORDER BY id DESC LIMIT 100').all(),
    env.WIKI_DB.prepare('SELECT event, SUM(count) AS count FROM analytics_events GROUP BY event ORDER BY count DESC').all(),
    env.WIKI_DB.prepare("SELECT path, SUM(count) AS count FROM analytics_events WHERE event = 'pageview' GROUP BY path ORDER BY count DESC LIMIT 50").all(),
    env.WIKI_DB.prepare("SELECT path, detail, language, SUM(count) AS count FROM analytics_events WHERE event = 'search_zero' GROUP BY path, detail, language ORDER BY count DESC LIMIT 50").all(),
    env.WIKI_DB.prepare("SELECT path, language, SUM(count) AS count FROM analytics_events WHERE event = 'not_found' GROUP BY path, language ORDER BY count DESC LIMIT 50").all(),
    env.WIKI_DB.prepare("SELECT path, detail, language, SUM(count) AS count FROM analytics_events WHERE event = 'outbound' GROUP BY path, detail, language ORDER BY count DESC LIMIT 50").all()
  ]);

  const pageMetaOverrides = (overridesResult.results || []).map((row) => ({
    path: row.path,
    status: row.status,
    badges: parseJsonArray(row.badgesJson),
    filters: parseJsonArray(row.filtersJson),
    updatedAt: row.updatedAt,
    updatedBy: row.updatedBy
  }));

  return {
    enabled: true,
    backend: 'd1',
    db,
    feedback: feedbackResult.results || [],
    analytics: analyticsResult.results || [],
    topPages: topPagesResult.results || [],
    topSearchMisses: topSearchMissesResult.results || [],
    notFound: notFoundResult.results || [],
    outbound: outboundResult.results || [],
    eventBreakdown: eventBreakdownResult.results || [],
    pageMetaOverrides,
    logs: logsResult.results || []
  };
}

async function readKVStats(env) {
  if (!env.WIKI_STATS) return { enabled: false, backend: 'none', feedback: [], analytics: [] };
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

  return {
    enabled: true,
    backend: 'kv',
    feedback,
    analytics,
    topPages: analytics.filter((item) => item.event === 'pageview').slice(0, 50),
    topSearchMisses: analytics.filter((item) => item.event === 'search_zero').slice(0, 50),
    notFound: analytics.filter((item) => item.event === 'not_found').slice(0, 50),
    outbound: analytics.filter((item) => item.event === 'outbound').slice(0, 50),
    eventBreakdown: Object.entries(analytics.reduce((map, item) => {
      map[item.event || 'other'] = (map[item.event || 'other'] || 0) + Number(item.count || 0);
      return map;
    }, {})).map(([event, count]) => ({ event, count })),
    pageMetaOverrides: [],
    logs: []
  };
}

async function readStats(env) {
  const d1Stats = await readD1Stats(env);
  if (d1Stats.enabled) return d1Stats;
  const kvStats = await readKVStats(env);
  return { ...kvStats, db: d1Stats.db };
}

async function mergePageMetaWithD1(pageMeta, stats) {
  const output = structuredClone(pageMeta || {});
  output.pages = output.pages || {};
  for (const override of stats.pageMetaOverrides || []) {
    output.pages[override.path] = {
      status: override.status,
      badges: override.badges || [],
      filters: override.filters || []
    };
  }
  return output;
}

async function getAdminPayload(request, env) {
  const [buildInfo, pageUpdates, pageMeta, searchIndex, stats] = await Promise.all([
    readAssetJson(request, env, '/build-info.json'),
    readAssetJson(request, env, '/page-updates.json'),
    readAssetJson(request, env, '/page-meta.json'),
    readAssetJson(request, env, '/search-index.json'),
    readStats(env)
  ]);

  return {
    buildInfo: buildInfo || {},
    pageUpdates: Array.isArray(pageUpdates) ? pageUpdates : [],
    pageMeta: await mergePageMetaWithD1(pageMeta || {}, stats),
    sourcePageMeta: pageMeta || {},
    pageCount: Array.isArray(searchIndex) ? searchIndex.length : null,
    stats,
    security: {
      basicAuthConfigured: Boolean(env.CR_ADMIN_USER && env.CR_ADMIN_PASSWORD),
      secretPathEnabled: Boolean(adminToken(env)),
      d1Enabled: stats.backend === 'd1',
      d1Ready: Boolean(stats.db?.ready),
      d1Error: stats.db?.error || null,
      kvFallbackEnabled: Boolean(env.WIKI_STATS)
    }
  };
}

async function getAdminStatus(request, env) {
  const denied = adminAccessDenied(env, request);
  if (denied) return denied;
  const actor = currentAdminActor(request);
  await logAdminAction(env, actor.user, actor.role, 'read_status', 'admin');
  return json(await getAdminPayload(request, env));
}

function h(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
}

function n(value) {
  return Number(value || 0).toLocaleString('fr-FR');
}

function p(part, total) {
  return total ? Math.round((Number(part || 0) / total) * 100) : 0;
}

function d(value) {
  if (!value) return 'Unknown';
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  } catch {
    return String(value);
  }
}

function pill(values = []) {
  return values.length ? values.map((v) => `<span class="pill">${h(v)}</span>`).join('') : '<span class="muted">None</span>';
}

function badge(text, type = 'info') {
  return `<span class="status ${type}">${h(text)}</span>`;
}

function card(title, value, note = '') {
  return `<article class="card"><small>${h(title)}</small><strong>${h(value)}</strong><small>${h(note)}</small></article>`;
}

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
  return `<table><thead><tr><th>Title</th><th>Path</th><th>Lang</th><th>Updated</th></tr></thead><tbody>${items.slice(0, limit).map((item) => `<tr><td>${h(item.title || item.path)}</td><td><code>${h(item.path)}</code></td><td>${h(item.language || '')}</td><td>${h(d(item.updatedAt))}</td></tr>`).join('')}</tbody></table>`;
}

function feedbackTable(items) {
  if (!items.length) return '<div class="empty">No feedback stored yet. D1 is ready, votes will appear after players use the article feedback block.</div>';
  return `<table><thead><tr><th>Page</th><th>Lang</th><th>Yes</th><th>No</th><th>Score</th><th>Updated</th></tr></thead><tbody>${items.slice(0, 120).map((item) => {
    const yes = Number(item.yes || item.yes_count || 0);
    const no = Number(item.no || item.no_count || 0);
    const total = yes + no;
    return `<tr><td><code>${h(item.path)}</code></td><td>${h(item.language || '')}</td><td>${n(yes)}</td><td>${n(no)}</td><td>${p(yes, total)}%</td><td>${h(d(item.updatedAt || item.updated_at))}</td></tr>`;
  }).join('')}</tbody></table>`;
}

function analyticsTable(items) {
  if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>';
  return `<table><thead><tr><th>Event</th><th>Detail</th><th>Path</th><th>Lang</th><th>Count</th><th>Updated</th></tr></thead><tbody>${items.slice(0, 160).map((item) => `<tr><td>${h(item.event || '')}</td><td>${h(item.detail || '')}</td><td><code>${h(item.path || '')}</code></td><td>${h(item.language || '')}</td><td>${n(item.count)}</td><td>${h(d(item.updatedAt || item.updated_at))}</td></tr>`).join('')}</tbody></table>`;
}

function rulesTable(items) {
  if (!items.length) return '<div class="empty">No page-meta rules configured.</div>';
  return `<table><thead><tr><th>Match</th><th>Status</th><th>Badges</th><th>Filters</th></tr></thead><tbody>${items.map((rule) => `<tr><td><code>${h(rule.match || '')}</code></td><td>${h(rule.status || '')}</td><td>${pill(rule.badges || [])}</td><td>${pill(rule.filters || [])}</td></tr>`).join('')}</tbody></table>`;
}

function overridesTable(items) {
  if (!items.length) return '<div class="empty">No D1 page metadata override yet.</div>';
  return `<table><thead><tr><th>Path</th><th>Status</th><th>Badges</th><th>Filters</th><th>Updated</th></tr></thead><tbody>${items.map((item) => `<tr><td><code>${h(item.path)}</code></td><td>${h(item.status || '')}</td><td>${pill(item.badges || [])}</td><td>${pill(item.filters || [])}</td><td>${h(d(item.updatedAt))}</td></tr>`).join('')}</tbody></table>`;
}

function logsTable(items) {
  if (!items.length) return '<div class="empty">No admin logs yet.</div>';
  return `<table><thead><tr><th>Actor</th><th>Role</th><th>Action</th><th>Target</th><th>Date</th></tr></thead><tbody>${items.map((item) => `<tr><td>${h(item.actor)}</td><td>${h(item.role)}</td><td>${h(item.action)}</td><td><code>${h(item.target || '')}</code></td><td>${h(d(item.createdAt || item.created_at))}</td></tr>`).join('')}</tbody></table>`;
}

function bars(items) {
  if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>';
  const total = items.reduce((sum, item) => sum + Number(item.count || 0), 0);
  return `<div class="bars">${items.slice(0, 18).map((item) => `<div class="bar"><span><code>${h(item.event || item.path || item.detail || '')}</code></span><div class="bar-track"><div class="bar-fill" style="width:${p(item.count, total)}%"></div></div><span>${n(item.count)}</span></div>`).join('')}</div>`;
}

function pageCards(pages, pageMeta) {
  if (!pages.length) return '<div class="empty">No pages indexed yet.</div>';
  return pages.map((page) => {
    const meta = metaFor(pageMeta, page.path);
    const statusType = meta.status === 'verified-v6' ? 'ok' : meta.status === 'draft' ? 'warn' : 'info';
    return `<article class="page-card" data-search="${h(`${page.title || ''} ${page.path || ''}`.toLowerCase())}" data-lang="${h(page.language || '')}" data-filters="${h((meta.filters || []).join(' '))}"><div><strong>${h(page.title || page.path)}</strong><small><code>${h(page.path || '')}</code></small></div><div><small>Status</small>${badge(meta.status || 'unknown', statusType)}<div class="pill-row">${pill(meta.badges || [])}</div></div><div><small>Filters</small><div class="pill-row">${pill(meta.filters || [])}</div><small>Updated ${h(d(page.updatedAt))}</small></div></article>`;
  }).join('');
}

function statLinkedSections(stats) {
  const topPages = stats.topPages || [];
  const topSearchMisses = stats.topSearchMisses || [];
  const notFound = stats.notFound || [];
  const outbound = stats.outbound || [];
  return `<div class="grid-2">
    <section class="section"><div class="section-head"><h2>Top pages</h2>${badge('pageview', 'info')}</div>${analyticsTable(topPages.map((item) => ({ ...item, event: 'pageview' })))}</section>
    <section class="section"><div class="section-head"><h2>Search misses</h2>${badge('search_zero', 'warn')}</div>${analyticsTable(topSearchMisses.map((item) => ({ ...item, event: 'search_zero' })))}</section>
    <section class="section"><div class="section-head"><h2>404 / broken paths</h2>${badge('not_found', 'warn')}</div>${analyticsTable(notFound.map((item) => ({ ...item, event: 'not_found' })))}</section>
    <section class="section"><div class="section-head"><h2>Outbound clicks</h2>${badge('outbound', 'info')}</div>${analyticsTable(outbound.map((item) => ({ ...item, event: 'outbound' })))}</section>
  </div>`;
}

function adminDashboardHtml(payload) {
  const build = payload.buildInfo || {};
  const pages = payload.pageUpdates || [];
  const pageMeta = payload.pageMeta || {};
  const stats = payload.stats || {};
  const feedback = stats.feedback || [];
  const analytics = stats.analytics || [];
  const security = payload.security || {};
  const frPages = pages.filter((page) => page.language === 'fr').length;
  const enPages = pages.filter((page) => page.language === 'en').length;
  const yesVotes = feedback.reduce((sum, item) => sum + Number(item.yes || 0), 0);
  const noVotes = feedback.reduce((sum, item) => sum + Number(item.no || 0), 0);
  const eventCount = analytics.reduce((sum, item) => sum + Number(item.count || 0), 0);
  const pageviews = (stats.eventBreakdown || []).filter((item) => item.event === 'pageview').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const zeroSearches = (stats.eventBreakdown || []).filter((item) => item.event === 'search_zero').reduce((sum, item) => sum + Number(item.count || 0), 0);
  const rules = payload.sourcePageMeta?.rules || pageMeta.rules || [];
  const badgeKeys = Object.keys(pageMeta.labels?.fr?.badges || {});
  const features = build.features || [];
  const dbLabel = stats.backend === 'd1' ? 'D1 database' : stats.backend === 'kv' ? 'KV fallback' : 'Disabled';
  const dbStatus = stats.backend === 'd1' ? 'Enabled' : stats.backend === 'd1-error' ? 'Error' : 'Fallback';

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Cobblemon Realms Wiki Admin</title><style>
:root{color-scheme:dark;--bg:#0d0d0f;--panel:#151517;--card:#1b1b1f;--line:#303039;--line2:#24242b;--text:#f5f7fb;--muted:#a5adbb;--accent:#4c91ff;--good:#20c875;--warn:#f59e0b;--bad:#ef4444;--violet:#a78bfa}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top left,rgba(76,145,255,.13),transparent 32%),linear-gradient(180deg,#121214,#0b0b0d);color:var(--text);font:14px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.admin-shell{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:100vh}.admin-sidebar{position:sticky;top:0;height:100vh;padding:22px 18px;border-right:1px solid var(--line);background:rgba(15,15,18,.88);overflow:auto}.admin-brand{display:flex;gap:12px;align-items:center;margin-bottom:22px}.admin-logo{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,rgba(76,145,255,.24),rgba(167,139,250,.2));border:1px solid rgba(255,255,255,.12);font-size:22px}.admin-brand strong{display:block;font-size:18px}.admin-brand small{display:block;color:var(--muted);font-size:12px}.admin-nav{display:grid;gap:7px}.admin-nav button{display:flex;align-items:center;gap:10px;width:100%;border:1px solid transparent;border-radius:12px;background:transparent;color:#d9e3f3;text-align:left;padding:10px 12px;cursor:pointer;font-weight:750}.admin-nav button:hover{background:rgba(255,255,255,.045);border-color:rgba(255,255,255,.08)}.admin-nav button.is-active{background:rgba(76,145,255,.14);border-color:rgba(76,145,255,.45);color:#fff}.admin-main{padding:26px min(42px,4vw) 42px;max-width:1480px;width:100%}.admin-topbar{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:20px}.admin-topbar h1{margin:0 0 5px;font-size:30px}.muted{color:var(--muted)}.admin-actions{display:flex;gap:8px;flex-wrap:wrap}.button{border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.04);color:var(--text);padding:8px 11px;text-decoration:none;font-weight:800}.tab-panel{display:none}.tab-panel.is-active{display:block}.hero-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}.card{border:1px solid var(--line);border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.026));padding:17px}.card small{display:block;color:var(--muted);font-weight:750}.card strong{display:block;margin-top:6px;font-size:25px}.section{margin-top:16px;border:1px solid var(--line);border-radius:18px;background:rgba(24,24,28,.88);padding:18px;overflow:hidden}.section-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:13px}.section h2{margin:0;font-size:19px}.section h3{margin:0 0 10px;font-size:16px}.status{display:inline-flex;padding:4px 9px;border-radius:999px;background:rgba(76,145,255,.12);color:#8ab4ff;font-weight:850;font-size:12px}.ok{background:rgba(32,200,117,.13);color:#71e0a6}.warn{background:rgba(245,158,11,.14);color:#f8c46a}.bad{background:rgba(239,68,68,.13);color:#ffaaa7}.info{background:rgba(76,145,255,.13);color:#a8c9ff}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}table{width:100%;border-collapse:collapse}th,td{padding:10px 9px;border-top:1px solid var(--line2);text-align:left;vertical-align:top}th{color:#d8deea;font-size:11px;text-transform:uppercase;letter-spacing:.055em}code{padding:2px 6px;border-radius:7px;background:#25252d;color:#dbeafe;font-size:12px}.pill{display:inline-flex;margin:2px 4px 2px 0;padding:3px 8px;border:1px solid #454550;border-radius:999px;color:#e8ecf6;font-size:12px;font-weight:750}.pill-row{margin-top:7px}.search-row{display:flex;gap:10px;flex-wrap:wrap}.search-row input,.search-row select{min-height:40px;border:1px solid var(--line);border-radius:12px;background:#111116;color:#fff;padding:8px 11px}.search-row input{flex:1 1 280px}.page-list{display:grid;gap:8px}.page-card{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(180px,.8fr) minmax(150px,.6fr);gap:12px;align-items:center;border:1px solid var(--line2);border-radius:13px;background:rgba(255,255,255,.025);padding:12px}.page-card[hidden]{display:none}.page-card strong,.page-card small{display:block}.page-card small{color:var(--muted)}.bars{display:grid;gap:9px;margin-bottom:18px}.bar{display:grid;grid-template-columns:160px 1fr 58px;gap:10px;align-items:center}.bar-track{height:9px;border-radius:999px;background:#25252d;overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--violet))}.empty{padding:18px;border:1px dashed #3a3a45;border-radius:14px;color:var(--muted);background:rgba(255,255,255,.02)}pre{max-height:360px;overflow:auto;padding:14px;border:1px solid var(--line);border-radius:14px;background:#101015;color:#d9e4ff}.check-list{display:grid;gap:9px;margin:0;padding:0;list-style:none}.check-list li{padding:11px;border:1px solid var(--line2);border-radius:12px;background:rgba(255,255,255,.025)}.admin-footer-note{margin-top:18px;color:var(--muted);font-size:12px}@media(max-width:1000px){.admin-shell{grid-template-columns:1fr}.admin-sidebar{position:relative;height:auto}.admin-nav{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-grid,.grid-3{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-2{grid-template-columns:1fr}.page-card{grid-template-columns:1fr}}@media(max-width:620px){.admin-main{padding:18px 12px 30px}.hero-grid,.grid-3,.admin-nav{grid-template-columns:1fr}.admin-topbar{display:block}.bar{grid-template-columns:1fr}.section{padding:14px}}
</style></head><body><div class="admin-shell"><aside class="admin-sidebar"><div class="admin-brand"><div class="admin-logo">🛠️</div><div><strong>Cobblemon Realms</strong><small>Wiki Admin Console</small></div></div><nav class="admin-nav"><button type="button" data-admin-tab="overview" class="is-active">🏠 Overview</button><button type="button" data-admin-tab="pages">📄 Pages</button><button type="button" data-admin-tab="stats">📊 Stats</button><button type="button" data-admin-tab="feedback">👍 Feedback</button><button type="button" data-admin-tab="badges">🏷️ Badges & Filters</button><button type="button" data-admin-tab="security">🔐 Security</button><button type="button" data-admin-tab="maintenance">⚙️ Maintenance</button></nav><p class="admin-footer-note">Hidden dashboard. Keep this URL private.</p></aside><main class="admin-main"><div class="admin-topbar"><div><h1 id="tab-title">Overview</h1><p class="muted" id="tab-subtitle">Global wiki health, build state, D1, and quick signals.</p></div><div class="admin-actions"><a class="button" href="/" target="_blank" rel="noopener">Open wiki</a><button class="button" type="button" onclick="location.reload()">Refresh</button></div></div>
<section class="tab-panel is-active" data-panel="overview"><div class="hero-grid">${card('Pages', n(build.pages || pages.length), `FR ${frPages} / EN ${enPages}`)}${card('Storage', dbStatus, dbLabel)}${card('Analytics events', n(eventCount), `${analytics.length} counters`)}${card('Feedback issues', n(noVotes), `${yesVotes} yes / ${noVotes} no`)}</div><div class="grid-2"><section class="section"><div class="section-head"><h2>Recently updated</h2>${badge('latest 20', 'info')}</div>${updatesTable(pages, 20)}</section><section class="section"><div class="section-head"><h2>D1 status</h2>${badge(security.d1Ready ? 'ready' : 'not ready', security.d1Ready ? 'ok' : 'warn')}</div><div class="grid-3">${card('Backend', stats.backend || 'none', security.d1Error || 'active')}${card('Pageviews', n(pageviews), 'tracked views')}${card('Zero searches', n(zeroSearches), 'search misses')}</div></section></div></section>
<section class="tab-panel" data-panel="pages"><section class="section"><div class="section-head"><h2>Pages</h2>${badge(`${n(pages.length)} pages`, 'info')}</div><div class="search-row"><input id="page-search" placeholder="Search title or path"><select id="page-lang"><option value="all">All languages</option><option value="fr">French</option><option value="en">English</option></select><select id="page-filter"><option value="all">All filters</option><option value="gameplay">Gameplay</option><option value="mods">Mods</option><option value="legendary">Legendary</option><option value="server">Server</option><option value="commands">Commands</option></select></div><div class="page-list" style="margin-top:14px">${pageCards(pages, pageMeta)}</div><div class="empty" id="page-empty" hidden>No matching page.</div></section></section>
<section class="tab-panel" data-panel="stats"><div class="hero-grid">${card('Storage', dbStatus, dbLabel)}${card('Events stored', n(eventCount), `${analytics.length} counters`)}${card('Pageviews', n(pageviews), 'tracked views')}${card('Zero searches', n(zeroSearches), 'search misses')}</div><section class="section"><div class="section-head"><h2>Event breakdown</h2>${badge('all events linked', 'ok')}</div>${bars(stats.eventBreakdown || [])}</section>${statLinkedSections(stats)}<section class="section"><div class="section-head"><h2>Raw analytics counters</h2>${badge('D1 analytics_events', 'info')}</div>${analyticsTable(analytics)}</section></section>
<section class="tab-panel" data-panel="feedback"><div class="hero-grid">${card('Feedback storage', dbStatus, dbLabel)}${card('Helpful votes', n(yesVotes), 'yes')}${card('Needs work', n(noVotes), 'no')}${card('Satisfaction', `${p(yesVotes, yesVotes + noVotes)}%`, 'yes ratio')}</div><section class="section"><div class="section-head"><h2>Article feedback</h2>${badge(`${feedback.length} pages`, noVotes ? 'warn' : 'info')}</div>${feedbackTable(feedback)}</section></section>
<section class="tab-panel" data-panel="badges"><div class="grid-2"><section class="section"><div class="section-head"><h2>Source rules</h2>${badge(`${rules.length} file rules`, 'info')}</div>${rulesTable(rules)}</section><section class="section"><div class="section-head"><h2>D1 overrides</h2>${badge(`${stats.pageMetaOverrides?.length || 0} overrides`, 'info')}</div>${overridesTable(stats.pageMetaOverrides || [])}</section></div><section class="section"><h2>Metadata model</h2><p class="muted">Content pages stay in GitHub. D1 stores dynamic website options: per-page overrides, stats, feedback, and admin logs. Next step: add write actions here for badges, filters, and status.</p><h3>Available badge keys</h3><p>${pill(badgeKeys)}</p></section></section>
<section class="tab-panel" data-panel="security"><div class="hero-grid">${card('Basic Auth', security.basicAuthConfigured ? 'Configured' : 'Missing', 'CR_ADMIN_USER / CR_ADMIN_PASSWORD')}${card('Secret path', security.secretPathEnabled ? 'Enabled' : 'Disabled', 'CR_ADMIN_PATH_TOKEN')}${card('D1', security.d1Ready ? 'Ready' : 'Not ready', security.d1Error || 'WIKI_DB')}${card('KV fallback', security.kvFallbackEnabled ? 'Available' : 'Disabled', 'WIKI_STATS')}</div><section class="section"><h2>Recommended protection</h2><ul class="check-list"><li>✅ Keep the secret URL private and rotate the path token after tests.</li><li>✅ Use Cloudflare Access on <code>/__cr-admin/*</code>.</li><li>✅ Use Cloudflare Access on <code>/api/admin/*</code>.</li><li>✅ Keep Basic Auth as a second lock behind Cloudflare Access.</li><li>⚠ Before write actions, add roles: owner for Levels, wiki manager for Fab.</li></ul></section></section>
<section class="tab-panel" data-panel="maintenance"><div class="grid-3">${card('Current build', String(build.commit || 'unknown').slice(0,8), d(build.builtAt))}${card('Pages indexed', n(build.pages || pages.length), 'page-updates.json')}${card('Features', n(features.length), 'enabled modules')}</div><section class="section"><h2>Admin logs</h2>${logsTable(stats.logs || [])}</section><section class="section"><h2>Maintenance checklist</h2><ul class="check-list"><li>${security.d1Ready ? '✅' : '⚠'} D1 tables auto-created on admin load.</li><li>✅ Analytics and feedback now write to D1 first.</li><li>✅ KV remains only as fallback.</li><li>⚠ Next step: add write actions for badge/filter/status overrides.</li></ul></section><section class="section"><h2>Build features</h2><p>${pill(features)}</p></section></section>
</main></div><script>
(function(){
  const titles = {
    overview:['Overview','Global wiki health, build state, D1, and quick signals.'],
    pages:['Pages','Search pages, review dates, badges, and filters.'],
    stats:['Stats','All linked D1 analytics counters.'],
    feedback:['Feedback','Article feedback and pages needing attention.'],
    badges:['Badges & Filters','Source rules and D1 overrides.'],
    security:['Security','Admin access, runtime secrets, and D1 status.'],
    maintenance:['Maintenance','Admin logs, build features, and safe next actions.']
  };
  const buttons = Array.from(document.querySelectorAll('[data-admin-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-panel]'));
  const title = document.getElementById('tab-title');
  const subtitle = document.getElementById('tab-subtitle');
  function activate(tab) {
    if (!titles[tab]) tab = 'overview';
    buttons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.adminTab === tab));
    panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.panel === tab));
    title.textContent = titles[tab][0];
    subtitle.textContent = titles[tab][1];
    if (location.hash.replace('#','') !== tab) history.replaceState(null, '', '#' + tab);
  }
  buttons.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.adminTab)));
  window.addEventListener('hashchange', () => activate(location.hash.replace('#','') || 'overview'));
  activate(location.hash.replace('#','') || 'overview');
  const search = document.getElementById('page-search');
  const lang = document.getElementById('page-lang');
  const filter = document.getElementById('page-filter');
  const cards = Array.from(document.querySelectorAll('.page-card'));
  const empty = document.getElementById('page-empty');
  function filterPages() {
    const query = (search && search.value || '').toLowerCase().trim();
    const selectedLang = lang ? lang.value : 'all';
    const selectedFilter = filter ? filter.value : 'all';
    let visible = 0;
    cards.forEach(card => {
      const matchesSearch = !query || (card.dataset.search || '').includes(query);
      const matchesLang = selectedLang === 'all' || card.dataset.lang === selectedLang;
      const matchesFilter = selectedFilter === 'all' || (card.dataset.filters || '').split(' ').includes(selectedFilter);
      const show = matchesSearch && matchesLang && matchesFilter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  }
  [search, lang, filter].forEach(el => { if (el) el.addEventListener('input', filterPages); });
  [lang, filter].forEach(el => { if (el) el.addEventListener('change', filterPages); });
  filterPages();
})();
</script></body></html>`;
}

async function serveAdminDashboard(request, env) {
  const denied = adminAccessDenied(env, request);
  if (denied) return denied;
  const actor = currentAdminActor(request);
  await logAdminAction(env, actor.user, actor.role, 'open_dashboard', 'admin');
  return new Response(adminDashboardHtml(await getAdminPayload(request, env)), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
      'x-content-type-options': 'nosniff'
    }
  });
}

class HeadStylesheetInjector {
  element(element) {
    element.append(
      '<link rel="stylesheet" href="/assets/discord.css?v=community-badges-4" data-community-badges="true"><link rel="stylesheet" href="/assets/gitbook-blocks.css?v=gitbook-reference-3" data-gitbook-blocks="true">',
      { html: true }
    );
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

    if (url.pathname === '/api/discord') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
      return getDiscordStats(request, context);
    }

    if (url.pathname === '/api/curseforge') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
      return getCurseForgeStats(request, context);
    }

    if (url.pathname === '/api/server') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
      return getMinecraftServerStats(request, context);
    }

    if (url.pathname === '/api/analytics') return recordAnonymousAnalytics(request, env);
    if (url.pathname === '/api/feedback') return recordArticleFeedback(request, env);

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      return new HTMLRewriter()
        .on('head', new HeadStylesheetInjector())
        .on('body', new BodyScriptInjector())
        .transform(response);
    }

    return response;
  }
};