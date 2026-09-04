// Detect new service worker version
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  });
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(reg => {
    reg.onupdatefound = () => {
      const newWorker = reg.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          document.getElementById('update-banner').classList.remove('hidden');
        }
      };
    };
  });
}
function updateApp() {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
    window.location.reload();
  });
}

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
function refreshApp() {
  window.location.reload(true);
}
function clearAppCache() {
  caches.keys().then(keys => {
    keys.forEach(key => caches.delete(key));
  });
  alert("Cache cleared. Restart the app.");
}
// DASHBOARD LOGIC
function updateDashboard() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const progressDisplay = document.getElementById('progress-display');
  const summaryDisplay = document.getElementById('daily-summary');

  if (!progressDisplay || !summaryDisplay) return;

  let total = checkboxes.length;
  let checked = 0;

  checkboxes.forEach(box => {
    if (box.checked) checked++;
  });

  const percent = Math.round((checked / total) * 100);

  progressDisplay.textContent = `${checked} of ${total} tasks completed (${percent}%)`;

  // Daily summary
  let summary = "You're off to a good start.";
  if (percent === 0) summary = "Let's begin with one small task.";
  if (percent >= 25) summary = "Nice progress — keep going.";
  if (percent >= 50) summary = "Halfway there.";
  if (percent >= 75) summary = "Great work — almost done.";
  if (percent === 100) summary = "All tasks completed — excellent.";

  summaryDisplay.textContent = summary;
}

// Run dashboard update on page load
document.addEventListener('DOMContentLoaded', updateDashboard);

// PLANNER LOGIC (placeholder for future features)
function initPlanner() {
  // Reserved for future interactive planner features
}

document.addEventListener('DOMContentLoaded', initPlanner);
// PROGRESS TRACKER LOGIC
function updateProgress() {
  const todayDisplay = document.getElementById('progress-today');
  const historyList = document.getElementById('progress-history');
  const streakDisplay = document.getElementById('progress-streak');

  if (!todayDisplay || !historyList || !streakDisplay) return;

  // Count today's checklist completion
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let total = checkboxes.length;
  let checked = 0;

  checkboxes.forEach(box => {
    if (box.checked) checked++;
  });

  const percent = Math.round((checked / total) * 100);
  todayDisplay.textContent = `${checked} of ${total} tasks (${percent}%)`;

  // Save today's progress
  const todayKey = new Date().toISOString().split('T')[0];
  localStorage.setItem(`progress-${todayKey}`, percent);

  // Build last 7 days history
  historyList.innerHTML = '';
  let streak = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    const value = localStorage.getItem(`progress-${key}`);

    if (value !== null) {
      const li = document.createElement('li');
      li.textContent = `${key}: ${value}%`;
      historyList.appendChild(li);

      if (parseInt(value) === 100) {
        streak++;
      } else {
        break;
      }
    }
  }

  streakDisplay.textContent = `${streak} day streak`;
}

document.addEventListener('DOMContentLoaded', updateProgress);

// DARK MODE LOGIC
function applyDarkModeSetting() {
  const mode = localStorage.getItem('dark-mode');
  if (mode === 'on') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.contains('dark');
  if (isDark) {
    localStorage.setItem('dark-mode', 'off');
  } else {
    localStorage.setItem('dark-mode', 'on');
  }
  applyDarkModeSetting();
}

// Apply dark mode on page load
document.addEventListener('DOMContentLoaded', applyDarkModeSetting);
