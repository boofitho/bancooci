require("cypress-xpath");
class personaJuridica {

//### PASO #1
  //Identificacion Juridica 
  Identificacion(data){ 
    cy.xpathClk('//label[contains(normalize-space(), "Jurídica")]')
    cy.xpathBtxt(data.RTN, "//mat-label[contains(normalize-space(), 'REGISTRO TRIBUTARIO NACIONAL')]/ancestor::mat-form-field//input") // puede avanzar sin necesidad de los otros campos
    cy.xpathBtxt(data.NRT, "//mat-label[contains(normalize-space(), 'NUEVO REGISTRO TRIBUTARIO')]/ancestor::mat-form-field//input") // validar por que si se ingresa solicita fecha obligado
    cy.IngresoFecha(data.FechaExp, "//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button") //se peude ingresar sin necesidad de NRT

    cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Identificacion')]]//button[.//span[normalize-space()='Siguiente']]")
      }
  //FIN Identificacion Juridica
  //### FIN PASO #1

  //### PASO #2
  //Datos Generales Persona Juridica 
  DatosGeneralesPersonaJuridica(data){
    // cy.wait(1500)
    // cy.get('body').then($body => {
    // if ($body.find('h2#swal2-title:contains("Identificación vinculada con el cliente")').length > 0) {
    //   cy.get('.swal2-cancel', { timeout: 10000 })
    //     .should('be.visible')
    //     .click({ force: true })
    //   }
    // })

    this.TipoPersonaJuridica(data)
    this.DatosConstitucionEmpresa(data)
    this.RegistroMercantil(data)

    cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Datos Generales Persona juridica')]]//button[.//span[normalize-space()='Siguiente']]")
  }//FIN Datos Generales Persona Juridica
  TipoPersonaJuridica(data){
    
    //cy.xpathClk("(//input[@value='"+data.TPJ+"'])[1]") //validar este por que no ingresamos nada
    cy.xpath("//app-general-data-juridical-person//input[@value='" + data.TPJ + "']", { timeout: 60000 })
      .click({ force: true })

    cy.xpathBtxt(data.RazonSoc, "//app-general-data-juridical-person//mat-label[normalize-space(text())='Razón Social']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.NombreCom, "//app-general-data-juridical-person//mat-label[normalize-space(text())='Nombre Comercial']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.Siglas, "//app-general-data-juridical-person//mat-label[normalize-space(text())='Siglas']/ancestor::mat-form-field//input")
    cy.xpathBtxtClear(data.PaisOr, "//app-general-data-juridical-person//mat-label[normalize-space(text())='País de Origen']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.CatNegocio, "//app-general-data-juridical-person//mat-label[normalize-space(text())='Categoría de Negocio']/ancestor::mat-form-field//input")    
  }
  DatosConstitucionEmpresa(data){
    

    cy.xpathBtxt(data.TipSoc, "//app-general-data-juridical-person//mat-label[normalize-space(text())='Tipo de Sociedad']/ancestor::mat-form-field//input")
    cy.IngresoFecha(data.FechaReg, "//app-general-data-juridical-person//mat-label[normalize-space()='Fecha de Registro']/ancestor::mat-form-field//button")
    if (data.EnFormacion == true)
      {
        cy.xpathBtxt(data.EnFormacion, "//app-general-data-juridical-person//label[normalize-space(.)='En Formación']/ancestor::mat-checkbox//input[@type='checkbox']")
      }else{
        cy.log("En formacion no esta selecciona")
      }
    cy.IngresoFecha(data.FechaIniOp, "//app-general-data-juridical-person//mat-label[normalize-space(.)='Fecha de Inicio de Operaciones']/ancestor::mat-form-field//button[@aria-label='Open calendar']")  
  }
  RegistroMercantil(data){
    cy.xpathBtxt(data.Numero, "//app-general-data-juridical-person//mat-label[normalize-space(.)='Número']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.tomo, "//app-general-data-juridical-person//mat-label[normalize-space(.)='Tomo']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.Pagina, "//app-general-data-juridical-person//mat-label[normalize-space(.)='Página']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.PatenteCom, "//app-general-data-juridical-person//mat-label[normalize-space(.)='Patente de Comercio']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.EscriPermiso, "//app-general-data-juridical-person//mat-label[normalize-space(.)='No. Escritura/Permiso Oper.']/ancestor::mat-form-field//input")       
  }
  //### FIN PASO #2

  //### PASO #3
  AggRefJuridica(dataID,dataIC,dataDGP,dataRL){
    //Paso: 0 ingresamos 
    cy.xpathClk("//button[contains(., 'JURIDICO')]")
    //Paso: 1 Identificacion 
    cy.xpathBtxt(dataID.RTNRef, "//app-shareholder-references//mat-label[normalize-space()='REGISTRO TRIBUTARIO NACIONAL']/ancestor::mat-form-field//input")

    cy.xpathBtxt(dataID.NRTRef, "//app-shareholder-references//mat-label[normalize-space()='NUEVO REGISTRO TRIBUTARIO']/ancestor::mat-form-field//input")
    cy.IngresoFecha(dataID.FechaExpNRT, "//app-shareholder-references//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button")
    
    cy.xpathClkWOF("(//app-shareholder-references//button[span[contains(text(), 'Siguiente paso accionista')]])[1]")
    
    //Paso: 2 Información Complementaria 
    cy.xpathBtxt(dataIC.TipoRef, "//app-shareholder-references//mat-label[contains(text(), 'Tipo')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataIC.PorcentajeRef, "//app-shareholder-references//mat-label[normalize-space()='% de Participación']/ancestor::mat-form-field//input")
    
    cy.xpathClkWOF("(//app-shareholder-references//button[span[contains(text(), 'Siguiente paso accionista')]])[2]")
    
    //Paso: 3 Datos Generales Persona Juridica 
    cy.xpathBtxt(dataDGP.NombreRef, "(//app-shareholder-references//mat-label[normalize-space()='Nombre']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(dataDGP.PaisOrRef, "(//app-shareholder-references//mat-label[contains(text(), 'País de Origen')]/ancestor::mat-form-field//input)[1]")
    cy.xpathClkWOF("(//app-shareholder-references//button[span[contains(text(), 'Siguiente paso accionista')]])[3]")
    //Paso: 4 Representante Legal
    // cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[3]')
    //   .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    
    cy.xpathBtxt(dataRL.CedulaRef, "//app-shareholder-references//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataRL.UbiCedula, "//app-shareholder-references//td[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input")
    cy.IngresoFecha(dataRL.FechaExpCedula, "//app-shareholder-references//tr[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button")
    cy.xpathBtxt(dataRL.PasaporteRef, "//app-shareholder-references//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataRL.UbiPasaporte, "//app-shareholder-references//td[.//mat-label[contains(text(), 'PASAPORTE')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataRL.PrimerApellidoREF, "//app-shareholder-references//mat-label[contains(text(), 'Primer Apellido')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataRL.SegundoApellidoREF, "//app-shareholder-references//mat-label[contains(text(), 'Segundo Apellido')]/ancestor::mat-form-field//input")   
    cy.xpathBtxt(dataRL.PrimerNombreRef, "//app-shareholder-references//mat-label[contains(text(), 'Primer Nombre')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataRL.SegundoNombreRef, "//app-shareholder-references//mat-label[contains(text(), 'Segundo Nombre')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataRL.OtroNombreREF, "//app-shareholder-references//mat-label[contains(text(), 'Otros Nombres')]/ancestor::mat-form-field//input")  
    cy.xpath("//app-shareholder-references//input[@value='"+dataRL.GeneroRef.toUpperCase()+"']", {timeout: 60000}).click({force: true})    
    cy.xpathClkWOF("(//app-shareholder-references//button[span[contains(text(), 'Siguiente paso accionista')]])[4]")
    // cy.wait(1500)
    //Paso: 5 Agregar 
    cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Captura de accionistas')]]//button[.//span[normalize-space()='Agregar']])[2]") 
    //se debede agregar un natural luego de un juridico  
  }
  AggRefNatural(dataID,dataIC,dataDGP){
    //Paso: 0 ingresamos 
    cy.xpathClk("//button[contains(., 'NATURAL')]")
    //Paso: 1 Identificacion 
    cy.xpathBtxt(dataID.CedulaRef, "//app-shareholder-references//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataID.UbiCedula, "//app-shareholder-references//td[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input")
    cy.IngresoFecha(dataID.FechaExpCedula, "//app-shareholder-references//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button")


    cy.xpathBtxt(dataID.PasaporteRef, "//app-shareholder-references//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataID.UbiPasaporte, "//app-shareholder-references//td[.//mat-label[contains(text(), 'PASAPORTE')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input")
    
    cy.xpathBtxt(dataID.PartidaNacRef, "//app-shareholder-references//mat-label[contains(text(), 'PARTIDA DE NACIMIENTO')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataID.UbiPartidaNac, "//app-shareholder-references//td[.//mat-label[contains(text(), 'PARTIDA DE NACIMIENTO')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input")

    cy.xpathBtxt(dataID.licenciaConducir, "//app-shareholder-references//mat-label[contains(text(), 'LICENCIA DE CONDUCIR')]/ancestor::mat-form-field//input")

    cy.xpathBtxt(dataID.RTNRef, "//app-shareholder-references//mat-label[contains(text(), 'REGISTRO TRIBUTARIO')]/ancestor::mat-form-field//input")

    cy.xpathClkWOF("(//app-shareholder-references//button[span[contains(text(), 'Siguiente paso accionista')]])[1]")

    //Paso: 2 Información Complementaria
    cy.xpathBtxtClear(dataIC.PaisOrRef, "//app-shareholder-complementary-info//mat-label[contains(text(), 'País de Origen')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataIC.TipoRef, "//app-shareholder-references//mat-label[contains(text(), 'Tipo')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataIC.PorcentajeRef, "//app-shareholder-references//mat-label[normalize-space()='% de Participación']/ancestor::mat-form-field//input")
    
    cy.xpathClkWOF("(//app-shareholder-references//button[span[contains(text(), 'Siguiente paso accionista')]])[2]")

    // cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[3]')
    //   .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })   
    const PaisOrigen = dataIC.PaisOrRef?.trim().toLowerCase();

if(PaisOrigen === "estados unidos de america"){
  
} else if(PaisOrigen !== "honduras" ){

}else{


    //Paso: 3.1 Datos Generales Persona natural 
    cy.xpathBtxt(dataDGP.PrimerApellidoREF, "//app-shareholder-references//mat-label[contains(text(), 'Primer Apellido')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataDGP.SegundoApellidoREF, "//app-shareholder-references//mat-label[contains(text(), 'Segundo Apellido')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataDGP.PrimerNombreRef, "//app-shareholder-references//mat-label[contains(text(), 'Primer Nombre')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataDGP.SegundoNombreRef, "//app-shareholder-references//mat-label[contains(text(), 'Segundo Nombre')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataDGP.OtroNombreREF, "//app-shareholder-references//mat-label[contains(text(), 'Otros Nombres')]/ancestor::mat-form-field//input")  
    cy.xpath("//app-shareholder-references//input[@value='"+dataDGP.GeneroRef.toUpperCase()+"']", {timeout: 60000}).click({force: true})    

    //Paso: 3.2 Nacionalidad y Residencia
    cy.xpathBtxtClear(dataDGP.PaisResidencia, "//app-shareholder-references//mat-label[contains(text(), 'País de Residencia')]/ancestor::mat-form-field//input")




    cy.xpathBtxt(dataDGP.RegionRef, "//app-shareholder-references//mat-label[contains(text(), 'Región')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataDGP.DepRef, "//app-shareholder-references//mat-label[contains(text(), 'Departamento')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataDGP.MunRef, "//app-shareholder-references//mat-label[contains(text(), 'Municipio')]/ancestor::mat-form-field//input")

    const segNac = dataDGP.SegundaNacionalidadRef?.trim().toLowerCase();

    if (dataDGP.PaisResidencia === "HONDURAS") {  
        cy.log("el cliente es hondureño 🤨🫡")
      }else{
      if (dataDGP.PaisResidencia === "ESTADOS UNIDOS DE AMERICA") {
        
        cy.xpathBtxt(dataDGP.SocialSecurityRef, "//app-shareholder-references//mat-label[contains(text(), 'Social Security Number')]/ancestor::mat-form-field//input");
        cy.xpathBtxt(dataDGP.UbiSegNacRef, "//app-shareholder-references//tr[.//mat-label[contains(text(), 'Social Security Number')]]//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input");

      } else if (dataDGP.PaisResidencia !== "HONDURAS") {
      
          cy.xpathBtxt(dataDGP.CedulaIdentidad2da, "(//app-shareholder-references//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[2]");
          cy.xpathBtxt(dataDGP.UbiCedula2da, "(//app-shareholder-references//td[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]");
          cy.IngresoFecha(dataID.FechaCedula2da, "(//app-shareholder-references//tr[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button)[2]")

          cy.xpathBtxt(dataDGP.Pasaporte2da, "(//app-shareholder-references//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input)[2]");
          cy.xpathBtxt(dataDGP.UbiPasaporte2da, "(//app-shareholder-references//td[.//mat-label[contains(text(), 'PASAPORTE')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]");         

      } else {
        // 🟢 Es hondureña → no hace nada
        cy.log("el cliente es hondureño")
      }
    }


    if (segNac && segNac !== "estadounidense") {
        cy.log("👽🎅🧛‍♀️ Tiene segunda nacionalidad!")

        // valor distinto de null, undefined, vacío y no es estadounidense
        cy.xpathBtxt(dataDGP.SegundaNacionalidadRef, "//app-shareholder-references//mat-label[contains(text(), '2da. Nacionalidad')]/ancestor::mat-form-field//input");

        if (segNac !== "estadounidense") {              
          cy.log("🗽🍟🍔🌭 el cliente no es "+ segNac)

          cy.xpathBtxt(dataDGP.CedulaIdentidad2da, "(//app-shareholder-references//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[2]");
          cy.xpathBtxt(dataDGP.UbiCedula2da, "(//app-shareholder-references//td[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]");
          cy.IngresoFecha(dataID.FechaCedula2da, "(//app-shareholder-references//tr[.//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]]//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button)[2]")

          cy.xpathBtxt(dataDGP.Pasaporte2da, "(//app-shareholder-references//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input)[2]");
          cy.xpathBtxt(dataDGP.UbiPasaporte2da, "(//app-shareholder-references//td[.//mat-label[contains(text(), 'PASAPORTE')]]/following-sibling::td//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]");
          
// 	
        }else{
          cy.log("🗽🍟🍔🌭 el cliente es estadounidense")
        }

      } else if (segNac === "estadounidense") {
        // es estadounidense
        cy.xpathBtxt(dataDGP.SegundaNacionalidadRef, "//app-shareholder-references//mat-label[contains(text(), '2da. Nacionalidad')]/ancestor::mat-form-field//input");
        cy.xpathBtxt(dataDGP.SocialSecurityRef, "//app-shareholder-references//mat-label[contains(text(), 'Social Security Number')]/ancestor::mat-form-field//input");
        cy.xpathBtxt(dataDGP.UbiSegNacRef, "//app-shareholder-references//tr[.//mat-label[contains(text(), 'Social Security Number')]]//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input");
    } else {
        cy.log("No tiene 2da. Nacionalidad");
    }

}
    cy.xpathClkWOF("(//button[contains(., 'Siguiente paso')])[3]")
    cy.wait(1500)
    //Paso: 4 Agregar 
    cy.xpathClkWOF("(//button[contains(., 'Agregar')])[2]")
  }
  //### FIN PASO #3

  //### PASO #4
  CapturaJuntaDirectiva(data){
    
    this.JuntaDirectiva(data)
    //validar primero que no existan mas para agregar o validar que si ingrfese todoas antes del siguietne 
  }
  JuntaDirectiva(data){

    cy.xpathBtxt(data.AuthPor, "//mat-label[normalize-space(.)='Autorizado por']/ancestor::mat-form-field//input")
    cy.IngresoFecha(data.FechaInicioJD, "//mat-label[normalize-space()='Fecha Inicio']/ancestor::mat-form-field//button")
    cy.IngresoFecha(data.FechaFinalizaJD, "//mat-label[normalize-space()='Fecha Finaliza']/ancestor::mat-form-field//button")
    cy.xpathBtxtClear(data.PaisOrigenJD, "(//mat-label[normalize-space(.)='País de Origen']/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(data.PrimerApellidoJD, "(//mat-label[contains(normalize-space(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.SegundoApellidoJD, "(//mat-label[contains(normalize-space(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.PrimerNombreJD, "(//mat-label[contains(normalize-space(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.SegundoNombreJD, "(//mat-label[contains(normalize-space(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.OtroNombreJD, "(//mat-label[contains(normalize-space(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.CargoJD, "(//mat-label[contains(normalize-space(), 'Cargo')]/ancestor::mat-form-field//input)[1]")  
    cy.xpathBtxt(data.CedulaJD, "(//mat-label[contains(normalize-space(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    cy.IngresoFecha(data.FechaJD, "(//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button)[2]")
    
    //boton agregar 
    cy.xpathClk("(//button[contains(., 'Agregar')])[2]")
  }
  //### FIN PASO #4

  //### PASO #5
  RepresentanteLegal(dataDGRL, dataDRL){

    this.DatosGeneralesRL(dataDGRL)
      this.DireccionRL(dataDRL)

    }
  DatosGeneralesRL(data){

      cy.xpath("//input[@type='radio' and @value='"+data.GeneroRL+"']").click({force: true})
      cy.xpathBtxt(data.CedulaRL, "(//mat-label[contains(normalize-space(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.PasaporteRL, "(//mat-label[contains(normalize-space(), 'PASAPORTE')]/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.ubicacionRL, "(//mat-label[contains(normalize-space(), 'Ubicación')]/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.UbicacionPaisRL, "(//mat-label[contains(normalize-space(), 'Ubicación')]/ancestor::mat-form-field//input)[3]")
      cy.IngresoFecha(data.FechaExpRL, "(//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button)[3]")
      cy.xpathBtxt(data.priApellidoRL, "(//mat-label[contains(normalize-space(), 'Primer Apellido')]/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.segApellidoRL, "(//mat-label[contains(normalize-space(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.priNombreRL, "(//mat-label[contains(normalize-space(), 'Primer Nombre')]/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.segNombreRL, "(//mat-label[contains(normalize-space(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.OtroNombreRL, "(//mat-label[contains(normalize-space(), 'Otros Nombres')]/ancestor::mat-form-field//input)[2]")
      cy.IngresoFecha(data.fechaNombramiento, "//mat-label[normalize-space()='Fecha Nombramiento']/ancestor::mat-form-field//button")
      cy.IngresoFecha(data.fechaExpNombramiento, "//mat-label[normalize-space()='Fecha de Vencimiento Nombramiento']/ancestor::mat-form-field//button")
      cy.xpathBtxtClear(data.NacionalidadRL, "(//mat-label[contains(normalize-space(), 'Nacionalidad')]/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.ProfesiónRL, "//mat-label[contains(normalize-space(), 'Profesión')]/ancestor::mat-form-field//input")

      cy.xpathClkWOF("(//button[contains(., 'Siguiente paso representante')])[1]")
        
  }
  DireccionRL(data){
    //   cy.oculto()
    // cy.get('mat-step-header')
    //   .should('contain.text', 'Representante Legal')
    //   .invoke('attr', 'style', 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);');

    
    cy.xpathBtxtClear(data.paisRL, "(//mat-label[normalize-space(.)='País']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.aniosRL, "(//mat-label[normalize-space(.)='Años de residir']/ancestor::mat-form-field//input)[1]")
     
      // cy.get('mat-step-header')
      // .should('contain.text', 'Representante Legal')
      // .invoke('attr', 'style', 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);');

      cy.xpath("(//mat-label[normalize-space(.)='Ingrese una ubicación']/ancestor::mat-form-field//input)[1]", {timeout: 6000})
        .filter(":visible:not([disabled])")
        .first()
        .click({force: true})
        .clear()
        .type(data.ubicacionRL)
        cy.oculto()
      
      cy.xpathClk(`(//mat-option//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÜÑ', 'abcdefghijklmnopqrstuvwxyzáéíóúüñ'),'${data.ubicacionRL.toLowerCase()}')])[1]`);
      cy.xpathBtxtClear(data.agenciaCercanaRL, "(//mat-label[normalize-space(.)='Agencia más cercana']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.infDireccionRL, "(//mat-label[normalize-space(.)='Información Dirección']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.especRL, "(//mat-label[normalize-space(.)='Especificaciones']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.dirRefBusqRL, "(//mat-label[normalize-space(.)='Dirección referencia busqueda']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.latitudRL, "(//mat-label[normalize-space(.)='Latitud']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.longitudRL, "(//mat-label[normalize-space(.)='Longitud']/ancestor::mat-form-field//input)[1]")
    
      cy.xpath('//app-legal-representative//h4[text()="Coordenadas"]')
        .scrollIntoView({ easing: 'linear', duration: 500 })

      cy.xpath("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Representante Legal')]]//button[.//span[normalize-space()='Siguiente paso representante']])[2]")
        .scrollIntoView().click({force: true})

  }
  correoRL(data){
      //ingreso de correo
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoCorreo+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxt(data.correo, "(//mat-label[normalize-space(.)='Correo']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//button[contains(., 'Agregar')])[3]")
      //fin ingrerso correo
  }
  celularRL(data){
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Teléfono']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoTelefono+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxtClear(data.telefono, "(//mat-label[normalize-space(.)='Teléfono']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//mat-label[normalize-space() = 'Ubicación']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      if (!data.Ubicacion || data.Ubicacion === "undefined") {
        // Caso 1: no tiene valor o viene como "undefined"
        cy.xpathClk("//mat-option//span[contains(normalize-space(.), '--')]")
      } else {
        // Caso 2: tiene un valor válido
        cy.xpathClk(`//mat-option//span[contains(normalize-space(.), '${data.Ubicacion}')]`)
      }

                   
      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Representante Legal')]]//button[.//span[normalize-space()='Agregar']])[2]")
  }
  //### FIN PASO #5

  //### PASO #6
    InfGenFin(data){

    cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[17]')
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

      if (!data.AfectoISR){cy.xpathClk("(//*[normalize-space() = 'Afecto a ISR']/preceding::input[@type='checkbox'])[2]")}else{cy.log("Afecto a ISR false"+ data.AfectoISR)}  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathBtxt(data.ActEconomica, "(//mat-label[normalize-space(.)='Actividad Económica']/ancestor::mat-form-field//input)[1]")
      cy.IngresoFecha(data.fechaActEc, "(//mat-label[normalize-space(.)='Fecha actividad económica']/ancestor::mat-form-field//mat-datepicker-toggle//button)[1]")
      cy.xpathBtxt(data.SecEconomica, "(//mat-label[normalize-space(.)='Sector Económico']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.ClaseCliente, "(//mat-label[normalize-space(.)='Clase de Cliente']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Institucion, "(//mat-label[normalize-space(.)='Institución']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk(`(//mat-option//span[contains(normalize-space(.), '${data.Institucion}')])[1]`)

    
    }
    monedaPE(data){       

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[17]')
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

      cy.xpathBtxt(data.Observaciones ,"(//div[@class='angular-editor-textarea' and @contenteditable='true'])[1]")
      cy.xpathBtxt(data.Moneda ,"(//mat-label[normalize-space(.)='Moneda']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.montoAprxTotalActivo ,"(//mat-label[normalize-space(.)='Monto Aproximado de Total de Activo']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.nivelVentasAnual ,"(//mat-label[normalize-space(.)='Nivel de Ventas Anuales']/ancestor::mat-form-field//input)[1]")
      
      //no es necesario por que con el enter que da arriba en el comando lo agrega 
      //cy.xpathClk("(//button[contains(., 'Agregar')])[6]")
      // fin lectura de archivo 
    }
    InfOpera(data){       
      
      cy.xpathBtxt(data.Pais ,"(//mat-label[normalize-space(.)='País']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Region ,"(//mat-label[normalize-space(.)='Región']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Departamento ,"(//mat-label[normalize-space(.)='Departamento']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Municipio ,"(//mat-label[normalize-space(.)='Municipio']/ancestor::mat-form-field//input)[1]")
      //luego de llenar los campos procede a precionar el boton agregar       
      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Perfil Economico')]]//button[.//span[normalize-space()='Agregar']])[2]")
    }
    Relaciones(data){       

      cy.xpathBtxt(data.relGrupoEcono ,"(//mat-label[normalize-space(.)='Relación con Grupo Económico']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.relGrupFinan ,"(//mat-label[normalize-space(.)='Relación con Grupo Financiero']/ancestor::mat-form-field//input)[1]")

      cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Perfil Economico')]]//button[.//span[normalize-space()='Siguiente']])[3]")
    }
    PrincProvee(data){       

      cy.xpathBtxt(data.Proveedor ,"(//mat-label[normalize-space(.)='Proveedor']/ancestor::mat-form-field//input)[1]")
      cy.wait(3000)
      cy.oculto()
      cy.xpathClk(`(//mat-option//span[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${data.Proveedor.toLowerCase()}')])[1]`)
      cy.oculto()
      cy.wait(420)
      cy.oculto()
      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Perfil Economico')]]//button[.//span[normalize-space()='Agregar']])[3]")
    }

    NuevoProvee(data){       

      cy.xpathClk("//button[.//span[text()='Nueva Persona']]")
      cy.xpath("//app-main-suppliers//app-create-supplier//label[normalize-space()='" + data.TipodePersona + "']/preceding::input[@type='radio'][1]", { timeout: 60000 })
      .click({ force: true })
      cy.oculto()

      if(data.TipodePersona=="Natural"){
        						
        cy.xpathBtxt(data.primerApellido,"//mat-form-field[.//mat-label[normalize-space()='Primer Apellido']]//input")
        cy.xpathBtxt(data.segundoApellido,"//mat-form-field[.//mat-label[normalize-space()='Segundo Apellido']]//input")
        cy.xpathBtxt(data.primerNombre,"//mat-form-field[.//mat-label[normalize-space()='Primer Nombre']]//input")
        cy.xpathBtxt(data.segundoNombre,"//mat-form-field[.//mat-label[normalize-space()='Segundo Nombre']]//input")
        cy.xpathBtxt(data.otrosNombres,"//mat-form-field[.//mat-label[normalize-space()='Otros Nombres']]//input")
        cy.xpathBtxt(data.pasaporte,"//mat-form-field[.//mat-label[contains(normalize-space(),'PASAPORTE')]]//input")
        cy.xpathBtxt(data.ubicacionPasaporte,"//app-economic-profile-juridical//app-documents//mat-label[contains(text(), 'PASAPORTE')]/ancestor::td/following-sibling::td[contains(@class, 'cdk-column-location')]//input[@role='combobox']")
        cy.xpathBtxt(data.partidaNacimiento,"//mat-form-field[.//mat-label[contains(normalize-space(),'PARTIDA DE NACIMIENTO')]]//input")
        cy.xpathBtxt(data.ubicacionPartidaNac,"//app-economic-profile-juridical//app-documents//mat-label[contains(text(), 'PARTIDA DE NACIMIENTO')]/ancestor::td/following-sibling::td[contains(@class, 'cdk-column-location')]//input[@role='combobox']")
        cy.xpathBtxt(data.RTN,"//app-economic-profile-juridical//app-documents//mat-form-field[.//mat-label[contains(normalize-space(),'REGISTRO TRIBUTARIO NACIONAL')]]//input")
        cy.xpathBtxt(data.cedulaID,"//mat-form-field[.//mat-label[contains(normalize-space(),'CEDULA DE IDENTIDAD')]]//input")
        cy.xpathBtxt(data.ubicacionCedulaID,"//app-economic-profile-juridical//app-documents//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::td/following-sibling::td[contains(@class, 'cdk-column-location')]//input[@role='combobox']")
        cy.xpath("//app-economic-profile-juridical//app-documents//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button").scrollIntoView()
        cy.IngresoFecha(data.fechaCedulaID,"//app-economic-profile-juridical//app-documents//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button")
        cy.xpathBtxt(data.licenciaConducir,"//mat-form-field[.//mat-label[contains(normalize-space(),'LICENCIA DE CONDUCIR')]]//input")
        //CLICK EN GUARDAR LUEGO DE LLENAR LOS DATOS QUE TENGAMOS
        cy.xpathClk("//button[.//span[normalize-space()='Guardar']]")
        
      }else if(data.TipodePersona=="Jurídica"){

        cy.xpathBtxt(data.RazonSocial,"//mat-form-field[.//mat-label[normalize-space()='Razón Social']]//input")
        cy.xpathBtxt(data.RTN,"//mat-form-field[.//mat-label[normalize-space()='REGISTRO TRIBUTARIO NACIONAL']]//input")
        cy.xpathBtxt(data.NRT,"//mat-form-field[.//mat-label[normalize-space()='NUEVO REGISTRO TRIBUTARIO']]//input")
        cy.IngresoFecha(data.FechaExp,"//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button")
        //CLICK EN GUARDAR LUEGO DE LLENAR LOS DATOS QUE TENGAMOS
        cy.xpathClk("//button[.//span[normalize-space()='Guardar']]")
        
      }else{
        cy.log("no hay clientes pendientes u ocurrio un error")
      }
    }
    //### FIN PASO #6

    //### PASO #7
    Direcciones(data){       

      cy.xpathBtxtClear(data.Pais, "(//mat-label[normalize-space(.)='País']/ancestor::mat-form-field//input)[3]")
      
      cy.xpath("(//mat-label[normalize-space(.)='Ingrese una ubicación']/ancestor::mat-form-field//input)[2]").type(data.IngreseUbicacion)
      cy.oculto()
      cy.wait(420)
      cy.oculto()
      cy.xpath("(//mat-label[normalize-space(.)='Ingrese una ubicación']/ancestor::mat-form-field//input)[2]").type('{enter}');         

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[26]')
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

//      cy.xpathBtxt(data.IngreseUbicacion,"(//mat-label[normalize-space(.)='Ingrese una ubicación']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxtClear(data.agenCercana, "(//mat-label[normalize-space(.)='Agencia más cercana']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxtClear(data.InfoDireccion, "(//mat-label[normalize-space(.)='Información Dirección']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Especificaciones, "(//mat-label[normalize-space(.)='Especificaciones']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxtClear(data.DirRefBusq, "(//mat-label[normalize-space(.)='Dirección referencia busqueda']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Latitud, "(//mat-label[normalize-space(.)='Latitud']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Longitud, "(//mat-label[normalize-space(.)='Longitud']/ancestor::mat-form-field//input)[2]")
      
      cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Dirección')]]//button[.//span[normalize-space()='Siguiente']])[2]")

    }
    //### FIN PASO #7

    //### PASO #8
    Contacto(data){       
      cy.xpathBtxtClear(data.NameContacto, "(//mat-label[normalize-space(.)='Nombre de contacto']/ancestor::mat-form-field//input)[1]")
    }
    correo(data){       

      //ingreso de correo
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select)[2]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoCorreo+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxt(data.correo, "(//mat-label[normalize-space(.)='Correo']/ancestor::mat-form-field//input)[2]")
      
      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Contacto')]]//button[.//span[normalize-space()='Agregar']])[4]")
      //fin ingrerso correo
    }
    celular(data){       

      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Teléfono']/ancestor::mat-form-field//mat-select)[2]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoTelefono+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxtClear(data.telefono, "(//mat-label[normalize-space(.)='Teléfono']/ancestor::mat-form-field//input)[2]")
      cy.xpathClk("(//mat-label[normalize-space() = 'Ubicación']/ancestor::mat-form-field//mat-select)[2]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      if (!data.Ubicacion || data.Ubicacion === "undefined") {
        // Caso 1: no tiene valor o viene como "undefined"
        cy.xpathClk("//mat-option//span[contains(normalize-space(.), '--')]")
      } else {
        // Caso 2: tiene un valor válido
        cy.xpathClk(`//mat-option//span[contains(normalize-space(.), '${data.Ubicacion}')]`)
      }

      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Contacto')]]//button[.//span[normalize-space()='Agregar']])[5]")
    }
    //### FIN PASO #8

    //### PASO #9
    FATCA(data){       

    if (data.a){
      cy.xpathClk("//span[normalize-space(text()) = 'Entidad No Financiera Hondureña Sin Dueños Sustanciales de EE.UU.']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")
        if(data.aClienteRecalcitrante){
          cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
        }else{
          cy.log("FATCA no seleccionado inciso 'a' apartado 'Cliente recalcitrante' = "+ data.aClienteRecalcitrante)
        }
      }else{
      cy.log("FATCA no seleccionado inciso 'a' = "+ data.a)
    }
    if (data.b){
      cy.xpathClk("//span[normalize-space(text()) = 'Entidad No Financiera Hondureña Con Dueños Sustanciales de EE.UU.']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")
        if(data.TipoEntidad){
          cy.xpathClk("//mat-radio-button[.//label[normalize-space(text()) = '"+data.TipoEntidad+"']]//input[@type='radio']")
        }else{
          cy.log("FATCA no seleccionado tipo de entidad del inciso 'b' = "+ data.TipoEntidad)
        }
      }else{
      cy.log("FATCA no seleccionado inciso 'b' = "+ data.b)
    }
    
    cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    cy.wait(420)

    if (data.c){
      cy.xpathClk("//span[normalize-space(text()) = 'Persona Jurídica Constituida en EE.UU.']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")
        if(data.a && data.cClienteRecalcitrante){
          cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
        }else if(!data.a && data.cClienteRecalcitrante){
          cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
        }else{
          cy.log("FATCA no seleccionado inciso c cliente recalcitrante "+ data.cClienteRecalcitrante)
        }        
          cy.xpathBtxt(data.cGIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
          cy.xpathBtxt(data.cUbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")     
        }else{
      cy.log("FATCA no seleccionado inciso"+ data.c)
    }

    cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    cy.wait(420)

    if (data.d){
      cy.xpathClk("//span[normalize-space(text()) = 'Instituciones Financieras, de Seguros y Otros Interes FATCA']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")
        if(data.I){

          cy.xpathClk("//span[normalize-space(text()) = 'Fondos de Pensión']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          if(data.a && data.c && data.IClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
          }else if((data.a || data.c) && data.IClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
          }else if((!data.a && !data.c) && data.IClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
          }else{
            cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.cClienteRecalcitrante)
          }        
          
          cy.xpathBtxt(data.Icedula, "(//app-fatca-indications-juridical//app-documents//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
//        cy.xpathBtxt(data.Iubicacion, "(//app-fatca-indications-juridical//app-documents//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
          cy.IngresoFecha(data.IFecha, "//app-fatca-indications-juridical//app-documents//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button")
          cy.xpathBtxt(data.IRTN, "(//app-fatca-indications-juridical//app-documents//mat-label[contains(text(), 'REGISTRO TRIBUTARIO NACIONAL')]/ancestor::mat-form-field//input)[1]")

          




          // if(data.c){
          //   cy.xpathBtxt(data.IGIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
          //   cy.xpathBtxt(data.IUbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          // }else{
          //   cy.xpathBtxt(data.IGIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
          //   cy.xpathBtxt(data.IUbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")     
          // }



        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'I' = "+ data.I)
        }
        

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)

        if(data.II){
          
          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Considerada Cumplidoras']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)

          if(data.II1){
            cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financiera - Clientes de Base Local']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
            
            const valoresCR = [data.a, data.c, data.I];
            const verdaderos = valoresCR.filter(Boolean).length;
            
            if(verdaderos === 3 && data.II1ClienteRecalcitrante ){
              cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
            }else if((verdaderos === 2) && data.II1ClienteRecalcitrante){
              cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
            }else if((verdaderos === 1) && data.II1ClienteRecalcitrante){
              cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
            }else if((verdaderos === 0) && data.II1ClienteRecalcitrante){
              cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
            }else{
              cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.II1ClienteRecalcitrante)
            }

            const valoresGU = [data.c, data.I];
            const verdaderoGU = valoresGU.filter(Boolean).length;

          if((verdaderoGU === 2)){
            cy.xpathBtxt(data.II1UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II1UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II1UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 1'  "+ data.II1)
          } 

            const valoresGIN = [data.I];
            const verdaderoGIN = valoresGIN.filter(Boolean).length;

          if((verdaderoGIN === 1)){
            cy.xpathBtxt(data.II1GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II1GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
          }else{
            cy.xpathBtxt(data.II1GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 1'  "+ data.II1)
          } 



      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          
          if(data.II2){
            cy.xpathClk("//span[normalize-space(text()) = 'Banco Local']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
            
          const valoresCR = [data.a, data.c, data.I, data.II1];
          const verdaderos = valoresCR.filter(Boolean).length;
            
          if(verdaderos === 4 && data.II2ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[5]")
          }else if((verdaderos === 3) && data.II2ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
          }else if((verdaderos === 2) && data.II2ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
          }else if((verdaderos === 1) && data.II2ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
          }else if((verdaderos === 0) && data.II2ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
          }else{
            cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.II2ClienteRecalcitrante)
          }

            const valoresGU = [data.c, data.I, data.II1];
            const verdaderoGU = valoresGU.filter(Boolean).length;

          if((verdaderoGU === 3)){
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 2'  "+ data.II2)
          } 

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.II3){
            cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financiera - Con Cuentas de Bajo VL.']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
            
          const valoresCR = [data.a, data.c, data.I, data.II1, data.II2];
          const verdaderos = valoresCR.filter(Boolean).length;
            
          if(verdaderos === 5 && data.II3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[6]")
          }else if((verdaderos === 4) && data.II3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[5]")
          }else if((verdaderos === 3) && data.II3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
          }else if((verdaderos === 2) && data.II3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
          }else if((verdaderos === 1) && data.II3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
          }else if((verdaderos === 0) && data.II3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
          }else{
            cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.II3ClienteRecalcitrante)
          }

            const valoresGU = [data.c, data.I, data.II1, data.II2];
            const verdaderoGU = valoresGU.filter(Boolean).length;

          if((verdaderoGU === 4)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
          }else if ((verdaderoGU === 3)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 2'  "+ data.II3)
          } 

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.II4){
            cy.xpathClk("//span[normalize-space(text()) = 'Emisor de Tarjetas de Crédito']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
            
          const valoresCR = [data.a, data.c, data.I, data.II1, data.II2, data.II3];
          const verdaderos = valoresCR.filter(Boolean).length;
            
          if(verdaderos === 6 && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[7]")
          }else if((verdaderos === 5) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[6]")
          }else if((verdaderos === 4) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[5]")
          }else if((verdaderos === 3) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
          }else if((verdaderos === 2) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
          }else if((verdaderos === 1) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
          }else if((verdaderos === 0) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
          }else{
            cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.II4ClienteRecalcitrante)
          }

            const valoresGU = [data.c, data.I, data.II1, data.II2, data.II3];
            const verdaderoGU = valoresGU.filter(Boolean).length;

          if((verdaderoGU === 5)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
          }else if ((verdaderoGU === 4)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
          }else if ((verdaderoGU === 3)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 2'  "+ data.II4)
          } 

        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'I' = "+ data.II)
        }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

        if(data.III){
          
          cy.xpathClk("//span[normalize-space(text()) = 'Ins. de Inversión y Relacionadas']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.III1){
            cy.xpathClk("//span[normalize-space(text()) = 'Fideicomiso']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          }else{
            cy.log("FATCA no seleccionado inciso 'III 1' = "+ data.III1)
          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.III2){
            cy.xpathClk("//span[normalize-space(text()) = 'Fondo Jubilación']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          }else{
            cy.log("FATCA no seleccionado inciso 'III 1' = "+ data.III2)
          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.III3){
            cy.xpathClk("(//span[normalize-space(text()) = 'Otros']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox'])[1]")         
                     
          const valoresCR = [data.a, data.c, data.I, data.II1, data.II2, data.II3, data.II4];
          const verdaderos = valoresCR.filter(Boolean).length;
            
          if(verdaderos === 7 && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[8]")
          }else if((verdaderos === 6) && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[7]")
          }else if((verdaderos === 5) && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[6]")
          }else if((verdaderos === 4) && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[5]")
          }else if((verdaderos === 3) && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
          }else if((verdaderos === 2) && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
          }else if((verdaderos === 1) && data.II4ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
          }else if((verdaderos === 0) && data.III3ClienteRecalcitrante){
            cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
          }else{
            cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.III3ClienteRecalcitrante)
          }

            const valoresGU = [data.c, data.I, data.II1, data.II2, data.II3, data.II4];
            const verdaderoGU = valoresGU.filter(Boolean).length;

          if((verdaderoGU === 6)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[7]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[7]")     
          }else if ((verdaderoGU === 5)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
          }else if ((verdaderoGU === 4)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
          }else if ((verdaderoGU === 3)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        

          }else{
            cy.log("FATCA no seleccionado inciso 'III 1' = "+ data.III3)
          }

        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'III' = "+ data.III)
        }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

        if(data.IV){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Reportan Bajo IGA Modo 1']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'IV' = "+ data.IV)
        }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

        if(data.V){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Reportan Bajo IGA Modo 2']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'V' = "+ data.V)
        }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

        if(data.VI){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Participantes Acuerdo IRS']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'VI' = "+ data.VI)
        }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          
        if(data.VII){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Documentadas por Dueño']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'VII' = "+ data.VII)
        }
        
        if(data.III && data.VIII){

          cy.xpathClk("(//span[normalize-space(text()) = 'Otros']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox'])[2]")         

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.VIII1){
            
            cy.xpathClk("//span[normalize-space(text()) = 'Entidad Gubernamental Hondureña']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          }else{
            
            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 1' = "+ data.VIII1)

          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.VIII2){
            
            cy.xpathClk("//span[normalize-space(text()) = 'Banco Central Emisor']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          }else{
            
            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 2' = "+ data.VIII2)

          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.VIII3){
            
            cy.xpathClk("//span[normalize-space(text()) = 'Organización Internacional']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          }else{
            
            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 3' = "+ data.VIII3)

          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.VIII4){
           
              cy.xpathClk("(//span[normalize-space(text()) = 'Otros']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox'])[3]")         

              const valoresCR = [data.a, data.c, data.I, data.II1, data.II2, data.II3, data.II4, data.III3];
              const verdaderos = valoresCR.filter(Boolean).length;
                
              if(verdaderos === 8 && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[9]")
              }else if((verdaderos === 7) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[8]")
              }else if((verdaderos === 6) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[7]")
              }else if((verdaderos === 5) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[6]")
              }else if((verdaderos === 4) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[5]")
              }else if((verdaderos === 3) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
              }else if((verdaderos === 2) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
              }else if((verdaderos === 1) && data.II4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
              }else if((verdaderos === 0) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
              }else{
                cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.VIII4ClienteRecalcitrante)
              }

                const valoresGU = [data.c, data.I, data.II1, data.II2, data.II3, data.II4, data.III3];
                const verdaderoGU = valoresGU.filter(Boolean).length;

              if((verdaderoGU === 7)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[8]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[8]")     
              }else if ((verdaderoGU === 6)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[7]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[7]")     
              }else if ((verdaderoGU === 5)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
              }else if ((verdaderoGU === 4)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
              }else if ((verdaderoGU === 3)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
              }else if ((verdaderoGU === 2)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
              }else if ((verdaderoGU === 1)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
              }else{
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
              }        


          }else{

            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 4' = "+ data.VIII4)

          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

        }else if (!data.III && data.VIII){

          cy.xpathClk("(//span[normalize-space(text()) = 'Otros']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox'])[1]")         

          if(data.VIII1){
            
            cy.xpathClk("//span[normalize-space(text()) = 'Entidad Gubernamental Hondureña']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          }else{
            
            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 1' = "+ data.VIII1)

          }

          if(data.VIII2){
            
            cy.xpathClk("//span[normalize-space(text()) = 'Banco Central Emisor']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          }else{
            
            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 2' = "+ data.VIII2)

          }

          if(data.VIII3){
            
            cy.xpathClk("//span[normalize-space(text()) = 'Organización Internacional']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          }else{
            
            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 3' = "+ data.VIII3)

          }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

          if(data.VIII4){
           
          cy.xpathClk("(//span[normalize-space(text()) = 'Otros']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox'])[2]")         

              const valoresCR = [data.a, data.c, data.I, data.II1, data.II2, data.II3, data.II4, data.III3];
              const verdaderos = valoresCR.filter(Boolean).length;
                
              if(verdaderos === 8 && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[9]")
              }else if((verdaderos === 7) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[8]")
              }else if((verdaderos === 6) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[7]")
              }else if((verdaderos === 5) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[6]")
              }else if((verdaderos === 4) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[5]")
              }else if((verdaderos === 3) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[4]")
              }else if((verdaderos === 2) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[3]")
              }else if((verdaderos === 1) && data.II4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[2]")
              }else if((verdaderos === 0) && data.VIII4ClienteRecalcitrante){
                cy.xpathClk("(//span[normalize-space(text()) = 'Cliente Recalcitrante']/parent::div//input[@type='checkbox'])[1]")
              }else{
                cy.log("FATCA no seleccionado apartado 'I' cliente recalcitrante "+ data.VIII4ClienteRecalcitrante)
              }

                const valoresGU = [data.c, data.I, data.II1, data.II2, data.II3, data.II4, data.III3];
                const verdaderoGU = valoresGU.filter(Boolean).length;

              if((verdaderoGU === 7)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[8]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[8]")     
              }else if ((verdaderoGU === 6)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[7]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[7]")     
              }else if ((verdaderoGU === 5)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
              }else if ((verdaderoGU === 4)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
              }else if ((verdaderoGU === 3)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
              }else if ((verdaderoGU === 2)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
              }else if ((verdaderoGU === 1)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
              }else{
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//app-fatca-indications-juridical//app-documents//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
              }        


          }else{

            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 4' = "+ data.VIII4)

          }

        }else{

          cy.log("FATCA no seleccionado inciso 'd' apartadp 'VIII' "+ data.VIII)

        }

    // }else{
      cy.log("FATCA no seleccionado inciso 'd' = "+ data.d)
    // }

      cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[32]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
      cy.wait(420)
          

    cy.xpathBtxt(data.Observaciones, "(//div[@class='angular-editor-textarea' and @contenteditable='true'])[2]")

  }
    //### FIN PASO #9

    //### PASO #10
    RefBancaria(data){
        cy.xpathClk("//mat-panel-title[normalize-space(.)='Referencias Bancarias']")

        cy.wait(420)
        cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[33]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
        cy.wait(420)

        cy.xpathClk("//mat-form-field[.//mat-label[contains(., 'Tipo de Cuenta')]]//input")
        cy.xpathClk(`//mat-option//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'${data.tipoCuenta.toLowerCase()}')]`)
        cy.xpathClk("//mat-form-field[.//mat-label[contains(., 'Local/Foranea')]]//input")
        cy.xpathClk(`//mat-option//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'${data.LocalOForanea.toLowerCase()}')]`)
         switch (data.tipoCuenta) {
          case "Préstamos":
        cy.xpathBtxtWE(data.NoPrestamo,"//mat-form-field[.//mat-label[contains(., 'Numero Prestamo')]]//input")
        cy.xpathClk("//mat-form-field[.//mat-label[contains(., 'Producto Cuenta')]]//mat-select")
        cy.xpathClk(`//mat-option//span[contains(normalize-space(.), '${data.ProductoCuenta}')]`)
        cy.xpathBtxtWE(data.MDPrestoLCredit, "//mat-form-field[.//mat-label[contains(., 'Monto de deuda préstamo')]]//input")
        cy.IngresoFecha(data.AperturaAprxOFechaVenc, "//mat-label[normalize-space()='Apertura Aproximada']/ancestor::mat-form-field//button")
        cy.xpath("(//mat-label[normalize-space(.)='Institución']/ancestor::mat-form-field//input)[2]").type(data.Institucion)
        cy.xpathClk(`//mat-option//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${data.Institucion.toLowerCase()}' )]`)
        cy.wait(1500)
        cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Agregar']])[1]") 

            break;

          case "Tarjetas":
        cy.xpathBtxtWE(data.NoPrestamo,"//mat-form-field[.//mat-label[contains(., 'Número Tarjeta')]]//input")
        cy.xpathClk("//mat-form-field[.//mat-label[contains(., 'Producto Cuenta')]]//mat-select")
        cy.xpathClk(`//mat-option//span[contains(normalize-space(.), '${data.ProductoCuenta}')]`)
        cy.xpathBtxtWE(data.MDPrestoLCredit, "//mat-form-field[.//mat-label[contains(., 'Límite de crédito')]]//input")
        cy.IngresoFecha(data.AperturaAprxOFechaVenc, "//mat-label[normalize-space()='Fecha Vencimiento']/ancestor::mat-form-field//button")
        cy.xpath("(//mat-label[normalize-space(.)='Institución']/ancestor::mat-form-field//input)[2]").type(data.Institucion)
        cy.xpathClk(`//mat-option//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${data.Institucion.toLowerCase()}' )]`)
        cy.wait(1500)
        cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Agregar']])[1]") 

            break;

            case "Cuentas":
        cy.xpathBtxtWE(data.NoPrestamo,"//mat-form-field[.//mat-label[contains(., 'Numero Cuenta')]]//input")
        cy.xpathClk("//mat-form-field[.//mat-label[contains(., 'Producto Cuenta')]]//mat-select")
        cy.xpathClk(`//mat-option//span[   contains(     translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),  '${data.ProductoCuenta.toLowerCase()}' ) ]`)
        cy.IngresoFecha(data.AperturaAprxOFechaVenc, "//mat-label[normalize-space()='Apertura Aproximada']/ancestor::mat-form-field//button")
        cy.xpath("(//mat-label[normalize-space(.)='Institución']/ancestor::mat-form-field//input)[2]").type(data.Institucion)
        cy.xpathClk(`//mat-option//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${data.Institucion.toLowerCase()}' )]`)
        cy.wait(1500)
        cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Agregar']])[1]") 


        //Lista de cautela
            break;

          default:
            throw new Error(`Opción no válida: ${data.tipoCuenta}`);
        }

        cy.xpathClk("//mat-panel-title[normalize-space(.)='Referencias Bancarias']")
        cy.wait(1500)

    }
    RefComercial(data){
        cy.wait(420)
        cy.xpath("//mat-panel-title[normalize-space(.)='Referencias Comerciales']").scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
        cy.wait(420)
          
        cy.xpathClk("//mat-panel-title[normalize-space(.)='Referencias Comerciales']")

        cy.wait(420)
        cy.xpath('(//div[contains(@class, "mat-step") and contains(@class, "ng-star-inserted")])[33]').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
        cy.wait(420)

        cy.xpathBtxtWE(data.IngreseNombre, "//mat-form-field[.//mat-label[contains(., 'Ingrese un nombre')]]//input")
        cy.xpathBtxt(data.TipoDocumento, "//mat-form-field[.//mat-label[contains(., 'Tipo de documento')]]//input")
        cy.xpathBtxt(data.ID, "//mat-form-field[.//mat-label[contains(., 'Identificación')]]//input")
        cy.xpathBtxt(data.Direccion, "(//mat-form-field[.//mat-label[contains(., 'Dirección')]]//input)[5]")

    }
    correoRef(data){       
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select)[3]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoCorreo+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxt(data.correo, "(//mat-label[normalize-space(.)='Correo']/ancestor::mat-form-field//input)[3]")

      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Agregar']])[2]")
    }
    celularRef(data){       

      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Teléfono']/ancestor::mat-form-field//mat-select)[3]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoTelefono+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxtClear(data.telefono, "(//mat-label[normalize-space(.)='Teléfono']/ancestor::mat-form-field//input)[3]")
      cy.xpathClk("(//mat-label[normalize-space() = 'Ubicación']/ancestor::mat-form-field//mat-select)[3]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      if (!data.Ubicacion || data.Ubicacion === "undefined") {
        // Caso 1: no tiene valor o viene como "undefined"
        cy.xpathClk("//mat-option//span[contains(normalize-space(.), '--')]")
      } else {
        // Caso 2: tiene un valor válido
        cy.xpathClk(`//mat-option//span[contains(normalize-space(.), '${data.Ubicacion}')]`)
      }

      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Agregar']])[3]")
    }
    //### FIN PASO #10

    //### PASO #11
    digitalizacionDocumentos(data) {
    cy.log("Flujo para ingresar documentos");
    
        
    cy.xpath("//tr[contains(., '"+data.NombreArchivo+"')]//mat-icon[normalize-space()='add']/ancestor::button")
      .then($el => {
        if ($el.length > 0) {
          cy.wrap($el).click({ force: true });

          cy.xpath("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Digitalización de documentos')]]//div[contains(@class, 'container-local') and not(contains(@style, 'display: none'))]")
          .filter(":visible:not([disabled])")
            .first()
            .find("input[type='file']")
            .attachFile("'"+data.NombreArchivo+"'.jpg'", { force: true });

          cy.wait(1000);
          cy.xpath('//p[normalize-space(text())="Notas:"]')
            .filter(":visible:not([disabled])")
            .first()
            .scrollIntoView();

          cy.xpath("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Digitalización de documentos')]]//div[@class='angular-editor-textarea']")
            .filter(":visible:not([disabled])")
            .first()
            .scrollIntoView()
            .should("be.visible")
            .type(data.Notas);



          cy.xpathClk("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Digitalización de documentos')]]//button[.//span[normalize-space(text())='Guardar']]")
            


        } else {
          // No existe, continuar sin error
          cy.log("No se encontró el botón ADD para CLIENTE");
        }
      });
    

      
    
    

    }
    //### FIN PASO #11
}



export default personaJuridica;


