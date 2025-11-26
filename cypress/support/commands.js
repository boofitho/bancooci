require("cypress-xpath");
import "cypress-plugin-tab";
import 'cypress-file-upload';

Cypress.Commands.add("Login", (data) => {
  // Visita la URL de inicio
  cy.visit(data.URL_Sitio);
  //espera de 5 segundos para que redireccione si es necesario  
  cy.wait(5000) 
  // Verifica si el hostname es el de Keycloak o plataforma
  cy.location('hostname').then((hostname) => {
    if (hostname.includes("keycloak-core.bytesw.cloud")) {
      // Si estamos en la página de Keycloak, hacemos login usando cy.origin
      cy.origin(
        "https://keycloak-core.bytesw.cloud",
        { args: { user: data.Usuario, password: data.Password } },
        ({ user, password }) => {
          cy.get("input#username").type(user, { log: false }); // Oculta en logs por seguridad
          cy.get("input#password").type(password, { log: false });
          cy.get("#kc-login").click();
        }
      );
    } else {
      // En caso de que no redirija a Keycloak, asumimos que ya está logueado o no se requiere login
      cy.log("Ya estás logueado o no se requiere autenticación");
    }
  });
});


Cypress.Commands.add("oculto", () => {
  cy.get(".loading", { timeout: 60000 }).should("not.exist");
});

Cypress.Commands.add('leerHojaExcel', (nombreHoja) => {
  return cy.task('readExcelToJson', {
    filePath: 'cypress/fixtures/datos.xlsx',
    hoja: nombreHoja
  });
});

Cypress.Commands.add('xpathClkWOF', (xpath) => {
  cy.oculto();

  cy.xpath(xpath, { timeout: 60000 })
    .and('not.be.disabled')    // habilitado
    .click({force: true});                  // sin force, espera el estado correcto

  cy.oculto();
});
// CLICK en elemento (radio, botón, etc.) - VERSIÓN MEJORADA
Cypress.Commands.add('xpathClk', (xpath) => {
  cy.oculto();

  cy.xpath(xpath, { timeout: 60000 })
    //.filter(":visible:not([disabled])")
    .first()
    .click({force: true});                  // sin force, espera el estado correcto

  cy.oculto();
});

// ESCRIBIR en input - VERSIÓN MEJORADA
Cypress.Commands.add('xpathBtxt', (variable, xpath) => {
  cy.oculto();

  if (!variable || String(variable).trim() === '') return;

  cy.xpath(xpath, { timeout: 60000 })
    .filter(":visible:not([disabled])")
    .first()
    .click({force: true})
    .clear()
    .type(String(variable) + '{enter}'/*, {delay: 100}*/);
});

// ESCRIBIR en input - VERSIÓN MEJORADA
Cypress.Commands.add('xpathBtxtWE', (variable, xpath) => {
  cy.oculto();

  if (!variable || String(variable).trim() === '') return;

  cy.xpath(xpath, { timeout: 60000 })
    .filter(":visible:not([disabled])")
    .first()
    .click({force: true})
    .clear()
    .type(String(variable))
    .blur();  // 👈 importante: dispara la validación reactiva
});



// ESCRIBIR en input (tipo texto o autocomplete) y limpiar antes
Cypress.Commands.add('xpathBtxtClear', (variable, xpath) => {
  cy.oculto();

  if (!variable || String(variable).trim() === '') return;

  cy.xpath(xpath, { timeout: 60000 })
      //.filter(":visible:not([disabled])")
      .first()
      .click({force: true})
      .clear()                 // limpia el input
      .type(String(variable) + '{enter}'); // escribe el valor

      cy.oculto();

});


Cypress.Commands.add('busquedaCliente', (data) => {
  cy.oculto()
  cy.alertaSus()
  // Paso 1: Ingresa a buscar cliente
  cy.xpathClk("  //span[contains(text(), 'Operación')]")
  cy.wait(2000)
  cy.xpathClk("  //span[contains(text(), 'Búsqueda clientes')]")
  // Paso 2: Clic en el input asociado a "Tipo de documento"
  cy.xpathClk("//mat-label[contains(text(), 'Tipo de documento')]/ancestor::mat-form-field//input")
  // Paso 3: Esperar a que se abra el panel y seleccionar la opción que coincide con la variable
  cy.contains('.mat-mdc-option span',data.tipoDocumento, { timeout: 60000 }).click({ force: true })
  // Paso 4: Click en identificacion y llenamos 
  cy.xpathBtxt(data.InfoTipoDocumento, "//mat-label[normalize-space(text())='Identificación']/ancestor::mat-form-field//input")
  // Paso 5: Click en "Buscar"
//  cy.xpathClk("//span[normalize-space(text()) = 'Buscar']")     =>  el metodo anterior da enter y resulta incesesario dar click en busca realiza la misma funcion 
//  cy.wait(500)
  // Paso 6: Click en "Agregar"
  cy.xpathClk("//span[normalize-space(text()) = 'Agregar']")
  // Paso 7: Click en "Cliente"
  cy.wait(500)
  cy.xpathClk("//span[normalize-space(text()) = 'Cliente']")
});


Cypress.Commands.add('seleccionarAutorizacionLocal', (data, motivo) => {
  cy.log("entra a validar");
  
  cy.get('body').then(($body) => {
    const modal = $body.find('.swal2-popup.swal2-modal.swal2-show');
    
    if (modal.length > 0) {
      // Esperar a que el modal esté visible
      cy.get('.swal2-popup.swal2-modal.swal2-show', { timeout: 10000 }).should('be.visible');
      
      // Clic en botón "Local"
      cy.xpath("//button[normalize-space()='Local']").click({ force: true });
      
      // Llenar usuario
      cy.get("#user")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(data.Usuario);


      cy.wait(300);

      // Llenar contraseña
      cy.get("#password")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(data.Password);

      cy.wait(300);

      // Llenar motivo
      cy.get("#reason")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(motivo);

      cy.wait(500);

      // Click en "Autorizar"
      cy.xpath("//button[normalize-space()='Autorizar']").click({ force: true, timeout:6000  });

      cy.wait(500);

      // Click en "Continuar"
      cy.xpath("//button[normalize-space()='Continuar']").click({ force: true, timeout:6000 });
    }
  });
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


Cypress.Commands.add("IngresoFecha", (Fecha, xpAbrirFecha) => {

  // Validar si la fecha está vacía, nula o indefinida
  if (!Fecha || String(Fecha).trim() === '') {
    cy.log(`⏭️ Fecha vacía para xpath: ${xpAbrirFecha}, se omite la acción.`);
    return;
  }

  // Paso 1: Parsear la fecha
  const [dia, mes, anio] = Fecha.split("/");

  const mesesAbreviados = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];
  const mesAbreviado = mesesAbreviados[parseInt(mes, 10) - 1];

  // Paso 2: Abrir el selector de fecha
  cy.xpath(xpAbrirFecha, { timeout: 60000 })
    // 👈 Scroll antes de hacer click
    .should('not.be.disabled')
    .click({ force: true });

  // Paso 3: Cambiar al modo de selección de año
  cy.get(".mat-calendar-period-button").click({ force: true });

  // Paso 4: Seleccionar año
  cy.contains(".mat-calendar-body-cell-content", anio).click({ force: true });

  // Paso 5: Seleccionar mes
  cy.contains(".mat-calendar-body-cell-content", mesAbreviado).click({ force: true });

  // Paso 6: Seleccionar día
  cy.contains(".mat-calendar-body-cell-content", String(parseInt(dia, 10))).click({ force: true });

  cy.oculto();

});


Cypress.Commands.add("clickSiguiente", (stepName) => {
  cy.xpath(`//h4[contains(text(),'${stepName}')]
    /ancestor::div[contains(@class,'mat-step-header')]
    /following::div[contains(@class,'mat-vertical-stepper-content')][1]
    //button[.//span[contains(text(),'Siguiente')]]`, { timeout: 10000 }
  ).should('be.visible').click();
});



Cypress.Commands.add('ScrollXpath', (Posb, PosI, xpath) => {
  cy.xpath(xpath, { timeout: 60000 })
    .should('exist')
    .scrollIntoView({ block: Posb, inline: PosI });

  cy.log("Se desplazó el xpath " + xpath);
});


Cypress.Commands.add('alertaSus', () => {
  cy.get('body').then(($body) => {
    // Verifica si el mensaje está presente en pantalla
    if ($body.find('h2.swal2-title:contains("¿Desea suscribirse a las notificaciones?")').length > 0) {
      cy.log('✅ Apareció el mensaje de suscripción');
      // Si aparece, haz clic en el botón "No"
      cy.xpath("//button[text()='Si']").click();
    } else {
      // Si no aparece, muestra un log
      cy.log('⚠️ No apareció el mensaje de suscripción');
    }
  });
});

Cypress.Commands.add('alertaSus', () => {
  cy.get('body').then(($body) => {
    // Verifica si el mensaje está presente en pantalla
    if ($body.find('h2.swal2-title:contains("¿Desea suscribirse a las notificaciones?")').length > 0) {
      cy.log('✅ Apareció el mensaje de suscripción');
      // Si aparece, haz clic en el botón "No"
      cy.xpath("//button[text()='Si']").click();
    } else {
      // Si no aparece, muestra un log
      cy.log('⚠️ No apareció el mensaje de suscripción');
    }
  });
});




