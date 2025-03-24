const CACHE_NAME = "cache-v1";
const urlsToCache = [
  "index.html",
  "src/js/app.js",
  "offline.html",
  "src/css/app.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("about.html")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("offline.html"))
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((response) => response || caches.match("offline.html"))
        )
    );
  }
});
