(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const isFrench = language === 'fr';
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  const labels = {
    title: isFrench ? 'Filtrer les résultats' : 'Filter results',
    all: isFrench ? 'Tout' : 'All',
    gameplay: 'Gameplay',
    mods: 'Mods',
    legendary: isFrench ? 'Légendaires' : 'Legendaries',
    server: isFrench ? 'Serveur' : 'Server',
    commands: isFrench ? 'Commandes' : 'Commands',
    noResults: isFrench ? 'Aucun résultat' : 'No results',
    navigate: isFrench ? 'Naviguer' : 'Navigate',
    open: isFrench ? 'Ouvrir' : 'Open'
  };

  const categories = ['all', 'gameplay', 'mods', 'legendary', 'server', 'commands'];
  const manualCategoryOverrides = [
    [/\/mods-guides\//i, ['mods']],
    [/\/cobblesafari(?:\/|$)/i, ['mods', 'commands']],
    [/\/myths-and-legends\//i, ['legendary']],
    [/\/legendary_monuments\//i, ['legendary']],
    [/\/gen-list(?:\/|$)/i, ['legendary', 'gameplay']],
    [/\/(installation|multiplayer|settings|server)(?:\/|$)/i, ['server']],
    [/\/(commands|commandes)(?:\/|$)/i, ['commands']]
  ];

  let searchIndex = [];
  let pageMetaConfig = null;
  let activeCategory = 'all';
  let activeIndex = -1;

  function normalizeText(value = '') {
    return String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/['’]/g, ' ')
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

  function normalizePath(value = '') {
    try {
      const url = new URL(value, location.origin);
      return url.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
    } catch {
      return String(value).replace(/\.html$/i, '').replace(/\/$/, '') || '/';
    }
  }

  function unique(values = []) {
    return [...new Set(values.filter((value) => categories.includes(value) && value !== 'all'))];
  }

  function ruleMatches(rule, path) {
    try {
      return new RegExp(rule.match).test(path);
    } catch {
      return false;
    }
  }

  function configuredCategories(path) {
    const normalized = normalizePath(path);
    const pathWithoutLang = normalized.replace(/^\/fr-FR/i, '');
    if (!pageMetaConfig) return [];

    let filters = unique(pageMetaConfig.defaults?.filters || []);
    (pageMetaConfig.rules || []).forEach((rule) => {
      if (ruleMatches(rule, normalized) || ruleMatches(rule, pathWithoutLang)) {
        filters = unique(rule.filters || filters);
      }
    });

    const override = pageMetaConfig.pages?.[normalized] || pageMetaConfig.pages?.[pathWithoutLang];
    if (override?.filters) filters = unique(override.filters);
    return filters;
  }

  function categoryListForEntry(entry = {}) {
    const href = normalizePath(entry.href || '');
    const configured = configuredCategories(href);
    if (configured.length) return configured;

    const hrefWithoutLang = href.replace(/^\/fr-FR/i, '');
    for (const [pattern, categoryList] of manualCategoryOverrides) {
      if (pattern.test(hrefWithoutLang)) return categoryList;
    }

    const haystack = normalizeText(`${entry.title || ''} ${hrefWithoutLang} ${(entry.text || '').slice(0, 1200)}`);
    if (/\b(command|commands|commande|commandes|op|admin command|commande admin|arena admin|server properties)\b/.test(haystack)) return ['commands'];
    if (/\b(legendary|legendaire|mythique|mythical|myths|legends|galar|hisui|sinnoh|johto|hoenn|kalos|alola|paldea|kitakami)\b/.test(haystack)) return ['legendary'];
    if (/\b(server|serveur|multiplayer|multijoueur|hosting|sauvegarde|backup|neoforge|java)\b/.test(haystack)) return ['server'];
    if (/\b(mod|mods|addon|cobblesafari|rustling|luggage|chunky|cobbleworkers|musicinterface)\b/.test(haystack)) return ['mods'];
    return ['gameplay'];
  }

  function primaryCategory(entry = {}) {
    return categoryListForEntry(entry)[0] || 'gameplay';
  }

  function categoryLabel(category) {
    return labels[category] || labels.gameplay;
  }

  function scoreEntry(entry, query) {
    const normalizedQuery = normalizeText(query);
    if (normalizedQuery.length < 2) return 0;
    const haystack = normalizeText(`${entry.title || ''} ${entry.href || ''} ${entry.text || ''}`);
    const title = normalizeText(entry.title || '');
    const terms = normalizedQuery.split(' ').filter((term) => term.length > 1);
    let score = 0;

    if (title === normalizedQuery) score += 140;
    if (title.startsWith(normalizedQuery)) score += 80;
    if (title.includes(normalizedQuery)) score += 48;
    if (haystack.includes(normalizedQuery)) score += 22;
    terms.forEach((term) => {
      if (title.includes(term)) score += 18;
      else if (haystack.includes(term)) score += 6;
    });

    return score;
  }

  function highlightTitle(title, query) {
    const rawTerms = String(query).trim().split(/\s+/).filter((term) => term.length > 1);
    if (!rawTerms.length) return escapeHtml(title);
    const escapedTerms = rawTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return escapeHtml(title).replace(new RegExp(`(${escapedTerms.join('|')})`, 'ig'), '<mark>$1</mark>');
  }

  function entriesForCurrentQuery() {
    const query = input.value.trim();
    if (normalizeText(query).length < 2) return [];
    return searchIndex
      .filter((entry) => entry.language === language)
      .map((entry) => ({ ...entry, categories: categoryListForEntry(entry), score: scoreEntry(entry, query) }))
      .filter((entry) => entry.score >= 12)
      .sort((left, right) => right.score - left.score || String(left.title).localeCompare(String(right.title), language));
  }

  function renderFilters(matches) {
    const counts = Object.fromEntries(categories.map((category) => [category, 0]));
    counts.all = matches.length;
    matches.forEach((entry) => entry.categories.forEach((category) => {
      counts[category] = (counts[category] || 0) + 1;
    }));

    return `<div class="search-category-filters is-polished" role="toolbar" aria-label="${escapeHtml(labels.title)}"><div class="search-category-title">${escapeHtml(labels.title)}</div>${categories.map((category) => {
      const count = counts[category] || 0;
      const label = categoryLabel(category);
      const active = activeCategory === category ? ' is-active' : '';
      const empty = category !== 'all' && count === 0 ? ' is-empty' : '';
      return `<button type="button" data-search-category="${category}" class="${active}${empty}" aria-label="${escapeHtml(`${label} (${count})`)}"><span>${escapeHtml(label)}</span><small>${count}</small></button>`;
    }).join('')}</div>`;
  }

  function renderResults() {
    const query = input.value.trim();
    const matches = entriesForCurrentQuery();
    const visible = matches
      .filter((entry) => activeCategory === 'all' || entry.categories.includes(activeCategory))
      .slice(0, 10);

    activeIndex = -1;
    if (normalizeText(query).length < 2) {
      results.hidden = true;
      results.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      return;
    }

    const resultHtml = visible.length
      ? visible.map((entry, index) => {
        const category = primaryCategory(entry);
        return `<a id="smart-search-result-${index}" role="option" aria-selected="false" href="${escapeHtml(entry.href)}"><strong>${highlightTitle(entry.title, query)}</strong><span>${escapeHtml(entry.href.replace(/\.html$/i, ''))}</span><em class="search-result-category" data-category="${category}">${escapeHtml(categoryLabel(category))}</em></a>`;
      }).join('')
      : `<div class="search-empty">${escapeHtml(labels.noResults)}</div>`;

    results.innerHTML = `${renderFilters(matches)}${resultHtml}<div class="search-keyboard-help"><span><kbd>↑</kbd><kbd>↓</kbd> ${escapeHtml(labels.navigate)}</span><span><kbd>Entrée</kbd> ${escapeHtml(labels.open)}</span></div>`;
    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function setActiveResult(index) {
    const links = [...results.querySelectorAll('a[role="option"]')];
    if (!links.length) return;
    activeIndex = ((index % links.length) + links.length) % links.length;
    links.forEach((link, linkIndex) => {
      const active = linkIndex === activeIndex;
      link.classList.toggle('is-active', active);
      link.setAttribute('aria-selected', String(active));
    });
    links[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  results.addEventListener('pointerdown', (event) => {
    if (event.target.closest('[data-search-category]')) event.preventDefault();
  }, true);

  results.addEventListener('click', (event) => {
    const button = event.target.closest('[data-search-category]');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    activeCategory = button.dataset.searchCategory || 'all';
    renderResults();
    input.focus({ preventScroll: true });
  }, true);

  results.addEventListener('mouseenter', (event) => {
    const link = event.target.closest?.('a[role="option"]');
    if (!link) return;
    const links = [...results.querySelectorAll('a[role="option"]')];
    setActiveResult(links.indexOf(link));
  }, true);

  input.addEventListener('input', () => window.setTimeout(renderResults, 0), true);
  input.addEventListener('focus', () => window.setTimeout(renderResults, 0), true);
  input.addEventListener('keydown', (event) => {
    if (results.hidden) return;
    const links = [...results.querySelectorAll('a[role="option"]')];
    if (event.key === 'ArrowDown' && links.length) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setActiveResult(activeIndex + 1);
    } else if (event.key === 'ArrowUp' && links.length) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setActiveResult(activeIndex < 0 ? links.length - 1 : activeIndex - 1);
    } else if (event.key === 'Enter' && links.length) {
      event.preventDefault();
      event.stopImmediatePropagation();
      links[activeIndex >= 0 ? activeIndex : 0].click();
    }
  }, true);

  Promise.all([
    fetch('/search-index.json', { cache: 'no-store' }).then((response) => response.ok ? response.json() : []),
    fetch('/page-meta.json', { cache: 'no-store' }).then((response) => response.ok ? response.json() : null).catch(() => null)
  ]).then(([index, meta]) => {
    searchIndex = Array.isArray(index) ? index : [];
    pageMetaConfig = meta;
    renderResults();
  }).catch(() => {});
})();
