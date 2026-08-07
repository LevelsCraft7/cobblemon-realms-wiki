(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  const article = document.querySelector('article');
  if (!article) return;

  const labels = {
    copy: language === 'fr' ? 'Copier le lien de cette section' : 'Copy section link',
    copied: language === 'fr' ? 'Lien copié' : 'Link copied'
  };

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

  article.querySelectorAll('h2[id], h3[id]').forEach((heading) => {
    if (heading.closest('.hint, .gitbook-tab-panel, .mobile-toc')) return;
    if (heading.querySelector('.section-copy-link')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'section-copy-link';
    button.setAttribute('aria-label', labels.copy);
    button.title = labels.copy;
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93"></path><path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19.07"></path></svg>';

    button.addEventListener('click', async () => {
      try {
        const url = new URL(location.href);
        url.hash = heading.id;
        await copyText(url.toString());
        button.classList.add('is-copied');
        button.setAttribute('aria-label', labels.copied);
        button.title = labels.copied;
        window.setTimeout(() => {
          button.classList.remove('is-copied');
          button.setAttribute('aria-label', labels.copy);
          button.title = labels.copy;
        }, 1400);
      } catch {}
    });

    heading.appendChild(button);
  });
})();
