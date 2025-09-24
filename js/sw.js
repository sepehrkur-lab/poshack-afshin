const CACHE_NAME = "sepahr-shop-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/products.html",
  "/product-detail.html",
  "/checkout.html",
  "/about.html",
  "/contact.html",
  "/admin-login.html",
  "/css/style.css",
  "/js/script.js",
  "/js/product-loader.js",
  "/js/products.js",
  "/manifest.json"
];

// نصب Service Worker
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// فعال‌سازی
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// واکشی
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
