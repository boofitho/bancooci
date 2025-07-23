require("cypress-xpath");
class PersonaNatural {
  validarSiSeDebeCrearCliente() {
    return cy.get("body").then(($body) => {
      return $body
        .text()
        .includes("No hay resultados para los criterios proporcionados.");
    });
  }
  constructor() {
    this.correo = ""; // variable global dentro del PO
  }

  calendarioNext(anioNext, mesNext, diaNext) {
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
    navegarHastaAnio(anioNext);
    cy.contains("span", mesNext, { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.get(".mat-calendar-body-cell-content")
      .contains(diaNext, { timeout: 60000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });
    cy.wait(2000);
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

  IdentificacionGeneralPersonaNatural(
    InfoTipoDocumento,
    anio,
    mes,
    dia,
    RTN,
    correo
  ) {
    this.correo = correo;
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
      cy.wait(3000)
      cy.seleccionarAutorizacionLocal("Autorizacion RTN");
           cy.seleccionarAutorizacionLocal("Menor de edad");

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
    this.PrimerNombre = PrimerNombre;
    this.EstadoCivil = EstadoCivil; //  AQUÍ se guarda correctamente
    this.anioNacimiento = anioNacimiento;
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
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
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
    cy.wait(2000);
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
        cy.get(".loading", { timeout: 60000 }).should("not.exist");
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
          cy.get(".loading", { timeout: 60000 }).should("not.exist");
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
      cy.get(".loading", { timeout: 150000 }).should("not.exist");

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
    cy.get(".loading", { timeout: 90000 }).should("not.exist");
    cy.wait(2000);
    //Para madre de persona PEP (datos indispensables de acuerdo al flujo)
    if (this.esPEP === "si") {
      // Datos de la madre
      // Primer Apellido - madre
      cy.window().then((win) => {
        // Subir 500 píxeles desde donde esté
        win.scrollBy(0, -500);
      });
      cy.xpath(
        '//mat-form-field[.//mat-label[normalize-space(.)="Primer Apellido"]]//input[@type="text"]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoMamaPEP, { force: true, timeout: 6000 });
      cy.wait(4000);
      // Primer Nombre - madre
      cy.xpath(
        "//body[1]/app-root[1]/app-container[1]/bac-app-container[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/app-create-client[1]/div[1]/dyna-flow[1]/mat-stepper[1]/div[5]/div[1]/div[1]/div[1]/app-parentescos[1]/mat-tab-group[1]/div[1]/mat-tab-body[1]/div[1]/app-relationship[1]/div[1]/section[1]/div[1]/div[3]/byte-names[1]/form[1]/div[1]/div[2]/app-input-material[1]/form[1]/mat-form-field[1]/div[1]/div[1]/div[2]"
      )
        .scrollIntoView()
        .should("be.visible")
        .type(primerNombreMamaPEP, { timeout: 6000 });
      cy.wait(1000);

      // Dirección - madre
      cy.xpath("(//input[@placeholder='Dirección'])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(direccionMamaPEP, { force: true, timeout: 6000 });

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
      cy.wait(4000);
      cy.window().then((w) => w.scrollTo(0, w.scrollY - w.innerHeight));
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.wait(3000);
      cy.xpath(
        "//div[contains(@class,'mat-step')]//div[contains(text(),'Parentescos')]"
      )
        .scrollIntoView()
        .should("be.visible");
      //Flujo para llenar datos de suegros
      cy.xpath(
        "//div[@role='tab' and .//span[contains(@class, 'mdc-tab__text-label') and contains(text(), 'Suegros')]]"
      )
        .scrollIntoView({ offset: { top: 0, left: 0 } })
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(2000);
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //Opcion parentesco
      cy.xpath(
        '//*[@id="mat-tab-group-1-content-1"]/div/app-relationship/div/section[1]/div/div[2]/app-auto-complete/section/mat-form-field/div[1]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.window().then((win) => {
            win.scrollTo(0, 0); // Scroll hasta arriba del todo
          });
          cy.wait(3000);
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
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //Boton guardar
      cy.xpath(
        '//*[@id="mat-tab-group-1-content-1"]/div/app-relationship/div/section[2]/div/button/span[2]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true, timeout: 6000 });

      cy.wait(4000);
      cy.get(".loading", { timeout: 60000 }).should("not.exist");

      cy.wait(4000);
      //Boton siguiente
      cy.xpath(
        "(//span[@class='mdc-button__label'][normalize-space()='Siguiente'])[5]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true, timeout: 10000 });

      cy.wait(4000);
      //Segundo boton siguiente

      cy.get(".loading", { timeout: 80000 }).should("not.exist");
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
    cy.get(".loading", { timeout: 80000 }).should("not.exist");
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
      cy.wait(2000);
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
    aniosResidirConuygue,
    ubicacionconyugue,
    tipoCorreoConyuguePEP,
    tipoTelefonoConyuguePEP,
    telefonoConyuguePEP,
    referenciaLaboralConyuguePEP,
    sexoReferenciaLaboralConyuguePEP,
    primerApellidoReferenciaLaboralPEP,
    primerNombreReferenciaLaboralPEP,
    anioIngresoReferenciaConyuguePEP,
    mesIngresoReferenciaConyuguePEP,
    diaIngresoReferenciaConyugePEP,
    anioEgresoReferenciaConyuguePEP,
    mesEgresoReferenciaConyuguePEP,
    diaEgresoReferenciaConyugePEP,
    puestoReferenciaConyuguePEP,
    direccionReferenciaLaboralConyuguePEP,
    tipoCorreoContactoConyuguePEP,
    tipoTelefonoContactoConyuguePEP,
    telefonoContactoConyugue,
    nombreEmpresaConyuePEP,
    anioIngresoInscripcionConyuguePEP,
    mesIngresoInscripcionConyuguePEP,
    diaIngresoInscripcionConyugePEP,
    giroNegocioConyuguePEP,
    ingresosMensualesConyuguePEP,
    categoriadeNegocioConyuguePEP,
    anioResidirNegocioConyuguePEP,
    ubicacionNegocioConyuguePEP,
    correo
  ) {
    this.nombreConyugue = nombreConyugue;
    this.primerNombreReferenciaLaboralPEP = primerNombreReferenciaLaboralPEP;
    if (this.EstadoCivil === " Casado(a) " && this.esPEP === "si") {
      if (tipoConyugue === "FEMENINO") {
        cy.get("#mat-radio-20-input").click({ force: true });
      } else {
        cy.get("#mat-radio-21-input").click({ force: true });
      }

      cy.xpath(
        "//body[1]/app-root[1]/app-container[1]/bac-app-container[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/app-create-client[1]/div[1]/dyna-flow[1]/mat-stepper[1]/div[6]/div[1]/div[1]/div[1]/app-spouse[1]/div[1]/section[1]/div[1]/div[2]/mat-stepper[1]/div[1]/div[1]/div[1]/div[1]/form[1]/byte-spouse-data[1]/div[1]/form[1]/div[2]/app-documents-wrapper[1]/app-documents[1]/form[1]/table[1]/tbody[1]/tr[1]/td[1]/mat-form-field[1]/div[1]"
      )
        .click({ force: true })
        .find("input")
        .should("be.visible")
        .type(cedulaConyuguePEP, { force: true, timeout: 6000 });
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
      cy.wait(500);
      cy.contains("span", mesNacimientoConyuguePEP, { timeout: 60000 })
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.wait(500);
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
      cy.xpath(
        '(//mat-label[contains(text(),"PASAPORTE") and .//span[text()="*"]])[2]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(pasaporteConyuguePEP)

        .then(() => {
          cy.xpath(
            "(//mat-label[text()='Ubicación']/ancestor::mat-form-field//input)[6]"
          ).click({
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
            .click({ force: true });
        });

      cy.get(".loading", { timeout: 90000 }).should("not.exist");

      cy.xpath(
        "(//button[contains(@class, 'mdc-button')]//span[contains(@class, 'mdc-button__label') and text()='Siguiente'])[6]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.wait(500);

      //Paso 2 años de residencia conyugue PEP
      cy.get("body").type("{pageUp}");
      cy.wait(1000);
      cy.get(".loading", { timeout: 70000 }).should("not.exist");
      cy.wait(3000);
      cy.xpath('//input[@placeholder="Ingrese los años de residir"]')
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(aniosResidirConuygue, { timeout: 6000, force: true });
      cy.wait(1000);
      cy.xpath("(//mat-label[contains(text(),'Ingrese una ubicación')])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(ubicacionconyugue, { timeout: 6000 });

      // Espera a que desaparezca el loading si hay
      cy.get(".loading", { timeout: 60000 }).should("not.exist");

      // Espera a que las opciones se desplieguen
      cy.get("mat-option", { timeout: 10000 })
        .should("have.length.greaterThan", 0)
        .then(($options) => {
          const posicion = 0; // aquí puedes cambiar por cualquier número
          if ($options.length > posicion) {
            cy.wrap($options).eq(posicion).click({ force: true });
          } else {
            cy.log(
              `No hay suficientes opciones, solo existen ${$options.length}`
            );
          }
        });
      cy.wait(500);
      cy.xpath(
        "(//span[@class='mdc-button__label'][normalize-space()='Buscar'])[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.xpath(
        "(//span[@class='mdc-button__label'][normalize-space()='Siguiente'])[7]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(1000);
      cy.xpath("(//mat-label[contains(text(),'Tipo de Correo')])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.wait(1000);
          cy.window().then((win) => {
            win.scrollTo(0, 90); // Se desplaza 100px desde el top
          });
          cy.xpath(
            `//mat-option/span[text()="${tipoCorreoConyuguePEP}"]`
          ).click({ force: true });
        });
      cy.xpath("(//mat-label[contains(text(),'Correo')])[2]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(this.nombreConyugue + this.correo)
        .then(() => {
          cy.xpath(
            '//*[@id="cdk-stepper-1-content-2"]/div/app-contact/div/section[1]/div/div[2]/div/button/span[2]'
          )
            .filter(":not(:disabled)")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });
        });
      cy.xpath("(//mat-label[contains(text(),'Tipo de Teléfono')])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.wait(500);
          cy.get(".mdc-list-item__primary-text")
            .contains("span", tipoTelefonoConyuguePEP)
            .click({ force: true });
        });

      cy.xpath(
        '(//mat-label[text()="Teléfono"]/ancestor::mat-form-field//input)[1]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .clear()
        .type(telefonoConyuguePEP);
      cy.xpath('(//button[.//span[text()="Agregar"]])[2]')
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.xpath('(//button[.//span[text()="Siguiente"]])[8]')
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      //Referencias laborales conyugue PEP

      // function seleccionarTipoPersona(tipo) {
      //   // Normaliza el texto a mayúsculas para comparar
      //   const tipoNormalizado = tipo.toUpperCase().trim();

      //   if (tipoNormalizado === "NATURAL") {
      //     cy.get('input[value="NATURAL"]').check({ force: true });
      //   } else {
      //     cy.log(`Tipo de persona no válido: "${tipo}"`);
      //   }
      // }

      // seleccionarTipoPersona(referenciaLaboralConyuguePEP);

      if (
        referenciaLaboralConyuguePEP === "NATURAL" ||
        "natural" ||
        "Natural"
      ) {
        cy.log("flujo si es natural la referencia laboral conyugue PEP");
        cy.get('input[value="NATURAL"]').check({ force: true });
        function seleccionarSexo(sexo) {
          // Normaliza el texto a mayúsculas y maneja posibles variaciones
          const sexoNormalizado = sexo.toUpperCase().trim();

          if (
            sexoNormalizado === "FEMENINO" ||
            sexoNormalizado === "FEMENINA" ||
            sexoNormalizado === "FEMENINA" ||
            sexoNormalizado === "MUJER"
          ) {
            cy.get('input[value="FEMENINO"]').check({ force: true });
          } else if (
            sexoNormalizado === "MASCULINO" ||
            sexoNormalizado === "HOMBRE" ||
            sexoNormalizado === "VARON"
          ) {
            cy.get('input[value="MASCULINO"]').check({ force: true });
          } else {
            throw new Error(
              `Sexo no reconocido: ${sexo}. Use "Femenino" o "Masculino".`
            );
          }
        }

        seleccionarSexo(sexoReferenciaLaboralConyuguePEP);
        cy.wait(1000);
        cy.xpath(
          "(//mat-label[@class='ng-star-inserted'][normalize-space()='Primer Apellido'])[3]"
        )
          .scrollIntoView()
          .should("be.visible")

          .then(($label) => {
            // Desde el mat-label, navegamos al input relacionado
            cy.wrap($label)
              .parents("mat-form-field")
              .find("input")
              .should("be.visible")
              .clear()
              .type(primerApellidoReferenciaLaboralPEP, { force: true });
          });

        cy.xpath(
          "(//mat-label[contains(.,'Primer Nombre')])[3]//ancestor::mat-form-field//input"
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .clear()
          .type(primerNombreReferenciaLaboralPEP, { force: true });

        //Fecha ingreso calendario
        cy.xpath("(//button[@aria-label='Open calendar'])[5]")
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
        navegarHastaAnio1(anioIngresoReferenciaConyuguePEP); // Donde anioNacimiento es "2001" en tu caso
        cy.contains("span", mesIngresoReferenciaConyuguePEP, { timeout: 60000 })
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaIngresoReferenciaConyugePEP, { timeout: 60000 })
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.wait(2000); //Fin flujo fecha de vencimiento
        cy.get(".loading", { timeout: 60000 }).should("not.exist");

        //Fecha Egreso Calendario
        cy.xpath("(//button[@aria-label='Open calendar'])[6]")
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
        function navegarHastaAnio3(anioDeseado3) {
          const buscarAnio3 = () => {
            cy.get("body").then(($body) => {
              // Verifica si el año está visible en la página actual
              if ($body.find(`span:contains(${anioDeseado3})`).length > 0) {
                cy.contains("span", anioDeseado3).click({ force: true });
              } else {
                // Si no está visible, haz clic en el botón de navegación y vuelve a buscar
                cy.get("button.mat-calendar-previous-button")

                  .click()
                  .then(buscarAnio3); // Llama recursivamente hasta encontrar el año
              }
            });
          };
          // Inicia la búsqueda
          buscarAnio3();
        }
        navegarHastaAnio3(anioEgresoReferenciaConyuguePEP); // Donde anioNacimiento es "2020" en tu caso
        cy.contains("span", mesEgresoReferenciaConyuguePEP, { timeout: 60000 })
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaEgresoReferenciaConyugePEP, { timeout: 60000 })
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.wait(2000); //Fin flujo fecha de egreso
        cy.xpath(
          '//mat-label[normalize-space(text())="Puesto"]/ancestor::div[contains(@class, "mat-mdc-form-field-flex")]//input'
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .type(puestoReferenciaConyuguePEP, { force: true });

        const indiceSalario = 1; // ← Cambiá este número según el que querés seleccionar

        cy.xpath("(//mat-label[normalize-space()='Salario'])[1]")
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true })
          .then(() => {
            cy.xpath("//mat-option")
              .should("have.length.greaterThan", indiceSalario) // asegura que existe el índice
              .eq(indiceSalario)
              .click({ force: true });
          });

        cy.xpath('//*[@id="cdk-accordion-child-4"]/mat-action-row/button')
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        cy.xpath(
          '//*[@id="mat-expansion-panel-header-5"]/span/mat-panel-title'
        ).scrollIntoView();

        //Referencias laborales pep direccion
        cy.wait(2000);
        cy.xpath(
          "(//mat-label[.='Ingrese una ubicación']/ancestor::div[contains(@class,'mat-mdc-text-field-wrapper')]//input) [2]"
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .type(direccionReferenciaLaboralConyuguePEP, {
            timeout: 6000,
            force: true,
          })
          .then(() => {
            cy.wait(3000);
            function selectDropdownOption(index = 1) {
              cy.xpath("//mat-option[contains(@class,'mat-mdc-option')]")
                .should("have.length.gt", index) // Verifica que existan suficientes opciones
                .eq(index)
                .click({ force: true });
            }

            // Uso:
            selectDropdownOption(1); // Selecciona el segundo elemento
          });

        cy.xpath(
          "(//span[@class='mdc-button__label'][normalize-space()='Buscar'])[2]"
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });

        //Boton siguiente

        cy.xpath(
          "(//span[@class='mdc-button__label'][normalize-space()='Siguiente'])[10]"
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        cy.wait(500);

        //datos contacto conyugue PEP
        cy.xpath(
          '//*[@id="cdk-accordion-child-6"]/div/section/app-contact/div/section[1]/div/div[2]/app-select-material/section/mat-form-field/div[1]'
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true })
          .then(() => {
            cy.get(".mdc-list-item__primary-text")
              .contains("span", tipoCorreoContactoConyuguePEP)
              .click({ force: true });
            cy.wait(500);
            cy.xpath(
              "(//mat-label[.='Correo']/ancestor::div[contains(@class,'mat-mdc-text-field-wrapper')]//input)[2]"
            )
              .filter(":not(:disabled)")
              .first()
              .scrollIntoView()
              .should("be.visible")
              .type(primerNombreReferenciaLaboralPEP + this.correo);
            //boton agregar
            cy.xpath(
              '//*[@id="cdk-accordion-child-6"]/div/section/app-contact/div/section[1]/div/div[2]/div/button/span[2]'
            )
              .filter(":not(:disabled)")
              .first()
              .scrollIntoView()
              .should("be.visible")
              .click({ force: true });
          });

        //Telefono
        cy.xpath(
          "(//mat-label[.='Tipo de Teléfono']/ancestor::div[contains(@class,'mat-mdc-text-field-wrapper')]//mat-select)[2]"
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true })
          .then(() => {
            cy.wait(1000);
            cy.get(".mdc-list-item__primary-text")
              .contains("span", tipoTelefonoContactoConyuguePEP)
              .click({ force: true });
            cy.xpath(
              "(//mat-label[.='Teléfono']/ancestor::div[contains(@class,'mat-mdc-text-field-wrapper')]//input)[2]"
            )
              .filter(":not(:disabled)")
              .first()
              .scrollIntoView()
              .should("be.visible")
              .clear()
              .type(telefonoContactoConyugue, { force: true });
            cy.xpath(
              '//*[@id="cdk-accordion-child-6"]/div/section/app-contact/div/section[2]/div/div[2]/div/button/span[2]'
            )
              .filter(":not(:disabled)")
              .first()
              .scrollIntoView()
              .should("be.visible")
              .click({ force: true });
          });
        cy.xpath(
          '//*[@id="cdk-accordion-child-6"]/mat-action-row/button[2]/span[2]'
        )
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });

        cy.xpath('//*[@id="cdk-stepper-1-content-3"]/div/div/button[2]/span[2]')
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });

        //Datos del negocio

        cy.xpath(
          "//button[.//mat-icon[@aria-label='add'] and .//span[text()='Agregar ']]"
        ).click({ force: true });

        cy.wait(2000);
        cy.xpath(
          "//mat-label[text()='Nombre de la Empresa']/ancestor::label[@matformfieldfloatinglabel]//following::input[1]"
        )
          .filter(":visible")
          .type(nombreEmpresaConyuePEP, { force: true });
        //Fecha ingreso calendario fecha de inscripcion
        cy.xpath("//button[@aria-label='Open calendar']")
          .filter(":visible")

          .click({ force: true, timeout: 10000 });

        // Abre selector de mes/año
        cy.xpath("//button[@aria-label='Choose month and year']", {
          timeout: 60000,
        })
          .first()

          .click({ force: true }, { timeout: 6000 });
        function navegarHastaAnio4(anioDeseado4) {
          const buscarAnio4 = () => {
            cy.get("body").then(($body) => {
              // Verifica si el año está visible en la página actual
              if ($body.find(`span:contains(${anioDeseado4})`).length > 0) {
                cy.contains("span", anioDeseado4).click({ force: true });
              } else {
                // Si no está visible, haz clic en el botón de navegación y vuelve a buscar
                cy.get("button.mat-calendar-previous-button")

                  .click()
                  .then(buscarAnio4); // Llama recursivamente hasta encontrar el año
              }
            });
          };
          // Inicia la búsqueda
          buscarAnio4();
        }
        navegarHastaAnio4(anioIngresoInscripcionConyuguePEP); // Donde anioNacimiento es "2001" en tu caso
        cy.contains("span", mesIngresoInscripcionConyuguePEP, {
          timeout: 60000,
        })
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.get(".mat-calendar-body-cell-content")
          .contains(diaIngresoInscripcionConyugePEP, { timeout: 60000 })
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
        cy.wait(2000); //Fin flujo fecha de vencimiento
        cy.xpath(
          "//mat-label[text()='Giro del Negocio']/ancestor::mat-form-field//input"
        )
          .filter(":visible")
          .type(giroNegocioConyuguePEP, { force: true })
          .tab()
          .type(ingresosMensualesConyuguePEP, { force: true })
          .tab()
          .type(categoriadeNegocioConyuguePEP, { force: true });
        cy.xpath(
          "(//mat-label[text()='Años de residir']/ancestor::mat-form-field//input)[3]"
        )
          .filter(":visible")
          .type(anioResidirNegocioConyuguePEP, { force: true });
        cy.xpath(
          "(//mat-label[text()='Ingrese una ubicación']/ancestor::mat-form-field//input)[4]"
        )
          .filter(":visible")
          .type(ubicacionNegocioConyuguePEP, { force: true })
          .then(() => {
            cy.wait(500);
            cy.get('div[role="listbox"] mat-option')
              .eq(1)
              .click({ force: true });
          });
        cy.wait(500);
        cy.xpath("(//button[.//span[text()='Buscar']])[4]").click({
          force: true,
        });

        cy.wait(500);
        cy.xpath("(//button[.//span[text()='Agregar ']])[2]")
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({
            force: true,
          });
        cy.wait(500);

        cy.xpath("(//button[.//span[text()='Siguiente']])[12]")
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({
            force: true,
          });
        //boton siguiente para terminar el flujo de conyugue

        cy.wait(2000);
        cy.xpath("(//button[.//span[text()='Siguiente']])[13]")
          .filter(":not(:disabled)")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({
            force: true,
          });
        cy.xpath(
          '//*[@id="cdk-stepper-0-content-5"]/div/div/button/span[2]'
        ).click({ force: true });

        cy.get(".loading", { timeout: 120000 }).should("not.exist");

        //Flujo para referencia juridica
      } else {
        cy.log("Flujo para persona Juridica");
        cy.get('input[value="JURIDICA"]').check({ force: true });
      }
    } else {
      cy.log("No es pep casado por lo que se salta este flujo");
    } //***TERMINAR FLUJO */
  }

  //Paso 7 direccion cliente ver si es pep o tambien persona normal paso 7 en pep paso 4 direccion si es soltero y no pep
  direccionCliente(aniosResidir, ubicacionResidencia) {
    if (this.esPEP === "si" && this.EstadoCivil === " Casado(a) ") {
      cy.wait(2000);
      cy.xpath(
        "(//mat-label[contains(text(), 'Años de residir')]/ancestor::mat-form-field//input)[2]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(aniosResidir, { force: true });

      cy.xpath(
        "(//mat-label[normalize-space()='Ingrese una ubicación']/ancestor::mat-form-field//input)[3]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(ubicacionResidencia, { force: true });

      cy.wait(500);
      cy.get(".mat-mdc-autocomplete-panel mat-option").eq(1).click();
      cy.wait(500);

      cy.xpath("(//button[.//span[text()='Buscar']])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.wait(500);
      cy.xpath("(//button[.//span[text()='Siguiente']])[14]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //cuando es pep
    } else if (this.esPEP === "si") {
      cy.log("Es PEP pero no está casado(a)");
      cy.xpath(
        "(//mat-label[contains(text(), 'Años de residir')]/ancestor::mat-form-field//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(aniosResidir, { force: true });

      cy.xpath(
        "(//mat-label[normalize-space()='Ingrese una ubicación']/ancestor::mat-form-field//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(ubicacionResidencia, { force: true });
      cy.wait(500);
      cy.get(".mat-mdc-autocomplete-panel mat-option").eq(1).click();
      cy.wait(500);
      cy.xpath("(//button[.//span[text()='Buscar']])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.wait(500);
      cy.xpath("(//button[.//span[text()='Siguiente']])[6]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get(".loading", { timeout: 90000 }).should("not.exist");
    } else if (this.esPEP === "no" && this.EstadoCivil === " Casado(a) ") {
      cy.log("Es casado y no es pep");
      cy.get(".loading", { timeout: 90000 }).should("not.exist");
      cy.xpath("//mat-label[normalize-space()='País']")
        .scrollIntoView({ block: "start" })
        .wait(500);
      cy.xpath(
        "(//mat-label[contains(text(), 'Años de residir')]/ancestor::mat-form-field//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(aniosResidir, { force: true });

      cy.xpath(
        "(//mat-label[normalize-space()='Ingrese una ubicación']/ancestor::mat-form-field//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(ubicacionResidencia, { force: true });
      cy.wait(500);
      cy.get(".mat-mdc-autocomplete-panel mat-option").eq(1).click();
      cy.wait(500);

      cy.xpath("(//button[.//span[text()='Buscar']])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[text()='Siguiente']])[5]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else {
      cy.log("No es PEP y no es casado");
      cy.wait(1000);
      cy.get(".loading", { timeout: 90000 }).should("not.exist");
      cy.xpath("//mat-label[normalize-space()='País']")
        .scrollIntoView({ block: "start" })
        .wait(500);
      cy.xpath(
        "(//mat-label[contains(text(), 'Años de residir')]/ancestor::mat-form-field//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(aniosResidir, { force: true });

      cy.xpath(
        "(//mat-label[normalize-space()='Ingrese una ubicación']/ancestor::mat-form-field//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(ubicacionResidencia, { force: true });
      cy.wait(500);
      cy.get(".mat-mdc-autocomplete-panel mat-option").eq(1).click();
      cy.wait(500);

      cy.xpath("(//button[.//span[text()='Buscar']])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[text()='Siguiente']])[4]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    }
  }

  contactoCliente(
    tipoCorreoContactoCliente,
    tipoTelefonoContactoCliente,
    telefonoContactoCliente
  ) {
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    if (this.esPEP === "si" && this.EstadoCivil === " Casado(a) ") {
      cy.log("Flujo cuando es pep y esta casad@");

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[3]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoCorreoContactoCliente).click({ force: true });
        });
      cy.wait(500);

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[3]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(this.PrimerNombre + this.correo, { force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[7]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[3]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoTelefonoContactoCliente).click({
            force: true,
          });
          cy.wait(500);

          cy.xpath(
            "(//mat-label[contains(normalize-space(.), 'Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[3]"
          )
            .filter(":not(:disabled)")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .clear()
            .type(telefonoContactoCliente, { force: true });
        });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[8]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[15]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else if (this.esPEP === "si") {
      cy.log("Flujo cuando es pep");
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoCorreoContactoCliente).click({ force: true });
        });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(this.PrimerNombre + this.correo, { force: true });
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[1]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoTelefonoContactoCliente).click({
            force: true,
          });
          cy.wait(500);

          cy.xpath(
            "(//mat-label[contains(normalize-space(.), 'Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[1]"
          )
            .filter(":not(:disabled)")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .clear()
            .type(telefonoContactoCliente, { force: true });
        });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[2]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[7]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else if (this.esPEP !== "si" && this.EstadoCivil === " Casado(a) ") {
      cy.log("Flujo cuando no es pep pero es casado");
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoCorreoContactoCliente).click({ force: true });
        });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(this.PrimerNombre + this.correo, { force: true });
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[2]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoTelefonoContactoCliente).click({
            force: true,
          });
          cy.wait(500);

          cy.xpath(
            "(//mat-label[contains(normalize-space(.), 'Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[2]"
          )
            .filter(":not(:disabled)")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .clear()
            .type(telefonoContactoCliente, { force: true });
        });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[4]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[6]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
    } else {
      cy.log("Flujo cuando no es pep y no importando su estado civil");

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoCorreoContactoCliente).click({ force: true });
        });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Correo')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(this.PrimerNombre + this.correo, { force: true });
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[2]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'Tipo de Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select)[1]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true })
        .wait(500)
        .then(() => {
          cy.contains("span", tipoTelefonoContactoCliente).click({
            force: true,
          });
          cy.wait(500);

          cy.xpath(
            "(//mat-label[contains(normalize-space(.), 'Teléfono')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[1]"
          )
            .filter(":not(:disabled)")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .clear()
            .type(telefonoContactoCliente, { force: true });
        });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[5]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    }
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
  }

  dependenciaEconomica(
    tieneDependenciaEconomica,
    parentescoDependenciaEconomica,
    cedulaDependenciaEconomica,
    anioNext,
    mesNext,
    diaNext,
    apellidoDependenciaEconomica,
    nombredependenciaEconomica
  ) {
    if (
      tieneDependenciaEconomica === "si" &&
      this.esPEP === "si" &&
      this.EstadoCivil === " Casado(a) "
    ) {
      cy.log("Se marco que si depende economicamente de alguien y es PEP");
      cy.xpath(
        "//span[normalize-space()='¿Depende economicamente de alguien?']"
      ).click({ force: true });
      cy.wait(500);
      cy.xpath(
        "//mat-label[normalize-space()='Parentesco']/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.contains("span", parentescoDependenciaEconomica).click({
        force: true,
      });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'CEDULA DE IDENTIDAD')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[3]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(cedulaDependenciaEconomica, { force: true });
      cy.wait(500);
      //Entrar al calendario
      cy.xpath("(//button[@aria-label='Open calendar'])[7]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      this.calendarioNext(anioNext, mesNext, diaNext);
      cy.wait(500);
      cy.get(".loading", { timeout: 90000 }).should("not.exist");
      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Apellido"]/ancestor::mat-form-field//input)[3]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.get(".loading", { timeout: 90000 }).should("not.exist");
      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Nombre"]/ancestor::mat-form-field//input)[3]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(nombredependenciaEconomica, { force: true });
      cy.wait(500);
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[9]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[16]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      // } else if (+this.anioNacimiento.trim() <= 2007) {
      //   cy.log("Debe de ingresar ya que es menor de edad");
      //   cy.xpath(
      //     "//mat-label[normalize-space()='Parentesco']/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select"
      //   )
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .click({ force: true });
      //   cy.wait(500);
      //   cy.contains("span", parentescoDependenciaEconomica).click({
      //     force: true,
      //   });
      //   cy.wait(500);
      //   cy.xpath(
      //     "(//mat-label[contains(normalize-space(.), 'CEDULA DE IDENTIDAD')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[2]"
      //   )
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .type(cedulaDependenciaEconomica, { force: true });
      //   cy.wait(500);

      //   cy.xpath("(//button[@aria-label='Open calendar'])[3]")
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .click({ force: true });
      //   //Entrar al calendario
      //   this.calendarioNext(anioNext, mesNext, diaNext);
      //   cy.wait(500);
      //   cy.xpath(
      //     '(//mat-label[normalize-space(text())="Primer Apellido"]/ancestor::mat-form-field//input)[2]'
      //   )
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .type(apellidoDependenciaEconomica, { force: true });
      //   cy.wait(500);
      //   cy.xpath(
      //     '(//mat-label[normalize-space(text())="Primer Nombre"]/ancestor::mat-form-field//input)[2]'
      //   )
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .type(nombredependenciaEconomica, { force: true });
      //   cy.wait(500);
      //   cy.xpath("(//button[.//span[normalize-space()='Agregar']])[4]")
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .click({ force: true });

      //   cy.get(".loading", { timeout: 60000 }).should("not.exist");
      //   cy.wait(500);
      //   cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[6]")
      //     .filter(":not(:disabled)")
      //     .first()
      //     .scrollIntoView()
      //     .should("be.visible")
      //     .click({ force: true });
    } else if (tieneDependenciaEconomica === "si" && this.esPEP === "si") {
      cy.log("tiene dependencia economica y es soltero pero es PEP");

      cy.xpath(
        "//span[normalize-space()='¿Depende economicamente de alguien?']"
      ).click({ force: true });
      cy.wait(500);
      cy.xpath(
        "//mat-label[normalize-space()='Parentesco']/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.contains("span", parentescoDependenciaEconomica).click({
        force: true,
      });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'CEDULA DE IDENTIDAD')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[2]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(cedulaDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath("(//button[@aria-label='Open calendar'])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      //Entrar al calendario
      this.calendarioNext(anioNext, mesNext, diaNext);
      cy.wait(500);
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Apellido"]/ancestor::mat-form-field//input)[2]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Nombre"]/ancestor::mat-form-field//input)[2]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(nombredependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.wait(2000);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[8]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else if (
      tieneDependenciaEconomica === "si" &&
      this.EstadoCivil == " Casado(a) " &&
      this.esPEP !== "si"
    ) {
      //flujo cuando tiene dependencia economica es casado y no es pep
      cy.log("cualquier tipo de situacion de estado civil menos casado");
      cy.xpath(
        "//span[normalize-space()='¿Depende economicamente de alguien?']"
      ).click({ force: true });
      cy.wait(500);
      cy.xpath(
        "//mat-label[normalize-space()='Parentesco']/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.contains("span", parentescoDependenciaEconomica).click({
        force: true,
      });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'CEDULA DE IDENTIDAD')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[2]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(cedulaDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath("(//button[@aria-label='Open calendar'])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      //Entrar al calendario
      this.calendarioNext(anioNext, mesNext, diaNext);
      cy.wait(500);
      cy.get(".loading", { timeout: 1500000 }).should("not.exist");

      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Apellido"]/ancestor::mat-form-field//input)[2]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Nombre"]/ancestor::mat-form-field//input)[2]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(nombredependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[4]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[6]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else if (
      tieneDependenciaEconomica === "si" &&
      this.EstadoCivil !== " Casado(a) " &&
      this.esPEP !== "si"
    ) {
      //puede ser soltero, viudo u otro 
      cy.log("cualquier tipo de situacion de estado civil menos casado");
      cy.xpath(
        "//span[normalize-space()='¿Depende economicamente de alguien?']"
      ).click({ force: true });
      cy.wait(500);
      cy.xpath(
        "//mat-label[normalize-space()='Parentesco']/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//mat-select"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.wait(500);
      cy.contains("span", parentescoDependenciaEconomica).click({
        force: true,
      });
      cy.wait(500);
      cy.xpath(
        "(//mat-label[contains(normalize-space(.), 'CEDULA DE IDENTIDAD')]/ancestor::div[contains(@class, 'mat-mdc-text-field-wrapper')]//input)[2]"
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(cedulaDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath("(//button[@aria-label='Open calendar'])[3]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      //Entrar al calendario
      this.calendarioNext(anioNext, mesNext, diaNext);
      cy.wait(500);
      cy.get(".loading", { timeout: 1500000 }).should("not.exist");

      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Apellido"]/ancestor::mat-form-field//input)[3]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(apellidoDependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath(
        '(//mat-label[normalize-space(text())="Primer Nombre"]/ancestor::mat-form-field//input)[3]'
      )
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .type(nombredependenciaEconomica, { force: true });
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Agregar']])[5]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
      cy.get(".loading", { timeout: 60000 }).should("not.exist");
      cy.wait(500);
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[7]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else if (
      tieneDependenciaEconomica === "no" &&
      this.esPEP === "si" &&
      this.EstadoCivil === " Casado(a) "
    ) {
      cy.log("no aplica por lo que se salta el flujo");
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[16]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      //poner click de siguiente pero para todos los flujos pep soltero, pep casado, soltero normal u otra estado civil
    } else if (
      tieneDependenciaEconomica === "no" &&
      this.esPEP === "si" &&
      this.EstadoCivil !== " Casado(a) "
    ) {
      cy.log("no aplica por lo que se salta el flujo");
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[7]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else if (
      tieneDependenciaEconomica === "no" &&
      this.esPEP !== "si" &&
      this.EstadoCivil === " Casado(a) "
    ) {
      cy.log("No tiene dependencia economica pero es casado");
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[7]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    } else {
      cy.log("no aplica por lo que se salta el flujo");
      cy.xpath("(//button[.//span[normalize-space()='Siguiente']])[6]")
        .filter(":not(:disabled)")
        .first()
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });
    }
  }

  //************************************************************************/
  //Inicio de flujo cuando un cliente existe
  //
  //
  //
  //
  //
  //
  //
  //
  //

  ClienteCreadoParcialmente(esPEP, EstadoCivil) {
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    cy.xpath(
      "(//span[@class='mdc-button__label'][normalize-space()='Siguiente'])[1]"
    ).click({ force: true });
    cy.get(".loading", { timeout: 60000 }).should("not.exist");

    cy.xpath("(//button[.//span[text()='Siguiente']])[2]").click({
      force: true,
    });
    cy.get(".loading", { timeout: 60000 }).should("not.exist");

    cy.xpath("(//button[.//span[text()='Siguiente']])[3]").click({
      force: true,
    });
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    cy.xpath("(//button[.//span[text()='Siguiente']])[4]").click({
      force: true,
    });
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    cy.xpath("(//button[.//span[text()='Siguiente']])[5]").click({
      force: true,
    });
    cy.get(".loading", { timeout: 60000 }).should("not.exist");
    //paso 6 conyugue

    cy.xpath(
      "(//button[contains(@class, 'mdc-button')]//span[contains(@class, 'mdc-button__label') and text()='Siguiente'])[6]"
    ).click({ force: true });
    cy.get(".loading", { timeout: 60000 }).should("not.exist");

    cy.log("en este lugar debes de seguir", { timeout: 600000 });
    this.esPEP = esPEP;
    this.EstadoCivil = EstadoCivil;
  }
}

export default PersonaNatural;
