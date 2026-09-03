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
function startTimer(minutes) {
  let seconds = minutes * 60;
  const display = document.getElementById('timer-display');

  const interval = setInterval(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    display.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      display.textContent = "Done";
    }
  }, 1000);
}
