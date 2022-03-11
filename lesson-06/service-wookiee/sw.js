// self.addEventListener("install", async (e) => {
//   console.log("installed");
// });

self.addEventListener("fetch", async (e) => {
  //   console.log("fetched " + e.clientId);
  //   console.log(await self.clients.get(e.clientId));
  let client = await clients.get(e.clientId);

  if (client) {
    client.postMessage("test");
  }
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  let arr = url.pathname.split("/");
  if (arr[arr.length - 1] == "fake.css") {
    let res = new Response("/*CSS*/", {
      headers: {
        "content-type": "application/css",
      },
    });
    e.respondWith(res);
  } else if (arr[arr.length - 1] == "fake.html") {
    let res = new Response("/*HTML*/", {
      headers: {
        "content-type": "application/html",
      },
    });
    e.respondWith(res);
  } else if (arr[arr.length - 1] == "fake.json") {
    let res = new Response("/*JSON*/", {
      headers: {
        "content-type": "application/json",
      },
    });
    e.respondWith(res);
  }
});
