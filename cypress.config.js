// cypress.config.js en Cypress 10+
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
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
//gsdfgsf4s5g4f5g5df4