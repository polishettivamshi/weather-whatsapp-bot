# 🌦️ Weather Assistant Bot

A powerful WhatsApp bot built with `whatsapp-web.js` that provides real-time weather updates, forecasts, and air quality data directly in your chats.

## 🚀 Features

* **Real-time Weather:** Get current temperature, humidity, wind, and AQI.
* **Location-based Updates:** Send your location to get hyper-local weather reports.
* **Private DMs:** Detailed weather information is delivered privately to your DMs to keep group chats clean.
* **Automated Scheduling:** Periodic weather alerts for your group.

## 🛠️ Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) installed (v16 or higher recommended).
* A WhatsApp account.

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <your-folder-name>

```


2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the root directory and add your keys:
```env
WEATHER_API_KEY=your_weather_api_key_here
GROUP_ID=your_whatsapp_group_id_here

```



### Running the Bot

Start the bot using:

```bash
npm start

```

Scan the QR code that appears in your terminal with your WhatsApp app (Linked Devices).

## 🤖 Commands

| Command | Action |
| --- | --- |
| `hi` / `menu` | Displays the main menu in your private chat |
| `weather [city]` | Get weather for a specific city |
| `1` - `8` | Various weather metrics (Temp, Humidity, Forecast, etc.) |
| **Location** | Send location via 📎 to get local weather |

## 🛡️ Privacy

This bot is designed to keep group chats tidy. When you request detailed information, the bot will automatically send the response to your private direct message (DM) chat.

---

### Deployment Tip

When you are ready to deploy this for free on a service like Render or Railway, remember to:

* Set your `WEATHER_API_KEY` in the platform's **Environment Variables** settings.
* Ensure your `authStrategy` is configured to save sessions to a persistent folder or a database so you don't have to scan the QR code after every restart.