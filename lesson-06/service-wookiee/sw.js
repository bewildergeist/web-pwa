self.addEventListener("install", async (e) => {
  console.log("installed");
});

self.addEventListener("fetch", async (e) => {
  let client = await clients.get(e.clientId);
  if (client) {
    client.postMessage("test");
  }
});

self.addEventListener("fetch", async (e) => {
  console.log(e.request.url);
  switch (e.request.url.split("/").pop()) {
    case "fake.css":
      e.respondWith(
        new Response("css", {
          status: 200,
          statusText: `You tried to fetch ${e.request.destination}`,
        })
      );
      break;
    case "fake.html":
      e.respondWith(
        new Response("htnl", {
          status: 200,
          statusText: `You tried to fetch ${e.request.destination}`,
        })
      );
      break;
    case "fake.json":
      e.respondWith(
        new Response("json", {
          status: 200,
          statusText: `You tried to fetch ${e.request.destination}`,
        })
      );
      break;

    default:
      "Request failed";
      break;
  }
});
