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

Cypress.Commands.add('assertUrl', (url, requestType = 'GET', expectedStatusCode = 200) => {
  cy.request({
    url,
    method: requestType,
    failOnStatusCode: false,
  })
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

Cypress.Commands.add('setupCookies', (cookies) => {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const cookie in cookies) {
    cy.setCookie(cookie, JSON.stringify(cookies[cookie])
      .replaceAll('"', ''));
  }
});
