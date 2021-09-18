import BasePage from './basePage';

class TopicPage extends BasePage {
  clickTopic(topic) {
    cy.contains(topic)
      .click();
  }
}

export default TopicPage;
