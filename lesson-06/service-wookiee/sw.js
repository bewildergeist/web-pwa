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
        //*****CACHE FIRST
            caches.match(event.request).then(cachedResponse => {
                    return cachedResponse || fetch(event.request);
            }
        )

        //*****NETWORK FIRST
        // fetch(event.request).catch(error => {
        //         return caches.match(event.request);
        //     })
        // )

        //*****STALE WHILE REVALIDATE
        // caches.match(event.request).then(cachedResponse => {
        //         const networkFetch = fetch(event.request).then(response => {
        //         // update the cache with a clone of the network response
        //         caches.open("pwa-assets").then(cache => {
        //             cache.put(event.request, response.clone());
        //         });
        //         });
        //         // prioritize cached response over network
        //         return cachedResponse || networkFetch;
        //     }
        // )
        )
});

