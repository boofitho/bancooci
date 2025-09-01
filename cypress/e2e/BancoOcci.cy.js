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
let ArrayCaptAccionistas = [];
let ArrayCapJuntaDir = [];
let ArrayRepreLegalDG = [];
let ArrayRepreLegalDir = [];
let ArrayRepreLegalCont = [];
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
let ArrayDigitalDocs = [];
let ArrayClienteFinalizado = [];

//arrays archivos complemetnarios
let ArrayRefAccionistas = [];
let ArrayIDcapAcc = [];
let ArrayInfCompl = [];
let ArrayDtsGnPJyN = [];
let ArrayRLCapAcc = [];
let ArrayJuntaDir = [];
let ArrayRLcorreo = [];
let ArrayRLtelefono = [];
let ArrayInfFinanciera = [];
let ArrayInfDondeOpera = [];
let ArrayProveedor = [];
let ArrayConCorreo = [];
let ArrayConTelefono = [];

//variables para bancoocci
let url = "https://plataforma-qa.bytesw.cloud/";
let usuario = "OPERADORQA";
let contrasena = "byte0625";

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
let no = 2;
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
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS, "datos");
    cy.wait(5000); // descargando archivo

    //lista las hojas disponibles en el archivo datos
    cy.task("listarHojasExcel", {
      filePath: "cypress/fixtures/datos.xlsx",
    }).then((nombres) => {
      cy.log("Hojas disponibles: " + nombres.join(", "));
    });

    /*Inicio lectura del archivo "datos" por hojas*/

    //lectura del archivo "datos" hoja 0
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "0 Cliente",
    }).then((datosCliente) => {
      datosCliente.forEach((fila) => {
        ArrayCliente.push(fila); // O cualquier lógica que necesites
      });
    });

    //lectura del archivo "datos" hoja 1 "Identificacion"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "1 Identificacion",
    }).then((ID) => {
      ID.forEach((filaVar) => {
        ArrayID.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 2 "Datos Generales Persona General"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "2 DatosGenPer",
    }).then((DataGenP) => {
      DataGenP.forEach((filaVar) => {
        ArrayDataGenP.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 3 "Cargos (PEP) Persona Natural"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "3 Cargos PerNat",
    }).then((cargosPerNatural) => {
      cargosPerNatural.forEach((filaVar) => {
        ArrayCargosPerNatural.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 3 "Captura de accionistas"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "3 Captura de accionistas",
    }).then((CaptAccionistas) => {
      CaptAccionistas.forEach((filaVar) => {
        ArrayCaptAccionistas.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 4 "Captura de junta directiva"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "4 Captura de junta directiva",
    }).then((CapJuntaDir) => {
      CapJuntaDir.forEach((filaVar) => {
        ArrayCapJuntaDir.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 5 "Representante Legal - Datos Generales"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "5 RLDatos Generales",
    }).then((RepreLegalDG) => {
      RepreLegalDG.forEach((filaVar) => {
        ArrayRepreLegalDG.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 6 "Representante Legal - Direccion"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "5 RLDireccion",
    }).then((RepreLegalDir) => {
      RepreLegalDir.forEach((filaVar) => {
        ArrayRepreLegalDir.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 6 "Conyugue (cuando es casado y cuando es PEP casado)"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "6 conyugue",
    }).then((Conyugue) => {
      Conyugue.forEach((filaVar) => {
        ArrayConyugue.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 7 "Representante Legal - Contacto"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "5 RLContacto",
    }).then((RepreLegalCont) => {
      RepreLegalCont.forEach((filaVar) => {
        ArrayRepreLegalCont.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 8 "Perfil Economico"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "6 PerfilEconomico",
    }).then((PerfilEconomico) => {
      PerfilEconomico.forEach((filaVar) => {
        ArrayPerfilEconomico.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 9 "Dirección"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "7 Dirección",
    }).then((Direccion) => {
      Direccion.forEach((filaVar) => {
        ArrayDireccion.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 10 "Dependencia Economica"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "Dependencia Eco",
    }).then((DependenciaEco) => {
      DependenciaEco.forEach((filaVar) => {
        ArrayDependenciaEco.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 11 "Dependientes"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "Dependientes",
    }).then((Dependientes) => {
      Dependientes.forEach((filaVar) => {
        ArrayDependientes.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 13 "Contacto"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "8 Contacto",
    }).then((Contacto) => {
      Contacto.forEach((filaVar) => {
        ArrayContacto.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 11 "FATCA"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "9 FATCA",
    }).then((FATCA) => {
      FATCA.forEach((filaVar) => {
        ArrayFATCA.push(filaVar);
      });
    });
    //lectura del archivo "datos" de Referencia Laboral
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "Referencia Laboral",
    }).then((RefernciaLaboral) => {
      RefernciaLaboral.forEach((filaVar) => {
        ArrayRefernciaLaboral.push(filaVar);
      });
    });
    //lectura del archivo "datos" hoja 12 "Referencias"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "10 referencia",
    }).then((Referencias) => {
      Referencias.forEach((filaVar) => {
        ArrayReferencias.push(filaVar);
      });
    });

    //    13 DigitDoc, 14 Finalizado

    // //lectura del archivo "datos" hoja 13 "Digitalización de documentos"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: 13 }).then((DigitalDocs) => {
    //     DigitalDocs.forEach((filaVar) => {
    //     ArrayDigitalDocs.push(filaVar)
    //   })
    // });
    // //lectura del archivo "datos" hoja 14 "Cliente Finalizado"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: 14 }).then((ClienteFinalizado) => {
    //     ClienteFinalizado.forEach((filaVar) => {
    //     ArrayClienteFinalizado.push(filaVar)
    //   })
    // });

    //Fin lectura del archivo datos
  }); // TERMINA EL IT DESCARGA DE ARCHIVO DATOS Y LECTURA DE HOJAS

  it("Descarga de archivos datos y lectura de hojas del mismo", () => {
    //descarga archivo "datos"
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS, "datos");

    //lista las hojas disponibles en el archivo datos
    cy.task("listarHojasExcel", {
      filePath: "cypress/fixtures/datos.xlsx",
    }).then((nombres) => {
      cy.log("Hojas disponibles: " + nombres.join(", "));
    });

    /*Inicio lectura del archivo "datos" por hojas*/

    //lectura del archivo "datos" hoja 0
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "0 Cliente",
    }).then((datosCliente) => {
      datosCliente.forEach((fila) => {
        ArrayCliente.push(fila); // O cualquier lógica que necesites
      });
    });

    //lectura del archivo "datos" hoja 1 "Identificacion"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "1 Identificacion",
    }).then((ID) => {
      ID.forEach((filaVar) => {
        ArrayID.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 2 "Datos Generales Persona juridica"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "2 DatosGenPer",
    }).then((DataGenP) => {
      DataGenP.forEach((filaVar) => {
        ArrayDataGenP.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 3 "Captura de accionistas"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "3 Captura de accionistas",
    }).then((CaptAccionistas) => {
      CaptAccionistas.forEach((filaVar) => {
        ArrayCaptAccionistas.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 4 "Captura de junta directiva"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "4 Captura de junta directiva",
    }).then((CapJuntaDir) => {
      CapJuntaDir.forEach((filaVar) => {
        ArrayCapJuntaDir.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 5 "Representante Legal - Datos Generales"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "5 RLDatos Generales",
    }).then((RepreLegalDG) => {
      RepreLegalDG.forEach((filaVar) => {
        ArrayRepreLegalDG.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 6 "Representante Legal - Direccion"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "5 RLDireccion",
    }).then((RepreLegalDir) => {
      RepreLegalDir.forEach((filaVar) => {
        ArrayRepreLegalDir.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 7 "Representante Legal - Contacto"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "5 RLContacto",
    }).then((RepreLegalCont) => {
      RepreLegalCont.forEach((filaVar) => {
        ArrayRepreLegalCont.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 8 "Perfil Economico"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "6 PerfilEconomico",
    }).then((PerfilEconomico) => {
      PerfilEconomico.forEach((filaVar) => {
        ArrayPerfilEconomico.push(filaVar);
      });
    });

    //lectura del archivo "datos" Datos del negocio"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "Datos Negocio",
    }).then((DatosNegocio) => {
      DatosNegocio.forEach((filaVar) => {
        ArrayDatosNegocio.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 9 "Dirección"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "7 Dirección",
    }).then((Direccion) => {
      Direccion.forEach((filaVar) => {
        ArrayDireccion.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 10 "Contacto"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "8 Contacto",
    }).then((Contacto) => {
      Contacto.forEach((filaVar) => {
        ArrayContacto.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 11 "FATCA"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "9 FATCA",
    }).then((FATCA) => {
      FATCA.forEach((filaVar) => {
        ArrayFATCA.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 12 "Referencias"
    cy.task("readExcelToJson", {
      filePath: "cypress/fixtures/datos.xlsx",
      hoja: "10 referencia",
    }).then((Referencias) => {
      Referencias.forEach((filaVar) => {
        ArrayReferencias.push(filaVar);
      });
    });

    //    13 DigitDoc, 14 Finalizado

    // //lectura del archivo "datos" hoja 13 "Digitalización de documentos"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: 13 }).then((DigitalDocs) => {
    //     DigitalDocs.forEach((filaVar) => {
    //     ArrayDigitalDocs.push(filaVar)
    //   })
    // });
    // //lectura del archivo "datos" hoja 14 "Cliente Finalizado"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: 14 }).then((ClienteFinalizado) => {
    //     ClienteFinalizado.forEach((filaVar) => {
    //     ArrayClienteFinalizado.push(filaVar)
    //   })
    // });

    //Fin lectura del archivo datos
  }); // TERMINA EL IT DESCARGA DE ARCHIVO DATOS Y LECTURA DE HOJAS

  /*
cy.xpath("//button[contains(., 'Siguiente')]")
  .filter(':visible')   // 👈 filtra solo los visibles
  .first()              // si hay más de uno visible, toma el primero
  .click();
ver tema de siguiente por que veo que salen varios y varian 





ver tema de espera a que termine la descarga del archivo para continuar en el metodo para descarga 
y no usar wait´s si en dado caso da problemas la descarga y lectura al instante de lo contrario no pasa nada 
o ver si se puede hacer un tipo metodo oculto con la existencia o una espera explicita  






ver tema de la segunda nacionalidad, si unicamente entra en 2da nacionalidad al security y eso o si entra 
aunque la primera nacionalidad sea estadounidense y no uynicamente la segunda 






*/
  it("Login", () => {
    cy.Login(ArrayVar[0]);
  });

  it("Agregar cliente", () => {
    cy.busquedaCliente(ArrayCliente[no]);

    cy.log("AQUIIIIIII PAPUSHO antes del if");
    cy.log(ArrayID[no]);

    if (ArrayID[no].TipodePersona === "Natural") {
      cotizador.validarSiSeDebeCrearCliente().then((debeCrear) => {
        if (debeCrear) {
          cotizador.IdentificacionGeneralPersonaNatural(
            ArrayID[no].InfoTipoDocumento,
            ArrayID[no].FechaExp,
            ArrayID[no].RTN,
            data.correo
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

            // data.textoGenero,
            // data.PrimerApellido,
            // data.PrimerNombre,
            // data.fechaNacimientoCliente,
            // data.EstadoCivil,
            // data.gradoAcademico,
            // data.profesion,
            // data.NoAniosEducacion,
            // data.capacidadadesEspeciales,
            // data.ocupacion,
            // data.segundaNacionalidad,
            // data.tieneDobleNacionalidad,
            // data.NumeroSocial,
            // data.UbicacionSegundaNacionalidad
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

            // data.esPEP,
            // data.institucionPEP,
            // data.cargoOcupadoPEP,
            // data.periodoPEP,
            // data.EmpresaJuridicaPEP,
            // data.NombreEmpresaPEP,
            // data.PatrimonioTipodeDocumentoPEP,
            // data.PatrimonioIdentificacionPEP,
            // data.PatrimonioActividadEconomicaPEP,
            // data.PatrimonioPorcentPEP,
            // data.fechaInicialEmpresaPEP,
            // data.fechaFinalEmpresaPEP,
            // data.PatrimonioPuestoPEP
          );

          cotizador.ParentescosPEP(
            ArrayCargosPerNatural[no].apellidoMamaPEP,
            ArrayCargosPerNatural[no].primerNombreMamaPEP,
            ArrayCargosPerNatural[no].direccionMamaPEP,
            ArrayCargosPerNatural[no].tiposuegrxPEP,
            ArrayCargosPerNatural[no].apellidosuegrxPEP,
            ArrayCargosPerNatural[no].primerNombreSuegrxPEP

            // data.apellidoMamaPEP,
            // data.primerNombreMamaPEP,
            // data.direccionMamaPEP,
            // data.tiposuegrxPEP,
            // data.apellidosuegrxPEP,
            // data.primerNombreSuegrxPEP
          );

          cotizador.esCasado(
            ArrayConyugue[no].tipoConyugue,
            ArrayConyugue[no].apellidoConyugue,
            ArrayConyugue[no].nombreConyugue,
            ArrayConyugue[no].tipoCelularConyugue,
            ArrayConyugue[no].numeroConyugue
            // data.tipoConyugue,
            // data.apellidoConyugue,
            // data.nombreConyugue,
            // data.tipoCelularConyugue,
            // data.numeroConyugue
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

            // data.tipoConyugue,
            // data.apellidoConyugue,
            // data.nombreConyugue,
            // data.cedulaConyuguePEP,
            // data.fechaExpiracionCedulaConyuguePEP,
            // data.fechaNacimientoConyuguePEP,
            // data.actividadEconomicaConyuguePEP,
            // data.profesionConyuguePEP,
            // data.pasaporteConyuguePEP,
            // data.nacionalidadPasaporteConyuguePEP,
            // data.tieneSegundaNacionalidadConyuguePEP,
            // data.UbicacionSegundaNacionalidadConyuguePEP,
            // data.aniosResidirConuygue,
            // data.ubicacionconyugue,
            // data.tipoCorreoConyuguePEP,
            // data.correoConyuguePEP,
            // data.tipoTelefonoConyuguePEP,
            // data.telefonoConyuguePEP,
            // data.referenciaLaboralConyuguePEP,
            // data.sexoReferenciaLaboralConyuguePEP,
            // data.primerApellidoReferenciaLaboralPEP,
            // data.primerNombreReferenciaLaboralPEP,
            // data.fechaIngresoReferenciaLaboralConyugue,
            // data.fechaEgresoReferenciaLaboralConyugue,
            // data.puestoReferenciaConyuguePEP,
            // data.salarioReferenciaConyuguePEP,
            // data.direccionReferenciaLaboralConyuguePEP,
            // data.tipoCorreoContactoConyuguePEP,
            // data.CorreoContactoConyuguePEP,
            // data.tipoTelefonoContactoConyuguePEP,
            // data.telefonoContactoConyugue,
            // data.nombreEmpresaConyuguePEP,
            // data.fechaInscripcionNegocioConyuguePEP,
            // data.giroNegocioConyuguePEP,
            // data.ingresosMensualesConyuguePEP,
            // data.categoriadeNegocioConyuguePEP,
            // data.anioResidirNegocioConyuguePEP,
            // data.ubicacionNegocioConyuguePEP
          );

          cotizador.direccionCliente(
            ArrayDireccion[no].aniosResidir,
            ArrayDireccion[no].IngreseUbicacion

            // data.aniosResidir,
            // data.ubicacionResidencia
          );

          cotizador.contactoCliente(
            ArrayContacto[no].tipoCorreoContactoCliente,
            ArrayContacto[no].correoCliente,
            ArrayContacto[no].tipoTelefonoContactoCliente,
            ArrayContacto[no].telefonoContactoCliente
            // data.tipoCorreoContactoCliente,
            // data.correoCliente,
            // data.tipoTelefonoContactoCliente,
            // data.telefonoContactoCliente
          );

          cotizador.dependenciaEconomica(
            ArrayDependenciaEco[no].tieneDependienciaEconomica,
            ArrayDependenciaEco[no].parentescoDependenciaEconomica,
            ArrayDependenciaEco[no].cedulaDependenciaEconomica,
            ArrayDependenciaEco[no].fechaExpiracionCedulaDependenciaEconomica,
            ArrayDependenciaEco[no].apellidoDependenciaEconomica,
            ArrayDependenciaEco[no].nombredependenciaEconomica

            // data.tieneDependenciaEconomica,
            // data.parentescoDependenciaEconomica,
            // data.cedulaDependenciaEconomica,
            // data.fechaExpiracionCedulaDependenciaEconomica,
            // data.apellidoDependenciaEconomica,
            // data.nombredependenciaEconomica,
          );

          cotizador.Dependientes(
            ArrayDependientes[no].tieneDependiente,
            ArrayDependientes[no].parentescoDependiente,
            ArrayDependientes[no].apellidoDependiente,
            ArrayDependientes[no].primerNombreDependiente

            // data.tieneDependiente,
            // data.parentescoDependiente,
            // data.apellidoDependiente,
            // data.primerNombreDependiente
          );

          cotizador.perfilEconomico(
            ArrayPerfilEconomico[no].afectoISRCliente,
            ArrayPerfilEconomico[no].actividadEconomicaCliente,
            ArrayPerfilEconomico[no].claseCliente,
            ArrayPerfilEconomico[no].situacionlaboralCliente,
            ArrayPerfilEconomico[no].institucionPerfilEconomico

            // data.afectoISRCliente,
            // data.actividadEconomicaCliente,
            // data.claseCliente,
            // data.situacionlaboralCliente
          );

          cotizador.datosDelNegocio(
            ArrayDatosNegocio[no].nombreEmpresaCliente,
            ArrayDatosNegocio[no].FechaInscripcionNegocioCliente,
            ArrayDatosNegocio[no].giroNegocioCliente,
            ArrayDatosNegocio[no].ingresoMensuales,
            ArrayDatosNegocio[no].categoriaDeNegocioCliente,
            ArrayDatosNegocio[no].aniosResidirCliente,
            ArrayDatosNegocio[no].ubicacionCliente

            // data.nombreEmpresaCliente,
            // data.FechaInscripcionNegocioCliente,
            // data.giroNegocioCliente,
            // data.ingresoMensuales,
            // data.categoriaDeNegocioCliente,
            // data.aniosResidirCliente,
            // data.ubicacionCliente
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

            // data.esNacidoUsaFatcaCliente,
            // data.esResidenteFatcaCliente,
            // data.esCiudadanoFatcaCliente,
            // data.poseeDobleNacionalidadUsaFatcaCliente,
            // data.esContribuyenteIsrFatcaCliente,
            // data.tienePoderRepresentacionFatcaCliente,
            // data.tieneDireccionFatcaCliente,
            // data.direccionclienteFatca,
            // data.tieneNumeroUsaFatcaCliente,
            // data.tieneZipUsaFatcaCliente,
            // data.tieneEinFatcaCliente,
            // data.tieneTinFatcaCliente,
            // data.esClienteRecalcitrante,
            // data.tipoCelularFatcaCliente,
            // data.telefonoFatcaCliente,
            // data.codigoZipFatcaCliente,
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

            // data.referenciaTipoPersona,
            // data.generoReferenciaLaboralCliente,
            // data.apellidoReferenciaLaboralCliente,
            // data.nombreReferenciaLaboralCliente,
            // data.fechaIngresoReferenciaLaboralCliente,
            // data.fechaEgresoReferenciaLaboralCliente,
            // data.puestoReferenciaLaboralCliente,
            // data.salarioReferenciaLaboralCliente,
            // data.nombreEmpresaReferenciaLaboralCliente,
            // data.ubicacionReferencialLaboralCliente,
            // data.tipoCorreoReferencialLaboralCliente,
            // data.correoReferenciaLaboralCliente,
            // data.tipoTelefonoReferenciaLaboralCliente,
            // data.telefonoReferencialLaboralCliente
          );

          if (ArrayReferencias[no].TieneRefBanc) {
            //descarga archivo "ReferenciasPN"
            Generales.DescargaArchivoComplementos(
              ArrayReferencias[no].URL_RefBancarias,
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
                    ArrayRefBancariaPN[i]
                      .numerodeReferenciaCuentaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .productoCuentaReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .aperturaAproximadaCuentaReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .institucionCuentaReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .numeroTarjetaReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .productoTarjetaReferenciaLaboralCliente,
                    ArrayRefBancariaPN[i]
                      .limiteCreditoTarjetaReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .fechaVencimientoTarjetaReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .institucionTarjetaReferenciaLaboralCliente,
                    ArrayRefBancariaPN[i]
                      .numeroPrestamoReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .tipodePrestamoReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .montoDeudaPrestamoReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .fechaAperturaAproximadaPrestamoReferenciaBancariaCliente,
                    ArrayRefBancariaPN[i]
                      .institucionPrestamoReferenciaLaboralCliente
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
                    ArrayRefComercialPN[k]
                      .tipoTelefonoReferenciaComercialCliente,
                    ArrayRefComercialPN[k]
                      .numeroTelefonoReferenciaComercialCliente
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

cy.xpath("//button[.//span[normalize-space()='Editar']]").then($btn => {
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
});
    
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
                  cy.xpath("//button[.//span[normalize-space()='Editar']]").then($btn => {
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
});
                  
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
            "//button[.//span[contains(@class, 'mdc-button__label') and normalize-space(text())='Siguiente']]"
          )
            .filter(":visible:not([disabled])")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true, timeout: 6000 });
          // cotizador.referencias(

          //   // data.tieneReferenciasBancarias,
          //   // data.tipodeCuentaReferenciaCliente,
          //   // data.origenCuentaReferenciaCliente,
          //   // data.numerodeReferenciaCuentaBancariaCliente,
          //   // data.productoCuentaReferenciaBancariaCliente,
          //   // data.aperturaAproximadaCuentaReferenciaBancariaCliente,
          //   // data.institucionCuentaReferenciaBancariaCliente,
          //   // data.numeroTarjetaReferenciaBancariaCliente,
          //   // data.productoTarjetaReferenciaLaboralCliente,
          //   // data.limiteCreditoTarjetaReferenciaBancariaCliente,
          //   // data.fechaVencimientoTarjetaReferenciaBancariaCliente,
          //   // data.institucionTarjetaReferenciaLaboralCliente,
          //   // data.numeroPrestamoReferenciaBancariaCliente,
          //   // data.tipodePrestamoReferenciaBancariaCliente,
          //   // data.montoDeudaPrestamoReferenciaBancariaCliente,
          //   // data.fechaAperturaAproximadaPrestamoReferenciaBancariaCliente,
          //   // data.institucionPrestamoReferenciaLaboralCliente,
          //   // data.tieneReferenciasComerciales,
          //   // data.nombreReferenciaComercialCliente,
          //   // data.direccionReferencialComercialCliente,
          //   // data.tipoCorreoReferenciaComercialCliente,
          //   // data.correoReferenciaLaboralCliente,
          //   // data.tipoTelefonoReferenciaComercialCliente,
          //   // data.numeroTelefonoReferenciaComercialCliente,
          //   // data.tieneReferenciasFamiliares,
          //   // data.parentescoReferenciaFamiliarCliente,
          //   // data.apellidoReferenciaFamiliarCliente,
          //   // data.nombreReferenciaFamiliarCliente,
          //   // data.tipoTelefonoReferenciaFamiliarCliente,
          //   // data.telefonoReferenciaFamiliarCliente,
          //   // data.tieneReferenciasPersonales,
          //   // data.apellidoreferenciaPersonalCliente,
          //   // data.nombreReferenciaPersonalCliente,
          //   // data.tipoTelefonoReferenciaPersonalCliente,
          //   // data.telefonoReferenciaPersonalCliente
          // );

          cotizador.digitalizacionDocumentos();
        } else {
          cy.log("Cliente ya existe. No se creará.");
          cotizador.ClienteCreadoParcialmente(data.esPEP, data.EstadoCivil);
        }
      });
    } else if (ArrayID[no].TipodePersona.toLowerCase() == "jurídica") {
      cy.log("JURIDICO PAPS");

      //PASO #1
      PJ.Identificacion(ArrayID[no]);
      // FIN PASO #1

      //PASO #2
      PJ.DatosGeneralesPersonaJuridica(ArrayDataGenP[no]);
      // FIN PASO #2

      //PASO #3
      cy.log(ArrayCaptAccionistas[no].TieneRef);
      if (ArrayCaptAccionistas[no].TieneRef) {
        cy.log(
          ArrayCaptAccionistas[no].TieneRef +
            "Verdadero ArrayCaptAccionistas[no].TieneRef"
        );
        //descarga archivo "Captura de accionistas"
        Generales.DescargaArchivoComplementos(
          ArrayCaptAccionistas[no].URL_RefAccionistas,
          "CaptAccionistas"
        );
        // Lee TODAS las hojas en una sola operación y realizacion del paso 3
        cy.task("readExcelToJson", {
          filePath: "cypress/fixtures/CaptAccionistas.xlsx",
        }).then((excelData) => {
          // Asigna los datos a los arrays correspondientes
          const ArrayRefAccionistas = excelData["RefAccionista"] || [];
          const ArrayIDcapAcc = excelData["Identificacion"] || [];
          const ArrayInfCompl = excelData["Informacion Complementaria"] || [];
          const ArrayDtsGnPJyN = excelData["DG PJ y N"] || [];
          const ArrayRLCapAcc = excelData["Representante Legal"] || [];

          cy.log(`Número de registros: ${ArrayRefAccionistas.length}`);
          cy.oculto();
          // Procesa los datos
          for (let i = 0; i < ArrayRefAccionistas.length; i++) {
            cy.get("body", { timeout: 5000 }).then(($body) => {
              if (
                $body
                  .text()
                  .includes(
                    "El último elemento de cada rama debe ser una persona natural"
                  )
              ) {
                cy.log(
                  'Si aparecio el mensaje "El último elemento de cada rama debe ser una persona natural" '
                );
                cy.xpathClk(
                  "(//button[contains(@class, 'swal2-confirm') and contains(., 'Aceptar')])[1]"
                );
                //            cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")
                cy.log(
                  'NATURAL "El último elemento de cada rama debe ser una persona natural"'
                );
                cy.xpathClk("//mat-icon[text()='add']");
                // Aquí tu flujo cuando aparece el mensaje
                PJ.AggRefNatural(
                  ArrayIDcapAcc[i],
                  ArrayInfCompl[i],
                  ArrayDtsGnPJyN[i]
                );
              } else {
                cy.log(
                  'No aparecio el mensaje "El último elemento de cada rama debe ser una persona natural" '
                );
                // Aquí el flujo alternativo
                if (ArrayRefAccionistas[i].AggRef === "Jurídica") {
                  cy.log("JURIDICO");
                  cy.xpathClk("(//button[contains(., 'Agregar')])[1]");
                  PJ.AggRefJuridica(
                    ArrayIDcapAcc[i],
                    ArrayInfCompl[i],
                    ArrayDtsGnPJyN[i],
                    ArrayRLCapAcc[i]
                  );
                  cy.xpathClk("(//button[contains(., 'Aceptar')])[1]");
                } else if (ArrayRefAccionistas[i].AggRef === "Natural") {
                  cy.xpath("//mat-icon[text()='add']", { timeout: 5000 }).then(
                    ($el) => {
                      if ($el.length > 0 && $el.is(":visible")) {
                        // ✅ El elemento existe y está visible
                        cy.wrap($el).click();
                        cy.log("NATURAL");
                        PJ.AggRefNatural(
                          ArrayIDcapAcc[i],
                          ArrayInfCompl[i],
                          ArrayDtsGnPJyN[i]
                        );
                      } else {
                        // ❌ El elemento no existe o está oculto
                        cy.log("El icono 'add' no está visible");
                        cy.log("NATURAL");
                        PJ.AggRefNatural(
                          ArrayIDcapAcc[i],
                          ArrayInfCompl[i],
                          ArrayDtsGnPJyN[i]
                        );
                      }
                    }
                  );
                } else {
                  cy.log(
                    'No hay datos "Captura de accionistas" presionando boton siguiente'
                  );
                }
              }
            });
          }
        });
      }
      //presionamos siguiente luego de terminar la lectura o vlaidar si no hay referencias
      cy.xpathClk(
        "//span[contains(., 'Referencias Accionistas')]/ancestor::div[contains(@class, 'mat-vertical-content-container')]//button[span[contains(., 'Siguiente')]]"
      );
      // FIN PASO #3

      //PASO #4
      if (ArrayCapJuntaDir[no].TieneJD) {
        //descarga archivo "Captura de junta directiva"
        //inicio lectura hojas archivo "Captura de junta directiva"
        //lectura del archivo "Captura de junta directiva" hoja 0 "Junta Directiva "
        cy.task("readExcelToJson", {
          filePath: "cypress/fixtures/CapJuntaDir.xlsx",
        }).then((JuntaDir) => {
          // Asigna los datos a los arrays correspondientes
          const ArrayJuntaDir = JuntaDir["Junta Directiva"] || [];
          for (let i = 0; i < ArrayJuntaDir.length; i++) {
            PJ.CapturaJuntaDirectiva(ArrayJuntaDir[i]);
          }
        });
      }
      //Boton siguiente Paso #4
      cy.xpathClk("(//button[contains(., 'Siguiente')])[4]");
      // FIN PASO #4

      //PASO #5
      for (let i = 0; i < ArrayRepreLegalDG.length; i++) {
        PJ.RepresentanteLegal(ArrayRepreLegalDG[no], ArrayRepreLegalDir[no]);
        //descarga archivo "Representante Legal - Contacto"
        Generales.DescargaArchivoComplementos(
          ArrayRepreLegalCont[no].URL_Contacto,
          "RepreLegalCont"
        );
        //lectura hojas archivo "Representante Legal - Contacto"
        cy.task("readExcelToJson", {
          filePath: "cypress/fixtures/RepreLegalCont.xlsx",
        }).then((excelData) => {
          // Asigna los datos a los arrays correspondientes
          const ArrayRLcorreo = excelData["correo"] || [];
          const ArrayRLtelefono = excelData["telefono"] || [];
          //FIN lectura hojas archivo "Representante Legal - Contacto"

          for (let i = 0; i < ArrayRLcorreo.length; i++) {
            PJ.correoRL(ArrayRLcorreo[i]);
          }
          for (let i = 0; i < ArrayRLtelefono.length; i++) {
            PJ.celularRL(ArrayRLtelefono[i]);
          }
        });
        cy.xpathClk("(//button[contains(., 'Agregar')])[5]");
      }
      //Boton siguiente Paso #5
      cy.xpathClk("(//button[contains(., 'Siguiente')])[7]");
      // FIN PASO #5

      //PASO #6
      PJ.InfGenFin(ArrayPerfilEconomico[no]);
      //descarga archivo "Perfil Economico - Informacion Financiera"
      Generales.DescargaArchivoComplementos(
        ArrayPerfilEconomico[no].URL_InfFinanciera,
        "PerfilEcoInfFinanciera"
      );
      //lectura hojas archivo "Perfil Economico - Informacion Financiera"
      //lectura del archivo "Perfil Economico - Informacion Financiera" hoja 0 "Inf Financiera"
      cy.task("readExcelToJson", {
        filePath: "cypress/fixtures/PerfilEcoInfFinanciera.xlsx",
      }).then((InfFinanciera) => {
        InfFinanciera.forEach((filaVar) => {
          const ArrayInfFinanciera = filaVar["Inf Financiera"] || [];

          for (let i = 0; i < ArrayInfFinanciera.length; i++) {
            PJ.monedaPE(ArrayInfFinanciera[i]);
          }
          //cuando termine de agregar la informacion financiera continuara con el flujo
          cy.xpathClk("(//button[contains(., 'Siguiente')])[8]");
        });
      });
      Generales.DescargaArchivoComplementos(
        ArrayPerfilEconomico[no].InfDondeOpera,
        "PerfilEcoInfDondeOpera"
      );
      //lectura hojas archivo "Perfil Economico - Informacion donde Opera"
      //lectura del archivo "Perfil Economico - Informacion donde Opera" hoja 0 "Inf DondeOpera"
      cy.task("readExcelToJson", {
        filePath: "cypress/fixtures/PerfilEcoInfDondeOpera.xlsx",
      }).then((InfDondeOpera) => {
        InfDondeOpera.forEach((filaVar) => {
          const ArrayInfDondeOpera = filaVar["Inf DondeOpera"] || [];

          for (let i = 0; i < ArrayInfDondeOpera.length; i++) {
            PJ.InfOpera(ArrayInfDondeOpera[i]);
          }
          //cuando termine de agregar la informacion donde opera continuara con el flujo
          cy.xpathClk("(//button[contains(., 'Siguiente')])[9]");
        });
      });
      PJ.Relaciones(ArrayPerfilEconomico[no]);
      //descarga archivo "Perfil Economico - Proveedor"
      Generales.DescargaArchivoComplementos(
        ArrayPerfilEconomico[0].Proveedor,
        "PerfilEcoProveedor"
      );
      //lectura hojas archivo "Perfil Economico - Proveedor"
      //lectura del archivo "Perfil Economico - Proveedor" hoja 0 "proveedores"
      cy.task("readExcelToJson", {
        filePath: "cypress/fixtures/PerfilEcoProveedor.xlsx",
      }).then((Proveedor) => {
        Proveedor.forEach((filaVar) => {
          const ArrayProveedor = filaVar["proveedores"] || [];

          for (let i = 0; i < ArrayProveedor.length; i++) {
            PJ.PrincProvee(ArrayProveedor[i]);
          }

          //validar este siguiente no estoy seguro si es necesario
          cy.xpathClk(
            "(//button[.//span[contains(normalize-space(.), 'Finalizar')]])[1]"
          );
        });
      });
      // FIN PASO #6

      //PASO #7
      PJ.Direcciones(ArrayDireccion[no]);
      // FIN PASO #7

      //PASO #8
      PJ.Contacto(ArrayContacto[no]);

      //descarga archivo "Contacto"
      Generales.DescargaArchivoComplementos(
        ArrayContacto[0].URL_Contacto,
        "Contacto"
      );
      //inicio lectura hojas archivo "Contacto"
      cy.task("readExcelToJson", {
        filePath: "cypress/fixtures/Contacto.xlsx",
      }).then((dataContacto) => {
        dataContacto.forEach((filaVar) => {
          const ArrayConCorreo = filaVar["correo"] || [];
          const ArrayConTelefono = filaVar["telefono"] || [];

          for (let i = 0; i < ArrayConCorreo.length; i++) {
            PJ.correo(ArrayConCorreo[i]);
          }
          for (let i = 0; i < ArrayConTelefono.length; i++) {
            PJ.celular(ArrayConTelefono[i]);
          }
        });
      });

      // FIN PASO #8

      //PASO #9
      // FIN PASO #9
    } else {
      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");
    }
  }); //TERMINA IT AGREGAR CLIENTE
  // no++
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
