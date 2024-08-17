function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  fetchWeatherData(city);
}

function fetchWeatherData(city) {
  let apiKey = "6b8a7398o06094tf908737c5b44dce83";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log("Response data", response.data);

  let temperatureElement = document.querySelector(".current-temperature-value");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector(".current-details");
  let iconElement = document.querySelector(".current-temperature-icon");
  let currentDateElement = document.querySelector("#current-date");

  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon_url;
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.city;
  currentDateElement.innerHTML = formatDate(response.data.time);
  descriptionElement.innerHTML = `${formatDate(
    response.data.time
  )}, ${description} <br/>
  Humidity:<strong>${humidity}%</strong>, Wind: <strong>${windSpeed}km/h</strong>`;
  iconElement.innerHTML = ` <img src="${icon}" alt="${description}"/>`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function initializeApp() {
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  fetchWeatherData("Paris");
}
document.addEventListener("DOMContentLoaded", initializeApp);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

// function search(event) {
//   event.preventDefault();
//   let searchInputElement = document.querySelector("#search-input");
//   let city = searchInputElement.value;

//   let apiKey =  "6b8a7398o06094tf908737c5b44dce83";
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(displayTemperature);
// }

// function formatDate(date) {
//   let minutes = date.getMinutes();
//   let hours = date.getHours();
//   let day = date.getDay();

//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   if (hours < 10) {
//     hours = `0${hours}`;
//   }

//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday"
//   ];

//   let formattedDay = days[day];
//   return `${formattedDay} ${hours}:${minutes}`;
// }

// let searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("submit", search);

// let currentDateELement = document.querySelector("#current-date");
// let currentDate = new Date();

// currentDateELement.innerHTML = formatDate(currentDate);
