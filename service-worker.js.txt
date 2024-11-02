const cacheName = 'pwa-example-cache';
const filesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png'
];

// Install the service worker and cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// Intercept requests and serve cached files when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});