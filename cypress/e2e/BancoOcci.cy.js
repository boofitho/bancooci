import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";

const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

const URL_Var = Cypress.env("URL_VAR"); //link URL´s para descargar los documentos

let ArrayVar = [];

let ArrayCliente = [], ArrayID = [], ArrayDataGenP = [], ArrayCaptAccionistas = [], ArrayCapJuntaDir = [],
    ArrayRepreLegalDG = [], ArrayRepreLegalDir = [], ArrayRepreLegalCont = [], ArrayPerfilEconomico = [],
    ArrayDireccion = [], ArrayContacto = [], ArrayFATCA = [], ArrayReferencias = [], ArrayDigitDoc = [],
    ArrayClienteFinalizado = [];


let ArrayConCorreo =[]
let ArrayConTelefono =[]
let ArrayRefBanca =[]

let no = 0
describe("BancoOcci", () => {

  Cypress.on("uncaught:exception", (err, Runnable) => {
    return false;
  });

  before("Ingreso e inicio de sesion", () => {
     cy.log(URL_Var)
      //Descarga el de archivo variables
      Generales.ArchivoNubeV(URL_Var)
    
      //Lee archivo de variables y guarda en un array los resultados 
      cy.task("readExcelToJson", { 
        filePath: "cypress/fixtures/variables.xlsx", 
        hoja: "Variables" 
      }).then((Var) => {
        Var.forEach((filaVar) => {
          ArrayVar.push(filaVar);
        });
      });
   
      const folderPath = 'cypress/screenshots';  // Aquí coloca la ruta de la carpeta de capturas u otros archivos que quieras borrar
      cy.task('deleteAllFiles', folderPath);     //con este comando borramos el folderpath de screenshots

 }); // TERMINA BEFORE

  before('Descarga de archivos datos y lectura de hojas del mismo', () => {

    //descarga archivo "datos"
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS_PJ, "datos")  
   
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx" }).then((excelData) => {
      ArrayCliente = excelData["0 Cliente"] || [];
      ArrayID = excelData["1 Identificacion"] || [];
      ArrayDataGenP = excelData["2 DatosGenPer"] || [];
      ArrayCaptAccionistas = excelData["3 Captura de accionistas"] || [];
      ArrayCapJuntaDir = excelData["4 Captura de junta directiva"] || [];
      ArrayRepreLegalDG = excelData["5 RLDatos Generales"] || [];
      ArrayRepreLegalDir = excelData["5 RLDireccion"] || [];
      ArrayRepreLegalCont = excelData["5 RLContacto"] || [];
      ArrayPerfilEconomico = excelData["6 PerfilEconomico"] || [];
      ArrayDireccion = excelData["7 Dirección"] || [];
      ArrayContacto = excelData["8 Contacto"] || [];
      ArrayFATCA = excelData["9 FATCA"] || [];
      ArrayReferencias = excelData["10 referencia"] || [];
      ArrayDigitDoc = excelData["11 DigitDoc"] || [];
  
    });
   });// TERMINA EL IT DESCARGA DE ARCHIVO DATOS Y LECTURA DE HOJAS

it('Login', () => { 
  cy.Login(ArrayVar[0]);
})

it("Agregar cliente", () => {
  
      //PASO #1 Buscamos el cliente
      cy.busquedaCliente(ArrayCliente[no]);

      cy.log("❗ Apareció el mensaje de NO RESULTADOS");

      //PASO #2 Agregamos datos Identificacion
      PJ.Identificacion(ArrayID[no]);     
      // FIN PASO #1 Identificacion

      //PASO #2 Datos Generales Persona juridica
      PJ.DatosGeneralesPersonaJuridica(ArrayDataGenP[no]);
      // FIN PASO #2 Datos Generales Persona juridica

      //PASO #3 Captura de accionistas
      cy.log(ArrayCaptAccionistas[no].TieneRef)
      if (ArrayCaptAccionistas[no].TieneRef){
        cy.log(ArrayCaptAccionistas[no].TieneRef + "Verdadero ArrayCaptAccionistas[no].TieneRef")
      //descarga archivo "Captura de accionistas"
      Generales.DescargaArchivoComplementos(ArrayCaptAccionistas[no].URL_RefAccionistas, "CaptAccionistas");
      // Lee TODAS las hojas en una sola operación y realizacion del paso 3
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/CaptAccionistas.xlsx" }).then((excelData) => {
        // Asigna los datos a los arrays correspondientes
        const ArrayRefAccionistas = excelData["RefAccionista"] || [];
        const ArrayIDcapAcc = excelData["Identificacion"] || [];
        const ArrayInfCompl = excelData["Informacion Complementaria"] || [];
        const ArrayDtsGnPJyN = excelData["DG PJ y N"] || [];
        const ArrayRLCapAcc = excelData["Representante Legal"] || [];

        cy.log(`Número de registros: ${ArrayRefAccionistas.length}`);
        cy.oculto()
        // Procesa los datos
        for (let i = 0; i < ArrayRefAccionistas.length; i++) {
          cy.oculto()
          cy.wait(1500)
        cy.get('body', { timeout: 5000 }).then(($body) => {
          if ($body.text().includes('El último elemento de cada rama debe ser una persona natural')) {
            cy.log('Si aparecio el mensaje "El último elemento de cada rama debe ser una persona natural" ');
//            cy.xpathClk("(//button[contains(@class, 'swal2-confirm') and contains(., 'Aceptar')])[1]")
//            cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")
            cy.wait(2000)
            cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")       

            cy.log('NATURAL "El último elemento de cada rama debe ser una persona natural"')
            cy.xpathClk("//mat-icon[text()='add']")
            // Aquí tu flujo cuando aparece el mensaje
            PJ.AggRefNatural(ArrayIDcapAcc[i], 
              ArrayInfCompl[i], ArrayDtsGnPJyN[i])
          } else {
            cy.log('No aparecio el mensaje "El último elemento de cada rama debe ser una persona natural" ');
            // Aquí el flujo alternativo
            if(ArrayRefAccionistas[i].AggRef === "Jurídica"){
            
            cy.log('JURIDICO')
            cy.xpathClk("(//button[contains(., 'Agregar')])[1]")
            PJ.AggRefJuridica(ArrayIDcapAcc[i], 
              ArrayInfCompl[i], ArrayDtsGnPJyN[i], 
              ArrayRLCapAcc[i])

              cy.wait(5000)
            }else if(ArrayRefAccionistas[i].AggRef === "Natural"){
              cy.xpath("//mat-icon[text()='add']", { timeout: 5000 }).then($el => {
                if ($el.length > 0 && $el.is(':visible')) {
                  // ✅ El elemento existe y está visible
                  cy.wrap($el).click();
                          cy.log('NATURAL')
                          PJ.AggRefNatural(ArrayIDcapAcc[i], 
                            ArrayInfCompl[i], ArrayDtsGnPJyN[i])

                } else {
                  // ❌ El elemento no existe o está oculto
                  cy.log("El icono 'add' no está visible");
                          cy.log('NATURAL')
                          PJ.AggRefNatural(ArrayIDcapAcc[i], 
                            ArrayInfCompl[i], ArrayDtsGnPJyN[i])
                }
            }); 
              }else{ 
                cy.log('No hay datos "Captura de accionistas" presionando boton siguiente')
              }
            }
          });
        }

      });

      }
      //presionamos siguiente luego de terminar la lectura o vlaidar si no hay referencias   
      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Captura de accionistas')]]//button[.//span[normalize-space()='Siguiente']]");
      // FIN PASO #3 Captura de accionistas

      //PASO #4 Captura de junta directiva
      if (ArrayCapJuntaDir[no].TieneJD){

      //descarga archivo "Captura de junta directiva"
      Generales.DescargaArchivoComplementos(ArrayCapJuntaDir[no].URL_JuntaDirectiva, "CapJuntaDir")            
      //inicio lectura hojas archivo "Captura de junta directiva"
      //lectura del archivo "Captura de junta directiva" hoja 0 "Junta Directiva "
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/CapJuntaDir.xlsx"}).then((JuntaDir) => {
        // Asigna los datos a los arrays correspondientes
        const ArrayJuntaDir = JuntaDir["Junta Directiva"] || [];
        for (let i = 0; i < ArrayJuntaDir.length; i++) {
          PJ.CapturaJuntaDirectiva(ArrayJuntaDir[i])
        }
      });
      }
      //Boton siguiente Paso #4
      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Captura de junta directiva')]]//button[.//span[normalize-space()='Siguiente']]");
      cy.seleccionarAutorizacionLocal(ArrayVar[0], "autorizacion local digitalización")
      
      // FIN PASO #4 Captura de junta directiva
      
      //PASO #5 Representante Legal
      for (let i = 0; i < ArrayRepreLegalDG.length; i++) {
      PJ.RepresentanteLegal(ArrayRepreLegalDG[no], ArrayRepreLegalDir[no])
      //descarga archivo "Representante Legal - Contacto"
      Generales.DescargaArchivoComplementos(ArrayRepreLegalCont[no].URL_Contacto, "RepreLegalCont")            
      //lectura hojas archivo "Representante Legal - Contacto"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/RepreLegalCont.xlsx" }).then((excelData) => {
      // Asigna los datos a los arrays correspondientes
        const ArrayRLcorreo = excelData["correo"] || [];
        const ArrayRLtelefono = excelData["telefono"] || [];
      //FIN lectura hojas archivo "Representante Legal - Contacto"
      
        for (let i = 0; i < ArrayRLcorreo.length; i++) {
          PJ.correoRL(ArrayRLcorreo[i])
        }
        for (let i = 0; i < ArrayRLtelefono.length; i++) {
          PJ.celularRL(ArrayRLtelefono[i])
        }
      })
      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Representante Legal')]]//button[.//span[normalize-space()='Agregar']])[3]")
      }
      cy.wait(1500)      
      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Representante Legal')]]//button[.//span[normalize-space()='Siguiente']]");      
      // FIN PASO #5 Representante Legal

      //PASO #6 Perfil Economico
      PJ.InfGenFin(ArrayPerfilEconomico[no])
      //descarga archivo "Perfil Economico - Informacion Financiera"
      Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[no].URL_InfFinanciera, "PerfilEcoInfFinanciera")       
      //lectura hojas archivo "Perfil Economico - Informacion Financiera"
      //lectura del archivo "Perfil Economico - Informacion Financiera" hoja 0 "Inf Financiera"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoInfFinanciera.xlsx"}).then((InfFinanciera) => {
        const ArrayInfFinanciera = InfFinanciera["Inf Financiera"] || [];

        for (let i = 0; i < ArrayInfFinanciera.length; i++) {
        cy.log("tamaño array " +ArrayInfFinanciera.length + "va por la i no " + i)

          PJ.monedaPE(ArrayInfFinanciera[i])
        }
      //cuando termine de agregar la informacion financiera continuara con el flujo  
      cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Perfil Economico')]]//button[.//span[normalize-space()='Siguiente']])[1]");
      });
      Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[no].InfDondeOpera, "PerfilEcoInfDondeOpera")            
      //lectura hojas archivo "Perfil Economico - Informacion donde Opera"
      //lectura del archivo "Perfil Economico - Informacion donde Opera" hoja 0 "Inf DondeOpera"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoInfDondeOpera.xlsx"}).then((InfDondeOpera) => {
            const ArrayInfDondeOpera = InfDondeOpera["Inf DondeOpera"] || [];
           
        for (let i = 0; i < ArrayInfDondeOpera.length; i++) {
          PJ.InfOpera(ArrayInfDondeOpera[i])
        }
      //cuando termine de agregar la informacion donde opera continuara con el flujo  
      cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Perfil Economico')]]//button[.//span[normalize-space()='Siguiente']])[2]");

          
      });     
      PJ.Relaciones(ArrayPerfilEconomico[no])

     if(ArrayPerfilEconomico[no].tieneProveedor){

      //descarga archivo "Perfil Economico - Proveedor"
      Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[no].Proveedor, "PerfilEcoProveedor")            
      //lectura hojas archivo "Perfil Economico - Proveedor"
      //lectura del archivo "Perfil Economico - Proveedor" hoja 0 "proveedores"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoProveedor.xlsx"}).then((Proveedor) => {
          const ArrayProveedor = Proveedor["proveedores"] || [];
           
        for (let i = 0; i < ArrayProveedor.length; i++) {
          PJ.PrincProvee(ArrayProveedor[i])
        }      
     });
     }else{
      cy.log("no tiene proveedores 🔚🏁🤨")
     }
     if(ArrayPerfilEconomico[no].newProveedor){

     //descarga archivo "Perfil Economico - Proveedor"
      Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[no].URL_newProveedor, "PerfilEcoNewProveedor")            

      //lectura hojas archivo "Perfil Economico - Proveedor"
      //lectura del archivo "Perfil Economico - Proveedor" hoja 0 "proveedores"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoNewProveedor.xlsx"}).then((NewProveedor) => {
          const ArrayNewProveedor = NewProveedor["aggProveedores"] || [];
           
        for (let i = 0; i < ArrayNewProveedor.length; i++) {

          cy.log("Entro a nuevo proveedor ✅")
          cy.log(ArrayNewProveedor.length)
          cy.log(ArrayNewProveedor.length[0])
          cy.log(ArrayNewProveedor.length[1])
          cy.log(ArrayNewProveedor.length[2])
          cy.log(i)

          PJ.NuevoProvee(ArrayNewProveedor[i])

        }      
     });
     
          }else{
            cy.log("no tiene proveedores nuevos por agregar 🔚🏁🤨")
          }


     
      //validar este siguiente no estoy seguro si es necesario
      cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Perfil Economico')]]//button[.//span[normalize-space()='Finalizar']])[1]")


      // FIN PASO #6 Perfil Economico
      
      //PASO #7 Dirección
      PJ.Direcciones(ArrayDireccion[no])
      // FIN PASO #7 Dirección

      //PASO #8 Contacto
      PJ.Contacto(ArrayContacto[no])

      //descarga archivo "Contacto"
      Generales.DescargaArchivoComplementos(ArrayContacto[no].URL_Contacto, "Contacto")    
      cy.wait(2500)        
      //inicio lectura hojas archivo "Contacto"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/Contacto.xlsx"}).then((dataContacto) => {
          const ArrayConCorreo = dataContacto["correo"] || [];
          const ArrayConTelefono = dataContacto["telefono"] || [];

        for (let i = 0; i < ArrayConCorreo.length; i++) {
          PJ.correo(ArrayConCorreo[i])
        }
        for (let i = 0; i < ArrayConTelefono.length; i++) {
          PJ.celular(ArrayConTelefono[i])
        }

      });
      
      cy.xpathClkWOF("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Contacto')]]//button[.//span[normalize-space()='Siguiente']])[2]");

      // FIN PASO #8 Contacto

      //PASO #9 FATCA
      PJ.FATCA(ArrayFATCA[no])
      
      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'FATCA')]]//button[.//span[normalize-space()='Siguiente']]");

      //FIN PASO #9 FATCA

      //PASO #10 Referencias
      cy.log("EMPËZANDO REFERENCIAS")
      if(ArrayReferencias[no].TieneRefBanc){
      cy.log("SI TIENE REFERENCIAS BANCARIAS")
      //descarga archivo "Referenbcias"
      Generales.DescargaArchivoComplementos(ArrayReferencias[no].URL_RefBancarias, "TieneRefBanc")            
      cy.log("DESCARGO REFERENCIAS BANCARIAS")

      //inicio lectura hojas archivo "Contacto"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/TieneRefBanc.xlsx"}).then((RefBan) => {
          const ArrayTieneRefBancaria = RefBan["Ref Bancarias"] || [];
          cy.log("LECTURA DE REFERENCIAS BANCARIAS" + ArrayTieneRefBancaria.length )
        for (let i = 0; i < ArrayTieneRefBancaria.length; i++) {
              cy.log("ENTRO AL FOR DE REFERENCIAS BANCARIAS" + ArrayTieneRefBancaria.length)
          PJ.RefBancaria(ArrayTieneRefBancaria[i])     
        }
      });
      
      }else{
        
        cy.log("No tiene referencias bancarias")

      }
      if(ArrayReferencias[no].TieneRefCom){     
      //descarga archivo "Referenbcias"
      cy.log("SI TIENE REFERENCIAS COMERCIALES")
      Generales.DescargaArchivoComplementos(ArrayReferencias[no].URL_RefComercial, "RefComercial")            
      //inicio lectura hojas archivo "Contacto"
      cy.log("DESCARGANDO REFERENCIAS COMERCIALES")
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/RefComercial.xlsx"}).then((ReferenciasCom) => {
          const ArrayRefComercial = ReferenciasCom["Ref Comerciales"] || [];
      cy.log("LECTURA REFERENCIAS COMERCIALES" + ArrayRefComercial.length)
          
        for (let i = 0; i < ArrayRefComercial.length; i++) {
      cy.log("FOR REFERENCIAS COMERCIALES" + ArrayRefComercial.length)

          PJ.RefComercial(ArrayRefComercial[i])

        //descarga archivo "Contacto"
        Generales.DescargaArchivoComplementos(ArrayRefComercial[i].URL_CONTACTO, "RefComContacto")            
        //inicio lectura hojas archivo "Contacto"
        cy.task("readExcelToJson", { filePath: "cypress/fixtures/RefComContacto.xlsx"}).then((dataContacto) => {
          const ArrayRefComCorreo = dataContacto["correo"] || [];
          const ArrayRefComTelefono = dataContacto["telefono"] || [];

        for (let i = 0; i < ArrayRefComCorreo.length; i++) {
          PJ.correoRef(ArrayRefComCorreo[i])
        }
        for (let i = 0; i < ArrayRefComTelefono.length; i++) {
          PJ.celularRef(ArrayRefComTelefono[i])
        }

      });
      cy.xpathClk("(//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Agregar']])[4]")
      }

      });

      }else{
        
        cy.log("No tiene referencias comerciales")

      }
      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Referencias')]]//button[.//span[normalize-space()='Siguiente']]")
      // FIN PASO #10 Referencias

      // PASO #11 Digitalización de documentos

      for (let i = 0; i < ArrayDigitDoc.length; i++) {
        Generales.DescargaImagen(ArrayDigitDoc[i])            
      }
      
      for (let i = 0; i < ArrayDigitDoc.length; i++) {
        PJ.digitalizacionDocumentos(ArrayDigitDoc[i]);
      }

      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Digitalización de documentos')]]//button[.//span[normalize-space()='Siguiente']]")
      //cy.oculto()
      // cy.seleccionarAutorizacionLocal(ArrayVar[0], "autorizacion local digitalización")
      // FIN PASO #11 Digitalización de documentos


      // PASO #12 Cliente Finalizado

      cy.xpathClkWOF("//div[contains(@class, 'mat-step') and .//div[contains(text(), 'Cliente Finalizado')]]//button[.//span[normalize-space()='Finalizar']]")

      // FIN PASO #12 Cliente Finalizado






   
    
  })//TERMINA IT AGREGAR CLIENTE
   // no++
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"