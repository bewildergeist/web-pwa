self.addEventListener("install", async (e) => {
  console.log("installed");
});

self.addEventListener("fetch", async (e) => {
  console.log("fetched " + e.clientId);
  console.log(await self.clients.get(e.clientId));
  let client = await clients.get(e.clientId);
  if (client) {
    client.postMessage("test");
  }
});
