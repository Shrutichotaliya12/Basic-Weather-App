const container = document.querySelector(".card");
const search = document.querySelector(".search button");
const weatherBox = document.querySelector(".weather");
const weatherDetails = document.querySelector(".details");
const error = document.querySelector(".not-found")


search.addEventListener("click", () => {
  const apiKey = "88f76a8ef48c36e23a08955358e4be6f";
  const city = document.querySelector(".search input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if(json.cod == '404'){
        container.style.height = "450px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error.classList.add("active");
        return;
    }
    container.style.height = "555px";
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    error.classList.remove("active");

      const img = document.querySelector(".weather img");
      const temerature = document.querySelector(".weather .temp");
      const description = document.querySelector(".weather .city");
      const humidity = document.querySelector(".humidity");
      const wind = document.querySelector(".wind");

      switch (json.weather[0].main) {
        case "Clear":
          img.src = "image/clouds.png";
          break;
        case "Rain":
          img.src = "image/rain.png";
          break;
        case "Drizzle":
          img.src = "image/drizzle.png";
          break;
        case "Mist":
          img.src = "image/mist.png";
          break;
        case "Clouds":
          img.src = "image/clouds.png";
          break;
        case "Snow":
          img.src = "image/snow.png";
          break;
        default:
          img.src = "image/clouds.png";
          break;
      }

      temerature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
