const searchValue = document.getElementById('search__value');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature')
const description = document.querySelector('.js-description');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const form = document.querySelector('.js-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(searchValue.value !== null) {
        searchWeather();
    }
    e.target.reset();
})

async function searchWeather() {
    const API__ID2 ='fd6b76c8e2679888f33d973b19accda4';
    const url2 = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
    const city = searchValue.value.toLowerCase();

    try {
        const response = await fetch(url2 + '&q=' + city + '&appid=' + API__ID2);
        const weatherData = await response.json();

        console.log(weatherData);

        if(weatherData.cod !== 200) {
            throw new Error('City not found');
        } else {
            getCityName(weatherData.name);
            getCityFlag(weatherData.sys.country);
            getTemperatureImage(weatherData.weather[0].icon);
            getTemperature(weatherData.main.temp)
            description.innerText = weatherData.weather[0].description;
            getClouds(weatherData.clouds.all);
            humidity.innerText = weatherData.main.humidity;
            pressure.innerText = weatherData.main.pressure;
        }

    } catch (error) {
        console.error(error);
    }

    searchValue.value = '';
}

function getCityName(name) {
    const cityName = city.querySelector('figcaption');
    cityName.innerText = name;
}

function getCityFlag(flag) {
    const cityFlag = city.querySelector('img');
    cityFlag.src = `https://flagsapi.com/${flag}/shiny/32.png`;
}

function getTemperatureImage(img) {
    const image = temperature.querySelector('img');
    image.src = `https://openweathermap.org/img/wn/${img}@4x.png`
}

function getTemperature(temp) {
    const tempCelsius = temperature.querySelector('span');
    tempCelsius.innerText = temp;
}

function getClouds(cloud) {
    clouds.innerText = cloud
}

const initApp = () => {
    searchValue.defaultValue = 'indonesia';
    searchWeather();
}

initApp();