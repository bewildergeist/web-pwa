// 8.01 Geolocation --------------------------------------------------
const geolocationNode = document.querySelector("#geolocation");

async function handleGeoLocation(pos) {
  try {
    const reverseGeocodingResult = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
    ).then((res) => res.json());

    geolocationNode.textContent = [
      reverseGeocodingResult.city,
      reverseGeocodingResult.locality,
      reverseGeocodingResult.countryName,
    ]
      .filter(Boolean)
      .join(", ");
  } catch (error) {
    console.error(error);
  }
}

document.querySelector("button#locate-me").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
  } else {
    console.error("Geolocation API not supported");
  }
});

// 8.02 Network status -----------------------------------------------
const networkStatusNode = document.querySelector("#network-status");

function setNetworkStatus() {
  networkStatusNode.textContent = navigator.onLine ? "online" : "offline";
}

setNetworkStatus();

window.addEventListener("online", setNetworkStatus);
window.addEventListener("offline", setNetworkStatus);
