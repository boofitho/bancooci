require("cypress-xpath");
class PersonaNatural {
  VisitaCotizador(user, password) {
    before(() => {
      cy.visit(
        "https://keycloak-core.bytesw.cloud/realms/cotizador/protocol/openid-connect/auth?client_id=cotizador-ui&redirect_uri=https%3A%2F%2Fplataforma-qa.bytesw.cloud%2F&state=e1fe3a55-1671-4f14-a62e-72c78890a2f1&response_mode=fragment&response_type=code&scope=openid&nonce=60191224-ef1f-4336-86a6-3583752b3186&code_challenge=69hPOed5beLYgXfDGAHFB6gXNwZDydNoIRUIWhO0oh4&code_challenge_method=S256"
      );
      cy.title().should("eq", "Inicia sesión en cotizador");
      cy.wait(1500);
    });
  }

  login(user, password) {
    cy.get("input#username").type(user);
    cy.get("input#password").type(password);
    cy.get("#kc-login").click();
  }

  IngresoPersonaNatural(usuarioAgregar) {//Metodo para agregar tipo de persona 
    //Ingreso de persona natural
    cy.contains("span", "Agregar ").click({ force: true });
    cy.wait(3000);
    cy.get("#cdk-overlay-2").contains(usuarioAgregar).click({ force: true });
    cy.wait(20000);
  }//Fin tipo de persona 

  IngresoDatosPersonaNatural(InfoTipoDocumento){ //Se ingresan datos en la pantalla tipo de persona natural 
    cy.contains('mat-label', 'CEDULA DE IDENTIDAD' ).type(InfoTipoDocumento)
    cy.get('button[aria-label="Open calendar"]').click();



  }//fin ingreso de datos persona natural




}

export default PersonaNatural;
