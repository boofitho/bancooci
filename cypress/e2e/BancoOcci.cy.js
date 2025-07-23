import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";
const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

const URL_Var = Cypress.env('URL_VAR');       //link URL´s para descargar los documentos 

let ArrayVar = []; // Variable global para almacenar las variables
let ArrayDat = []; // Variable global para almacenar los datos


const dataquemada = {
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
     cy.log(URL_Var)
      //Descarga el de archivo variables
      Generales.ArchivoNubeV(URL_Var)

      //Lee archivo de variables y guarda en un array los resultados 
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/variables.xlsx" }).then((DatosVar) => {
        DatosVar.forEach((filaVar) => {
          ArrayVar.push(filaVar)
        })
      }); 
    
    
      const folderPath = 'cypress/screenshots';  // Aquí coloca la ruta de la carpeta de capturas u otros archivos que quieras borrar
      cy.task('deleteAllFiles', folderPath);

 }); // TERMINA BEFORE

  it('Descarga de archivos nesesarios', () => {
    Generales.ArchivoDatos(ArrayVar[0].URL_DATOS)             // Descarga archivo de tx
  })// TERMINA EL IT DESCARGA DE ARCHIVOS

it('Login', () => {
  cy.Login(ArrayVar[0].URL_Sitio, ArrayVar[0].Usuario, ArrayVar[0].Password);
})

it("Busqueda de cliente", () => {
});

it("Agregar cliente", () => {
  
  //lectura del archivo "Datos"
  cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx" }).then((Datos) => {
    Datos.forEach((data, index) => {
    ArrayDat.push(data)
    cy.log(`Procesando fila #${index + 1}`);


    cy.busquedaCliente(data);

    cy.log("AQUIIIIIII PAPUSHO antes del if");
    if (data.TipodePersona.toLowerCase() == "natural") {
      Generales.TipodePersona(data);
      cy.wait(2000);
      cotizador.IdentificacionGeneralPersonaNatural(data);
      cotizador.DatosGeneralesPersonaNatural(data);
      cotizador.clickpaso2();
      cy.wait(500);

      cotizador.PersonaPep(data);
      cotizador.ParentescosPEP(data);
      cotizador.esCasado(data);
      cotizador.escasadoPEP(data);
    } else if (data.TipodePersona.toLowerCase() == "jurídica") {
      cy.log("JURIDICO PAPS");
      PJ.IngresoDatosPersonaJuridica();
      PJ.Identificacion(data);
      PJ.DatosGeneralesPersonaJuridica(data);
    } else {
      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");
    }
      })//FIN LECTURA FOREACH DATOS
    })//FIN LECTURA ARCHIVO "DATOS"  
  })//TERMINA IT AGREGAR CLIENTE
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
