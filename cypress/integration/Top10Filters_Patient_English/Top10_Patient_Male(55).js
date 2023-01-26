it('icanbewell', () => {
    cy.visit('http://localhost:3000/#');
    cy.wait(3000);
    cy.get('[test-id="en-redirect-button"]').click();
    cy.wait(3000);
    cy.get('[test-id="ageForm"]').type('55');
    cy.wait(3000);
    cy.get('[test-id="maleRadioLabel"]').click();
    cy.wait(3000);
    cy.get('[test-id="birthMaleLabel"]').click();
    cy.wait(3000);
    cy.get('[test-id="okButtonTop"]').click();
    cy.wait(3000);

    cy.get('[test-id="topic"]').click();
    cy.contains('Be Active');
    cy.wait(3000);
    cy.contains('Nutrition');
    cy.wait(3000);
    cy.contains('Immunization');
    cy.wait(3000);
    cy.contains('Blood Pressure');
    cy.wait(3000);
    cy.contains('Heart Disease');
    cy.wait(3000);
    cy.contains('Diabetes Type 2');
    cy.wait(3000);
    cy.contains('Colorectal Cancer');
    cy.wait(3000);
    cy.contains('Sexual and Reproductive Health');
    cy.wait(3000);
    cy.contains('Lung');
    cy.wait(3000);
    cy.contains('Bone Health');
    cy.wait(3000);
    cy.clearCookies();
});