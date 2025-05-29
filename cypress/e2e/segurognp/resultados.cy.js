describe('Pantalla de Resultados - segurognp.mx', () => {
  beforeEach(() => {
    cy.visit('https://segurognp.mx');
    // Simular llenado válido del formulario
    cy.get('#marca').select('Nissan');
    cy.get('#modelo').select('2020');
    cy.get('#submarca').select('Versa');
    cy.get('#descripcion').select('Advance');
    cy.get('#nombre').type('Carlos Pérez');
    cy.get('#edad').type('30');
    cy.get('#email').type('carlos@example.com');
    cy.get('#telefono').type('5533221100');
    cy.get('#genero').select('Masculino');
    cy.get('#cp').type('03020');
    cy.get('#avisoPrivacidad').check(); // checkbox
    cy.get('button[type="submit"]').click();
  });

  it('Debe mostrar nombre, correo y teléfono en resultados', () => {
    cy.contains('Carlos Pérez').should('be.visible');
    cy.contains('carlos@example.com').should('be.visible');
    cy.contains('5533221100').should('be.visible');
  });

  it('Debe mostrar el vehículo cotizado', () => {
    cy.contains('Nissan').should('be.visible');
    cy.contains('Versa').should('be.visible');
  });

  it('Debe mostrar tabla de coberturas', () => {
    cy.get('.tabla-coberturas').should('exist');
  });

  it('Debe mostrarse botón "COMPRAR EN LÍNEA"', () => {
    cy.contains('COMPRAR EN LÍNEA').should('be.visible');
  });
});
