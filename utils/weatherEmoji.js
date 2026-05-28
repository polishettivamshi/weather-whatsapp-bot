module.exports = (condition) => {

    const text =
    condition.toLowerCase();

    if (text.includes('sun'))
        return '☀️';

    if (text.includes('clear'))
        return '🌤️';

    if (text.includes('cloud'))
        return '☁️';

    if (text.includes('rain'))
        return '🌧️';

    if (text.includes('storm'))
        return '⛈️';

    if (text.includes('snow'))
        return '❄️';

    return '🌦️';

};