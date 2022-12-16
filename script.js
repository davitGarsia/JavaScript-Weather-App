
('use strict');

const button = document.querySelector('.search');
const input = document.querySelector('.searchTerm');
const API = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = 'ce78f7a72d392f503448c8916c19ecac';

const state = {
  name: {},
  icon: {},
  temperature: {},
  weather: {},
};

const weather = async function (location) {
  try {
    const res = await fetch(`${API}${location}&appid=${API_KEY}`);
    const data = await res.json();

    // Name
    state.name = data.name;

    // icon
    state.icon = data.weather[0].icon;

    // Temperature
    state.temperature = {
      temp: data.main.temp,
      realTemp: data.main.feels_like,
    };

    // Weather
    state.weather = {
      curWeather: data.weather[0].main,
      description: data.weather[0].description,
    };
    console.log(data);
    render();
  } catch (err) {
    throw err;
  }
};

weather('Tbilisi');

button.addEventListener('submit', e => {
  e.preventDefault();
  weather(input.value);
  input.value = '';
});

const render = function () {
  document.querySelector('.city').innerText = state.name;
  document.querySelector('.temp').innerText = `${Math.round(
    state.temperature.temp - 273.15
  )}${'° C'}`;
  document.querySelector(
    '.real-feel'
  ).innerText = `${'Real Feel - '}${Math.round(
    state.temperature.realTemp - 273.15
  )}${'° C'}`;
  document.querySelector('.state').innerText = state.weather.curWeather;
  document.querySelector('.desc').innerText = state.weather.description;
  document.querySelector(
    '.icon'
  ).src = `https://openweathermap.org/img/wn/${state.icon}@2x.png`;
};

// input.addEventListener('keyup', e => {
//   if (e.keyCode === 13) {
//     e.preventDefault();
//     submit.click();
//   }
// });
