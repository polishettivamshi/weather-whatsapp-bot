module.exports = (temp, condition) => {

    condition =
    condition.toLowerCase();

    if (condition.includes('rain')) {

        return '☔ Carry umbrella';

    }

    if (temp >= 38) {

        return '🥵 Stay hydrated';

    }

    if (temp <= 15) {

        return '🧥 Wear warm clothes';

    }

    return '☀️ Have a great day';

};