it('Topics-Show-All-Patient-F-85-English', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="topic"]').click()
    cy.contains('Show All').click()

    cy.contains('Be Active')
    cy.contains('Blood Pressure')
    cy.contains('Bone Health')
    cy.contains('Breast Cancer')
    cy.contains('Colorectal Cancer')
    cy.contains('COVID-19')
    cy.contains('Diabetes Type 2')
    cy.contains('Falls in the Elderly')
    cy.contains('Heart Disease')
    cy.contains('Immunization')
    cy.contains('Liver/Alcohol/Drugs')
    cy.contains('Lung')
    cy.contains('Memory Problems/Dementia')
    cy.contains('Mental Health')
    cy.contains('Money Issues')
    cy.contains('Nutrition')
    cy.contains('Nutrition, Vitamins')
    cy.contains('Physical Exam')
    cy.contains('Sexual and Reproductive Health')
    cy.contains('Sleep')
    cy.contains('Sun Exposure')
    cy.contains('Vision')
    cy.clearCookies();
});

it('Topics-Show-Top-10-Provider-TM-55-English', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="topic"]').click()
    cy.contains('Show Top 10').click()
    
    cy.contains('Physical Activity')
    cy.contains('Nutrition')
    cy.contains('Immunization')
    cy.contains('Blood Pressure')
    cy.contains('Heart Disease')
    cy.contains('Diabetes Type 2')
    cy.contains('Breast Cancer')
    cy.contains('Colorectal Cancer')
    cy.contains('Sexual and Reproductive Health')
    cy.contains('Lung')
    cy.clearCookies();
});