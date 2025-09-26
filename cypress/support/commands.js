//Drag and drop
import 'cypress-file-upload'
require('cypress-downloadfile/lib/downloadFileCommand')



Cypress.Commands.add('LoginDemoblaze', ()=>{
  
    cy.fixture('existingUser').then(user=>{
    cy.get('#login2').click();
    cy.get('#logInModal').should('be.visible');
    cy.get('#loginusername')
    .click()
    .type(user.username, {force:true , delay:200})
    .should('have.value', user.username);

    cy.get('#loginpassword')
    .click()
    .type(user.password, {delay:200})
    .should('have.value', user.password);

    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
    cy.wait(2000);
    cy.get('#nameofuser').should('contain.text', `Welcome ${user.username}`);

    })

})

Cypress.Commands.add('LogoutDemoblaze',()=>{
    cy.get('#logout2').click();
    cy.wait(1000);
    cy.get('#login2').should('be.visible');
})


Cypress.Commands.add('dragTo', (source, target) => {
  cy.get(source)
    .trigger('mousedown', { which: 1 });

  cy.get(target)
    .trigger('mousemove')
    .trigger('mouseup', { force: true });
});






















































// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
