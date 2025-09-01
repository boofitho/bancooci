require("cypress-xpath");

//const ExcelReport = require("./ReporteExcel.cy");

//const ExcelReport = require("../support/PageObjects/Operation-view/ReporteExcel.cy.js");



class MetodosGenerales{

    
    ArchivoNubeV(URL_VARIABLES){

        const sheetUrl = URL_VARIABLES;

        // Hacer la petición para descargar el archivo como binario
        cy.request({
          url: sheetUrl,
          encoding: 'binary'
        }).then((response) => {
          // Guardar el archivo en la carpeta fixtures
          cy.writeFile('cypress/fixtures/variables.xlsx', response.body, 'binary');
        });
      }   


      // DescargaArchivo(URL_Datos){
      //   const sheetUrl2 = URL_Datos;

      //   cy.request({
      //     url: sheetUrl2,
      //     encoding: 'binary',
      //     method: 'GET',
      //     headers: {
      //       'accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      //     }
      //   }).then((response) => {
      //     // Convertir el binario a Buffer antes de escribirlo
      //     const fileBuffer = Buffer.from(response.body, 'binary');

      //     cy.writeFile('cypress/fixtures/datos.xlsx', fileBuffer, { encoding: 'binary' });
      //   });
      // }

      DescargaArchivoComplementos(URL_Datos, nombreArchivo){
        const sheetUrl2 = URL_Datos;

        cy.request({
          url: sheetUrl2,
          encoding: 'binary',
          method: 'GET',
          headers: {
            'accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((response) => {
          // Convertir el binario a Buffer antes de escribirlo
          const fileBuffer = Buffer.from(response.body, 'binary');

          cy.writeFile("cypress/fixtures/"+nombreArchivo+".xlsx", fileBuffer, { encoding: 'binary' });
        });
      }

      DescargaImagen(URL_Datos, nombreArchivo){
        const sheetUrl2 = URL_Datos;

        cy.request({
          url: sheetUrl2,
          encoding: 'binary',
          method: 'GET'
        }).then((response) => {
          const fileBuffer = Buffer.from(response.body, 'binary');
          cy.writeFile("cypress/fixtures/" + nombreArchivo + ".jpg", fileBuffer, { encoding: 'binary' });
        });
      }



      ArchivoNubeE(URL_ERRORES){
        const sheetUrl = URL_ERRORES;

        // Hacer la petición para descargar el archivo como binario
        cy.request({
          url: sheetUrl,
          encoding: 'binary'
        }).then((response) => {
          // Guardar el archivo en la carpeta fixtures
          cy.writeFile('cypress/fixtures/MensajeErrores.xlsx', response.body, 'binary');
        });
      }   
     
      Dashboard(URL){
      //nos volvemos al dashboard visitando la pagina indicada en cypress.config.js
      cy.visit(URL)
      cy.wait(3500)
      }

      Login(URL, Usuario, Password) {
      //visitamos la pagina indicada en cypress.config.js
      cy.visit(URL);
      cy.wait(1500);
      //buesca en el cuerpo de la pagina si aparece el selector
         cy.get('body').then(($body) => {
          if ($body.find('#username').length > 0) {

          cy.log('Se encontró el texto, ejecutando login');
          //validando campo usuario 
          cy.get("label").then(($label) => {
            if ($label.text().includes("Usuario o email")) {
              cy.get("input").eq(0).should("be.visible").type(Usuario);
            } else {
              // Si el label no contiene el texto esperado, muestra un log
              console.log("El label no tiene el texto esperado.");
              cy.log("El label no tiene el texto esperado.");
            }
          }
        )
          // Validando campo Contraseña
          cy.get("label").then(($label) => {
            if ($label.text().includes("Contraseña")) {
          // Si el texto del label es correcto, llena el campo desde el archivo json
          cy.get("input").eq(1).should("be.visible").type(Password);
          } else {
          // Si el label no contiene el texto esperado, muestra un log
          console.log("El label no tiene el texto esperado.");
          cy.log("El label no tiene el texto esperado.");
            }
          }
        )
            // Hacer clic en el botón de login
            cy.get("#kc-login").should("be.visible").click({ force: true });
            cy.wait(2000);
        } else {
          cy.log('Ya estás logeado.');
        }
      })
      cy.wait(2500)
      }

    Seleccionartransaccion(codigo,no){
        
        cy.get('input[name="code"]').should("be.visible").clear().type(codigo+"{enter}")
    }
    Combobox(datoJson){
      cy.get('.mat-form-field-infix > #mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper > .mat-select-arrow').click()
      cy.get('#mat-option-'+datoJson+' > .mat-option-text').click({ force: true })      //valor quemado hay que colocar la variable y debe de ser numero o consultando en la bd ecomparando con el  jsaon para comodidad del usuario final
      cy.wait(1000) 
    }
    input(label, datoJson) {
      cy.get(`input[data-placeholder="${label}"], input[id="${label}"]`)
        .should('not.be.disabled') // Espera a que el campo no esté deshabilitado
        .click({ force: true })
        .clear()
        .type(datoJson)
        .click({ force: true });
      cy.wait(500);
    }
    Autorizacion(UsuarioAut, PasswordAut,){
//            cy.xpath("/html/body/div[3]/div[2]/div/mat-dialog-container/bt-authorization-helper/div[2]/form/fieldset/mat-form-field[2]/div/div[1]/div[3]/input")
            cy.get('input[formcontrolname="username"][matinput], input[id="mat-input-16"], input[matinput][formcontrolname="username"], input[matinput][formcontrolname="username"][type="text"]')
            .clear()
            .type(UsuarioAut);
            cy.wait(100)                  
//            cy.xpath("/html/body/div[3]/div[2]/div/mat-dialog-container/bt-authorization-helper/div[2]/form/fieldset/mat-form-field[3]/div/div[1]/div[3]/input")
            cy.get('#mat-input-17, input[formcontrolname="passwordAuth"], input[type="password"], input[matinput][formcontrolname="passwordAuth"]')
            .clear()
            .type(PasswordAut)
            cy.wait(100)                  
            cy.contains('button', 'Aceptar').should('be.visible').click({ force: true });
            cy.wait(2500)                  

          }
    FirmaEncontrada(){
      cy.get('.mat-checkbox-inner-container').click()
      cy.wait(1500)
      cy.contains('button', 'Aceptar').click();
      cy.wait(500)
    }
    BtnAvanzar(no){
      const specificXPath = "/html/body/app-root/div[1]/app-transaction-summary/div/mat-toolbar/div[1]/button/span[1] ";
      const btnSelector = "/html/body/app-root/div[1]/app-transaction-summary/div/mat-toolbar/div[1]/button/span[1] | /html/body/app-root/div[1]/app-operate-transaction/div/mat-card/mat-card-content/mat-horizontal-stepper/div[2]/div[1]/form/div/div/button[1]/span[1]/mat-icon | /html/body/app-root/div[1]/app-operate-transaction/div/mat-card/mat-card-content/mat-horizontal-stepper/div[2]/div[2]/form/div/div/button[2] | /html/body/app-root/div[1]/app-transaction-summary/div/div[2]/div[2]/div/div[2]/app-summary-notifications/div/div/button";
      
      // Buscar el botón con el selector optimizado
        cy.xpath(btnSelector, { timeout: 3000 }).then(($el) => {
            // Si el botón está visible
            if ($el.eq.specificXPath) {
                // cy.screenshot(`Captura transaccion #${no} exitosa`);
                // cy.wait(420);
                // cy.xpath(specificXPath).click();
                // cy.log("Botón clickeado, entrando al manejo de errores.");
                // this.ManejoDeErrores(no);
            } else{
              cy.xpath(btnSelector).click(); 
              cy.wait(3000)
            }
          });
  }
  
  
    ManejoDeErrores(MjsBD, MjsTxt) {
  return new Cypress.Promise((resolve) => {  // 🔹 Asegurar que siempre devuelve una promesa
       
    let ArrayMjsUnido = MjsTxt.concat(MjsBD) 

    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      const hasError = ArrayMjsUnido.some(message => bodyText.includes(message));

      if (hasError) {
        cy.log('🛑 Error detectado, retornando TRUE');
        resolve(true);  // ✅ Se resuelve la promesa con "true"
      } else {
        cy.log('✅ No hay error, retornando FALSE');
        resolve(false); // ✅ Se resuelve la promesa con "false"
      }
    });
  }).catch((error) => {
    cy.log('❌ Error en ManejoDeErrores:', error);
    return false; // Devuelve false en caso de error
  });
}  


    //Boton confirmar
    BtnConfirmar(){
             //  pantalla fuera de los pasos resumen y confirmar resumen??
             cy.xpath("//span[contains(.,'Confirmar')]").click();
             cy.wait(3500)        
    }

    // //Boton Cancelar
    // BtnCancelar(){
    //     cy.wait(3000)
    //     cy.xpath("//mat-icon[contains(text(),'close')]").should("be.visible").click({force:true})
    //     cy.wait(3000)
    // }

    //Llenar campo cuenta cuenta 
    LlenarCuenta(cuenta){
        cy.xpath("//input[@id='Número de cuenta']").should("be.visible").type(cuenta)
        cy.wait(1000)
    }

    // //Llena Campo Efectivo fisico 
    // EfectivoFisico(monto){
    //     cy.xpath("//input[@id='Efectivo fisico']").should("be.visible").clear().type(monto)
    //     cy.wait(1000)
    // }

    // //llenar campo total
    // Total(total){
    //     cy.xpath("//input[@id='Total']").should("be.visible").clear().type(total)
    //     cy.wait(3000)
    // }


    CapturarSelectores(){

      let arraySelectors = [];

cy.get('input, select, textarea, button, mat-select') // Busca todos los elementos interactuables
  .each(($el) => {
    if ($el.is(':visible')) { // Solo agrega los elementos visibles
      let selector = getElementSelector($el);
      arraySelectors.push(selector);
    }
  })
  .then(() => {
    cy.log('Selectores detectados:', arraySelectors);
    cy.writeFile('cypress/reports/selectors.json', { selectors: arraySelectors }); // Guarda en un JSON
  });

// Función para obtener el selector único de un elemento
function getElementSelector($el) {
  let id = $el.attr('id');
  let name = $el.attr('name');
  let placeholder = $el.attr('data-placeholder');
  let label = $el.closest('label').text().trim(); 

  if (id) return `#${id}`;
  if (name) return `[name="${name}"]`;
  if (placeholder) return `[data-placeholder="${placeholder}"]`;
  if (label) return `label:contains("${label}")`;
  
  return $el.get(0).tagName.toLowerCase(); // Usa la etiqueta como fallback (ej: "input")
}


    }


    //Reporte excel 

    // GuardarReporte(datos) {
    //   const report = new ExcelReport();
    //   report.AgregarNuevaFila(datos);
    // }



    //Fin Metodos Generales

TipodePersona(persona){

  cy.wait(5000)
   cy.get(".loading", { timeout: 60000 }).should("not.exist");
cy.contains('label', persona, { timeout: 60000 }).should('be.visible').should('not.be.disabled').click({force:true});



}


}



export default MetodosGenerales;