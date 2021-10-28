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

  assertNoHeadingDisplayed() {
    cy.getTestId('test-details')
      .should('not.exist');
  }

  assertAtLeastOneHeadingDisplayed() {
    cy.getTestId('test-details')
      .should('exist');
  }

  assertAtLeastNHeadingDisplayed(n) {
    cy.getTestId('test-details')
      .should('have.length.at.least', n);
  }

  assertAtMostNHeadingDisplayed(n) {
    cy.getTestId('test-details')
      .should('have.length.at.most', n);
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
    // If any known link is broken, it goes here until it is fixed
    const skipList = [];
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

  assertSearchExists(locale) {
    cy.getTestId('searchBarInput')
      .should('be.visible')
      .assertAttribute('placeholder', this.localeFile[locale].test_search_bar_placeholder);
  }

  toggleNthHeading(n) {
    cy.getTestId('test-details')
      .eq(n)
      .click('top');
  }

  assertNthHeadingOpen(n) {
    cy.getTestId('test-details')
      .eq(n)
      .should('have.attr', 'open');
  }

  assertNthHeadingClosed(n) {
    cy.getTestId('test-details')
      .eq(n)
      .should('not.have.attr', 'open');
  }
}

export default TestPage;
