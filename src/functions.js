/* eslint-disable no-param-reassign, import/prefer-default-export */
function displayWeatherInfo(iconElement, tempElement, descElement, locationElement, weather) {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

export { displayWeatherInfo };
