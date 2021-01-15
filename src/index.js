require('./css/styles.css');

let myCity = 'Baghdad';
// function fetchApi() {
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       return data;
//     });
// }

async function fetchApi(cityName) {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await result.json();
  const returnedData = data;
  console.log(returnedData);
}

fetchApi(myCity);
// console.log(fetchApi());
// console.log(fetchApi());
