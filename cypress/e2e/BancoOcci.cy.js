    import MetodosGenerales from '../support/MetodosGeneralesPo.cy.js';
  
   const Generales=new MetodosGenerales()




// //   const URL_Var = Cypress.env('URL_VAR');       //link URL´s para descargar los documentos 
  
//   let ArrayVar = []; // Variable global para almacenar las variables
//   let ArrayDat = []; // Variable global para almacenar los datos
//   let ArrayErrorMjsBD = []; // Variable global para almacenar los errores de mensaje en BD
//   let ArrayErrorMjsTXT = []; // Variable global para almacenar los errores de mensaje del excel
//   let numeroTx=1; // Variable global para el control del numero de transacciones
//   let ErrorTX=false // Variable global para manejo de errores  
//   let XpathAut = "/html/body/div[3]/div[2]/div/mat-dialog-container/bt-authorization-helper/div[2]/form/fieldset/mat-form-field[1]/div/div[1]/div[3]/input | /html/body/div[3]/div[3]/div/mat-dialog-container/bt-authorization-helper/div[2]/form/fieldset/mat-form-field[1]/div/div[1]/div[3]/input";
//   let XpathFirmas = "/html/body/div[3]/div[2]/div/mat-dialog-container/app-signature-viewer/mat-dialog-content/div/div[2]/div/mat-card/div/div[2]/p/strong[1]";
//   let ArraryReporteFinal = [];
//   let codigoR="";

    //variables para bancoocci
    let url= "https://plataforma-qa.bytesw.cloud/"
    let usuario = "OPERADORQA";
    let contrasena = "byte0625";
    let tipoDocumento = "CEDULA"
    let InfoTipoDocumento = "1010199002153"

    
  describe("BancoOcci", () => {

      Cypress.on('uncaught:exception',(err,Runnable) =>{
          return false
      })

    //   before("Descargar archivo de la nube con los datos", () =>{

    //   //Descarga los archivo variables
    //   Generales.ArchivoNubeV(URL_Var)
      
    //   //Lee archivo de variables y guarda en un array los resultados 
    //     cy.task("readExcelToJson", { filePath: "cypress/fixtures/variables.xlsx" }).then((DatosVar) => {
    //       DatosVar.forEach((filaVar) => {
    //         ArrayVar.push(filaVar)
    //       })
    //     }); 
        
    //     const folderPath = 'cypress/screenshots';  // Aquí coloca la ruta de la carpeta de capturas u otros archivos que quieras borrar
    //     cy.task('deleteAllFiles', folderPath);

    //   })// TERMINA EL BEFORE


    //   it('Descarga de archivos nesesarios', () => {
    //     Generales.ArchivoNubeE(ArrayVar[0].URL_ERRORES)        // Descarga los archivo mensaje de erroes
    //     Generales.ArchivoNubeD(ArrayVar[0].URL_TX)             // Descarga archivo de tx
    //   })// TERMINA EL IT DESCARGA DE ARCHIVOS

      it('Ingreso e inicio de sesion', () => {

        cy.Login(url, usuario, contrasena)
        cy.xpathClk("//h2[contains(text(), '¿Desea suscribirse a las notificaciones?')]/following::button[normalize-space(text())='Si'][1]")
        cy.xpathClk("//h2[contains(text(), 'Aceptar Notificaciones en Chrome.')]/following::button[contains(text(), 'Cerrar')][1]")
        //cy.alertaNotif()
        //cy.alertaSuscr()
        cy.busquedaCliente(tipoDocumento, InfoTipoDocumento)
//        cy.ingresoJson("varjson")


        //Generales.Login("https://plataforma-qa.bytesw.cloud/", "operadorqa", "byte0625") // Metodo de login de MetidisGenerales 



        
        // Generales.Login(ArrayVar[0].URL_Sitio, ArrayVar[0].Usuario, ArrayVar[0].Password) // Metodo de login de MetidisGenerales 
      })// TERMINA EL IT LOGIN

    //   it('Manejo de errores', () => {
    //     //query para consultar en bd los erroes posibles encontrados 
    //     cy.task('queryDb', "SELECT tcbs.ERROR_MESSAGE FROM "+ArrayVar[0].VERSION_JTELLER+".TRANSACTION_CHARACT_BY_STEP tcbs WHERE expression IS NOT NULL UNION SELECT em.message FROM "+ArrayVar[0].VERSION_JTELLER+".ERROR_MESSAGES em").then((ErrorMjs) => {
    //       ErrorMjs.forEach((MjsError) => {
    //         ArrayErrorMjsBD.push(MjsError)            // Guarda en el arrary "ArrayErrorMjsBD" los datos obtenidos de la consulta
    //     })
    //       //leerchivo archivo MensajeErrores en la nube para ingresar mensajes que no aparecen en bd
    //       cy.task("readExcelToJson", { filePath: "cypress/fixtures/MensajeErrores.xlsx" }).then((ErrorMjs) => {
    //         ArrayErrorMjsTXT.push(ErrorMjs)            // Guarda en el arrary "ArrayErrorMjsTXT" los datos obtenidos del archivo 
    //       })
    //     })
    //   })// TERMINA EL MANEJO DE ERRORES

//       it('INICIO DE TRANSACCION', () => {
//         //lectura del archivo "datosTX"
//         cy.task("readExcelToJson", { filePath: "cypress/fixtures/datosTX.xlsx" }).then((DatosTX) => {
//           DatosTX.forEach((datos) => {
//             ArrayDat.push(datos)
//             codigoR = datos.codigo
//             cy.log(codigoR)
//             cy.log("/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////"+numeroTx)        
//             let inicio = Date.now();
//         cy.task('queryDb', "SELECT ID FROM "+ArrayVar[0].VERSION_JTELLER+".TRANSACTION_FLOW WHERE TRANSACTION_ID=(SELECT ID FROM "+ArrayVar[0].VERSION_JTELLER+".TRANSACTION_SPEC WHERE CODE_OF_THE_TRANSACTION="+datos.codigo+") ORDER BY ID ASC").then((pasos) => {
//         ErrorTX = false

//         if (!pasos || pasos.length === 0) {
         
//         Generales.Seleccionartransaccion(datos.codigo);
//         cy.IfError(numeroTx, ArrayErrorMjsBD, ArrayErrorMjsTXT)

//         }else{
//               Generales.Seleccionartransaccion(datos.codigo, numeroTx)
//               cy.IfError(numeroTx, ArrayErrorMjsBD, ArrayErrorMjsTXT)

//               let arrayPasos = [];

//               pasos.forEach((fila) => {
//                   arrayPasos.push(fila);                                                                                           // Agrega cada fila al arrayPasos
//                 });                                                                                                                       
//                 for (let totalArrayPasos = 0; totalArrayPasos < arrayPasos.length && !ErrorTX; totalArrayPasos++){                                  // Recorre el arrayPasos
//             if(ErrorTX===false){    
//                   //recupera los "LABEL o NAME" segun el paso de la transaccion para compararlos con los campos de la transaccion evitando los "PROTECT" en bd y asi llenar los formularios necesarios
//                 cy.task('queryDb', "SELECT NAME FROM "+ArrayVar[0].VERSION_JTELLER+".CHARACTERISTIC_SPEC cs WHERE ID IN(SELECT CHAR_SPEC_ID FROM "+ArrayVar[0].VERSION_JTELLER+".TRANSACTION_CHARACTERISTIC_SPEC tcs WHERE ID IN(SELECT tcbs.TRX_CHARACTERISTIC_ID  FROM "+ArrayVar[0].VERSION_JTELLER+".TRANSACTION_CHARACT_BY_STEP tcbs WHERE (VISUALIZE=1 AND tcbs.PROTECT <> 1) AND TRANSACTION_FLOW_ID ="+arrayPasos[totalArrayPasos]+")) ORDER BY LABEL ASC").then((labelName) => {
                
//                   if (!labelName || labelName.length === 0 ) {
//                       cy.log("No se encontraron labels en el paso.");
//                     return;
//                       }
//                       let arraylabel = [];
//                       labelName.forEach((filalabel) => {
//                           arraylabel.push(filalabel);                                                                                                     // Agrega cada fila al arraylabel
//                         })
//                         for (let totalArrayLabel=0; totalArrayLabel!=arraylabel.length && !ErrorTX; totalArrayLabel++){                                               // Recorre el arraylabel
//                           let labelText = String(arraylabel[totalArrayLabel]);                                                                            // Convertir a string 
//                           cy.get(`input[data-placeholder="${labelText}"], input[id="${labelText}"], .mat-select-placeholder`)                             //recibe si es input-(ID o Placeholder) o si tiene un combobox 
//                        //   .should('be.visible')
//                           .then(($el) => {                                                                                                                // Verificar si es un input con propiedad readonly
//                             if ($el.is('input')) {
//                               cy.wrap($el).invoke('prop', 'readonly').then((readonly) => {
//                                 if (readonly) {
//                                   cy.log('El campo es de solo lectura');
//                                 } else {
//                                   Generales.input(labelText,datos[arraylabel[totalArrayLabel]])
//                                 }
//                               });
//                             }                       
//                             else if ($el.hasClass('mat-select-placeholder')) {
//                               cy.wrap($el).invoke('prop', 'disabled').then((disabled) => {
//                                 if (disabled) {
//                                   cy.log('El combobox está deshabilitado');
//                                 } else {
//                                   Generales.Combobox(datos[arraylabel[totalArrayLabel]])
//                           }
//                         });
//                       }
//                     });
//                   }                   
//               }).then(() => {     

//                 if(ErrorTX===false){

//             Generales.BtnAvanzar(numeroTx)
//             cy.IfError(numeroTx, ArrayErrorMjsBD, ArrayErrorMjsTXT)
//             }   
//           }
//         )}
//       }      
//     } // FIN ELSE SI ENCUENTRA PASOS 
//   })// TERMINA "promesa pasos de transaccion"
// cy.wait(4000)
//         //empiezan acciones de autorizacion o seleccion de firma 
//         cy.document().then((doc) => {
//           if (doc.evaluate(XpathAut, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
//              cy.log('Elemento XpathAutorizacion encontrado, realizando acción...');
//              Generales.Autorizacion(ArrayVar[0].UsuarioAut, ArrayVar[0].PasswordAut)
//              cy.IfError(numeroTx, ArrayErrorMjsBD, ArrayErrorMjsTXT)
//               } else if (doc.evaluate(XpathFirmas, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
//                // Si XpathFirmas fue encontrado
//                 cy.log("⏭️ autorizacion firma transacción.");
//                 Generales.FirmaEncontrada()
//                 cy.IfError(numeroTx, ArrayErrorMjsBD, ArrayErrorMjsTXT)

//             } else {
//               // Si ninguno está presente, simplemente continúa sin mostrar error
//               cy.log("Ningún elemento encontrado, continuando con la prueba.");
//           }

//         }) 
//       //         cy.document().then((doc) => {
//       //         if (doc.evaluate("/html/body/app-root/div[1]/app-transaction-summary/div/div[2]/div[2]/div/div[2]/app-summary-notifications/div/div/button", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
//       //           Generales.BtnAvanzar(numeroTx)
//       //          }else {
//       //           // Si ninguno está presente, simplemente continúa sin mostrar error
//       //           cy.log("Ningún elemento encontrado, continuando con la prueba.");
//       //       }
//       // })
//       let EstatusError
      
//       cy.screenshot(`Captura transaccion No. ${numeroTx}`);
//            // Calcular el tiempo de ejecución
//            const fin = Date.now();
//            const tiempoEjecucion = ((fin - inicio)/1000);   
//       if(ErrorTX===false){    
//         EstatusError ="Exitosa"
//         cy.task('QueryReporte', { transactionId: numeroTx, status: EstatusError});
//         }else{
//         EstatusError ="Faliida"
//         cy.task('QueryReporte', { transactionId: numeroTx, status: EstatusError});
//         }
//         cy.log(codigoR)

//         ArraryReporteFinal.push([numeroTx, codigoR, EstatusError, tiempoEjecucion])

//         Generales.Dashboard(ArrayVar[0].URL_Sitio) 
//         numeroTx++
//         cy.log("##########################################################################################################################################################"+numeroTx)        
//       })// TERMINA LECTURA FOREACH DATOSTX
// //      numeroTx++
//       cy.log("¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡"+numeroTx)
//       cy.log(ArraryReporteFinal)
//       cy.task("guardarReporteExcel", ArraryReporteFinal);

//     }) // TERMINA LECTURA DE ARCHIVO
//   }) // TERMINA EL IT "INICIO DE TRANSACCION"
}) // TERMINA EL IT "Exploración automática de pantalla desconocida"
      

// const inicio = Date.now();
