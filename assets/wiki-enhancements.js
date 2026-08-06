(() => {
  const root = document.documentElement;
  const language = root.lang === 'fr' ? 'fr' : 'en';
  const themeButton = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const article = document.querySelector('article');
  const toc = document.getElementById('page-toc');
  const tocNav = toc?.querySelector('nav');
  const backToTop = document.getElementById('back-to-top');
  const progress = document.querySelector('#reading-progress span');
  const themeKey = 'cobblemon-wiki-theme';

  function currentTheme() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme, persist = true) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = normalized;
    if (persist) {
      try {
        localStorage.setItem(themeKey, normalized);
      } catch {}
    }

    const light = normalized === 'light';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(light));
      themeButton.setAttribute('aria-label', light
        ? (language === 'fr' ? 'Activer le mode nuit' : 'Enable dark mode')
        : (language === 'fr' ? 'Activer le mode jour' : 'Enable light mode'));
      themeButton.title = themeButton.getAttribute('aria-label');
    }
    if (themeColor) themeColor.content = light ? '#f5f7fb' : '#191919';
  }

  applyTheme(currentTheme(), false);
  themeButton?.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  function slugify(value) {
    return value.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  }

  function buildTableOfContents() {
    if (!article || !toc || !tocNav) return;
    const headings = [...article.querySelectorAll('h2, h3')]
      .filter((heading) => !heading.closest('.hint'));

    if (headings.length < 2) {
      toc.hidden = true;
      return;
    }

    const usedIds = new Set();
    headings.forEach((heading) => {
      const base = heading.id || slugify(heading.textContent.trim());
      let id = base;
      let suffix = 2;
      while (usedIds.has(id) || (document.getElementById(id) && document.getElementById(id) !== heading)) {
        id = `${base}-${suffix++}`;
      }
      heading.id = id;
      usedIds.add(id);
    });

    tocNav.replaceChildren(...headings.map((heading) => {
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      link.className = heading.tagName === 'H3' ? 'toc-depth-3' : 'toc-depth-2';
      return link;
    }));

    const links = [...tocNav.querySelectorAll('a')];
    const byId = new Map(links.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.remove('is-active'));
      byId.get(visible.target.id)?.classList.add('is-active');
    }, { rootMargin: '-90px 0px -72% 0px', threshold: 0 });

    headings.forEach((heading) => observer.observe(heading));
  }

  buildTableOfContents();

  let ticking = false;
  function updateReadingUi() {
    ticking = false;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollable = Math.max(1, documentHeight - viewportHeight);
    const longPage = scrollable > Math.max(700, viewportHeight * 0.75);
    document.body.classList.toggle('long-article', longPage);

    if (progress) {
      const value = Math.min(1, Math.max(0, window.scrollY / scrollable));
      progress.style.transform = `scaleX(${value})`;
    }
    backToTop?.classList.toggle('is-visible', longPage && window.scrollY > 650);
  }

  function requestReadingUiUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateReadingUi);
  }

  window.addEventListener('scroll', requestReadingUiUpdate, { passive: true });
  window.addEventListener('resize', requestReadingUiUpdate);
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  updateReadingUi();
})();
