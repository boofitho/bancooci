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
  }

  //Inicio paso 3 PEP

  //Flujo repetitivo de empresas PEP
  PatrimonioPEP( PatrimonioEmpresaPEP,
    PatrimonioTipodeDocumentoPEP,
    PatrimonioIdentificacionPEP,
    PatrimonioActividadEconomicaPEP,){
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
    PatrimonioPorcentPEP
  ) {
    if (esPEP.trim().toLowerCase() === "si") {
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
                .click({ force: true });
            });
        });

      if (EmpresaJuridicaPEP === "Empresa") {
        cy.log(
          "entrando al flujo de persona que tiene acciones arriba de 25% (PEP) de una empresa"
        );
        // cy.get(".mdc-floating-label")
        //   .contains("mat-label", "Empresa", { timeout: 6000 })
        //   .should("be.visible")
        //   .should("not.be.disabled")
        //   .type(PatrimonioEmpresaPEP, { timeout: 6000 });
        // cy.get(".mdc-floating-label")
        //   .contains("mat-label", "Tipo de documento", { timeout: 6000 })
        //   .should("be.visible")
        //   .should("not.be.disabled")
        //   .click({ force: true })
        //   .then(() => {
        //     cy.get(".mdc-list-item__primary-text")
        //       .contains("span", PatrimonioTipodeDocumentoPEP)
        //       .should("be.visible")
        //       .should("not.be.disabled")
        //       .click({ force: true });
        //     cy.contains("label", "Identificación")
        //       .parents(".mat-mdc-text-field-wrapper")
        //       .find("input")
        //       .type(PatrimonioIdentificacionPEP);
        //   });
        // cy.get(".mdc-floating-label")
        //   .contains("mat-label", "Actividad Económica", { timeout: 6000 })
        //   .click({ force: true })
        //   .then(() => {
        //     cy.get(".mdc-list-item__primary-text")
        //       .contains("span", PatrimonioActividadEconomicaPEP)
        //       .should("be.visible")
        //       .should("not.be.disabled")
        //       .click({ force: true });
        //   });


        if (PatrimonioPorcentPEP >= 25) {
          cy.contains("label", "% de Participación")
            .parents(".mat-mdc-text-field-wrapper")
            .find("input")
            .type(PatrimonioPorcentPEP.toString());
        } else {
          throw new Error("% de Participación debe ser mayor o igual a 25");
        }

        //Boton agregar
        cy.xpath(
          "//button[contains(@class, 'mat-mdc-button') and .//p[text()='Agregar']]"
        )
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });

         //Boton guardar
         cy.get(".mdc-button__label").contains('span', 'Guardar ').should("be.visible").should("not.be.disabled").click({force:true})
         // Boton Siguiente
         cy.xpath("//button[contains(@class, 'mdc-button')]//span[contains(@class, 'mdc-button__label') and text()='Siguiente']").should('be.visible').should('not.be.disabled').click({force:true})

      } else if (EmpresaJuridicaPEP === "Organización/dirección de empresas") {




        
      } else if (
        EmpresaJuridicaPEP ===
        "Federaciones/organizaciones no lucrativas (ONG'S)"
      ) {
      } else {
        cy.log("no tiene ningun patrimonio");
          // Boton Siguiente
         cy.xpath("//button[contains(@class, 'mdc-button')]//span[contains(@class, 'mdc-button__label') and text()='Siguiente']").should('be.visible').should('not.be.disabled').click({force:true})

      }
    } else {
      cy.log("No es pep por lo tanto se salta el flujo");
      // cy.get(".mdc-button__label")
      //   .contains("span", "Siguiente")
      //   .should("be.visible")
      //   .should("not.be.disabled")
      //   .click({ force: true });
      cy.xpath('//*[@id="cdk-stepper-0-content-2"]/div/div/button')
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
    }
  }
}

export default PersonaNatural;

// cy.xpath(xpath, { timeout: 60000 })
//   .should('be.visible')
//   .should('not.be.disabled')
//   .click({force: true});
