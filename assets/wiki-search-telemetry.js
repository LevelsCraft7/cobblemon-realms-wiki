(() => {
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const reported = new Set();
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

  function reportIfZero() {
    if (!privacyAllowsAnalytics() || results.hidden || !results.querySelector('.search-empty')) return;
    const query = normalize(input.value);
    if (query.length < 2) return;
    const category = activeCategory();
    const key = `${language}:${category}:${query.toLowerCase()}`;
    if (reported.has(key)) return;
    reported.add(key);

    fetch('/api/search-zero-term', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query, category, language }),
      keepalive: true,
      credentials: 'same-origin'
    }).catch(() => {});
  }

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(reportIfZero, 180);
  };

  new MutationObserver(schedule).observe(results, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden', 'class']
  });
  input.addEventListener('input', schedule, { passive: true });
})();
