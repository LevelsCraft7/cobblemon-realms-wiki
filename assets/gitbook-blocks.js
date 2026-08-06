(() => {
  if (window.__cobblemonGitBookTabsV2) return;
  window.__cobblemonGitBookTabsV2 = true;

  function getParts(group) {
    const list = [...group.children].find((child) => child.classList?.contains('gitbook-tab-list'));
    const panelsHost = [...group.children].find((child) => child.classList?.contains('gitbook-tab-panels'));
    if (!list || !panelsHost) return null;

    const tabs = [...list.children].filter((child) => child.matches('[role="tab"]'));
    const panels = [...panelsHost.children].filter((child) => child.matches('[role="tabpanel"]'));
    if (!tabs.length || tabs.length !== panels.length) return null;
    return { tabs, panels };
  }

  function activate(group, index, focus = false) {
    const parts = getParts(group);
    if (!parts) return;

    const safeIndex = Math.max(0, Math.min(index, parts.tabs.length - 1));
    parts.tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === safeIndex;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    parts.panels.forEach((panel, panelIndex) => {
      const active = panelIndex === safeIndex;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
      panel.setAttribute('aria-hidden', String(!active));
    });

    group.dataset.activeTab = String(safeIndex);
    if (focus) parts.tabs[safeIndex]?.focus();
    window.dispatchEvent(new Event('resize'));
  }

  function cleanTableOfContents() {
    const toc = document.getElementById('page-toc');
    const tocNav = toc?.querySelector('nav');
    if (!toc || !tocNav) return;

    const tabHeadingIds = new Set(
      [...document.querySelectorAll('.gitbook-tab-panel h2[id], .gitbook-tab-panel h3[id]')]
        .map((heading) => heading.id)
    );

    [...tocNav.querySelectorAll('a[href^="#"]')].forEach((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      if (tabHeadingIds.has(id)) link.remove();
    });

    if (tocNav.querySelectorAll('a').length < 2) toc.hidden = true;
  }

  function initializeGroup(group) {
    if (group.dataset.tabsReady === 'true') return;
    const parts = getParts(group);
    if (!parts) return;

    group.dataset.tabsReady = 'true';
    parts.tabs.forEach((tab, index) => {
      tab.dataset.tabIndex = String(index);
    });

    const selected = parts.tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    activate(group, selected >= 0 ? selected : 0);
  }

  function initializeAll() {
    document.querySelectorAll('[data-gitbook-tabs]').forEach(initializeGroup);
    cleanTableOfContents();
  }

  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-gitbook-tabs] [role="tab"]');
    if (!tab) return;
    const group = tab.closest('[data-gitbook-tabs]');
    if (!group) return;
    event.preventDefault();
    activate(group, Number(tab.dataset.tabIndex || 0));
  });

  document.addEventListener('keydown', (event) => {
    const tab = event.target.closest('[data-gitbook-tabs] [role="tab"]');
    if (!tab) return;
    const group = tab.closest('[data-gitbook-tabs]');
    const parts = group ? getParts(group) : null;
    if (!group || !parts) return;

    const current = Number(tab.dataset.tabIndex || 0);
    let next = null;
    if (event.key === 'ArrowRight') next = (current + 1) % parts.tabs.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + parts.tabs.length) % parts.tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = parts.tabs.length - 1;
    if (next === null) return;

    event.preventDefault();
    activate(group, next, true);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll, { once: true });
  } else {
    initializeAll();
  }
})();
