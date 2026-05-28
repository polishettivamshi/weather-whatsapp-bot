require('dotenv').config();

module.exports = {

    WEATHER_API_KEY: process.env.WEATHER_API_KEY,

    LATITUDE: process.env.LATITUDE,

    LONGITUDE: process.env.LONGITUDE,

    GROUP_ID: process.env.GROUP_ID,

    // Cron time format: 'Minute Hour DayOfMonth Month DayOfWeek'
    // '*/5 * * * *' = Every 5 minutes
    // '0 * * * *'   = Every 1 hour
    // '0 0 * * *'   = Every day at midnight
    // '0 8 * * *'   = Every day at 8:00 AM
    CRON_TIME: '0 * * * *'

};