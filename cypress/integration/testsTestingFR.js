it('Tests-Patient-M-55-French', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="test"]').click()

    cy.contains('Avantages/inconvénients des tests')
    cy.contains('Analyse de la glycémie')
    cy.contains('Densité minérale osseuse')
    cy.contains('Dépistage des ITS')
    cy.contains('Dosage du cholestérol sanguin')
    cy.contains('Dépistage du cancer colorectal')
    cy.contains('Score de risque cardiaque')
    cy.contains('Tomodensitométrie (TDM) à faible dose')
    cy.clearCookies();
});

it('Tests-Provider-F-25-French', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="test"]').click()

    cy.contains('Avantages/inconvénients des tests')
    cy.contains('Analyse de la glycémie')
    cy.contains('Dépistage des ITS')
    cy.contains('Score de risque cardiaque')
    cy.contains('Test de Pap')
    cy.contains('Vaccination contre la rubéole et la varicelle')
    cy.clearCookies();
});