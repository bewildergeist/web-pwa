self.addEventListener("message", (e) => {
  console.log(e.data);
  let start = Date.now();
  console.log("Blocking...");
  while (Date.now() < start + 3000) {}
  console.log("Unblocked!");
});
