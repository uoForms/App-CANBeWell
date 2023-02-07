it('1. Body-Patient-M-25-Sun Exposure-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="sunExposureButton"]').click()
    cy.contains('Prévention du cancer de la peau').click()
    .clearCookies();
});

it('2. Body-Patient-M-55-Mental Health-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="brainGearButton"]').click()
    cy.contains('Général').click()
    cy.contains('Prévention du suicide et soutien').click()
    cy.contains('Premières Nations, Métis et Inuit').click()
    cy.contains('Ressources gratuites pour la pleine conscience').click()
    .clearCookies();
});

it('3. Body-Provider-M-85-Memory Problems-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="brainButton"]').click()
    cy.contains('Prévention de la démence').click()
    cy.contains('Tests offerts dans certaines situations').click()
    .clearCookies();
});

it('4. Body-Provider-F-25-Sleep-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="sleepButton"]').click()
    cy.contains('Sommeil')
    .clearCookies();
});

it('5. Body-Patient-F-55-Money Issues-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="moneyButton"]').click()
    cy.contains("Problèmes d'argent")
    .clearCookies();
});

it('6. Body-Patient-F-85-Covid 19-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="covidButton"]').click()
    cy.contains("Êtes-vous inquiet d'avoir la COVID-19?").click()
    cy.contains('Vaccins').click()
    cy.contains('Pour les aînés').click()
    cy.contains('Aide pour la nourriture, le logement, les finances').click()
    cy.contains('Populations autochtones').click()
    cy.contains('Multilingue').click()
    .clearCookies();
});

it('7. Body-Provider-TM-25-Physical Exam-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="examButton"]').click()
    cy.contains('Examen physique')
    cy.contains('Fréquence et type d’examens physiques').click()
    .clearCookies();
});

it('8. Body-Provider-TM-55-Physical Activity-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="phyActivityButton"]').click()
    cy.contains('Recommandations').click()
    cy.contains('Outils/Références').click()
    .clearCookies();
});

it('9. Body-Patient-TM-85-Vision-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="eyesButton"]').click()
    cy.contains('Discuter avec votre clinicien ou consulter un optométriste').click()
    .clearCookies();
});

it('10. Body-Patient-TF-25-Heart-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="heartButton"]').click()
    cy.contains('Informations générales').click()
    cy.contains('Être actif').click()
    cy.contains('Tabagisme').click()
    cy.contains('Tension artérielle').click()
    cy.contains('Cholestérol').click()
    cy.contains('Diabète').click()
    .clearCookies();
});

it('11. Body-Provider-TF-55-Immunization-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="immunizationButton"]').click()
    cy.contains('Recommandations').click()
    cy.contains('Vaccins contre la COVID').click()
    .clearCookies();
});

it('12. Body-Provider-TF-85-Aorta-French', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="fr-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="aortaButton"]').click()
    cy.contains("Dépistage de l'anevrysme de l'aorte abdominale chez les populations trans et non binaires.").click()
    .clearCookies();
});