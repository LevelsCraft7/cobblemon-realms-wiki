(() => {
  const menu = document.getElementById('menu');
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');
  const DISCORD_URL = 'https://discord.gg/kb8NSTF45n';
  let index = [];
  let activeIndex = -1;

  menu?.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  fetch('/search-index.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`Search index HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      index = Array.isArray(data) ? data : [];
    })
    .catch((error) => {
      console.error('Wiki search unavailable:', error);
    });

  function closeSearch() {
    if (!results || !input) return;
    results.hidden = true;
    results.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
  }

  function setActive(nextIndex) {
    if (!results) return;
    const links = [...results.querySelectorAll('a')];
    if (!links.length) return;
    activeIndex = Math.max(0, Math.min(nextIndex, links.length - 1));
    links.forEach((link, indexValue) => link.classList.toggle('is-active', indexValue === activeIndex));
    links[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function scoreEntry(entry, query) {
    const title = entry.title.toLowerCase();
    const text = entry.text.toLowerCase();
    let score = 0;
    if (title === query) score += 120;
    if (title.startsWith(query)) score += 70;
    if (title.includes(query)) score += 35;
    if (text.includes(query)) score += 8;
    return score;
  }

  function renderSearch() {
    if (!input || !results) return;
    const query = input.value.trim().toLowerCase();
    const language = document.documentElement.lang;

    if (query.length < 2) {
      closeSearch();
      return;
    }

    const matches = index
      .filter((entry) => entry.language === language)
      .map((entry) => ({ ...entry, score: scoreEntry(entry, query) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8);

    if (!matches.length) {
      results.innerHTML = `<div class="search-empty">${language === 'fr' ? 'Aucun résultat' : 'No results'}</div>`;
    } else {
      results.innerHTML = matches.map((entry) => {
        const safeTitle = entry.title
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;');
        return `<a role="option" href="${entry.href}"><strong>${safeTitle}</strong><span>${entry.href}</span></a>`;
      }).join('');
    }

    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    activeIndex = -1;
  }

  input?.addEventListener('input', renderSearch);
  input?.addEventListener('focus', renderSearch);
  input?.addEventListener('keydown', (event) => {
    if (!results || results.hidden) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(activeIndex <= 0 ? 0 : activeIndex - 1);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      results.querySelectorAll('a')[activeIndex]?.click();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrap')) closeSearch();
    if (event.target.closest('#sidebar a')) document.body.classList.remove('menu-open');
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      input?.focus();
      input?.select();
    }
    if (event.key === 'Escape') closeSearch();
  });

  async function fetchWithTimeout(url, timeout = 6000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
    try {
      return await fetch(url, { signal: controller.signal, cache: 'no-store' });
    } finally {
      window.clearTimeout(timer);
    }
  }

  function ensureCommunityStylesheet() {
    if (document.querySelector('link[data-community-badges]')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/assets/discord.css?v=server-status-1';
    stylesheet.dataset.communityBadges = 'true';
    document.head.appendChild(stylesheet);
  }

  function createBadge({ id, className, href, ariaLabel, html }) {
    const languageButton = document.querySelector('.language');
    if (!languageButton || document.getElementById(id)) return null;

    ensureCommunityStylesheet();
    const badge = document.createElement('a');
    badge.id = id;
    badge.className = `community-badge ${className}`;
    badge.href = href;
    badge.target = '_blank';
    badge.rel = 'noopener noreferrer';
    badge.setAttribute('aria-label', ariaLabel);
    badge.innerHTML = html;
    languageButton.parentNode.insertBefore(badge, languageButton);
    return badge;
  }

  function installDiscordBadge() {
    const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    const badge = createBadge({
      id: 'discord-badge',
      className: 'discord-badge',
      href: DISCORD_URL,
      ariaLabel: language === 'fr' ? 'Rejoindre le Discord Cobblemon Realms' : 'Join the Cobblemon Realms Discord',
      html: `
        <svg class="community-icon discord-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M19.54 5.34A16.3 16.3 0 0 0 15.44 4l-.5 1.02a15.1 15.1 0 0 0-5.86 0L8.56 4a16.5 16.5 0 0 0-4.1 1.35C1.87 9.2 1.17 12.96 1.52 16.67a16.7 16.7 0 0 0 5.03 2.55l1.23-1.68c-.67-.25-1.3-.56-1.9-.93l.46-.36c3.67 1.69 7.65 1.69 11.28 0l.47.36c-.6.37-1.24.69-1.9.94l1.22 1.67a16.6 16.6 0 0 0 5.04-2.55c.42-4.3-.72-8.03-2.91-11.33ZM8.5 14.44c-1.1 0-2-1.01-2-2.25s.88-2.26 2-2.26c1.12 0 2.02 1.02 2 2.26 0 1.24-.88 2.25-2 2.25Zm7 0c-1.1 0-2-1.01-2-2.25s.88-2.26 2-2.26c1.12 0 2.02 1.02 2 2.26 0 1.24-.88 2.25-2 2.25Z"/>
        </svg>
        <span class="community-copy discord-copy">
          <strong>Discord</strong>
          <small id="discord-stats">
            <span class="discord-online-part"><i></i><span id="discord-online">...</span> ${language === 'fr' ? 'en ligne' : 'online'}</span>
            <span class="community-divider discord-divider">•</span>
            <span class="discord-members-part"><span id="discord-members">...</span> ${language === 'fr' ? 'membres' : 'members'}</span>
          </small>
        </span>`
    });

    if (!badge) return;
    loadDiscordStats(badge, language);
    window.setInterval(() => loadDiscordStats(badge, language), 300000);
  }

  async function loadDiscordStats(badge, language) {
    const endpoints = [
      '/api/discord',
      'https://discord.com/api/v10/invites/kb8NSTF45n?with_counts=true&with_expiration=true'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetchWithTimeout(endpoint);
        if (!response.ok) continue;
        const data = await response.json();
        const online = data.online ?? data.approximate_presence_count ?? data.guild?.approximate_presence_count;
        const members = data.members ?? data.approximate_member_count ?? data.guild?.approximate_member_count;
        if (!Number.isFinite(online) || !Number.isFinite(members)) continue;

        const formatter = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US');
        document.getElementById('discord-online').textContent = formatter.format(online);
        document.getElementById('discord-members').textContent = formatter.format(members);
        badge.classList.add('is-loaded');
        badge.classList.remove('is-fallback');
        badge.title = `${formatter.format(online)} ${language === 'fr' ? 'en ligne' : 'online'} • ${formatter.format(members)} ${language === 'fr' ? 'membres' : 'members'}`;
        return;
      } catch (error) {
        console.debug('Discord stats endpoint unavailable:', endpoint, error);
      }
    }

    const stats = document.getElementById('discord-stats');
    if (stats) stats.textContent = language === 'fr' ? 'Rejoindre le serveur' : 'Join the server';
    badge.classList.add('is-fallback');
  }

  function installCurseForgeBadge() {
    const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    const badge = createBadge({
      id: 'curseforge-badge',
      className: 'curseforge-badge',
      href: 'https://www.curseforge.com/minecraft/modpacks/cobblemon-realms',
      ariaLabel: language === 'fr' ? 'Voir Cobblemon Realms sur CurseForge' : 'View Cobblemon Realms on CurseForge',
      html: `
        <span class="community-icon curseforge-icon" aria-hidden="true">CF</span>
        <span class="community-copy curseforge-copy">
          <strong>CurseForge</strong>
          <small id="curseforge-stats"><span id="curseforge-downloads">...</span> ${language === 'fr' ? 'téléchargements' : 'downloads'}</small>
        </span>`
    });

    if (!badge) return;
    loadCurseForgeStats(badge, language);
    window.setInterval(() => loadCurseForgeStats(badge, language), 600000);
  }

  async function loadCurseForgeStats(badge, language) {
    const endpoints = ['/api/curseforge', 'https://img.shields.io/curseforge/dt/1175360.json'];

    for (const endpoint of endpoints) {
      try {
        const response = await fetchWithTimeout(endpoint);
        if (!response.ok) continue;
        const data = await response.json();
        const downloads = data.downloads ?? data.message;
        if (typeof downloads !== 'string' || !downloads.trim()) continue;

        const formatted = downloads.trim();
        const target = document.getElementById('curseforge-downloads');
        if (target) target.textContent = formatted;
        badge.classList.add('is-loaded');
        badge.classList.remove('is-fallback');
        badge.title = `${formatted} ${language === 'fr' ? 'téléchargements' : 'downloads'}`;
        return;
      } catch (error) {
        console.debug('CurseForge stats endpoint unavailable:', endpoint, error);
      }
    }

    const stats = document.getElementById('curseforge-stats');
    if (stats) stats.textContent = language === 'fr' ? 'Voir le modpack' : 'View modpack';
    badge.classList.add('is-fallback');
  }

  function installServerBadge() {
    const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    const badge = createBadge({
      id: 'server-badge',
      className: 'server-badge is-checking',
      href: DISCORD_URL,
      ariaLabel: language === 'fr'
        ? 'Voir le statut du serveur officiel et rejoindre le Discord'
        : 'View official server status and join Discord',
      html: `
        <svg class="community-icon server-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 11h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Zm2-8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM10 7h8v1h-8V7Zm0 10h8v1h-8v-1Z"/>
        </svg>
        <span class="community-copy server-copy">
          <strong>${language === 'fr' ? 'Serveur officiel' : 'Official Server'}</strong>
          <small id="server-stats">
            <span class="server-state"><i></i><span id="server-status-label">${language === 'fr' ? 'Vérification' : 'Checking'}</span></span>
            <span class="community-divider server-divider">•</span>
            <span class="server-players"><span id="server-online">...</span> / <span id="server-max">...</span></span>
          </small>
        </span>`
    });

    if (!badge) return;
    loadServerStats(badge, language);
    window.setInterval(() => loadServerStats(badge, language), 60000);
  }

  async function loadServerStats(badge, language) {
    try {
      const response = await fetchWithTimeout('/api/server', 8000);
      if (!response.ok) throw new Error(`Server status HTTP ${response.status}`);
      const data = await response.json();
      const isOnline = data.online === true;
      const playerOnline = Number.isFinite(data.players?.online) ? data.players.online : 0;
      const playerMax = Number.isFinite(data.players?.max) ? data.players.max : 0;
      const formatter = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US');

      const statusLabel = document.getElementById('server-status-label');
      const onlineTarget = document.getElementById('server-online');
      const maxTarget = document.getElementById('server-max');
      if (statusLabel) statusLabel.textContent = isOnline
        ? (language === 'fr' ? 'En ligne' : 'Online')
        : (language === 'fr' ? 'Hors ligne' : 'Offline');
      if (onlineTarget) onlineTarget.textContent = formatter.format(playerOnline);
      if (maxTarget) maxTarget.textContent = formatter.format(playerMax);

      badge.classList.remove('is-checking', 'is-unavailable', 'is-online', 'is-offline');
      badge.classList.add(isOnline ? 'is-online' : 'is-offline');
      badge.title = isOnline
        ? `${language === 'fr' ? 'En ligne' : 'Online'} • ${formatter.format(playerOnline)} / ${formatter.format(playerMax)}`
        : (language === 'fr' ? 'Serveur hors ligne' : 'Server offline');
    } catch (error) {
      console.debug('Minecraft server status unavailable:', error);
      const statusLabel = document.getElementById('server-status-label');
      const onlineTarget = document.getElementById('server-online');
      const maxTarget = document.getElementById('server-max');
      if (statusLabel) statusLabel.textContent = language === 'fr' ? 'Indisponible' : 'Unavailable';
      if (onlineTarget) onlineTarget.textContent = '–';
      if (maxTarget) maxTarget.textContent = '–';
      badge.classList.remove('is-checking', 'is-online', 'is-offline');
      badge.classList.add('is-unavailable');
    }
  }

  installDiscordBadge();
  installCurseForgeBadge();
  installServerBadge();
})();
