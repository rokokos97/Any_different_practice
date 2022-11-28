//API request by coords example: http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
// API request example: //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// Icon link example: http://openweathermap.org/img/wn/${icon}.png

function pageLoaded() {
  const btn = document.querySelector(".btn");
  const outputHTML = document.querySelector(".output");
  const apiKey = "a5971ae6966b60d9f8efe948ed3facaa";

  btn.addEventListener("click", (e) => {
    e.preventDefault();
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
      console.log("Your browser not support geolocation");
    }
    function locationSuccess(data) {
      const link = `http://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${apiKey}&units=metric&lang={en1}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.cod) {
            outputHTML.innerHTML = `<p>Error:${data.message}</p>`;
          }
          outputHTML.innerHTML = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${data.main.temp} C</p>
                <p>Feels like: ${data.main.feels_like} C</p>
                <p>Wind: ${data.wind.speed} m/s</p>
          `;
        });
    }
    function locationError(data) {
      outputHTML.innerHTML = `<p>Error:${data.message}</p>`;
    }
  });
}
document.addEventListener("DOMContentLoaded", pageLoaded);
