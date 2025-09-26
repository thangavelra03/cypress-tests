import { faker } from "@faker-js/faker";

describe ('Sign up Test', ()=>{

    beforeEach(()=>{
        cy.visit('/');
    });

    it('TC1 - Sign up with existing user', ()=>{
        cy.fixture('existingUser').then(user => {
        cy.get('#signin2').click();
        cy.get('#signInModal').should('be.visible');


        cy.get('#sign-username')
        .should('be.visible')
        .click() 
        .type(user.username, {force:true, delay: 200 })
        .should('have.value', user.username)


        cy.get('#sign-password')
       .should('be.visible')
       .click()
       .type(user.password, {force:true, delay: 200 })
       .should('have.value', user.password);


        cy.get('button[onclick="register()"]').click();
        })

        cy.on('window:alert', (alertText) => {
  expect(alertText).to.contain('This user already exist.');
});



    })

    it('TC2 - Sign up with new user (faker)', ()=>{

        const randomUser = {
            username: faker.internet.username(),
            password: faker.internet.password()
        };

        cy.get('#signin2').click();
        cy.get('#signInModal').should('be.visible');

        cy.get('#sign-username')
        .should('be.visible')
        .clear()
        .type(randomUser.username, {delay:100})
        .should('have.value',randomUser.username);

        cy.get('#sign-password')
        .should('be.visible')
        .clear()
        .type(randomUser.password, {delay:100})
        .should('have.value',randomUser.password);

        cy.get('button[onclick="register()"]').click();

        cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Sign up successful.');
        });
    });



    it('TC3 - empty username and password', ()=>{


        cy.get('#signin2').click();
        cy.get('#signInModal').should('be.visible');

        cy.get('#sign-username')
        .should('be.visible')
        .clear()
        .type(' ', {delay:100})
        .should('have.value',' ');

        cy.get('#sign-password')
        .should('be.visible')
        .clear()
        .type(' ', {delay:100})
        .should('have.value',' ');

        cy.get('button[onclick="register()"]').click();

        cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Please fill out Username and Password.');
        });
    });
}


);