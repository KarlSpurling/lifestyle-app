if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service worker registered'))
    .catch(err => console.error('SW registration failed', err));
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((box, index) => {
  const key = `lifestyle-check-${index}`;

  const saved = localStorage.getItem(key);
  if (saved === 'true') {
    box.checked = true;
  }

  box.addEventListener('change', () => {
    localStorage.setItem(key, box.checked ? 'true' : 'false');
  });
});
