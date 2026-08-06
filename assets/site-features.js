(() => {
  const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';

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
      button.setAttribute('aria-label', language === 'fr' ? 'Copier la commande' : 'Copy command');
      button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg><span>${language === 'fr' ? 'Copier' : 'Copy'}</span>`;

      button.addEventListener('click', async () => {
        try {
          await copyText(code.textContent.replace(/\n$/, ''));
          button.classList.add('is-copied');
          button.querySelector('span').textContent = language === 'fr' ? 'Copié' : 'Copied';
          window.setTimeout(() => {
            button.classList.remove('is-copied');
            button.querySelector('span').textContent = language === 'fr' ? 'Copier' : 'Copy';
          }, 1500);
        } catch (error) {
          console.error('Unable to copy command:', error);
        }
      });

      pre.appendChild(button);
    });
  }

  function slugify(value) {
    return value.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
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
    details.innerHTML = `<summary><span>${language === 'fr' ? 'Sur cette page' : 'On this page'}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 10 5 5 5-5"></path></svg></summary><nav>${headings.map((heading) => `<a class="${heading.tagName === 'H3' ? 'mobile-toc-depth-3' : 'mobile-toc-depth-2'}" href="#${heading.id}">${heading.textContent.trim()}</a>`).join('')}</nav>`;

    details.addEventListener('click', (event) => {
      if (event.target.closest('a')) details.open = false;
    });

    const firstHeading = article.querySelector('h1');
    if (firstHeading?.nextSibling) firstHeading.parentNode.insertBefore(details, firstHeading.nextSibling);
    else article.prepend(details);
  }

  function installSearchShortcutHelp() {
    const input = document.getElementById('search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    const refresh = () => {
      results.querySelectorAll('a[role="option"]').forEach((link) => {
        link.setAttribute('aria-selected', String(link.classList.contains('is-active')));
      });

      const hasResults = Boolean(results.querySelector('a[role="option"]'));
      let help = results.querySelector('.search-keyboard-help');
      if (!hasResults) {
        help?.remove();
        return;
      }

      if (!help) {
        help = document.createElement('div');
        help.className = 'search-keyboard-help';
        help.innerHTML = `<span><kbd>↑</kbd><kbd>↓</kbd> ${language === 'fr' ? 'Naviguer' : 'Navigate'}</span><span><kbd>Entrée</kbd> ${language === 'fr' ? 'Ouvrir' : 'Open'}</span>`;
        results.appendChild(help);
      }
    };

    const observer = new MutationObserver(refresh);
    observer.observe(results, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || results.hidden || results.querySelector('a.is-active')) return;
      const first = results.querySelector('a[role="option"]');
      if (!first) return;
      event.preventDefault();
      first.click();
    });
  }

  function initialize() {
    installCommandCopyButtons();
    installMobileTableOfContents();
    installSearchShortcutHelp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
