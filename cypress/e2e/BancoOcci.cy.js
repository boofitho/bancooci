import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

    //variables para bancoocci
    let url= "https://plataforma-qa.bytesw.cloud/"
    let usuario = "OPERADORQA";
    let contrasena = "byte0625";
    
    const data = {
      //Buscar Cliente
      tipoDocumento: "CEDULA",
      InfoTipoDocumento: "1010199002151133",
      //1010199002151
      //HN1010199102151111
      //HN10101991033121
      //HN1010199102151
      //Agregar Cliente
      //##### PASO 1 - Para Identificacion
      TipodePersona: "juridico",
      RTN: "HN1010199002151133",
      //##### PASO 2 -  Datos Generales Persona J/N? 
      TPJ: "ONG",
      RazonSoc: "Empresa 1",
      NombreCom: "XYZboofitho",
      Siglas: "XYZ",
      PaisOr: "Peru",
      CatNegocio: "Abarrotes",
                        // Para DatosConstitucionEmpresa
      TipSoc: "SOCIEDAD COLECTIVA",
      FechaReg: "12/6/2025",
      EnFormacion: false,
      FechaIniOp: "13/6/2025",
                        // Para RegistroMercantil
      Numero: "33322",
      tomo: "44441",
      Pagina: "55555",
      PatenteCom: "78910",
      EscriPermiso: "33121",
      //PASO 3
      datopaso3: "??",
      //PASO 4
      AuthPor:"CNBS",
      FechaInicioJD:"19/6/2025",
      FechaFinalizaJD:"31/7/2025",
      PaisOrigenJD:"Guatemala",
      CedulaJD:"1010 1990 02159",
      UbicacionJD:"NO CREO QUE SEA NECESARIO",
      FechaJD:"30/6/2025",
      PrimerApellidoJD:"Messi",
      SegundoApellidoJD:"Ronaldo",
      PrimerNombreJD:"Lionel",
      SegundoNombreJD:"Cristiano",
      OtroNombreJD:"Cabra",
      CargoJD:"Representante legal",
      //Paso 5
      paso5:"0405199025063"

    };
    
  describe("BancoOcci", () => {

      Cypress.on('uncaught:exception',(err,Runnable) =>{
          return false
      })


      before('Ingreso e inicio de sesion', () => {
        cy.Login(url, usuario, contrasena)
      }); // TERMINA EL IT LOGIN
      it('Agregar Cliente', () => {
        //Notificacion '¿Desea suscribirse a las notificaciones?'
//        cy.xpathClk("//h2[contains(text(), '¿Desea suscribirse a las notificaciones?')]/following::button[normalize-space(text())='Si'][1]")
        //Notificacion 'Aceptar Notificaciones en Chrome.'
//        cy.xpathClk("//h2[contains(text(), 'Aceptar Notificaciones en Chrome.')]/following::button[contains(text(), 'Cerrar')][1]")
        // Ingresamos y buscamos el cliente 
        cy.busquedaCliente(data)
      })    
      
      it('Agregar Cliente', () => {
          cy.log("AQUIIIIIII PAPUSHO antes del if") 
        if(data.TipodePersona.toLowerCase () == "natural"){
      
          cy.log("AQUIIIIIII PAPUSHO") 
          




        }else if (data.TipodePersona.toLowerCase () == "juridico") {
            //PAOS 0: Indicamos que es ingreso de persona Juridica
          PJ.IngresoDatosPersonaJuridica()
            //PAOS 2: Llenamos el formulario del paso #1 Identificacion 
          PJ.Identificacion(data)
            //PAOS 3: Llenamos el formulario del paso #2 Datos Generales Persona Juridica
          PJ.DatosGeneralesPersonaJuridica(data)
        }else{
      

        }
      })


}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
