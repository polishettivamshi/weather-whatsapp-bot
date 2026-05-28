const cron = require('node-cron');

const getWeather =
require('../services/weatherService');

const sendMessage =
require('../services/whatsappService');

module.exports = (client) => {

    // Every 30 mins
    cron.schedule('*/30 * * * *', async () => {

        const data =
        await getWeather(true);

        const condition =
        data.condition.toLowerCase();

        if (
            condition.includes('rain') ||
            condition.includes('storm')
        ) {

            await sendMessage(
                client,

`⚠️ Weather Alert

🌧️ Rain/Storm detected

☔ Carry umbrella
🚗 Drive safely`
            );

        }

        if (data.temperature >= 40) {

            await sendMessage(
                client,

`🥵 Heatwave Alert

Current Temp:
${data.temperature}°C

💧 Stay hydrated`
            );

        }

        if (data.airQuality >= 150) {

            await sendMessage(
                client,

`😷 Air Quality Alert

AQI:
${Math.round(data.airQuality)}

Avoid outdoor exposure`
            );

        }

    });

};