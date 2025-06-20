import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import personaJuridica from "./personaJuridica.cy.js";
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();      

    //variables para bancoocci
    let url= "https://plataforma-qa.bytesw.cloud/"
    let usuario = "OPERADORQA";
    let contrasena = "byte0625";
    
    const data = {
      //Buscar Cliente
      tipoDocumento: "CEDULA",
      InfoTipoDocumento: "1010199002153132",
      
      //Agregar Cliente
      //##### PASO 1 - Para Identificacion
      TipodePersona: "juridico",
      RTN: "HN1010199002153132",
      //##### PASO 2 -  Datos Generales Persona J/N? 
      TPJ: "ONG",
      RazonSoc: "Empresa XYZ SAC",
      NombreCom: "XYZ",
      Siglas: "XYZ",
      PaisOr: "Perú",
      CatNegocio: "Tecnología",
                        // Para DatosConstitucionEmpresa
      TipSoc: "Sociedad Anónima",
      FechaReg: "2022-01-01",
      EnFormacion: false,
      FechaIniOp: "2022-02-15",
                        // Para RegistroMercantil
      Numero: "RM123456",
      tomo: "45",
      Pagina: "123",
      PatenteCom: "PC78910",
      EscriPermiso: "Escritura Pública #101",
      //PASO 3
      datopaso3: "??"
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

          cy.log("JURIDICO PAPS") 
          PJ.IngresoDatosPersonaJuridica()
          PJ.Identificacion(data)
          PJ.DatosGeneralesPersonaJuridica(data)
        
        }else{
      

        }
      })


}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
