require("cypress-xpath");
class PersonaNatural {
  VisitaCotizador(user, password) {
    before(() => {
      cy.visit(
        "https://keycloak-core.bytesw.cloud/realms/cotizador/protocol/openid-connect/auth?client_id=cotizador-ui&redirect_uri=https%3A%2F%2Fplataforma-qa.bytesw.cloud%2F&state=e1fe3a55-1671-4f14-a62e-72c78890a2f1&response_mode=fragment&response_type=code&scope=openid&nonce=60191224-ef1f-4336-86a6-3583752b3186&code_challenge=69hPOed5beLYgXfDGAHFB6gXNwZDydNoIRUIWhO0oh4&code_challenge_method=S256"
      );
      cy.title().should("eq", "Inicia sesión en cotizador");
      cy.wait(1500);
    });
  }

  login(user, password) {
    cy.get("input#username").type(user);
    cy.get("input#password").type(password);
    cy.get("#kc-login").click();
  }

  IngresoPersonaNatural(usuarioAgregar) {
    //Metodo para agregar tipo de persona
    //Ingreso de persona natural
    cy.contains("span", "Agregar ", { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.wait(3000);
    cy.get("#cdk-overlay-2").contains(usuarioAgregar).click({ force: true });
  } //Fin tipo de persona

  IdentificacionGeneralPersonaNatural(InfoTipoDocumento, anio, mes, dia, RTN) {
    //Se ingresan datos en la pantalla tipo de persona natural 1. Identificación general
    cy.wait(2000);
    cy.contains("mat-label", "CEDULA DE IDENTIDAD", { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .then(() => {
        cy.contains("mat-label", "CEDULA DE IDENTIDAD").type(
          InfoTipoDocumento,
          { timeout: 60000 }
        );
      });

    //Flujo para seleccionar fecha de expiracion documento de identificacion
    cy.get('button[aria-label="Open calendar"]', { timeout: 60000 })
      .first()
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.xpath("//button[@aria-label='Choose month and year']", {
      timeout: 60000,
    })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.contains("span", anio, { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.contains("span", mes, { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.get(".mat-calendar-body-cell-content")
      .contains(dia, { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
    cy.wait(2000); //Fin flujo para seleccionar fecha de expiracion documento de identificacion
    //Inicio de escritura tipo de documento de registro tributario nacional
    cy.contains("mat-label", "REGISTRO TRIBUTARIO NACIONAL", { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .then(() => {
        cy.contains("mat-label", "REGISTRO TRIBUTARIO NACIONAL").type(RTN, {
          timeout: 60000,
        });
      }); //Fin de escritura tipo de documento de registro tributario nacional

    //Boton para dar siguiente en el flujo no. 2
    cy.contains("span", "Siguiente", { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
  } //fin ingreso de datos persona natural 1. Identificación general

  DatosGeneralesPersonaNatural(
    textoGenero,
    PrimerApellido,
    PrimerNombre,
    anioNacimiento,
    mesNacimiento,
    diaNacimiento,
    EstadoCivil,
    gradoAcademico,
    profesion,
    NoAniosEducacion,
    capacidadadesEspeciales,
    ocupacion,
    nacionalidad,
    tieneDobleNacionalidad,
    NumeroSocial,
    UbicacionSegundaNacionalidad
  ) {
    this.EstadoCivil = EstadoCivil; //  AQUÍ se guarda correctamente
    // Inicio de paso 2. Datos generales persona natural
    cy.contains("label", textoGenero, { timeout: 60000 })
      .scrollIntoView() // Hace scroll hasta que el elemento sea visible
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.wait(3000);
    // Ingreso Primer apellido
    cy.contains("mat-label", "Primer Apellido", { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .then(() => {
        cy.contains("mat-label", "Primer Apellido").type(PrimerApellido, {
          timeout: 60000,
        });
      });
    //Ingreso primer nombre
    cy.contains("mat-label", "Primer Nombre", { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .then(() => {
        cy.contains("mat-label", "Primer Nombre").type(PrimerNombre, {
          timeout: 60000,
        });
      });

    // Inicio flujo fecha de nacimiento
    cy.get('button[aria-label="Open calendar"]')
      .eq(1)
      .click({ force: true, timeout: 10000 });

    // Abre selector de mes/año
    cy.xpath("//button[@aria-label='Choose month and year']", {
      timeout: 60000,
    })
      .first()

      .click({ force: true }, { timeout: 6000 });
    function navegarHastaAnio(anioDeseado) {
      const buscarAnio = () => {
        cy.get("body").then(($body) => {
          // Verifica si el año está visible en la página actual
          if ($body.find(`span:contains(${anioDeseado})`).length > 0) {
            cy.contains("span", anioDeseado).click({ force: true });
          } else {
            // Si no está visible, haz clic en el botón de navegación y vuelve a buscar
            cy.get("button.mat-calendar-previous-button")

              .click()
              .then(buscarAnio); // Llama recursivamente hasta encontrar el año
          }
        });
      };
      // Inicia la búsqueda
      buscarAnio();
    }
    navegarHastaAnio(anioNacimiento); // Donde anioNacimiento es "1995" en tu casoF
    cy.contains("span", mesNacimiento, { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.get(".mat-calendar-body-cell-content")
      .contains(diaNacimiento, { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.wait(2000); //Fin flujo fecha de nacimiento
    cy.contains("mat-label", "Estado Civil", { timeout: 6000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        cy.contains("span", EstadoCivil, { timeout: 6000 }).click({
          force: true,
        });
      });
    //Grado academico
    cy.contains("mat-label", "Grado Académico", { timeout: 6000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        cy.contains("span", gradoAcademico, { timeout: 6000 }).click({
          force: true,
        });
      });

    cy.contains("mat-label", "Profesión", { timeout: 6000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        cy.contains("span", profesion).click({ force: true });
      });

    cy.contains("mat-label", "No. De Años Educación")
      .should("be.visible")
      .should("not.be.disabled")
      .type(NoAniosEducacion, { timeout: 6000 });

    cy.contains("mat-label", "Capacidades Especiales")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        cy.contains("span", capacidadadesEspeciales, { timeout: 6000 }).click({
          force: true,
        });
      });

    cy.contains("mat-label", "Ocupación", { timeout: 6000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        cy.contains("span", ocupacion, { timeout: 6000 }).click({
          force: true,
        });
      });
    if (tieneDobleNacionalidad.trim().toLowerCase() === "si") {
      // Flujo general para doble nacionalidad
      cy.contains("mat-label", "2da. Nacionalidad", { timeout: 6000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true })
        .then(() => {
          cy.contains("span", nacionalidad, { timeout: 6000 }).click({
            force: true,
          });

          // Flujo adicional si es estadounidense
          if (nacionalidad.trim().toLowerCase() === "estadounidense") {
            cy.contains("mat-label", "Social Security Number", {
              timeout: 6000,
            })
              .type(NumeroSocial, { timeout: 6000 })
              .then(() => {
                cy.xpath(
                  "//*[@id='cdk-stepper-0-content-1']/div/app-general-data-natural-person/div/form/div[2]/app-nationality-and-residence-panel/div/form/div[4]/div/app-documents-wrapper/app-documents/form/table/tbody/tr/td[2]/mat-form-field/div[1]"
                )
                  .click({ force: true })
                  .then(() => {
                    cy.contains("span", UbicacionSegundaNacionalidad, {
                      timeout: 6000,
                    }).click({ force: true });
                  });
              });
          } else {
            cy.log("Solo tiene nacionalidad doble pero no estadounidense");
          }
        });
    } else {
      cy.log("No tiene doble nacionalidad");
    }
  } // Fin de paso 2. Datos generales persona natural

  clickpaso2() {
    cy.wait(3000);
    cy.xpath('//*[@id="cdk-stepper-0-content-1"]/div/div/button/span[4]', {
      timeout: 6000,
    })

      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true }, { timeout: 6000 });
    cy.wait(3000);
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
  }

  //Inicio paso 3 PEP

  //Flujo repetitivo de empresas PEP
  PatrimonioPEP(
    PatrimonioEmpresaPEP,
    PatrimonioTipodeDocumentoPEP,
    PatrimonioIdentificacionPEP,
    PatrimonioActividadEconomicaPEP
  ) {
    cy.get(".mdc-floating-label")
      .contains("mat-label", "Empresa", { timeout: 6000 })
      .should("be.visible")
      .should("not.be.disabled")
      .type(PatrimonioEmpresaPEP, { timeout: 6000 });
    cy.get(".mdc-floating-label")
      .contains("mat-label", "Tipo de documento", { timeout: 6000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        cy.get(".mdc-list-item__primary-text")
          .contains("span", PatrimonioTipodeDocumentoPEP)
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.contains("label", "Identificación")
          .parents(".mat-mdc-text-field-wrapper")
          .find("input")
          .type(PatrimonioIdentificacionPEP);
      });
    cy.get(".mdc-floating-label")
      .contains("mat-label", "Actividad Económica", { timeout: 6000 })
      .click({ force: true })
      .then(() => {
        cy.get(".mdc-list-item__primary-text")
          .contains("span", PatrimonioActividadEconomicaPEP)
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
      });
  }
  PersonaPep(
    esPEP,
    institucionPEP,
    cargoOcupadoPEP,
    periodoPEP,
    EmpresaJuridicaPEP,
    PatrimonioEmpresaPEP,
    PatrimonioTipodeDocumentoPEP,
    PatrimonioIdentificacionPEP,
    PatrimonioActividadEconomicaPEP,
    PatrimonioPorcentPEP,
    anioInicialPEP,
    mesInicialPEP,
    diaInicialPEP,
    anioFinalPEP,
    mesFinalPEP,
    diaFinalPEP,
    PatrimonioPuestoPEP
  ) {
    this.esPEP = esPEP?.trim().toLowerCase(); //  AQUÍ se guarda correctamente
    if (esPEP === "si") {
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //se llena el flujo cuando es una persona con cargo publico 'PEP'
      cy.contains("mat-label", "Institución", { timeout: 6000 })
        .scrollIntoView()
        .should("be.visible")
        .should("not.be.disabled")

        .type(`${institucionPEP}{enter}`, { timeout: 6000 })
        .then(() => {
          cy.contains("mat-label", "Cargo Ocupado", { timeout: 6000 })

            .should("be.visible")
            .should("not.be.disabled")
            .type(cargoOcupadoPEP, { timeout: 6000 });
          cy.contains("mat-label", "Periodo en que ocupó el cargo", {
            timeout: 6000,
          })
            .should("be.visible")
            .should("not.be.disabled")
            .click({ force: true })
            .then(() => {
              cy.contains("span", periodoPEP, { timeout: 6000 })
                .should("be.visible")
                .should("not.be.disabled")
                .click({ force: true });
              cy.wait(3000);
              //Agrega los datos
              cy.contains("p", "Agregar", { timeout: 6000 }).click({
                force: true,
              });
              cy.wait(3000);
              cy.xpath('//*[@id="cdk-stepper-0-content-2"]/div/div/button')
                .should("be.visible")
                .should("not.be.disabled")
                .click({ force: true }, { timeout: 6000 });
            });
        });
      cy.wait(3000);
      cy.get(".loading", { timeout: 50000 }).should("not.exist");

      if (EmpresaJuridicaPEP === "Empresa") {
        cy.log(
          "entrando al flujo de persona que tiene acciones arriba de 25% (PEP) de una empresa"
        );
        cy.wait(2000);
        this.PatrimonioPEP(
          PatrimonioEmpresaPEP,
          PatrimonioTipodeDocumentoPEP,
          PatrimonioIdentificacionPEP,
          PatrimonioActividadEconomicaPEP
        );

        if (PatrimonioPorcentPEP >= 25) {
          cy.contains("label", "% de Participación")
            .parents(".mat-mdc-text-field-wrapper")
            .find("input")
            .clear()
            .type(PatrimonioPorcentPEP.toString());
        } else {
          cy.log("Porcentaje menor al mínimo permitido");
        }

        //Boton agregar
        cy.xpath(
          "//button[contains(@class, 'mat-mdc-button') and .//p[text()='Agregar']]"
        )
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
        //Boton guardar
        cy.get(".mdc-button__label")
          .contains("span", "Guardar ")
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        // Boton Siguiente
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
        cy.xpath('//*[@id="cdk-stepper-0-content-3"]/div/div/button')
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });

        //Organizacion/direccion de empresas
      } else if (EmpresaJuridicaPEP === "Organización/dirección de empresas") {
        cy.get(".mdc-tab__text-label")
          .contains("span", EmpresaJuridicaPEP, { timeout: 6000 })
          .click();

        this.PatrimonioPEP(
          PatrimonioEmpresaPEP,
          PatrimonioTipodeDocumentoPEP,
          PatrimonioIdentificacionPEP,
          PatrimonioActividadEconomicaPEP
        );

        cy.wait(2000);
        // 1. Abrir el calendario de fecha inicial
        cy.xpath(
          '//*[@id="mat-tab-group-0-content-1"]/div/app-empresa-manage/div/form/div[3]/app-datepicker[1]/form/mat-form-field/div[1]/div/div[3]'
        ).click({ force: true, timeout: 10000 });

        // 2. Abrir selector de año/mes
        cy.xpath("//button[@aria-label='Choose month and year']", {
          timeout: 60000,
        })
          .first()
          .should("be.visible")
          .click({ force: true });

        // 3. Función mejorada para navegación bidireccional
        function navigateToYear(targetYear) {
          const MAX_ATTEMPTS = 20; // Prevención de loops infinitos
          let attempts = 0;

          const searchYear = () => {
            cy.get("body").then(($body) => {
              attempts++;
              if (attempts > MAX_ATTEMPTS) {
                throw new Error(
                  `No se encontró el año ${targetYear} después de ${MAX_ATTEMPTS} intentos`
                );
              }

              // Verificar si el año está visible
              const yearElement = $body.find(`[aria-label="${targetYear}"]`);

              if (yearElement.length) {
                cy.wrap(yearElement).click({ force: true });
              } else {
                // Determinar dirección de navegación
                cy.get(".mat-calendar-body-cell-content span").then(
                  ($years) => {
                    const currentYear = parseInt($years.first().text().trim());
                    const direction =
                      targetYear > currentYear ? "next" : "previous";

                    cy.get(`button.mat-calendar-${direction}-button`)
                      .should("be.visible")
                      .click({ force: true })
                      .then(() => {
                        // Pequeña pausa para permitir que el calendario se actualice
                        cy.wait(300);
                        searchYear(); // Llamada recursiva
                      });
                  }
                );
              }
            });
          };

          searchYear();
        }

        // 4. Navegar al año deseado
        navigateToYear(anioInicialPEP); // Usa tu variable aquí

        // 5. Seleccionar mes con validación
        cy.contains(".mat-calendar-body-cell-content", mesInicialPEP, {
          timeout: 60000,
        })
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });

        // 6. Seleccionar día con validación
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaInicialPEP)
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true }); //Fin fecha inicial

        cy.wait(3000);

        // 1. Abrir el calendario de fecha final
        cy.xpath(
          '//*[@id="mat-tab-group-0-content-1"]/div/app-empresa-manage/div/form/div[3]/app-datepicker[2]/form/mat-form-field/div[1]/div/div[3]/mat-datepicker-toggle/button'
        ).click({ force: true, timeout: 10000 });

        // 2. Abrir selector de año/mes
        cy.xpath("//button[@aria-label='Choose month and year']", {
          timeout: 60000,
        })
          .first()
          .should("be.visible")
          .click({ force: true });

        // 3. Función mejorada para navegación bidireccional
        function navigateToYearFinal(targetYear) {
          const MAX_ATTEMPTS = 20; // Prevención de loops infinitos
          let attempts = 0;

          const searchYear = () => {
            cy.get("body").then(($body) => {
              attempts++;
              if (attempts > MAX_ATTEMPTS) {
                throw new Error(
                  `No se encontró el año ${targetYear} después de ${MAX_ATTEMPTS} intentos`
                );
              }

              // Verificar si el año está visible
              const yearElement = $body.find(`[aria-label="${targetYear}"]`);

              if (yearElement.length) {
                cy.wrap(yearElement).click({ force: true });
              } else {
                // Determinar dirección de navegación
                cy.get(".mat-calendar-body-cell-content span").then(
                  ($years) => {
                    const currentYear = parseInt($years.first().text().trim());
                    const direction =
                      targetYear > currentYear ? "next" : "previous";

                    cy.get(`button.mat-calendar-${direction}-button`)
                      .should("be.visible")
                      .click({ force: true })
                      .then(() => {
                        // Pequeña pausa para permitir que el calendario se actualice
                        cy.wait(300);
                        searchYear(); // Llamada recursiva
                      });
                  }
                );
              }
            });
          };

          searchYear();
        }

        // 4. Navegar al año deseado
        navigateToYearFinal(anioFinalPEP); // Usa tu variable aquí

        // 5. Seleccionar mes con validación
        cy.contains(".mat-calendar-body-cell-content", mesFinalPEP, {
          timeout: 60000,
        })
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });

        // 6. Seleccionar día con validación
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaFinalPEP)
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });
        //Fin fecha Final
        //Metodo para seleccionar puesto
        cy.get(".mdc-floating-label")
          .contains("mat-label", "Puesto", { timeout: 6000 })
          .click({ force: true })
          .then(() => {
            cy.get(".mdc-list-item__primary-text")
              .contains("class", PatrimonioPuestoPEP, { timeout: 6000 })
              .should("be.visible")
              .should("not.be.disabled")
              .click({ force: true });
          });

        //Boton agregar
        cy.xpath(
          "//button[contains(@class, 'mat-mdc-button') and .//p[text()='Agregar']]"
        )
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
        //Boton guardar
        cy.get(".mdc-button__label")
          .contains("span", "Guardar ")
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        // Boton Siguiente
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
        cy.xpath('//*[@id="cdk-stepper-0-content-3"]/div/div/button')
          .should("be.visible")
          .should("not.be.disabled");
      } else if (
        EmpresaJuridicaPEP ===
        "Federaciones/organizaciones no lucrativas (ONG'S)"
      ) {
        cy.get(".mdc-tab__text-label")
          .contains("span", EmpresaJuridicaPEP, { timeout: 6000 })
          .click({ force: true });

        this.PatrimonioPEP(
          PatrimonioEmpresaPEP,
          PatrimonioTipodeDocumentoPEP,
          PatrimonioIdentificacionPEP,
          PatrimonioActividadEconomicaPEP
        );

        cy.wait(2000);
        // 1. Abrir el calendario de fecha inicial
        cy.xpath(
          '//*[@id="mat-tab-group-0-content-2"]/div/app-empresa-manage/div/form/div[3]/app-datepicker[1]/form/mat-form-field/div[1]/div/div[3]/mat-datepicker-toggle/button'
        ).click({ force: true, timeout: 10000 });

        // 2. Abrir selector de año/mes
        cy.xpath("//button[@aria-label='Choose month and year']", {
          timeout: 60000,
        })
          .first()
          .should("be.visible")
          .click({ force: true });

        // 3. Función mejorada para navegación bidireccional
        function navigateToYearONG(targetYear) {
          const MAX_ATTEMPTS = 20; // Prevención de loops infinitos
          let attempts = 0;

          const searchYear = () => {
            cy.get("body").then(($body) => {
              attempts++;
              if (attempts > MAX_ATTEMPTS) {
                throw new Error(
                  `No se encontró el año ${targetYear} después de ${MAX_ATTEMPTS} intentos`
                );
              }

              // Verificar si el año está visible
              const yearElement = $body.find(`[aria-label="${targetYear}"]`);

              if (yearElement.length) {
                cy.wrap(yearElement).click({ force: true });
              } else {
                // Determinar dirección de navegación
                cy.get(".mat-calendar-body-cell-content span").then(
                  ($years) => {
                    const currentYear = parseInt($years.first().text().trim());
                    const direction =
                      targetYear > currentYear ? "next" : "previous";

                    cy.get(`button.mat-calendar-${direction}-button`)
                      .should("be.visible")
                      .click({ force: true })
                      .then(() => {
                        // Pequeña pausa para permitir que el calendario se actualice
                        cy.wait(300);
                        searchYear(); // Llamada recursiva
                      });
                  }
                );
              }
            });
          };

          searchYear();
        }

        // 4. Navegar al año deseado
        navigateToYearONG(anioInicialPEP); // Usa tu variable aquí

        // 5. Seleccionar mes con validación
        cy.contains(".mat-calendar-body-cell-content", mesInicialPEP, {
          timeout: 60000,
        })
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });

        // 6. Seleccionar día con validación
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaInicialPEP)
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true }); //Fin fecha inicial

        cy.wait(3000);

        // 1. Abrir el calendario de fecha final
        cy.xpath(
          '//*[@id="mat-tab-group-0-content-2"]/div/app-empresa-manage/div/form/div[3]/app-datepicker[2]/form/mat-form-field/div[1]/div/div[3]/mat-datepicker-toggle/button'
        ).click({ force: true, timeout: 10000 });

        // 2. Abrir selector de año/mes
        cy.xpath("//button[@aria-label='Choose month and year']", {
          timeout: 60000,
        })
          .first()
          .should("be.visible")
          .click({ force: true });

        // 3. Función mejorada para navegación bidireccional
        function navigateToYear(targetYear) {
          const MAX_ATTEMPTS = 20; // Prevención de loops infinitos
          let attempts = 0;

          const searchYear = () => {
            cy.get("body").then(($body) => {
              attempts++;
              if (attempts > MAX_ATTEMPTS) {
                throw new Error(
                  `No se encontró el año ${targetYear} después de ${MAX_ATTEMPTS} intentos`
                );
              }

              // Verificar si el año está visible
              const yearElement = $body.find(`[aria-label="${targetYear}"]`);

              if (yearElement.length) {
                cy.wrap(yearElement).click({ force: true });
              } else {
                // Determinar dirección de navegación
                cy.get(".mat-calendar-body-cell-content span").then(
                  ($years) => {
                    const currentYear = parseInt($years.first().text().trim());
                    const direction =
                      targetYear > currentYear ? "next" : "previous";

                    cy.get(`button.mat-calendar-${direction}-button`)
                      .should("be.visible")
                      .click({ force: true })
                      .then(() => {
                        // Pequeña pausa para permitir que el calendario se actualice
                        cy.wait(300);
                        searchYear(); // Llamada recursiva
                      });
                  }
                );
              }
            });
          };

          searchYear();
        }

        // 4. Navegar al año deseado
        navigateToYear(anioFinalPEP); // Usa tu variable aquí

        // 5. Seleccionar mes con validación
        cy.contains(".mat-calendar-body-cell-content", mesFinalPEP, {
          timeout: 60000,
        })
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });

        // 6. Seleccionar día con validación
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaFinalPEP)
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });
        //Fin fecha Final
        //Metodo para seleccionar puesto
        cy.get(".mdc-floating-label")
          .contains("mat-label", "Puesto", { timeout: 6000 })
          .click({ force: true })
          .then(() => {
            cy.get(".mdc-list-item__primary-text")
              .contains("class", PatrimonioPuestoPEP, { timeout })
              .should("be.visible")
              .should("not.be.disabled")
              .click({ force: true });
          });

        //Boton agregar
        cy.xpath(
          "//button[contains(@class, 'mat-mdc-button') and .//p[text()='Agregar']]"
        )
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
        //Boton guardar
        cy.get(".mdc-button__label")
          .contains("span", "Guardar ")
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        // Boton Siguiente
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
        cy.xpath('//*[@id="cdk-stepper-0-content-3"]/div/div/button')
          .should("be.visible")
          .should("not.be.disabled");
      } else {
        cy.log("no tiene ningun patrimonio");
        // Boton Siguiente
        cy.xpath(
          "//button[contains(@class, 'mdc-button')]//span[contains(@class, 'mdc-button__label') and text()='Siguiente']"
        )
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
      }
    } else {
      cy.log("No es pep por lo tanto se salta el flujo");

      cy.xpath('//*[@id="cdk-stepper-0-content-2"]/div/div/button')
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
    }
  }

  ParentescosPEP(
    apellidoMamaPEP,
    primerNombreMamaPEP,
    direccionMamaPEP,
    // apellidoPapaPEP,
    // primerNombrePapaPEP,
    // direccionPapaPEP,
    tiposuegrxPEP,
    apellidosuegrxPEP,
    primerNombreSuegrxPEP
  ) {
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    //Para madre de persona PEP (datos indispensables de acuerdo al flujo)
    if (this.esPEP === "si") {
      // Datos de la madre
      // Primer Apellido - madre
      cy.xpath(
        "//body[1]/app-root[1]/app-container[1]/bac-app-container[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/app-create-client[1]/div[1]/dyna-flow[1]/mat-stepper[1]/div[5]/div[1]/div[1]/div[1]/app-parentescos[1]/mat-tab-group[1]/div[1]/mat-tab-body[1]/div[1]/app-relationship[1]/div[1]/section[1]/div[1]/div[3]/byte-names[1]/form[1]/div[1]/div[1]/app-input-material[1]/form[1]/mat-form-field[1]/div[1]/div[1]/div[2]"
      )
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoMamaPEP, { timeout: 6000 });
      cy.wait(1000);
      // Primer Nombre - madre
      cy.xpath(
        "//body[1]/app-root[1]/app-container[1]/bac-app-container[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/app-create-client[1]/div[1]/dyna-flow[1]/mat-stepper[1]/div[5]/div[1]/div[1]/div[1]/app-parentescos[1]/mat-tab-group[1]/div[1]/mat-tab-body[1]/div[1]/app-relationship[1]/div[1]/section[1]/div[1]/div[3]/byte-names[1]/form[1]/div[1]/div[2]/app-input-material[1]/form[1]/mat-form-field[1]/div[1]/div[1]/div[2]"
      )
        .scrollIntoView()
        .should("be.visible")
        .type(primerNombreMamaPEP, { timeout: 6000 });
      cy.wait(1000);

      // Dirección - madre
      cy.xpath(
        '//*[@id="mat-tab-group-1-content-0"]/div/app-relationship/div/section[1]/div/div[4]/app-input-material/form/mat-form-field/div[1]'
      )
        .scrollIntoView()
        .should("be.visible")
        .type(direccionMamaPEP, { timeout: 6000 });

      cy.wait(300);

      // // Primer Apellido Padre
      // cy.get('input[placeholder="Primer Apellido"]')
      //   .eq(1)
      //   .should("be.visible")
      //   .type(apellidoPapaPEP);

      // // Primer Nombre Padre
      // cy.get('input[placeholder="Primer Nombre"]')
      //   .eq(1)
      //   .should("be.visible")
      //   .type(primerNombrePapaPEP);

      // // Dirección Padre
      // cy.get('input[placeholder="Dirección"]')
      //   .eq(1)
      //   .should("be.visible")
      //   .type(direccionPapaPEP);
      //Boton de guardado
      cy.xpath(
        '//*[@id="mat-tab-group-1-content-0"]/div/app-relationship/div/section[2]/div/div[5]/div[2]/button'
      )
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");

      //Flujo para llenar datos de suegros
      cy.xpath('//div[@role="tab" and contains(., "Suegros")]')
        .scrollIntoView()
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.wait(3000);
      cy.xpath(
        "//app-relationship[@class='ng-star-inserted']//div//app-auto-complete//div[@class='mat-mdc-text-field-wrapper mdc-text-field mdc-text-field--outlined']"
      )
        .click({ force: true })
        .then(() => {
          cy.xpath(`//mat-option//span[text()='${tiposuegrxPEP}']`)
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });
        });

      cy.xpath(
        "//app-relationship[contains(., 'Suegro')]//mat-label[normalize-space()='Primer Apellido']/ancestor::div[contains(@class,'mat-mdc-form-field')]//input"
      )
        .should("be.visible")
        .type(apellidosuegrxPEP);

      cy.xpath(
        "//app-relationship[contains(., 'Suegro')]//mat-label[normalize-space()='Primer Nombre']/ancestor::div[contains(@class,'mat-mdc-form-field')]//input"
      )
        .should("be.visible")
        .type(primerNombreSuegrxPEP);

      //boton agregar
      cy.get(".mdc-button__label")
        .contains("span", "Agregar ", { timeout: 6000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true, timeout: 6000 });
      cy.wait(1000);
      //Boton guardar
      cy.get(".mdc-button__label")
        .contains("span", "Guardar ", { timeout: 6000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true, timeout: 6000 });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");

      //Boton siguiente
      cy.xpath('//*[@id="cdk-stepper-0-content-4"]/div/div/button')
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      //Segundo boton siguiente
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
    } else {
      cy.log("no entramos al flujo ya que esta pantalla no aparece");
    }
  }

  //pasos conyugue cuando es casado NO pep
  esCasado(
    tipoConyugue,
    apellidoConyugue,
    nombreConyugue,
    tipoCelularConyugue,
    numeroConyugue
  ) {
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    cy.wait(3000);
    if (this.EstadoCivil === " Casado(a) " && this.esPEP === "no") {
      if (tipoConyugue === "FEMENINO") {
        cy.get("#mat-radio-20-input").click({ force: true });
      } else {
        cy.get("#mat-radio-21-input").click({ force: true });
      }

      cy.xpath(
        '(//mat-label[contains(text(),"Primer Apellido")]/ancestor::mat-form-field//input)[2]'
      )
        .scrollIntoView()
        .should("be.visible")
        .clear()
        .type(apellidoConyugue, { delay: 50, force: true });

      cy.xpath(
        '//*[@id="cdk-stepper-0-content-3"]/div/byte-spouse-data/div/form/div[3]/byte-names/form/div/div[2]/app-input-material[1]/form/mat-form-field/div[1]'
      )
        .should("be.visible")
        .and("not.be.disabled")
        .type(nombreConyugue, { timeout: 6000 });

      cy.get(".mdc-floating-label")
        .contains("mat-label", "Tipo de Teléfono")
        .should("be.visible")
        .and("not.be.disabled")
        .click({ force: true })
        .then(() => {
          cy.get(".mdc-list-item__primary-text")
            .contains("span", tipoCelularConyugue)
            .click({ force: true });
        });
      cy.xpath(
        "(//mat-label[normalize-space()='Teléfono']/ancestor::div[contains(@class,'mat-mdc-form-field')]//input)[1]"
      )
        .should("be.visible")
        .click({ force: true })
        .clear()
        .type(numeroConyugue, { timeout: 6000 });

      cy.xpath("(//button[.//span[text()='Agregar']])[1]")
        .should("be.visible")
        .click({ force: true });

      cy.xpath(
        "(//button[@class='mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base ng-star-inserted'])[4]"
      )
        .should("be.visible")
        .click({ force: true });
    } else {
      cy.log("El cliente no es casado, no aparece esta pantalla");
    }
  }

  escasadoPEP(
    tipoConyugue,
    apellidoConyugue,
    nombreConyugue,
    cedulaConyuguePEP,
    anioExpiracionConyuguePEP,
    mesExpiracionConyuguePEP,
    diaExipracionConyugePEP,
    anioNacimientoConyuguePEP,
    mesNacimientoConyuguePEP,
    diaNacimientoConyugePEP,
    actividadEconomicaConyuguePEP,
    profesionConyuguePEP,
    pasaporteConyuguePEP,
    nacionalidadPasaporteConyuguePEP,
    UbicacionSegundaNacionalidadConyuguePEP,
    numeroSocialConyuguePEP
  ) {
    if (this.EstadoCivil === " Casado(a) " && this.esPEP === "si") {
      if (tipoConyugue === "FEMENINO") {
        cy.get("#mat-radio-20-input").click({ force: true });
      } else {
        cy.get("#mat-radio-21-input").click({ force: true });
      }

      cy.xpath(
        "//body[1]/app-root[1]/app-container[1]/bac-app-container[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/app-create-client[1]/div[1]/dyna-flow[1]/mat-stepper[1]/div[6]/div[1]/div[1]/div[1]/app-spouse[1]/div[1]/section[1]/div[1]/div[2]/mat-stepper[1]/div[1]/div[1]/div[1]/div[1]/form[1]/byte-spouse-data[1]/div[1]/form[1]/div[2]/app-documents-wrapper[1]/app-documents[1]/form[1]/table[1]/tbody[1]/tr[1]/td[1]/mat-form-field[1]/div[1]"
      )
        .should("be.visible")
        .should("not.be.disabled")
        .type(cedulaConyuguePEP, { timeout: 6000 });
      cy.wait(3000);

      cy.xpath("//input[@placeholder='Primer Apellido']")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoConyugue, { force: true });

      cy.xpath(
        '//mat-label[contains(text(),"Primer Nombre")]/ancestor::mat-form-field//input'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(nombreConyugue, { timeout: 6000, force: true });

      // Inicio flujo fecha de expiracion
      cy.xpath("(//button[@aria-label='Open calendar'])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true, timeout: 10000 });

      // Abre selector de mes/año
      cy.xpath("//button[@aria-label='Choose month and year']", {
        timeout: 60000,
      })
        .first()

        .click({ force: true }, { timeout: 6000 });
      function navegarHastaAnio(anioDeseado) {
        const buscarAnio = () => {
          cy.get("body").then(($body) => {
            // Verifica si el año está visible en la página actual
            if ($body.find(`span:contains(${anioDeseado})`).length > 0) {
              cy.contains("span", anioDeseado).click({ force: true });
            } else {
              // Si no está visible, haz clic en el botón de navegación y vuelve a buscar
              cy.get("button.mat-calendar-next-button")

                .click()
                .then(buscarAnio); // Llama recursivamente hasta encontrar el año
            }
          });
        };
        // Inicia la búsqueda
        buscarAnio();
      }
      navegarHastaAnio(anioExpiracionConyuguePEP); // Donde anioNacimiento es "2030" en tu caso
      cy.contains("span", mesExpiracionConyuguePEP, { timeout: 60000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.get(".mat-calendar-body-cell-content")
        .contains(diaExipracionConyugePEP, { timeout: 60000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.wait(2000); //Fin flujo fecha de vencimiento
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //inicio flujo fecha de nacimiento

      cy.xpath("(//button[@aria-label='Open calendar'])[4]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true, timeout: 10000 });

      // Abre selector de mes/año
      cy.xpath("//button[@aria-label='Choose month and year']", {
        timeout: 60000,
      })
        .first()

        .click({ force: true }, { timeout: 6000 });
      function navegarHastaAnio1(anioDeseado1) {
        const buscarAnio1 = () => {
          cy.get("body").then(($body) => {
            // Verifica si el año está visible en la página actual
            if ($body.find(`span:contains(${anioDeseado1})`).length > 0) {
              cy.contains("span", anioDeseado1).click({ force: true });
            } else {
              // Si no está visible, haz clic en el botón de navegación y vuelve a buscar
              cy.get("button.mat-calendar-previous-button")

                .click()
                .then(buscarAnio1); // Llama recursivamente hasta encontrar el año
            }
          });
        };
        // Inicia la búsqueda
        buscarAnio1();
      }
      navegarHastaAnio1(anioNacimientoConyuguePEP); // Donde anioNacimiento es "1995" en tu caso
      cy.contains("span", mesNacimientoConyuguePEP, { timeout: 60000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.get(".mat-calendar-body-cell-content")
        .contains(diaNacimientoConyugePEP, { timeout: 60000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.wait(2000); //Fin flujo fecha de nacimiento

      cy.xpath("(//mat-label[contains(text(),'Actividad Económica')])[2]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.get(".mdc-list-item__primary-text")
            .contains("span", actividadEconomicaConyuguePEP)
            .click({ force: true });
        });

      cy.xpath("(//mat-label[contains(text(),'Profesión')])[2]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.get(".mdc-list-item__primary-text")
            .contains("span", profesionConyuguePEP)
            .click({ force: true });
        });
      cy.xpath('(//mat-label[contains(text(),"PASAPORTE") and .//span[text()="*"]])[2]') 
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(pasaporteConyuguePEP)

        .then(() => {
          cy.xpath("(//mat-label[contains(text(),'Ubicación')])[6]").click({
            force: true,
          });
          cy.get(".mdc-list-item__primary-text")
            .contains("span", nacionalidadPasaporteConyuguePEP)
            .click({ force: true });
        });

      //Segunda nacionalidad conyugue pep
      cy.xpath("(//mat-label[contains(text(),'2da. Nacionalidad')])[2]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.get(".mdc-list-item__primary-text")
            .contains("span", UbicacionSegundaNacionalidadConyuguePEP)
            .click({ force: true })

        });

        cy.get(".loading", { timeout: 60000 }).should("not.exist");
      // if (UbicacionSegundaNacionalidadConyuguePEP === " ESTADOUNIDENSE ") {
      //      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //   cy.xpath("//mat-label[normalize-space()='Social Security Number']/ancestor::div[contains(@class,'mat-mdc-text-field-wrapper')]/descendant::input")
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .clear()
      //     .type(numeroSocialConyuguePEP);
      // } else {
      //   cy.log("no aplica este paso ya que no tiene nacionalidad estadounidense")

      // }

      cy.xpath("(//button[contains(@class, 'mdc-button')]//span[contains(@class, 'mdc-button__label') and text()='Siguiente'])[6]").filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible").click({force:true})
    } else {
      cy.log("No es pep casado por lo que se salta este flujo");
    }
  }
}

export default PersonaNatural;
