(() => {
  const nativeFetch = window.fetch.bind(window);
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const isFr = language === 'fr';
  const synonymPromise = nativeFetch('/api/search-synonyms', { cache: 'no-store', credentials: 'same-origin' })
    .then(r => r.ok ? r.json() : []).catch(() => []);

  function norm(v = '') { return String(v).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function enrichIndex(entries, groups) {
    if (!Array.isArray(entries) || !Array.isArray(groups) || !groups.length) return entries;
    return entries.map(entry => {
      const hay = norm(`${entry.title || ''} ${entry.text || ''}`);
      const aliases = new Set();
      groups.forEach(group => {
        const terms = [group.term, ...(group.aliases || [])].map(norm).filter(Boolean);
        if (terms.some(term => hay.includes(term))) terms.forEach(term => aliases.add(term));
      });
      if (!aliases.size) return entry;
      return { ...entry, text: `${entry.text || ''} ${[...aliases].join(' ')}`.trim(), aliases: `${entry.aliases || ''} ${[...aliases].join(' ')}`.trim() };
    });
  }

  window.fetch = async function(input, init) {
    const target = typeof input === 'string' ? input : input?.url || '';
    let pathname = '';
    try { pathname = new URL(target, location.origin).pathname; } catch {}
    const response = await nativeFetch(input, init);
    if (pathname !== '/search-index.json' || !response.ok) return response;
    try {
      const [data, groups] = await Promise.all([response.clone().json(), synonymPromise]);
      const headers = new Headers(response.headers); headers.set('content-type', 'application/json; charset=utf-8');
      return new Response(JSON.stringify(enrichIndex(data, groups)), { status: response.status, statusText: response.statusText, headers });
    } catch { return response; }
  };

  const labels = isFr ? {
    home: 'Accueil', info: 'Information', realms: 'Cobblemon Realms', legends: 'Mythes et Légendes', exclusives: 'Pokémon Exclusifs', cosmetics: 'Cosmétiques Pokémon', mods: 'Guides des Mods', settings: 'Paramètres',
    read: min => `${min} min de lecture`, introduced: 'Introduit', updated: 'Mis à jour', removed: 'Retiré', recent: 'Récemment mis à jour', recentIntro: 'Les dernières pages actualisées du wiki.', popular: 'Guides populaires', popularIntro: 'Les pages les plus consultées au cours des 30 derniers jours.'
  } : {
    home: 'Home', info: 'Information', realms: 'Cobblemon Realms', legends: 'Myths and Legends', exclusives: 'Pokemon Exclusives', cosmetics: 'Pokémon Cosmetics', mods: 'Mod Guides', settings: 'Settings',
    read: min => `${min} min read`, introduced: 'Introduced', updated: 'Updated', removed: 'Removed', recent: 'Recently updated', recentIntro: 'The latest pages updated on the wiki.', popular: 'Popular guides', popularIntro: 'The most viewed pages over the last 30 days.'
  };
  const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  const cleanPath = (value = location.pathname) => { try { return new URL(value, location.origin).pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/'; } catch { return '/'; } };
  const unique = values => [...new Set((values || []).filter(Boolean))];
  function ruleMatches(rule, path) { try { const re = new RegExp(rule.match); return re.test(path) || re.test(path.replace(/^\/fr-FR/i, '')); } catch { return false; } }
  function resolveMeta(config, path) {
    const d = config?.defaults || {};
    let out = { status: d.status || 'unknown', badges: [...(d.badges || [])], filters: [...(d.filters || [])], topics: [...(d.topics || [])], version: { ...(d.version || {}) } };
    (config?.rules || []).forEach(rule => { if (!ruleMatches(rule, path)) return; out = { status: rule.status || out.status, badges: unique(rule.badges || out.badges), filters: unique(rule.filters || out.filters), topics: unique(rule.topics || out.topics), version: { ...out.version, ...(rule.version || {}) } }; });
    const short = path.replace(/^\/fr-FR/i, '') || '/'; const o = config?.pages?.[path] || config?.pages?.[short];
    if (o) out = { status: o.status || out.status, badges: unique(o.badges || out.badges), filters: unique(o.filters || out.filters), topics: unique(o.topics || out.topics), version: { ...out.version, ...(o.version || {}) } };
    return out;
  }
  function title() { return document.querySelector('article > h1')?.textContent.trim() || document.querySelector('article h1')?.textContent.trim() || document.title; }

  function categoryFor(meta) {
    const t = new Set(meta.topics || []);
    const prefix = isFr ? '/fr-FR' : '';
    if (t.has('cobblesafari')) return [{ label: labels.mods, href: null }, { label: 'CobbleSafari', href: `${prefix}/mods-guides/CobbleSafari/cobblesafari` }];
    if (t.has('legendary') || t.has('generations')) return [{ label: labels.legends, href: `${prefix}/pokemons-guides/myths-and-legends-legendaries` }];
    if (t.has('cosmetics')) return [{ label: labels.cosmetics, href: null }];
    if (t.has('pokemon-exclusive') || t.has('custom-types') || t.has('paradox') || t.has('starter-forms')) return [{ label: labels.exclusives, href: null }];
    if (t.has('mod-guide') || t.has('dimensions') || t.has('rustling-spots')) return [{ label: labels.mods, href: null }];
    if (t.has('settings') || t.has('configuration') || t.has('performance')) return [{ label: labels.settings, href: null }];
    if (t.has('installation') || t.has('faq') || t.has('bug-report') || t.has('version-history') || t.has('community') || t.has('support')) return [{ label: labels.info, href: null }];
    return [{ label: labels.realms, href: null }];
  }

  function installBreadcrumb(meta) {
    const article = document.querySelector('article'), h1 = article?.querySelector(':scope > h1'); if (!article || !h1) return;
    article.querySelector('.wiki-breadcrumb')?.remove();
    const crumbs = [{ label: labels.home, href: isFr ? '/fr-FR/' : '/' }, ...categoryFor(meta), { label: title(), href: null }];
    const nav = document.createElement('nav'); nav.className = 'wiki-breadcrumb v4-semantic-breadcrumb'; nav.setAttribute('aria-label', isFr ? 'Fil d’Ariane' : 'Breadcrumb');
    nav.innerHTML = crumbs.map((c, i) => `<span class="wiki-breadcrumb-item">${c.href && i < crumbs.length - 1 ? `<a href="${esc(c.href)}">${esc(c.label)}</a>` : `<span${i === crumbs.length - 1 ? ' aria-current="page"' : ''}>${esc(c.label)}</span>`}</span>`).join('');
    article.insertBefore(nav, h1);
  }

  function installReadingTime() {
    const article = document.querySelector('article'); if (!article || document.body.classList.contains('not-found-page')) return;
    const clone = article.cloneNode(true); clone.querySelectorAll('nav,.article-pagination,.article-feedback,.related-pages,.article-meta,.page-freshness,.page-meta-badges,.technical-badges,script,style').forEach(x => x.remove());
    const words = (clone.textContent || '').trim().split(/\s+/).filter(Boolean).length; if (words < 80) return;
    const min = Math.max(1, Math.ceil(words / 220));
    const el = document.createElement('div'); el.className = 'v4-reading-time'; el.textContent = `⏱ ${labels.read(min)}`;
    const freshness = article.querySelector('.page-freshness'), badges = article.querySelector('.page-meta-badges'), tools = article.querySelector('.article-tools');
    (freshness || badges || tools || article.querySelector(':scope > h1'))?.insertAdjacentElement('afterend', el);
  }

  function installVersion(meta) {
    const v = meta.version || {}; if (!v.introduced && !v.updated && !v.removed) return;
    const article = document.querySelector('article'); if (!article) return;
    const el = document.createElement('div'); el.className = 'v4-version-applicability';
    el.innerHTML = `${v.introduced ? `<span>${esc(labels.introduced)} <strong>v${esc(v.introduced)}</strong></span>` : ''}${v.updated ? `<span>${esc(labels.updated)} <strong>v${esc(v.updated)}</strong></span>` : ''}${v.removed ? `<span class="is-removed">${esc(labels.removed)} <strong>v${esc(v.removed)}</strong></span>` : ''}`;
    const read = article.querySelector('.v4-reading-time'), fresh = article.querySelector('.page-freshness'), badges = article.querySelector('.page-meta-badges');
    (read || fresh || badges || article.querySelector(':scope > h1'))?.insertAdjacentElement('afterend', el);
  }

  function renderHomeSection(titleText, intro, items, kind) {
    if (!items.length) return '';
    return `<section class="v4-home-section is-${kind}"><div class="v4-home-head"><div><h2>${esc(titleText)}</h2><p>${esc(intro)}</p></div></div><div class="v4-home-grid">${items.map(item => `<a href="${esc(item.path)}"><strong>${esc(item.title)}</strong><span>${kind === 'popular' ? `${esc(item.count)} views / 30d` : esc(item.dateLabel || '')}</span></a>`).join('')}</div></section>`;
  }
  function dateLabel(value) { if (!value) return ''; try { return new Intl.DateTimeFormat(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)); } catch { return ''; } }

  async function installHome(updates) {
    const path = cleanPath(); if (!(path === '/' || path === '/fr-FR')) return;
    const article = document.querySelector('article'); if (!article || article.querySelector('.v4-home-section')) return;
    const candidates = (updates || []).filter(p => p.language === language && cleanPath(p.path) !== path && p.updatedAt).slice().sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))).slice(0, 6).map(p => ({ ...p, dateLabel: dateLabel(p.updatedAt) }));
    const popularRaw = await nativeFetch(`/api/popular-pages?language=${language}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : []).catch(() => []);
    const byPath = new Map((updates || []).filter(p => p.language === language).map(p => [cleanPath(p.path), p]));
    const popular = (popularRaw || []).map(x => ({ ...x, ...(byPath.get(cleanPath(x.path)) || {}) })).filter(x => x.title && x.path).slice(0, 6);
    const holder = document.createElement('div'); holder.className = 'v4-home-intelligence'; holder.innerHTML = `${renderHomeSection(labels.recent, labels.recentIntro, candidates, 'recent')}${renderHomeSection(labels.popular, labels.popularIntro, popular, 'popular')}`;
    const meta = article.querySelector('.article-meta'); if (meta) article.insertBefore(holder, meta); else article.appendChild(holder);
  }

  async function initialize() {
    document.querySelectorAll('.technical-badges').forEach(x => x.remove());
    const [metaConfig, updates] = await Promise.all([
      nativeFetch('/page-meta.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : {}).catch(() => ({})),
      nativeFetch('/page-updates.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : []).catch(() => [])
    ]);
    const path = cleanPath(), meta = resolveMeta(metaConfig, path);
    if (!(path === '/' || path === '/fr-FR') && !document.body.classList.contains('not-found-page')) {
      installBreadcrumb(meta); installReadingTime(); installVersion(meta);
    }
    await installHome(Array.isArray(updates) ? updates : []);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
