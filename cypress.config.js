// cypress.config.js en Cypress 10+
const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const xlsx = require("xlsx");



module.exports = defineConfig({
  viewportWidth: 2250,
  viewportHeight: 1750,
  e2e: {
        scrollBehavior: false, // 👈 Cypress NO hará scroll automático
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
      // on('before:browser:launch', (browser = {}, launchOptions) => {
      //   if (browser.family === 'chromium' && browser.name !== 'electron') {
      //     launchOptions.args.push('--enable-notifications');
      //     launchOptions.args.push('--disable-popup-blocking');
      //   }
      //   return launchOptions;
      // });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {

          // 🚀 Dar permiso explícito para notificaciones
          launchOptions.preferences = {
            ...(launchOptions.preferences || {}),
            profile: {
              ...(launchOptions.preferences?.profile || {}),
              default_content_setting_values: {
                notifications: 1,     // 1 = permitir, 2 = bloquear
              },
            },
          };

          launchOptions.args.push('--disable-popup-blocking');
          launchOptions.args.push('--disable-notifications'); // evitar banners del propio Chrome
        }
        return launchOptions;
      });



      on('task', {
        listarHojasExcel({ filePath }) {
          const xlsx = require("xlsx");
          const workbook = xlsx.readFile(filePath);
          return workbook.SheetNames;
        }
      });

      on("task", {
        async readExcelToJson({ filePath, hoja = null, timeout = 60000, interval = 3000 }) {
          const absPath = path.resolve(filePath);
          const start = Date.now();

          // Esperar hasta que el archivo exista o se cumpla el timeout
          while (true) {
            if (fs.existsSync(absPath)) {
              break; // Archivo encontrado
            }
            if (Date.now() - start > timeout) {
              throw new Error(`Timeout: No se encontró el archivo en ${absPath} dentro de ${timeout}ms`);
            }
            await new Promise(r => setTimeout(r, interval)); // esperar un poco antes de volver a intentar
          }

          // Leer el archivo cuando ya esté disponible
          const workbook = xlsx.readFile(absPath);

          if (!hoja) {
            const result = {};
            workbook.SheetNames.forEach(sheetName => {
              const worksheet = workbook.Sheets[sheetName];
              result[sheetName] = xlsx.utils.sheet_to_json(worksheet);
            });
            return result;
          }

          const worksheet = workbook.Sheets[hoja];
          if (!worksheet) {
            throw new Error(`La hoja "${hoja}" no existe en el archivo Excel`);
          }

          return xlsx.utils.sheet_to_json(worksheet);
        }
      });

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
      on("task", {
        saveExcel({ filePath, data }) {
          const absPath = path.resolve(filePath);
          fs.writeFileSync(absPath, data, "binary");
          return null;
        }
      });
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
          return config;
    },
    
  },
});