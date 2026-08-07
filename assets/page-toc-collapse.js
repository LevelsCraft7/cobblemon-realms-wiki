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

    const sections = [];
    links.forEach((link) => {
      const isChild = link.classList.contains('toc-depth-3');
      if (!isChild) {
        sections.push({ parent: link, children: [] });
        return;
      }

      const current = sections[sections.length - 1];
      if (current) current.children.push(link);
      else sections.push({ parent: null, children: [link] });
    });

    const fragment = document.createDocumentFragment();
    sections.forEach((section) => {
      if (!section.parent) {
        section.children.forEach((child) => fragment.appendChild(child));
        return;
      }

      if (!section.children.length) {
        fragment.appendChild(section.parent);
        return;
      }

      const wrapper = document.createElement('details');
      wrapper.className = 'page-toc-group';

      const summary = document.createElement('summary');
      summary.className = 'page-toc-group-summary';
      summary.appendChild(section.parent);

      const chevron = document.createElement('span');
      chevron.className = 'page-toc-group-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      summary.appendChild(chevron);

      const childList = document.createElement('div');
      childList.className = 'page-toc-children';
      section.children.forEach((child) => childList.appendChild(child));

      wrapper.append(summary, childList);
      wrapper.querySelector(':scope > summary > a')?.addEventListener('click', () => {
        wrapper.open = true;
      });

      fragment.appendChild(wrapper);
    });

    tocNav.replaceChildren(fragment);
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
