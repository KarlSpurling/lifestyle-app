const CACHE_NAME = 'lifestyle-checklist-v1.1';
const ASSETS = [
  './',
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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
