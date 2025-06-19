require("cypress-xpath");
class PersonaNatural {
  VisitaCotizador(user, password ) {
    
      cy.visit(
        "https://keycloak-core.bytesw.cloud/");
         cy.get('input#username').type(user)
        cy.get('input#password').type(password)
        cy.get('#kc-login').click()
    //     cy.origin('https://keycloak-core.bytesw.cloud', { args: { user, password } }, ({ user, password }) => {
       
    //     }) 
    //   cy.title().should("eq", "Inicia sesión en cotizador");
      cy.wait(3000);
      

  }

  login(user, password) {
    cy.get("input#username").type(user);
    cy.get("input#password").type(password);
    cy.get("#kc-login").click();
  }

  IngresoPersonaNatural(usuarioAgregar) {
    //Ingreso de persona natural
    cy.contains("span", "Agregar ").click({force:true});
    cy.wait(3000)
    cy.get("#cdk-overlay-2").contains(usuarioAgregar).click({force:true});
    cy.wait(12000)
  }

TipodePersona(persona){
cy.contains('label', persona).click();



}




}

export default PersonaNatural;
