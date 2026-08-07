(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const article = document.querySelector('article');
  if (!article || document.body.classList.contains('not-found-page')) return;

  const labels = language === 'fr'
    ? {
      title: 'Cette page vous a aidé ?',
      yes: 'Oui',
      no: 'Non',
      thanks: 'Merci pour votre retour.'
    }
    : {
      title: 'Was this page helpful?',
      yes: 'Yes',
      no: 'No',
      thanks: 'Thanks for your feedback.'
    };

  function normalizePath() {
    return location.pathname.replace(/\/index(?:\.html)?$/i, '/').replace(/\.html$/i, '').replace(/\/$/, '') || '/';
  }

  const widget = document.createElement('section');
  widget.className = 'article-feedback';
  widget.innerHTML = `<strong>${labels.title}</strong><div><button type="button" data-feedback="yes">👍 ${labels.yes}</button><button type="button" data-feedback="no">👎 ${labels.no}</button></div><small hidden>${labels.thanks}</small>`;

  const meta = article.querySelector('.article-meta');
  if (meta) article.insertBefore(widget, meta);
  else article.appendChild(widget);

  widget.querySelectorAll('[data-feedback]').forEach((button) => {
    button.addEventListener('click', async () => {
      const vote = button.dataset.feedback === 'yes' ? 'yes' : 'no';
      widget.querySelectorAll('button').forEach((item) => {
        item.disabled = true;
        item.classList.toggle('is-selected', item === button);
      });
      widget.querySelector('small').hidden = false;
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ path: normalizePath(), vote, language }),
          keepalive: true,
          credentials: 'same-origin'
        });
      } catch {}
    });
  });
})();
