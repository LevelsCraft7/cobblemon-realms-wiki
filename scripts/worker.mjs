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

  if (env.WIKI_ANALYTICS) {
    env.WIKI_ANALYTICS.writeDataPoint({
      indexes: [event],
      blobs: [event, sanitizeAnalyticsPath(payload?.path), detail, language],
      doubles: [1]
    });
  }

  return new Response(null, {
    status: 204,
    headers: {
      'cache-control': 'no-store',
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

    if (url.pathname === '/api/analytics') {
      return recordAnonymousAnalytics(request, env);
    }

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
