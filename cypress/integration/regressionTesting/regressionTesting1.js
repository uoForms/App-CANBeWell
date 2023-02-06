it('HtmlTopic-EN-2 (2023-01-31)', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('18')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="aortaButton"]').click()
    cy.contains('Screen men age 65-80 with ultrasound once').click()
    cy.contains('CTFPHC 2017')
    .request('https://canadiantaskforce.ca/guidelines/published-guidelines/abdominal-aortic-aneurysm/').its('status').should('equal', 200)
    .clearCookies();
});

it('HtmlTopic-EN-3', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="patientLabel"]').click()
    .get('[test-id="ageForm"]').type('18')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="aortaButton"]').click()
    cy.contains('Between ages 65 and 80 ask your provider about an ultrasound to detect an AAA').click()
    cy.contains('• Your provider may ask for an ultrasound of your belly')
    cy.contains('to detect a bulge in the main blood vessel')
    cy.contains('(the bulge is nicknamed AAA for short or Abdominal Aortic Aneurysm)')
    cy.contains('• If the bulge grows it can burst and cause death.')
    cy.contains('• Recommendation')
    .request('https://canadiantaskforce.ca/guidelines/published-guidelines/abdominal-aortic-aneurysm/').its('status').should('equal', 200)
    .clearCookies();
});

it('HtmlTopic-EN-4', () => {
    cy.visit('http://localhost:3000/#')
    .get('[test-id="en-redirect-button"]').click()
    .get('[test-id="providerLabel"]').click()
    .get('[test-id="ageForm"]').type('81')
    .get('[test-id="maleRadioLabel"]').click()
    .get('[test-id="birthMaleLabel"]').click()
    .get('[test-id="okButtonTop"]').click()
    .get('[test-id="body"]').click()
    .get('[test-id="aortaButton"]').click()
    cy.contains('Screen men age 65-80 with ultrasound once').click()
    cy.contains('CTFPHC 2017')
    .request('https://canadiantaskforce.ca/guidelines/published-guidelines/abdominal-aortic-aneurysm/').its('status').should('equal', 200)

    cy.contains('Screening not recommended for men older than 80 years old').click()
    cy.contains('Weak recommendation by CTFPHC 2017')
    .request('https://canadiantaskforce.ca/guidelines/published-guidelines/abdominal-aortic-aneurysm/').its('status').should('equal', 200)
    .clearCookies();
});