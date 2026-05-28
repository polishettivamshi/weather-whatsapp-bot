// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const util = require('util');

// // Temporary testing: bypass cooldown in-process
// process.env.BYPASS_COOLDOWN = process.env.BYPASS_COOLDOWN || '1';
// const os = require('os');
// const path = require('path');

// // Handlers
// const handleMessage = require('./handlers/messageHandler');

// // Scheduled Jobs
// const startWeatherJob = require('./scheduler/weatherJob');
// const startMorningJob = require('./scheduler/morningJob');
// const startEveningJob = require('./scheduler/eveningJob');
// const startAlertJob = require('./scheduler/alertJob');

// // Global Error Handlers
// process.on('uncaughtException', err => {
//     console.log(
//         'Uncaught Exception:',
//         err.message
//     );
// });

// process.on('unhandledRejection', err => {
//     console.log(
//         'Unhandled Rejection:',
//         err
//     );
// });

// // Create WhatsApp Client
// const client = new Client({
//     // Store session data in a unique temp directory per run to avoid file locks
//     // (use PID+timestamp so concurrent runs won't collide)
//     authStrategy: new LocalAuth({
//         dataPath: path.join(
//             os.tmpdir(),
//             `whatsapp-weather-bot-session-${process.pid}-${Date.now()}`
//         )
//     }),
//     puppeteer: {
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage'
//         ]
//     }
// });

// // QR Event
// client.on('qr', qr => {
//     console.log('\n');
//     console.log('=================================');
//     console.log('📱 Scan QR Code Below');
//     console.log('=================================');
//     console.log('\n');

//     qrcode.generate(qr, { small: true });
// });

// // Loading Screen
// client.on('loading_screen', (percent, message) => {
//     console.log('Loading:', percent, message);
// });

// // Ready Event
// client.on('ready', () => {
//     console.log('\n');
//     console.log('=================================');
//     console.log('🌦️ Weather Assistant Bot Ready');
//     console.log('=================================');
//     console.log('\n');

//     // Start Scheduled Jobs
//     startWeatherJob(client);
//     startMorningJob(client);
//     startEveningJob(client);
//     startAlertJob(client);
// });

// client.on('group_join', async (notification) => {
//     // notification.id.remote is the group ID
//     // notification.recipientIds is an array of user IDs who joined
    
//     console.log('User joined group:', notification.recipientIds);

//     for (const userId of notification.recipientIds) {
//         try {
//             // Send a welcome message privately
//             await client.sendMessage(userId, 
//                 "👋 Hello! I am your Weather Assistant. " +
//                 "I see you just joined the group. " +
//                 "You can chat with me here privately or in the group! " +
//                 "Send 'hi' to see the main options"
//             );
//         } catch (err) {
//             console.log(`Could not DM user ${userId}:`, err.message);
//         }
//     }
// });

// // Authentication Success
// client.on('authenticated', () => {
//     console.log('✅ WhatsApp Authenticated');
// });

// // Authentication Failure
// client.on('auth_failure', msg => {
//     console.log('❌ Authentication Failed');
//     console.log(msg);
// });

// // Disconnected Event
// client.on('disconnected', reason => {
//     console.log('⚠️ WhatsApp Disconnected');
//     console.log(reason);
// });

// // Message Event
// client.on('message', async message => {
//     // Log minimal raw message info to help debug group messages
//     // console.log('RAW MESSAGE:', {
//     //     from: message.from,
//     //     author: message.author || null,
//     //     body: message.body || null,
//     //     type: message.type,
//     //     fromMe: !!message.fromMe
//     // });

//     // Verbose dump for debugging (prints nested object shape)
//     // try {
//     //     // console.log('VERBOSE RAW MESSAGE:', util.inspect(message, { depth: 5 }));
//     //     // Also print raw _data if present (whatsapp-web.js internal)
//     //     if (message._data) 
//     //         // console.log('VERBOSE RAW _data:', util.inspect(message._data, { depth: 5 }));
//     // } catch (e) {
//     //     console.log('Failed to inspect message verbose:', e && e.message);
//     // }

//     try {
//         // Ignore own messages
//         // if (message.fromMe) return;

//         // Ignore status updates
//         if (message.from === 'status@broadcast') return;

//         await handleMessage(client, message);
//     } catch (err) {
//         console.log('Message Handler Error:', err.message);
//     }
// });

// // Initialize Client
// client.initialize();


const { Client } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const handleMessage = require('./handlers/messageHandler');
const startWeatherJob = require('./scheduler/weatherJob');
const startMorningJob = require('./scheduler/morningJob');
const startEveningJob = require('./scheduler/eveningJob');
const startAlertJob = require('./scheduler/alertJob');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("✅ Connected to MongoDB");

    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new MongoStore({ store: store }),
        puppeteer: {
            // This path is mandatory for the Puppeteer Docker image
            executablePath: '/usr/bin/google-chrome-stable',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        }
    });

    client.on('qr', qr => qrcode.generate(qr, { small: true }));

    client.on('ready', () => {
        console.log('🌦️ Weather Assistant Bot Ready');
        startWeatherJob(client);
        startMorningJob(client);
        startEveningJob(client);
        startAlertJob(client);
    });

    client.on('message', async message => {
        if (message.from === 'status@broadcast') return;
        try {
            await handleMessage(client, message);
        } catch (err) { console.log('Handler Error:', err.message); }
    });

    client.initialize();
}).catch(err => console.error("❌ MongoDB Connection Error:", err));