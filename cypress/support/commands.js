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
  if (Cypress.mocha.getRunner().suite.ctx.checkedUrls === undefined) {
    cy.request({
      url,
      method: requestType,
      failOnStatusCode: false,
    })
      .should((res) => {
        expect(res.status).to.eq(expectedStatusCode);
      });
    Object.defineProperty(Cypress.mocha.getRunner().suite.ctx, 'checkedUrls', {
      value: [url],
      writable: true,
    });
  } else if (!Cypress.mocha.getRunner().suite.ctx.checkedUrls.includes(url)) {
    cy.request({
      url,
      method: requestType,
      failOnStatusCode: false,
    })
      .should((res) => {
        expect(res.status).to.eq(expectedStatusCode);
      });
    Cypress.mocha.getRunner().suite.ctx.checkedUrls.push(url);
  } else {
    cy.log('The url is already checked in a previous test');
  }
});

Cypress.Commands.add('assertImageVisibleWithSource', {
  prevSubject: 'element',
}, (subject, source) => {
  cy.wrap(subject)
    .should('be.visible')
    .assertAttribute('src', source);
});

Cypress.Commands.add('setupCookies', (cookies) => {
  for (const cookie in cookies) {
    cy.setCookie(cookie, JSON.stringify(cookies[cookie])
      .replaceAll('"', ''));
  }
});
