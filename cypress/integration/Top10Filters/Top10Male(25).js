/* eslint-disable semi */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable newline-per-chained-call */
/* eslint-disable indent */
// check the main website url

it('icanbewell', () => {
    cy.visit('https://canbewell-2022-test.web.app/#');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get('[test-id="en-redirect-button"]').click()
    cy.wait(3000);
    cy.get('[test-id="ageForm"]').type('25');
    cy.wait(3000);
    cy.get('[test-id="femaleRadioLabel"]').click();
    cy.wait(3000);
    cy.get('[test-id="birthfemaleLabel"]').click()
    cy.wait(3000);
    cy.get('[test-id="okButtonTop"]').click()
    cy.wait(3000);
  
    cy.get('[test-id="topic"]').click();
    cy.contains('Be Active');
    cy.wait(3000);
    cy.contains('Nutrition');
    cy.wait(3000);
    cy.contains('Immunization');
    cy.wait(3000);
    cy.contains('Diabetes Type 2'); 
    cy.wait(3000);
    cy.contains('Sexual and reproductive health');
    cy.wait(3000);
    cy.contains('Liver/Alcohol/Drugs');
    cy.wait(3000);
    cy.contains('Mental health');
    cy.wait(3000);
    cy.contains('Sun Exposure');
    cy.wait(3000);
    cy.contains('Nutrition, Vitamins');
    cy.wait(3000);
    cy.get('[test-id="postConfigUpdateModalOpenButton"]').click()
    cy.wait(3000);
    cy.clearCookies();
  });
  