const cron = require('node-cron');

const getWeather =
require('../services/weatherService');

const sendMessage =
require('../services/whatsappService');

module.exports = (client) => {

    // Every day 7 AM
    cron.schedule('0 7 * * *', async () => {

        const weather =
        await getWeather();

        const message =
`🌅 Good Morning

${weather}

Have a wonderful day ☀️`;

        await sendMessage(
            client,
            message
        );

    });

};