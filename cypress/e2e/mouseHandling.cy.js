//Tasks - Scroll in to view , Mouse Hover, Mouse click, Drag an drop
import "cypress-real-events/support";
import '@4tw/cypress-drag-drop';

describe('Mouse handling in Cypress', ()=>{

    it('Scroll in to view and Mouse hover', ()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#mousehover').scrollIntoView().should('be.visible');
        cy.get('#mousehover').realHover();
        cy.get('.mouse-hover-content').invoke('show').should('be.visible');
        cy.contains('Reload').click();
    })

    it('Right click', ()=>{
        cy.visit('https://swisnl.github.io/jQuery-contextMenu/demo.html');
        cy.get('.context-menu-one').should('be.visible').rightclick(); //dblclick() for double click
        cy.get('.context-menu-list').should('be.visible');
        cy.get('.context-menu-icon-quit').click();
        cy.on('window:alert',(alertText)=>{
            expect(alertText).to.contain('clicked: quit');
        })
    })

    it('Drag and drop with plugin', () => {
        cy.visit('https://testpages.herokuapp.com/styled/drag-drop-javascript.html');
        cy.contains('Drag And Drop Examples');
        cy.get('#draggable1').drag('#droppable2', { force: true });
        cy.get('#droppable2').should('contain.text', 'Dropped!');        
        cy.get('#draggable2').drag('#droppable1', { force: true });
        cy.get('#droppable1').should('contain.text', 'Get Off Me!');
});
 
    it('Drag and drop without plugin (Mouse down - move - up', () => {
        cy.visit('https://testpages.herokuapp.com/styled/drag-drop-javascript.html');
        cy.contains('Drag And Drop Examples');
//I have written custom reusable commands for drag and drop in support/commands.js
        cy.dragTo('#draggable1', '#droppable2');
        cy.get('#droppable2').should('contain.text', 'Dropped!');

        cy.dragTo('#draggable2', '#droppable1');
        cy.get('#droppable1').should('contain.text', 'Get Off Me!');
});

});