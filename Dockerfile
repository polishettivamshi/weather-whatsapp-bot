# Use the official Puppeteer image
FROM ghcr.io/puppeteer/puppeteer:latest

# Switch to root to perform installations
USER root

WORKDIR /app

# Copy only package files to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

CMD ["node", "bot.js"]