Cypress.Commands.add('assertVisibleAndContainText', {
  prevSubject: 'element',
}, (subject, text) => {
  cy.wrap(subject)
    .should('be.visible')
    .should('contain', text);
});

Cypress.Commands.add('assertAttribute', {
  prevSubject: 'element',
}, (subject, attrKey, attrValue) => {
  cy.wrap(subject)
    .should('have.attr', attrKey, attrValue);
});

Cypress.Commands.add('assertUrl', (url, requestType = 'FETCH', expectedStatusCode = 200) => {
  cy.request(requestType, url)
    .should((res) => {
      expect(res.status).to.eq(expectedStatusCode);
    });
});

Cypress.Commands.add('assertImageVisibleWithSource', {
  prevSubject: 'element',
}, (subject, source) => {
  cy.wrap(subject)
    .should('be.visible')
    .assertAttribute('src', source);
});