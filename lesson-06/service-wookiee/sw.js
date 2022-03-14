// self.addEventListener("installed", async (e) => {
//     console.log("installed");
// })


self.addEventListener("fetch", async (e) => {
    let client = await clients.get(e.clientId);
    console.log('ewhfiewrngkwhfik');
    if (client) {
        client.postMessage("test")
    }
})

// async function getClientId() {
//     const client = await self.clients.get(self.clientId);
//     if (client) {
//         postMessage('It works!')
//     } else {
//         postMessage('It does not :(')
//     }
//     console.log('YOYOYO');
//     return client;
// }