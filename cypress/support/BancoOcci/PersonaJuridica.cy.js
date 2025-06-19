require('cypress-xpath');
import 'cypress-plugin-tab';

class PesonaJuridica{

      test(){
        cy.log("test")
      }

 
      BusquedaCliente(tipoDocumento, InfoTipoDocumento){
        cy.wait(420) 
        //click en operacion
        cy.get('body').then(() => {
            cy.xpath('/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer[1]/div/div[2]/mat-nav-list/div[1]/a/span/span/mat-icon[2]')
              .then($el => {
                if ($el.length > 0) {
                  cy.wrap($el).click();
                } else {
                  cy.log('Elemento no encontrado');
                }
            });
        });
        cy.wait(420)  
        //clien en busqueda de clientes
        cy.get('body').then(() => {
        cy.xpath('/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer[1]/div/div[2]/mat-nav-list/div[1]/mat-nav-list/a[1]/span')
          .then($el => {
            if ($el.length > 0) {
              cy.wrap($el).click();
            } else {
              cy.log('Elemento no encontrado');
            }
          });
        });
        // Espera a que aparezcan las opciones (ajusta si tu app necesita más tiempo)
        cy.wait(2500);
        //ingreso tipoDocumento
        cy.get('body').then(() => {
            cy.xpath('/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-search-person/div[1]/form/div/div[1]/div/app-auto-complete/section/mat-form-field/div[1]/div/div[2]/input')
              .then($el => {
                if ($el.length > 0) {
                  // Hace clic en el input para abrir las opciones de autocompletado
                  cy.wrap($el).click({ force: true });
                        // Espera a que aparezcan las opciones (ajusta si tu app necesita más tiempo)
                  cy.wait(500);
                        // Selecciona tipo de documento
                  cy.get('mat-option').eq(tipoDocumento).click({ force: true })
                  .wait(500)
                  //ingresa la informacion del tipo de documento
                  cy.xpath("/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-search-person/div[1]/form/div/div[1]/div/app-input-material/form/mat-form-field/div[1]/div/div[2]/input").type(InfoTipoDocumento); // Luego escribe el valor   
                    } else {
                  cy.log('No se encontró el input de tipo de documento');
                }
            });
          });
          cy.wait(420)
          cy.xpath("/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-search-person/div[1]/form/div/div[3]/div[2]/button[2]").click({ force: true })
          cy.wait(5000)       
      }

      AgregarCliente(){
        cy.xpath("/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-search-person/div[1]/form/div/div[3]/div[2]/button[1]").click({ force: true })
        //click cliente
        cy.xpath("/html/body/div[1]/div[2]/div/div/div/button[1]").click({ force: true })
      }
      
      //registro cliente paso 1 
      Identificacion(TipoPersona, cedula, passaporte, partidaNacimiento, RTN, CodT, Ubicacion, fechaExp){
        // Natural ó Juridica
        let xpathNatural= "/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/div/span/mat-radio-group/mat-radio-button[1]"
        let xpathJuridica= "/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/div/span/mat-radio-group/mat-radio-button[2]"
        let xpathRTN="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr/td[1]/mat-form-field/div[1]/div/div[2]/input"
        let xpathCedula="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr[1]/td[1]/mat-form-field/div[1]/div/div[2]/input"
        let xpathPasaporte="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr[1]/td[1]/mat-form-field/div[1]/div/div[2]/input"
        let xpathPartidaNacimiento="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr[3]/td[1]/mat-form-field/div[1]/div/div[2]/input"
        let xpathCodT="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr[5]/td[1]/mat-form-field/div[1]"
        let xpathUbicacion="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr[1]/td[2]/mat-form-field/div[1]/div/div[2]/input"
        let xpathUbicacionList="/html/body/div[1]/div[2]/div"
        let xpathFechaExp="/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer-content/app-create-client/div/dyna-flow/mat-stepper/div[1]/div/div/div/app-identifications/div/app-documents-wrapper/app-documents/form/table/tbody/tr[1]/td[2]/mat-form-field/div[1]/div/div[2]/input"
        
        cy.wait(20000)
        if (TipoPersona==0){
          //seleccionamos tipo de persona
          cy.xpath(xpathNatural).click();
          cy.wait(420)
          //llenamos formulario
          this.IngresoDatosTXT(xpathCedula, cedula)
          this.IngresoDatosTXT(xpathPasaporte, passaporte)
          this.IngresoDatosTXT(xpathPartidaNacimiento, partidaNacimiento)
          this.IngresoDatosTXT(xpathRTN, RTN)
          this.IngresoDatosTXT(xpathCodT, CodT)
          this.IngresoDatosComBox(xpathUbicacion, xpathUbicacionList, Ubicacion)
          this.IngresoDatosTXT(xpathFechaExp, fechaExp)        
        
        }else if(TipoPersona==1){
          cy.xpath(xpathJuridica).click();
          cy.wait(420)
          this.IngresoDatosTXT(xpathRTN, RTN)
          
        }else{
          cy.log("validar Valor de tipo de persona")
        }
      }

      //registro cliente paso 2 











































      IngresoDatosTXT(xpath,IngresoDato){
        cy.get('body').then($body => {
          if ($body.find(xpath).length > 0) {
            // Si el botón existe, realiza una acción (como hacer clic en otro botón)
            cy.xpath(xpath).click().type(IngresoDato); // Reemplaza "#miOtroBoton" con tu selector real
            cy.wait(420)
          } else {
            // Si el botón NO existe, escribe un mensaje en la consola de Cypress
            cy.log('No apareció nada');
          }
        });
      }

      IngresoDatosComBox(xpath, xpathUbicacionList, IngresoDato){
        cy.get('body').then($body => {
          if ($body.find(xpath).length > 0) {
            // Si el botón existe, realiza una acción (como hacer clic en otro botón)
            // Hace clic en el input para abrir las opciones de autocompletado
            cy.xpath(xpath).click({ force: true });
            // Espera a que aparezcan las opciones (ajusta si tu app necesita más tiempo)
            cy.wait(420);
            // Selecciona ubicacion
            cy.xpath(xpathUbicacionList).eq(IngresoDato).click({ force: true })
            cy.wait(420)
          } else {
            // Si el botón NO existe, escribe un mensaje en la consola de Cypress
            cy.log('No apareció nada');
          }
        });
      }





































      ArchivoNubeD(URL_Datos){
        const sheetUrl2 = URL_Datos;

        // Hacer la petición para descargar el archivo como binario
        cy.request({
          url: sheetUrl2,
          encoding: 'binary'
        }).then((response) => {
          // Guardar el archivo en la carpeta fixtures
          cy.writeFile('cypress/fixtures/datosTX.xlsx', response.body, 'binary');
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

}



export default MetodosGenerales;