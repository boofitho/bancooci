import MetodosGenerales from "../support/MetodosGeneralesPo.cy.js";
import PersonaNatural from "../support/personaNatural-PO.cy.js";
import personaJuridica from "../support/personaJuridica.cy.js";
const cotizador = new PersonaNatural();
const Generales = new MetodosGenerales();
const PJ = new personaJuridica();

const URL_Var = Cypress.env('URL_VAR');       //link URL´s para descargar los documentos 

let ArrayVar = []
let ArrayCliente = []
let ArrayID = []
let ArrayDataGenPJ = []
let ArrayCaptAccionistas = []
let ArrayCapJuntaDir = []
let ArrayRepreLegalDG = []
let ArrayRepreLegalDir = []
let ArrayRepreLegalCont = []
let ArrayPerfilEconomico = []
let ArrayDireccion = []
let ArrayContacto = []
let ArrayFATCA = []
let ArrayReferencias = []
let ArrayDigitalDocs = []
let ArrayClienteFinalizado = []


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

  it('Descarga de archivos datos y lectura de hojas del mismo', () => {
    //descarga archivo "datos"
    Generales.DescargaArchivoComplementos(ArrayVar[0].URL_DATOS, "datos")  
   cy.wait(5000) // descargando archivo
   
    //lista las hojas disponibles en el archivo datos
    cy.task('listarHojasExcel', { filePath: 'cypress/fixtures/datos.xlsx' }).then((nombres) => {
      cy.log('Hojas disponibles: ' + nombres.join(', '));
    });

    /*Inicio lectura del archivo "datos" por hojas*/
    
    //lectura del archivo "datos" hoja 0
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "0 Cliente"}).then((datosCliente) => {
      datosCliente.forEach((fila) => {
        ArrayCliente.push(fila); // O cualquier lógica que necesites
      });
    });
 
    //lectura del archivo "datos" hoja 1 "Identificacion"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "1 Identificacion"}).then((ID) => {
      ID.forEach((filaVar) => {
        ArrayID.push(filaVar);
      });
    });
          
  //lectura del archivo "datos" hoja 2 "Datos Generales Persona juridica"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "2 DatosGenPerjur"}).then((DataGenPJ) => {
      DataGenPJ.forEach((filaVar) => {
        ArrayDataGenPJ.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 3 "Captura de accionistas"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "3 Captura de accionistas"}).then((CaptAccionistas) => {
      CaptAccionistas.forEach((filaVar) => {
        ArrayCaptAccionistas.push(filaVar);
      });
    });
    
    //lectura del archivo "datos" hoja 4 "Captura de junta directiva"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "4 Captura de junta directiva"}).then((CapJuntaDir) => {
      CapJuntaDir.forEach((filaVar) => {
        ArrayCapJuntaDir.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 5 "Representante Legal - Datos Generales"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "5 RLDatos Generales"}).then((RepreLegalDG) => {
      RepreLegalDG.forEach((filaVar) => {
        ArrayRepreLegalDG.push(filaVar);
      });
    });
 
    //lectura del archivo "datos" hoja 6 "Representante Legal - Direccion"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "5 RLDireccion"}).then((RepreLegalDir) => {
      RepreLegalDir.forEach((filaVar) => {
        ArrayRepreLegalDir.push(filaVar);
      });
    });
    
    //lectura del archivo "datos" hoja 7 "Representante Legal - Contacto"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "5 RLContacto"}).then((RepreLegalCont) => {
      RepreLegalCont.forEach((filaVar) => {
        ArrayRepreLegalCont.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 8 "Perfil Economico"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "6 PerfilEconomico"}).then((PerfilEconomico) => {
      PerfilEconomico.forEach((filaVar) => {
        ArrayPerfilEconomico.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 9 "Dirección"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "7 Dirección"}).then((Direccion) => {
      Direccion.forEach((filaVar) => {
        ArrayDireccion.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 10 "Contacto"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "8 Contacto"}).then((Contacto) => {
      Contacto.forEach((filaVar) => {
        ArrayContacto.push(filaVar);
      });
    });

    //lectura del archivo "datos" hoja 11 "FATCA"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "9 FATCA"}).then((FATCA) => {
      FATCA.forEach((filaVar) => {
        ArrayFATCA.push(filaVar);
      });
    });    

    //lectura del archivo "datos" hoja 12 "Referencias"
    cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: "10 referencia"}).then((Referencias) => {
      Referencias.forEach((filaVar) => {
        ArrayReferencias.push(filaVar);
      });
    }); 


//    13 DigitDoc, 14 Finalizado

    // //lectura del archivo "datos" hoja 13 "Digitalización de documentos"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: 13 }).then((DigitalDocs) => {
    //     DigitalDocs.forEach((filaVar) => {
    //     ArrayDigitalDocs.push(filaVar)
    //   })
    // }); 
    // //lectura del archivo "datos" hoja 14 "Cliente Finalizado"
    // cy.task("readExcelToJson", { filePath: "cypress/fixtures/datos.xlsx", hoja: 14 }).then((ClienteFinalizado) => {
    //     ClienteFinalizado.forEach((filaVar) => {
    //     ArrayClienteFinalizado.push(filaVar)
    //   })
    // }); 

    //Fin lectura del archivo datos 
        
  })// TERMINA EL IT DESCARGA DE ARCHIVO DATOS Y LECTURA DE HOJAS

it('Descarga de archivos complemetnarios y lectura de hojas de los mismo', () => {
    //descarga de archivos secundarios de los datos
    
    //descarga archivo "Captura de accionistas"
    Generales.DescargaArchivoComplementos(ArrayCaptAccionistas[0].URL_RefAccionistas, "CaptAccionistas")            
    //descarga archivo "Captura de junta directiva"
    Generales.DescargaArchivoComplementos(ArrayCapJuntaDir[0].URL_JuntaDirectiva, "CapJuntaDir")            
    //descarga archivo "Representante Legal - Contacto"
    Generales.DescargaArchivoComplementos(ArrayRepreLegalCont[0].URL_Contacto, "RepreLegalCont")            
    //descarga archivo "Perfil Economico - Informacion Financiera"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].InfFinanciera, "PerfilEcoInfFinanciera")            
    //descarga archivo "Perfil Economico - Informacion donde Opera"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].InfDondeOpera, "PerfilEcoInfDondeOpera")            
    //descarga archivo "Perfil Economico - Proveedor"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].Proveedor, "PerfilEcoProveedor")            
    //descarga archivo "Perfil Economico - Proveedor"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].Proveedor, "PerfilEcoProveedor")            
    //descarga archivo "Perfil Economico - Proveedor"
    Generales.DescargaArchivoComplementos(ArrayPerfilEconomico[0].Proveedor, "PerfilEcoProveedor")            
    //descarga archivo "Contacto"
    Generales.DescargaArchivoComplementos(ArrayContacto[0].URL_Contacto, "Contacto")            





})
it('Login', () => {
  
  cy.Login(ArrayVar[0].URL_Sitio, ArrayVar[0].Usuario, ArrayVar[0].Password);
})

it("Agregar cliente", () => {

    cy.busquedaCliente(ArrayCliente[no].tipoDocumento, ArrayCliente[no].InfoTipoDocumento);

    cy.log("AQUIIIIIII PAPUSHO antes del if");
    if (data.TipodePersona.toLowerCase() == "natural") {
      Generales.TipodePersona(data);
      cy.wait(2000);
      cotizador.IdentificacionGeneralPersonaNatural(data);
      cotizador.DatosGeneralesPersonaNatural(data);
      cotizador.clickpaso2();
      cy.wait(500);

      cotizador.PersonaPep(data);
      cotizador.ParentescosPEP(data);
      cotizador.esCasado(data);
      cotizador.escasadoPEP(data);
    } else if (data.TipodePersona.toLowerCase() == "jurídica") {
      cy.log("JURIDICO PAPS");
      

      PJ.Identificacion(data);


      PJ.DatosGeneralesPersonaJuridica(data);




    } else {

      cy.log("*******************************************************");
      cy.log("Debe de ingresar un tipo de cliente: Natural o Juridico");
      cy.log("*******************************************************");

    }
    no++
  })//TERMINA IT AGREGAR CLIENTE
}); // TERMINA EL IT "Exploración automática de pantalla desconocida"
