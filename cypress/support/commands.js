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


Cypress.Commands.add('xpathClk', (xpath) => {
  cy.xpath(xpath, { timeout: 60000 }).then($el => {
    if ($el.length > 0) {
      cy.wrap($el)
        .scrollIntoView()
        .should('be.visible')
        .should('not.be.disabled')
        .click({ force: true });
        //ejecutamos el comando oculto si en dado caso tuviera espera luego del click
        cy.oculto();
  
      } else {
      cy.log(`⚠️ No se encontró el xpath: ${xpath}`);
    }
  })});

Cypress.Commands.add('xpathBtxt', (variable, xpath) => {
  cy.xpath(xpath, { timeout: 60000 }).then($el => {
    if ($el.length > 0) {
      cy.wrap($el)
        .scrollIntoView()
        .should('be.visible')
        .should('not.be.disabled')
        // .clear() esto no es necesario ??? 
        .type(String(variable) + '{enter}')
        .click({ force: true });
        //ejecutamos el comando oculto si en dado caso tuviera espera luego del click
        cy.oculto();
  
      } else {
      cy.log(`⚠️ No se encontró el xpath: ${xpath} de la variable ${variable}`);
    }
  })

  // cy.xpath(xpath, { timeout: 60000 })
  // .scrollIntoView({})
  // .should('be.visible')
  // .should('not.be.disabled')
  // .type(String(varibale) + '{enter}')
  // .click({force: true})
  // cy.oculto()
});

Cypress.Commands.add('xpathBtxtClear', (variable, xpath) => {
  cy.xpath(xpath, { timeout: 60000 }).then($el => {
    if ($el.length > 0) {
      cy.wrap($el)
        .scrollIntoView()
        .should('be.visible')
        .should('not.be.disabled')
        .clear()
        .type(String(variable) + '{enter}')
        .click({ force: true });
        //ejecutamos el comando oculto si en dado caso tuviera espera luego del click
        cy.oculto();
  
      } else {
      cy.log(`⚠️ No se encontró el xpath: ${xpath} de la variable ${variable}`);
    }
  })
  // cy.xpath(xpath, { timeout: 60000 })
  // .scrollIntoView({})
  // .should('be.visible')
  // .should('not.be.disabled')
  // .clear()
  // .type(String(varibale) + '{enter}')
  // .click({force: true})
  // cy.oculto()
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
  cy.wait(500)
  // Paso 6: Click en "Agregar"
  cy.xpathClk("//span[normalize-space(text()) = 'Agregar']")
  // Paso 7: Click en "Cliente"
  cy.wait(500)
  cy.xpathClk("//span[normalize-space(text()) = 'Cliente']")
});
Cypress.Commands.add('conClk', (cont) => {
cy.contains(cont, { timeout: 60000 })
  .scrollIntoView({})
  .should('be.visible')
  .should('not.be.disabled')
  .click({force: true});
  cy.oculto()
});

Cypress.Commands.add("conBtxt", (varibale, cont) => {
  cy.contains(cont, { timeout: 60000 })
    .should("be.visible")
    .should("not.be.disabled")
    .type(String(varibale))
    .click({ force: true });
  cy.oculto();
});

Cypress.Commands.add("busquedaCliente", (data) => {
  // Paso 1: Ir al módulo
  cy.xpathClk("//span[contains(text(), 'Operación')]");
  cy.wait(2000);
  cy.xpathClk("//span[contains(text(), 'Búsqueda clientes')]");

  // Paso 2: Selección de tipo documento
  cy.xpathClk(
    "//mat-label[contains(text(), 'Tipo de documento')]/ancestor::mat-form-field//input"
  );
  cy.contains(".mat-mdc-option span", data.tipoDocumento, {
    timeout: 60000,
  }).click({ force: true });

  // Paso 3: Llenar número y buscar
  cy.xpathBtxt(
    data.InfoTipoDocumento,
    "(//mat-label[normalize-space()='Identificación'])[1]"
  );
  cy.xpathClk("//span[normalize-space(text()) = 'Buscar']");
  cy.get(".loading", { timeout: 600000 }).should("not.exist");
  // Paso 4: Evaluar si aparece el mensaje de "No hay resultados..."
  cy.get("body").then(($body) => {
    if (
      $body
        .text()
        .includes("No hay resultados para los criterios proporcionados.")
    ) {
      // Cliente NO encontrado → Crear
      cy.log("No se encontró el cliente. Creando...");
      cy.xpathClk("//span[normalize-space(text()) = 'Agregar']");
      cy.wait(500);
      cy.xpathClk("//span[normalize-space(text()) = 'Cliente']");
    } else {
      // Cliente SÍ existe → Clic al mat-icon (persona)
      cy.log("Cliente encontrado. Seleccionando...");
      cy.xpath("//mat-icon[@aria-label='person']")
        .first()
        .click({ force: true });
      cy.get(".loading", { timeout: 600000 }).should("not.exist");
    }
  });

})


Cypress.Commands.add('xpathTest', (variable, xpath) => {
  cy.xpath(xpath, { timeout: 60000 }).then($el => {
    if ($el.length > 0) {
      cy.wrap($el)
        .scrollIntoView()
        .should('be.visible')
        .should('not.be.disabled')
        .clear()
        .type(String(variable) + '{enter}')
        .click({ force: true });

      cy.oculto();
    } else {
      cy.log(`⚠️ No se encontró el xpath: ${xpath} de la variable ${variable}`);
    }
  }).catch(() => {
    cy.log(`❌ Error al buscar el xpath: ${xpath} de la variable ${variable}`);
  });
});


Cypress.Commands.add('xpathBtxtClear', (varibale, xpath) => {
cy.xpath(xpath, { timeout: 60000 })
  .scrollIntoView({})
  .should('be.visible')
  .should('not.be.disabled')
  .clear()
  .type(String(varibale) + '{enter}')
  .click({force: true})
  cy.oculto()
});

Cypress.Commands.add('seleccionarAutorizacionLocal', (motivo) => {
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
        .type("adminqa");

      cy.wait(300);

      // Llenar contraseña
      cy.get("#password")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type("adminqa");

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
  // Paso 1: Parsear la fecha
  const [dia, mes, anio] = Fecha.split("/");

  const mesesAbreviados = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  const mesAbreviado = mesesAbreviados[parseInt(mes, 10) - 1];

  // Paso 2: Abrir el selector de fecha (click en el botón del calendario)
  cy.xpath(xpAbrirFecha).should("be.visible").click();

  // Paso 3: Cambiar al modo de selección de año
  cy.get(".mat-calendar-period-button").click(); // cambia a vista de año

  // Paso 4: Seleccionar año
  cy.contains(".mat-calendar-body-cell-content", anio).click();

  // Paso 5: Seleccionar mes
  cy.contains(".mat-calendar-body-cell-content", mesAbreviado).click();

  // Paso 6: Seleccionar día (sin ceros a la izquierda)
  cy.contains(
    ".mat-calendar-body-cell-content",
    String(parseInt(dia, 10))
  ).click();
});
