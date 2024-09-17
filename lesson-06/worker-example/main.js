var myWorker = new Worker("worker.js");

const hardWorkButton = document.querySelector("#worker");
const clickButton = document.querySelector("#clicky");

let clickCount = 0;

function handleButtonClick(event) {
  clickCount++;
  event.target.innerText = `Clicked ${clickCount} times`;
}

clickButton.addEventListener("click", handleButtonClick);
hardWorkButton.addEventListener("click", () => {
  myWorker.postMessage("message");
});
