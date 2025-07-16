// cypress.config.js en Cypress 10+
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
  e2e: {
     env: {
        //variable quemada
          URL_VAR: "https://docs.google.com/spreadsheets/d/1OYnT7JuEha9xT1_KgyU_gIimNihaCpFdSXwWB3c2rnw/export?format=xlsx",
      },
    testIsolation: false, //Default blank page
    pageLoadTimeout: 70000, // 120 segundos
   chromeWebSecurity: false,
   experimentalSessionAndOrigin: true, // necesario para cy.origin
   preserveOnceAfterEach: true,

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