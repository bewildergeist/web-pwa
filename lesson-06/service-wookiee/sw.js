
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

