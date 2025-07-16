import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";
const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

//variables para bancoocci
let url = "https://plataforma-qa.bytesw.cloud/";
let usuario = "OPERADORQA";
let contrasena = "byte0625";

const data = {
  //Buscar Cliente
  tipoDocumento: "CEDULA",
  InfoTipoDocumento: "0301200532554",

  //Agregar Cliente
  //##### PASO 1 - Para Identificacion
  TipodePersona: "juridica",
  RTN: "HN0301-2005-320297",
  //##### PASO 2 -  Datos Generales Persona J/N?
  TPJ: "ONG",
  RazonSoc: "Empresa XYZ SAC",
  NombreCom: "XYZ",
  Siglas: "XYZ",
  PaisOr: "Perú",
  CatNegocio: "Tecnología",
  // Para DatosConstitucionEmpresa
  TipSoc: "Sociedad Anónima",
  FechaReg: "2022-01-01",
  EnFormacion: false,
  FechaIniOp: "2022-02-15",
  // Para RegistroMercantil
  Numero: "RM123456",
  tomo: "45",
  Pagina: "123",
  PatenteCom: "PC78910",
  EscriPermiso: "Escritura Pública #101",
  //PASO 3
  datopaso3: "??",

  //Variables persona natural
  //Validacion de fecha de expiracion de documento
  persona: " Natural",
  anio: " 2026 ",
  mes: " NOV ",
  dia: " 6 ",
  //Paso 2
  textoGenero: " Masculino",
  PrimerApellido: "qia",
  PrimerNombre: "Cristobal",
  anioNacimiento: " 2005 ",
  mesNacimiento: " JUL ",
  diaNacimiento: " 7 ",
  EstadoCivil: " Casado(a) ",
  gradoAcademico: " UNIVERSITARIO ",
  profesion: " AGENTE DE VIAJES ",
  NoAniosEducacion: "15",
  capacidadadesEspeciales: " Ninguna ",
  ocupacion: " JEFE DE SUPERVISION ",
  //consulta si tiene dos nacionalidades
  tieneDobleNacionalidad: "si",
  nacionalidad: " ESTADOUNIDENSE ",
  NumeroSocial: "001-01-2477",
  UbicacionSegundaNacionalidad: " ESTADOS UNIDOS DE AMERICA ",
  //paso 3 persona expuesta politicamente
  esPEP: "si",
  institucionPEP: "Ministerio de energía",
  cargoOcupadoPEP: "Gerente general",
  periodoPEP: " 2019 - 2022 ",
  //Espacio donde se debe de colocar si alguna empresa cuando es PEP
  EmpresaJuridicaPEP: "Empresa",
  PatrimonioEmpresaPEP: "El renacimientooss64444555, S.A.",
  PatrimonioTipodeDocumentoPEP: " A - REGISTRO TRIBUTARIO NACIONAL ",
  PatrimonioIdentificacionPEP: "HN0301-2005-320924",
  PatrimonioActividadEconomicaPEP: " SERVICIOS FINANCIEROS ",
  PatrimonioPorcentPEP: 30,
  anioInicialPEP: " 1995 ",
  mesInicialPEP: " MAR ",
  diaInicialPEP: " 12 ",
  anioFinalPEP: " 2041 ",
  mesFinalPEP: " MAR ",
  diaFinalPEP: " 6 ",
  PatrimonioPuestoPEP: " Representante legal ",
  //Parentescos 'PEP'
  apellidoMamaPEP: "Lopez",
  primerNombreMamaPEP: "Maria",
  direccionMamaPEP: "Ciudad",
  // apellidoPapaPEP: "Lopez",
  // primerNombrePapaPEP: "Roberto",s

  tiposuegrxPEP: " Suegro ",
  apellidosuegrxPEP: "Alvarez",
  primerNombreSuegrxPEP: "Francisco",

  //Variables para conyugue
  tipoConyugue: "FEMENINO",
  apellidoConyugue: "Alfaro",
  nombreConyugue: "Ana",
  tipoCelularConyugue: " Celular ",
  numeroConyugue: "50403072505",
  //Conyugue cuando es PEP
  cedulaConyuguePEP: "0201199500001",
  anioExpiracionConyuguePEP: " 2030 ",
  mesExpiracionConyuguePEP: " MAR ",
  diaExipracionConyugePEP: " 6 ",
  anioNacimientoConyuguePEP: " 1995 ",
  mesNacimientoConyuguePEP: " JUL ",
  diaNacimientoConyugePEP: " 8 ",
  actividadEconomicaConyuguePEP: " SERVICIOS FINANCIEROS ",
  profesionConyuguePEP: " AGENTE DE SEGUROS ",
  pasaporteConyuguePEP: "000000000000001",
  nacionalidadPasaporteConyuguePEP:" HONDURAS ",
  UbicacionSegundaNacionalidadConyuguePEP: " ESTADOUNIDENSE ",
  aniosResidirConuygue: "12",
  ubicacionconyugue: "Comayagua",
  tipoCorreoConyuguePEP: " Correo Personal ",
  tipoTelefonoConyuguePEP: " Celular ",
  telefonoConyuguePEP: "50409072500",
  referenciaLaboralConyuguePEP: "NATURAL",
  sexoReferenciaLaboralConyuguePEP: "MASCULINO",
  primerApellidoReferenciaLaboralPEP: "Cisneros",
  primerNombreReferenciaLaboralPEP: "Alan",
  anioIngresoReferenciaConyuguePEP: " 1999 ",
  mesIngresoReferenciaConyuguePEP:" APR ",
  diaIngresoReferenciaConyugePEP:" 6 ",
  anioEgresoReferenciaConyuguePEP: " 2020 ",
  mesEgresoReferenciaConyuguePEP: " JAN ",
  diaEgresoReferenciaConyugePEP: " 16 ",
  puestoReferenciaConyuguePEP: "Tecnico",
  direccionReferenciaLaboralConyuguePEP: "Comayagua",
  tipoCorreoContactoConyuguePEP: " Correo Personal ",
  tipoTelefonoContactoConyuguePEP: " Celular ",
  telefonoContactoConyugue: "50415072500"
};

describe("BancoOcci", () => {
  Cypress.on("uncaught:exception", (err, Runnable) => {
    return false;
  });

  before("Ingreso e inicio de sesion", () => {
    cy.Login(url, usuario, contrasena);
  }); // TERMINA EL IT LOGIN
  it("Agregar Cliente", () => {
    //Notificacion '¿Desea suscribirse a las notificaciones?'
    //        cy.xpathClk("//h2[contains(text(), '¿Desea suscribirse a las notificaciones?')]/following::button[normalize-space(text())='Si'][1]")
    //Notificacion 'Aceptar Notificaciones en Chrome.'
    //        cy.xpathClk("//h2[contains(text(), 'Aceptar Notificaciones en Chrome.')]/following::button[contains(text(), 'Cerrar')][1]")
    // Ingresamos y buscamos el cliente
    cy.busquedaCliente(data);
  });

  it("Agregar Cliente", () => {
    cy.log("AQUIIIIIII PAPUSHO antes del if");
    if (data.TipodePersona.toLowerCase() == "natural") {
      Generales.TipodePersona(data.persona);
      cy.wait(2000);
      cotizador.IdentificacionGeneralPersonaNatural(
        data.InfoTipoDocumento,
        data.anio,
        data.mes,
        data.dia,
        data.RTN
      );
      cotizador.DatosGeneralesPersonaNatural(
        data.textoGenero,
        data.PrimerApellido,
        data.PrimerNombre,
        data.anioNacimiento,
        data.mesNacimiento,
        data.diaNacimiento,
        data.EstadoCivil,
        data.gradoAcademico,
        data.profesion,
        data.NoAniosEducacion,
        data.capacidadadesEspeciales,
        data.ocupacion,
        data.nacionalidad,
        data.tieneDobleNacionalidad,
        data.NumeroSocial,
        data.UbicacionSegundaNacionalidad
      );
      cotizador.clickpaso2();
      cy.wait(500);

      cotizador.PersonaPep(
        data.esPEP,
        data.institucionPEP,
        data.cargoOcupadoPEP,
        data.periodoPEP,
        data.EmpresaJuridicaPEP,
        data.PatrimonioEmpresaPEP,
        data.PatrimonioTipodeDocumentoPEP,
        data.PatrimonioIdentificacionPEP,
        data.PatrimonioActividadEconomicaPEP,
        data.PatrimonioPorcentPEP,
        data.anioInicialPEP,
        data.mesInicialPEP,
        data.diaInicialPEP,
        data.anioFinalPEP,
        data.mesFinalPEP,
        data.diaFinalPEP,
        data.PatrimonioPuestoPEP
      );

      cotizador.ParentescosPEP(
        data.apellidoMamaPEP,
        data.primerNombreMamaPEP,
        data.direccionMamaPEP,
        // data.apellidoPapaPEP,
        // data.primerNombrePapaPEP,
        // data.direccionPapaPEP,
        data.tiposuegrxPEP,
        data.apellidosuegrxPEP,
        data.primerNombreSuegrxPEP
      );

      cotizador.esCasado(
        data.tipoConyugue,
        data.apellidoConyugue,
        data.nombreConyugue,
        data.tipoCelularConyugue,
        data.numeroConyugue
      );

      cotizador.escasadoPEP(
        data.tipoConyugue,
        data.apellidoConyugue,
        data.nombreConyugue,
        data.cedulaConyuguePEP,
        data.anioExpiracionConyuguePEP,
        data.mesExpiracionConyuguePEP,
        data.diaExipracionConyugePEP,
        data.anioNacimientoConyuguePEP,
        data.mesNacimientoConyuguePEP,
        data.diaNacimiento,
        data.actividadEconomicaConyuguePEP,
        data.profesionConyuguePEP,
        data.pasaporteConyuguePEP,
        data.nacionalidadPasaporteConyuguePEP,
        data.UbicacionSegundaNacionalidadConyuguePEP,
        data.aniosResidirConuygue,
        data.ubicacionconyugue,
        data.tipoCorreoConyuguePEP,
        data.tipoTelefonoConyuguePEP,
        data.telefonoConyuguePEP,
        data.referenciaLaboralConyuguePEP,
        data.sexoReferenciaLaboralConyuguePEP,
        data.primerApellidoReferenciaLaboralPEP,
        data.primerNombreReferenciaLaboralPEP,
        data.anioIngresoReferenciaConyuguePEP,
        data.mesIngresoReferenciaConyuguePEP,
        data.diaIngresoReferenciaConyugePEP,
        data.anioEgresoReferenciaConyuguePEP,
        data.mesEgresoReferenciaConyuguePEP,
        data.diaEgresoReferenciaConyugePEP,
        data.puestoReferenciaConyuguePEP,
        data.direccionReferenciaLaboralConyuguePEP,
        data.tipoCorreoContactoConyuguePEP,
        data.tipoTelefonoContactoConyuguePEP,
        data.telefonoContactoConyugue


      );
    } else if (data.TipodePersona.toLowerCase() == "juridico") {
      cy.log("JURIDICO PAPS");
      PJ.IngresoDatosPersonaJuridica();
      PJ.Identificacion(data);
      PJ.DatosGeneralesPersonaJuridica(data);
    } else {
      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");
    }
  });
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
