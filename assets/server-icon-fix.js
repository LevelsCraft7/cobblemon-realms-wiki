(() => {
  if (window.__cobblemonServerIconInstalled) return;
  window.__cobblemonServerIconInstalled = true;

  const FALLBACK_ICON = '🖥️';
  const REFRESH_INTERVAL = 300000;
  const MAX_ICON_LENGTH = 512000;

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

  function isValidIcon(source) {
    return typeof source === 'string'
      && source.startsWith('data:image/png;base64,')
      && source.length <= MAX_ICON_LENGTH;
  }

  function showServerIcon(icon, source) {
    if (!isValidIcon(source)) {
      showFallback(icon);
      return;
    }

    const image = new Image(25, 25);
    image.alt = '';
    image.decoding = 'async';
    image.style.display = 'block';
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    image.style.imageRendering = 'pixelated';
    image.style.borderRadius = '6px';

    image.addEventListener('load', () => {
      prepareContainer(icon);
      icon.style.fontSize = '';
      icon.replaceChildren(image);
    }, { once: true });

    image.addEventListener('error', () => showFallback(icon), { once: true });
    image.src = source;
  }

  async function refreshIcon(icon) {
    try {
      const response = await fetch('/api/server', {
        cache: 'no-store',
        headers: { accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Server icon HTTP ${response.status}`);

      const data = await response.json();
      showServerIcon(icon, data.icon);
    } catch (error) {
      console.debug('Minecraft server icon unavailable:', error);
      showFallback(icon);
    }
  }

  function install(attempt = 0) {
    const icon = document.querySelector('.server-icon');
    if (!icon) {
      if (attempt < 40) window.setTimeout(() => install(attempt + 1), 100);
      return;
    }

    showFallback(icon);
    refreshIcon(icon);
    window.setInterval(() => refreshIcon(icon), REFRESH_INTERVAL);
  }

  install();
})();