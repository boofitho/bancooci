require("cypress-xpath");
import "cypress-plugin-tab";

Cypress.Commands.add("Login", (URL, Usuario, Password) => {
  cy.visit(URL);
  const user = Usuario;
  const password = Password;
  cy.wait(2000)
  
  
    // cy.origin(
    //   "https://keycloak-core.bytesw.cloud",
    //   { args: { user, password } },
    //   ({ user, password }) => {
    //     cy.get("input#username").type(user);
    //     cy.get("input#password").type(password);
    //     cy.get("#kc-login").click();
    //   }
    // );
 
cy.window().then((win) => {
  const token = win.localStorage.getItem('access_token') || win.localStorage.getItem('id_token');
  cy.log('TOKEN ACTUAL:', token);
});



});

Cypress.Commands.add('oculto', () => {

  cy.get('.loading', { timeout: 60000 })
  .should('not.exist')

});


Cypress.Commands.add('xpathClk', (xpath) => {
cy.xpath(xpath, { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click({force: true});
  cy.oculto()
});

Cypress.Commands.add('xpathBtxt', (varibale, xpath) => {
cy.xpath(xpath, { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .type(varibale)
  .click({force: true})
  cy.oculto()
});
Cypress.Commands.add('conClk', (cont) => {
cy.contains(cont, { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click({force: true});
  cy.oculto()
});

Cypress.Commands.add('conBtxt', (varibale, cont) => {
cy.contains(cont, { timeout: 60000 })
  .should('be.visible')
  .should('not.be.disabled')
  .type(String(varibale))
  .click({force: true})
  cy.oculto()
});

Cypress.Commands.add('busquedaCliente', (data) => {
  // Paso 1: Ingresa a buscar cliente
  cy.xpathClk("  //span[contains(text(), 'Operación')]")
  cy.wait(2000)
  cy.xpathClk("  //span[contains(text(), 'Búsqueda clientes')]")

  // Paso 2: Clic en el input asociado a "Tipo de documento"
  cy.xpathClk("//mat-label[contains(text(), 'Tipo de documento')]/ancestor::mat-form-field//input")
  // Paso 3: Esperar a que se abra el panel y seleccionar la opción que coincide con la variable
  cy.contains('.mat-mdc-option span',data.tipoDocumento, { timeout: 60000 }).click({ force: true })
  // Paso 4: Click en identificacion y llenamos 
  cy.xpathBtxt(data.InfoTipoDocumento, "(//mat-label[normalize-space()='Identificación'])[1]")
  // Paso 5: Click en "Buscar"
  cy.xpathClk("//span[normalize-space(text()) = 'Buscar']")
  // Paso 6: Click en "Agregar"
  cy.xpathClk("//span[normalize-space(text()) = 'Agregar']")
  // Paso 7: Click en "Cliente"
  cy.xpathClk("//span[normalize-space(text()) = 'Cliente']")
});

Cypress.Commands.add("ingresoJson", (valorJson) => {
  cy.get("body").then(() => {
    if ($el.is("input")) {
      cy.wrap($el)
        .invoke("prop", "readonly")
        .then((readonly) => {
          if (readonly) {
            cy.log("El campo es de solo lectura");
          } else {
            Generales.input(labelText, datos[arraylabel[totalArrayLabel]]);
          }
        });
    } else if ($el.hasClass("mat-select-placeholder")) {
      cy.wrap($el)
        .invoke("prop", "disabled")
        .then((disabled) => {
          if (disabled) {
            cy.log("El combobox está deshabilitado");
          } else {
            Generales.Combobox(datos[arraylabel[totalArrayLabel]]);
          }
        });
    }
  });
});

Cypress.Commands.add("ingresoInput", (selector, valorInput) => {
  cy.get(selector)
    .should("not.be.disabled") // Espera a que el campo no esté deshabilitado
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
