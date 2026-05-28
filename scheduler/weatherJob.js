const cron = require('node-cron');

const config = require('../config/config');

const getWeatherMessage = require('../services/weatherService');

const sendWhatsAppMessage = require('../services/whatsappService');

module.exports = (client) => {

    // Send immediately on startup
    runJob(client);

    // Then every hour
    cron.schedule(config.CRON_TIME, async () => {

        await runJob(client);

    });

};

async function runJob(client) {

    try {

        console.log('Fetching weather...');

        const message = await getWeatherMessage();

        await sendWhatsAppMessage(client, message);

        console.log('Weather sent successfully');

    } catch (err) {

        console.log('Weather job failed');

        console.log(err.message);

    }

}