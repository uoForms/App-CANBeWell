import BasePage from './basePage';

class TestPage extends BasePage {
  assertAndClickTest(subject) {
    // eslint-disable-next-line no-irregular-whitespace
    // For whatever reason, there is   in the translation file...
    if (subject.includes(' ')) {
      cy.get('[test-id=test-summary]')
        .filter(`:contains("${subject.replace(' ;', '\u00a0')}")`)
        .should('exist')
        .click();
    } else {
      cy.contains('[test-id="test-summary"]', subject)
        .should('exist')
        .click();
    }
  }

  assertAtLeastOneHeadingDisplayed() {
    cy.getTestId('test-details')
      .should('exist');
  }

  assertHeadings(expectedHeadings, cacheId) {
    function helper() {
      // https://glebbahmutov.com/cypress-examples/6.5.0/recipes/get-text-list.html
      cy.getTestId('test-summary')
        .then(($els) => (
          Cypress.$.makeArray($els)
            .map((el) => el.innerText)
        ))
        .should('deep.equalInAnyOrder', Array.from(expectedHeadings));
    }

    if (Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTestHeadings === undefined) {
      helper();
      Object.defineProperty(Cypress.mocha.getRunner().suite.ctx, 'assertedConfigsForTestHeadings', {
        value: [cacheId],
        writable: true,
      });
    } else if (!Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTestHeadings.includes(cacheId)) {
      helper();
      Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTestHeadings.push(cacheId);
    } else {
      cy.log('This config is already checked, skip');
    }
  }

  assertLineInDropdown(line) {
    // TODO: this list contains known broken links. Once they are addressed, they should be removed from this list
    const skipList = [
      'https://osteoporosis.ca/about-the-disease/diagnosis/why-should-i-get-tested/',
    ];
    if (line.includes('[[')) {
      let parts = line.split(/[[\]]/g);
      parts = parts.filter((part) => part.length > 0);
      for (const part of parts) {
        if (part.includes('http')) {
          const [text, url] = part.split(';');
          cy.getTestId('test-details')
            .get('[open]')
            .should('include.text', text.trim());
          cy.get(`[href="${url}"]`)
            .within(() => {
              cy.get('font')
                .assertAttribute('color', 'Yellow');
            })
            .should('contain', text.trim());
          cy.get(`[href="${url}"] font`)
            .parent('a')
            .assertAttribute('target', '_blank');
          if (skipList.includes(url.trim())) {
            console.log(`Skipping the known broken url: ${url})`);
          } else {
            cy.assertUrl(url.trim());
          }
        } else {
          cy.getTestId('test-details')
            .get('[open]')
            .should('include.text', part.trim());
        }
      }
    } else {
      cy.getTestId('test-details')
        .get('[open]')
        .should('include.text', line.trim());
    }
  }
}

export default TestPage;
