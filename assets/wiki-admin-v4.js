(() => {
  const params = new URLSearchParams(location.search);
  const tab = params.get('tab') || 'overview';
  const adminPath = location.pathname.replace(/\/$/, '') || '/__cr-admin';
  const tokenMatch = adminPath.match(/^\/__cr-admin\/([^/]+)$/);
  const apiBase = tokenMatch ? `/api/admin/${encodeURIComponent(tokenMatch[1])}/v4` : '/api/admin/v4';
  let state = null;

  const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  const pathOnly = (v = '/') => { try { const u = new URL(v, location.origin); return u.pathname.replace(/\/$/, '') || '/'; } catch { return '/'; } };
  const link = (nextTab, extra = {}) => {
    const q = new URLSearchParams({ tab: nextTab });
    Object.entries(extra).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') q.set(k, v); });
    return `${adminPath}?${q}`;
  };
  const api = async (suffix, options = {}) => {
    const res = await fetch(`${apiBase}${suffix}`, { credentials: 'same-origin', ...options });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
    return body;
  };
  const reloadState = async path => {
    state = await api(`/state${path ? `?path=${encodeURIComponent(path)}` : ''}`);
    return state;
  };
  const post = (suffix, body) => api(suffix, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

  function groupByLabel(label) {
    return [...document.querySelectorAll('.nav-group')].find(group => group.querySelector(':scope > small')?.textContent.trim() === label);
  }
  function addNav(groupLabel, tabName, label) {
    const group = groupByLabel(groupLabel);
    if (!group || group.querySelector(`[data-v4-tab="${tabName}"]`)) return;
    const a = document.createElement('a');
    a.dataset.v4Tab = tabName;
    a.href = link(tabName);
    a.textContent = label;
    if (tab === tabName) a.classList.add('is-active');
    group.appendChild(a);
  }
  function installNav() {
    addNav('Content', 'inspector', '🔬 Page Inspector');
    addNav('Insights', 'taxonomy', '🧬 Taxonomy Health');
    addNav('Configuration', 'redirects', '🔀 Redirects');
    addNav('Configuration', 'synonyms', '🔎 Search Synonyms');
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
  function card(title, value, note = '') { return `<article class="card"><small>${esc(title)}</small><strong>${esc(value)}</strong><small>${esc(note)}</small></article>`; }
  function pills(values = []) { return values.length ? values.map(v => `<span class="pill">${esc(v)}</span>`).join('') : '<span class="muted">None</span>'; }
  function status(text, kind = 'info') { return `<span class="status ${kind}">${esc(text)}</span>`; }
  function signed(v) { const n = Number(v || 0); return n > 0 ? `+${n}` : String(n); }

  function healthHtml() {
    const h = state.health || { checks: [], alerts: [] };
    const r = state.regression || {};
    return `<section class="section v4-health"><div class="section-head"><h2>🚦 Deploy Health</h2>${status(h.healthy ? 'Healthy' : 'Needs attention', h.healthy ? 'ok' : 'warn')}</div><div class="v4-check-grid">${(h.checks || []).map(c => `<div class="v4-check ${c.ok ? 'is-ok' : 'is-bad'}"><strong>${c.ok ? '✓' : '!'}</strong><span>${esc(c.label)}</span></div>`).join('')}</div>${r.previous ? `<p class="data-note">Compared with previous deploy <code>${esc(String(r.previous.commitSha || '').slice(0, 9))}</code>: Critical ${signed(r.delta?.critical)}, Warnings ${signed(r.delta?.warning)}, Info ${signed(r.delta?.info)}.</p>` : '<p class="data-note">No previous deploy snapshot yet. The next deployment will enable regression comparison.</p>'}${(h.alerts || []).length ? `<div class="v4-alerts">${h.alerts.map(a => `<div class="v4-alert is-${esc(a.level)}"><strong>${a.level === 'critical' ? '🚨' : '⚠️'}</strong><span>${esc(a.message)}</span></div>`).join('')}</div>` : '<p class="notice">No deploy regression alert.</p>'}</section>`;
  }

  function injectOverviewHealth() {
    if (tab !== 'overview') return;
    const main = document.querySelector('.admin-main');
    if (!main || main.querySelector('.v4-health')) return;
    const holder = document.createElement('div');
    holder.innerHTML = healthHtml();
    main.appendChild(holder.firstElementChild);
  }

  function taxonomyPanel() {
    const t = state.taxonomy || {};
    const rows = (items, body, empty) => items?.length ? `<div class="v4-list">${items.map(body).join('')}</div>` : `<div class="empty">${esc(empty)}</div>`;
    replacePanel('Taxonomy Health', `
      <div class="hero-grid">${card('Pages without topics', t.noTopics?.length || 0, 'needs classification')}${card('Single-use topics', t.singleUse?.length || 0, 'review usefulness')}${card('Unknown topics', t.unknown?.length || 0, 'not in definitions')}${card('Family outliers', t.outliers?.length || 0, 'possible mismatch')}</div>
      <div class="grid-2">
        <section class="section"><h2>Pages without topics</h2>${rows(t.noTopics, x => `<article class="v4-row"><div><strong>${esc(x.title)}</strong><code>${esc(x.path)}</code></div><a class="button mini" href="${esc(link('inspector', { inspect: x.path }))}">Inspect</a></article>`, 'Every page has topics.')}</section>
        <section class="section"><h2>Broad-only classification</h2>${rows(t.broadOnly, x => `<article class="v4-row"><div><strong>${esc(x.title)}</strong><code>${esc(x.path)}</code><div>${pills(x.topics || [])}</div></div><a class="button mini" href="${esc(link('inspector', { inspect: x.path }))}">Inspect</a></article>`, 'No page relies only on generic topics.')}</section>
      </div>
      <div class="grid-2">
        <section class="section"><h2>Single-use topics</h2>${rows(t.singleUse, x => `<article class="v4-row"><code>${esc(x.topic)}</code><span>${esc(x.count)}</span></article>`, 'No single-use topic.')}</section>
        <section class="section"><h2>Over-tagged pages</h2>${rows(t.overTagged, x => `<article class="v4-row"><div><strong>${esc(x.title)}</strong><code>${esc(x.path)}</code><div>${pills(x.topics || [])}</div></div><a class="button mini" href="${esc(link('inspector', { inspect: x.path }))}">Inspect</a></article>`, 'No page has more than six topics.')}</section>
      </div>
      <section class="section"><h2>Family outliers</h2>${rows(t.outliers, x => `<article class="v4-row"><div><strong>${esc(x.title)}</strong><code>${esc(x.path)}</code><small>Family: ${esc(x.family)} • common: ${esc((x.expectedTopics || []).join(', '))}</small></div><a class="button mini" href="${esc(link('inspector', { inspect: x.path }))}">Inspect</a></article>`, 'No obvious taxonomy outlier detected.')}</section>
      <section class="section"><h2>Topic usage</h2><div class="v4-topic-cloud">${(t.topicUsage || []).map(x => `<span class="pill">${esc(x.topic)} <strong>${esc(x.count)}</strong></span>`).join('')}</div></section>
    `);
  }

  function topicChecks(selected = []) {
    const set = new Set(selected);
    return `<div class="v4-topic-picker">${(state.topicDefinitions || []).map(t => `<label><input type="checkbox" value="${esc(t)}" ${set.has(t) ? 'checked' : ''}> <span>${esc(t)}</span></label>`).join('')}</div>`;
  }
  function metaEditor(path, meta, compact = false) {
    const v = meta?.version || {};
    return `<form class="v4-meta-editor" data-path="${esc(path)}"><div class="section-head"><div><h2>${compact ? 'Topics & versions' : 'Edit taxonomy & versions'}</h2><p class="muted">Internal topics drive Related Pages. Version fields are public only when filled.</p></div></div>${topicChecks(meta?.topics || [])}<div class="v4-version-grid"><label>Introduced<input name="introduced" value="${esc(v.introduced || '')}" placeholder="e.g. 5.0"></label><label>Updated<input name="updated" value="${esc(v.updated || '')}" placeholder="e.g. 6.1"></label><label>Removed<input name="removed" value="${esc(v.removed || '')}" placeholder="e.g. 6.0"></label></div><button class="button primary" type="submit">Save topics & versions</button><span class="v4-save-state muted"></span></form>`;
  }
  function bindMetaEditors(root = document) {
    root.querySelectorAll('.v4-meta-editor').forEach(form => {
      if (form.dataset.bound) return; form.dataset.bound = '1';
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const note = form.querySelector('.v4-save-state'); note.textContent = 'Saving…';
        const topics = [...form.querySelectorAll('.v4-topic-picker input:checked')].map(x => x.value);
        try {
          await post('/meta', { path: form.dataset.path, topics, introduced: form.elements.introduced.value, updated: form.elements.updated.value, removed: form.elements.removed.value });
          note.textContent = 'Saved ✓';
          await reloadState(form.dataset.path);
        } catch (err) { note.textContent = err.message; }
      });
    });
  }

  function inspectorPanel() {
    const i = state.inspector || {}, page = i.page || {}, m = i.meta || {}, f = i.feedback || {}, a = i.auditFlags || {};
    const selected = page.path || params.get('inspect') || '';
    replacePanel('Page Inspector', `
      <section class="section"><form class="v4-inspector-picker" method="get" action="${esc(adminPath)}"><input type="hidden" name="tab" value="inspector"><label>Page<select name="inspect">${(state.pages || []).filter(p => p.path !== '/').map(p => `<option value="${esc(p.path)}" ${pathOnly(p.path) === pathOnly(selected) ? 'selected' : ''}>${esc(p.title)} • ${esc(p.path)}</option>`).join('')}</select></label><button class="button primary">Inspect</button></form></section>
      ${page.path ? `<div class="hero-grid">${card('Views', i.views30d || 0, 'last 30 days')}${card('Helpful', f.yes || 0, 'votes')}${card('Needs work', f.no || 0, 'votes')}${card('Active feedback', i.activeComments || 0, 'open/read')}</div>
      <div class="grid-2"><section class="section"><h2>${esc(page.title)}</h2><code>${esc(page.path)}</code><p><strong>Status</strong><br>${status(m.status || 'unknown', m.status === 'verified-v6' ? 'ok' : m.status === 'legacy-5' ? 'warn' : 'info')}</p><p><strong>Badges</strong><br>${pills(m.badges || [])}</p><p><strong>Filters</strong><br>${pills(m.filters || [])}</p><p><strong>Topics</strong><br>${pills(m.topics || [])}</p><p><strong>Last Git update</strong><br>${esc(page.updatedAt || 'Unknown')}</p><p><strong>Review</strong><br>${i.review ? `OK until ${esc(i.review.snoozedUntil)} by ${esc(i.review.reviewedBy)}` : 'Not currently snoozed'}</p><div class="admin-actions"><a class="button" href="${esc(page.path)}" target="_blank">Open page</a><a class="button" href="${esc(link('badges', { edit: page.path }))}">Badges & status</a><a class="button" href="${esc(link('feedback', { path: page.path }))}">Feedback</a></div></section><section class="section">${metaEditor(page.path, m)}</section></div>
      <div class="grid-2"><section class="section"><h2>Related Pages preview</h2>${i.related?.length ? `<div class="v4-list">${i.related.map(r => `<article class="v4-row"><div><strong>${esc(r.title)}</strong><code>${esc(r.path)}</code><small>${esc((r.sharedTopics || []).join(', ') || 'same family')}</small></div>${status(String(r.score), r.score >= 40 ? 'ok' : 'info')}</article>`).join('')}</div>` : '<div class="empty">No sufficiently strong related page.</div>'}</section><section class="section"><h2>Audit flags</h2><ul class="check-list"><li>Orphan: <strong>${a.orphan ? 'Yes' : 'No'}</strong></li><li>Content warnings: <strong>${a.content?.length || 0}</strong></li><li>Broken destinations from this page: <strong>${a.brokenFromPage?.length || 0}</strong></li><li>Missing images: <strong>${a.images?.length || 0}</strong></li><li>Translation flags: <strong>${a.translation?.length || 0}</strong></li><li>Redirects pointing here: <strong>${i.redirectsToPage?.length || 0}</strong></li></ul></section></div>` : '<div class="empty">Choose a page to inspect.</div>'}
    `);
    bindMetaEditors();
  }

  function redirectPanel() {
    const prefill = params.get('from') || '';
    const dest = params.get('to') || '';
    replacePanel('Redirect Manager', `
      <div class="grid-2"><section class="section"><h2>Create / update redirect</h2><form class="form-grid v4-redirect-form"><label>Old path<input name="oldPath" value="${esc(prefill)}" placeholder="/old-guide" required></label><label>Destination<select name="newPath"><option value="">Choose page</option>${(state.pages || []).filter(p => p.path !== '/').map(p => `<option value="${esc(p.path)}" ${pathOnly(p.path) === pathOnly(dest) ? 'selected' : ''}>${esc(p.title)} • ${esc(p.path)}</option>`).join('')}</select></label><button class="button primary">Save redirect</button><span class="v4-save-state muted"></span></form><p class="data-note">A live current page cannot be used as the old path. Redirects are HTTP 308 and preserve the query string.</p></section><section class="section"><h2>404 candidates</h2>${(state.notFound || []).length ? `<div class="v4-list">${state.notFound.slice(0, 15).map(x => `<article class="v4-row"><div><code>${esc(x.path)}</code><small>${esc(x.count)} hits / 30d</small></div><a class="button mini" href="${esc(link('redirects', { from: x.path }))}">Create redirect</a></article>`).join('')}</div>` : '<div class="empty">No recent 404 candidate.</div>'}</section></div>
      <section class="section"><div class="section-head"><h2>Configured redirects</h2>${status(`${state.redirects?.length || 0} total`)}</div>${state.redirects?.length ? `<div class="v4-list">${state.redirects.map(r => `<article class="v4-row"><div><code>${esc(r.oldPath)}</code><span>→</span><code>${esc(r.newPath)}</code><small>${r.active ? 'Active' : 'Disabled'} • ${esc(r.updatedBy || '')}</small></div><div class="admin-actions"><button class="button mini v4-toggle-redirect" data-old="${esc(r.oldPath)}" data-active="${r.active ? '0' : '1'}">${r.active ? 'Disable' : 'Enable'}</button>${state.role === 'owner' ? `<button class="button mini danger v4-delete-redirect" data-old="${esc(r.oldPath)}">Delete</button>` : ''}</div></article>`).join('')}</div>` : '<div class="empty">No redirect configured.</div>'}</section>
    `);
    const form = document.querySelector('.v4-redirect-form');
    form?.addEventListener('submit', async e => { e.preventDefault(); const note = form.querySelector('.v4-save-state'); note.textContent = 'Saving…'; try { await post('/redirect', { oldPath: form.elements.oldPath.value, newPath: form.elements.newPath.value, active: true }); location.reload(); } catch (err) { note.textContent = err.message; } });
    document.querySelectorAll('.v4-toggle-redirect').forEach(b => b.addEventListener('click', async () => { await post('/redirect', { action: 'toggle', oldPath: b.dataset.old, active: b.dataset.active === '1' }); location.reload(); }));
    document.querySelectorAll('.v4-delete-redirect').forEach(b => b.addEventListener('click', async () => { if (!confirm(`Delete redirect ${b.dataset.old}?`)) return; await post('/redirect', { action: 'delete', oldPath: b.dataset.old }); location.reload(); }));
  }

  function synonymPanel() {
    const use = params.get('term') || '';
    replacePanel('Search Synonyms', `
      <div class="grid-2"><section class="section"><h2>Create / update synonym</h2><form class="form-grid v4-synonym-form"><label>Term<input name="term" value="${esc(use)}" placeholder="pokecenter" required></label><label>Aliases<input name="aliases" placeholder="pokemon center, healing, heal" required></label><button class="button primary">Save synonym</button><span class="v4-save-state muted"></span></form><p class="data-note">These aliases are loaded dynamically by public search. No rebuild is required after saving.</p></section><section class="section"><h2>Top zero-result searches</h2>${state.zeroTerms?.length ? `<div class="v4-list">${state.zeroTerms.slice(0, 15).map(x => `<article class="v4-row"><div><strong>${esc(x.query)}</strong><small>${esc(x.count)} searches • ${esc((x.language || '').toUpperCase())}</small></div><a class="button mini" href="${esc(link('synonyms', { term: x.query }))}">Use as term</a></article>`).join('')}</div>` : '<div class="empty">No zero-result query in the last 30 days.</div>'}</section></div>
      <section class="section"><h2>Configured synonyms</h2>${state.synonyms?.length ? `<div class="v4-list">${state.synonyms.map(s => `<article class="v4-row"><div><strong>${esc(s.term)}</strong><small>${esc((s.aliases || []).join(' • '))}</small><span>${s.active ? status('Active', 'ok') : status('Disabled', 'warn')}</span></div><div class="admin-actions"><button class="button mini v4-edit-syn" data-term="${esc(s.term)}" data-aliases="${esc((s.aliases || []).join(', '))}">Edit</button><button class="button mini v4-toggle-syn" data-term="${esc(s.term)}" data-aliases="${esc((s.aliases || []).join(', '))}" data-active="${s.active ? '0' : '1'}">${s.active ? 'Disable' : 'Enable'}</button>${state.role === 'owner' ? `<button class="button mini danger v4-delete-syn" data-term="${esc(s.term)}">Delete</button>` : ''}</div></article>`).join('')}</div>` : '<div class="empty">No dynamic synonym configured.</div>'}</section>
    `);
    const form = document.querySelector('.v4-synonym-form');
    form?.addEventListener('submit', async e => { e.preventDefault(); const note = form.querySelector('.v4-save-state'); note.textContent = 'Saving…'; try { await post('/synonym', { term: form.elements.term.value, aliases: form.elements.aliases.value, active: true }); location.reload(); } catch (err) { note.textContent = err.message; } });
    document.querySelectorAll('.v4-edit-syn').forEach(b => b.addEventListener('click', () => { form.elements.term.value = b.dataset.term; form.elements.aliases.value = b.dataset.aliases; form.scrollIntoView({ behavior: 'smooth' }); }));
    document.querySelectorAll('.v4-toggle-syn').forEach(b => b.addEventListener('click', async () => { await post('/synonym', { term: b.dataset.term, aliases: b.dataset.aliases, active: b.dataset.active === '1' }); location.reload(); }));
    document.querySelectorAll('.v4-delete-syn').forEach(b => b.addEventListener('click', async () => { if (!confirm(`Delete synonym ${b.dataset.term}?`)) return; await post('/synonym', { action: 'delete', term: b.dataset.term }); location.reload(); }));
  }

  function augmentBadgesPage() {
    if (tab !== 'badges') return;
    const path = params.get('edit') || state.inspector?.page?.path;
    if (!path) return;
    const main = document.querySelector('.admin-main');
    if (!main || main.querySelector('.v4-meta-extension')) return;
    const section = document.createElement('section'); section.className = 'section v4-meta-extension';
    section.innerHTML = metaEditor(path, state.inspector?.meta || {}, true);
    main.appendChild(section); bindMetaEditors(section);
  }

  function augmentStats404() {
    if (tab !== 'stats' || !state.notFound?.length) return;
    const main = document.querySelector('.admin-main'); if (!main || main.querySelector('.v4-404-actions')) return;
    const section = document.createElement('section'); section.className = 'section v4-404-actions';
    section.innerHTML = `<div class="section-head"><h2>🔀 Redirect frequent 404s</h2>${status(`${state.notFound.length} candidates`)}</div><div class="v4-list">${state.notFound.slice(0, 12).map(x => `<article class="v4-row"><div><code>${esc(x.path)}</code><small>${esc(x.count)} hits / 30d</small></div><a class="button mini" href="${esc(link('redirects', { from: x.path }))}">Create redirect</a></article>`).join('')}</div>`;
    main.appendChild(section);
  }

  function installPalette() {
    if (document.querySelector('.v4-palette')) return;
    const topActions = document.querySelector('.admin-topbar .admin-actions');
    const openButton = document.createElement('button'); openButton.className = 'button'; openButton.type = 'button'; openButton.textContent = '⌘ K'; openButton.title = 'Command palette (Ctrl+K)'; topActions?.prepend(openButton);
    const overlay = document.createElement('div'); overlay.className = 'v4-palette'; overlay.hidden = true;
    overlay.innerHTML = `<div class="v4-palette-box"><input type="search" placeholder="Search pages or admin actions…" autocomplete="off"><div class="v4-palette-results"></div><small>↑ ↓ navigate • Enter open • Esc close</small></div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('input'), results = overlay.querySelector('.v4-palette-results');
    let active = 0;
    const actions = [
      ['Overview', link('overview')], ['Pages', link('pages')], ['To Review', link('to-review')], ['Stats', link('stats')], ['Feedback', link('feedback')], ['Audit', link('audit')], ['Taxonomy Health', link('taxonomy')], ['Redirects', link('redirects')], ['Search Synonyms', link('synonyms')], ['Page Inspector', link('inspector')]
    ];
    const items = () => [...actions.map(([title, href]) => ({ title, subtitle: 'Admin', href })), ...(state.pages || []).filter(p => p.path !== '/').flatMap(p => [
      { title: `Open: ${p.title}`, subtitle: p.path, href: p.path, external: true },
      { title: `Inspect: ${p.title}`, subtitle: p.path, href: link('inspector', { inspect: p.path }) }
    ])];
    const render = () => {
      const q = input.value.toLowerCase().trim(); const filtered = items().filter(x => !q || `${x.title} ${x.subtitle}`.toLowerCase().includes(q)).slice(0, 12); active = Math.min(active, Math.max(0, filtered.length - 1));
      results.innerHTML = filtered.map((x, idx) => `<a class="${idx === active ? 'is-active' : ''}" href="${esc(x.href)}" ${x.external ? 'target="_blank"' : ''}><strong>${esc(x.title)}</strong><small>${esc(x.subtitle)}</small></a>`).join('') || '<div class="empty">No result.</div>';
    };
    const open = () => { overlay.hidden = false; input.value = ''; active = 0; render(); setTimeout(() => input.focus(), 0); };
    const close = () => { overlay.hidden = true; };
    openButton.addEventListener('click', open);
    input.addEventListener('input', render);
    input.addEventListener('keydown', e => {
      const links = [...results.querySelectorAll('a')];
      if (e.key === 'ArrowDown' && links.length) { e.preventDefault(); active = (active + 1) % links.length; render(); }
      else if (e.key === 'ArrowUp' && links.length) { e.preventDefault(); active = (active - 1 + links.length) % links.length; render(); }
      else if (e.key === 'Enter' && links.length) { e.preventDefault(); links[active]?.click(); }
      else if (e.key === 'Escape') close();
    });
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? open() : close(); } else if (e.key === 'Escape' && !overlay.hidden) close(); });
  }

  async function initialize() {
    installNav();
    const inspectPath = params.get('inspect') || params.get('edit') || '';
    try { await reloadState(inspectPath); } catch (err) { console.error('Admin V4 unavailable:', err); return; }
    installPalette();
    if (tab === 'taxonomy') taxonomyPanel();
    else if (tab === 'inspector') inspectorPanel();
    else if (tab === 'redirects') redirectPanel();
    else if (tab === 'synonyms') synonymPanel();
    else {
      injectOverviewHealth();
      augmentBadgesPage();
      augmentStats404();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
