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

 self.addEventListener('install', function (event) {
   event.waitUntil(
     caches.open('assets').then(function (cache) {
       return cache.addAll(urlsToCache);
     }),
   );
 });

 self.addEventListener('activate', function (event) {
   event.waitUntil(
     caches.keys().then(function (cacheNames) {
       return Promise.all(
         cacheNames
           .filter(function (cacheName) {

           })
           .map(function (cacheName) {
             return caches.delete(cacheName);
           }),
       );
     }),
   );
 });

 self.addEventListener("fetch", event => {
    event.respondWith(
      fetch(event.request)
      .catch(error => {
        return caches.match(event.request) ;
      })
    );
 });