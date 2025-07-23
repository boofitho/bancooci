// cypress.config.js en Cypress 10+
const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');


module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
  e2e: {
      env: {
        //variable quemada
          URL_VAR: "https://docs.google.com/spreadsheets/d/1Ntg_ZTAUnRiKHy4ozomyN15Jv99ZB3yCF4u7l3aHsrg/export?format=xlsx",
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
      //leer archivo
      on('task', {
        readExcelToJson({ filePath }) {
            const xlsx = require("xlsx");
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            return jsonData;
        },
      });
      //FIN leer archivo

      //Eliminar archivos 
      on('task', {
        deleteAllFiles(folderPath) {
          if (!fs.existsSync(folderPath)) {
            console.log(`📁 La carpeta no existe: ${folderPath}`);
            return null;  // No hacer nada si no existe
          }

          fs.readdirSync(folderPath).forEach(file => {
            const filePath = path.join(folderPath, file);
            if (fs.lstatSync(filePath).isFile()) {
              fs.unlinkSync(filePath);
            }
          });
          console.log(`✅ Archivos eliminados de: ${folderPath}`);
          return null;
        }
      });
      //Fin Eliminar archivos 
      //contar cantidad de filas
      on('task', {
        contarFilasExcel() {
          const filePath = path.join(__dirname, 'datos.xlsx'); // Cambia al nombre real
          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0]; // Toma la primera hoja
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = xlsx.utils.sheet_to_json(worksheet);

          return jsonData.length; // Retorna la cantidad de filas
        }
      });
      //FIN contar cantidad de filas
    },
  },
});