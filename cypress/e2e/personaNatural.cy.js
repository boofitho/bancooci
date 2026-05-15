import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
const data = {
  correo: "000196636@gmail.com",
  //Buscar Cliente
  tipoDocumento: "CEDULA",
  InfoTipoDocumento: "0301200533110", // seguir con este     0301 2005 33078

  //Agregar Cliente
  //##### PASO 1 - Para Identificacion
  TipodePersona: "natural",
  RTN: "HN0301-2005-322892", //
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
  persona: "Natural",
  fechaExpericacionCedulaCliente: "06/11/2026",
  textoGenero: "Masculino",
  PrimerApellido: "amr",
  PrimerNombre: "Cristobal",
  fechaNacimientoCliente: "05/02/2005",
  EstadoCivil: " Soltero(a) ", //  " Soltero(a) "  " Casado(a) "
  gradoAcademico: " UNIVERSITARIO ",
  profesion: " AGENTE DE VIAJES ",
  NoAniosEducacion: "15",
  capacidadadesEspeciales: " Ninguna ",
  ocupacion: " JEFE DE SUPERVISION ", // ESTUDIANTE
  //consulta si tiene dos nacionalidades
  tieneDobleNacionalidad: "no",
  segundaNacionalidad: " ESTADOUNIDENSE ",
  NumeroSocial: "001-01-2881",
  UbicacionSegundaNacionalidad: " ESTADOS UNIDOS DE AMERICA ",
  //paso 3 persona expuesta politicamente
  esPEP: "no",
  institucionPEP: "Ministerio de energía",
  cargoOcupadoPEP: "Gerente general",
  periodoPEP: " 2019 - 2022 ",
  //Espacio donde se debe de colocar si alguna empresa cuando es PEP
  EmpresaJuridicaPEP: "Empresa", //Federaciones/organizaciones no lucrativas (ONG'S) , Organización/dirección de empresas
  NombreEmpresaPEP: "El renacimientooss0667777777, S.A.",
  PatrimonioTipodeDocumentoPEP: " A - REGISTRO TRIBUTARIO NACIONAL ",
  PatrimonioIdentificacionPEP: "HN0301-2005-322853",
  PatrimonioActividadEconomicaPEP: " SERVICIOS FINANCIEROS ",
  PatrimonioPorcentPEP: 30,
  fechaInicialEmpresaPEP: "12/03/1995",
  fechaFinalEmpresaPEP: "13/03/2032",
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
  nombreEmpresaConyuguePEP: "El agua Vivaa, S.A.",
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
  telefonoContactoCliente: "50421090297", //importante

  //Dependencia economica
  tieneDependenciaEconomica: "no",
  parentescoDependenciaEconomica: " Papá ",
  cedulaDependenciaEconomica: "0302195500315",
  fechaExpiracionCedulaDependenciaEconomica: "17/03/2030",
  apellidoDependenciaEconomica: "mzf",
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
  telefonoReferencialLaboralCliente: "50490072611",

  //Referencias Clientes
  tieneReferenciasBancarias: "no",
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
  const cotizador = new PersonaNatural();
  const metodos = new MetodosGenerales();
  //cotizador.VisitaCotizador();
  Cypress.on("uncaught:exception", (err, Runnable) => {
    return false;
  });

  it("Ingreso e inicio de sesion", () => {
    
    cy.Login(url, usuario, contrasena);
    //cotizador.login(usuario, contrasena)
    // cy.xpathClk(
    //   "//h2[contains(text(), '¿Desea suscribirse a las notificaciones?')]/following::button[normalize-space(text())='Si'][1]"
    // );
    // cy.wait(1000);
    // cy.xpathClk(
    //   "//h2[contains(text(), 'Aceptar Notificaciones en Chrome.')]/following::button[contains(text(), 'Cerrar')][1]"
    // );
    cy.wait(1000);
    cy.busquedaCliente(tipoDocumento, InfoTipoDocumento);
    cy.wait(1000);
    cotizador.IngresoPersonaNatural(usuarioAgregar);
    cy.wait(1000);
    metodos.TipodePersona(persona);
    cy.wait(2000);
    cotizador.IdentificacionGeneralPersonaNatural(InfoTipoDocumento, anio, mes, dia, RTN);
    cotizador.DatosGeneralesPersonaNatural(textoGenero, PrimerApellido, PrimerNombre, anioNacimiento, mesNacimiento, diaNacimiento,EstadoCivil,gradoAcademico,profesion,NoAniosEducacion, capacidadadesEspeciales,ocupacion, nacionalidad, dobleNacionalidad, NumeroSocial)
  });
});
