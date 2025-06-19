require('cypress-xpath');
import 'cypress-plugin-tab';

Cypress.Commands.add('Login', (URL, Usuario, Password) => {
    cy.visit(URL);
        
        const user = Usuario
        const password = Password

        cy.origin('https://keycloak-core.bytesw.cloud', { args: { user, password } }, ({ user, password }) => {
        cy.get('input#username').type(user)
        cy.get('input#password').type(password)
        cy.get('#kc-login').click()
        })    
      });

Cypress.Commands.add('alertaSuscr', () => {

  cy.xpath("//h2[contains(text(), 'Aceptar Notificaciones en Chrome.')]/following::button[contains(text(), 'Cerrar')][1]", { timeout: 60000 })
  .should('not.be.disabled')
  .should("")
  .click({force: true});

});



Cypress.Commands.add('oculto', () => {

cy.xpath("xpath de loading", { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click({force: true});

});


Cypress.Commands.add('xpathClk', (xpath) => {

cy.xpath(xpath, { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click({force: true});

});

Cypress.Commands.add('xpathBtxt', (varibale, xpath) => {

cy.xpath(xpath, { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .type(varibale)
  .click({force: true})

});

Cypress.Commands.add('alertaNotif', () => {

cy.xpath("//h2[contains(text(), '¿Desea suscribirse a las notificaciones?')]/following::button[normalize-space(text())='Si'][1]", { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click({force: true});

});


Cypress.Commands.add('busquedaCliente', (tipoDocumento, InfoTipoDocumento) => {
  // Paso 1: Ingresa a buscar cliente
  cy.xpathClk("  //span[contains(text(), 'Operación')]")
  cy.xpathClk("  //span[contains(text(), 'Búsqueda clientes')]")

  // Paso 2: Clic en el input asociado a "Tipo de documento"
  cy.xpathClk("//mat-label[contains(text(), 'Tipo de documento')]/ancestor::mat-form-field//input")
  
  // Paso 3: Esperar a que se abra el panel y seleccionar la opción que coincide con la variable
  cy.contains('.mat-mdc-option span',tipoDocumento, { timeout: 60000 }).click({ force: true })

  // Paso 4: click en identificacion y llenamos 
  cy.xpathBtxt(InfoTipoDocumento, "(//mat-label[normalize-space()='Identificación'])[1]")




// cy.xpath("//span[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), "+tipoDocumento+")]", { timeout: 60000 })
//   .should('be.visible')
//   .click({ force: true })

//   cy.contains('.mat-mdc-option span',tipoDocumento).click({ force: true })


  // cy.wait(420) 
  //   //click en operacion
  //   cy.get('body').then(() => {
  //     cy.wait(1500)
  //       cy.xpath("//mat-label[contains(text(), 'Tipo de documento')]/following::input[_ngcontent-ng-c125790888]")
  //         .then($el => {
  //           if ($el.length > 0) {
  //             cy.wrap($el).click();
  //           } else {
  //             cy.log('Elemento no encontrado');
  //           }
  //       });
  //   });
  //   cy.wait(420)  
  //   //clien en busqueda de clientes
  //   cy.get('body').then(() => {
  //   cy.xpath('/html/body/app-root/app-container/bac-app-container/div/mat-drawer-container/mat-drawer[1]/div/div[2]/mat-nav-list/div[1]/mat-nav-list/a[1]/span')
  //     .then($el => {
  //       if ($el.length > 0) {
  //         cy.wrap($el).click();
  //       } else {
  //         cy.log('Elemento no encontrado');
  //       }
  //     });
  //   });
  //   // Espera a que aparezcan las opciones (ajusta si tu app necesita más tiempo)
  //   cy.wait(5000);
  //   //ingreso tipoDocumento
  //   cy.get('body').then(() => {
  //      cy.contains('mat-label', 'Tipo de documento').click({force:true})
      
  //         .then($el => {
  //           if ($el.length > 0) {
  //             // Hace clic en el input para abrir las opciones de autocompletado
  //             cy.wrap($el).click({ force: true });
  //                   // Espera a que aparezcan las opciones (ajusta si tu app necesita más tiempo)
  //             cy.wait(500);
  //                   // Selecciona el mat-option correspondiente según el tipo de documento
  //             cy.contains('.mat-mdc-option span',tipoDocumento).click({ force: true })
  //             .wait(1000)

  //            cy.get('.mat-mdc-input-element').eq(1).click().type(InfoTipoDocumento); // Luego escribe el valor   
  //               } else {
  //             cy.log('No se encontró el input de tipo de documento');
  //           }
  //           cy.contains('span', 'Buscar ').click({force:true})
  //       });
  //     });
  //   //ingreso informacion del documento seleccionado


});
  
Cypress.Commands.add('ingresoJson', (valorJson) => {

    cy.get('body').then(() => {
      if ($el.is('input')) {
    cy.wrap($el).invoke('prop', 'readonly').then((readonly) => {
      if (readonly) {
        cy.log('El campo es de solo lectura');
      } else {
        Generales.input(labelText,datos[arraylabel[totalArrayLabel]])
      }
    });
  }                       
  else if ($el.hasClass('mat-select-placeholder')) {
    cy.wrap($el).invoke('prop', 'disabled').then((disabled) => {
        if (disabled) {
          cy.log('El combobox está deshabilitado');
        } else {
            Generales.Combobox(datos[arraylabel[totalArrayLabel]])
               }
            }); 
        }
    });
});


Cypress.Commands.add('ingresoInput', (selector, valorInput) => {
    cy.get(selector)
    .should('not.be.disabled') // Espera a que el campo no esté deshabilitado
    .click({ force: true })
    .clear()
    .type(valorInput)
    .click({ force: true });
    cy.wait(500);   
});



















// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

