const cooldowns = new Map();

module.exports = (userId) => {

    // Allow bypass for testing by setting environment variable
    // e.g. set BYPASS_COOLDOWN=1
    if (process.env.BYPASS_COOLDOWN === '1') {
        return true;
    }

    const now = Date.now();

    const cooldown = cooldowns.get(userId);

    // 5 second cooldown
    if (cooldown && now - cooldown < 5000) {
        return false;
    }

    cooldowns.set(userId, now);

    return true;
};