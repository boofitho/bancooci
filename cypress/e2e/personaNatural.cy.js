import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";

//variables para bancoocci
let url = "https://plataforma-qa.bytesw.cloud/";
let usuario = "OPERADORQA";
let contrasena = "byte0625";
let tipoDocumento = " 1 - CEDULA DE IDENTIDAD ";
let InfoTipoDocumento = "0826199564782";
let usuarioAgregar = "Cliente";
let persona = " Natural";
let anio = " 2026 ";
let mes = " NOV ";
let dia = " 6 ";
let RTN = "HN0826-1995-647821";
let textoGenero = " Masculino";
let PrimerApellido = "Cuellar"
let PrimerNombre = "Jesus"
let anioNacimiento = " 1995 "
let mesNacimiento = " JUL ";
let diaNacimiento = " 7 ";
let EstadoCivil = " Casado(a) "
let gradoAcademico = " UNIVERSITARIO " 
let profesion = " AGENTE DE VIAJES "
let NoAniosEducacion = "15"
let capacidadadesEspeciales = " Ninguna "
let ocupacion = " JEFE DE SUPERVISION "
let dobleNacionalidad = "si"
let nacionalidad = " ANDORRA "
let NumeroSocial = "362112657"
//Variables persona natural

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
