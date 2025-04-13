const CACHE_NAME = 'expense-tracker-cache';
const urlsToCache = [
  '/expense-tracker-app/',
  '/expense-tracker-app/expensetrackerapp.html',
  '/expense-tracker-app/manifest.json',
  '/expense-tracker-app/icons/icon-192x192.png.png',
  '/expense-tracker-app/icons/icon-512x512.png.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
