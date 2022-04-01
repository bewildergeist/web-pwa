function geoFindMe() {

  const status = document.querySelector('#network-status');
  const mapLink = document.querySelector('#geolocation');

  mapLink.href = '';
  mapLink.textContent = '';

  async function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=da`;
    const response = await fetch(url).then(res => res.json());
    console.log(response);

    status.textContent = '';
    mapLink.textContent = `${response.locality}, ${response.countryName}`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#locate-me').addEventListener('click', geoFindMe);