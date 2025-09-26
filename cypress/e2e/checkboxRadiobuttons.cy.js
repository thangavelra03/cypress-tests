describe('Check box and Dropdown Handling',()=>{
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    })

    it('Checkbox handling', ()=> {
        cy.get('input[type="checkbox"]').as('checkBoxes');
        cy.get('@checkBoxes').check(['option1', 'option3']);
        cy.get('@checkBoxes').eq(0).should('be.checked');
        cy.get('@checkBoxes').eq(2).should('be.checked');
        cy.get('@checkBoxes').eq(1).should('not.be.checked');   
    })



    it('Radio button handling', () => {
        cy.get('input[value="radio3"]').check().should('be.checked');

    // Make sure others are not selected
        cy.get('input[value="radio1"]').should('not.be.checked');
        cy.get('input[value="radio2"]').should('not.be.checked');
  });




    it('Loop through radio buttons', () => {
        cy.get('input[name="radioButton"]').each(($el) => {
        if ($el.val() === 'radio3') {
        cy.wrap($el).check().should('be.checked');
      }
        else{
        cy.wrap($el).should('not.be.checked');
      }
    });
  });
})