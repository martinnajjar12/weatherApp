require('./css/styles.css');

let myCity = 'baghdad';

async function fetchApi(cityName) {
  try {
    const result = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`
    );
    const data = await result.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

fetchApi(myCity);
