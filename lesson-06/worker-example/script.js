let myWorker = new Worker("worker.js");

const hardWorkButton = document.querySelector("#worker");
const clickButton = document.querySelector("#clicky");

let clickCount = 0;
function handleButtonClick(event) {
  clickCount++;
  event.target.innerText = `Clicked ${clickCount} times`;
}

function doHardWork() {
    myWorker.postMessage("test");
    console.log("Message posted to worker");
}

clickButton.addEventListener("click", handleButtonClick);
hardWorkButton.addEventListener("click", doHardWork);
