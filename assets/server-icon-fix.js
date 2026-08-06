(() => {
  if (window.__cobblemonServerIconInstalled) return;
  window.__cobblemonServerIconInstalled = true;

  const SERVER_LOGO_URL = '/assets/cobblemon-realms-server-icon.svg?v=2026-08-06';
  const FALLBACK_ICON = '🖥️';

  function prepareContainer(icon) {
    icon.style.backgroundImage = 'none';
    icon.style.display = 'grid';
    icon.style.placeItems = 'center';
    icon.style.overflow = 'hidden';
  }

  function showFallback(icon) {
    prepareContainer(icon);
    icon.replaceChildren();
    icon.textContent = FALLBACK_ICON;
    icon.style.fontSize = '16px';
    icon.style.lineHeight = '1';
  }

  function renderLogo(icon) {
    prepareContainer(icon);
    icon.style.fontSize = '';

    const image = new Image(25, 25);
    image.alt = '';
    image.decoding = 'async';
    image.style.display = 'block';
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    image.style.borderRadius = '6px';
    image.addEventListener('error', () => showFallback(icon), { once: true });
    image.src = SERVER_LOGO_URL;

    icon.replaceChildren(image);
  }

  function install(attempt = 0) {
    const icon = document.querySelector('.server-icon');
    if (!icon) {
      if (attempt < 40) window.setTimeout(() => install(attempt + 1), 100);
      return;
    }

    renderLogo(icon);
  }

  install();
})();
