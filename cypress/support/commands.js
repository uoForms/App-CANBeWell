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

Cypress.Commands.add('setupCookies', (cookies) => {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const cookie in cookies) {
    cy.setCookie(cookie, cookies[cookie]);
  }
});

Cypress.Commands.add('checkGAQueryParams', { prevSubject: true }, (subject, queryDict) => {
  const params = new URLSearchParams(new URL(subject).search);
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in queryDict) {
    if (queryDict[key] !== null) {
      expect(params.get(key)).to.equal(queryDict[key]);
    } else {
      expect(params.has(key)).to.be.true;
    }
  }
});
