it('Tests-Patient-M-55-English', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="test"]').click()

    cy.contains('Pros/ Cons of tests')
    cy.contains('Bone mineral density')
    cy.contains('Cholesterol blood test')
    cy.contains('Colorectal cancer screening')
    cy.contains('Heart risk score')
    cy.contains('Low dose CT scan')
    cy.contains('STI tests')
    cy.contains('Sugar blood test')
    cy.clearCookies();
});

it('Tests-Provider-F-25-English', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="test"]').click()

    cy.contains('Pros/ Cons of tests')
    cy.contains('Heart risk score')
    cy.contains('Pap test')
    cy.contains('Rubella and Varicella immunity')
    cy.contains('STI tests')
    cy.contains('Sugar blood test')
    cy.clearCookies();
});