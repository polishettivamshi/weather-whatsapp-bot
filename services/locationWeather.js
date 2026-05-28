const axios = require('axios');    

// Assuming you have a config file or environment variables set up
const config = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY 
};

module.exports = async (lat, lon) => {
    try {
        const locationQuery = `${lat},${lon}`;
        const url = `https://api.weatherapi.com/v1/current.json?key=${config.WEATHER_API_KEY}&q=${locationQuery}&aqi=yes`;
        
        const response = await axios.get(url);
        const data = response.data;

        return `📍 Weather in ${data.location.name}:
🌡️ Temp: ${data.current.temp_c}°C
☁️ Condition: ${data.current.condition.text}
💧 Humidity: ${data.current.humidity}%
🌬️ Wind: ${data.current.wind_kph} km/h
😷 AQI: ${Math.round(data.current.air_quality.pm2_5)}`;

    } catch (error) {
        console.error('Weather API Error:', error.message);
        return '⚠️ Sorry, I could not fetch the weather for that location.';
    }
};