describe('Login Test', ()=>{

beforeEach(()=>{
        cy.visit('/');
});


it('TC1 - valid login',()=>{

cy.LoginDemoblaze();

cy.LogoutDemoblaze();

})

})