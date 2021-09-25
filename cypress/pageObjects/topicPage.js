import BasePage from './basePage';

class TopicPage extends BasePage {
  clickTopic(topic) {
    // handle a random new line in the topic...
    cy.contains(topic.replace('\n', ' '))
      .click();
  }
}

export default TopicPage;
