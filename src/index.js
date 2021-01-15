require('./css/styles.css');

const description = document.querySelector('.main');
const iconTag = document.querySelector('#iconWeather');
const mainTemp = document.querySelector('.mainTemp');
const maxTemp = document.querySelector('.maxTemp');
const minTemp = document.querySelector('.minTemp');
const windSpeed = document.querySelector('.windSpeed');
const cityElement = document.querySelector('.cityName');
const cityInput = document.querySelector('#cityInput');
const submit = document.querySelector('#submit');
const locationBtn = document.querySelector('#getLocationBtn');
const celOrFah = document.querySelector('#checkBox');
let userCity = 'London';

function fillElements({ name, weather, main, wind }) {
  cityElement.textContent = name;
  description.textContent = weather[0].description;
  icon = weather[0].icon;
  iconTag.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  mainTemp.innerHTML = `${main.temp}&#8451;`;
  maxTemp.innerHTML = `${main.temp_max}&#8451;`;
  minTemp.innerHTML = `${main.temp_min}&#8451;`;
  windSpeed.textContent = `Wind Speed: ${wind.speed}`;
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
  userCity = cityInput.value;
  fetchApi(userCity);
}

function accessUserLocation() {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    fetchGeoLocationApi(latitude, longitude);
  });
}

function checkUnits() {
  if (celOrFah.checked) {
    const mainTempNum = mainTemp.textContent.replace(/℃|℉/, '');
    const maxTempNum = maxTemp.textContent.replace(/℃|℉/, '');
    const minTempNum = minTemp.textContent.replace(/℃|℉/, '');
    mainTemp.innerHTML = `${((mainTempNum * 9) / 5 + 32).toFixed(2)}&#8457;`;
    maxTemp.innerHTML = `${((maxTempNum * 9) / 5 + 32).toFixed(2)}&#8457;`;
    minTemp.innerHTML = `${((minTempNum * 9) / 5 + 32).toFixed(2)}&#8457;`;
  } else {
    const mainTempNum = mainTemp.textContent.replace(/℉|℃/, '');
    const maxTempNum = maxTemp.textContent.replace(/℉|℃/, '');
    const minTempNum = minTemp.textContent.replace(/℉|℃/, '');
    console.log(mainTempNum);
    mainTemp.innerHTML = `${(((mainTempNum - 32) * 5) / 9).toFixed(2)}&#8457;`;
    maxTemp.innerHTML = `${(((maxTempNum - 32) * 5) / 9).toFixed(2)}&#8457;`;
    minTemp.innerHTML = `${(((minTempNum - 32) * 5) / 9).toFixed(2)}&#8457;`;
  }
}

submit.addEventListener('click', getUserInput);
cityInput.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    getUserInput();
  }
});
locationBtn.addEventListener('click', accessUserLocation);
celOrFah.addEventListener('click', checkUnits);
fetchApi(userCity);
