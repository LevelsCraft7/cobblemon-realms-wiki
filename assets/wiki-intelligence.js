(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const isFrench = language === 'fr';

  const labels = isFrench ? {
    freshnessUnknown: 'Date de mise à jour indisponible',
    updatedToday: 'Mis à jour aujourd’hui',
    updatedYesterday: 'Mis à jour hier',
    updatedDays: (value) => `Mis à jour il y a ${value} jours`,
    updatedMonths: (value) => `Mis à jour il y a ${value} mois`,
    updatedYears: (value) => `Mis à jour il y a ${value} an${value > 1 ? 's' : ''}`,
    relatedTitle: 'Pages liées',
    relatedIntro: 'Guides réellement proches de ce sujet',
    relatedTopic: 'Sujet commun',
    relatedFamily: 'Même rubrique',
    previous: 'Précédent',
    next: 'Suivant',
    search: 'Recherche',
    top: 'Haut',
    suggestions: 'Vous cherchiez peut-être…',
    suggestionsIntro: 'Pages proches de l’adresse demandée',
    legacyTitle: 'Guide pour une ancienne version',
    legacyText: 'Cette page documente Cobblemon Realms 5.x. Certaines informations peuvent ne plus s’appliquer à la v6.',
    reviewTitle: 'Page à vérifier',
    reviewText: 'Cette page est en cours de vérification pour Cobblemon Realms v6. Utilisez les informations avec prudence.',
    draftTitle: 'Brouillon',
    draftText: 'Cette page est encore en préparation et peut contenir des informations incomplètes.'
  } : {
    freshnessUnknown: 'Update date unavailable',
    updatedToday: 'Updated today',
    updatedYesterday: 'Updated yesterday',
    updatedDays: (value) => `Updated ${value} days ago`,
    updatedMonths: (value) => `Updated ${value} month${value > 1 ? 's' : ''} ago`,
    updatedYears: (value) => `Updated ${value} year${value > 1 ? 's' : ''} ago`,
    relatedTitle: 'Related pages',
    relatedIntro: 'Guides that are genuinely close to this topic',
    relatedTopic: 'Shared topic',
    relatedFamily: 'Same section',
    previous: 'Previous',
    next: 'Next',
    search: 'Search',
    top: 'Top',
    suggestions: 'You may be looking for…',
    suggestionsIntro: 'Pages close to the requested address',
    legacyTitle: 'Guide for an older version',
    legacyText: 'This page documents Cobblemon Realms 5.x. Some information may no longer apply to v6.',
    reviewTitle: 'Page needs review',
    reviewText: 'This page is being reviewed for Cobblemon Realms v6. Use the information with caution.',
    draftTitle: 'Draft',
    draftText: 'This page is still being prepared and may contain incomplete information.'
  };

  function normalizePath(value = location.pathname) {
    try {
      const url = new URL(value, location.origin);
      return url.pathname
        .replace(/\/index(?:\.html)?$/i, '/')
        .replace(/\.html$/i, '')
        .replace(/\/$/, '') || '/';
    } catch {
      return '/';
    }
  }

  function normalizeText(value = '') {
    return String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[character]));
  }

  function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
  }

  function ruleMatches(rule, path) {
    try {
      const matcher = new RegExp(rule.match);
      return matcher.test(path) || matcher.test(path.replace(/^\/fr-FR/i, ''));
    } catch {
      return false;
    }
  }

  function resolveMeta(config, path) {
    const defaults = config?.defaults || {};
    let result = {
      status: defaults.status || 'unknown',
      badges: [...(defaults.badges || [])],
      filters: [...(defaults.filters || [])],
      topics: [...(defaults.topics || [])]
    };

    (config?.rules || []).forEach((rule) => {
      if (!ruleMatches(rule, path)) return;
      result = {
        status: rule.status || result.status,
        badges: unique(rule.badges || result.badges),
        filters: unique(rule.filters || result.filters),
        topics: unique(rule.topics || result.topics)
      };
    });

    const shortPath = path.replace(/^\/fr-FR/i, '') || '/';
    const override = config?.pages?.[path] || config?.pages?.[shortPath];
    if (override) {
      result = {
        status: override.status || result.status,
        badges: unique(override.badges || result.badges),
        filters: unique(override.filters || result.filters),
        topics: unique(override.topics || result.topics)
      };
    }

    return result;
  }

  function friendlyAge(value) {
    if (!value) return labels.freshnessUnknown;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return labels.freshnessUnknown;
    const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
    if (days === 0) return labels.updatedToday;
    if (days === 1) return labels.updatedYesterday;
    if (days < 45) return labels.updatedDays(days);
    if (days < 730) return labels.updatedMonths(Math.max(1, Math.round(days / 30)));
    return labels.updatedYears(Math.max(1, Math.round(days / 365)));
  }

  function pageByPath(items, path) {
    const target = normalizePath(path);
    return (items || []).find((item) => normalizePath(item.path || item.href || '/') === target) || null;
  }

  function installFreshness(updates) {
    const article = document.querySelector('article');
    if (!article || document.body.classList.contains('not-found-page') || article.querySelector('.page-freshness')) return;

    const path = normalizePath();
    if (path === '/') return;
    const update = pageByPath(updates, path);
    const container = document.createElement('div');
    container.className = 'page-freshness';
    container.innerHTML = `<span>${escapeHtml(friendlyAge(update?.updatedAt))}</span>`;

    const badges = article.querySelector('.page-meta-badges');
    const tools = article.querySelector('.article-tools');
    const heading = article.querySelector(':scope > h1');
    if (badges) badges.insertAdjacentElement('afterend', container);
    else if (tools) tools.insertAdjacentElement('afterend', container);
    else heading?.insertAdjacentElement('afterend', container);
  }

  function installStatusNotice(metaConfig) {
    const article = document.querySelector('article');
    if (!article || document.body.classList.contains('not-found-page') || article.querySelector('.page-status-notice')) return;
    const path = normalizePath();
    if (path === '/') return;
    const meta = resolveMeta(metaConfig || {}, path);
    const copy = meta.status === 'legacy-5'
      ? { icon: '⚠️', title: labels.legacyTitle, text: labels.legacyText }
      : meta.status === 'needs-review'
        ? { icon: '🔎', title: labels.reviewTitle, text: labels.reviewText }
        : meta.status === 'draft'
          ? { icon: '📝', title: labels.draftTitle, text: labels.draftText }
          : null;
    if (!copy) return;

    const notice = document.createElement('aside');
    notice.className = `page-status-notice is-${meta.status}`;
    notice.setAttribute('role', 'note');
    notice.innerHTML = `<span class="page-status-notice-icon" aria-hidden="true">${copy.icon}</span><div><strong>${escapeHtml(copy.title)}</strong><p>${escapeHtml(copy.text)}</p></div>`;

    const freshness = article.querySelector('.page-freshness');
    const badges = article.querySelector('.page-meta-badges');
    const heading = article.querySelector(':scope > h1');
    if (freshness) freshness.insertAdjacentElement('afterend', notice);
    else if (badges) badges.insertAdjacentElement('afterend', notice);
    else heading?.insertAdjacentElement('afterend', notice);
  }

  const tokenStopWords = new Set([
    'the', 'and', 'for', 'with', 'from', 'guide', 'guides', 'page', 'pages',
    'cobblemon', 'realms', 'pokemon', 'pokémon', 'about', 'system', 'your',
    'les', 'des', 'pour', 'avec', 'dans', 'sur', 'une', 'un'
  ]);

  function tokens(value = '') {
    return normalizeText(value)
      .split(' ')
      .filter((token) => token.length >= 3 && !tokenStopWords.has(token));
  }

  function parentPath(value = '') {
    const path = normalizePath(value).replace(/^\/fr-FR/i, '');
    const parts = path.split('/').filter(Boolean);
    return parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  }

  const genericRelatedTopics = new Set([
    'overview',
    'support',
    'pokemon',
    'pokemon-exclusive',
    'custom-content',
    'mod-guide',
    'settings',
    'configuration',
    'multiplayer'
  ]);

  function relatedScore(current, candidate, currentMeta, candidateMeta) {
    const currentTopics = new Set(currentMeta.topics || []);
    const sharedTopics = unique((candidateMeta.topics || []).filter((topic) => currentTopics.has(topic)));
    const specificTopics = sharedTopics.filter((topic) => !genericRelatedTopics.has(topic));
    const sameParent = Boolean(parentPath(current.path)) && parentPath(current.path) === parentPath(candidate.path);

    const currentTitleTokens = new Set(tokens(current.title));
    const sharedTitleTokens = unique(tokens(candidate.title).filter((token) => currentTitleTokens.has(token)));

    const currentPathTokens = new Set(tokens(current.path));
    const sharedPathTokens = unique(tokens(candidate.path).filter((token) => currentPathTokens.has(token)));

    const strongMatch =
      specificTopics.length > 0 ||
      (sameParent && sharedTopics.length > 0) ||
      (sameParent && sharedTitleTokens.length > 0);

    if (!strongMatch) return { score: 0, sharedTopics: [], sameParent: false };

    let score = 0;
    score += Math.min(48, specificTopics.length * 24);
    score += Math.min(8, sharedTopics.length * 4);
    if (sameParent) score += 12;
    score += Math.min(18, sharedTitleTokens.length * 6);
    score += Math.min(6, sharedPathTokens.length * 3);

    const currentFilters = new Set(currentMeta.filters || []);
    const sharedFilters = unique((candidateMeta.filters || []).filter((filter) => currentFilters.has(filter)));
    score += Math.min(4, sharedFilters.length * 2);

    return { score, sharedTopics, sameParent };
  }

  function installRelatedPages(metaConfig, pages) {
    const article = document.querySelector('article');
    if (!article || document.body.classList.contains('not-found-page') || article.querySelector('.related-pages')) return;
    const path = normalizePath();
    if (path === '/') return;

    const pagePaths = unique(
      (pages || [])
        .filter((entry) => entry?.path && entry.language === language)
        .map((entry) => normalizePath(entry.path))
    );
    const realPages = pagePaths.map((pagePath) => pageByPath(pages, pagePath)).filter(Boolean);
    const current = realPages.find((entry) => normalizePath(entry.path) === path);
    if (!current) return;

    current.path = normalizePath(current.path);
    const currentMeta = resolveMeta(metaConfig || {}, path);

    const ranked = realPages
      .filter((entry) => normalizePath(entry.path) !== path)
      .map((entry) => {
        const entryPath = normalizePath(entry.path);
        const candidate = { ...entry, path: entryPath };
        const candidateMeta = resolveMeta(metaConfig || {}, entryPath);
        return {
          ...candidate,
          href: entryPath,
          ...relatedScore(current, candidate, currentMeta, candidateMeta)
        };
      })
      .filter((entry) => entry.score >= 18)
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, language))
      .slice(0, 4);

    if (!ranked.length) return;

    const section = document.createElement('section');
    section.className = 'related-pages';
    section.setAttribute('aria-label', labels.relatedTitle);
    section.innerHTML = `<div class="related-pages-head"><div><h2>${escapeHtml(labels.relatedTitle)}</h2><p>${escapeHtml(labels.relatedIntro)}</p></div></div><div class="related-pages-grid">${ranked.map((entry) => {
      const reason = entry.sameParent ? labels.relatedFamily : labels.relatedTopic;
      return `<a class="related-page-card" href="${escapeHtml(entry.href)}"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(reason)}</span></a>`;
    }).join('')}</div>`;

    const pagination = article.querySelector('.article-pagination');
    const feedback = article.querySelector('.article-feedback');
    const meta = article.querySelector('.article-meta');
    const anchor = pagination || feedback || meta;
    if (anchor) article.insertBefore(section, anchor);
    else article.appendChild(section);
  }

  function installMobileNav() {
    if (document.querySelector('.mobile-quick-nav')) return;
    const search = document.getElementById('search');
    const pagination = document.querySelector('.article-pagination');
    if (!search && !pagination && !document.body.classList.contains('not-found-page')) return;

    const previous = pagination?.querySelector('.article-pagination-link.is-previous');
    const next = pagination?.querySelector('.article-pagination-link.is-next');
    const nav = document.createElement('nav');
    nav.className = 'mobile-quick-nav';
    nav.setAttribute('aria-label', isFrench ? 'Navigation rapide' : 'Quick navigation');
    nav.innerHTML = `${previous ? `<a href="${escapeHtml(previous.getAttribute('href') || '#')}"><span aria-hidden="true">←</span><small>${escapeHtml(labels.previous)}</small></a>` : '<span class="mobile-quick-nav-spacer"></span>'}<button type="button" data-mobile-search><span aria-hidden="true">⌕</span><small>${escapeHtml(labels.search)}</small></button><button type="button" data-mobile-top><span aria-hidden="true">↑</span><small>${escapeHtml(labels.top)}</small></button>${next ? `<a href="${escapeHtml(next.getAttribute('href') || '#')}"><span aria-hidden="true">→</span><small>${escapeHtml(labels.next)}</small></a>` : '<span class="mobile-quick-nav-spacer"></span>'}`;

    nav.querySelector('[data-mobile-search]')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(() => search?.focus(), 220);
    });
    nav.querySelector('[data-mobile-top]')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(nav);
  }

  function pathSimilarity(target, entry) {
    const wanted = unique(tokens(target.replace(/^\/fr-FR/i, '')));
    const entryPath = normalizePath(entry.path || entry.href || '/').replace(/^\/fr-FR/i, '');
    const candidate = unique([...tokens(entryPath), ...tokens(entry.title)]);
    if (!wanted.length || !candidate.length) return 0;

    let score = 0;
    for (const token of wanted) {
      if (candidate.includes(token)) score += 6;
      else if (candidate.some((value) => value.includes(token) || token.includes(value))) score += 2;
    }

    const rawTarget = normalizeText(target);
    const rawEntry = normalizeText(`${entryPath} ${entry.title}`);
    if (rawEntry.includes(rawTarget) || rawTarget.includes(rawEntry)) score += 8;
    return score;
  }

  function install404Suggestions(pages) {
    if (!document.body.classList.contains('not-found-page')) return;
    const card = document.querySelector('.not-found-card');
    const fallback = document.querySelector('.not-found-links');
    if (!card || !fallback || card.querySelector('.not-found-suggestions')) return;

    const target = normalizePath(location.pathname);
    const ranked = (pages || [])
      .filter((entry) => entry?.path && entry.language === language)
      .map((entry) => ({
        ...entry,
        href: normalizePath(entry.path),
        score: pathSimilarity(target, entry)
      }))
      .filter((entry) => entry.score >= 4)
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, language))
      .slice(0, 4);

    if (!ranked.length) return;
    const section = document.createElement('section');
    section.className = 'not-found-suggestions';
    section.innerHTML = `<div><strong>${escapeHtml(labels.suggestions)}</strong><small>${escapeHtml(labels.suggestionsIntro)}</small></div><div class="not-found-suggestion-grid">${ranked.map((entry) => `<a href="${escapeHtml(entry.href)}">${escapeHtml(entry.title)}</a>`).join('')}</div>`;
    card.insertBefore(section, fallback);
  }

  async function initialize() {
    const [metaConfig, updates] = await Promise.all([
      fetch('/page-meta.json', { cache: 'no-store' })
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({})),
      fetch('/page-updates.json', { cache: 'no-store' })
        .then((response) => response.ok ? response.json() : [])
        .catch(() => [])
    ]);

    const pages = Array.isArray(updates) ? updates : [];
    installFreshness(pages);
    installStatusNotice(metaConfig);
    installRelatedPages(metaConfig, pages);
    install404Suggestions(pages);
    installMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
