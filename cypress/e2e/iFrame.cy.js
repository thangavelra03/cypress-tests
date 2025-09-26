import 'cypress-iframe';

Cypress.on('uncaught:exception', () => false);

describe('Handling Iframes in Cypress', () => {
  beforeEach(() => {
    cy.visit('https://demo.automationtesting.in/Frames.html');
  });


  it('Type inside Single Iframe (Plugin)', () => {
   
    cy.contains('a', 'Single Iframe').click();

    cy.frameLoaded('#singleframe');
    
    cy.iframe('#singleframe')
      .find('input[type="text"]')
      .should('be.visible')
      .type('Hello I am Thangavel.. I am learning Cypress');
  });

  

    it('Type inside Single Iframe (no plugin)', () => {
   
    cy.contains('a', 'Single Iframe').click();

    cy.frameLoaded('#singleframe');
    
    cy.get('#singleframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .find('input[type="text"]')
    .type('I have handled iframe without plugin');

  });

});
