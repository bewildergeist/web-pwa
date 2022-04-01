async function fetchLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      const latitude = position.coords.latitude;
      const longtitude = position.coords.longitude;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longtitude}&key=AIzaSyCU98cOt9Pe0XzfCAoI5bH-D6ZQB8a1ktw`;
      console.log(url);
      const response = await fetch(url);
      data = await response.json();
      document.getElementById("geolocation").innerHTML =
        data.results[0].formatted_address;
    });
  } else {
    throw new error("geolocation not avlible");
  }
}

const locateMeButton = document.getElementById("locate-me");
locateMeButton.addEventListener("click", async () => {
  await fetchLocation();
});

if (navigator.onLine) {
  document.getElementById("network-status").innerHTML = "Online";
} else {
  document.getElementById("network-status").innerHTML = "Offline";
}

document.getElementById("share").addEventListener("click", async () => {
  const text = document.getElementById("text-content").value;
  await navigator.share({
    title: "MDN",
    text: text,
  });
});

document.getElementById("copy-to-clipboard").addEventListener("click", () => {
  const text = document.getElementById("text-content").value;
  navigator.clipboard.writeText(text);
});

document.getElementById("read-from-file").addEventListener("click", () => {
  const text = document.getElementById("text-content").value;
  var json_string = JSON.stringify(text, undefined, 2);
  var link = document.createElement("a");
  link.download = "text.json";
  var blob = new Blob([json_string], { type: "text/plain" });
  link.href = window.URL.createObjectURL(blob);
  link.click();
});

document.getElementById("speak").addEventListener("click", () => {
  var msg = new SpeechSynthesisUtterance();
  msg.pitch = 5;
  msg.rate = 8;
  const text = document.getElementById("text-content").value;
  msg.text = text;
  window.speechSynthesis.speak(msg);
});
