const iconElement = document.querySelector(".weatherIcon");
const tempElement = document.querySelector(".temperature p");
const descElement = document.querySelector(".temperaturedescription p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather = {};

weather.temperature = {
    unit : 'celcius'
}

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

