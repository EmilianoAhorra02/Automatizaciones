describe('Validación de Alineación de Contenido en Seguro GNP', () => {
    beforeEach(() => {
        cy.visit('https://segurognp.mx'); // Cargar la página antes de cada prueba
        cy.wait(3000); // Dar tiempo para la carga de contenido
    });

    it('Validar que los títulos estén correctamente alineados', () => {
        cy.get('h1').should('exist').and('be.visible').and('have.css', 'text-align', 'center');
        
        cy.get('h2, h3').each(($el) => {
            cy.wrap($el).should('exist').and('be.visible');
            cy.wrap($el).should('have.css', 'text-align').and('match', /(start|left)/);
        });

        cy.log('✅ Alineación validada correctamente.');
    });
});