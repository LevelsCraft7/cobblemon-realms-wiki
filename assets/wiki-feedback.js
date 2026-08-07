(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const article = document.querySelector('article');
  if (!article || document.body.classList.contains('not-found-page')) return;

  const labels = language === 'fr'
    ? {
      title: 'Cette page vous a aidé ?',
      yes: 'Oui',
      no: 'Non',
      commentLabel: 'Qu’est-ce qui manque ou doit être amélioré ?',
      commentPlaceholder: 'Exemple : une info pas claire, une étape manquante, un lien cassé...',
      send: 'Envoyer le retour',
      skip: 'Envoyer sans commentaire',
      thanks: 'Merci pour votre retour.',
      saved: 'Merci, votre commentaire a bien été envoyé.'
    }
    : {
      title: 'Was this page helpful?',
      yes: 'Yes',
      no: 'No',
      commentLabel: 'What is missing or should be improved?',
      commentPlaceholder: 'Example: unclear info, missing step, broken link...',
      send: 'Send feedback',
      skip: 'Send without comment',
      thanks: 'Thanks for your feedback.',
      saved: 'Thanks, your comment has been sent.'
    };

  function normalizePath() {
    return location.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
  }

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
      <label>${labels.commentLabel}</label>
      <textarea maxlength="700" rows="3" placeholder="${labels.commentPlaceholder}"></textarea>
      <div>
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

  async function submitFeedback(vote, comment = '') {
    if (submitted) return;
    submitted = true;
    commentForm.hidden = true;
    message.hidden = false;
    message.textContent = comment ? labels.saved : labels.thanks;
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path: normalizePath(), vote, comment, language }),
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
        textarea.focus();
        return;
      }
      await submitFeedback('yes');
    });
  });

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitFeedback(selectedVote || 'no', textarea.value.trim());
  });

  widget.querySelector('[data-feedback-skip]')?.addEventListener('click', async () => {
    await submitFeedback(selectedVote || 'no');
  });
})();
