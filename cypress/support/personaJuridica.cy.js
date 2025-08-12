require("cypress-xpath");
class personaJuridica {

//### PASO #1
  //Identificacion Juridica 
  Identificacion(data){ 
    cy.xpathClk('//label[contains(normalize-space(), "Jurídica")]')
    cy.xpathBtxt(data.RTN, "//mat-label[contains(normalize-space(), 'REGISTRO TRIBUTARIO NACIONAL')]") // puede avanzar sin necesidad de los otros campos
    cy.xpathBtxt(data.NRT, "//mat-label[contains(normalize-space(), 'NUEVO REGISTRO TRIBUTARIO')]") // validar por que si se ingresa solicita fecha obligado
    cy.IngresoFecha(data.FechaExp, "//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button") //se peude ingresar sin necesidad de NRT
    cy.xpathClk("(//button[contains(., 'Siguiente')])[1]")
  }
  //FIN Identificacion Juridica
  //### FIN PASO #1

  //### PASO #2
  //Datos Generales Persona Juridica 
  DatosGeneralesPersonaJuridica(data){
    this.TipoPersonaJuridica(data)
    this.DatosConstitucionEmpresa(data)
    this.RegistroMercantil(data)
    cy.xpathClk("(//button[contains(., 'Siguiente')])[2]")
  }//FIN Datos Generales Persona Juridica
  
  TipoPersonaJuridica(data){
    cy.xpathBtxt(data.TPJ, "(//mat-radio-button[contains(., '"+data.TPJ+"')])") //calidar este por que no ingresamos nada
    cy.xpathBtxt(data.RazonSoc, "//mat-label[normalize-space(text())='Razón Social']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.NombreCom, "//mat-label[normalize-space(text())='Nombre Comercial']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.Siglas, "//mat-label[normalize-space(text())='Siglas']/ancestor::mat-form-field//input")
    cy.xpathBtxtClear(data.PaisOr, "(//mat-label[normalize-space(text())='País de Origen']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.CatNegocio, "//mat-label[normalize-space(text())='Categoría de Negocio']/ancestor::mat-form-field//input")    
  }
  DatosConstitucionEmpresa(data){
    cy.xpathBtxt(data.TipSoc, "//mat-label[normalize-space(text())='Tipo de Sociedad']/ancestor::mat-form-field//input")
    cy.IngresoFecha(data.FechaReg, "//mat-label[normalize-space()='Fecha de Registro']/ancestor::mat-form-field//button")
    if (data.EnFormacion == true)
      {
        cy.xpathBtxt(data.EnFormacion, "//label[normalize-space(.)='En Formación']/preceding-sibling::input[@type='checkbox']")
      }else{
        cy.log("En formacion no esta selecciona")
      }
    cy.IngresoFecha(data.FechaIniOp, "//mat-label[normalize-space(.)='Fecha de Inicio de Operaciones']/ancestor::mat-form-field//button[@aria-label='Open calendar']")  
  }
  RegistroMercantil(data){
    cy.xpathBtxt(data.Numero, "(//mat-label[normalize-space(.)='Número']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.tomo, "//mat-label[normalize-space(.)='Tomo']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.Pagina, "//mat-label[normalize-space(.)='Página']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.PatenteCom, "//mat-label[normalize-space(.)='Patente de Comercio']/ancestor::mat-form-field//input")
    cy.xpathBtxt(data.EscriPermiso, "//mat-label[normalize-space(.)='No. Escritura/Permiso Oper.']/ancestor::mat-form-field//input")       
  }
  //### FIN PASO #2

  //### PASO #3
  CapturaDeAccionistas(dataRA,dataID,dataIC,dataDGP,dataRL){
      if(dataRA.AggRef=="Juridica"){
      //Paso: 0 ingresamos 
      cy.xpathClk("(//button[contains(., 'Agregar')])[1]")
      cy.xpathClk("(//button[contains(., 'JURIDICO')])[1]")
      //formulario persona Juridica
      this.AggRefJuridica(dataID,dataIC,dataDGP,dataRL)
      //indicara "El último elemento de cada rama debe ser una persona natural" damos click en aceptar
      cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")       
      //Ingresamos al submenu
      cy.xpathClk("//mat-icon[text()='add']")
      //mientras la ultima no sea juridica no continuara el flujo
      do {if(dataRA.AggRef=="Juridica"){
        cy.xpathClk("(//button[contains(., 'JURIDICO')])[1]")
      this.AggRefJuridica(dataID,dataIC,dataDGP,dataRL)
      
      }else if(dataRA.AggRef =="Natural"){
        cy.xpathClk("(//button[contains(., 'NATURAL')])[1]")
        this.AggRefNatural(dataID,dataIC,dataDGP)   
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
        this.AggRefNatural(dataID,dataIC,dataDGP)   
      }else{
        cy.log("se terminaron")
      }
      
      //validar el tema que sea natural el utimo sino que salga del flujo he indique el inconveniente tomando captura del mensaje indicado y pasar al siguiente dato en el archivo 
  
      //Boton siguiente Paso #3
      cy.xpathClk("(//button[contains(., 'Siguiente')])[3]");
  }
  AggRefJuridica(dataID,dataIC,dataDGP,dataRL){
    //Paso: 1 Identificacion 
    cy.xpathBtxt(dataID.RTNRef, "(//mat-label[contains(text(), 'REGISTRO TRIBUTARIO')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataID.NRTRef, "    (//mat-label[contains(normalize-space(), 'NUEVO REGISTRO TRIBUTARIO')])[2]")
    cy.IngresoFecha(dataID.fechaExpRef, "//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button") //se peude ingresar sin necesidad de NRT
    //Paso: 2 Información Complementaria 
    cy.xpathBtxt(dataIC.TipoRef, "(//mat-label[contains(text(), 'Tipo')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataIC.PorcentajeRef, "//mat-label[normalize-space()='% de Participación']/ancestor::mat-form-field//input")
    //Paso: 3 Datos Generales Persona Juridica 
    cy.xpathBtxt(dataDGP.NombreRef, "(//mat-label[normalize-space()='Nombre']/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.PaisOrRef, "(//mat-label[contains(text(), 'País de Origen')]/ancestor::mat-form-field//input)[2]")
    //Paso: 4 Representante Legal
    cy.xpathBtxt(dataRL.CedulaRef, "(//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataRL.PasaporteRef, "(//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataRL.UbcPaisRef, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataRL.Ubc2Ref, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[3]")
    cy.IngresoFecha(dataRL.FechaRef, "(//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button)[1]")
    cy.xpathBtxt(dataRL.PrimerApellidoREF, "(//mat-label[contains(text(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataRL.SegundoApellidoREF, "(//mat-label[contains(text(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataRL.PrimerNombreRef, "(//mat-label[contains(text(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataRL.SegundoNombreRef, "(//mat-label[contains(text(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataRL.OtroNombreREF, "(//mat-label[contains(text(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")  
    cy.xpathBtxt(dataRL.GeneroRef, "(//mat-radio-button[contains(., '"+data.GeneroRef+"')])[1]") // validar este mismo tema TPJ
    //Paso: 5 Agregar 
    cy.xpathClk("(//button[contains(., 'Agregar')])[2]") 
    //se debede agregar un natural luego de un juridico  
  }
  AggRefNatural(dataID,dataIC,dataDGP){
    //Paso: 1 Identificacion 
    cy.xpathBtxt(dataID.CedulaRef, "(//mat-label[contains(text(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataID.PasaporteRef, "(//mat-label[contains(text(), 'PASAPORTE')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataID.PartidaNacRef, "//mat-label[contains(text(), 'PARTIDA DE NACIMIENTO')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataID.RTNRef, "(//mat-label[contains(text(), 'REGISTRO TRIBUTARIO')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataID.codTRef, "//mat-label[contains(text(), 'CODIGO TRIBUTARIO')]/ancestor::mat-form-field//input")
    cy.xpathBtxt(dataID.UbcPaisRef, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataID.Ubc2Ref, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[3]")
    cy.IngresoFecha(dataID.FechaRef, "(//mat-label[contains(text(), 'Seleccione una fecha')]/ancestor::mat-form-field//button)[1]")
    cy.xpathClk("(//button[contains(., 'Siguiente paso')])[1]")
    //Paso: 2 Información Complementaria
    cy.xpathBtxt(dataIC.PaisOrRef, "(//mat-label[contains(text(), 'País de Origen')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataIC.TipoRef, "(//mat-label[contains(text(), 'Tipo')]/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(dataIC.PorcentajeRef, "//mat-label[normalize-space()='% de Participación']/ancestor::mat-form-field//input")
    cy.xpathClk("(//button[contains(., 'Siguiente paso')])[2]")
    //Paso: 3 Datos Generales Persona natural  
    cy.xpathBtxt(dataDGP.PrimerApellidoREF, "(//mat-label[contains(text(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.SegundoApellidoREF, "(//mat-label[contains(text(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.PrimerNombreRef, "(//mat-label[contains(text(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.SegundoNombreRef, "(//mat-label[contains(text(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.OtroNombreREF, "(//mat-label[contains(text(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")  
    cy.xpathBtxt(dataDGP.GeneroRef, "(//mat-radio-button[contains(., '"+dataDGP.GeneroRef+"')])[1]") //mismo tema TPJ
    cy.xpathBtxtClear(dataDGP.PaisRecRef, "(//mat-label[contains(text(), 'País de Residencia')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(dataDGP.RegionRef, "(//mat-label[contains(text(), 'Región')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(dataDGP.DepRef, "(//mat-label[contains(text(), 'Departamento')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxtClear(dataDGP.MunRef, "(//mat-label[contains(text(), 'Municipio')]/ancestor::mat-form-field//input)[1]")
    if (dataDGP.SegundaNacionalidadRef !== null && dataDGP.SegundaNacionalidadRef !== undefined 
      && dataDGP.SegundaNacionalidadRef.replace(/\s+/g, '') !== "" &&  dataDGP.SegundaNacionalidadRef.toLowerCase() !== "estadounidense") {
    // entra solo si tiene un valor distinto de null, undefined y vacío y no es estadounidese
    cy.xpathBtxt(dataDGP.SegundaNacionalidadRef, "(//mat-label[contains(text(), '2da. Nacionalidad')]/ancestor::mat-form-field//input)[1]")
    }else if (dataDGP.SegundaNacionalidadRef.replace(/\s+/g, '') !== null && dataDGP.SegundaNacionalidadRef !== undefined 
      && dataDGP.SegundaNacionalidadRef !== "" &&  dataDGP.SegundaNacionalidadRef.toLowerCase() == "estadounidense") {
    // entra solo si tiene un valor distinto de null, undefined y vacío y es estadounidense
    cy.xpathBtxt(dataDGP.SegundaNacionalidadRef, "(//mat-label[contains(text(), '2da. Nacionalidad')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.SocialSecurityRef, "(//mat-label[contains(text(), 'Social Security Number')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(dataDGP.UbiSegNacRef, "(//mat-label[contains(text(), 'Ubicación')]/ancestor::mat-form-field//input)[4]")
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
    //validar primero que no existan mas para agregar o validar que si ingrfese todoas antes del siguietne 

    //Boton siguiente Paso #4
   cy.xpathClk("(//button[contains(., 'Siguiente')])[4]");
  }
  JuntaDirectiva(data){
    cy.xpathBtxt(data.AuthPor, "//mat-label[normalize-space(.)='Autorizado por']/ancestor::mat-form-field//input")
    cy.IngresoFecha(data.FechaInicioJD, "//mat-label[normalize-space()='Fecha Inicio']/ancestor::mat-form-field//button")
    cy.IngresoFecha(data.FechaFinalizaJD, "//mat-label[normalize-space()='Fecha Finaliza']/ancestor::mat-form-field//button")
    cy.xpathBtxt(data.PaisOrigenJD, "(//mat-label[normalize-space(.)='País de Origen']/ancestor::mat-form-field//input)[2]")
    cy.xpathBtxt(data.CedulaJD, "(//mat-label[contains(normalize-space(), 'CEDULA DE IDENTIDAD')]/ancestor::mat-form-field//input)[1]")
    //cy.xpathBtxt(UbicacionJD, "")
    cy.IngresoFecha(data.FechaJD, "(//mat-label[normalize-space()='Seleccione una fecha']/ancestor::mat-form-field//button)[1]")
    cy.xpathBtxt(data.PrimerApellidoJD, "(//mat-label[contains(normalize-space(), 'Primer Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.SegundoApellidoJD, "(//mat-label[contains(normalize-space(), 'Segundo Apellido')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.PrimerNombreJD, "(//mat-label[contains(normalize-space(), 'Primer Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.SegundoNombreJD, "(//mat-label[contains(normalize-space(), 'Segundo Nombre')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.OtroNombreJD, "(//mat-label[contains(normalize-space(), 'Otros Nombres')]/ancestor::mat-form-field//input)[1]")
    cy.xpathBtxt(data.CargoJD, "(//mat-label[contains(normalize-space(), 'Cargo')]/ancestor::mat-form-field//input)[1]")  
  }
  //### FIN PASO #4

  //### PASO #5
  RepresentanteLegal(data){
      this.DatosGeneralesRL(data)
      this.DireccionRL(data)
      this.DatosGeneralesRL(data)

    }
    DatosGeneralesRL(data){
         
      cy.xpathClk("(//mat-radio-button[contains(., '"+data.GeneroRL+"')])") //calidar este por que no ingresamos nada
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
      cy.xpathBtxt(data.NacionalidadRL, "//mat-label[contains(normalize-space(), 'Nacionalidad')]/ancestor::mat-form-field//input")
      cy.xpathBtxt(data.ProfesiónRL, "//mat-label[contains(normalize-space(), 'Profesión')]/ancestor::mat-form-field//input")
      

      
    }
    DireccionRL(data){
      cy.xpathBtxt(data.paisRL, "(//mat-label[normalize-space(.)='País']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.aniosRL, "(//mat-label[normalize-space(.)='Años de residir']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.ubicacionRL, "(//mat-label[normalize-space(.)='Ingrese una ubicación']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.agenciaCercanaRL, "(//mat-label[normalize-space(.)='Agencia más cercana']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.infDireccionRL, "(//mat-label[normalize-space(.)='Información Dirección']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.especRL, "(//mat-label[normalize-space(.)='Especificaciones']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.dirRefBusqRL, "(//mat-label[normalize-space(.)='Dirección referencia busqueda']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.latitudRL, "(//mat-label[normalize-space(.)='Latitud']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.longitudRL, "(//mat-label[normalize-space(.)='Longitud']/ancestor::mat-form-field//input)[1]")
      
      cy.xpathClk("(//button[contains(., 'Siguiente paso representante')])[1]")
    }
    ContactoRL(data){
      //tiene que correr el archivo y agregar segun la cantidad que encuentre
      this.correoRL(data)
      //tiene que correr el archivo y agregar segun la cantidad que encuentre
      this.celularRL(data)
      //tiene que correr el archivo y agregar segun la cantidad que encuentre y luego dar agregar 
      cy.xpathClk("(//button[contains(., 'Agregar')])[5]")

    }
    correoRL(data){
      //ingreso de correo
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoCorreo+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.IngresoFecha(data.correo, "(//mat-label[normalize-space(.)='Correo']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//button[contains(., 'Agregar')])[3]")
      //fin ingrerso correo
    }
    celularRL(data){
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Teléfono']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoTelefono+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxtClear(data.telefono, "(//mat-label[normalize-space(.)='Teléfono']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//mat-label[normalize-space() = 'Ubicación']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.Ubicacion+"']") // validar el comando si da problema y posuible solucion a TPJ
                   
      cy.xpathClk("(//button[contains(., 'Agregar')])[4]")
    }
    //### FIN PASO #5

    //### PASO #6
    PerfilEconomico(data){
      this.InfGenFin(data)
      this.InfOpera(data)
      this.Relaciones(data)
      this.PrincProvee(data)

      //validar este siguiente no estoy seguro si es necesario
      cy.xpathClk("(//button[.//span[contains(normalize-space(.), 'Finalizar')]])[1]")

    }
    InfGenFin(data){
      
      if (data.AfectoISR){cy.xpathClk("(//*[normalize-space() = 'Afecto a ISR']/preceding::input[@type='checkbox'])[1]")}else{cy.log("Afecto a ISR false"+ data.AfectoISR)}  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathBtxt(data.ActEconomica, "(//mat-label[normalize-space(.)='Actividad Económica']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxtClear(data.fechaActEc, "(//mat-label[normalize-space(.)='Fecha actividad económica']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.SecEconomica, "(//mat-label[normalize-space(.)='Sector Económico']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.SecEconomica, "(//mat-label[normalize-space(.)='Clase de Cliente']/ancestor::mat-form-field//input)[1]")
   
   
      //leer documento para agregar las monedas que correspondan 
      cy.xpathBtxt(data.Moneda ,"(//mat-label[normalize-space(.)='Moneda']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.montoAprxTotalActivo ,"(//mat-label[normalize-space(.)='Monto Aproximado de Total de Activo']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.nivelVentasAnual ,"(//mat-label[normalize-space(.)='Nivel de Ventas Anuales']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Observaciones ,"//div[@class='angular-editor-textarea' and @contenteditable='true']")
                   
      cy.xpathClk("(//button[contains(., 'Agregar')])[1]")
      // fin lectura de archivo 


      cy.xpathClk("(//button[contains(., 'Siguiente')])[1]")

    }
    InfOpera(data){
  
      //leer documento para agregar las monedas que correspondan 
      cy.xpathBtxt(data.Pais ,"(//mat-label[normalize-space(.)='País']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Region ,"(//mat-label[normalize-space(.)='Región']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Departamento ,"(//mat-label[normalize-space(.)='Departamento']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.Municipio ,"(//mat-label[normalize-space(.)='Municipio']/ancestor::mat-form-field//input)[1]")
                   
      cy.xpathClk("(//button[contains(., 'Agregar')])[2]")
      // fin lectura de archivo 

      cy.xpathClk("(//button[contains(., 'Siguiente')])[2]")

    }
    Relaciones(data){
      cy.xpathBtxt(data.relGrupoEcono ,"(//mat-label[normalize-space(.)='Relación con Grupo Económico']/ancestor::mat-form-field//input)[1]")
      cy.xpathBtxt(data.relGrupFinan ,"(//mat-label[normalize-space(.)='Relación con Grupo Financiero']/ancestor::mat-form-field//input)[1]")

      cy.xpathClk("(//button[contains(., 'Siguiente')])[3]")
    }
    PrincProvee(data){
      //leer documento para agregar las monedas que correspondan 
      cy.xpathBtxt(data.Proveedor ,"(//mat-label[normalize-space(.)='Proveedor']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//button[contains(., 'Agregar')])[2]")
      // fin lectura de archivo 
    }
    //### FIN PASO #6

    //### PASO #7
    Direcciones(data){
      cy.xpathBtxtClear(data.Pais, "(//mat-label[normalize-space(.)='País']/ancestor::mat-form-field//input)[3]")
      cy.xpathBtxt(data.IngreseUbicacion,"(//mat-label[normalize-space(.)='Ingrese una ubicación']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxtClear(data.agenCercana, "(//mat-label[normalize-space(.)='Agencia más cercana']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxtClear(data.InfoDireccion, "(//mat-label[normalize-space(.)='Información Dirección']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Especificaciones, "(//mat-label[normalize-space(.)='Especificaciones']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxtClear(data.DirRefBusq, "(//mat-label[normalize-space(.)='Dirección referencia busqueda']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Latitud, "(//mat-label[normalize-space(.)='Latitud']/ancestor::mat-form-field//input)[2]")
      cy.xpathBtxt(data.Longitud, "(//mat-label[normalize-space(.)='Longitud']/ancestor::mat-form-field//input)[2]")
      
      cy.xpathClk("(//button[contains(., 'Siguiente')])[12]")

    }
    //### FIN PASO #7

    //### PASO #8
    Contacto(data){
      cy.xpathBtxtClear(data.NameContacto, "(//mat-label[normalize-space(.)='Nombre de contacto']/ancestor::mat-form-field//input)[1]")
      //tiene que correr el archivo y agregar segun la cantidad que encuentre
      this.correo(data)
      //tiene que correr el archivo y agregar segun la cantidad que encuentre
      this.celular(data)
      //tiene que correr el archivo y agregar segun la cantidad que encuentre y luego dar agregar 
      cy.xpathClk("(//button[contains(., 'Siguiente')])[13]")
    }
    correo(data){
      //ingreso de correo
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoCorreo+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.IngresoFecha(data.correo, "(//mat-label[normalize-space(.)='Correo']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//button[contains(., 'Agregar')])[1]")
      //fin ingrerso correo
    }
    celular(data){
      cy.xpathClk("(//mat-label[normalize-space() = 'Tipo de Teléfono']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.tipoTelefono+"']") // validar el comando si da problema y posuible solucion a TPJ
      cy.xpathBtxtClear(data.telefono, "(//mat-label[normalize-space(.)='Teléfono']/ancestor::mat-form-field//input)[1]")
      cy.xpathClk("(//mat-label[normalize-space() = 'Ubicación']/ancestor::mat-form-field//mat-select)[1]")  //mat-label[normalize-space() = 'Tipo de Correo']/ancestor::mat-form-field//mat-select
      cy.xpathClk("//mat-option[normalize-space()='"+data.Ubicacion+"']") // validar el comando si da problema y posuible solucion a TPJ
                   
      cy.xpathClk("(//button[contains(., 'Agregar')])[2]")
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
          cy.xpathBtxt(data.cUbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")     
        }else{
      cy.log("FATCA no seleccionado inciso"+ data.c)
    }
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
          if(data.c){
            cy.xpathBtxt(data.IGIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.IUbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.IGIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.IUbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")     
          }
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'I' = "+ data.I)
        }

        if(data.II){
          
          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Considerada Cumplidoras']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

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
            cy.xpathBtxt(data.II1GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II1UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II1GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II1UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II1GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II1UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 1'  "+ data.II1)
          } 
          
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
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II2GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II2UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 2'  "+ data.II2)
          } 

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
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
          }else if ((verdaderoGU === 3)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II3GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II3UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 2'  "+ data.II3)
          } 

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
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
          }else if ((verdaderoGU === 4)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
          }else if ((verdaderoGU === 3)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        
          }else{
            cy.log("FATCA no seleccionado apartado 'II 2'  "+ data.II4)
          } 

        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'I' = "+ data.II)
        }

        if(data.III){
          
          cy.xpathClk("//span[normalize-space(text()) = 'Ins. de Inversión y Relacionadas']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         

          if(data.III1){
            cy.xpathClk("//span[normalize-space(text()) = 'Fideicomiso']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          }else{
            cy.log("FATCA no seleccionado inciso 'III 1' = "+ data.III1)
          }

          if(data.III2){
            cy.xpathClk("//span[normalize-space(text()) = 'Fondo Jubilación']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          }else{
            cy.log("FATCA no seleccionado inciso 'III 1' = "+ data.III2)
          }

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
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[7]")     
          }else if ((verdaderoGU === 5)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
          }else if ((verdaderoGU === 4)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
          }else if ((verdaderoGU === 3)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
          }else if ((verdaderoGU === 2)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
          }else if ((verdaderoGU === 1)){
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
          }else{
            cy.xpathBtxt(data.II4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
            cy.xpathBtxt(data.II4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
          }        

          }else{
            cy.log("FATCA no seleccionado inciso 'III 1' = "+ data.III3)
          }

        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'III' = "+ data.III)
        }

        if(data.IV){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Reportan Bajo IGA Modo 1']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'IV' = "+ data.IV)
        }

        if(data.V){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Reportan Bajo IGA Modo 2']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'V' = "+ data.V)
        }

        if(data.VI){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Participantes Acuerdo IRS']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'VI' = "+ data.VI)
        }

        if(data.VII){

          cy.xpathClk("//span[normalize-space(text()) = 'Ins. Financieras Documentadas por Dueño']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox']")         
          
        }else{
          cy.log("FATCA no seleccionado inciso 'd' apartado 'VII' = "+ data.VII)
        }
        
        if(data.III && data.VIII){

          cy.xpathClk("(//span[normalize-space(text()) = 'Otros']/ancestor::div[contains(@class, 'row-check-I')]//input[@type='checkbox'])[2]")         

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
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[8]")     
              }else if ((verdaderoGU === 6)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[7]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[7]")     
              }else if ((verdaderoGU === 5)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
              }else if ((verdaderoGU === 4)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
              }else if ((verdaderoGU === 3)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
              }else if ((verdaderoGU === 2)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
              }else if ((verdaderoGU === 1)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
              }else{
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
              }        


          }else{

            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 4' = "+ data.VIII4)

          }

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
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[8]")     
              }else if ((verdaderoGU === 6)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[7]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[7]")     
              }else if ((verdaderoGU === 5)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[6]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[6]")     
              }else if ((verdaderoGU === 4)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[5]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[5]")     
              }else if ((verdaderoGU === 3)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[4]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[4]")     
              }else if ((verdaderoGU === 2)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[3]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[3]")     
              }else if ((verdaderoGU === 1)){
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[2]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[2]")     
              }else{
                cy.xpathBtxt(data.VIII4GIIN ,"(//mat-form-field[.//mat-label[contains(., 'GIIN')]]//input)[1]")     
                cy.xpathBtxt(data.VIII4UbicacionFatca ,"(//mat-form-field[.//mat-label[contains(., 'Ubicación')]]//input)[1]")
              }        


          }else{

            cy.log("FATCA no seleccionado inciso 'd' apartado 'VIII 4' = "+ data.VIII4)

          }

        }else{

          cy.log("FATCA no seleccionado inciso 'd' apartadp 'VIII' "+ data.VIII)

        }

    }else{
      cy.log("FATCA no seleccionado inciso 'd' = "+ data.d)
    }

    cy.xpathBtxt(data.Observaciones, "//div[@class='angular-editor-textarea' and @contenteditable='true']")

  }
    //### FIN PASO #9

    //### PASO #10
    referencia(data){
      //click para desplegar menu
      cy.xpathClk("//mat-panel-title[normalize-space(.)='Referencias Bancarias']")
      //


    }
    //### FIN PASO #10

    //### PASO #11
    DigitDoc(data){
      
    }
    //### FIN PASO #11

    //### PASO #12
    Finalizado(){

            cy.xpathClk("(//button[contains(., 'Finalizar')])[3]")

    }
    //### FIN PASO #12
}



export default personaJuridica;
