require('./css/styles.css');

let myCity = 'baghdad';
let myUrl = `api.weatherapi.com/v1/current.json?key=bd962442b08549bca00173111211501&q=London`;

async function fetchApi(cityName) {
  try {
    const result = await fetch(
      'api.weatherapi.com/v1/current.json?key=bd962442b08549bca00173111211501&q=London'
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
// anotherFunc(myCity);
fetchApi(myCity);
// console.log(fetchApi());
// console.log(fetchApi());
