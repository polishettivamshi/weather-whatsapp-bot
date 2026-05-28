const cron = require('node-cron');

const getWeather =
require('../services/weatherService');

const sendMessage =
require('../services/whatsappService');

module.exports = (client) => {

    // 7 PM daily
    cron.schedule('0 19 * * *', async () => {

        const weather =
        await getWeather();

        const message =
`🌇 Evening Weather Summary

${weather}

Good Night 🌙`;

        await sendMessage(
            client,
            message
        );

    });

};