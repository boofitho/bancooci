import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";

const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

const URL_Var = Cypress.env('URL_VAR');       //link URL´s para descargar los documentos 

let ArrayVar = []

let objetoCliente = {};
let objetoID = {};

let ArrayCliente = []
let ArrayID = []
let ArrayDataGenPJ = []
let ArrayCaptAccionistas = []
let ArrayCapJuntaDir = []
let ArrayRepreLegalDG = []
let ArrayRepreLegalDir = []
let ArrayRepreLegalCont = []
let ArrayPerfilEconomico = []
let ArrayDireccion = []
let ArrayContacto = []
let ArrayFATCA = []
let ArrayReferencias = []
let ArrayDigitalDocs = []
let ArrayClienteFinalizado = []

//arrays archivos complemetnarios 
let ArrayRefAccionistas = []
let ArrayIDcapAcc = []
let ArrayInfCompl =[]
let ArrayDtsGnPJyN =[]
let ArrayRLCapAcc =[]
let ArrayJuntaDir =[]
let ArrayRLcorreo =[]
let ArrayRLtelefono =[]
let ArrayInfFinanciera =[]
let ArrayInfDondeOpera =[]
let ArrayProveedor =[]
let ArrayConCorreo =[]
let ArrayConTelefono =[]



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
  // RTN: "HN0301-2005-322892", // 
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
let no = 2
describe("BancoOcci", () => {

  Cypress.on("uncaught:exception", (err, Runnable) => {
    return false;
  });

  before("Ingreso e inicio de sesion", () => {
     cy.log(URL_Var)
      //Descarga el de archivo variables
      Generales.ArchivoNubeV(URL_Var)
    
      //Lee archivo de variables y guarda en un array los resultados 
      cy.task("readExcelToJson", { 
        filePath: "cypress/fixtures/variables.xlsx", 
        hoja: "Variables" 
      }).then((Var) => {
        Var.forEach((filaVar) => {
          ArrayVar.push(filaVar);
        });
      });
   
      const folderPath = 'cypress/screenshots';  // Aquí coloca la ruta de la carpeta de capturas u otros archivos que quieras borrar
      cy.task('deleteAllFiles', folderPath);     //con este comando borramos el folderpath de screenshots

 }); // TERMINA BEFORE

it('Descarga de archivos datos y lectura de hojas del mismo', () => {
    //descarga archivo "datos"
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS, "datos")  
    cy.wait(5000) // descargando archivo
   
    //lista las hojas disponibles en el archivo datos
    cy.task('listarHojasExcel', { filePath: 'cypress/fixtures/datos.xlsx' }).then((nombres) => {
      cy.log('Hojas disponibles: ' + nombres.join(', '));
    });

    /*Inicio lectura del archivo "datos" por hojas*/
    
    //lectura del archivo "datos" hoja 0
  
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "0 Cliente"}).then((datosCliente) => {
    //   datosCliente.forEach((fila) => {
    //     ArrayCliente.push(fila); // O cualquier lógica que necesites
    //   });
    // });
    cy.task("readExcelToJson", { 
      filePath: "cypress/fixtures/datos.xlsx", 
      hoja: "0 Cliente"
    }).then((datosCliente) => {
      objetoCliente = datosCliente;
      cy.log(JSON.stringify(objetoCliente)); // Para ver el contenido
    });



    //lectura del archivo "datos" hoja 1 "Identificacion"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "1 Identificacion"}).then((ID) => {
    //   ID.forEach((filaVar) => {
    //     ArrayID.push(filaVar);
    //   });
    // });
          
    cy.task("readExcelToJson", { 
      filePath: "cypress/fixtures/datos.xlsx", 
      hoja: "1 Identificacion"
    }).then((datosID) => {
      objetoID = datosID; // Ya es un objeto desde la tarea
      cy.log(JSON.stringify(objetoID));
    });
    
  //lectura del archivo "datos" hoja 2 "Datos Generales Persona juridica"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "2 DatosGenPerjur"}).then((DataGenPJ) => {
      DataGenPJ.forEach((filaVar) => {
        ArrayDataGenPJ.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 3 "Captura de accionistas"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "3 Captura de accionistas"}).then((CaptAccionistas) => {
      CaptAccionistas.forEach((filaVar) => {
        ArrayCaptAccionistas.push(filaVar);
      });
    });
    
    //lectura del archivo "datos" hoja 4 "Captura de junta directiva"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "4 Captura de junta directiva"}).then((CapJuntaDir) => {
      CapJuntaDir.forEach((filaVar) => {
        ArrayCapJuntaDir.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 5 "Representante Legal - Datos Generales"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "5 RLDatos Generales"}).then((RepreLegalDG) => {
      RepreLegalDG.forEach((filaVar) => {
        ArrayRepreLegalDG.push(filaVar);
      });
    });
 
    //lectura del archivo "datos" hoja 6 "Representante Legal - Direccion"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "5 RLDireccion"}).then((RepreLegalDir) => {
      RepreLegalDir.forEach((filaVar) => {
        ArrayRepreLegalDir.push(filaVar);
      });
    });
    
    //lectura del archivo "datos" hoja 7 "Representante Legal - Contacto"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "5 RLContacto"}).then((RepreLegalCont) => {
      RepreLegalCont.forEach((filaVar) => {
        ArrayRepreLegalCont.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 8 "Perfil Economico"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "6 PerfilEconomico"}).then((PerfilEconomico) => {
      PerfilEconomico.forEach((filaVar) => {
        ArrayPerfilEconomico.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 9 "Dirección"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "7 Dirección"}).then((Direccion) => {
      Direccion.forEach((filaVar) => {
        ArrayDireccion.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 10 "Contacto"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "8 Contacto"}).then((Contacto) => {
      Contacto.forEach((filaVar) => {
        ArrayContacto.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 11 "FATCA"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "9 FATCA"}).then((FATCA) => {
      FATCA.forEach((filaVar) => {
        ArrayFATCA.push(filaVar);
      });
    });    

    //lectura del archivo "datos" hoja 12 "Referencias"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "10 referencia"}).then((Referencias) => {
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
    
        
  })// TERMINA EL IT DESCARGA DE ARCHIVO DATOS Y LECTURA DE HOJAS

it('Descarga de archivos complemetnarios y lectura de hojas de los mismo', () => {
    //descarga de archivos secundarios de los datos
    
    //descarga archivo "Captura de accionistas"
    Generales.DescargaArchivoComplementos(ArrayCaptAccionistas[0].URL_RefAccionistas, "CaptAccionistas")            
    //inicio lectura hojas archivo "Captura de accionistas"
    //lectura del archivo "Captura de accionistas" hoja 0 "Referencias Accionistas"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/CaptAccionistas.xlsx", hoja: "Referencias Accionistas"}).then((RefAccionistas) => {
      RefAccionistas.forEach((filaVar) => {
        ArrayRefAccionistas.push(filaVar); 
      });
    });
    //lectura del archivo "Captura de accionistas" hoja 1 "Identificacion"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/CaptAccionistas.xlsx", hoja: "Identificacion"}).then((IDcapAcc) => {
      IDcapAcc.forEach((filaVar) => {
        ArrayIDcapAcc.push(filaVar); 
      });
    });
    //lectura del archivo "Captura de accionistas" hoja 2 "Información Complementaria"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/CaptAccionistas.xlsx", hoja: "Informacion Complementaria"}).then((InfCompl) => {
      InfCompl.forEach((filaVar) => {
        ArrayInfCompl.push(filaVar); 
      });
    });
    //lectura del archivo "Captura de accionistas" hoja 3 "DG PJ y N"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/CaptAccionistas.xlsx", hoja: "DG PJ y N"}).then((DtsGnPJyN) => {
      DtsGnPJyN.forEach((filaVar) => {
        ArrayDtsGnPJyN.push(filaVar); 
      });
    });
    //lectura del archivo "Captura de accionistas" hoja 4 "Representante Legal"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/CaptAccionistas.xlsx", hoja: "Representante Legal"}).then((RLCapAcc) => {
      RLCapAcc.forEach((filaVar) => {
        ArrayRLCapAcc.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Captura de accionistas"

    //descarga archivo "Captura de junta directiva"
    Generales.DescargaArchivoComplementos(ArrayCapJuntaDir[0].URL_JuntaDirectiva, "CapJuntaDir")            
    //inicio lectura hojas archivo "Captura de junta directiva"
    //lectura del archivo "Captura de junta directiva" hoja 0 "Junta Directiva "
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/CapJuntaDir.xlsx", hoja: "Referencias Accionistas"}).then((JuntaDir) => {
      JuntaDir.forEach((filaVar) => {
        ArrayJuntaDir.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Captura de junta directiva"

    //descarga archivo "Representante Legal - Contacto"
    Generales.DescargaArchivoComplementos(ArrayRepreLegalCont[0].URL_Contacto, "RepreLegalCont")            
    //inicio lectura hojas archivo "Representante Legal - Contacto"
    //lectura del archivo "Representante Legal - Contacto" hoja 0 "correo"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/RepreLegalCont.xlsx", hoja: "correo"}).then((RLcorreo) => {
      RLcorreo.forEach((filaVar) => {
        ArrayRLcorreo.push(filaVar); 
      });
    });
    //lectura del archivo "Representante Legal - Contacto" hoja 1 "telefono"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/RepreLegalCont.xlsx", hoja: "telefono"}).then((RLtelefono) => {
      RLtelefono.forEach((filaVar) => {
        ArrayRLtelefono.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Representante Legal - Contacto"

    //descarga archivo "Perfil Economico - Informacion Financiera"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].InfFinanciera, "PerfilEcoInfFinanciera")       
    //inicio lectura hojas archivo "Perfil Economico - Informacion Financiera"
    //lectura del archivo "Perfil Economico - Informacion Financiera" hoja 0 "Inf Financiera"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoInfFinanciera.xlsx", hoja: "Inf Financiera"}).then((InfFinanciera) => {
      InfFinanciera.forEach((filaVar) => {
        ArrayInfFinanciera.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Perfil Economico - Informacion Financiera"

    //descarga archivo "Perfil Economico - Informacion donde Opera"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].InfDondeOpera, "PerfilEcoInfDondeOpera")            
    //inicio lectura hojas archivo "Perfil Economico - Informacion donde Opera"
    //lectura del archivo "Perfil Economico - Informacion donde Opera" hoja 0 "Inf DondeOpera"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoInfDondeOpera.xlsx", hoja: "Inf DondeOpera"}).then((InfDondeOpera) => {
      InfDondeOpera.forEach((filaVar) => {
        ArrayInfDondeOpera.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Perfil Economico - Informacion donde Opera"
   
    //descarga archivo "Perfil Economico - Proveedor"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].Proveedor, "PerfilEcoProveedor")            
    //inicio lectura hojas archivo "Perfil Economico - Proveedor"
    //lectura del archivo "Perfil Economico - Proveedor" hoja 0 "Inf DondeOpera"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoProveedor.xlsx", hoja: "Inf DondeOpera"}).then((Proveedor) => {
      Proveedor.forEach((filaVar) => {
        ArrayProveedor.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Perfil Economico - Proveedor"
         
    //descarga archivo "Contacto"
    Generales.DescargaArchivoComplementos(ArrayContacto[0].URL_Contacto, "Contacto")            
    //inicio lectura hojas archivo "Contacto"
    //lectura del archivo "Contacto" hoja 0 "correo"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/Contacto.xlsx", hoja: "correo"}).then((ConCorreo) => {
      ConCorreo.forEach((filaVar) => {
        ArrayConCorreo.push(filaVar); 
      });
    });
    //lectura del archivo "Contacto" hoja 1 "telefono"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/Contacto.xlsx", hoja: "telefono"}).then((ConTelefono) => {
      ConTelefono.forEach((filaVar) => {
        ArrayConTelefono.push(filaVar); 
      });
    });
    //Fin lectura hojas archivo "Contacto"





})




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
it('Login', () => {
  
  cy.Login(ArrayVar[0].URL_Sitio, ArrayVar[0].Usuario, ArrayVar[0].Password);
})

it("Agregar cliente", () => {

        cy.busquedaCliente(ArrayCliente[no].tipoDocumento, ArrayCliente[no].InfoTipoDocumento);

    cy.log("AQUIIIIIII PAPUSHO antes del if");
    

    if (ArrayID[no].TipodePersona === "Natural") {
      cotizador.validarSiSeDebeCrearCliente().then((debeCrear) => {
        if (debeCrear) {
          cotizador.IdentificacionGeneralPersonaNatural(

            this.ArrayCliente[no].tipoDocumento,
             this.ArrayCliente[no].FechaExpiracion,
             this.ArrayID[no].RTN,
            // data.InfoTipoDocumento,
            // data.fechaExpericacionCedulaCliente,
            // data.RTN,
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
            data.FechaInscripcionNegocioCliente,
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
      

      PJ.Identificacion(data);


      PJ.DatosGeneralesPersonaJuridica(data);
      [];
    } else {

      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");

    }
    no++
  })//TERMINA IT AGREGAR CLIENTE
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
