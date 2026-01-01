const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

const MailosaurClient = require("mailosaur"); // 1. Import the Mailosaur client


require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },

  e2e: {
    baseUrl: 'https://practice.expandtesting.com',
    screenshotOnRunFailure: true,
    video: true,
    defaultCommandTimeout: 10000,
    retries: { runMode: 1, openMode: 0 },
    supportFile: 'cypress/support/e2e.js',

    env: {
      MAILOSAUR_SERVER_ID: process.env.MAILOSAUR_SERVER_ID,
      MAILOSAUR_API_KEY: process.env.MAILOSAUR_API_KEY
    },

    setupNodeEvents(on, config) {
      console.log("Server ID:", config.env.MAILOSAUR_SERVER_ID);
      console.log("API Key:", config.env.MAILOSAUR_API_KEY);

      // Tasks
      on("task", {


        getOtpFromMailosaur(emailAddress) {
          const client = new MailosaurClient(config.env.MAILOSAUR_API_KEY); 
          const serverId = config.env.MAILOSAUR_SERVER_ID;

          return client.messages
            .get(serverId, { sentTo: emailAddress }, { timeout: 20000 })
            .then(msg => {
              if (!msg.text || !msg.text.codes || msg.text.codes.length === 0) {
                throw new Error("No OTP found in the email!");
              }
              return msg.text.codes[0].value;
            });
        },


        clearDownloads() {
          const downloadsFolder = config.downloadsFolder || path.join(process.cwd(), 'cypress', 'downloads');
          if (!fs.existsSync(downloadsFolder)) fs.mkdirSync(downloadsFolder, { recursive: true });
          const files = fs.readdirSync(downloadsFolder);
          for (const file of files) {
            try { fs.unlinkSync(path.join(downloadsFolder, file)); } catch { }
          }
          return null;
        },

        readDownloadedFile({ filePath, encoding = 'utf8' }) {
          return fs.readFileSync(filePath, encoding);
        }
      });

      mochawesome(on);
      return config;
    }
  }
});
