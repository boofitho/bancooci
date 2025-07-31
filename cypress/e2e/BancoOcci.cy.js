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
  correo: "00019521@gmail.com",
  //Buscar Cliente
  tipoDocumento: "CEDULA",
  InfoTipoDocumento: "0301200532928", // seguir con este      0301200532709

  //Agregar Cliente
  //##### PASO 1 - Para Identificacion
  TipodePersona: "natural",
  RTN: "HN0301-2005-322572", //
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
  PrimerApellido: "adj",
  PrimerNombre: "Cristobal",
  anioNacimiento: " 2005 ",
  mesNacimiento: " JUL ",
  diaNacimiento: " 7 ",
  EstadoCivil: " Soltero(a) ", //  " Soltero(a) "  " Casado(a) "
  gradoAcademico: " UNIVERSITARIO ",
  profesion: " AGENTE DE VIAJES ",
  NoAniosEducacion: "15",
  capacidadadesEspeciales: " Ninguna ",
  ocupacion: " JEFE DE SUPERVISION ",
  //consulta si tiene dos nacionalidades
  tieneDobleNacionalidad: "si",
  nacionalidad: " ESTADOUNIDENSE ",
  NumeroSocial: "001-01-2819",
  UbicacionSegundaNacionalidad: " ESTADOS UNIDOS DE AMERICA ",
  //paso 3 persona expuesta politicamente
  esPEP: "si",
  institucionPEP: "Ministerio de energía",
  cargoOcupadoPEP: "Gerente general",
  periodoPEP: " 2019 - 2022 ",
  //Espacio donde se debe de colocar si alguna empresa cuando es PEP
  EmpresaJuridicaPEP: "Empresa",
  PatrimonioEmpresaPEP: "El renacimientooss0222233333, S.A.",
  PatrimonioTipodeDocumentoPEP: " A - REGISTRO TRIBUTARIO NACIONAL ",
  PatrimonioIdentificacionPEP: "HN0301-2005-322511",
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
  // primerNombrePapaPEP: "Roberto",

  tiposuegrxPEP: " Suegro ",
  apellidosuegrxPEP: "Alvarez",
  primerNombreSuegrxPEP: "Francisco",

  //Variables para conysugue
  tipoConyugue: "FEMENINO",
  apellidoConyugue: "ob", // ver
  nombreConyugue: "Ana",
  tipoCelularConyugue: " Celular ",
  numeroConyugue: "50403072620",
  //Conyugue cuando es PEP
  cedulaConyuguePEP: "0209199200077",
  anioExpiracionConyuguePEP: " 2030 ",
  mesExpiracionConyuguePEP: " MAR ",
  diaExipracionConyugePEP: " 6 ",
  anioNacimientoConyuguePEP: " 1995 ",
  mesNacimientoConyuguePEP: " JUL ",
  diaNacimientoConyugePEP: " 8 ",
  actividadEconomicaConyuguePEP: " SERVICIOS FINANCIEROS ",
  profesionConyuguePEP: " AGENTE DE SEGUROS ",
  pasaporteConyuguePEP: "000000000000129",
  nacionalidadPasaporteConyuguePEP: " HONDURAS ",
  tieneSegundaNacionalidadConyuguePEP: "si",
  UbicacionSegundaNacionalidadConyuguePEP: " ESTADOUNIDENSE ",
  aniosResidirConuygue: "12",
  ubicacionconyugue: "Comayagua",
  tipoCorreoConyuguePEP: " Correo Personal ",
  tipoTelefonoConyuguePEP: " Celular ",
  telefonoConyuguePEP: "50409072624",
  referenciaLaboralConyuguePEP: "NATURAL",
  sexoReferenciaLaboralConyuguePEP: "MASCULINO",
  primerApellidoReferenciaLaboralPEP: "Cisneros",
  primerNombreReferenciaLaboralPEP: "Allvn",
  anioIngresoReferenciaConyuguePEP: " 1999 ",
  mesIngresoReferenciaConyuguePEP: " APR ",
  diaIngresoReferenciaConyugePEP: " 6 ",
  anioEgresoReferenciaConyuguePEP: " 2020 ",
  mesEgresoReferenciaConyuguePEP: " JAN ",
  diaEgresoReferenciaConyugePEP: " 16 ",
  puestoReferenciaConyuguePEP: "Tecnico",
  direccionReferenciaLaboralConyuguePEP: "Comayagua",
  tipoCorreoContactoConyuguePEP: " Correo Personal ",
  tipoTelefonoContactoConyuguePEP: " Celular ",
  telefonoContactoConyugue: "50415072599",
  nombreEmpresaConyuePEP: "El agua Vivaa, S.A.",
  anioIngresoInscripcionConyuguePEP: " 2005 ",
  mesIngresoInscripcionConyuguePEP: " MAR ",
  diaIngresoInscripcionConyugePEP: " 19 ",
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
  telefonoContactoCliente: "50421090154", //importante

  //Dependencia economica
  tieneDependenciaEconomica: "si",
  parentescoDependenciaEconomica: " Papá ",
  cedulaDependenciaEconomica: "0302195500202",
  anioExpiracionDependenciaEconomica: " 2030 ",
  mesExpiracionDependenciaEconomica: " MAR ",
  diaExpiracionDependenciaEconomica: " 17 ",
  apellidoDependenciaEconomica: "lzd",
  nombredependenciaEconomica: "Luis",
  //Dependientes
  tieneDependiente: "si",
  parentescoDependiente: " Nieto ",
  apellidoDependiente: "cd",
  primerNombreDependiente: "Francisco",
  //Actividad Econmica
  afectoISRCliente: "si",
  actividadEconomicaCliente: " SERVICIOS FINANCIEROS ",
  claseCliente: " PUBLICO EN GENERAL ",
  situacionlaboralCliente: " Comerciante/Asalariado ", // Comerciante/Asalariado

  //Datos del negocio cuandos es comerciante
  nombreEmpresaCliente: "El llano, S.A.",
  anioPrevious: " 1999 ",
  mesPrevious: " MAR ",
  diaPrevious: " 12 ",
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
  telefonoFatcaCliente: "20200000003",
  codigoZipFatcaCliente: "20001",

  //Referencias laborales cuando es Comerciante/Asalariado
  referenciaTipoPersona: "Juridica",
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
  telefonoReferencialLaboralCliente: "50431072502",

  //Referencias Clientes
referenciasBancarias: "si", 
    //tipo de cuenta las cuales pueden ser: Cuentas / Tarjetas o Préstamos
tipodeCuentaReferenciaCliente: "Cuentas", 
origenCuentaReferenciaCliente: "Local",
    //Variablles si tiene cuentas
 numerodeReferenciaCuentaBancariaCliente: "0100000000000001",  
productoCuentaReferenciaBancariaCliente: "Monetarios", // Monetarios u Ahorros
aperturaAproximadaCuentaReferenciaBancariaCliente: "02/05/2001", 
insittucionCuentaReferenciaBancariaCliente: "Bancatlan", 


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
            data.anio,
            data.mes,
            data.dia,
            data.RTN,
            data.correo
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
            data.telefonoContactoConyugue,
            data.nombreEmpresaConyuePEP,
            data.anioIngresoInscripcionConyuguePEP,
            data.mesIngresoInscripcionConyuguePEP,
            data.diaIngresoInscripcionConyugePEP,
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
            data.anioExpiracionDependenciaEconomica,
            data.mesExpiracionDependenciaEconomica,
            data.diaExpiracionDependenciaEconomica,
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
            data.tieneDependiente,
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
            data.insittucionCuentaReferenciaBancariaCliente



          )
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
