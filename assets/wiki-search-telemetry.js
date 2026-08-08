(() => {
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const reportedZero = new Set();
  const reportedSearches = new Set();
  const reportedClicks = new Set();
  let timer = 0;

  function privacyAllowsAnalytics() {
    if (location.hostname !== 'wiki.cobblemon-realms.com') return false;
    if (navigator.globalPrivacyControl === true) return false;
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;
    return true;
  }

  function normalize(value = '') {
    return String(value).replace(/\s+/g, ' ').trim().slice(0, 120);
  }

  function activeCategory() {
    const selected = results.querySelector('[data-search-category].is-active');
    return selected?.dataset.searchCategory || 'other';
  }

  function hasResults() {
    if (results.hidden || results.querySelector('.search-empty')) return false;
    return Boolean(results.querySelector('a[href]'));
  }

  function send(endpoint, payload) {
    if (!privacyAllowsAnalytics()) return;
    const body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
        return;
      }
      fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'same-origin'
      }).catch(() => {});
    } catch {}
  }

  function reportStableSearch() {
    if (!privacyAllowsAnalytics() || results.hidden) return;
    const query = normalize(input.value);
    if (query.length < 2) return;
    const category = activeCategory();
    const normalizedQuery = query.toLowerCase();
    const key = `${language}:${category}:${normalizedQuery}`;

    if (!hasResults()) {
      if (!results.querySelector('.search-empty') || reportedZero.has(key)) return;
      reportedZero.add(key);
      send('/api/search-zero-term', { query, category, language });
      send('/api/search-query-event', { query, category, language, event: 'zero' });
      return;
    }

    if (reportedSearches.has(key)) return;
    reportedSearches.add(key);
    send('/api/search-query-event', { query, category, language, event: 'search' });
  }

  function schedule(delay = 900) {
    window.clearTimeout(timer);
    timer = window.setTimeout(reportStableSearch, delay);
  }

  results.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !results.contains(link) || !privacyAllowsAnalytics()) return;
    const query = normalize(input.value);
    if (query.length < 2) return;
    const category = activeCategory();
    const queryKey = `${language}:${category}:${query.toLowerCase()}`;
    const clickKey = `${queryKey}:${link.getAttribute('href') || ''}`;

    if (!reportedSearches.has(queryKey)) {
      reportedSearches.add(queryKey);
      send('/api/search-query-event', { query, category, language, event: 'search' });
    }
    if (reportedClicks.has(clickKey)) return;
    reportedClicks.add(clickKey);
    send('/api/search-query-event', { query, category, language, event: 'click' });
  }, true);

  new MutationObserver(() => schedule()).observe(results, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden', 'class']
  });
  input.addEventListener('input', () => schedule(), { passive: true });
  input.addEventListener('blur', () => schedule(120), { passive: true });
})();
