(() => {
  const toc = document.getElementById('page-toc');
  const tocNav = toc?.querySelector('nav');
  if (!toc || !tocNav) return;

  function currentHashId() {
    try {
      return decodeURIComponent(location.hash.replace(/^#/, ''));
    } catch {
      return location.hash.replace(/^#/, '');
    }
  }

  function normalizeHash(link) {
    try {
      return decodeURIComponent(link.hash.replace(/^#/, ''));
    } catch {
      return link.hash.replace(/^#/, '');
    }
  }

  function buildGroups() {
    if (tocNav.dataset.collapsibleReady === 'true') return;

    const links = [...tocNav.querySelectorAll(':scope > a')];
    if (links.length < 6 || !links.some((link) => link.classList.contains('toc-depth-3'))) return;

    const fragment = document.createDocumentFragment();
    let currentGroup = null;
    let currentList = null;

    links.forEach((link) => {
      const isChild = link.classList.contains('toc-depth-3');
      if (!isChild) {
        const wrapper = document.createElement('details');
        wrapper.className = 'page-toc-group';

        const summary = document.createElement('summary');
        summary.className = 'page-toc-group-summary';
        summary.appendChild(link);

        const chevron = document.createElement('span');
        chevron.className = 'page-toc-group-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        summary.appendChild(chevron);

        currentList = document.createElement('div');
        currentList.className = 'page-toc-children';
        wrapper.append(summary, currentList);
        fragment.appendChild(wrapper);
        currentGroup = wrapper;
        return;
      }

      if (!currentGroup || !currentList) {
        fragment.appendChild(link);
        return;
      }

      currentList.appendChild(link);
    });

    tocNav.replaceChildren(fragment);

    tocNav.querySelectorAll('.page-toc-group').forEach((group) => {
      const children = group.querySelector('.page-toc-children');
      if (!children || !children.children.length) {
        const link = group.querySelector(':scope > summary > a');
        if (link) fragment.appendChild(link);
      }

      group.querySelector(':scope > summary > a')?.addEventListener('click', () => {
        group.open = true;
      });
    });

    tocNav.dataset.collapsibleReady = 'true';
    syncOpenGroup();
  }

  function syncOpenGroup() {
    const activeLink = tocNav.querySelector('a.is-active')
      || (currentHashId() ? [...tocNav.querySelectorAll('a[href^="#"]')].find((link) => normalizeHash(link) === currentHashId()) : null);

    if (!activeLink) return;
    const group = activeLink.closest('.page-toc-group');
    if (group) group.open = true;
  }

  function start() {
    buildGroups();
    const observer = new MutationObserver(() => {
      if (tocNav.dataset.collapsibleReady !== 'true') buildGroups();
      syncOpenGroup();
    });
    observer.observe(tocNav, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    window.addEventListener('hashchange', syncOpenGroup);
    window.addEventListener('scroll', syncOpenGroup, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.requestAnimationFrame(start), { once: true });
  } else {
    window.requestAnimationFrame(start);
  }
})();
