(() => {
  function cleanTableOfContents() {
    const toc = document.getElementById('page-toc');
    const tocNav = toc?.querySelector('nav');
    if (!toc || !tocNav) return;

    const hiddenHeadingIds = new Set(
      [...document.querySelectorAll('.gitbook-tab-panel h2[id], .gitbook-tab-panel h3[id]')]
        .map((heading) => heading.id)
    );

    [...tocNav.querySelectorAll('a[href^="#"]')].forEach((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      if (hiddenHeadingIds.has(id)) link.remove();
    });

    if (tocNav.querySelectorAll('a').length < 2) toc.hidden = true;
  }

  function initializeGitBookTabs() {
    document.querySelectorAll('[data-gitbook-tabs]').forEach((group) => {
      const tabs = [...group.querySelectorAll(':scope > .gitbook-tab-list > [role="tab"]')];
      const panels = [...group.querySelectorAll(':scope > .gitbook-tab-panels > [role="tabpanel"]')];
      if (!tabs.length || tabs.length !== panels.length) return;

      const activate = (index, focus = false) => {
        tabs.forEach((tab, tabIndex) => {
          const active = tabIndex === index;
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
        });

        panels.forEach((panel, panelIndex) => {
          const active = panelIndex === index;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
        });

        if (focus) tabs[index]?.focus();
        window.dispatchEvent(new Event('resize'));
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(index));
        tab.addEventListener('keydown', (event) => {
          let next = null;
          if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = tabs.length - 1;
          if (next === null) return;
          event.preventDefault();
          activate(next, true);
        });
      });
    });

    cleanTableOfContents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGitBookTabs, { once: true });
  } else {
    initializeGitBookTabs();
  }
})();