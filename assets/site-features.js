(() => {
  const root = document.documentElement;
  const language = root.lang === 'fr' ? 'fr' : 'en';
  const isFrench = language === 'fr';
  const input = document.getElementById('search');
  const results = document.getElementById('search-results');
  const analyticsEndpoint = '/api/analytics';
  let searchIndex = [];
  let activeSearchIndex = -1;
  const reportedZeroSearches = new Set();

  const labels = {
    copy: isFrench ? 'Copier' : 'Copy',
    copied: isFrench ? 'Copié' : 'Copied',
    copyCommand: isFrench ? 'Copier la commande' : 'Copy command',
    onThisPage: isFrench ? 'Sur cette page' : 'On this page',
    navigate: isFrench ? 'Naviguer' : 'Navigate',
    open: isFrench ? 'Ouvrir' : 'Open',
    noResults: isFrench ? 'Aucun résultat' : 'No results',
    previous: isFrench ? 'Page précédente' : 'Previous page',
    next: isFrench ? 'Page suivante' : 'Next page',
    client: 'Client',
    server: isFrench ? 'Serveur' : 'Server',
    admin: isFrench ? 'Admin requis' : 'Admin required',
    beginner: isFrench ? 'Débutant' : 'Beginner',
    advanced: isFrench ? 'Avancé' : 'Advanced'
  };

  const synonymGroups = [
    ['installation', 'installer', 'install', 'setup', 'configuration'],
    ['server', 'serveur', 'multiplayer', 'multijoueur', 'hosting', 'hebergement'],
    ['legendary', 'legendaire', 'legendaire', 'mythical', 'mythique', 'myths', 'legends'],
    ['pokemon', 'pokémon', 'creature', 'mob'],
    ['spawn', 'spawns', 'apparition', 'apparitions', 'encounter', 'rencontre'],
    ['quest', 'quests', 'quete', 'quetes', 'mission'],
    ['mount', 'riding', 'monture', 'rideable'],
    ['bug', 'issue', 'report', 'signaler', 'probleme', 'problem', 'support'],
    ['performance', 'optimize', 'optimisation', 'lag', 'fps'],
    ['dimension', 'world', 'monde', 'realm'],
    ['item', 'items', 'objet', 'objets'],
    ['form', 'forms', 'forme', 'formes', 'appearance', 'apparence'],
    ['starter', 'starters', 'depart', 'départ'],
    ['version', 'versions', 'changelog', 'history', 'historique', 'update', 'mise', 'jour'],
    ['discord', 'community', 'communaute', 'communauté'],
    ['curseforge', 'launcher', 'client']
  ];

  const synonymLookup = new Map();
  synonymGroups.forEach((group) => {
    const normalizedGroup = [...new Set(group.map(normalizeText).filter(Boolean))];
    normalizedGroup.forEach((term) => synonymLookup.set(term, normalizedGroup));
  });

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

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[character]));
  }

  function editDistance(left, right) {
    if (left === right) return 0;
    if (!left.length) return right.length;
    if (!right.length) return left.length;

    const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
    const current = new Array(right.length + 1);

    for (let row = 1; row <= left.length; row += 1) {
      current[0] = row;
      for (let column = 1; column <= right.length; column += 1) {
        const substitution = left[row - 1] === right[column - 1] ? 0 : 1;
        current[column] = Math.min(
          current[column - 1] + 1,
          previous[column] + 1,
          previous[column - 1] + substitution
        );
      }
      for (let column = 0; column <= right.length; column += 1) previous[column] = current[column];
    }

    return previous[right.length];
  }

  function expandedTerms(query) {
    const baseTerms = normalizeText(query).split(' ').filter((term) => term.length > 1);
    const expanded = new Set(baseTerms);
    baseTerms.forEach((term) => {
      synonymLookup.get(term)?.forEach((synonym) => expanded.add(synonym));
    });
    return [...expanded];
  }

  function scoreEntry(entry, query) {
    const normalizedQuery = normalizeText(query);
    const normalizedTitle = normalizeText(entry.title);
    const normalizedText = normalizeText(entry.text);
    const titleWords = normalizedTitle.split(' ').filter(Boolean);
    const contentWords = normalizedText.split(' ').filter(Boolean);
    const terms = expandedTerms(query);
    let score = 0;

    if (normalizedTitle === normalizedQuery) score += 260;
    if (normalizedTitle.startsWith(normalizedQuery)) score += 150;
    if (normalizedTitle.includes(normalizedQuery)) score += 100;
    if (normalizedText.includes(normalizedQuery)) score += 28;

    terms.forEach((term) => {
      if (normalizedTitle.includes(term)) score += 42;
      else if (normalizedText.includes(term)) score += 9;

      const candidateWords = titleWords.length ? titleWords : contentWords.slice(0, 180);
      const fuzzyMatch = candidateWords.some((word) => {
        if (Math.abs(word.length - term.length) > 2) return false;
        const threshold = term.length >= 7 ? 2 : 1;
        return editDistance(word, term) <= threshold;
      });
      if (fuzzyMatch) score += 20;
    });

    return score;
  }

  function highlightTitle(title, query) {
    const rawTerms = String(query).trim().split(/\s+/).filter((term) => term.length > 1);
    if (!rawTerms.length) return escapeHtml(title);
    const escapedTerms = rawTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'ig');
    return escapeHtml(title).replace(pattern, '<mark>$1</mark>');
  }

  function classifySearchTopic(query) {
    const normalized = normalizeText(query);
    const topics = [
      ['installation', ['install', 'setup', 'curseforge', 'launcher', 'java']],
      ['server', ['server', 'serveur', 'multiplayer', 'multijoueur', 'hosting']],
      ['pokemon', ['pokemon', 'legend', 'myth', 'spawn', 'apparition', 'starter']],
      ['gameplay', ['quest', 'quete', 'mount', 'monture', 'item', 'objet', 'form', 'forme']],
      ['performance', ['performance', 'optimize', 'optimisation', 'lag', 'fps']],
      ['support', ['bug', 'issue', 'report', 'support', 'probleme']],
      ['version', ['version', 'changelog', 'historique', 'history', 'update']]
    ];
    return topics.find(([, terms]) => terms.some((term) => normalized.includes(term)))?.[0] || 'other';
  }

  function privacyAllowsAnalytics() {
    if (location.hostname !== 'wiki.cobblemon-realms.com') return false;
    if (navigator.globalPrivacyControl === true) return false;
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;
    return true;
  }

  function sendAnalytics(event, detail = '') {
    if (!privacyAllowsAnalytics()) return;
    const payload = JSON.stringify({
      event,
      path: location.pathname.slice(0, 180),
      detail: String(detail).slice(0, 48),
      language
    });

    try {
      if (navigator.sendBeacon) {
        const body = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(analyticsEndpoint, body);
        return;
      }
      fetch(analyticsEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
        keepalive: true,
        credentials: 'same-origin'
      }).catch(() => {});
    } catch {}
  }

  function isCommandBlock(code) {
    const className = code.className || '';
    if (/language-(bash|shell|sh|console|powershell|ps1|cmd|batch)/i.test(className)) return true;

    const lines = code.textContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) return false;
    const commandPattern = /^(\/|\.\/|\.\\|chmod\s|java\s|npm\s|pnpm\s|yarn\s|git\s|docker(?:-compose)?\s|cd\s|mkdir\s|cp\s|mv\s|rm\s|powershell\s|cmd\s|bash\s|sh\s)/i;
    return lines.every((line) => commandPattern.test(line) || line.startsWith('#'));
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  function installCommandCopyButtons() {
    document.querySelectorAll('article pre > code').forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.dataset.commandCopyReady === 'true' || !isCommandBlock(code)) return;

      pre.dataset.commandCopyReady = 'true';
      pre.classList.add('command-block');

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'command-copy-button';
      button.setAttribute('aria-label', labels.copyCommand);
      button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg><span>${labels.copy}</span>`;

      button.addEventListener('click', async () => {
        try {
          await copyText(code.textContent.replace(/\n$/, ''));
          button.classList.add('is-copied');
          button.querySelector('span').textContent = labels.copied;
          window.setTimeout(() => {
            button.classList.remove('is-copied');
            button.querySelector('span').textContent = labels.copy;
          }, 1500);
        } catch (error) {
          console.error('Unable to copy command:', error);
        }
      });

      pre.appendChild(button);
    });
  }

  function slugify(value) {
    return normalizeText(value).replace(/\s+/g, '-') || 'section';
  }

  function installMobileTableOfContents() {
    const article = document.querySelector('article');
    if (!article || article.querySelector('.mobile-toc')) return;

    const headings = [...article.querySelectorAll('h2, h3')]
      .filter((heading) => !heading.closest('.hint, .gitbook-tab-panel, .mobile-toc'));
    if (headings.length < 2) return;

    const usedIds = new Set([...document.querySelectorAll('[id]')].map((element) => element.id));
    headings.forEach((heading) => {
      if (heading.id) return;
      const base = slugify(heading.textContent.trim());
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      heading.id = id;
      usedIds.add(id);
    });

    const details = document.createElement('details');
    details.className = 'mobile-toc';
    details.innerHTML = `<summary><span>${labels.onThisPage}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 10 5 5 5-5"></path></svg></summary><nav>${headings.map((heading) => `<a class="${heading.tagName === 'H3' ? 'mobile-toc-depth-3' : 'mobile-toc-depth-2'}" href="#${heading.id}">${escapeHtml(heading.textContent.trim())}</a>`).join('')}</nav>`;

    details.addEventListener('click', (event) => {
      if (event.target.closest('a')) details.open = false;
    });

    const firstHeading = article.querySelector('h1');
    if (firstHeading?.nextSibling) firstHeading.parentNode.insertBefore(details, firstHeading.nextSibling);
    else article.prepend(details);
  }

  function normalizePath(value) {
    try {
      const url = new URL(value, location.origin);
      return url.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
    } catch {
      return '/';
    }
  }

  function installArticlePagination() {
    const article = document.querySelector('article');
    const sidebar = document.querySelector('#sidebar .sidebar-navigation');
    if (!article || !sidebar || article.querySelector('.article-pagination')) return;

    const links = [...sidebar.querySelectorAll('a[href]')]
      .filter((link) => new URL(link.href, location.origin).origin === location.origin);
    if (!links.length) return;

    const activeIndex = links.findIndex((link) => link.classList.contains('active') || link.getAttribute('aria-current') === 'page' || normalizePath(link.href) === normalizePath(location.href));
    if (activeIndex < 0) return;

    const previous = links[activeIndex - 1] || null;
    const next = links[activeIndex + 1] || null;
    if (!previous && !next) return;

    const navigation = document.createElement('nav');
    navigation.className = 'article-pagination';
    navigation.setAttribute('aria-label', isFrench ? 'Navigation entre les pages' : 'Page navigation');

    const card = (link, direction) => {
      if (!link) return '<span class="article-pagination-empty" aria-hidden="true"></span>';
      const label = direction === 'previous' ? labels.previous : labels.next;
      const arrow = direction === 'previous' ? '←' : '→';
      const title = escapeHtml(link.textContent.trim());
      return `<a class="article-pagination-link is-${direction}" href="${escapeHtml(link.getAttribute('href'))}"><small>${direction === 'previous' ? `${arrow} ${label}` : `${label} ${arrow}`}</small><strong>${title}</strong></a>`;
    };

    navigation.innerHTML = `${card(previous, 'previous')}${card(next, 'next')}`;
    const meta = article.querySelector('.article-meta');
    if (meta) article.insertBefore(navigation, meta);
    else article.appendChild(navigation);
  }

  function installTechnicalBadges() {
    const article = document.querySelector('article');
    const heading = article?.querySelector(':scope > h1');
    if (!article || !heading || article.querySelector('.technical-badges')) return;

    const pagePath = normalizePath(location.pathname).replace(/^\/fr-FR/i, '') || '/';
    if (/\/(report-a-bug|version-history)$/.test(pagePath) || pagePath === '/') return;

    const text = normalizeText(article.textContent);
    const badges = [{ label: 'v6.0+', type: 'version' }];
    const serverPage = /server|multiplayer|installation|settings/.test(pagePath) || (text.match(/\b(server|serveur|multiplayer|multijoueur)\b/g) || []).length >= 4;
    const serverOnly = /multiplayer-servers/.test(pagePath);
    const adminPage = /settings|multiplayer-servers|biome-tags-reference/.test(pagePath) || /server properties|administrateur|administrator|operator|commande admin|admin command/.test(text);
    const beginnerPage = /\/(installation|getting-started|faq|contributing)$/.test(pagePath);
    const advancedPage = /settings|biome-tags-reference|multiplayer-servers/.test(pagePath);

    if (!serverOnly || /installation/.test(pagePath)) badges.push({ label: labels.client, type: 'client' });
    if (serverPage) badges.push({ label: labels.server, type: 'server' });
    if (adminPage) badges.push({ label: labels.admin, type: 'admin' });
    if (beginnerPage) badges.push({ label: labels.beginner, type: 'beginner' });
    else if (advancedPage) badges.push({ label: labels.advanced, type: 'advanced' });

    const container = document.createElement('div');
    container.className = 'technical-badges';
    container.setAttribute('aria-label', isFrench ? 'Informations techniques du guide' : 'Guide technical information');
    container.innerHTML = badges.map((badge) => `<span class="technical-badge is-${badge.type}">${escapeHtml(badge.label)}</span>`).join('');
    heading.insertAdjacentElement('afterend', container);
  }

  function closeSmartSearch() {
    if (!results || !input) return;
    results.hidden = true;
    results.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    activeSearchIndex = -1;
  }

  function setActiveSearchResult(index) {
    if (!results || !input) return;
    const links = [...results.querySelectorAll('a[role="option"]')];
    if (!links.length) return;

    activeSearchIndex = ((index % links.length) + links.length) % links.length;
    links.forEach((link, linkIndex) => {
      const active = linkIndex === activeSearchIndex;
      link.classList.toggle('is-active', active);
      link.setAttribute('aria-selected', String(active));
    });

    const current = links[activeSearchIndex];
    input.setAttribute('aria-activedescendant', current.id);
    current.scrollIntoView({ block: 'nearest' });
  }

  function renderSmartSearch() {
    if (!input || !results) return;
    const query = input.value.trim();
    const normalizedQuery = normalizeText(query);
    if (normalizedQuery.length < 2) {
      closeSmartSearch();
      return;
    }

    const matches = searchIndex
      .filter((entry) => entry.language === language)
      .map((entry) => ({ ...entry, score: scoreEntry(entry, query) }))
      .filter((entry) => entry.score >= 18)
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, language))
      .slice(0, 10);

    activeSearchIndex = -1;
    if (!matches.length) {
      results.innerHTML = `<div class="search-empty">${labels.noResults}</div>`;
      const zeroKey = `${language}:${normalizedQuery}`;
      if (!reportedZeroSearches.has(zeroKey)) {
        reportedZeroSearches.add(zeroKey);
        sendAnalytics('search_zero', classifySearchTopic(query));
      }
    } else {
      results.innerHTML = `${matches.map((entry, index) => `<a id="smart-search-result-${index}" role="option" aria-selected="false" href="${escapeHtml(entry.href)}"><strong>${highlightTitle(entry.title, query)}</strong><span>${escapeHtml(entry.href.replace(/\.html$/i, ''))}</span></a>`).join('')}<div class="search-keyboard-help"><span><kbd>↑</kbd><kbd>↓</kbd> ${labels.navigate}</span><span><kbd>Entrée</kbd> ${labels.open}</span></div>`;
      results.querySelectorAll('a[role="option"]').forEach((link, index) => {
        link.addEventListener('mouseenter', () => setActiveSearchResult(index));
      });
    }

    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function installSmartSearch() {
    if (!input || !results) return;

    fetch('/search-index.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`Search index HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        searchIndex = Array.isArray(data) ? data : [];
        if (document.activeElement === input) renderSmartSearch();
      })
      .catch((error) => console.error('Smart wiki search unavailable:', error));

    input.addEventListener('input', (event) => {
      event.stopImmediatePropagation();
      renderSmartSearch();
    }, { capture: true });

    input.addEventListener('focus', (event) => {
      event.stopImmediatePropagation();
      renderSmartSearch();
    }, { capture: true });

    input.addEventListener('keydown', (event) => {
      if (results.hidden) return;
      const links = [...results.querySelectorAll('a[role="option"]')];
      if (event.key === 'ArrowDown' && links.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setActiveSearchResult(activeSearchIndex + 1);
      } else if (event.key === 'ArrowUp' && links.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setActiveSearchResult(activeSearchIndex < 0 ? links.length - 1 : activeSearchIndex - 1);
      } else if (event.key === 'Enter' && links.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        links[activeSearchIndex >= 0 ? activeSearchIndex : 0].click();
      }
    }, { capture: true });
  }

  function installAnalytics() {
    if (!privacyAllowsAnalytics()) return;
    sendAnalytics(document.body.classList.contains('not-found-page') ? 'not_found' : 'pageview');

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;
      let url;
      try {
        url = new URL(link.href, location.origin);
      } catch {
        return;
      }
      if (url.origin === location.origin) return;

      const hostname = url.hostname.toLowerCase();
      let destination = 'external';
      if (hostname.includes('curseforge.com')) destination = 'curseforge';
      else if (hostname.includes('discord.com') || hostname === 'discord.gg') destination = 'discord';
      else if (hostname.includes('github.com')) destination = 'github';
      else if (hostname.includes('bisecthosting.com')) destination = 'bisecthosting';
      else if (hostname.includes('gitbook.io')) destination = 'gitbook';
      sendAnalytics('outbound', destination);
    }, { capture: true });
  }

  function initialize() {
    installCommandCopyButtons();
    installMobileTableOfContents();
    installArticlePagination();
    installTechnicalBadges();
    installSmartSearch();
    installAnalytics();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
