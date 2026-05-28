const getEmoji =
require('./weatherEmoji');

const getTip =
require('./weatherTips');

module.exports = (data) => {

    const emoji =
    getEmoji(data.condition);

    const tip =
    getTip(
        data.temperature,
        data.condition
    );

    return `
            ${emoji} Weather Update
━━━━━━━━━━━━━━━━━━━━━━━━  
📍 Location: ${data.location}
🌡️ Temp: ${data.temperature}°C
🤔 Feels Like: ${data.feelsLike}°C
💧 Humidity: ${data.humidity}%
🌬️ Wind: ${data.wind} km/h
☁️ Condition: ${data.condition}
😷 Air Quality: ${Math.round(data.airQuality)}
💡 Tip: ${tip}
🕒 Time: ${data.updated}
━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Weather Assistant Bot
`;

};