const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl: 'https://demoblaze.com',
    defaultCommandTimeout: 10000,
    retries: { runMode: 1, openMode: 0 },
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // attach mochawesome reporter plugin
      mochawesome(on);

      // create results folder if missing
      const resultsFolder = path.join(process.cwd(), 'cypress', 'results');
      if (!fs.existsSync(resultsFolder)) {
        fs.mkdirSync(resultsFolder, { recursive: true });
      }

      // custom tasks (if needed)
      on('task', {
        clearDownloads() {
          const downloadsFolder = config.downloadsFolder || path.join(process.cwd(), 'cypress', 'downloads');
          if (!fs.existsSync(downloadsFolder)) fs.mkdirSync(downloadsFolder, { recursive: true });
          const files = fs.readdirSync(downloadsFolder);
          for (const file of files) {
            try { fs.unlinkSync(path.join(downloadsFolder, file)); } catch (err) { console.warn(err.message); }
          }
          return null;
        },
        readDownloadedFile({ filePath, encoding = 'utf8' }) {
          return fs.readFileSync(filePath, encoding);
        }
      });

      return config;
    }
  }
});
