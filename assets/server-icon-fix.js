(() => {
  const icon = document.querySelector('.server-icon');
  if (!icon || icon.querySelector('img')) return;

  icon.style.backgroundImage = 'none';
  icon.style.display = 'grid';
  icon.style.placeItems = 'center';
  icon.style.overflow = 'hidden';

  const image = document.createElement('img');
  image.src = '/assets/server-icon.svg?v=1';
  image.alt = '';
  image.width = 25;
  image.height = 25;
  image.decoding = 'async';
  image.style.display = 'block';
  image.style.width = '100%';
  image.style.height = '100%';
  image.style.objectFit = 'cover';
  image.style.borderRadius = '6px';

  icon.appendChild(image);
})();
