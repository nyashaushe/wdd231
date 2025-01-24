const apiKey = 'd2c3fc0a58effaf83639444df2b2a0db'; // Replace with your OpenWeatherMap API key
const location = 'Harare, ZW'; // Change this to your desired city and country

async function fetchWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('.weather').innerHTML = '<p>Unable to fetch weather data.</p>';
    }
}

function displayWeather(data) {
    const { main, weather, wind, name } = data;

    const weatherHtml = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Condition:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;

    document.querySelectorbyId('.current-weather').innerHTML = weatherHtml;
}

// Call the function to fetch and display weather data
fetchWeather();



