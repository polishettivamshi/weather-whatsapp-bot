const axios = require('axios');

const config =
require('../config/config');

const formatWeatherMessage =
require('../utils/formatter');

module.exports =
async (city) => {

    const url =
`https://api.weatherapi.com/v1/current.json?key=${config.WEATHER_API_KEY}&q=${city}&aqi=yes`;

    const response =
    await axios.get(url);

    const data =
    response.data;

    return formatWeatherMessage({

        location:
        data.location.name,

        region:
        data.location.region,

        country:
        data.location.country,

        temperature:
        data.current.temp_c,

        feelsLike:
        data.current.feelslike_c,

        humidity:
        data.current.humidity,

        wind:
        data.current.wind_kph,

        condition:
        data.current.condition.text,

        airQuality:
        data.current.air_quality.pm2_5,

        updated:
        data.current.last_updated

    });

};