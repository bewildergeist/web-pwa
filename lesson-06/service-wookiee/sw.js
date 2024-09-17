let userClient;

self.addEventListener("fetch", async (e) => {
  try {
    userClient = await self.clients.get(e.clientId);
    if (userClient) {
      userClient.postMessage("message");
      console.log("inside worker if", userClient);
    }
  } catch (error) {
    console.log("SW error: " + error);
  }
});
