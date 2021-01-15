require('./css/styles.css');

const description = document.querySelector('.main');
const iconTag = document.querySelector('#iconWeather');
const mainTemp = document.querySelector('.mainTemp');
const maxTemp = document.querySelector('.maxTemp');
const minTemp = document.querySelector('.minTemp');
const windSpeed = document.querySelector('.windSpeed');
const cityElement = document.querySelector('.cityName');
const submit = document.querySelector('#submit');
const locationBtn = document.querySelector('#getLocationBtn');
let userCity = 'London';

function fillElements({ name, weather, main, wind }) {
  cityElement.textContent = name;
  description.textContent = weather[0].description;
  icon = weather[0].icon;
  iconTag.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  mainTemp.textContent = main.temp;
  maxTemp.textContent = main.temp_max;
  minTemp.textContent = main.temp_min;
  windSpeed.textContent = wind.speed;
}

async function fetchApi(cityName) {
  try {
    const result = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}&units=metric`
    );
    const data = await result.json();
    fillElements(data);
  } catch (err) {
    console.log(err);
  }
}

async function fetchGeoLocationApi(lat, lon) {
  try {
    const result = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
    );
    const data = await result.json();
    fillElements(data);
  } catch (err) {
    console.log(err);
  }
}

function getUserInput() {
  const cityInput = document.querySelector('#cityInput');
  userCity = cityInput.value;
  fetchApi(userCity);
}

function accessUserLocation() {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    fetchGeoLocationApi(latitude, longitude);
  });
}

submit.addEventListener('click', getUserInput);
locationBtn.addEventListener('click', accessUserLocation);
fetchApi(userCity);
