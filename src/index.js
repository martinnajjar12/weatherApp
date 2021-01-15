require('./css/styles.css');

const description = document.querySelector('.main');
const iconTag = document.querySelector('#iconWeather');
const mainTemp = document.querySelector('.mainTemp');
const maxTemp = document.querySelector('.maxTemp');
const minTemp = document.querySelector('.minTemp');
const windSpeed = document.querySelector('.windSpeed');
const cityElement = document.querySelector('.cityName');
let myCity = 'baghdad';

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
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`
    );
    const data = await result.json();
    fillElements(data);
  } catch (err) {
    console.log(err);
  }
}

fetchApi(myCity);
