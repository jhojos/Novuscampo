// Novuscampo — minimal service worker
// Caches the shell files for offline-capable PWA install
const CACHE = 'novuscampo-v1';
const ASSETS = ['./', './index.html', './app.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Network-first for navigation, cache fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
