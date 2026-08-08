(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const article = document.querySelector('article');
  const heading = article?.querySelector(':scope > h1');
  if (!article || !heading) return;

  function normalizePath(value = location.pathname) {
    try {
      const url = new URL(value, location.origin);
      return url.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
    } catch {
      return '/';
    }
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

  function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
  }

  function ruleMatches(rule, path) {
    try {
      return new RegExp(rule.match).test(path);
    } catch {
      return false;
    }
  }

  function resolveMeta(config, path) {
    const defaults = config.defaults || {};
    let result = {
      status: defaults.status || 'unknown',
      statusSource: 'default',
      badges: [...(defaults.badges || [])],
      filters: [...(defaults.filters || [])]
    };

    (config.rules || []).forEach((rule) => {
      if (!ruleMatches(rule, path)) return;
      result = {
        status: rule.status || result.status,
        statusSource: rule.status ? 'rule' : result.statusSource,
        badges: unique([...(rule.badges || result.badges)]),
        filters: unique([...(rule.filters || result.filters)])
      };
    });

    const override = config.pages?.[path] || config.pages?.[path.replace(/^\/fr-FR/i, '')];
    if (override) {
      result = {
        status: override.status || result.status,
        statusSource: override.status ? (override.source === 'd1' ? 'admin' : 'page') : result.statusSource,
        badges: unique(override.badges || result.badges),
        filters: unique(override.filters || result.filters)
      };
    }

    return result;
  }

  function labelFor(config, type, key) {
    return config.labels?.[language]?.[type]?.[key]
      || config.labels?.en?.[type]?.[key]
      || key;
  }

  function render(config) {
    const path = normalizePath();
    if (path === '/') return;

    const meta = resolveMeta(config, path);
    const badgeHtml = unique(meta.badges || []).map((badge) => (
      `<span class="page-meta-pill is-${escapeHtml(badge)}">${escapeHtml(labelFor(config, 'badges', badge))}</span>`
    )).join('');
    const showStatus = meta.status !== 'unknown'
      && (meta.status !== 'verified-v6' || meta.statusSource === 'admin');
    const statusHtml = showStatus
      ? `<span class="page-meta-status is-${escapeHtml(meta.status)}">${escapeHtml(labelFor(config, 'status', meta.status))}</span>`
      : '';

    document.querySelector('.technical-badges')?.remove();
    document.querySelector('.page-meta-badges')?.remove();

    if (!statusHtml && !badgeHtml) return;

    const container = document.createElement('div');
    container.className = 'page-meta-badges';
    container.dataset.status = meta.status;
    container.dataset.statusSource = meta.statusSource;
    container.innerHTML = `${statusHtml}${badgeHtml}`;

    const tools = article.querySelector('.article-tools');
    if (tools) tools.insertAdjacentElement('afterend', container);
    else heading.insertAdjacentElement('afterend', container);
  }

  fetch('/page-meta.json', { cache: 'no-store' })
    .then((response) => response.ok ? response.json() : null)
    .then((config) => {
      if (config) render(config);
    })
    .catch(() => {});
})();
