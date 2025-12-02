import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";

const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

const URL_Var = Cypress.env("URL_VAR"); //link URL´s para descargar los documentos

let ArrayVar = [];

let ArrayCliente = [];
let ArrayID = [];
let ArrayDataGenP = [];
let ArrayCargosPerNatural = [];

let ArrayConyugue = [];
let ArrayPerfilEconomico = [];
let ArrayDireccion = [];
let ArrayContacto = [];
let ArrayFATCA = [];
let ArrayReferencias = [];
let ArrayDependenciaEco = [];
let ArrayDependientes = [];
let ArrayDatosNegocio = [];
let ArrayRefernciaLaboral = [];
let ArrayDigitDoc = [];

let no = 0;
describe("BancoOcci", () => {
  Cypress.on("uncaught:exception", (err, Runnable) => {
    return false;
  });

  before("Ingreso e inicio de sesion", () => {
    cy.log(URL_Var);
    //Descarga el de archivo variables
    Generales.ArchivoNubeV(URL_Var);

    //Lee archivo de variables y guarda en un array los resultados
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/variables.xlsx",
      hoja: "Variables",
    }).then((Var) => {
      Var.forEach((filaVar) => {
        ArrayVar.push(filaVar);
      });
    });

    const folderPath = "cypress/screenshots"; // Aquí coloca la ruta de la carpeta de capturas u otros archivos que quieras borrar
    cy.task("deleteAllFiles", folderPath); //con este comando borramos el folderpath de screenshots
  }); // TERMINA BEFORE

  before("Descarga de archivos datos y lectura de hojas del mismo", () => {
    //descarga archivo "datos"
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS_PN, "datos");

    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
    }).then((excelData) => {
      ArrayCliente = excelData["Cliente"] || [];
      ArrayID = excelData["Identificacion"] || [];
      ArrayDataGenP = excelData["DatosGenPer"] || [];
      ArrayPerfilEconomico = excelData["PerfilEconomico"] || [];
      ArrayDireccion = excelData["Direccion"] || [];
      ArrayContacto = excelData["Contacto"] || [];
      ArrayFATCA = excelData["FATCA"] || [];
      ArrayReferencias = excelData["Referencia"] || [];
      ArrayDigitDoc = excelData["DigitDoc"] || [];
      ArrayCargosPerNatural = excelData["Cargos PerNat"];
      ArrayConyugue = excelData["Conyugue"];
      ArrayDependenciaEco = excelData["Dependencia Eco"];
      ArrayDependientes = excelData["Dependientes"];
      ArrayDatosNegocio = excelData["Datos Negocio"];
      ArrayRefernciaLaboral = excelData["Referencia Laboral"];
    });
  }); // TERMINA EL IT DESCARGA DE ARCHIVO DATOS Y LECTURA DE HOJAS

  before(
    "Descarga de archivos complementario y lectura de hojas de los mismo",
    () => {
      //descarga de archivos secundarios de los datos

      //descarga archivo "referencia"
      Generales.DescargaArchivoComplementos(
        ArrayReferencias[0].URL_Referencias,
        "refBancaria"
      );
      //inicio lectura hojas archivo "Contacto"

      cy.log("Descarga de imagenes");
      Generales.DescargaImagen(ArrayDigitDoc[0]);
      Generales.DescargaImagen(ArrayDigitDoc[1]);
    }
  );

  it("Login", () => {
    
    cy.Login(ArrayVar[0]);

  });

  it("Agregar cliente", () => {
    cy.busquedaCliente(ArrayCliente[no]);
    cotizador.AutorizacionLocal(
      ArrayVar[0].Usuario_Auth,
      ArrayVar[0].Password_Auth,
      "autorizacion local digitalización"
    );

    cotizador.IdentificacionGeneralPersonaNatural(
      ArrayID[no].InfoTipoDocumento,
      ArrayID[no].FechaExp,
      ArrayID[no].RTN
    );

    cotizador.DatosGeneralesPersonaNatural(
      ArrayDataGenP[no].Genero,
      ArrayDataGenP[no].PrimerApellido,
      ArrayDataGenP[no].PrimerNombre,
      ArrayDataGenP[no].FechaNacimientoCliente,
      ArrayDataGenP[no].EstadoCivil,
      ArrayDataGenP[no].GradoAcademico,
      ArrayDataGenP[no].Profesion,
      ArrayDataGenP[no].AniosEducacion,
      ArrayDataGenP[no].CapacidadadesEspeciales,
      ArrayDataGenP[no].Ocupacion,
      ArrayDataGenP[no].TieneDobleNacionalidad,
      ArrayDataGenP[no].SegundaNacionalidad,
      ArrayDataGenP[no].NumeroSocial,
      ArrayDataGenP[no].UbicacionSegundaNacionalidad
    );
    cotizador.PersonaPep(
      ArrayCargosPerNatural[no].esPEP,
      ArrayCargosPerNatural[no].institucionPEP,
      ArrayCargosPerNatural[no].cargoOcupadoPEP,
      ArrayCargosPerNatural[no].periodoPEP,
      ArrayCargosPerNatural[no].EmpresaJuridicaPEP,
      ArrayCargosPerNatural[no].NombreEmpresaPEP,
      ArrayCargosPerNatural[no].PatrimonioTipodeDocumentoPEP,
      ArrayCargosPerNatural[no].PatrimonioIdentificacionPEP,
      ArrayCargosPerNatural[no].PatrimonioActividadEconomicaPEP,
      ArrayCargosPerNatural[no].PatrimonioPorcentPEP,
      ArrayCargosPerNatural[no].fechaInicialEmpresaPEP,
      ArrayCargosPerNatural[no].fechaFinalEmpresaPEP,
      ArrayCargosPerNatural[no].PatrimonioPuestoPEP
    );

    cotizador.ParentescosPEP(
      ArrayCargosPerNatural[no].tieneMamaPEP,
      ArrayCargosPerNatural[no].apellidoMamaPEP,
      ArrayCargosPerNatural[no].primerNombreMamaPEP,
      ArrayCargosPerNatural[no].direccionMamaPEP,
      ArrayCargosPerNatural[no].tienePapaPEP,
      ArrayCargosPerNatural[no].apellidoPapaPEP,
      ArrayCargosPerNatural[no].primerNombrePapaPEP,
      ArrayCargosPerNatural[no].direccionPapaPEP,
      ArrayCargosPerNatural[no].tieneSuegrxPEP,
      ArrayCargosPerNatural[no].tiposuegrxPEP,
      ArrayCargosPerNatural[no].apellidosuegrxPEP,
      ArrayCargosPerNatural[no].primerNombreSuegrxPEP,
      ArrayCargosPerNatural[no].tieneHijxPEP,
      ArrayCargosPerNatural[no].tipoHijxPEP,
      ArrayCargosPerNatural[no].primerApellidoHijxPEP,
      ArrayCargosPerNatural[no].primerNombreHijxPEP,
      ArrayCargosPerNatural[no].direccionHijxPEP,
      ArrayCargosPerNatural[no].fechaNacimientoHijxPEP,
      ArrayCargosPerNatural[no].tieneHermanosAbueloPEP,
      ArrayCargosPerNatural[no].tipoParentescoHermanoAbueloPEP,
      ArrayCargosPerNatural[no].primerapellidoHermanoAbueloPEP,
      ArrayCargosPerNatural[no].primerNombreHermanoAbueloPEP,
      ArrayCargosPerNatural[no].tieneCuniadoPEP,
      ArrayCargosPerNatural[no].tipoParentescoCuniadoPEP,
      ArrayCargosPerNatural[no].primerApellidoCuniadoPEP,
      ArrayCargosPerNatural[no].primerNombreCuniadoPEP,

    );

    cotizador.esCasado(
      ArrayConyugue[no].tipoConyugue,
      ArrayConyugue[no].apellidoConyugue,
      ArrayConyugue[no].nombreConyugue,
      ArrayConyugue[no].tipoCelularConyugue,
      ArrayConyugue[no].numeroConyugue
    );

    cotizador.escasadoPEP(
      ArrayConyugue[no].tipoConyugue,
      ArrayConyugue[no].apellidoConyugue,
      ArrayConyugue[no].nombreConyugue,
      ArrayConyugue[no].cedulaConyuguePEP,
      ArrayConyugue[no].fechaExpiracionCedulaConyuguePEP,
      ArrayConyugue[no].fechaNacimientoConyuguePEP,
      ArrayConyugue[no].actividadEconomicaConyuguePEP,
      ArrayConyugue[no].profesionConyuguePEP,
      ArrayConyugue[no].pasaporteConyuguePEP,
      ArrayConyugue[no].nacionalidadPasaporteConyuguePEP,
      ArrayConyugue[no].tieneSegundaNacionalidadConyuguePEP,
      ArrayConyugue[no].UbicacionSegundaNacionalidadConyuguePEP,
      ArrayConyugue[no].aniosResidirConuygue,
      ArrayConyugue[no].ubicacionconyugue,
      ArrayConyugue[no].tipoCorreoConyuguePEP,
      ArrayConyugue[no].correoConyuguePEP,
      ArrayConyugue[no].tipoTelefonoConyuguePEP,
      ArrayConyugue[no].telefonoConyuguePEP,
      ArrayConyugue[no].referenciaLaboralConyuguePEP,
      ArrayConyugue[no].sexoReferenciaLaboralConyuguePEP,
      ArrayConyugue[no].primerApellidoReferenciaLaboralPEP,
      ArrayConyugue[no].primerNombreReferenciaLaboralPEP,
      ArrayConyugue[no].fechaIngresoReferenciaLaboralConyugue,
      ArrayConyugue[no].fechaEgresoReferenciaLaboralConyugue,
      ArrayConyugue[no].puestoReferenciaConyuguePEP,
      ArrayConyugue[no].salarioReferenciaConyuguePEP,
      ArrayConyugue[no].direccionReferenciaLaboralConyuguePEP,
      ArrayConyugue[no].tipoCorreoContactoConyuguePEP,
      ArrayConyugue[no].CorreoContactoConyuguePEP,
      ArrayConyugue[no].tipoTelefonoContactoConyuguePEP,
      ArrayConyugue[no].telefonoContactoConyugue,
      ArrayConyugue[no].nombreEmpresaConyuguePEP,
      ArrayConyugue[no].fechaInscripcionNegocioConyuguePEP,
      ArrayConyugue[no].giroNegocioConyuguePEP,
      ArrayConyugue[no].ingresosMensualesConyuguePEP,
      ArrayConyugue[no].categoriadeNegocioConyuguePEP,
      ArrayConyugue[no].anioResidirNegocioConyuguePEP,
      ArrayConyugue[no].ubicacionNegocioConyuguePEP
    );

    cotizador.direccionCliente(
      ArrayDireccion[no].aniosResidir,
      ArrayDireccion[no].IngreseUbicacion
    );

    cotizador.contactoCliente(
      ArrayContacto[no].tipoCorreoContactoCliente,
      ArrayContacto[no].correoCliente,
      ArrayContacto[no].tipoTelefonoContactoCliente,
      ArrayContacto[no].telefonoContactoCliente
    );

    cotizador.dependenciaEconomica(
      ArrayDependenciaEco[no].tieneDependienciaEconomica,
      ArrayDependenciaEco[no].parentescoDependenciaEconomica,
      ArrayDependenciaEco[no].cedulaDependenciaEconomica,
      ArrayDependenciaEco[no].fechaExpiracionCedulaDependenciaEconomica,
      ArrayDependenciaEco[no].apellidoDependenciaEconomica,
      ArrayDependenciaEco[no].nombredependenciaEconomica
    );

    cotizador.Dependientes(
      ArrayDependientes[no].tieneDependiente,
      ArrayDependientes[no].parentescoDependiente,
      ArrayDependientes[no].apellidoDependiente,
      ArrayDependientes[no].primerNombreDependiente
    );

    cotizador.perfilEconomico(
      ArrayPerfilEconomico[no].afectoISRCliente,
      ArrayPerfilEconomico[no].actividadEconomicaCliente,
      ArrayPerfilEconomico[no].claseCliente,
      ArrayPerfilEconomico[no].situacionlaboralCliente,
      ArrayPerfilEconomico[no].institucionPerfilEconomico,
      ArrayPerfilEconomico[no].tieneOtrosIngresos,
      ArrayPerfilEconomico[no].montoOtrosIngresos,
      ArrayPerfilEconomico[no].observacionesOtrosIngresos,
    );

    cotizador.datosDelNegocio(
      ArrayDatosNegocio[no].nombreEmpresaCliente,
      ArrayDatosNegocio[no].FechaInscripcionNegocioCliente,
      ArrayDatosNegocio[no].giroNegocioCliente,
      ArrayDatosNegocio[no].ingresoMensuales,
      ArrayDatosNegocio[no].categoriaDeNegocioCliente,
      ArrayDatosNegocio[no].aniosResidirCliente,
      ArrayDatosNegocio[no].ubicacionCliente
    );

    cotizador.flujoFatca(
      ArrayFATCA[no].esNacidoUsaFatcaCliente,
      ArrayFATCA[no].esResidenteFatcaCliente,
      ArrayFATCA[no].esCiudadanoFatcaCliente,
      ArrayFATCA[no].poseeDobleNacionalidadUsaFatcaCliente,
      ArrayFATCA[no].esContribuyenteIsrFatcaCliente,
      ArrayFATCA[no].tienePoderRepresentacionFatcaCliente,
      ArrayFATCA[no].tieneDireccionFatcaCliente,
      ArrayFATCA[no].direccionclienteFatca,
      ArrayFATCA[no].tieneNumeroUsaFatcaCliente,
      ArrayFATCA[no].tieneZipUsaFatcaCliente,
      ArrayFATCA[no].tieneEinFatcaCliente,
      ArrayFATCA[no].tieneTinFatcaCliente,
      ArrayFATCA[no].esClienteRecalcitrante,
      ArrayFATCA[no].tipoCelularFatcaCliente,
      ArrayFATCA[no].telefonoFatcaCliente,
      ArrayFATCA[no].codigoZipFatcaCliente
    );

    cotizador.referenciasLaborales(
      ArrayRefernciaLaboral[no].referenciaTipoPersona,
      ArrayRefernciaLaboral[no].generoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].apellidoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].nombreReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].fechaIngresoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].fechaEgresoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].puestoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].salarioReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].nombreEmpresaReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].ubicacionReferencialLaboralCliente,
      ArrayRefernciaLaboral[no].tipoCorreoReferencialLaboralCliente,
      ArrayRefernciaLaboral[no].correoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].tipoTelefonoReferenciaLaboralCliente,
      ArrayRefernciaLaboral[no].telefonoReferencialLaboralCliente
    );

    if (ArrayReferencias[no].TieneRefBanc) {
      //descarga archivo "ReferenciasPN"
      Generales.DescargaArchivoComplementos(
        ArrayReferencias[no].URL_Referencias,
        "ReferenciasPN"
      );
      //inicio lectura hojas archivo "ReferenciasPN"
      cy.task("readExcelToJson", {
        filePath: "cypress/fixtures/ReferenciasPN.xlsx",
      }).then((ReferenciasPN) => {
        const ArrayRefBancariaPN = ReferenciasPN["Ref Bancarias"] || [];
        const ArrayRefComercialPN = ReferenciasPN["Ref Comerciales"] || [];
        const ArrayRefFamiliarPN = ReferenciasPN["Ref Familiares"] || [];
        const ArrayRefPersonalPN = ReferenciasPN["Ref Personales"] || [];
        cy.xpath(
          "//mat-panel-title[text()=' Referencias Bancarias ']/ancestor::mat-expansion-panel-header"
        )
          .filter(":visible:not([disabled])")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true, timeout: 6000 });
        for (let i = 0; i < ArrayRefBancariaPN.length; i++) {
          cotizador.referenciasBancarias(
            ArrayRefBancariaPN[i].tieneReferenciasBancarias,
            ArrayRefBancariaPN[i].tipodeCuentaReferenciaCliente,
            ArrayRefBancariaPN[i].origenCuentaReferenciaCliente,
            ArrayRefBancariaPN[i].numerodeReferenciaCuentaBancariaCliente,
            ArrayRefBancariaPN[i].productoCuentaReferenciaBancariaCliente,
            ArrayRefBancariaPN[i]
              .aperturaAproximadaCuentaReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].institucionCuentaReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].numeroTarjetaReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].productoTarjetaReferenciaLaboralCliente,
            ArrayRefBancariaPN[i].limiteCreditoTarjetaReferenciaBancariaCliente,
            ArrayRefBancariaPN[i]
              .fechaVencimientoTarjetaReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].institucionTarjetaReferenciaLaboralCliente,
            ArrayRefBancariaPN[i].numeroPrestamoReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].tipodePrestamoReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].montoDeudaPrestamoReferenciaBancariaCliente,
            ArrayRefBancariaPN[i]
              .fechaAperturaAproximadaPrestamoReferenciaBancariaCliente,
            ArrayRefBancariaPN[i].institucionPrestamoReferenciaLaboralCliente
          );
        }

        cy.xpath(
          "//mat-panel-title[contains(normalize-space(), 'Referencias Comerciales')]/ancestor::mat-expansion-panel-header"
        )
          .filter(":visible:not([disabled])")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true, timeout: 6000 });
        for (let k = 0; k < ArrayRefComercialPN.length; k++) {
          cotizador.referenciasComerciales(
            ArrayRefComercialPN[k].tieneReferenciasComerciales,
            ArrayRefComercialPN[k].nombreReferenciaComercialCliente,
            ArrayRefComercialPN[k].direccionReferencialComercialCliente,
            ArrayRefComercialPN[k].tipoCorreoReferenciaComercialCliente,
            ArrayRefComercialPN[k].correoReferenciaLaboralCliente,
            ArrayRefComercialPN[k].tipoTelefonoReferenciaComercialCliente,
            ArrayRefComercialPN[k].numeroTelefonoReferenciaComercialCliente
          );
        }
        cy.xpath(
          "//mat-panel-title[contains(normalize-space(), 'Referencias Comerciales')]/ancestor::mat-expansion-panel-header"
        )
          .filter(":visible:not([disabled])")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true, timeout: 6000 });

        cy.xpath(
          "//mat-expansion-panel-header[.//mat-panel-title[normalize-space()='Referencias Familiares']]"
        )
          .filter(":visible:not([disabled])")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        for (let l = 0; l < ArrayRefFamiliarPN.length; l++) {
          cy.get(".loading", { timeout: 60000 }).should("not.exist");

          cy.xpath("//button[.//span[normalize-space()='Editar']]").then(
            ($btn) => {
              const $visibleBtn = $btn.filter(":visible:not([disabled])");
              if ($visibleBtn.length > 0) {
                cy.wrap($visibleBtn)
                  .first()
                  .scrollIntoView()
                  .should("be.visible")
                  .click({ force: true });
              } else {
                cy.log("No hay botón Editar visible, se omite el click");
              }
            }
          );

          cotizador.referenciasFamiliares(
            ArrayRefFamiliarPN[l].tieneReferenciasFamiliares,
            ArrayRefFamiliarPN[l].parentescoReferenciaFamiliarCliente,
            ArrayRefFamiliarPN[l].apellidoReferenciaFamiliarCliente,
            ArrayRefFamiliarPN[l].nombreReferenciaFamiliarCliente,
            ArrayRefFamiliarPN[l].tipoTelefonoReferenciaFamiliarCliente,
            ArrayRefFamiliarPN[l].telefonoReferenciaFamiliarCliente
          );
        }
        cy.xpath(
          "//mat-expansion-panel-header[.//mat-panel-title[normalize-space()='Referencias Familiares']]"
        )
          .filter(":visible:not([disabled])")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        cy.xpath(
          "//mat-expansion-panel-header[normalize-space(.//mat-panel-title) = 'Referencias Personales']"
        )
          .filter(":visible:not([disabled])")
          .first()
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
        for (let m = 0; m < ArrayRefPersonalPN.length; m++) {
          cy.xpath("//button[.//span[normalize-space()='Editar']]").then(
            ($btn) => {
              const $visibleBtn = $btn.filter(":visible:not([disabled])");
              if ($visibleBtn.length > 0) {
                cy.wrap($visibleBtn)
                  .first()
                  .scrollIntoView()
                  .should("be.visible")
                  .click({ force: true });
              } else {
                cy.log("No hay botón Editar visible, se omite el click");
              }
            }
          );

          cotizador.referenciasPersonales(
            ArrayRefPersonalPN[m].tieneReferenciasPersonales,
            ArrayRefPersonalPN[m].apellidoreferenciaPersonalCliente,
            ArrayRefPersonalPN[m].nombreReferenciaPersonalCliente,
            ArrayRefPersonalPN[m].tipoTelefonoReferenciaPersonalCliente,
            ArrayRefPersonalPN[m].telefonoReferenciaPersonalCliente
          );
        }
      });
    } else {
      cy.log("No tiene referencias por lo que se salta el paso");
    }
    cy.xpath(
      "//mat-expansion-panel-header[normalize-space(.//mat-panel-title) = 'Referencias Personales']"
    )
      .filter(":visible:not([disabled])")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
    cy.xpath(
      "//mat-expansion-panel-header//mat-panel-title[normalize-space(.)='Referencias Personales']"
    )
      .filter(":visible:not([disabled])")
      .first()
      .scrollIntoView();
    cy.xpath(
      "//button[.//span[contains(@class, 'mdc-button__label') and normalize-space(text())='Siguiente']]"
    )
      .filter(":visible:not([disabled])")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true, timeout: 6000 });

    cotizador.digitalizacionDocumentos();
  }); //TERMINA IT AGREGAR CLIENTE
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
