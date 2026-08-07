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
    commands: isFrench ? 'Commandes' : 'Commands'
  };

  const categories = ['all', 'gameplay', 'mods', 'legendary', 'server', 'commands'];
  let searchIndex = [];

  const manualCategoryOverrides = [
    [/\/mods-guides\//i, 'mods'],
    [/\/cobblesafari(?:\/|$)/i, 'mods'],
    [/\/myths-and-legends\//i, 'legendary'],
    [/\/legendary_monuments\//i, 'legendary'],
    [/\/gen-list(?:\/|$)/i, 'legendary'],
    [/\/(installation|multiplayer|settings|server)(?:\/|$)/i, 'server'],
    [/\/(commands|commandes)(?:\/|$)/i, 'commands']
  ];

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

  function normalizePath(value = '') {
    try {
      const url = new URL(value, location.origin);
      return url.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
    } catch {
      return String(value).replace(/\.html$/i, '').replace(/\/$/, '') || '/';
    }
  }

  function categoryForEntry(entry = {}) {
    const href = normalizePath(entry.href || '');
    const hrefWithoutLang = href.replace(/^\/fr-FR/i, '');
    for (const [pattern, category] of manualCategoryOverrides) {
      if (pattern.test(hrefWithoutLang)) return category;
    }

    const haystack = normalizeText(`${entry.title || ''} ${hrefWithoutLang} ${(entry.text || '').slice(0, 1200)}`);
    if (/\b(command|commands|commande|commandes|op|admin command|commande admin|arena admin|server properties)\b/.test(haystack)) return 'commands';
    if (/\b(legendary|legendaire|mythique|mythical|myths|legends|galar|hisui|sinnoh|johto|hoenn|kalos|alola|paldea|kitakami)\b/.test(haystack)) return 'legendary';
    if (/\b(server|serveur|multiplayer|multijoueur|hosting|sauvegarde|backup|neoforge|java)\b/.test(haystack)) return 'server';
    if (/\b(mod|mods|addon|cobblesafari|rustling|luggage|chunky|cobbleworkers|musicinterface)\b/.test(haystack)) return 'mods';
    return 'gameplay';
  }

  function scoreEntry(entry, query) {
    const normalizedQuery = normalizeText(query);
    if (normalizedQuery.length < 2) return 0;
    const haystack = normalizeText(`${entry.title || ''} ${entry.href || ''} ${entry.text || ''}`);
    const title = normalizeText(entry.title || '');
    const terms = normalizedQuery.split(' ').filter((term) => term.length > 1);
    let score = 0;

    if (title === normalizedQuery) score += 120;
    if (title.startsWith(normalizedQuery)) score += 70;
    if (title.includes(normalizedQuery)) score += 45;
    if (haystack.includes(normalizedQuery)) score += 20;
    terms.forEach((term) => {
      if (title.includes(term)) score += 18;
      else if (haystack.includes(term)) score += 6;
    });

    return score;
  }

  function entriesForCurrentQuery() {
    const query = input.value.trim();
    if (normalizeText(query).length < 2) return [];
    return searchIndex
      .filter((entry) => entry.language === language)
      .map((entry) => ({ ...entry, category: categoryForEntry(entry), score: scoreEntry(entry, query) }))
      .filter((entry) => entry.score >= 12)
      .sort((left, right) => right.score - left.score || String(left.title).localeCompare(String(right.title), language));
  }

  function visibleCategory() {
    return results.querySelector('[data-search-category].is-active')?.dataset.searchCategory || 'all';
  }

  function categoryLabel(category) {
    return labels[category] || labels.gameplay;
  }

  function entryForResultLink(link) {
    const href = normalizePath(link.getAttribute('href') || '');
    return searchIndex.find((entry) => normalizePath(entry.href) === href)
      || { href, title: link.querySelector('strong')?.textContent.trim() || link.textContent.trim(), text: '' };
  }

  function decorateFilterButtons() {
    const filter = results.querySelector('.search-category-filters');
    if (!filter) return;

    if (!filter.querySelector('.search-category-title')) {
      const title = document.createElement('div');
      title.className = 'search-category-title';
      title.textContent = labels.title;
      filter.prepend(title);
    }

    const matches = entriesForCurrentQuery();
    const counts = Object.fromEntries(categories.map((category) => [category, 0]));
    counts.all = matches.length;
    matches.forEach((entry) => {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    });

    filter.querySelectorAll('[data-search-category]').forEach((button) => {
      const category = button.dataset.searchCategory || 'all';
      const count = counts[category] || 0;
      const baseLabel = categoryLabel(category);
      button.innerHTML = `<span>${baseLabel}</span><small>${count}</small>`;
      button.classList.toggle('is-empty', category !== 'all' && count === 0);
      button.setAttribute('aria-label', `${baseLabel} (${count})`);
      button.type = 'button';
    });
  }

  function decorateResultLinks() {
    results.querySelectorAll('a[role="option"]').forEach((link) => {
      const entry = entryForResultLink(link);
      const category = categoryForEntry(entry);
      let badge = link.querySelector('.search-result-category');
      if (!badge) {
        badge = document.createElement('em');
        badge.className = 'search-result-category';
        link.appendChild(badge);
      }
      badge.textContent = categoryLabel(category);
      badge.dataset.category = category;
    });
  }

  function decorateSearch() {
    if (results.hidden) return;
    decorateFilterButtons();
    decorateResultLinks();
  }

  function keepSearchOpenOnFilterUse() {
    const keepFocus = (event) => {
      if (event.target.closest('[data-search-category]')) event.preventDefault();
    };

    const stopOutsideClosers = (event) => {
      if (!event.target.closest('[data-search-category]')) return;
      event.stopPropagation();
      window.requestAnimationFrame(() => {
        input.focus({ preventScroll: true });
        results.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        decorateSearch();
      });
    };

    results.addEventListener('pointerdown', keepFocus, true);
    results.addEventListener('mousedown', keepFocus, true);
    results.addEventListener('click', stopOutsideClosers);
  }

  const observer = new MutationObserver(() => decorateSearch());
  observer.observe(results, { childList: true, subtree: true });

  fetch('/search-index.json', { cache: 'no-store' })
    .then((response) => response.ok ? response.json() : [])
    .then((data) => {
      searchIndex = Array.isArray(data) ? data : [];
      decorateSearch();
    })
    .catch(() => {});

  keepSearchOpenOnFilterUse();
  input.addEventListener('input', () => window.requestAnimationFrame(decorateSearch));
  input.addEventListener('focus', () => window.requestAnimationFrame(decorateSearch));
})();
