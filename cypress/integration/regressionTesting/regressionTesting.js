it('icanbewell', () => {
    cy.visit('http://localhost:3000/#');
    cy.wait(3000);
    cy.get('[test-id="en-redirect-button"]').click();
    cy.wait(3000);
    cy.get('[test-id="providerLabel"]').click();
    cy.wait(3000);
    cy.get('[test-id="ageForm"]').type('18');
    cy.wait(3000);
    cy.get('[test-id="maleRadioLabel"]').click();
    cy.wait(3000);
    cy.get('[test-id="birthMaleLabel"]').click();
    cy.wait(3000);
    cy.get('[test-id="okButtonTop"]').click();
    cy.wait(3000);
    cy.get('[test-id="body"]').click();
    cy.wait(3000);
    cy.get('[test-id="aortaButton"]').click();
    cy.contains('Screen men age 65-80 with ultrasound once').click()
    cy.contains('CTFPHC 2017')
    cy.wait(3000);
    cy.request('https://canadiantaskforce.ca/guidelines/published-guidelines/abdominal-aortic-aneurysm/').its('status').should('equal', 200)
    cy.clearCookies();
});