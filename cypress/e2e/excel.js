const ExcelJs = require('exceljs');

async function excelTest(nombreHoja){
    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile("C:/byte/desarrollos/BancoOcci/cypress/fixtures/datos.xlsx");

    const worksheet = workbook.getWorksheet(nombreHoja); // 👈 variable dinámica

    if (!worksheet) {
        console.error(`❌ La hoja "${nombreHoja}" no fue encontrada`);
        return;
    }

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            console.log(cell.value);
        });
    });
}

// ✅ Llama a la función con cualquier nombre de hoja:
excelTest('1Identificacion');
// o
// excelTest('Captura de accionistas');
// excelTest('Representante Legal - Datos Generales');
