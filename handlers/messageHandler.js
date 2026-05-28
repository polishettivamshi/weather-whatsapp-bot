const menu = require('../utils/menu');
const getCurrentWeather = require('../services/weatherService');
const getLocationWeather = require('../services/locationWeather');
const getCityWeather = require('../services/cityWeather');
const allowRequest = require('../utils/cooldown');

module.exports = async (client, message) => {
    try {
        if (message.from === 'status@broadcast') return;
        if (!message.body && message.type !== 'location') return;

        const senderId = message.author || message.from;
        
        if (!allowRequest(senderId)) return;

        const text = (message.body || '').toLowerCase().trim();
        const greetings = ['hi', 'hello', 'hey', 'menu', 'start', 'help', 'bot'];
        
        const cleaned = text.replace(/[^ - \p{L}\p{N}\s]/gu, ' ').trim();
        const tokens = cleaned.split(/\s+/).filter(Boolean);
        const isGreeting = tokens.some(t => greetings.includes(t));

        // Helper to send privately
        const sendPrivate = async (content) => {
            await client.sendMessage(senderId, content);
        };

        // GREETINGS
        if (isGreeting || text === '9') {
            await sendPrivate(menu);
            if (message.author) await message.reply("✅ I've sent the menu to your private chat!");
            return;
        }

        // WEATHER CITY
        if (text && text.startsWith('weather ')) {
            const city = text.replace('weather ', '');
            const weather = await getCityWeather(city);
            await sendPrivate(weather);
            if (message.author) await message.reply("✅ I've sent the weather info to your private chat!");
            return;
        }

        // COMMANDS 1-8
        const commands = {
            '1': await getCurrentWeather(),
            '2': `🌡️ Current Temperature\n\n${(await getCurrentWeather(true)).temperature}°C`,
            '3': `💧 Current Humidity\n\n${(await getCurrentWeather(true)).humidity}%`,
            '4': `🌬️ Wind Speed\n\n${(await getCurrentWeather(true)).wind} km/h`,
            '5': `😷 Air Quality\n\nPM2.5 AQI: ${Math.round((await getCurrentWeather(true)).airQuality)}`,
            '6': `🌧️ Rain Status\n\n☁️ Condition: ${(await getCurrentWeather(true)).condition}`,
            '7': `📍 To send location:\n\n1️⃣ Tap 📎 attachment\n2️⃣ Select Location\n3️⃣ Send Current Location\n\n🌦️ I will instantly fetch weather.`,
            '8': `📅 Today's Forecast\n\n🌡️ Temp: ${(await getCurrentWeather(true)).temperature}°C\n☁️ Condition: ${(await getCurrentWeather(true)).condition}\n💧 Humidity: ${(await getCurrentWeather(true)).humidity}%\n🌬️ Wind: ${(await getCurrentWeather(true)).wind} km/h`
        };

        if (commands[text]) {
            await sendPrivate(commands[text]);
            if (message.author) await message.reply("✅ I've sent the requested info to your private chat!");
            return;
        }

        // LOCATION
        if (message.type === 'location') {
            const weather = await getLocationWeather(message.location.latitude, message.location.longitude);
            await sendPrivate(weather);
            if (message.author) await message.reply("✅ I've sent your location-based weather to your private chat!");
            return;
        }

    } catch (err) {
        console.log('Message handler failed:', err.message);
        await message.reply("⚠️ Something went wrong. Please check your private chat or try again later.");
    }
};