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
      do {if(data.referencia=="Juridica"){
      //Paso: 0 ingresamos 
        cy.xpathClk("(//button[contains(., 'Agregar')])[1]")
        cy.xpathClk("(//button[contains(., 'JURIDICO')])[1]")
      //formulario persona Juridica
        this.AggRefJuridica(
      // Paso #1
      data.RTNRef,
      // Paso #2
      data.TipoRef, data.PorcentajeRef, 
      // Paso #3
      data.NombreRef, data.PaisOrRef, 
      // Paso #4
      data.CedulaRef, data.PasaporteRef, data.UbcPaisRef, data.Ubc2Ref, data.FechaRef, data.PrimerNombreRef, 
      data.SegundoNombreRef, data.OtroNombreREF, data.PrimerApellidoREF, data.SegundoApellidoREF, data.GeneroRef
      )
      //indicara "El último elemento de cada rama debe ser una persona natural" damos click en aceptar
      cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")       
      //Ingresamos al submenu
      cy.xpathClk("//mat-icon[text()='add']")


      // data.TipoRef.lenght?
      // data.TipoRefJ.size?
      // totalRefJuridico = 
      // totalReferencias = 


      //mientras la ultima no sea juridica no continuara el flujo
        do {if(data.referencia=="Juridica"){
        cy.xpathClk("(//button[contains(., 'JURIDICO')])[1]")
        this.AggRefJuridica(
      // Paso #1
      data.RTNRef,
      // Paso #2
      data.TipoRef, data.PorcentajeRef, 
      // Paso #3
      data.NombreRef, data.PaisOrRef, 
      // Paso #4
      data.CedulaRef, data.PasaporteRef, data.UbcPaisRef, data.Ubc2Ref, data.FechaRef, data.PrimerNombreRef, 
      data.SegundoNombreRef, data.OtroNombreREF, data.PrimerApellidoREF, data.SegundoApellidoREF, data.GeneroRef
        )      
        }else if(data.referencia =="Natural"){
        cy.xpathClk("(//button[contains(., 'NATURAL')])[1]")
          this.AggRefNatural(
    // Paso #1
      data.CedulaRef, data.PasaporteRef, data.PartidaNacRef, data.RTNRef, data.codTRef, data.UbcRef, 
      data.Ubc2Ref, data.FechaRef,    
    // Paso #2
      data.PaisOrRef, data.TipoRef, data.PorcentajeRef,
    // Paso #3
      data.PrimerNombreRef, data.SegundoNombreRef, data.OtroNombreREF, data.PrimerApellidoREF, 
      data.SegundoApellidoREF, data.GeneroRef, data.PaisRecRef, data.RegionRef, data.DepRef, data.MunRef, 
      data.SegundaNacionalidadRef, data.SocialSecurityRef, data.UbiSegNacRef
        )   

        }else{
          cy.log("validar tipo de persona en referencia juridica de la rama")
        }
        totalRefJuridico++
      }while(data.refJuridico  !== totalRefJuridico);
      }else if(data.referencia =="Natural"){
      //Paso: 0 ingresamos 
        cy.xpathClk("(//button[contains(., 'Agregar')])[1]")
        cy.xpathClk("(//button[contains(., 'NATURAL')])[1]")
      //formulario Persona Natural
        this.AggRefNatural(
    // Paso #1
      data.CedulaRef, data.PasaporteRef, data.PartidaNacRef, data.RTNRef, data.codTRef, data.UbcRef, 
      data.Ubc2Ref, data.FechaRef,    
    // Paso #2
      data.PaisOrRef, data.TipoRef, data.PorcentajeRef,
    // Paso #3
      data.PrimerNombreRef, data.SegundoNombreRef, data.OtroNombreREF, data.PrimerApellidoREF, 
      data.SegundoApellidoREF, data.GeneroRef, data.PaisRecRef, data.RegionRef, data.DepRef, data.MunRef, 
      data.SegundaNacionalidadRef, data.SocialSecurityRef, data.UbiSegNacRef
      )   

      }else{
        cy.log("se terminaron")
      }
        totalReferencias++
      } while (data.referencias !== totalReferencias);

      



    //Boton siguiente Paso #3
   cy.xpathClk("(//button[contains(., 'Siguiente')])[3]");
  }

  AggRefJuridica(RTNRef, TipoRef, PorcentajeRef, NombreRef, PaisOrRef, CedulaRef, PasaporteRef, UbcPaisRef, 
    Ubc2Ref, FechaRef, PrimerNombreRef, SegundoNombreRef, OtroNombreREF, PrimerApellidoREF, 
    SegundoApellidoREF, GeneroRef ){
    //Paso: 1 Identificacion 
    cy.xpathBtxt(RTNRef, "(//mat-label[contains(text(), 'REGISTRO TRIBUTARIO')]/ancestor::mat-form-field//input)[2]")
    //Paso: 2 Información Complementaria 
    cy.xpathBtxt(TipoRef, "(//mat-label[contains(text(), 'Tipo')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(PorcentajeRef, "//mat-label[normalize-space()='% de Participación']/ancestor::mat-form-field//input")
    //Paso: 3 Datos Generales Persona Juridica 
    cy.xpathBtxt(NombreRef, "(//mat-label[normalize-space()='Nombre']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PaisOrRef, "(//mat-label[contains(text(), 'País de Origen')]/ancestor::mat-form-field//input)[2]")
    //Paso: 4 Representante Legal
    cy.xpathBtxt(CedulaRef, "(//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PasaporteRef, "(//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(UbcPaisRef, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]")
    //creo que no es necesario
    //cy.xpathBtxt(Ubc2Ref, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[3]")
    cy.IngresoFecha(FechaRef, "(//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button)[1]")
    cy.xpathBtxt(PrimerApellidoREF, "(//mat-label[contains(text(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SegundoApellidoREF, "(//mat-label[contains(text(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PrimerNombreRef, "(//mat-label[contains(text(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SegundoNombreRef, "(//mat-label[contains(text(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(OtroNombreREF, "(//mat-label[contains(text(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")  
    cy.xpathBtxt(GeneroRef, "(//mat-radio-button[contains(., '"+GeneroRef+"')])[1]")
    //Paso: 5 Agregar 
    cy.xpathClk("(//button[contains(., 'Agregar')])[2]") 
    //se debede agregar un natural luego de un juridico  
    
    

  }

  AggRefNatural(CedulaRef, PasaporteRef, PartidaNacRef, RTNRef, codTRef, 
    UbcPaisRef, Ubc2Ref, FechaRef, PaisOrRef, TipoRef, PorcentajeRef,
    PrimerNombreRef, SegundoNombreRef, OtroNombreREF, PrimerApellidoREF, 
    SegundoApellidoREF, GeneroRef, PaisRecRef, RegionRef, DepRef, MunRef, 
    SegundaNacionalidadRef, SocialSecurityRef, UbiSegNacRef){
    //Paso: 1 Identificacion 
    cy.xpathBtxt(CedulaRef, "(//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PasaporteRef, "(//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PartidaNacRef, "//mat-label[contains(text(), 'PARTIDA DE NACIMIENTO')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(RTNRef, "(//mat-label[contains(text(), 'REGISTRO TRIBUTARIO')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(codTRef, "//mat-label[contains(text(), 'CODIGO TRIBUTARIO')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(UbcPaisRef, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(Ubc2Ref, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[3]")
    cy.IngresoFecha(FechaRef, "(//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button)[1]")
    cy.xpathClk("(//button[contains(., 'Siguiente paso')])[1]")
    //Paso: 2 Información Complementaria
    cy.xpathBtxt(PaisOrRef, "(//mat-label[contains(text(), 'País de Origen')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(TipoRef, "(//mat-label[contains(text(), 'Tipo')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(PorcentajeRef, "//mat-label[normalize-space()='% de Participación']/ancestor::mat-form-field//input")
    cy.xpathClk("(//button[contains(., 'Siguiente paso')])[2]")
    //Paso: 3 Datos Generales Persona natural  
    cy.xpathBtxt(PrimerApellidoREF, "(//mat-label[contains(text(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SegundoApellidoREF, "(//mat-label[contains(text(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(PrimerNombreRef, "(//mat-label[contains(text(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SegundoNombreRef, "(//mat-label[contains(text(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(OtroNombreREF, "(//mat-label[contains(text(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")  
    cy.xpathBtxt(GeneroRef, "(//mat-radio-button[contains(., '"+GeneroRef+"')])[1]")
    cy.xpathBtxtClear(PaisRecRef, "(//mat-label[contains(text(), 'País de Residencia')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(RegionRef, "(//mat-label[contains(text(), 'Región')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(DepRef, "(//mat-label[contains(text(), 'Departamento')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(MunRef, "(//mat-label[contains(text(), 'Municipio')]/ancestor::mat-form-field//input)[1]")
    if (SegundaNacionalidadRef !== null && SegundaNacionalidadRef !== undefined 
      && SegundaNacionalidadRef.replace(/\s+/g, '') !== "" &&  SegundaNacionalidadRef.toLowerCase() !== "estadounidense") {
    // entra solo si tiene un valor distinto de null, undefined y vacío y no es estadounidese
    cy.xpathBtxt(SegundaNacionalidadRef, "(//mat-label[contains(text(), '2da. Nacionalidad')]/ancestor::mat-form-field//input)[1]")
    }else if (SegundaNacionalidadRef.replace(/\s+/g, '') !== null && SegundaNacionalidadRef !== undefined 
      && SegundaNacionalidadRef !== "" &&  SegundaNacionalidadRef.toLowerCase() == "estadounidense") {
    // entra solo si tiene un valor distinto de null, undefined y vacío y es estadounidense
    cy.xpathBtxt(SegundaNacionalidadRef, "(//mat-label[contains(text(), '2da. Nacionalidad')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(SocialSecurityRef, "(//mat-label[contains(text(), 'Social Security Number')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(UbiSegNacRef, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[4]")
    }else{
      cy.log("No  Tiene 2da. Nacionalidad")
    }
    //Paso: 4 Agregar 
    cy.xpathClk("(//button[contains(., 'Agregar')])[2]")
 
       
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
