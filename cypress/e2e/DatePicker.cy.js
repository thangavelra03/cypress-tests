import { faker } from "@faker-js/faker";

describe('Date Picker using Random Date (Faker)', () => {

  it('Selects a random date from the calendar', () => {

    cy.visit('https://demo.automationtesting.in/Datepicker.html', {
      onBeforeLoad(win) {
        // to ignore Angular related console  errors
        cy.stub(win.console, 'error').callsFake((msg) => {
          if (msg.includes('angular is not defined')) return;
          console.error(msg);
        });
      },
    });
 
    cy.get('.imgdp').click({ force: true });

    // to generate a random date 
    const randomDate = faker.date.between({ from: '2020-01-01', to: '2025-12-31' });

    const targetDay = randomDate.getDate();
    const targetMonth = randomDate.getMonth(); // 0-indexed
    const targetYear = randomDate.getFullYear();

    cy.log(` Target Date: ${targetDay}-${targetMonth + 1}-${targetYear}`);

    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate how many months to move forward or backward
    const monthDifference = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
    cy.log(`Month difference: ${monthDifference}`);

    // Click through months to reach the correct month/year
    if (monthDifference > 0) {
      for (let i = 0; i < monthDifference; i++) {
        cy.get('.ui-datepicker-next').click();
      }

    } else if (monthDifference < 0) {
      for (let i = 0; i < Math.abs(monthDifference); i++) {
        cy.get('.ui-datepicker-prev').click();
      }
    }

    // Pick the target day
    cy.get('.ui-datepicker-calendar td a').each(($el) => {
      if ($el.text() === targetDay.toString()) {
        cy.wrap($el).click({ force: true });
      }
    });

    // Verify the selected date in the input field
    const formattedMonth = (targetMonth + 1).toString().padStart(2, '0');
    const formattedDay = targetDay.toString().padStart(2, '0');
    const formattedDate = `${formattedMonth}/${formattedDay}/${targetYear}`;

    cy.get('#datepicker1').should('have.value', formattedDate);

    cy.log(`Selected date successfully: ${formattedDate}`);
  });
});
