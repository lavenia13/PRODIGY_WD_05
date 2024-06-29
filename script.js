const apiKey = '2b47f16f12ee151fbfe0ee0aeca79f08';

async function getWeatherByInput() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        console.error('Location input is empty');
    }
}

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    if (data.cod !== 200) {
        console.error('Error in API response:', data.message);
        return;
    }

    const locationName = document.getElementById('location-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');

    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
