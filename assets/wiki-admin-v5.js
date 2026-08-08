(() => {
  const data = window.__CR_WIKI_V5__ || null;
  if (!data) return;

  const params = new URLSearchParams(location.search);
  const tab = params.get('tab') || 'overview';
  const adminPath = location.pathname.replace(/\/$/, '') || '/__cr-admin';
  const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  const fmt = value => {
    if (!value) return 'Unknown';
    try { return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }
    catch { return String(value); }
  };
  const num = value => Number(value || 0).toLocaleString('fr-FR');
  const link = (nextTab, extra = {}) => {
    const q = new URLSearchParams({ tab: nextTab });
    Object.entries(extra).forEach(([key, value]) => { if (value !== undefined && value !== null && value !== '') q.set(key, value); });
    return `${adminPath}?${q}`;
  };
  const status = (text, kind = 'info') => `<span class="status ${kind}">${esc(text)}</span>`;
  const card = (title, value, note = '') => `<article class="card"><small>${esc(title)}</small><strong>${esc(value)}</strong><small>${esc(note)}</small></article>`;

  function groupByLabel(label) {
    return [...document.querySelectorAll('.nav-group')].find(group => group.querySelector(':scope > small')?.textContent.trim() === label);
  }

  function addNav(groupLabel, tabName, label) {
    const group = groupByLabel(groupLabel);
    if (!group || group.querySelector(`[data-v5-tab="${tabName}"]`)) return;
    const a = document.createElement('a');
    a.dataset.v5Tab = tabName;
    a.href = link(tabName);
    a.textContent = label;
    if (tab === tabName) a.classList.add('is-active');
    group.appendChild(a);
  }

  function installNav() {
    addNav('Insights', 'readiness', '🚦 Release Readiness');
    addNav('Insights', 'translation-drift', '🌍 Translation Drift');
    addNav('Insights', 'search-quality', '🎯 Search Quality');
  }

  function replacePanel(title, html) {
    const main = document.querySelector('.admin-main');
    const top = main?.querySelector('.admin-topbar');
    if (!main || !top) return;
    top.querySelector('h1').textContent = title;
    [...main.children].forEach(child => { if (child !== top) child.remove(); });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) main.appendChild(wrap.firstChild);
  }

  function readinessKind(score) {
    if (score >= 95) return 'ok';
    if (score >= 85) return 'info';
    if (score >= 70) return 'warn';
    return 'danger';
  }

  function readinessPanel() {
    const r = data.readiness || {};
    const redirect = data.redirectHealth || {};
    replacePanel('Release Readiness', `
      <div class="hero-grid">
        ${card('Readiness', `${r.score ?? 0}%`, r.label || '')}
        ${card('Critical audit', r.critical || 0, 'build blockers')}
        ${card('Translation drift', r.translationDrift || 0, 'EN / FR pairs behind')}
        ${card('Open feedback', r.openFeedback || 0, 'still actionable')}
      </div>
      <section class="section">
        <div class="section-head"><h2>🚦 Release status</h2>${status(`${r.score ?? 0}% • ${r.label || 'Unknown'}`, readinessKind(Number(r.score || 0)))}</div>
        <p class="data-note">This operational score is intentionally conservative. It combines build-audit problems, translation drift, unresolved review statuses, active feedback and redirect integrity. It does not replace a manual release check.</p>
        <ul class="check-list">
          <li>${Number(r.critical || 0) === 0 ? '✅' : '🚨'} Critical build audit issues: <strong>${num(r.critical)}</strong></li>
          <li>${Number(r.warnings || 0) === 0 ? '✅' : '⚠️'} Build audit warnings: <strong>${num(r.warnings)}</strong></li>
          <li>${Number(r.translationDrift || 0) === 0 ? '✅' : '⚠️'} Translation pairs potentially behind: <strong>${num(r.translationDrift)}</strong></li>
          <li>${Number(r.needsReview || 0) === 0 ? '✅' : '⚠️'} Pages still unknown / draft / needs-review: <strong>${num(r.needsReview)}</strong></li>
          <li>${Number(r.openFeedback || 0) === 0 ? '✅' : '⚠️'} Active feedback items: <strong>${num(r.openFeedback)}</strong></li>
          <li>${Number(r.redirectIssues || 0) === 0 ? '✅' : '🚨'} Redirect integrity issues: <strong>${num(r.redirectIssues)}</strong></li>
        </ul>
      </section>
      <div class="grid-2">
        <section class="section"><div class="section-head"><h2>🌍 Translation readiness</h2>${status(`${num(data.translationDrift?.count || 0)} drift`, data.translationDrift?.count ? 'warn' : 'ok')}</div><p>Pairs are flagged only when the Git update timestamps differ by at least <strong>${num(data.translationDrift?.thresholdHours || 12)} hours</strong>.</p><a class="button" href="${esc(link('translation-drift'))}">Open Translation Drift</a></section>
        <section class="section"><div class="section-head"><h2>🔀 Redirect readiness</h2>${status(redirect.healthy ? 'Healthy' : 'Needs attention', redirect.healthy ? 'ok' : 'danger')}</div><ul class="check-list"><li>${num(redirect.active)} active redirects</li><li>${num(redirect.missingTargets?.length || 0)} missing destinations</li><li>${num(redirect.loops?.length || 0)} detected loops</li><li>${num(redirect.chains?.length || 0)} redirect chains</li></ul><a class="button" href="${esc(link('redirects'))}">Open Redirect Manager</a></section>
      </div>
      <section class="section"><div class="section-head"><h2>🎯 Search readiness</h2>${status(`${num(data.searchQuality?.successRate || 0)}% successful`, Number(data.searchQuality?.successRate || 0) >= 85 ? 'ok' : 'warn')}</div><p><strong>${num(data.searchQuality?.searches || 0)}</strong> stable searches tracked over the last 30 days, with <strong>${num(data.searchQuality?.zeroRate || 0)}%</strong> ending without a result.</p><a class="button" href="${esc(link('search-quality'))}">Open Search Quality</a></section>
    `);
  }

  function translationPanel() {
    const drift = data.translationDrift || { items: [] };
    replacePanel('Translation Drift', `
      <div class="hero-grid">
        ${card('Potential drift', drift.count || 0, 'paired pages')}
        ${card('Threshold', `${drift.thresholdHours || 12}h`, 'minimum Git timestamp gap')}
        ${card('EN newer', (drift.items || []).filter(x => x.newer === 'en').length, 'FR may need sync')}
        ${card('FR newer', (drift.items || []).filter(x => x.newer === 'fr').length, 'EN may need sync')}
      </div>
      <section class="section">
        <div class="section-head"><h2>🌍 Pages whose translations may be behind</h2>${status(`${num(drift.count)} flagged`, drift.count ? 'warn' : 'ok')}</div>
        <p class="data-note">This is based only on verified Git update timestamps. It does not claim that the older page is wrong. It tells you where a translation comparison is worth doing.</p>
        ${(drift.items || []).length ? `<table><thead><tr><th>Page</th><th>Newer language</th><th>EN update</th><th>FR update</th><th>Gap</th><th>Actions</th></tr></thead><tbody>${drift.items.map(item => `<tr><td><strong>${esc(item.title)}</strong><br><code>${esc(item.path)}</code></td><td>${status(item.newer.toUpperCase(), 'warn')}</td><td>${esc(fmt(item.enUpdatedAt))}</td><td>${esc(fmt(item.frUpdatedAt))}</td><td><strong>${num(item.deltaHours)}h</strong></td><td><div class="admin-actions compact"><a class="button mini" href="${esc(item.enPath)}" target="_blank">EN</a><a class="button mini" href="${esc(item.frPath)}" target="_blank">FR</a></div></td></tr>`).join('')}</tbody></table>` : '<div class="empty">No translation pair currently exceeds the drift threshold.</div>'}
      </section>
    `);
  }

  function searchQualityPanel() {
    const q = data.searchQuality || {};
    replacePanel('Search Quality', `
      <div class="hero-grid">
        ${card('Search success', `${q.successRate ?? 100}%`, 'non-zero-result searches')}
        ${card('Result click rate', `${q.clickRate ?? 0}%`, 'clicks / stable searches')}
        ${card('Zero-result rate', `${q.zeroRate ?? 0}%`, 'zeros / stable searches')}
        ${card('Stable searches', q.searches || 0, 'last 30 days')}
      </div>
      <section class="section">
        <div class="section-head"><h2>🎯 Search quality scorecard</h2>${status(`${q.successRate ?? 100}% success`, Number(q.successRate ?? 100) >= 85 ? 'ok' : 'warn')}</div>
        <p class="data-note">A search counts after the existing stability delay, not on every keystroke. Success means the tracked search did not end as a zero-result search. Click rate measures how often a result was actually opened.</p>
        <ul class="check-list"><li><strong>${num(q.searches)}</strong> stable searches</li><li><strong>${num(q.successful)}</strong> searches with results</li><li><strong>${num(q.clicks)}</strong> result clicks</li><li><strong>${num(q.zeros)}</strong> zero-result searches</li><li><strong>${num(q.uniqueQueries)}</strong> unique query/category/language combinations</li></ul>
      </section>
      <section class="section">
        <div class="section-head"><h2>🔎 Top failing searches</h2>${status(`${num(q.failures?.length || 0)} shown`, q.failures?.length ? 'warn' : 'ok')}</div>
        ${(q.failures || []).length ? `<table><thead><tr><th>Query</th><th>Language</th><th>Category</th><th>Searches</th><th>Zero results</th><th>Clicks</th></tr></thead><tbody>${q.failures.map(item => `<tr><td><strong>${esc(item.query)}</strong></td><td>${status(String(item.language || '').toUpperCase())}</td><td>${esc(item.category || 'other')}</td><td>${num(item.searches)}</td><td><strong>${num(item.zeros)}</strong></td><td>${num(item.clicks)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">No failing search query recorded in the last 30 days.</div>'}
      </section>
    `);
  }

  function injectOverview() {
    if (tab !== 'overview') return;
    const main = document.querySelector('.admin-main');
    if (!main || main.querySelector('.v5-readiness-summary')) return;
    const r = data.readiness || {};
    const section = document.createElement('section');
    section.className = 'section v5-readiness-summary';
    section.innerHTML = `<div class="section-head"><h2>🚦 Release Readiness</h2>${status(`${r.score ?? 0}% • ${r.label || 'Unknown'}`, readinessKind(Number(r.score || 0)))}</div><div class="hero-grid">${card('Translation drift', r.translationDrift || 0, 'pairs')}${card('Needs review', r.needsReview || 0, 'pages')}${card('Open feedback', r.openFeedback || 0, 'items')}${card('Redirect issues', r.redirectIssues || 0, 'integrity')}</div><a class="button" href="${esc(link('readiness'))}">Open Release Readiness</a>`;
    main.appendChild(section);
  }

  function injectRedirectHealth() {
    if (tab !== 'redirects') return;
    const inject = () => {
      const main = document.querySelector('.admin-main');
      if (!main || main.querySelector('.v5-redirect-health') || !main.querySelector('.v4-redirect-form')) return false;
      const r = data.redirectHealth || {};
      const section = document.createElement('section');
      section.className = 'section v5-redirect-health';
      section.innerHTML = `<div class="section-head"><h2>🩺 Redirect Health</h2>${status(r.healthy ? 'Healthy' : 'Needs attention', r.healthy ? 'ok' : 'danger')}</div><div class="hero-grid">${card('Active', r.active || 0, 'redirects')}${card('Disabled', r.disabled || 0, 'redirects')}${card('Missing targets', r.missingTargets?.length || 0, 'must inspect')}${card('Chains', r.chains?.length || 0, 'should stay short')}</div>${r.missingTargets?.length ? `<h3>Missing destinations</h3><div class="v4-list">${r.missingTargets.map(x => `<article class="v4-row"><code>${esc(x.oldPath)}</code><span>→</span><code>${esc(x.newPath)}</code></article>`).join('')}</div>` : '<p class="notice">All active redirect destinations resolve to a known page or redirect.</p>'}${r.loops?.length ? `<h3>Detected loops</h3><div class="v4-list">${r.loops.map(x => `<article class="v4-row"><code>${esc(x.oldPath)}</code><span>loop at ${esc(x.at)}</span></article>`).join('')}</div>` : ''}`;
      main.appendChild(section);
      return true;
    };
    if (inject()) return;
    const observer = new MutationObserver(() => { if (inject()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }

  installNav();
  if (tab === 'readiness') readinessPanel();
  else if (tab === 'translation-drift') translationPanel();
  else if (tab === 'search-quality') searchQualityPanel();
  else {
    injectOverview();
    injectRedirectHealth();
  }
})();
