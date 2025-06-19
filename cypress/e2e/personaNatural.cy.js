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
let anio = "2017"
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
    cy.alertaSuscr();
    cy.alertaNotif();
    cy.busquedaCliente(tipoDocumento, InfoTipoDocumento);
    cy.wait(8000);
    cotizador.IngresoPersonaNatural(usuarioAgregar);
    cy.wait(8000);
    metodos.TipodePersona(persona);
    cotizador.IngresoDatosPersonaNatural(InfoTipoDocumento, anio)
    

  });

  //   it("Agregar persona", () => {
  //     cy.busquedaCliente(tipoDocumento, InfoTipoDocumento);
  //     cy.wait(8000)
  //     cotizador.IngresoPersonaNatural(usuarioAgregar)
  //     cy.wait(8000)
  //     cotizador.IngresoPersonaNatural(persona)
  //   });
});
