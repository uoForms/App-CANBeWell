it('1. Body-Patient-M-25-Sun Exposure-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="sunExposureButton"]').click()
    cy.contains('Stop Skin Cancer').click()
    .clearCookies();
});

it('2. Body-Patient-M-55-Mental Health-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="brainGearButton"]').click()
    cy.contains('General').click()
    cy.contains('Suicide prevention and other support').click()
    cy.contains('First Nations, Métis, Inuit').click()
    cy.contains('Free resources to practice mindfulness').click()
    .clearCookies();
});

it('3. Body-Provider-M-85-Memory Problems-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="brainButton"]').click()
    cy.contains('Prevention of Dementia').click()
    cy.contains('Testing available in certain situations').click()
    .clearCookies();
});

it('4. Body-Provider-F-25-Sleep-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="sleepButton"]').click()
    cy.contains('Sleep')
    .clearCookies();
});

it('5. Body-Patient-F-55-Money Issues-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="moneyButton"]').click()
    cy.contains('Money Issues')
    .clearCookies();
});

it('6. Body-Patient-F-85-Covid 19-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="covidButton"]').click()
    cy.contains('Are you worried you have COVID-19?').click()
    cy.contains('Vaccines').click()
    cy.contains('Elderly').click()
    cy.contains('Indigenous').click()
    cy.contains('Different languages').click()
    .clearCookies();
});

it('7. Body-Provider-TM-25-Physical Exam-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="examButton"]').click()
    cy.contains('Physical Exam')
    cy.contains('Frequency and type of physical exam').click()
    .clearCookies();
});

it('8. Body-Provider-TM-55-Physical Activity-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="phyActivityButton"]').click()
    cy.contains('Recommendations').click()
    cy.contains('References/Handouts').click()
    .clearCookies();
});

it('9. Body-Patient-TM-85-Vision-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthfemaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="eyesButton"]').click()
    cy.contains('Discuss with your primary care provider or see an optometrist').click()
    .clearCookies();
});

it('10. Body-Patient-TF-25-Heart-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('25')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="heartButton"]').click()
    cy.contains('Be active').click()
    cy.contains('Smoking').click()
    cy.contains('Blood pressure').click()
    cy.contains('Cholesterol').click()
    cy.contains('Diabetes').click()
    .clearCookies();
});

it('11. Body-Provider-TF-55-Immunization-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('55')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="immunizationButton"]').click()
    cy.contains('Recommendations').click()
    cy.contains('COVID vaccines').click()
    .clearCookies();
});

it('12. Body-Provider-TF-85-Aorta-English', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('85')
    .get('[test-id="femaleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="aortaButton"]').click()
    cy.contains('Screening for AAA in trans and non binary patients').click()
    .clearCookies();
});