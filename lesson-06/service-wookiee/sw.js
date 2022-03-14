const cacheV = "v1";

self.addEventListener('install', async (event) => {
    const preCache = async () => {
        const cache = await caches.open('cacheV');
        return cache.addAll([
            '/',
            '/chewie.jpg',
            '/style.css',
            'main.js'
        ])
    }
  event.waitUntil(preCache());
});

self.addEventListener('fetch', async (event) => {
    console.log(event);
    const client = await self.clients.get(event.clientId);

    client.postMessage("Request has been sent!");
});

self.addEventListener('fetch', async (event) => {
    const fileName = event.request.url.split('/').pop();
    if(fileName == "fake.css") {
        const response = new Response("/**CSS**/", {
            headers: {
                "Content-Type":"text/css"
            }
        });
        event.respondWith(response);
    }else if (fileName == "fake.html"){
        const response = new Response("/**HTML**/", {
            headers: {
                "Content-Type":"text/html"
            }
        });
        event.respondWith(response);
    }else if(fileName == "fake.json"){
        const response = new Response("/**JSON**/", {
            headers: {
                "Content-Type":"application/json"
            }
        });
        event.respondWith(response);
    }
});

self.addEventListener('fetch', async (event) => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
                return cachedResponse || fetch(event.request);
        }
    )
    )
});

