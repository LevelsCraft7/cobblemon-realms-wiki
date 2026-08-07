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

  function ensureGitBookBlocks() {
    if (!document.querySelector('link[href*="/assets/gitbook-blocks.css"]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/assets/gitbook-blocks.css?v=gitbook-reference-3';
      stylesheet.dataset.gitbookBlocks = 'true';
      document.head.appendChild(stylesheet);
    }

    if (!document.querySelector('script[src*="/assets/gitbook-blocks.js"]')) {
      const script = document.createElement('script');
      script.src = '/assets/gitbook-blocks.js?v=gitbook-reference-3';
      script.async = false;
      document.head.appendChild(script);
    }
  }

  ensureGitBookBlocks();

  function installVisualFixes() {
    const style = document.createElement('style');
    style.dataset.wikiVisualFixes = 'true';
    style.textContent = `
      .brand-logo{display:none!important}
      .brand-version{display:inline-flex;align-items:center;margin-left:8px;padding:3px 7px;border:1px solid rgba(76,145,255,.4);border-radius:999px;background:rgba(76,145,255,.12);color:#8ab4ff;font-size:10px;font-weight:850;letter-spacing:.025em;line-height:1;text-transform:none;vertical-align:middle}
      html[data-theme="light"] .brand-version{border-color:rgba(40,111,219,.32);background:rgba(40,111,219,.09);color:#245fae}

      html[data-theme="light"] .discord-badge{border-color:rgba(88,101,242,.58)!important;background:linear-gradient(180deg,#f0f1ff,#e1e5ff)!important;color:#252b61!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.92),0 3px 10px rgba(68,78,170,.1)!important}
      html[data-theme="light"] .discord-badge:hover{border-color:rgba(72,84,220,.82)!important;background:linear-gradient(180deg,#e8ebff,#d8ddff)!important}
      html[data-theme="light"] .discord-badge .community-copy strong{color:#252b61!important}
      html[data-theme="light"] .discord-badge .community-copy small{color:#535b8f!important}
      html[data-theme="light"] .discord-icon{color:#5865f2!important}

      html[data-theme="light"] .curseforge-badge{border-color:rgba(225,79,35,.58)!important;background:linear-gradient(180deg,#fff4ef,#ffe4d8)!important;color:#682c1c!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.94),0 3px 10px rgba(176,65,31,.1)!important}
      html[data-theme="light"] .curseforge-badge:hover{border-color:rgba(217,69,24,.82)!important;background:linear-gradient(180deg,#ffede5,#ffd9c9)!important}
      html[data-theme="light"] .curseforge-badge .community-copy strong{color:#682c1c!important}
      html[data-theme="light"] .curseforge-badge .community-copy small{color:#875343!important}

      html[data-theme="light"] .server-badge{border-color:rgba(20,150,103,.62)!important;background:linear-gradient(180deg,#ecfcf5,#d8f6e9)!important;color:#145c43!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.94),0 3px 10px rgba(22,128,91,.1)!important}
      html[data-theme="light"] .server-badge:hover{border-color:rgba(12,132,88,.86)!important;background:linear-gradient(180deg,#e3faef,#cbf1e0)!important}
      html[data-theme="light"] .server-badge .community-copy strong{color:#145c43!important}
      html[data-theme="light"] .server-badge .community-copy small{color:#377762!important}
      html[data-theme="light"] .server-icon{border-color:rgba(20,117,84,.38)!important}
      html[data-theme="light"] .community-divider{color:#818a98!important}

      .nav-subgroup{margin:1px 0;border:0}
      .nav-subgroup>summary{display:flex;align-items:center;gap:4px;min-height:34px;padding:0 5px 0 0;border-radius:7px;list-style:none;cursor:pointer;transition:background .12s ease}
      .nav-subgroup>summary::-webkit-details-marker{display:none}
      .nav-subgroup>summary:hover{background:#272727}
      .nav-subgroup>summary>a{min-width:0;flex:1;margin:0!important;padding:7px 7px 7px calc(12px + var(--depth,0)*18px)!important;background:transparent!important;box-shadow:none!important}
      .nav-subgroup>summary>a.active{color:#66a5ff!important;box-shadow:inset 2px 0 0 var(--accent)!important}
      .nav-subgroup-chevron{width:7px;height:7px;flex:0 0 7px;margin-right:7px;transform:rotate(-45deg);border-right:1.5px solid #9f9f9f;border-bottom:1.5px solid #9f9f9f;transition:transform .16s ease}
      .nav-subgroup[open]>summary .nav-subgroup-chevron{transform:rotate(45deg)}
      .nav-subgroup>ul{margin:1px 0 3px!important;padding:0!important;list-style:none!important}
      .nav-subgroup>ul>li>a{padding-left:calc(12px + var(--depth,0)*18px)!important}
      html[data-theme="light"] .nav-subgroup>summary:hover{background:#e9edf3}
      html[data-theme="light"] .nav-subgroup-chevron{border-color:#6f7782}
    `;
    document.head.appendChild(style);

    document.querySelector('.brand-logo')?.remove();
    const brandTitle = document.querySelector('.brand-copy strong');
    if (brandTitle && !brandTitle.querySelector('.brand-version')) {
      const version = document.createElement('span');
      version.className = 'brand-version';
      version.textContent = 'v6.0+';
      brandTitle.appendChild(version);
    }
  }

  installVisualFixes();

  function installNestedNavigation() {
    const lists = [...document.querySelectorAll('#sidebar .nav-group > ul')];

    lists.forEach((list) => {
      const sourceItems = [...list.children].filter((item) => item.tagName === 'LI');
      if (sourceItems.length < 2) return;

      const nodes = sourceItems.map((item) => {
        const rawDepth = item.style.getPropertyValue('--depth');
        const depth = Number.parseInt(rawDepth || '0', 10) || 0;
        return { item, depth, children: [] };
      });

      const roots = [];
      const stack = [];

      nodes.forEach((node) => {
        while (stack.length && stack[stack.length - 1].depth >= node.depth) stack.pop();
        if (stack.length) stack[stack.length - 1].children.push(node);
        else roots.push(node);
        stack.push(node);
      });

      if (!nodes.some((node) => node.children.length)) return;

      const containsActive = (node) => {
        if (node.item.querySelector(':scope > a.active')) return true;
        return node.children.some(containsActive);
      };

      const renderNode = (node) => {
        const originalLink = node.item.querySelector(':scope > a');
        if (!node.children.length || !originalLink) {
          node.item.style.setProperty('--depth', String(node.depth));
          return node.item;
        }

        const wrapper = document.createElement('li');
        wrapper.className = 'nav-subgroup-item';
        wrapper.style.setProperty('--depth', String(node.depth));

        const details = document.createElement('details');
        details.className = 'nav-subgroup';
        details.dataset.navDepth = String(node.depth);
        if (containsActive(node)) details.open = true;

        const summary = document.createElement('summary');
        summary.style.setProperty('--depth', String(node.depth));
        summary.appendChild(originalLink);

        const chevron = document.createElement('span');
        chevron.className = 'nav-subgroup-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        summary.appendChild(chevron);

        const childList = document.createElement('ul');
        node.children.forEach((child) => childList.appendChild(renderNode(child)));

        details.append(summary, childList);
        wrapper.appendChild(details);
        return wrapper;
      };

      const fragment = document.createDocumentFragment();
      roots.forEach((node) => fragment.appendChild(renderNode(node)));
      list.replaceChildren(fragment);
    });
  }

  installNestedNavigation();

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