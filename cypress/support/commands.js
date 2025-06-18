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
    cy.wait(7500)
    cy.get('body').then($body => {
        if ($body.find('button.swal2-confirm.swal2-styled.swal2-default-outline').length > 0) {
          // Si el botón existe, realiza una acción (como hacer clic en otro botón)
          cy.get('button.swal2-confirm.swal2-styled.swal2-default-outline').contains('Si').click(); // Reemplaza "#miOtroBoton" con tu selector real
        } else {
          // Si el botón NO existe, escribe un mensaje en la consola de Cypress
          cy.log('No apareció nada');
        }
      });
});


Cypress.Commands.add('alertaNotif', () => {
    cy.wait(420)
cy.get('body').then($body => {
    const botonCerrar = $body.find('button.swal2-confirm.swal2-styled.swal2-default-outline:contains("Cerrar")');
  
    if (botonCerrar.length > 0) {
      cy.wrap(botonCerrar).click();
    } else {
      cy.log('No apareció el botón "Cerrar"');
    }
  });
});


Cypress.Commands.add('busquedaCliente', (tipoDocumento, InfoTipoDocumento) => {
    cy.wait(420) 
    //click en operacion
    cy.get('body').then(() => {
      cy.wait(1500)
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
    cy.wait(5000);
    //ingreso tipoDocumento
    cy.get('body').then(() => {
       cy.contains('mat-label', 'Tipo de documento').click({force:true})
      
          .then($el => {
            if ($el.length > 0) {
              // Hace clic en el input para abrir las opciones de autocompletado
              cy.wrap($el).click({ force: true });
                    // Espera a que aparezcan las opciones (ajusta si tu app necesita más tiempo)
              cy.wait(500);
                    // Selecciona el mat-option correspondiente según el tipo de documento
              cy.contains('.mat-mdc-option span',tipoDocumento).click({ force: true })
              .wait(1000)

             cy.get('.mat-mdc-input-element').eq(1).click().type(InfoTipoDocumento); // Luego escribe el valor   
                } else {
              cy.log('No se encontró el input de tipo de documento');
            }
            cy.contains('span', 'Buscar ').click({force:true})
        });
      });
    //ingreso informacion del documento seleccionado


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

