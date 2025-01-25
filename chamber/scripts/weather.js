//apiKey = d2c3fc0a58effaf83639444df2b2a0db


document.addEventListener('DOMContentLoaded', function () {
    // my classes are current-weather, weather-forecast
    // Define the elements to display the weather data
    const currentWeatherContainer = document.querySelector('.current-weather');
    const weatherForecastContainer = document.querySelector('.weather-forecast');

    // Set up the city for which you want to display the weather (e.g., Harare)
    const city = "Harare,ZW"; 
    const apiKey = "d2c3fc0a58effaf83639444df2b2a0db"; 
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const iconCode = data.weather[0].icon;

                currentWeatherContainer.innerHTML = `
                    <h3>Current Weather in ${data.name}</h3>
                    <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherDescription}" />
                    <p>${weatherDescription}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            } else {
                currentWeatherContainer.innerHTML = `<p>Error fetching weather data.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            currentWeatherContainer.innerHTML = '<p>Error fetching weather data.</p>';
        });

    // Fetch weather forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                let forecastHTML = `<h3>3-Day Weather Forecast</h3>`;
                data.list.forEach((forecast, index) => {
                    // Only display the forecast for every 8th hour (the 3-hour intervals from OpenWeatherMap)
                    if (index % 8 === 0) {
                        const date = new Date(forecast.dt * 1000);
                        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
                        const weatherDescription = forecast.weather[0].description;
                        const temperature = forecast.main.temp;
                        const iconCode = forecast.weather[0].icon;

                        forecastHTML += `
                            <div class="forecast-card">
                                <p><strong>${weekday.toLocaleString()}</strong></p>
                                <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherDescription}" />
                                <p>Temperature: ${temperature}°C</p>
                            </div>
                        `;
                    }
                });
                weatherForecastContainer.innerHTML = forecastHTML;
            } else {
                weatherForecastContainer.innerHTML = '<p>Error fetching forecast data.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            weatherForecastContainer.innerHTML = '<p>Error fetching forecast data.</p>';
        });
});


