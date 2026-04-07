const apiKey = "234180b1fac3cd52a404393etbea103o";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

var weatherIcon = document.querySelector('.weather-icon');
var cityElement = document.querySelector('.city');
var tempElement = document.querySelector('.temp');
var humidityElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind');
var weatherDetails = document.querySelector('.weather-details');
var forecastContainer = document.querySelector('.forecast-container');
var forecastGrid = document.getElementById('forecast-grid');

weatherDetails.style.display = 'none';
forecastContainer.style.display = 'none';

function getWeatherIcon(description) {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return 'src/img/cloudy-icon.svg';
    if (desc.includes('clear')) return 'src/img/egg-sunny-side-up-icon.svg';
    if (desc.includes('rain')) return 'src/img/rain-icon.svg';
    if (desc.includes('drizzle')) return 'src/img/cloud-drizzle-icon.svg';
    if (desc.includes('mist') || desc.includes('fog')) return 'src/img/mist-icon.svg';
    if (desc.includes('snow')) return 'src/img/snowing-icon.svg';
    return 'src/img/egg-sunny-side-up-icon.svg';
}

function getDayName(timestamp) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(timestamp * 1000).getDay()];
}

async function checkWeather(city) {
    if (!city) {
        weatherDetails.style.display = 'none';
        forecastContainer.style.display = 'none';
        return;
    }

    
    const currentResponse = await fetch(
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    );
    const data = await currentResponse.json();

    console.log('Current:', data);

    
    if (!data.city) {
        weatherDetails.style.display = 'none';
        forecastContainer.style.display = 'none';
        alert("City not found");
        return;
    }

    weatherDetails.style.display ='block';

       
        cityElement.innerHTML = data.city;
        tempElement.innerHTML = Math.round(data.temperature.current) + '°C';
        humidityElement.innerHTML = data.temperature.humidity + '%';
        windElement.innerHTML = data.wind.speed + ' km/h';

const descEl = document.querySelector('.description');
if (descEl) descEl.innerHTML = data.condition.description;

weatherIcon.src = getWeatherIcon(data.condition.description);

const forecastResponse = await fetch (
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
);
const forecastData = await forecastResponse.json();

console.log('Forecast:', forecastData);

if (forecastData.daily && forecastData.daily.length > 0) {
    forecastGrid.innerHTML = '';

const days = forecastData.daily.slice(1,6);

days.forEach(day => {
    const iconSrc = getWeatherIcon(day.condition.description);
    const temp = Math.round(day.temperature.day);
    const dayName = getDayName(day.time);
    const desc = day.condition.description;

    const card = document.createElement('div');
    card.classList.add('forecast-day');
    card.innerHTML = `
        <span class="day-name">${dayName}</span>
        <img src="${iconSrc}" alt="${desc}">
        <span class="day-temp">${temp}°C</span>
        <span class="day-desc">${desc}</span>
    `;
    forecastGrid.appendChild(card);
});

    forecastContainer.style.display = 'block';
    } else {
        forecastContainer.style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});