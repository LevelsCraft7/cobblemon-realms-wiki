const INVITE_CODE = 'kb8NSTF45n';
const INVITE_URL = `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true&with_expiration=true`;

function json(payload, status = 200, cacheControl = 'no-store') {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cacheControl,
      'access-control-allow-origin': '*'
    }
  });
}

async function getDiscordStats(request, context) {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = '/__cache/discord-stats';
  cacheUrl.search = '';
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(INVITE_URL, {
      headers: {
        accept: 'application/json',
        'user-agent': 'Cobblemon Realms Wiki (https://wiki.cobblemon-realms.com, 1.0)'
      }
    });

    if (!response.ok) {
      return json({ error: 'Discord unavailable' }, 502);
    }

    const invite = await response.json();
    const payload = {
      name: invite.guild?.name ?? 'Cobblemon Realms',
      online: invite.approximate_presence_count ?? invite.guild?.approximate_presence_count ?? null,
      members: invite.approximate_member_count ?? invite.guild?.approximate_member_count ?? null,
      inviteUrl: `https://discord.gg/${INVITE_CODE}`
    };

    const output = json(payload, 200, 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
    context.waitUntil(cache.put(cacheKey, output.clone()));
    return output;
  } catch {
    return json({ error: 'Discord unavailable' }, 502);
  }
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);

    if (url.pathname === '/api/discord') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
      return getDiscordStats(request, context);
    }

    return env.ASSETS.fetch(request);
  }
};
