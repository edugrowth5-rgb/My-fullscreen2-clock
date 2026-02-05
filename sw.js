const cacheName = 'sagar-v11';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Naya version install karne ke liye
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Sagar Clock: Caching New Version');
      return cache.addAll(assets);
    })
  );
});

// Purana cache delete karne ke liye
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
