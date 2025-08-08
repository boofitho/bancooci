describe('Leer Excel con tarea personalizada', () => {
  it('Convierte Excel a JSON y lo imprime', () => {
    const filePath = 'cypress/fixtures/test.xlsx';

    // Aquí se envía correctamente como objeto
    cy.task('pasarExcelToJson', { filePath }).then((resultado) => {
      cy.log('Datos del Excel:');
      cy.log(JSON.stringify(resultado));
      console.log(resultado);
    });
    



    });
});
