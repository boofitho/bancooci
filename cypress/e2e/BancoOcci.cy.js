import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";

const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

const URL_Var = Cypress.env('URL_VAR');       //link URL´s para descargar los documentos 

let ArrayVar = []

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
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS, "datos")  
   
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

  before('Descarga de archivos complemetnarios y lectura de hojas de los mismo', () => {
      //descarga de archivos secundarios de los datos
  

      //descarga archivo "referencia"
      Generales.DescargaArchivoComplementos(ArrayReferencias[0].URL_RefBancarias, "refBancaria")            
      //inicio lectura hojas archivo "Contacto"
      //lectura del archivo "Contacto" hoja 0 "correo"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/refBancaria.xlsx", hoja: "Ref Bancarias"}).then((RefBanca) => {
        RefBanca.forEach((filaVar) => {
          ArrayRefBanca.push(filaVar); 
        });
      });
      //Fin lectura hojas archivo "Contacto"


      Generales.DescargaImagen(ArrayDigitDoc[0].URL_Imagen, "DNITest")            
      Generales.DescargaImagen(ArrayDigitDoc[1].URL_Imagen, "RTNTest")            



  })





/*
cy.xpath("//button[contains(., 'Siguiente')]")
  .filter(':visible')   // 👈 filtra solo los visibles
  .first()              // si hay más de uno visible, toma el primero
  .click();
ver tema de siguiente por que veo que salen varios y varian 





ver tema de espera a que termine la descarga del archivo para continuar en el metodo para descarga 
y no usar wait´s si en dado caso da problemas la descarga y lectura al instante de lo contrario no pasa nada 
o ver si se puede hacer un tipo metodo oculto con la existencia o una espera explicita  






ver tema de la segunda nacionalidad, si unicamente entra en 2da nacionalidad al security y eso o si entra 
aunque la primera nacionalidad sea estadounidense y no uynicamente la segunda 






*/
it('Login', () => { 
  cy.Login(ArrayVar[0]);
})

it("Agregar cliente", () => {

    cy.busquedaCliente(ArrayCliente[no]);

    cy.log("AQUIIIIIII PAPUSHO antes del if");
    if (ArrayID[no].TipodePersona.toLowerCase() == "natural") {

    } else if (ArrayID[no].TipodePersona.toLowerCase() == "jurídica") {
      cy.log("JURIDICO PAPS");
      
      //PASO #1
      PJ.Identificacion(ArrayID[no]);
      // FIN PASO #1

      //PASO #2
      PJ.DatosGeneralesPersonaJuridica(ArrayDataGenP[no]);
      // FIN PASO #2

      //PASO #3

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
  
        cy.get('body', { timeout: 5000 }).then(($body) => {
          if ($body.text().includes('El último elemento de cada rama debe ser una persona natural')) {
            cy.log('Si aparecio el mensaje "El último elemento de cada rama debe ser una persona natural" ');
//            cy.xpathClk("(//button[contains(@class, 'swal2-confirm') and contains(., 'Aceptar')])[1]")
//            cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")
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
            cy.xpathClk("(//button[contains(., 'Aceptar')])[1]")       

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
      cy.xpathClk("//span[contains(., 'Referencias Accionistas')]/ancestor::div[contains(@class, 'mat-vertical-content-container')]//button[span[contains(., 'Siguiente')]]");
      // FIN PASO #3

      //PASO #4
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
      cy.xpathClk("(//button[contains(., 'Siguiente')])[4]");
      // FIN PASO #4
      
      //PASO #5
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
      cy.xpathClk("(//button[contains(., 'Agregar')])[5]")
      }      
      //Boton siguiente Paso #5
      cy.xpathClk("(//button[contains(., 'Siguiente')])[7]");      
      // FIN PASO #5

      //PASO #6
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
      cy.xpathClk("(//button[contains(., 'Siguiente')])[8]");
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
      cy.xpathClk("(//button[contains(., 'Siguiente')])[9]");

          
      });     
      PJ.Relaciones(ArrayPerfilEconomico[no])
      //descarga archivo "Perfil Economico - Proveedor"
      Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].Proveedor, "PerfilEcoProveedor")            
      //lectura hojas archivo "Perfil Economico - Proveedor"
      //lectura del archivo "Perfil Economico - Proveedor" hoja 0 "proveedores"
      cy.task("readExcelToJson", { filePath: "cypress/fixtures/PerfilEcoProveedor.xlsx"}).then((Proveedor) => {
          const ArrayProveedor = Proveedor["proveedores"] || [];
           
        for (let i = 0; i < ArrayProveedor.length; i++) {
          PJ.PrincProvee(ArrayProveedor[i])
        }

      //validar este siguiente no estoy seguro si es necesario
      cy.xpathClk("(//button[.//span[contains(normalize-space(.), 'Finalizar')]])[1]")

      });
      // FIN PASO #6
      
      //PASO #7
      PJ.Direcciones(ArrayDireccion[no])
      // FIN PASO #7

      //PASO #8
      PJ.Contacto(ArrayContacto[no])

      //descarga archivo "Contacto"
      Generales.DescargaArchivoComplementos(ArrayContacto[0].URL_Contacto, "Contacto")            
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
      
      cy.xpathClk("(//button[contains(., 'Siguiente')])[13]");

      // FIN PASO #8

      PJ.FATCA(ArrayFATCA[no])

      //PASO #9
      // FIN PASO #9



    } else {

      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");

    }
    
  })//TERMINA IT AGREGAR CLIENTE
   // no++
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"