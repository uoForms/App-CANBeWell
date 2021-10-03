import BasePage from './basePage';

class TopicPage extends BasePage {
  clickTopic(topic) {
    // handle a random new line in the topic...
    cy.contains(topic.replace('\n', ' '))
      .click();
  }

  assertAtLeastOneHeadingDisplayed() {
    cy.getTestId('topicRow')
      .should('exist');
  }

  assertNoHeadingDisplayed() {
    cy.getTestId('topicRow')
      .should('not.exist');
  }

  assertAtLeastTwoHeadingDisplayed() {
    cy.getTestId('topicRow')
      .should('have.length.at.least', 2);
  }

  assertHeadings(expectedHeadings, cacheId) {
    function helper() {
      // https://glebbahmutov.com/cypress-examples/6.5.0/recipes/get-text-list.html
      cy.getTestId('topicRow')
        .then(($els) => (
          Cypress.$.makeArray($els)
            .map((el) => el.innerText)
        ))
        .should('deep.equalInAnyOrder', Array.from(expectedHeadings));
    }

    if (Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTopicHeadings === undefined) {
      helper();
      Object.defineProperty(Cypress.mocha.getRunner().suite.ctx, 'assertedConfigsForTopicHeadings', {
        value: [cacheId],
        writable: true,
      });
    } else if (!Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTopicHeadings.includes(cacheId)) {
      helper();
      Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTopicHeadings.push(cacheId);
    } else {
      cy.log('This config is already checked, skip');
    }
  }

  assertSearchExists(locale) {
    cy.getTestId('searchBarInput')
      .should('be.visible')
      .should('have.attr', 'placeholder', this.localeFile[locale].topic_search_bar_placeholder);
  }

  openNthHeading(n) {
    cy.getTestId('topicRow')
      .eq(n)
      .click();
  }
}

export default TopicPage;
