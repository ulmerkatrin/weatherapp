const apiKey = "234180b1fac3cd52a404393etbea103o";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

var weatherIcon = document.querySelector('.weather-icon');
var cityElement = document.querySelector('.city');
var tempElement = document.querySelector('.temp');
var humidityElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind');
var weatherDetails = document.querySelector('.weather-details');

weatherDetails.style.display = 'none';

async function checkWeather(city) {
    if (!city) {
        weatherDetails.style.display = 'none';
        return;
    }

    
    const response = await fetch(
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    );
    var data = await response.json();

    console.log(data);

    
    if (data.city) {
        weatherDetails.style.display = 'block';

       
        cityElement.innerHTML = data.city;
        tempElement.innerHTML = Math.round(data.temperature.current) + '°C';
        humidityElement.innerHTML = data.temperature.humidity + '%';
        windElement.innerHTML = data.wind.speed + ' km/h';

        
        if (data.condition.description.includes('cloud')) {
            weatherIcon.src = 'src/img/cloudy-icon.svg';
        } else if (data.condition.description.includes('clear')) {
            weatherIcon.src = 'src/img/egg-sunny-side-up-icon.svg';
        } else if (data.condition.description.includes('rain')) {
            weatherIcon.src = 'src/img/rain-icon.svg';
        } else if (data.condition.description.includes('drizzle')) {
            weatherIcon.src = 'src/img/cloud-drizzle-icon.svg';
        } else if (data.condition.description.includes('mist') || data.condition.description.includes('fog')) {
            weatherIcon.src = 'src/img/mist-icon.svg';
        } else if (data.condition.description.includes('snow')) {
            weatherIcon.src = 'src/img/snowing-icon.svg';
        }
    } else {
        weatherDetails.style.display = 'none';
        alert("City not found!");
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