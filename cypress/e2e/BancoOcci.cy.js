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
  correo: "000196633@gmail.com",
  //Buscar Cliente
  tipoDocumento: "CEDULA",
  InfoTipoDocumento: "0301200533107", // seguir con este     0301 2005 33078

  //Agregar Cliente
  //##### PASO 1 - Para Identificacion
  TipodePersona: "natural",
  RTN: "HN0301-2005-322886", // 
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
  fechaExpericacionCedulaCliente: "06/11/2026",
  textoGenero: " Masculino",
  PrimerApellido: "akr",
  PrimerNombre: "Cristobal",
 fechaNacimientoCliente: "05/02/2012",
  EstadoCivil: " Soltero(a) ", //  " Soltero(a) "  " Casado(a) "
  gradoAcademico: " UNIVERSITARIO ",
  profesion: " AGENTE DE VIAJES ",
  NoAniosEducacion: "15",
  capacidadadesEspeciales: " Ninguna ",
  ocupacion: " JEFE DE SUPERVISION ", // ESTUDIANTE
  //consulta si tiene dos nacionalidades
  tieneDobleNacionalidad: "no",
  nacionalidad: " ESTADOUNIDENSE ",
  NumeroSocial: "001-01-2881",
  UbicacionSegundaNacionalidad: " ESTADOS UNIDOS DE AMERICA ",
  //paso 3 persona expuesta politicamente
  esPEP: "no",
  institucionPEP: "Ministerio de energía",
  cargoOcupadoPEP: "Gerente general",
  periodoPEP: " 2019 - 2022 ",
  //Espacio donde se debe de colocar si alguna empresa cuando es PEP
  EmpresaJuridicaPEP: "Empresa",  //Federaciones/organizaciones no lucrativas (ONG'S) , Organización/dirección de empresas
  PatrimonioEmpresaPEP: "El renacimientooss0667777777, S.A.",
  PatrimonioTipodeDocumentoPEP: " A - REGISTRO TRIBUTARIO NACIONAL ",
  PatrimonioIdentificacionPEP: "HN0301-2005-322853",
  PatrimonioActividadEconomicaPEP: " SERVICIOS FINANCIEROS ",
  PatrimonioPorcentPEP: 30,
  fechaInicialEmpresaPEP: "12/03/1995",
fechaFinalEmpresaPEP:"13/03/2032",
  PatrimonioPuestoPEP: "Representante legal",
  //Parentescos 'PEP'
  apellidoMamaPEP: "Lopez",
  primerNombreMamaPEP: "Maria",
  direccionMamaPEP: "Ciudad",
  // apellidoPapaPEP: "Lopez",
  // primerNombrePapaPEP: "Roberto",

  tiposuegrxPEP: " Suegro ",
  apellidosuegrxPEP: "Alvarez",
  primerNombreSuegrxPEP: "Francisco",

  //Variables para conysugue
  tipoConyugue: "FEMENINO",
  apellidoConyugue: "nc", // ver
  nombreConyugue: "Ana",
  tipoCelularConyugue: " Celular ",
  numeroConyugue: "50403072640",
  //Conyugue cuando es PEP
  cedulaConyuguePEP: "0209199200090",
 fechaExpiracionCedulaConyuguePEP: "06/03/2030",
 fechaNacimientoConyuguePEP: "08/07/1995",
  actividadEconomicaConyuguePEP: " SERVICIOS FINANCIEROS ",
  profesionConyuguePEP: " AGENTE DE SEGUROS ",
  pasaporteConyuguePEP: "000000000000144",
  nacionalidadPasaporteConyuguePEP: " HONDURAS ",
  tieneSegundaNacionalidadConyuguePEP: "si",
  UbicacionSegundaNacionalidadConyuguePEP: " ESTADOUNIDENSE ",
  aniosResidirConuygue: "12",
  ubicacionconyugue: "Comayagua",
  tipoCorreoConyuguePEP: " Correo Personal ",
  tipoTelefonoConyuguePEP: " Celular ",
  telefonoConyuguePEP: "50409072637",
  referenciaLaboralConyuguePEP: "NATURAL",
  sexoReferenciaLaboralConyuguePEP: "MASCULINO",
  primerApellidoReferenciaLaboralPEP: "Cisneros",
  primerNombreReferenciaLaboralPEP: "Alllcn",
fechaIngresoReferenciaLaboralConyugue: "06/04/1999",
  fechaEgresoReferenciaLaboralConyugue: "16/01/2020",
  puestoReferenciaConyuguePEP: "Tecnico",
  direccionReferenciaLaboralConyuguePEP: "Comayagua",
  tipoCorreoContactoConyuguePEP: " Correo Personal ",
  tipoTelefonoContactoConyuguePEP: " Celular ",
  telefonoContactoConyugue: "50415072609",
  nombreEmpresaConyuePEP: "El agua Vivaa, S.A.",
 fechaInscripcionNegocioConyuguePEP: "19/03/2005",
  giroNegocioConyuguePEP: "Ventas",
  ingresosMensualesConyuguePEP: "1000000",
  categoriadeNegocioConyuguePEP: "Distribucion y ventas",
  anioResidirNegocioConyuguePEP: "12",
  ubicacionNegocioConyuguePEP: "Comayagua",
  //variables para direccion del cliente
  aniosResidir: "14",
  ubicacionResidencia: "comayagua",
  tipoCorreoContactoCliente: " Correo de Trabajo ",
  tipoTelefonoContactoCliente: " Celular ",
  telefonoContactoCliente: "50421090294", //importante

  //Dependencia economica
  tieneDependenciaEconomica: "no",
  parentescoDependenciaEconomica: " Papá ",
  cedulaDependenciaEconomica: "0302195500313",
fechaExpiracionCedulaDependenciaEconomica: "17/03/2030",
  apellidoDependenciaEconomica: "mxf",
  nombredependenciaEconomica: "Luis",
  //Dependientes
  tieneDependiente: "no",
  parentescoDependiente: " Nieto ",
  apellidoDependiente: "qlg",
  primerNombreDependiente: "Francisco",
  //Actividad Econmica
  afectoISRCliente: "si",
  actividadEconomicaCliente: " SERVICIOS FINANCIEROS ",
  claseCliente: " PUBLICO EN GENERAL ",
  situacionlaboralCliente: " Comerciante ", // Comerciante/Asalariado

  //Datos del negocio cuandos es comerciante
  nombreEmpresaCliente: "El llano, S.A.",
FechaInscripcionNegocioCliente: "12/03/1999",
  giroNegocioCliente: "Ventas",
  ingresoMensuales: "10000",
  categoriaDeNegocioCliente: "Distribuciones",
  aniosResidirCliente: "10",
  ubicacionCliente: "Cortes",
  //Datos FATCA
  esNacidoUsaFatcaCliente: "Si",
  esResidenteFatcaCliente: "Si",
  esCiudadanoFatcaCliente: "Si",
  poseeDobleNacionalidadUsaFatcaCliente: "Si",
  esContribuyenteIsrFatcaCliente: "Si",
  tienePoderRepresentacionFatcaCliente: "Si",
  tieneDireccionFatcaCliente: "Si",
  direccionclienteFatca:
    "Edificio Harry S. Truman, 2201 C Street, Foggy Bottom, Cuadrante Noroeste, Washington D. C., 20520, Estados Unidos",
  tieneNumeroUsaFatcaCliente: "Si",
  tieneZipUsaFatcaCliente: "Si",
  tieneEinFatcaCliente: "No",
  tieneTinFatcaCliente: "No",
  esClienteRecalcitrante: "Si",
  tipoCelularFatcaCliente: " Celular ",
  telefonoFatcaCliente: "20200000073",
  codigoZipFatcaCliente: "20001",

  //Referencias laborales cuando es Comerciante/Asalariado
  referenciaTipoPersona: "Natural",
  generoReferenciaLaboralCliente: "Masculino",
  apellidoReferenciaLaboralCliente: "Juarez",
  nombreReferenciaLaboralCliente: "Rodrigo",
  fechaIngresoReferenciaLaboralCliente: "02/09/2001",
  fechaEgresoReferenciaLaboralCliente: "02/10/2013",
  puestoReferenciaLaboralCliente: "Coordinador",
  salarioReferenciaLaboralCliente: " 100000.01 - 200000 ",
  nombreEmpresaReferenciaLaboralCliente: "El Conejo, S.A.",
  ubicacionReferencialLaboralCliente: "Choluteca",
  tipoCorreoReferencialLaboralCliente: " Correo Personal ",
  tipoTelefonoReferenciaLaboralCliente: " Laboral ",
  telefonoReferencialLaboralCliente: "50490072610",

  //Referencias Clientes
  referenciasBancarias: "no",
  //tipo de cuenta las cuales pueden ser: Cuentas / Tarjetas o Préstamos
  tipodeCuentaReferenciaCliente: "Cuentas",
  origenCuentaReferenciaCliente: "Local",
  //Variablles si tiene cuentas
  numerodeReferenciaCuentaBancariaCliente: "0100000000000058",
  productoCuentaReferenciaBancariaCliente: "Monetarios", // Monetarios u Ahorros
  aperturaAproximadaCuentaReferenciaBancariaCliente: "02/05/2001",
  institucionCuentaReferenciaBancariaCliente: "Banco atlantida, s.a.",
  //variables cuando ingresa tarjeta de creditox|
  numeroTarjetaReferenciaBancariaCliente: "0000000000000025",
  productoTarjetaReferenciaLaboralCliente: "American Express",
  limiteCreditoTarjetaReferenciaBancariaCliente: "150000",
  fechaVencimientoTarjetaReferenciaBancariaCliente: "31/08/2027",
  institucionTarjetaReferenciaLaboralCliente: "Banco atlantida, s.a.",
  //Variables cuando hay préstamos
  numeroPrestamoReferenciaBancariaCliente: "9234505",
  tipodePrestamoReferenciaBancariaCliente: "Hipotecario",
  montoDeudaPrestamoReferenciaBancariaCliente: "1000000",
  fechaAperturaAproximadaPrestamoReferenciaBancariaCliente: "31/07/2021",
  institucionPrestamoReferenciaLaboralCliente: "Banco atlantida, s.a.",
  //Variables cuando hay referencias Comerciales
  tieneReferenciasComerciales: "no",
  nombreReferenciaComercialCliente: "El comercio2, S.A.",
  direccionReferencialComercialCliente: "Comayagua",
  tipoCorreoReferenciaComercialCliente: "Correo de Trabajo",
  correoReferenciaLaboralCliente: "Elcomercio2",
  tipoTelefonoReferenciaComercialCliente: "Celular",
  numeroTelefonoReferenciaComercialCliente: "50401082538",
  //Referencias Familiares
  tieneReferenciasFamiliares: "no",
  parentescoReferenciaFamiliarCliente: "Primo",
  apellidoReferenciaFamiliarCliente: "Alvarez",
  nombreReferenciaFamiliarCliente: "Diego",
  tipoTelefonoReferenciaFamiliarCliente: "Celular",
  telefonoReferenciaFamiliarCliente: "50408042518",
  //Referencias Personales
  tieneReferenciasPersonales: "no",
  apellidoreferenciaPersonalCliente: "Meany",
  nombreReferenciaPersonalCliente: "Rodrigo",
  tipoTelefonoReferenciaPersonalCliente: "Laboral",
  telefonoReferenciaPersonalCliente: "50408052514",

  //Digitalizar Documentos
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
    if (data.TipodePersona.toLowerCase() === "natural") {
      cotizador.validarSiSeDebeCrearCliente().then((debeCrear) => {
        if (debeCrear) {
          Generales.TipodePersona(data.persona);
          cy.wait(2000);
          cotizador.IdentificacionGeneralPersonaNatural(
            data.InfoTipoDocumento,
            data.fechaExpericacionCedulaCliente,
            data.RTN,
            data.correo
          );
          cotizador.DatosGeneralesPersonaNatural(
            data.textoGenero,
            data.PrimerApellido,
            data.PrimerNombre,
            data.fechaNacimientoCliente,
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
            data.fechaInicialEmpresaPEP,
            data.fechaFinalEmpresaPEP,
            data.PatrimonioPuestoPEP
          );

          cotizador.ParentescosPEP(
            data.apellidoMamaPEP,
            data.primerNombreMamaPEP,
            data.direccionMamaPEP,
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
            data.fechaExpiracionCedulaConyuguePEP,
            data.fechaNacimientoConyuguePEP,
            data.actividadEconomicaConyuguePEP,
            data.profesionConyuguePEP,
            data.pasaporteConyuguePEP,
            data.nacionalidadPasaporteConyuguePEP,
            data.tieneSegundaNacionalidadConyuguePEP,
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
            data.fechaIngresoReferenciaLaboralConyugue,
            data.fechaEgresoReferenciaLaboralConyugue,
            data.puestoReferenciaConyuguePEP,
            data.direccionReferenciaLaboralConyuguePEP,
            data.tipoCorreoContactoConyuguePEP,
            data.tipoTelefonoContactoConyuguePEP,
            data.telefonoContactoConyugue,
            data.nombreEmpresaConyuePEP,
            data.fechaInscripcionNegocioConyuguePEP,
            data.giroNegocioConyuguePEP,
            data.ingresosMensualesConyuguePEP,
            data.categoriadeNegocioConyuguePEP,
            data.anioResidirNegocioConyuguePEP,
            data.ubicacionNegocioConyuguePEP
          );

          cotizador.direccionCliente(
            data.aniosResidir,
            data.ubicacionResidencia
          );

          cotizador.contactoCliente(
            data.tipoCorreoContactoCliente,
            data.tipoTelefonoContactoCliente,
            data.telefonoContactoCliente
          );

          cotizador.dependenciaEconomica(
            data.tieneDependenciaEconomica,
            data.parentescoDependenciaEconomica,
            data.cedulaDependenciaEconomica,
            data.fechaExpiracionCedulaDependenciaEconomica,
            data.apellidoDependenciaEconomica,
            data.nombredependenciaEconomica,
            data.situacionlaboralCliente
          );

          cotizador.Dependientes(
            data.tieneDependiente,
            data.parentescoDependiente,
            data.apellidoDependiente,
            data.primerNombreDependiente
          );

          cotizador.perfilEconomico(
            data.afectoISRCliente,
            data.actividadEconomicaCliente,
            data.claseCliente,
            data.situacionlaboralCliente
          );

          cotizador.datosDelNegocio(
            data.nombreEmpresaCliente,
            data.anioPrevious,
            data.mesPrevious,
            data.diaPrevious,
            data.giroNegocioCliente,
            data.ingresoMensuales,
            data.categoriaDeNegocioCliente,
            data.aniosResidirCliente,
            data.ubicacionCliente
          );

          cotizador.flujoFatca(
            data.esNacidoUsaFatcaCliente,
            data.esResidenteFatcaCliente,
            data.esCiudadanoFatcaCliente,
            data.poseeDobleNacionalidadUsaFatcaCliente,
            data.esContribuyenteIsrFatcaCliente,
            data.tienePoderRepresentacionFatcaCliente,
            data.tieneDireccionFatcaCliente,
            data.direccionclienteFatca,
            data.tieneNumeroUsaFatcaCliente,
            data.tieneZipUsaFatcaCliente,
            data.tieneEinFatcaCliente,
            data.tieneTinFatcaCliente,
            data.esClienteRecalcitrante,
            data.tipoCelularFatcaCliente,
            data.telefonoFatcaCliente,
            data.codigoZipFatcaCliente,
            data.nombreEmpresaReferenciaLaboralCliente
          );

          cotizador.referenciasLaborales(
            data.referenciaTipoPersona,
            data.generoReferenciaLaboralCliente,
            data.apellidoReferenciaLaboralCliente,
            data.nombreReferenciaLaboralCliente,
            data.fechaIngresoReferenciaLaboralCliente,
            data.fechaEgresoReferenciaLaboralCliente,
            data.puestoReferenciaLaboralCliente,
            data.salarioReferenciaLaboralCliente,
            data.nombreEmpresaReferenciaLaboralCliente,
            data.ubicacionReferencialLaboralCliente,
            data.tipoCorreoReferencialLaboralCliente,
            data.tipoTelefonoReferenciaLaboralCliente,
            data.telefonoReferencialLaboralCliente
          );

          cotizador.referencias(
            data.referenciasBancarias,
            data.tipodeCuentaReferenciaCliente,
            data.origenCuentaReferenciaCliente,
            data.numerodeReferenciaCuentaBancariaCliente,
            data.productoCuentaReferenciaBancariaCliente,
            data.aperturaAproximadaCuentaReferenciaBancariaCliente,
            data.institucionCuentaReferenciaBancariaCliente,
            data.numeroTarjetaReferenciaBancariaCliente,
            data.productoTarjetaReferenciaLaboralCliente,
            data.limiteCreditoTarjetaReferenciaBancariaCliente,
            data.fechaVencimientoTarjetaReferenciaBancariaCliente,
            data.institucionTarjetaReferenciaLaboralCliente,
            data.numeroPrestamoReferenciaBancariaCliente,
            data.tipodePrestamoReferenciaBancariaCliente,
            data.montoDeudaPrestamoReferenciaBancariaCliente,
            data.fechaAperturaAproximadaPrestamoReferenciaBancariaCliente,
            data.institucionPrestamoReferenciaLaboralCliente,
            data.tieneReferenciasComerciales,
            data.nombreReferenciaComercialCliente,
            data.direccionReferencialComercialCliente,
            data.tipoCorreoReferenciaComercialCliente,
            data.correoReferenciaLaboralCliente,
            data.tipoTelefonoReferenciaComercialCliente,
            data.numeroTelefonoReferenciaComercialCliente,
            data.tieneReferenciasFamiliares,
            data.parentescoReferenciaFamiliarCliente,
            data.apellidoReferenciaFamiliarCliente,
            data.nombreReferenciaFamiliarCliente,
            data.tipoTelefonoReferenciaFamiliarCliente,
            data.telefonoReferenciaFamiliarCliente,
            data.tieneReferenciasPersonales,
            data.apellidoreferenciaPersonalCliente,
            data.nombreReferenciaPersonalCliente,
            data.tipoTelefonoReferenciaPersonalCliente,
            data.telefonoReferenciaPersonalCliente
          );

          cotizador.digitalizacionDocumentos();
        } else {
          cy.log("Cliente ya existe. No se creará.");
          cotizador.ClienteCreadoParcialmente(data.esPEP, data.EstadoCivil);
        }
      });
    } else if (data.TipodePersona.toLowerCase() == "juridico") {
      cy.log("JURIDICO PAPS");
      PJ.IngresoDatosPersonaJuridica();
      PJ.Identificacion(data);
      PJ.DatosGeneralesPersonaJuridica(data);
      [];
    } else {
      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");
    }
  });
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
