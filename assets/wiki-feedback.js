(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const article = document.querySelector('article');
  if (!article || document.body.classList.contains('not-found-page')) return;

  const labels = language === 'fr'
    ? {
      title: 'Cette page vous a aidé ?',
      yes: 'Oui',
      no: 'Non',
      reasonLabel: 'Quel est le principal problème ?',
      reasons: {
        outdated: 'Information obsolète',
        incorrect: 'Information incorrecte',
        missing: 'Information manquante',
        unclear: 'Difficile à comprendre',
        'broken-link': 'Lien cassé',
        other: 'Autre'
      },
      commentLabel: 'Vous pouvez préciser si nécessaire',
      commentPlaceholder: 'Exemple : l’étape concernée, l’information attendue, le lien cassé...',
      send: 'Envoyer le retour',
      skip: 'Envoyer sans commentaire',
      thanks: 'Merci pour votre retour.',
      saved: 'Merci, votre retour détaillé a bien été envoyé.'
    }
    : {
      title: 'Was this page helpful?',
      yes: 'Yes',
      no: 'No',
      reasonLabel: 'What is the main issue?',
      reasons: {
        outdated: 'Outdated information',
        incorrect: 'Incorrect information',
        missing: 'Missing information',
        unclear: 'Hard to understand',
        'broken-link': 'Broken link',
        other: 'Other'
      },
      commentLabel: 'Add details if useful',
      commentPlaceholder: 'Example: affected step, expected information, broken link...',
      send: 'Send feedback',
      skip: 'Send without comment',
      thanks: 'Thanks for your feedback.',
      saved: 'Thanks, your detailed feedback has been sent.'
    };

  function normalizePath() {
    return location.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
  }

  const reasonOptions = Object.entries(labels.reasons)
    .map(([value, label], index) => `<label class="article-feedback-reason"><input type="radio" name="feedback-reason" value="${value}"${index === 0 ? ' checked' : ''}><span>${label}</span></label>`)
    .join('');

  const widget = document.createElement('section');
  widget.className = 'article-feedback';
  widget.innerHTML = `
    <div class="article-feedback-main">
      <strong>${labels.title}</strong>
      <div class="article-feedback-actions">
        <button type="button" data-feedback="yes">👍 ${labels.yes}</button>
        <button type="button" data-feedback="no">👎 ${labels.no}</button>
      </div>
    </div>
    <form class="article-feedback-comment" hidden>
      <fieldset class="article-feedback-reasons">
        <legend>${labels.reasonLabel}</legend>
        <div>${reasonOptions}</div>
      </fieldset>
      <label for="article-feedback-comment-text">${labels.commentLabel}</label>
      <textarea id="article-feedback-comment-text" maxlength="700" rows="3" placeholder="${labels.commentPlaceholder}"></textarea>
      <div class="article-feedback-submit-actions">
        <button type="submit">${labels.send}</button>
        <button type="button" data-feedback-skip>${labels.skip}</button>
      </div>
    </form>
    <small hidden>${labels.thanks}</small>
  `;

  const meta = article.querySelector('.article-meta');
  if (meta) article.insertBefore(widget, meta);
  else article.appendChild(widget);

  const commentForm = widget.querySelector('.article-feedback-comment');
  const textarea = widget.querySelector('textarea');
  const message = widget.querySelector('small');
  let selectedVote = '';
  let submitted = false;

  function lockButtons(selectedButton) {
    widget.querySelectorAll('.article-feedback-actions button').forEach((item) => {
      item.disabled = true;
      item.classList.toggle('is-selected', item === selectedButton);
    });
  }

  function selectedReason() {
    return commentForm.querySelector('input[name="feedback-reason"]:checked')?.value || 'other';
  }

  async function submitFeedback(vote, comment = '', reason = '') {
    if (submitted) return;
    submitted = true;
    commentForm.hidden = true;
    message.hidden = false;
    message.textContent = comment || reason ? labels.saved : labels.thanks;
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path: normalizePath(), vote, comment, reason, language }),
        keepalive: true,
        credentials: 'same-origin'
      });
    } catch {}
  }

  widget.querySelectorAll('[data-feedback]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (submitted) return;
      selectedVote = button.dataset.feedback === 'yes' ? 'yes' : 'no';
      lockButtons(button);
      if (selectedVote === 'no') {
        commentForm.hidden = false;
        return;
      }
      await submitFeedback('yes');
    });
  });

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitFeedback(selectedVote || 'no', textarea.value.trim(), selectedReason());
  });

  widget.querySelector('[data-feedback-skip]')?.addEventListener('click', async () => {
    await submitFeedback(selectedVote || 'no', '', selectedReason());
  });
})();

(() => {
  const SERVER_ADDRESS = '184.170.201.211:25565';
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const isFrench = language === 'fr';
  const providerEndpoints = [
    {
      name: 'wiki-worker',
      url: '/api/server',
      normalize(data) {
        return {
          online: data?.online === true,
          players: {
            online: Number.isFinite(data?.players?.online) ? data.players.online : 0,
            max: Number.isFinite(data?.players?.max) ? data.players.max : 0
          }
        };
      }
    },
    {
      name: 'mcstatus.io',
      url: `https://api.mcstatus.io/v2/status/java/${SERVER_ADDRESS}`,
      normalize(data) {
        return {
          online: data?.online === true,
          players: {
            online: Number.isFinite(data?.players?.online) ? data.players.online : 0,
            max: Number.isFinite(data?.players?.max) ? data.players.max : 0
          }
        };
      }
    },
    {
      name: 'mcsrvstat.us',
      url: `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`,
      normalize(data) {
        return {
          online: data?.online === true,
          players: {
            online: Number.isFinite(data?.players?.online) ? data.players.online : 0,
            max: Number.isFinite(data?.players?.max) ? data.players.max : 0
          }
        };
      }
    }
  ];

  async function fetchWithTimeout(url, timeout = 7000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
    try {
      return await fetch(url, { signal: controller.signal, cache: 'no-store' });
    } finally {
      window.clearTimeout(timer);
    }
  }

  function targets() {
    return {
      badge: document.getElementById('server-badge'),
      label: document.getElementById('server-status-label'),
      online: document.getElementById('server-online'),
      max: document.getElementById('server-max')
    };
  }

  function setUnavailable() {
    const { badge, label, online, max } = targets();
    if (!badge) return;
    if (label) label.textContent = isFrench ? 'Indisponible' : 'Unavailable';
    if (online) online.textContent = '–';
    if (max) max.textContent = '–';
    badge.classList.remove('is-checking', 'is-online', 'is-offline');
    badge.classList.add('is-unavailable');
    badge.title = isFrench
      ? 'Statut serveur indisponible pour le moment.'
      : 'Server status unavailable for now.';
  }

  function setStatus(status) {
    const { badge, label, online, max } = targets();
    if (!badge) return;
    const formatter = new Intl.NumberFormat(isFrench ? 'fr-FR' : 'en-US');
    const playerOnline = Number.isFinite(status.players?.online) ? status.players.online : 0;
    const playerMax = Number.isFinite(status.players?.max) ? status.players.max : 0;

    if (label) {
      label.textContent = status.online
        ? (isFrench ? 'En ligne' : 'Online')
        : (isFrench ? 'Hors ligne' : 'Offline');
    }
    if (online) online.textContent = formatter.format(playerOnline);
    if (max) max.textContent = formatter.format(playerMax);

    badge.classList.remove('is-checking', 'is-unavailable', 'is-online', 'is-offline');
    badge.classList.add(status.online ? 'is-online' : 'is-offline');
    badge.dataset.serverStatusProvider = status.provider || '';
    badge.title = status.online
      ? `${isFrench ? 'En ligne' : 'Online'} • ${formatter.format(playerOnline)} / ${formatter.format(playerMax)} • ${status.provider || 'status provider'}`
      : `${isFrench ? 'Serveur hors ligne' : 'Server offline'} • ${status.provider || 'status provider'}`;
  }

  async function readStatus() {
    let offlineFallback = null;
    for (const endpoint of providerEndpoints) {
      try {
        const response = await fetchWithTimeout(endpoint.url);
        if (!response.ok) continue;
        const data = await response.json();
        const normalized = endpoint.normalize(data);
        if (normalized.online === true) return { ...normalized, provider: endpoint.name };
        if (normalized.online === false) offlineFallback = { ...normalized, provider: endpoint.name };
      } catch (error) {
        console.debug('Server status provider unavailable:', endpoint.name, error);
      }
    }
    return offlineFallback;
  }

  async function refreshServerStatus() {
    const { badge } = targets();
    if (!badge) return false;
    badge.classList.add('is-checking');
    const status = await readStatus();
    if (status) setStatus(status);
    else setUnavailable();
    return true;
  }

  let attempts = 0;
  const waitForBadge = window.setInterval(() => {
    attempts += 1;
    if (document.getElementById('server-badge')) {
      window.clearInterval(waitForBadge);
      refreshServerStatus();
      window.setInterval(refreshServerStatus, 55000);
    }
    if (attempts > 40) window.clearInterval(waitForBadge);
  }, 250);
})();
