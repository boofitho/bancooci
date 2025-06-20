require("cypress-xpath");
class personaJuridica {


  IngresoDatosPersonaJuridica(){ 
    
    cy.xpathClk('//label[contains(normalize-space(), "Jurídica")]')
  }
  //Identificacion Juridica 
  Identificacion(data){ 
    cy.xpathBtxt(data.RTN, "//mat-label[contains(normalize-space(), 'REGISTRO TRIBUTARIO NACIONAL')]")
    cy.xpathClk("(//button[contains(., 'Siguiente')])[1]")
  }//Identificacion Juridica

  DatosGeneralesPersonaJuridica(data){
    this.TipoPersonaJuridica(
      data.TPJ,
      data.RazonSoc,
      data.NombreCom,
      data.Siglas,
      data.PaisOr,
      data.CatNegocio
    )
    this.DatosConstitucionEmpresa(
      data.TipSoc,
      data.FechaReg,
      data.EnFormacion,
      data.FechaIniOp
    )
    this.RegistroMercantil(
      data.Numero,
      data.tomo,
      data.Pagina,
      data.PatenteCom,
      data.EscriPermiso
    )
//    cy.xpathClk("(//button[contains(., 'Siguiente')])[2]")

  }

  TipoPersonaJuridica(TPJ, RazonSoc, NombreCom, Siglas, PaisOr, CatNegocio){
    cy.xpathClk("(//mat-radio-button[contains(., "+String(TPJ)+")])")
    // cy.xpathBtxt(TPJ, "(//mat-radio-button[contains(., 'ONG')])")
    // cy.xpathBtxt(TPJ, "(//mat-radio-button[contains(., 'ONG')])")
    // cy.xpathBtxt(TPJ, "(//mat-radio-button[contains(., 'ONG')])")
    // cy.xpathBtxt(TPJ, "(//mat-radio-button[contains(., 'ONG')])")
    
  }

  DatosConstitucionEmpresa(TipSoc, FechaReg, EnFormacion, FechaIniOp){

  }

  RegistroMercantil(Numero, tomo, Pagina, PatenteCom, EscriPermiso){

  }


}

export default personaJuridica;
