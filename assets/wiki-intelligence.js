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
    relatedIntro: 'Guides proches de ce sujet',
    relatedCategory: 'Même catégorie',
    relatedBadge: 'Sujet similaire',
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
    relatedIntro: 'Guides close to this topic',
    relatedCategory: 'Same category',
    relatedBadge: 'Similar topic',
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
      return new RegExp(rule.match).test(path) || new RegExp(rule.match).test(path.replace(/^\/fr-FR/i, ''));
    } catch {
      return false;
    }
  }

  function resolveMeta(config, path) {
    const defaults = config?.defaults || {};
    let result = {
      status: defaults.status || 'unknown',
      badges: [...(defaults.badges || [])],
      filters: [...(defaults.filters || [])]
    };

    (config?.rules || []).forEach((rule) => {
      if (!ruleMatches(rule, path)) return;
      result = {
        status: rule.status || result.status,
        badges: unique(rule.badges || result.badges),
        filters: unique(rule.filters || result.filters)
      };
    });

    const shortPath = path.replace(/^\/fr-FR/i, '') || '/';
    const override = config?.pages?.[path] || config?.pages?.[shortPath];
    if (override) {
      result = {
        status: override.status || result.status,
        badges: unique(override.badges || result.badges),
        filters: unique(override.filters || result.filters)
      };
    }

    return result;
  }

  function statusLabel(config, status) {
    return config?.labels?.[language]?.status?.[status]
      || config?.labels?.en?.status?.[status]
      || status;
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

  function installFreshness(metaConfig, updates) {
    const article = document.querySelector('article');
    if (!article || document.body.classList.contains('not-found-page')) return;
    if (article.querySelector('.page-freshness')) return;

    const path = normalizePath();
    if (path === '/') return;
    const meta = resolveMeta(metaConfig || {}, path);
    const update = pageByPath(updates, path);
    const container = document.createElement('div');
    container.className = `page-freshness is-${meta.status || 'unknown'}`;
    container.innerHTML = `<span class="page-freshness-status">${escapeHtml(statusLabel(metaConfig || {}, meta.status || 'unknown'))}</span><span aria-hidden="true">•</span><span>${escapeHtml(friendlyAge(update?.updatedAt))}</span>`;

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

  function tokens(value = '') {
    return normalizeText(value).split(' ').filter((token) => token.length >= 3);
  }

  function parentPath(value = '') {
    const path = normalizePath(value).replace(/^\/fr-FR/i, '');
    const parts = path.split('/').filter(Boolean);
    return parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  }

  function relatedScore(current, candidate, currentMeta, candidateMeta) {
    let score = 0;
    let categoryMatch = 0;
    let badgeMatch = 0;

    const currentFilters = new Set(currentMeta.filters || []);
    for (const filter of candidateMeta.filters || []) {
      if (currentFilters.has(filter)) {
        score += 9;
        categoryMatch += 1;
      }
    }

    const currentBadges = new Set(currentMeta.badges || []);
    for (const badge of candidateMeta.badges || []) {
      if (currentBadges.has(badge)) {
        score += 6;
        badgeMatch += 1;
      }
    }

    if (parentPath(current.href) && parentPath(current.href) === parentPath(candidate.href)) score += 8;

    const titleTokens = new Set(tokens(current.title));
    for (const token of tokens(candidate.title)) if (titleTokens.has(token)) score += 5;

    const pathTokens = new Set(tokens(current.href));
    for (const token of tokens(candidate.href)) if (pathTokens.has(token)) score += 2;

    if (currentMeta.status === candidateMeta.status) score += 1;
    return { score, categoryMatch, badgeMatch };
  }

  function installRelatedPages(metaConfig, searchIndex) {
    const article = document.querySelector('article');
    if (!article || document.body.classList.contains('not-found-page') || article.querySelector('.related-pages')) return;
    const path = normalizePath();
    if (path === '/') return;

    const current = (searchIndex || []).find((entry) => entry.language === language && normalizePath(entry.href) === path);
    if (!current) return;
    const currentMeta = resolveMeta(metaConfig || {}, path);

    const ranked = (searchIndex || [])
      .filter((entry) => entry.language === language && normalizePath(entry.href) !== path)
      .map((entry) => {
        const entryPath = normalizePath(entry.href);
        const candidateMeta = resolveMeta(metaConfig || {}, entryPath);
        return { ...entry, href: entryPath, ...relatedScore(current, entry, currentMeta, candidateMeta) };
      })
      .filter((entry) => entry.score >= 6)
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, language))
      .slice(0, 4);

    if (!ranked.length) return;

    const section = document.createElement('section');
    section.className = 'related-pages';
    section.setAttribute('aria-label', labels.relatedTitle);
    section.innerHTML = `<div class="related-pages-head"><div><h2>${escapeHtml(labels.relatedTitle)}</h2><p>${escapeHtml(labels.relatedIntro)}</p></div></div><div class="related-pages-grid">${ranked.map((entry) => {
      const reason = entry.categoryMatch ? labels.relatedCategory : labels.relatedBadge;
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
    const entryPath = normalizePath(entry.href).replace(/^\/fr-FR/i, '');
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

  function install404Suggestions(searchIndex) {
    if (!document.body.classList.contains('not-found-page')) return;
    const card = document.querySelector('.not-found-card');
    const fallback = document.querySelector('.not-found-links');
    if (!card || !fallback || card.querySelector('.not-found-suggestions')) return;

    const target = normalizePath(location.pathname);
    const ranked = (searchIndex || [])
      .filter((entry) => entry.language === language)
      .map((entry) => ({ ...entry, href: normalizePath(entry.href), score: pathSimilarity(target, entry) }))
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
    const [metaConfig, searchIndex, updates] = await Promise.all([
      fetch('/page-meta.json', { cache: 'no-store' }).then((response) => response.ok ? response.json() : {}).catch(() => ({})),
      fetch('/search-index.json', { cache: 'no-store' }).then((response) => response.ok ? response.json() : []).catch(() => []),
      fetch('/page-updates.json', { cache: 'no-store' }).then((response) => response.ok ? response.json() : []).catch(() => [])
    ]);

    installFreshness(metaConfig, Array.isArray(updates) ? updates : []);
    installStatusNotice(metaConfig);
    installRelatedPages(metaConfig, Array.isArray(searchIndex) ? searchIndex : []);
    install404Suggestions(Array.isArray(searchIndex) ? searchIndex : []);
    installMobileNav();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
