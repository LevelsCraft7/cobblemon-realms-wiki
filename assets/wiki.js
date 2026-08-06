(() => {
  const menu = document.getElementById('menu');
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');
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
    if (results.hidden) return;
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
})();
