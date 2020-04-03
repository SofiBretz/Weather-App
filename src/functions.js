/* eslint-disable no-param-reassign, import/prefer-default-export */
function displayWeatherInfo(
  iconElement,
  tempElement,
  descElement,
  locationElement,
  weather
) {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function showError(notificationElement, error) {
  console.log('this is show');
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function displayTemperature(displayTempElement, displayGrades, weather) {
  if (displayGrades === 'celsius') {
    displayTempElement.innerHTML = `${weather}°<span>F</span>`;
  } else {
    displayTempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  }
}

export { displayWeatherInfo, showError, displayTemperature };
