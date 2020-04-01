/* eslint-disable no-use-before-define */
import { displayWeatherInfo } from './functions';

const iconElement = document.querySelector('.weatherIcon');
const tempElement = document.querySelector('.temperature p');
const descElement = document.querySelector('.temperatureDescription p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

function setPosition(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  getWeatherAuto(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

const weather = {};

weather.temperature = {
  unit: 'celsius',
};

const KELVIN = 273;

const key = '82005d27a116c2880c8f0fcb866998a0';

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function getWeatherAuto(latitude, longitude) {
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeatherAuto();
    });
}

function getWeather(location) {
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`;

  fetch(api)
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeatherInfo(iconElement, tempElement, descElement, locationElement, weather);
    });
}

function displayWeatherAuto() {
  displayWeatherInfo(iconElement, tempElement, descElement, locationElement, weather);
}


searchBtn.addEventListener('click', () => {
  const location = searchInput.value;
  getWeather(location);
});


function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

tempElement.addEventListener('click', () => {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit === 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});
