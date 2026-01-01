describe('Browser Navigation in Cypress', () => {
  it('should navigate back, forward, and reload', () => {
    cy.visit('https://example.cypress.io')   // first page
    cy.contains('Kitchen Sink').should('exist')

    cy.visit('https://example.cypress.io/commands/actions')  // second page
    cy.contains('Actions').should('exist')

    cy.go('back')   // go back to first page
    cy.contains('Kitchen Sink').should('exist')

    cy.go('forward')   // go forward to second page
    cy.contains('Actions').should('exist')

    cy.reload()   // reload the page
    cy.contains('Actions').should('exist')
  })
})

//1 - forward 
//-1 - backward