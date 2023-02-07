it('Topics-Show-All-Patient-F-85-French', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="topic"]').click()

    cy.contains('Afficher tous').click()
    cy.contains('Alimentation')
    cy.contains('Cancer colorectal')
    cy.contains('Cancer du sein')
    cy.contains('Chutes chez les personnes âgées')
    cy.contains('COVID-19')
    cy.contains('Diabète de type 2')
    cy.contains('Être actif')
    cy.contains('Examen physique')
    cy.contains('Exposition au soleil')
    cy.contains('Foie/Alcool/Drogues')
    cy.contains('Maladie cardiaque')
    cy.contains('Nutrition, Vitamines')
    cy.contains('Poumon')
    cy.contains("Problèmes d'argent")
    cy.contains('Santé des os')
    cy.contains('Santé mentale')
    cy.contains('Santé sexuelle et reproductive')
    cy.contains('Sommeil')
    cy.contains('Tension artérielle')
    cy.contains('Troubles de la mémoire/Démence')
    cy.contains('Vaccination')
    cy.contains('Vision')
    cy.clearCookies();
});

it('Topics-Show-Top-10-Provider-TM-55-French', () => {
    cy.visit('http://localhost:3000/#');
    cy.get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="topic"]').click()
    
    cy.contains('Dix premiers').click()
    cy.contains('Activité physique')
    cy.contains('Alimentation')
    cy.contains('Vaccination')
    cy.contains('Tension artérielle')
    cy.contains('Maladie cardiaque')
    cy.contains('Diabète de type 2')
    cy.contains('Cancer du sein')
    cy.contains('Cancer colorectal')
    cy.contains('Santé sexuelle et reproductive')
    cy.contains('Poumon')
    cy.clearCookies();
});