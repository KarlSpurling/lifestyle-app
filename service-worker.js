// AUTO-VERSIONING SERVICE WORKER
const VERSION = Date.now();  // unique version each deployment
const CACHE_NAME = `lifestyle-cache-${VERSION}`;

const ASSETS = [
  './',
  './dashboard.html',
  './planner.html',
  './progress.html',
  './index.html',
  './checklist.html',
  './timers.html',
  './settings.html',
  './style.css',
  './app.js',
  './manifest.json'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
