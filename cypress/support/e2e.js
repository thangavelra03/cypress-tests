// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';



// Alternatively you can use CommonJS syntax:
// require('./commands')
import "cypress-real-events/support";
import '@4tw/cypress-drag-drop';

Cypress.on('uncaught:exception', () => false)
