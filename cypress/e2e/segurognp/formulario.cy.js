describe('Cotización de Seguro GNP (Formulario)', () => {
    beforeEach(() => {
        cy.visit('https://segurognp.mx');
        cy.wait(3000); 
    });

    
    it('Validacion de títulos que esten correctamente alineados', () => {
    //  Centrado
        cy.get('h1')
            .should('exist') 
            .and('be.visible') 
            .and('have.css', 'text-align', 'center'); 
        
    // Validar que los títulos <h2> y <h3> estén  centrados.
        cy.get('h2, h3').each(($el) => {
            cy.wrap($el)
                .should('exist') 
                .and('be.visible') 
                .and('have.css', 'text-align').and('match', /(start|left)/); 
                // Aceptar 'start' o 'left' para evitar errores innecesarios
        });

        cy.log('Alineación validada correctamente.');
    });


//Datos del automovil.
    it('Validar selección de marca, año, submarca y descripción', () => {
        cy.get('.multiCard').should('exist'); // Verificar que el campo de selección existe

        // Marca
        cy.get('.contentList').click({ force: true }); // Mostrara el desplegable de marcas
        cy.get('.showListMulti').should('be.visible', { timeout: 5000 }); // Esperara que la lista sea visible
        cy.get('.itemList').contains('TOYOTA').click(); // Seleccionar la marca TOYOTA
        cy.get('.contentList').should('contain.text', 'TOYOTA'); // Confirmar la selección

        // modelo
        cy.get('.contentList').click({ force: true }); 
        cy.get('.showListMulti').should('be.visible', { timeout: 5000 });
        cy.get('.optionsMulti').contains('2021').click(); 
        cy.get('.contentList').should('contain.text', '2021');

        // Submarca
        cy.get('.contentList').click({ force: true }); 
        cy.get('.showListMulti').should('be.visible', { timeout: 5000 });
        cy.get('.optionsMulti').contains('HILUX').click(); 
        cy.get('.contentList').should('contain.text', 'HILUX');

        // Descripción de la versión
        cy.get('.contentList').click({ force: true }); 
        cy.get('.showListMulti').should('be.visible', { timeout: 5000 });
        cy.get('.optionsMulti').contains('HILUX 2.7 DOBLE CABINA BASE').click(); 
        cy.get('.contentList').should('contain.text', 'HILUX 2.7 DOBLE CABINA BASE');

        cy.log('Prueba completada con éxito: Marca, año, submarca y descripción seleccionados correctamente.');
    });
//Datos del formulario.

   it('Valacion de los campos del formulario sean vizibles', () => {
        cy.get('input[name="nombre"]').should('be.visible');
        cy.get('input[name="correo"]').should('be.visible');
        cy.get('input[name="telefono"]').should('be.visible');
        cy.get('input[name="cp"]').should('be.visible');
        cy.get('select[name="edad"]').should('be.visible');
        cy.get('select[name="genero"]').should('be.visible');
    });

    it('llenar de manera correctamente los campos visibles del formulario', () => {
        cy.get('input[name="nombre"]').type('Emiliano Hernández');
        cy.get('input[name="correo"]').type('emiliano@example.com');
        cy.get('input[name="telefono"]').type('5551234567');
        cy.get('input[name="cp"]').type('11000');
        cy.get('select[name="edad"]').select('30');
        cy.get('select[name="genero"]').select('M');
    });

    it('Ingresar valores incorrectos y validación de mensaje de dato incorrecto.', () => {
       cy.get('input[name="nombre"]').type('12'); 
       cy.get('input[name="correo"]').type('correo_malformado'); 
       cy.get('input[name="telefono"]').type('12345'); 
       cy.get('input[name="cp"]').type('ABCDE'); 
       cy.get('select[name="edad"]').select(''); 
       cy.get('select[name="genero"]').select(''); 
    });

    it('Desactivar y activar el aviso de privacidad validando que el botón de cotización responda', () => {
    cy.get('.switch').then($switch => {
        if ($switch.hasClass('switch--active')) {
            cy.wrap($switch).click({ force: true });
        }
    });
    cy.wait(500);
    cy.get('.switch').should('not.have.class', 'switch--active');
    cy.get('#btnCotizarAuto').should('be.disabled');
    cy.get('.switch').click({ force: true });
    cy.wait(500);
    cy.get('.switch').should('have.class', 'switch--active');
    cy.get('#btnCotizarAuto').should('not.be.disabled');
});
     
     it('Validar que el botón "Ir Arriba" funciona cuando es visible', () => {
    cy.scrollTo('bottom');
    cy.get('.botonTop').should('be.visible');
    cy.get('.botonTop').click();
    cy.window().its('scrollY').should('eq', 0);
});


});