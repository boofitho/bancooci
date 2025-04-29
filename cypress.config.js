// cypress.config.js en Cypress 10+
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 70000, // 120 segundos

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--enable-notifications');
          launchOptions.args.push('--disable-popup-blocking');
        }
        return launchOptions;
      });
    },
  },
});
