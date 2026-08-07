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
    pageUpdates: Array.isArray(pageUpdates) ? pageUpdates.slice(0, 40) : [],
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
    :root{color-scheme:dark;--bg:#111;--card:#1b1b1b;--line:#303030;--text:#f5f5f5;--muted:#aaa;--accent:#4c91ff;--good:#20c875;--warn:#f59e0b;--bad:#ef4444}*{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#151515,#0f0f0f);color:var(--text);font:14px/1.5 Inter,ui-sans-serif,system-ui,sans-serif}main{width:min(1180px,calc(100% - 32px));margin:0 auto;padding:32px 0 46px}h1{margin:0 0 4px;font-size:30px}h2{margin:0 0 12px;font-size:18px}.muted{color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:24px 0}.card{border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.035);padding:16px}.card strong{display:block;font-size:24px}.section{margin-top:18px;border:1px solid var(--line);border-radius:16px;background:var(--card);padding:18px;overflow:hidden}.status{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;background:rgba(76,145,255,.12);color:#8ab4ff;font-weight:800;font-size:12px}.ok{background:rgba(32,200,117,.13);color:#71e0a6}.warn{background:rgba(245,158,11,.13);color:#f8c46a}.bad{background:rgba(239,68,68,.13);color:#f99}table{width:100%;border-collapse:collapse}th,td{padding:9px 8px;border-top:1px solid var(--line);text-align:left;vertical-align:top}th{color:#ddd;font-size:12px;text-transform:uppercase;letter-spacing:.04em}code{padding:2px 5px;border-radius:6px;background:#272727;color:#dbeafe}pre{max-height:420px;overflow:auto;padding:14px;border:1px solid var(--line);border-radius:12px;background:#101010;color:#d9e4ff}.pill{display:inline-flex;margin:2px 4px 2px 0;padding:2px 7px;border:1px solid #444;border-radius:999px;color:#ddd;font-size:12px}@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.grid{grid-template-columns:1fr}main{width:min(100% - 20px,1180px)}}
  </style></head><body><main><h1>🛠️ Cobblemon Realms Wiki Admin</h1><p class="muted">Hidden management dashboard. Do not link this URL publicly.</p><div id="app"><p>Loading admin data...</p></div><script>
  const statusPath=${JSON.stringify(statusPath)};
  const app=document.getElementById('app');
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const fmt=(v)=>v?new Date(v).toLocaleString():'';
  function pills(values){return (values||[]).map(v=>'<span class="pill">'+esc(v)+'</span>').join('')||'<span class="muted">none</span>'}
  fetch(statusPath,{credentials:'same-origin'}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}).then(data=>{
    const build=data.buildInfo||{};const stats=data.stats||{};const feedback=stats.feedback||[];const analytics=stats.analytics||[];const updates=data.pageUpdates||[];const meta=data.pageMeta||{};const rules=meta.rules||[];const sec=data.security||{};
    app.innerHTML='<div class="grid"><div class="card"><span class="muted">Commit</span><strong>'+esc(String(build.commit||'unknown').slice(0,8))+'</strong></div><div class="card"><span class="muted">Pages</span><strong>'+esc(build.pages||updates.length||'n/a')+'</strong></div><div class="card"><span class="muted">Git dates</span><strong>'+esc(build.pageDates?.verified||0)+' ok</strong></div><div class="card"><span class="muted">Stats storage</span><strong>'+(stats.enabled?'Enabled':'Disabled')+'</strong></div></div>'+
    '<section class="section"><h2>Security</h2><p><span class="status '+(sec.basicAuthConfigured?'ok':'bad')+'">Basic auth '+(sec.basicAuthConfigured?'configured':'missing')+'</span> <span class="status '+(sec.secretPathEnabled?'ok':'warn')+'">Secret path '+(sec.secretPathEnabled?'enabled':'optional')+'</span> <span class="status '+(sec.statsStorageEnabled?'ok':'warn')+'">KV stats '+(sec.statsStorageEnabled?'enabled':'disabled')+'</span></p><p class="muted">'+esc(sec.recommendation||'')+'</p></section>'+
    '<section class="section"><h2>Article feedback</h2>'+tableFeedback(feedback)+'</section>'+
    '<section class="section"><h2>Most counted analytics events</h2>'+tableAnalytics(analytics)+'</section>'+
    '<section class="section"><h2>Recently updated pages</h2>'+tableUpdates(updates)+'</section>'+
    '<section class="section"><h2>Badge and filter rules</h2>'+tableRules(rules)+'</section>'+
    '<section class="section"><h2>How to manage badges and filters</h2><p>Edit <code>page-meta.json</code> in GitHub. Use <code>rules</code> for path-wide rules and <code>pages</code> for exact page overrides. Badges and filter labels are multilingual through the <code>labels.fr</code> and <code>labels.en</code> blocks.</p><pre>'+esc(JSON.stringify({pages:{'/example-page':{status:'verified-v6',badges:['v6','client','mods'],filters:['mods']} }},null,2))+'</pre></section>';
  }).catch(err=>{app.innerHTML='<section class="section"><h2>Unable to load admin data</h2><p class="muted">'+esc(err.message)+'</p></section>'});
  function tableFeedback(items){if(!items.length)return '<p class="muted">No feedback stored yet. Configure the WIKI_STATS KV binding to persist feedback.</p>';return '<table><thead><tr><th>Page</th><th>Yes</th><th>No</th><th>Updated</th></tr></thead><tbody>'+items.slice(0,80).map(i=>'<tr><td><code>'+esc(i.path)+'</code></td><td>'+esc(i.yes||0)+'</td><td>'+esc(i.no||0)+'</td><td>'+esc(fmt(i.updatedAt))+'</td></tr>').join('')+'</tbody></table>'}
  function tableAnalytics(items){if(!items.length)return '<p class="muted">No analytics counters stored yet.</p>';return '<table><thead><tr><th>Event</th><th>Detail</th><th>Path</th><th>Count</th></tr></thead><tbody>'+items.slice(0,80).map(i=>'<tr><td>'+esc(i.event)+'</td><td>'+esc(i.detail||'')+'</td><td><code>'+esc(i.path||'')+'</code></td><td>'+esc(i.count||0)+'</td></tr>').join('')+'</tbody></table>'}
  function tableUpdates(items){if(!items.length)return '<p class="muted">No page update index available.</p>';return '<table><thead><tr><th>Title</th><th>Path</th><th>Updated</th></tr></thead><tbody>'+items.slice(0,60).map(i=>'<tr><td>'+esc(i.title)+'</td><td><code>'+esc(i.path)+'</code></td><td>'+esc(fmt(i.updatedAt))+'</td></tr>').join('')+'</tbody></table>'}
  function tableRules(items){if(!items.length)return '<p class="muted">No page-meta rules configured.</p>';return '<table><thead><tr><th>Match</th><th>Status</th><th>Badges</th><th>Filters</th></tr></thead><tbody>'+items.map(r=>'<tr><td><code>'+esc(r.match)+'</code></td><td>'+esc(r.status||'')+'</td><td>'+pills(r.badges)+'</td><td>'+pills(r.filters)+'</td></tr>').join('')+'</tbody></table>'}
</script></main></body></html>`;
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
