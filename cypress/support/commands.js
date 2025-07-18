require("cypress-xpath");
import "cypress-plugin-tab";

Cypress.Commands.add("Login", (URL, Usuario, Password) => {
  // Visita la URL de inicio
  cy.visit(URL);
  //espera de 5 segundos para que redireccione si es necesario
  cy.wait(5000);
  // Verifica si el hostname es el de Keycloak o plataforma
  cy.location("hostname").then((hostname) => {
    if (hostname.includes("keycloak-core.bytesw.cloud")) {
      // Si estamos en la página de Keycloak, hacemos login usando cy.origin
      cy.origin(
        "https://keycloak-core.bytesw.cloud",
        { args: { user: Usuario, password: Password } },
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

Cypress.Commands.add("xpathClk", (xpath) => {
  cy.xpath(xpath, { timeout: 60000 })
    .scrollIntoView({ block: "center", inline: "center" })
    .should("be.visible")
    .should("not.be.disabled")
    .click({ force: true });
  cy.oculto();
});

Cypress.Commands.add("xpathBtxt", (varibale, xpath) => {
  cy.xpath(xpath, { timeout: 60000 })
    .scrollIntoView({ block: "center", inline: "center" })
    .should("be.visible")
    .should("not.be.disabled")
    .type(String(varibale) + "{enter}")
    .click({ force: true });
  cy.oculto();
});

Cypress.Commands.add("xpathBtxtClear", (varibale, xpath) => {
  cy.xpath(xpath, { timeout: 60000 })
    .scrollIntoView({ block: "center", inline: "center" })
    .should("be.visible")
    .should("not.be.disabled")
    .clear()
    .type(String(varibale) + "{enter}")
    .click({ force: true });
  cy.oculto();
});

Cypress.Commands.add("conClk", (cont) => {
  cy.contains(cont, { timeout: 60000 })
    .scrollIntoView({ block: "center", inline: "center" })
    .should("be.visible")
    .should("not.be.disabled")
    .click({ force: true });
  cy.oculto();
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
