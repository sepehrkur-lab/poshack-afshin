const CACHE_NAME = 'sepahr-shop-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/products.html',
  '/product-detail.html',
  '/checkout.html',
  '/css/style.css',
  '/js/script.js',
  '/js/product-loader.js',
  '/js/products.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
