require("cypress-xpath");
class personaJuridica {

//### PASO #1
  IngresoDatosPersonaJuridica(){ 
    
    cy.xpathClk('//label[contains(normalize-space(), "Jurídica")]')
  }
  //Identificacion Juridica 
  Identificacion(data){ 
    cy.xpathBtxt(data.RTN, "//mat-label[contains(normalize-space(), 'REGISTRO TRIBUTARIO NACIONAL')]")
    cy.xpathClk("(//button[contains(., 'Siguiente')])[1]")
  }//Identificacion Juridica

  //### FIN PASO #1

  //### PASO #2

  //Datos Generales Persona Juridica 
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
    cy.xpathClk("(//button[contains(., 'Siguiente')])[2]")
  }
  //FIN Datos Generales Persona Juridica

  TipoPersonaJuridica(TPJ, RazonSoc, NombreCom, Siglas, PaisOr, CatNegocio){
    cy.xpathBtxt(TPJ, "(//mat-radio-button[contains(., '"+TPJ+"')])")
    cy.xpathBtxt(RazonSoc, "//mat-label[normalize-space(text())='Razón Social']/ancestor::mat-form-field//input")
    cy.xpathBtxt(NombreCom, "//mat-label[normalize-space(text())='Nombre Comercial']/ancestor::mat-form-field//input")
    cy.xpathBtxt(Siglas, "//mat-label[normalize-space(text())='Siglas']/ancestor::mat-form-field//input")
    cy.xpathBtxtClear(PaisOr, "(//mat-label[normalize-space(text())='País de Origen']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(CatNegocio, "//mat-label[normalize-space(text())='Categoría de Negocio']/ancestor::mat-form-field//input")    
  }

  DatosConstitucionEmpresa(TipSoc, FechaReg, EnFormacion, FechaIniOp){
    cy.xpathBtxt(TipSoc, "//mat-label[normalize-space(text())='Tipo de Sociedad']/ancestor::mat-form-field//input")
    cy.IngresoFecha(FechaReg, "//mat-label[normalize-space()='Fecha de Registro']/ancestor::mat-form-field//button")
    if (EnFormacion == true)
      {
        cy.xpathBtxt(EnFormacion, "//label[normalize-space(.)='En Formación']/preceding-sibling::input[@type='checkbox']")
      }else{
        cy.log("En formacion no esta selecciona")
      }
    
    
    cy.IngresoFecha(FechaIniOp, "//mat-label[normalize-space(.)='Fecha de Inicio de Operaciones']/ancestor::mat-form-field//button[@aria-label='Open calendar']")
   
  }

  RegistroMercantil(Numero, tomo, Pagina, PatenteCom, EscriPermiso){
    cy.xpathBtxt(Numero, "(//mat-label[normalize-space(.)='Número']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(tomo, "//mat-label[normalize-space(.)='Tomo']/ancestor::mat-form-field//input")
    cy.xpathBtxt(Pagina, "//mat-label[normalize-space(.)='Página']/ancestor::mat-form-field//input")
    cy.xpathBtxt(PatenteCom, "//mat-label[normalize-space(.)='Patente de Comercio']/ancestor::mat-form-field//input")
    cy.xpathBtxt(EscriPermiso, "//mat-label[normalize-space(.)='No. Escritura/Permiso Oper.']/ancestor::mat-form-field//input")       
  }
  //### FIN PASO #2

  //### PASO #3
  CapturaDeAccionistas(data){

    this.AggRefJuridica(
      // Paso #1
      data.RTNRef,
      // Paso #2
      data.paso2  
    )
    this.AggRefNatural(
      // Paso #1
      data.CedulaRef,
      data.PasaporteRef,
      data.PartidaNacRef,
      data.RTNRef,
      data.codTRef,
      data.UbcRef,
      data.Ubc2Ref,
      data.FechaRef,
      // Paso #2
      data.paso2
    )   
    //Boton siguiente Paso #3
   cy.xpathClk("(//button[contains(., 'Siguiente')])[3]");
  }

  AggRefJuridica(){
    //metodos Aggregar referencia Juridica
  }

  AggRefNatural(){
    //metodos Aggregar referencia Natural
  }
  //### FIN PASO #3

  //### PASO #4
  CapturaJuntaDirectiva(data){

    this.JuntaDirectiva(
      data.AuthPor,
      data.FechaInicioJD,
      data.FechaFinalizaJD,
      data.PaisOrigenJD,
      data.CedulaJD,
      data.UbicacionJD,
      data.FechaJD,
      data.PrimerApellidoJD,
      data.SegundoApellidoJD,
      data.PrimerNombreJD,
      data.SegundoNombreJD,
      data.OtroNombreJD,
      data.CargoJD
    )
    //Boton siguiente Paso #4
   cy.xpathClk("(//button[contains(., 'Siguiente')])[4]");
  }

  JuntaDirectiva(AuthPor, FechaInicioJD, FechaFinalizaJD, PaisOrigenJD, CedulaJD, UbicacionJD, FechaJD, PrimerApellidoJD, SegundoApellidoJD, PrimerNombreJD, SegundoNombreJD, OtroNombreJD, CargoJD){
    cy.xpathBtxt(AuthPor, "//mat-label[normalize-space(.)='Autorizado por']/ancestor::mat-form-field//input")
    cy.IngresoFecha(FechaInicioJD, "//mat-label[normalize-space()='Fecha Inicio']/ancestor::mat-form-field//button")
    cy.IngresoFecha(FechaFinalizaJD, "//mat-label[normalize-space()='Fecha Finaliza']/ancestor::mat-form-field//button")
    cy.xpathBtxt(PaisOrigenJD, "(//mat-label[normalize-space(.)='País de Origen']/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(CedulaJD, "(//mat-label[contains(normalize-space(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    //cy.xpathBtxt(UbicacionJD, "")
    cy.IngresoFecha(FechaJD, "(//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button)[1]")
    cy.xpathBtxt(PrimerApellidoJD, "(//mat-label[contains(normalize-space(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SegundoApellidoJD, "(//mat-label[contains(normalize-space(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PrimerNombreJD, "(//mat-label[contains(normalize-space(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SegundoNombreJD, "(//mat-label[contains(normalize-space(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(OtroNombreJD, "(//mat-label[contains(normalize-space(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(CargoJD, "(//mat-label[contains(normalize-space(), 'Cargo')]/ancestor::mat-form-field//input)[1]")  
  }
    //### FIN PASO #4

    //### PASO #5
    RepresentanteLegal(data){
      this.DatosGeneralesRL(
      data.GeneroRL,
      data.CedulaRL,
      data.PasaporteRL,
      data.sexo,
      data.FechaInicioJD,
      data.FechaInicioJD,
      data.FechaInicioJD,
      data.FechaInicioJD,
      data.FechaFinalizaJD
      )




    }
    DatosGeneralesRL(GeneroRL,){
      
    }
    DireccionRL(){
      
    }
    ContactoRL(){
      
    }


    //### FIN PASO #5

}

export default personaJuridica;
