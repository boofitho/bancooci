require("cypress-xpath");
import "cypress-plugin-tab";
import "cypress-file-upload";

Cypress.Commands.add("Login", (data) => {
  // 1. Visita la URL de inicio (la que podría redirigir a Keycloak)
  cy.visit(data.URL_Sitio);

  // 2. Espera de 5 segundos para que la redirección a Keycloak ocurra si es necesaria
  cy.wait(5000);

  // 3. Obtiene el hostname y el origin completo de la URL actual
  cy.location().then((location) => {
    const currentOrigin = location.origin;
    const hostname = location.hostname;

    // 4. Verifica si el hostname contiene 'keycloak'.
    // Esto valida que estamos en CUALQUIER entorno Keycloak antes de usar cy.origin().
    if (hostname.includes("keycloak")) {
      cy.log(`Redirigido a Keycloak en el origin: ${currentOrigin}`);

      // 5. Usamos el origin ACTÚAL de la ventana (currentOrigin) como primer argumento.
      // Esto es CRUCIAL, ya que cy.origin DEBE coincidir con el origen donde está el navegador.
      cy.origin(
        currentOrigin,
        { args: { user: data.Usuario, password: data.Password } },
        ({ user, password }) => {
          // El código dentro de cy.origin se ejecuta en el dominio de Keycloak
          cy.get("input#username").type(user, { log: false });
          cy.get("input#password").type(password, { log: false });
          cy.get("#kc-login").click();
        }
      );
    } else {
      // Si el hostname no contiene "keycloak" después de la espera
      cy.log(
        "No se detectó redirección a Keycloak. Asumiendo que la sesión está activa o no se requiere login."
      );
    }
  });
});
Cypress.Commands.add("oculto", () => {
  cy.get(".loading", { timeout: 60000 }).should("not.exist");
});

Cypress.Commands.add("leerHojaExcel", (nombreHoja) => {
  return cy.task("readExcelToJson", {
    filePath: "cypress/fixtures/datos.xlsx",
    hoja: nombreHoja,
  });
});

Cypress.Commands.add("oculto", () => {
  cy.get(".loading", { timeout: 60000 }).should("not.exist");
});

Cypress.Commands.add("leerHojaExcel", (nombreHoja) => {
  return cy.task("readExcelToJson", {
    filePath: "cypress/fixtures/datos.xlsx",
    hoja: nombreHoja,
  });
});

Cypress.Commands.add("xpathClkWOF", (xpath) => {
  cy.oculto();

  cy.xpath(xpath, { timeout: 60000 })
    .and("not.be.disabled") // habilitado
    .click({ force: true }); // sin force, espera el estado correcto

  cy.oculto();
});
// CLICK en elemento (radio, botón, etc.) - VERSIÓN MEJORADA
Cypress.Commands.add("xpathClk", (xpath) => {
  cy.oculto();

  cy.xpath(xpath, { timeout: 60000 })
    //.filter(":visible:not([disabled])")
    .first()
    .click({ force: true }); // sin force, espera el estado correcto

  cy.oculto();
});

// ESCRIBIR en input - VERSIÓN MEJORADA
Cypress.Commands.add("xpathBtxt", (variable, xpath) => {
  cy.oculto();

  if (!variable || String(variable).trim() === "") return;

  cy.xpath(xpath, { timeout: 60000 })
    .filter(":visible:not([disabled])")
    .first()
    .click({ force: true })
    .clear()
    .type(String(variable) + "{enter}" /*, {delay: 100}*/);
});

// ESCRIBIR en input - VERSIÓN MEJORADA
Cypress.Commands.add("xpathBtxtWE", (variable, xpath) => {
  cy.oculto();

  if (!variable || String(variable).trim() === "") return;

  cy.xpath(xpath, { timeout: 60000 })
    .filter(":visible:not([disabled])")
    .first()
    .click({ force: true })
    .clear()
    .type(String(variable))
    .blur(); // 👈 importante: dispara la validación reactiva
});

// ESCRIBIR en input (tipo texto o autocomplete) y limpiar antes
Cypress.Commands.add("xpathBtxtClear", (variable, xpath) => {
  cy.oculto();

  if (!variable || String(variable).trim() === "") return;

  cy.xpath(xpath, { timeout: 60000 })
    //.filter(":visible:not([disabled])")
    .first()
    .click({ force: true })
    .clear() // limpia el input
    .type(String(variable) + "{enter}"); // escribe el valor

  cy.oculto();
});

Cypress.Commands.add("busquedaCliente", (data) => {
  cy.oculto();
  cy.alertaSus();
  // Paso 1: Ingresa a buscar cliente
  cy.xpathClk("  //span[contains(text(), 'Operación')]");
  cy.wait(2000);
  cy.xpathClk(" //*[contains(text(), 'Búsqueda clientes')]");
  // Paso 2: Clic en el input asociado a "Tipo de documento"
  cy.xpathClk(
    "//mat-label[contains(text(), 'Tipo de documento')]/ancestor::mat-form-field//input"
  );
  // Paso 3: Esperar a que se abra el panel y seleccionar la opción que coincide con la variable
  cy.contains(".mat-mdc-option span", data.tipoDocumento, {
    timeout: 60000,
  }).click({ force: true });
  // Paso 4: Click en identificacion y llenamos
  cy.xpathBtxt(
    data.InfoTipoDocumento,
    "//mat-label[normalize-space(text())='Identificación']/ancestor::mat-form-field//input"
  );
  // Paso 5: Click en "Buscar"
  //  cy.xpathClk("//span[normalize-space(text()) = 'Buscar']")     =>  el metodo anterior da enter y resulta incesesario dar click en busca realiza la misma funcion
  //  cy.wait(500)
  // Paso 6: Click en "Agregar"
  cy.xpathClk("//span[normalize-space(text()) = 'Agregar']");
  // Paso 7: Click en "Cliente"
  cy.wait(500);
  cy.xpathClk("//span[normalize-space(text()) = 'Cliente']");
});

Cypress.Commands.add("seleccionarAutorizacionLocal", (data, motivo) => {
  cy.log("entra a validar");

  cy.get("body").then(($body) => {
    const newModal = $body.find("mat-bottom-sheet-container");

    if (newModal.length > 0) {
      // ✅ Esperar a que el nuevo contenedor de la alerta esté visible
      cy.get("mat-bottom-sheet-container", { timeout: 10000 }).should(
        "be.visible"
      );

      // Clic en botón "Local"
      cy.xpath("//button[normalize-space()='Local']").click({ force: true });

      // Llenar usuario
      cy.get("#username")
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
      cy.xpath("//button[normalize-space()='Autorizar']").click({
        force: true,
        timeout: 6000,
      });

      cy.wait(500);

      // Click en "Continuar"
      cy.xpath("//button[normalize-space()='Continuar']").click({
        force: true,
        timeout: 6000,
      });
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
  if (!Fecha || String(Fecha).trim() === "") {
    cy.log(`⏭️ Fecha vacía para xpath: ${xpAbrirFecha}, se omite la acción.`);
    return;
  }

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

  // Paso 2: Abrir el selector de fecha
  cy.xpath(xpAbrirFecha, { timeout: 60000 })
    // 👈 Scroll antes de hacer click
    .should("not.be.disabled")
    .click({ force: true });

  // Paso 3: Cambiar al modo de selección de año
  cy.get(".mat-calendar-period-button").click({ force: true });

  // Paso 4: Seleccionar año
  cy.contains(".mat-calendar-body-cell-content", anio).click({ force: true });

  // Paso 5: Seleccionar mes
  cy.contains(".mat-calendar-body-cell-content", mesAbreviado).click({
    force: true,
  });

  // Paso 6: Seleccionar día
  cy.contains(
    ".mat-calendar-body-cell-content",
    String(parseInt(dia, 10))
  ).click({ force: true });

  cy.oculto();
});

Cypress.Commands.add("clickSiguiente", (stepName) => {
  cy.xpath(
    `//h4[contains(text(),'${stepName}')]
    /ancestor::div[contains(@class,'mat-step-header')]
    /following::div[contains(@class,'mat-vertical-stepper-content')][1]
    //button[.//span[contains(text(),'Siguiente')]]`,
    { timeout: 10000 }
  )
    .should("be.visible")
    .click();
});

Cypress.Commands.add("ScrollXpath", (Posb, PosI, xpath) => {
  cy.xpath(xpath, { timeout: 60000 })
    .should("exist")
    .scrollIntoView({ block: Posb, inline: PosI });

  cy.log("Se desplazó el xpath " + xpath);
});

Cypress.Commands.add("alertaSus", () => {
  cy.get("body").then(($body) => {
    // Verifica si el mensaje está presente en pantalla
    if (
      $body.find(
        'h2.swal2-title:contains("¿Desea suscribirse a las notificaciones?")'
      ).length > 0
    ) {
      cy.log("✅ Apareció el mensaje de suscripción");
      // Si aparece, haz clic en el botón "No"
      cy.xpath("//button[text()='Si']").click();
    } else {
      // Si no aparece, muestra un log
      cy.log("⚠️ No apareció el mensaje de suscripción");
    }
  });
});

Cypress.Commands.add("alertaSus", () => {
  cy.get("body").then(($body) => {
    // Verifica si el mensaje está presente en pantalla
    if (
      $body.find(
        'h2.swal2-title:contains("¿Desea suscribirse a las notificaciones?")'
      ).length > 0
    ) {
      cy.log("✅ Apareció el mensaje de suscripción");
      // Si aparece, haz clic en el botón "No"
      cy.xpath("//button[text()='Si']").click();
    } else {
      // Si no aparece, muestra un log
      cy.log("⚠️ No apareció el mensaje de suscripción");
    }
  });
});
