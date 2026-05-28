const config = require('../config/config');

module.exports = async (client, message) => {

    await client.sendMessage(
        config.GROUP_ID,
        message
    );

};