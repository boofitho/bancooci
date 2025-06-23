import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "./personaJuridica.cy.js";
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
  InfoTipoDocumento: "0826199564784",

  //Agregar Cliente
  //##### PASO 1 - Para Identificacion
  TipodePersona: "natural",
  RTN: "HN1010199002153134",
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
  PrimerApellido: "Cuellar",
  PrimerNombre: "Jesus",
  anioNacimiento: " 1995 ",
  mesNacimiento: " JUL ",
  diaNacimiento: " 7 ",
  EstadoCivil: " Casado(a) ",
  gradoAcademico: " UNIVERSITARIO ",
  profesion: " AGENTE DE VIAJES ",
  NoAniosEducacion: "15",
  capacidadadesEspeciales: " Ninguna ",
  ocupacion: " JEFE DE SUPERVISION ",
  //consulta si tiene dos nacionalidades
  dobleNacionalidad: "si",
  nacionalidad: " ESTADOUNIDENSE ",
  NumeroSocial: "362112657",
  UbicacionSegundaNacionalidad: " ESTADOS UNIDOS DE AMERICA ",
  //paso 3 persona expuesta politicamente
  pep: "no",
  institucionPEP: "Ministerio de energía",
  cargoOcupadoPEP: "Gerente general",
  periodoPEP: " 2019 - 2022 ",
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
        data.dobleNacionalidad,
        data.NumeroSocial,
        data.UbicacionSegundaNacionalidad
      );

      cotizador.PersonaPep(
        data.pep,
        data.institucionPEP,
        data.cargoOcupadoPEP,
        data.periodoPEP
      );
    } else if (data.TipodePersona.toLowerCase() == "juridico") {
      cy.log("JURIDICO PAPS");
      PJ.IngresoDatosPersonaJuridica();
      PJ.Identificacion(data);
      PJ.DatosGeneralesPersonaJuridica(data);
    } else {
      cy.log('*******************************************************')
      cy.log('Debe de ingresar un tipo de cliente: Natural o Juridico')
      cy.log('*******************************************************')
    }
  });
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
