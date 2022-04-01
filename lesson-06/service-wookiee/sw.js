const uniqueString = 'v1';
const urlsToCache = ["/", "main.js", "style.css", "chewie.jpg", "index.html"];

self.addEventListener("install", event => {
    event.waitUntil(
       caches.open("assets")
       .then(cache => {
          return cache.addAll(urlsToCache);
       })
    )
 })

 self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
      .then(cachedResponse => {
          return cachedResponse || fetch(event.request);
      }
    )
   )
 });

 self.addEventListener("fetch", event => {
    event.respondWith(
      fetch(event.request)
      .catch(error => {
        return caches.match(event.request) ;
      })
    );
 });