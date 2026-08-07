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
      if (!downloads || downloads.toLowerCase() === 'invalid') {
        return json({ error: 'CurseForge count unavailable' }, 502);
      }

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

async function incrementCounter(env, key, patch = {}) {
  if (!env.WIKI_STATS) return false;
  const previous = await env.WIKI_STATS.get(key, 'json').catch(() => null) || {};
  const next = {
    ...previous,
    ...patch,
    count: Number(previous.count || 0) + 1,
    updatedAt: new Date().toISOString()
  };
  await env.WIKI_STATS.put(key, JSON.stringify(next));
  return true;
}

async function recordAnonymousAnalytics(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
    return json({ error: 'Cross-site request denied' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 2048) return json({ error: 'Payload too large' }, 413);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const event = typeof payload?.event === 'string' ? payload.event : '';
  const detail = typeof payload?.detail === 'string' ? payload.detail : '';
  const language = payload?.language === 'fr' ? 'fr' : 'en';
  if (!ANALYTICS_EVENTS.has(event) || !ANALYTICS_DETAILS.has(detail)) {
    return json({ error: 'Invalid analytics event' }, 400);
  }

  const path = sanitizeAnalyticsPath(payload?.path);

  if (env.WIKI_ANALYTICS) {
    env.WIKI_ANALYTICS.writeDataPoint({
      indexes: [event],
      blobs: [event, path, detail, language],
      doubles: [1]
    });
  }

  await incrementCounter(env, `stats:${event}:${language}:${detail || 'none'}:${path}`, { event, path, detail, language });

  return new Response(null, {
    status: 204,
    headers: {
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

async function recordArticleFeedback(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return json({ error: 'Cross-site request denied' }, 403);

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 2048) return json({ error: 'Payload too large' }, 413);

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

async function readStats(env) {
  if (!env.WIKI_STATS) return { enabled: false, feedback: [], analytics: [] };

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
  return { enabled: true, feedback, analytics };
}

async function getAdminStatus(request, env) {
  const denied = adminAccessDenied(env, request);
  if (denied) return denied;

  const [buildInfo, pageUpdates, pageMeta, searchIndex, stats] = await Promise.all([
    readAssetJson(request, env, '/build-info.json'),
    readAssetJson(request, env, '/page-updates.json'),
    readAssetJson(request, env, '/page-meta.json'),
    readAssetJson(request, env, '/search-index.json'),
    readStats(env)
  ]);

  return json({
    buildInfo,
    pageUpdates: Array.isArray(pageUpdates) ? pageUpdates : [],
    pageMeta,
    pageCount: Array.isArray(searchIndex) ? searchIndex.length : null,
    stats,
    security: {
      basicAuthConfigured: Boolean(env.CR_ADMIN_USER && env.CR_ADMIN_PASSWORD),
      secretPathEnabled: Boolean(adminToken(env)),
      statsStorageEnabled: Boolean(env.WIKI_STATS),
      recommendation: 'Use Cloudflare Access on /__cr-admin/* and /api/admin/* for stronger identity-based protection.'
    }
  });
}

function adminDashboardHtml(env) {
  const token = adminToken(env);
  const statusPath = token ? `/api/admin/${token}/status` : '/api/admin/status';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Cobblemon Realms Wiki Admin</title><style>
    :root{color-scheme:dark;--bg:#0d0d0f;--panel:#151517;--card:#1b1b1f;--line:#303039;--line2:#24242b;--text:#f5f7fb;--muted:#a5adbb;--accent:#4c91ff;--good:#20c875;--warn:#f59e0b;--bad:#ef4444;--violet:#a78bfa}
    *{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top left,rgba(76,145,255,.13),transparent 32%),linear-gradient(180deg,#121214,#0b0b0d);color:var(--text);font:14px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.admin-shell{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:100vh}.admin-sidebar{position:sticky;top:0;height:100vh;padding:22px 18px;border-right:1px solid var(--line);background:rgba(15,15,18,.88);backdrop-filter:blur(14px);overflow:auto}.admin-brand{display:flex;gap:12px;align-items:center;margin-bottom:22px}.admin-logo{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,rgba(76,145,255,.24),rgba(167,139,250,.2));border:1px solid rgba(255,255,255,.12);font-size:22px}.admin-brand strong{display:block;font-size:18px}.admin-brand small{display:block;color:var(--muted);font-size:12px}.admin-nav{display:grid;gap:7px}.admin-nav button{display:flex;align-items:center;gap:10px;width:100%;border:1px solid transparent;border-radius:12px;background:transparent;color:#d9e3f3;text-align:left;padding:10px 12px;cursor:pointer;font-weight:750}.admin-nav button:hover{background:rgba(255,255,255,.045);border-color:rgba(255,255,255,.08)}.admin-nav button.is-active{background:rgba(76,145,255,.14);border-color:rgba(76,145,255,.45);color:#fff}.admin-main{padding:26px min(42px,4vw) 42px;max-width:1460px;width:100%}.admin-topbar{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:20px}.admin-topbar h1{margin:0 0 5px;font-size:30px;letter-spacing:-.03em}.muted{color:var(--muted)}.admin-actions{display:flex;gap:8px;flex-wrap:wrap}.button{border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.04);color:var(--text);padding:8px 11px;text-decoration:none;font-weight:800}.button:hover{border-color:rgba(76,145,255,.55);background:rgba(76,145,255,.12)}.tab-panel{display:none}.tab-panel.is-active{display:block}.hero-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}.card{border:1px solid var(--line);border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.026));padding:17px;box-shadow:0 10px 30px rgba(0,0,0,.18)}.card small{display:block;color:var(--muted);font-weight:750}.card strong{display:block;margin-top:6px;font-size:25px;letter-spacing:-.02em}.section{margin-top:16px;border:1px solid var(--line);border-radius:18px;background:rgba(24,24,28,.88);padding:18px;overflow:hidden}.section-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:13px}.section h2{margin:0;font-size:19px}.section h3{margin:0 0 10px;font-size:16px}.status{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;background:rgba(76,145,255,.12);color:#8ab4ff;font-weight:850;font-size:12px}.ok{background:rgba(32,200,117,.13);color:#71e0a6}.warn{background:rgba(245,158,11,.14);color:#f8c46a}.bad{background:rgba(239,68,68,.13);color:#f99}.info{background:rgba(76,145,255,.13);color:#a8c9ff}.grid-2{display:grid;grid-template-columns:1.05fr .95fr;gap:16px}.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}table{width:100%;border-collapse:collapse}th,td{padding:10px 9px;border-top:1px solid var(--line2);text-align:left;vertical-align:top}th{color:#d8deea;font-size:11px;text-transform:uppercase;letter-spacing:.055em}td{color:#f4f6fb}code{padding:2px 6px;border-radius:7px;background:#25252d;color:#dbeafe;font-size:12px}.pill{display:inline-flex;align-items:center;margin:2px 4px 2px 0;padding:3px 8px;border:1px solid #454550;border-radius:999px;color:#e8ecf6;font-size:12px;font-weight:750}.pill.good{border-color:rgba(32,200,117,.38);background:rgba(32,200,117,.1);color:#8df0bb}.pill.warn{border-color:rgba(245,158,11,.38);background:rgba(245,158,11,.1);color:#ffd083}.pill.bad{border-color:rgba(239,68,68,.38);background:rgba(239,68,68,.1);color:#ffaaa7}.search-row{display:flex;gap:10px;flex-wrap:wrap}.search-row input,.search-row select{min-height:40px;border:1px solid var(--line);border-radius:12px;background:#111116;color:#fff;padding:8px 11px}.search-row input{flex:1 1 280px}.search-row select{flex:0 0 180px}.page-list{display:grid;gap:8px}.page-card{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(180px,.8fr) minmax(150px,.6fr);gap:12px;align-items:center;border:1px solid var(--line2);border-radius:13px;background:rgba(255,255,255,.025);padding:12px}.page-card strong{display:block}.page-card small{display:block;color:var(--muted)}.bars{display:grid;gap:9px}.bar{display:grid;grid-template-columns:160px 1fr 58px;gap:10px;align-items:center}.bar-track{height:9px;border-radius:999px;background:#25252d;overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--violet))}.empty{padding:18px;border:1px dashed #3a3a45;border-radius:14px;color:var(--muted);background:rgba(255,255,255,.02)}pre{max-height:360px;overflow:auto;padding:14px;border:1px solid var(--line);border-radius:14px;background:#101015;color:#d9e4ff}.check-list{display:grid;gap:9px;margin:0;padding:0;list-style:none}.check-list li{display:flex;gap:9px;align-items:flex-start;padding:11px;border:1px solid var(--line2);border-radius:12px;background:rgba(255,255,255,.025)}.admin-footer-note{margin-top:18px;color:var(--muted);font-size:12px}@media(max-width:1000px){.admin-shell{grid-template-columns:1fr}.admin-sidebar{position:relative;height:auto}.admin-nav{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-grid,.grid-3{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-2{grid-template-columns:1fr}.page-card{grid-template-columns:1fr}}@media(max-width:620px){.admin-main{padding:18px 12px 30px}.hero-grid,.grid-3,.admin-nav{grid-template-columns:1fr}.admin-topbar{display:block}.bar{grid-template-columns:1fr}.bar-track{order:2}.bar span:last-child{order:3}.section{padding:14px}}
  </style></head><body><div class="admin-shell"><aside class="admin-sidebar"><div class="admin-brand"><div class="admin-logo">🛠️</div><div><strong>Cobblemon Realms</strong><small>Wiki Admin Console</small></div></div><nav class="admin-nav" id="admin-nav"></nav><p class="admin-footer-note">Hidden dashboard. Keep this URL private.</p></aside><main class="admin-main"><div class="admin-topbar"><div><h1 id="tab-title">Loading...</h1><p class="muted" id="tab-subtitle">Fetching private wiki status.</p></div><div class="admin-actions"><a class="button" href="/" target="_blank" rel="noopener">Open wiki</a><button class="button" type="button" id="refresh">Refresh</button></div></div><div id="app"><div class="empty">Loading admin data...</div></div></main></div><script>
  const statusPath = ${JSON.stringify(statusPath)};
  const tabs = [
    ['overview','🏠','Overview','Global wiki health, build state, and quick signals.'],
    ['pages','📄','Pages','Search pages, review dates, badges, and filters.'],
    ['stats','📊','Stats','Analytics counters stored in Cloudflare KV.'],
    ['feedback','👍','Feedback','Article feedback and pages needing attention.'],
    ['badges','🏷️','Badges & Filters','Page metadata rules and category assignment.'],
    ['security','🔐','Security','Admin access, runtime secrets, and KV status.'],
    ['maintenance','⚙️','Maintenance','Safe operational checklist and next actions.']
  ];
  let state = null;
  let activeTab = location.hash.replace('#','') || 'overview';
  const app = document.getElementById('app');
  const nav = document.getElementById('admin-nav');
  const tabTitle = document.getElementById('tab-title');
  const tabSubtitle = document.getElementById('tab-subtitle');
  const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const fmt = v => v ? new Date(v).toLocaleString() : 'Unknown';
  const num = v => Number(v || 0).toLocaleString();
  const pct = (part,total) => total ? Math.round((Number(part || 0) / total) * 100) : 0;
  const pills = values => (values || []).map(v => '<span class="pill">' + esc(v) + '</span>').join('') || '<span class="muted">none</span>';
  const statusPill = (text, type = 'info') => '<span class="status ' + type + '">' + esc(text) + '</span>';

  function setTab(tab) {
    activeTab = tabs.some(t => t[0] === tab) ? tab : 'overview';
    location.hash = activeTab;
    render();
  }

  function renderNav() {
    nav.innerHTML = tabs.map(t => '<button type="button" data-tab="' + t[0] + '" class="' + (t[0] === activeTab ? 'is-active' : '') + '"><span>' + t[1] + '</span><span>' + t[2] + '</span></button>').join('');
    nav.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
  }

  function metaFor(path) {
    const meta = state?.pageMeta || {};
    const defaults = meta.defaults || { status: 'unknown', badges: [], filters: [] };
    let out = { status: defaults.status || 'unknown', badges: defaults.badges || [], filters: defaults.filters || [] };
    const normalized = String(path || '').replace(/\/$/, '') || '/';
    const noLang = normalized.replace(/^\/fr-FR/i, '');
    (meta.rules || []).forEach(rule => {
      try {
        const re = new RegExp(rule.match);
        if (re.test(normalized) || re.test(noLang)) out = { ...out, ...rule };
      } catch {}
    });
    const exact = meta.pages?.[normalized] || meta.pages?.[noLang];
    if (exact) out = { ...out, ...exact };
    return out;
  }

  function byLang() {
    const pages = state?.pageUpdates || [];
    return {
      fr: pages.filter(p => p.language === 'fr').length,
      en: pages.filter(p => p.language === 'en').length
    };
  }

  function renderOverview() {
    const build = state.buildInfo || {};
    const updates = state.pageUpdates || [];
    const stats = state.stats || {};
    const feedback = stats.feedback || [];
    const analytics = stats.analytics || [];
    const langs = byLang();
    const negative = feedback.reduce((sum, item) => sum + Number(item.no || 0), 0);
    app.innerHTML = '<div class="hero-grid">'
      + card('Pages', num(build.pages || updates.length), 'FR ' + langs.fr + ' / EN ' + langs.en)
      + card('Build commit', esc(String(build.commit || 'unknown').slice(0, 8)), fmt(build.builtAt))
      + card('Git dates', num(build.pageDates?.verified || 0) + ' ok', (build.pageDates?.unavailable || 0) + ' unavailable')
      + card('Feedback issues', num(negative), stats.enabled ? 'KV storage enabled' : 'KV storage disabled')
      + '</div>'
      + '<div class="grid-2"><section class="section"><div class="section-head"><h2>Recently updated</h2><span class="status info">latest 12</span></div>' + tableUpdates(updates.slice(0,12)) + '</section>'
      + '<section class="section"><div class="section-head"><h2>Top signals</h2><span class="status ' + (stats.enabled ? 'ok' : 'warn') + '">' + (stats.enabled ? 'stats enabled' : 'stats disabled') + '</span></div>' + renderTopSignals(analytics, feedback) + '</section></div>';
  }

  function card(label, value, detail) {
    return '<div class="card"><small>' + esc(label) + '</small><strong>' + value + '</strong><small>' + esc(detail || '') + '</small></div>';
  }

  function renderTopSignals(analytics, feedback) {
    if (!analytics.length && !feedback.length) return '<div class="empty">No analytics or feedback stored yet. Configure WIKI_STATS to start collecting dashboard data.</div>';
    const topAnalytics = analytics.slice(0,5).map(i => '<tr><td>' + esc(i.event || '') + '</td><td><code>' + esc(i.path || '') + '</code></td><td>' + num(i.count) + '</td></tr>').join('');
    const topFeedback = feedback.slice(0,5).map(i => '<tr><td><code>' + esc(i.path || '') + '</code></td><td>' + num(i.yes) + '</td><td>' + num(i.no) + '</td></tr>').join('');
    return '<h3>Analytics</h3><table><thead><tr><th>Event</th><th>Path</th><th>Count</th></tr></thead><tbody>' + (topAnalytics || '<tr><td colspan="3" class="muted">No analytics yet</td></tr>') + '</tbody></table><h3 style="margin-top:18px">Feedback</h3><table><thead><tr><th>Path</th><th>Yes</th><th>No</th></tr></thead><tbody>' + (topFeedback || '<tr><td colspan="3" class="muted">No feedback yet</td></tr>') + '</tbody></table>';
  }

  function renderPages() {
    const pages = state.pageUpdates || [];
    app.innerHTML = '<section class="section"><div class="section-head"><h2>Pages</h2><span class="status info">' + num(pages.length) + ' pages</span></div><div class="search-row"><input id="page-search" placeholder="Search title or path"><select id="page-lang"><option value="all">All languages</option><option value="fr">French</option><option value="en">English</option></select><select id="page-filter"><option value="all">All filters</option><option value="gameplay">Gameplay</option><option value="mods">Mods</option><option value="legendary">Legendary</option><option value="server">Server</option><option value="commands">Commands</option></select></div><div id="page-list" class="page-list" style="margin-top:14px"></div></section>';
    const search = document.getElementById('page-search');
    const lang = document.getElementById('page-lang');
    const filter = document.getElementById('page-filter');
    const list = document.getElementById('page-list');
    function draw() {
      const q = search.value.toLowerCase().trim();
      const selectedLang = lang.value;
      const selectedFilter = filter.value;
      const visible = pages.filter(page => {
        const meta = metaFor(page.path);
        const text = (page.title + ' ' + page.path).toLowerCase();
        return (!q || text.includes(q)) && (selectedLang === 'all' || page.language === selectedLang) && (selectedFilter === 'all' || (meta.filters || []).includes(selectedFilter));
      }).slice(0, 160);
      list.innerHTML = visible.length ? visible.map(page => {
        const meta = metaFor(page.path);
        return '<div class="page-card"><div><strong>' + esc(page.title || page.path) + '</strong><small><code>' + esc(page.path) + '</code></small></div><div><small>Status</small>' + statusPill(meta.status || 'unknown', meta.status === 'verified-v6' ? 'ok' : meta.status === 'draft' ? 'warn' : 'info') + '<div style="margin-top:7px">' + pills(meta.badges) + '</div></div><div><small>Filters</small>' + pills(meta.filters) + '<small style="margin-top:7px">Updated ' + esc(fmt(page.updatedAt)) + '</small></div></div>';
      }).join('') : '<div class="empty">No matching page.</div>';
    }
    [search, lang, filter].forEach(el => el.addEventListener('input', draw));
    draw();
  }

  function renderStats() {
    const stats = state.stats || {};
    const analytics = stats.analytics || [];
    const total = analytics.reduce((sum, item) => sum + Number(item.count || 0), 0);
    const groups = analytics.reduce((map, item) => { map[item.event || 'other'] = (map[item.event || 'other'] || 0) + Number(item.count || 0); return map; }, {});
    app.innerHTML = '<div class="hero-grid">' + card('KV status', stats.enabled ? 'Enabled' : 'Disabled', 'Binding WIKI_STATS') + card('Events stored', num(total), analytics.length + ' rows') + card('Pageviews', num(groups.pageview || 0), 'tracked views') + card('Zero searches', num(groups.search_zero || 0), 'search misses') + '</div><section class="section"><div class="section-head"><h2>Analytics events</h2><span class="status info">top 100</span></div>' + renderBars(analytics.slice(0,12), total) + tableAnalytics(analytics.slice(0,100)) + '</section>';
  }

  function renderBars(items, total) {
    if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>';
    return '<div class="bars" style="margin-bottom:18px">' + items.map(item => '<div class="bar"><span><code>' + esc(item.event || '') + '</code></span><div class="bar-track"><div class="bar-fill" style="width:' + pct(item.count,total) + '%"></div></div><span>' + num(item.count) + '</span></div>').join('') + '</div>';
  }

  function renderFeedback() {
    const stats = state.stats || {};
    const feedback = stats.feedback || [];
    const yes = feedback.reduce((sum, item) => sum + Number(item.yes || 0), 0);
    const no = feedback.reduce((sum, item) => sum + Number(item.no || 0), 0);
    app.innerHTML = '<div class="hero-grid">' + card('Feedback storage', stats.enabled ? 'Enabled' : 'Disabled', 'WIKI_STATS binding') + card('Helpful votes', num(yes), 'yes') + card('Needs work', num(no), 'no') + card('Satisfaction', pct(yes, yes + no) + '%', 'yes ratio') + '</div><section class="section"><div class="section-head"><h2>Article feedback</h2><span class="status ' + (no ? 'warn' : 'info') + '">' + feedback.length + ' pages</span></div>' + tableFeedback(feedback) + '</section>';
  }

  function renderBadges() {
    const meta = state.pageMeta || {};
    const rules = meta.rules || [];
    app.innerHTML = '<div class="grid-2"><section class="section"><div class="section-head"><h2>Badge and filter rules</h2><span class="status info">' + rules.length + ' rules</span></div>' + tableRules(rules) + '</section><section class="section"><h2>Metadata model</h2><p class="muted">Public pages read this configuration through <code>page-meta.json</code>. The admin currently reviews rules only. Write actions will need a GitHub token and role mapping.</p><h3>Available labels</h3><p>' + pills(Object.keys(meta.labels?.fr?.badges || {})) + '</p><h3>Example override</h3><pre>' + esc(JSON.stringify({ pages: { '/example-page': { status: 'verified-v6', badges: ['v6','client','mods'], filters: ['mods'] } } }, null, 2)) + '</pre></section></div>';
  }

  function renderSecurity() {
    const sec = state.security || {};
    app.innerHTML = '<div class="hero-grid">' + card('Basic Auth', sec.basicAuthConfigured ? 'Configured' : 'Missing', 'CR_ADMIN_USER / CR_ADMIN_PASSWORD') + card('Secret path', sec.secretPathEnabled ? 'Enabled' : 'Disabled', 'CR_ADMIN_PATH_TOKEN') + card('KV stats', sec.statsStorageEnabled ? 'Enabled' : 'Disabled', 'WIKI_STATS binding') + card('Access layer', 'Recommended', 'Cloudflare Access') + '</div><section class="section"><h2>Recommended protection</h2><ul class="check-list"><li>✅ Keep the secret URL private and rotate the path token after tests.</li><li>✅ Use Cloudflare Access on <code>/__cr-admin/*</code>.</li><li>✅ Use Cloudflare Access on <code>/api/admin/*</code>.</li><li>✅ Keep Basic Auth as a second lock behind Cloudflare Access.</li><li>⚠ Do not add GitHub write actions before owner/wiki-manager roles are enforced.</li></ul></section>';
  }

  function renderMaintenance() {
    const build = state.buildInfo || {};
    const sec = state.security || {};
    app.innerHTML = '<div class="grid-3">' + card('Current build', esc(String(build.commit || 'unknown').slice(0,8)), fmt(build.builtAt)) + card('Pages indexed', num(build.pages || state.pageUpdates?.length || 0), 'page-updates.json') + card('Features', num((build.features || []).length), 'enabled modules') + '</div><section class="section"><h2>Maintenance checklist</h2><ul class="check-list"><li>' + (sec.statsStorageEnabled ? '✅' : '⚠') + ' Configure <code>WIKI_STATS</code> KV for feedback and analytics persistence.</li><li>✅ Keep <code>page-meta.json</code> as the source for badges and filters.</li><li>✅ Review pages with many negative feedback votes first.</li><li>✅ Check <code>build-info.json</code> after each deploy.</li><li>⚠ Future CMS write mode should commit to GitHub with a dedicated token and strict role checks.</li></ul></section><section class="section"><h2>Build features</h2><p>' + pills(build.features || []) + '</p></section>';
  }

  function tableUpdates(items) {
    if (!items.length) return '<div class="empty">No page update index available.</div>';
    return '<table><thead><tr><th>Title</th><th>Path</th><th>Updated</th></tr></thead><tbody>' + items.map(i => '<tr><td>' + esc(i.title) + '</td><td><code>' + esc(i.path) + '</code></td><td>' + esc(fmt(i.updatedAt)) + '</td></tr>').join('') + '</tbody></table>';
  }

  function tableFeedback(items) {
    if (!items.length) return '<div class="empty">No feedback stored yet. Configure the WIKI_STATS KV binding to persist feedback.</div>';
    return '<table><thead><tr><th>Page</th><th>Yes</th><th>No</th><th>Score</th><th>Updated</th></tr></thead><tbody>' + items.slice(0,120).map(i => { const total = Number(i.yes || 0) + Number(i.no || 0); return '<tr><td><code>' + esc(i.path) + '</code></td><td>' + num(i.yes) + '</td><td>' + num(i.no) + '</td><td>' + pct(i.yes,total) + '%</td><td>' + esc(fmt(i.updatedAt)) + '</td></tr>'; }).join('') + '</tbody></table>';
  }

  function tableAnalytics(items) {
    if (!items.length) return '<div class="empty">No analytics counters stored yet.</div>';
    return '<table><thead><tr><th>Event</th><th>Detail</th><th>Path</th><th>Count</th><th>Updated</th></tr></thead><tbody>' + items.map(i => '<tr><td>' + esc(i.event) + '</td><td>' + esc(i.detail || '') + '</td><td><code>' + esc(i.path || '') + '</code></td><td>' + num(i.count) + '</td><td>' + esc(fmt(i.updatedAt)) + '</td></tr>').join('') + '</tbody></table>';
  }

  function tableRules(items) {
    if (!items.length) return '<div class="empty">No page-meta rules configured.</div>';
    return '<table><thead><tr><th>Match</th><th>Status</th><th>Badges</th><th>Filters</th></tr></thead><tbody>' + items.map(r => '<tr><td><code>' + esc(r.match) + '</code></td><td>' + esc(r.status || '') + '</td><td>' + pills(r.badges) + '</td><td>' + pills(r.filters) + '</td></tr>').join('') + '</tbody></table>';
  }

  function render() {
    renderNav();
    const current = tabs.find(t => t[0] === activeTab) || tabs[0];
    tabTitle.textContent = current[2];
    tabSubtitle.textContent = current[3];
    if (!state) return;
    if (activeTab === 'overview') renderOverview();
    else if (activeTab === 'pages') renderPages();
    else if (activeTab === 'stats') renderStats();
    else if (activeTab === 'feedback') renderFeedback();
    else if (activeTab === 'badges') renderBadges();
    else if (activeTab === 'security') renderSecurity();
    else if (activeTab === 'maintenance') renderMaintenance();
  }

  async function load() {
    app.innerHTML = '<div class="empty">Loading admin data...</div>';
    const response = await fetch(statusPath, { credentials: 'same-origin' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    state = await response.json();
    render();
  }

  window.addEventListener('hashchange', () => { activeTab = location.hash.replace('#','') || 'overview'; render(); });
  document.getElementById('refresh').addEventListener('click', () => load().catch(error => app.innerHTML = '<div class="empty">Unable to refresh: ' + esc(error.message) + '</div>'));
  renderNav();
  load().catch(error => { tabTitle.textContent = 'Unable to load admin data'; tabSubtitle.textContent = 'Check Basic Auth, token, and Worker logs.'; app.innerHTML = '<div class="empty">' + esc(error.message) + '</div>'; });
</script></body></html>`;
}

function serveAdminDashboard(request, env) {
  const denied = adminAccessDenied(env, request);
  if (denied) return denied;
  return new Response(adminDashboardHtml(env), {
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
