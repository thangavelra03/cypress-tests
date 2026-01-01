

describe("OTP Login Automation", () => {
  it("should login using OTP automatically", () => {
    const testEmail = `thangavel@${Cypress.env("MAILOSAUR_SERVER_ID")}.mailosaur.net`;
    cy.log("Test email: " + testEmail);

   cy.visit("https://practice.expandtesting.com/otp-login", { 
  timeout: 120000,      // overall timeout
  onLoad: (contentWindow) => {
    // skip waiting for full page load
  },
  failOnStatusCode: false // optional if page sometimes returns non-200
});

    cy.get("input#email").type(testEmail);
    cy.get("#btn-send-otp").click();

    cy.getOtpCode(testEmail).then((otp) => {
      cy.log("OTP received: " + otp);
      cy.get("input[name='otp']").type(otp);
      cy.get("#btn-send-verify").click();
      cy.contains("Hi, Guest").should("be.visible");
      cy.contains("You logged into a secure area!").should("be.visible");
    });
  });
});

