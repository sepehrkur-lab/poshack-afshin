const CACHE_NAME = 'sepahr-shop-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/about.html',
    '/contact.html',
    '/checkout.html',
    '/admin-login.html',
    '/product-detail.html',
    '/css/style.css',
    '/js/script.js',
    '/manifest.json'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
