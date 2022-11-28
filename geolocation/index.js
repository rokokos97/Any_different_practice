function pageLoaded() {
  const btn = document.querySelector(".btn");
  const outputHTML = document.querySelector(".output");

  function getGeolocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true,
      };
      navigator.geolocation.getCurrentPosition(
        locationSuccess,
        locationError,
        locationOptions
      );
    } else {
      writeMassage("Your browser not support geolocation");
    }
  }
  function locationSuccess(data) {
    console.log(data);
    let link = `https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`;
    outputHTML.innerHTML = `<p><a href="${link}" target="_blank" >You are here</a></p>`;
  }
  function locationError(data) {
    console.log(data);
    outputHTML.innerHTML = `<p>${data.message}</p>`;
  }
  function writeMassage(message) {
    if (message) outputHTML.innerHTML = `<p>${message}</p>`;
  }
  btn.addEventListener("click", getGeolocation);
}

document.addEventListener("DOMContentLoaded", pageLoaded);
