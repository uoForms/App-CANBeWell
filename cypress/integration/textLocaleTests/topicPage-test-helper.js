import { assertTopicModal, cookiesSetupAndAccessBodyPage, readTopicJsonData } from './base-test-helper';
import TopicPage from '../../pageObjects/topicPage';

function generateTestDataSet(props, user) {
  const {
    heading, subject, ageSet, genderSet, text,
  } = readTopicJsonData(props, user);
  const dataSet = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const currentAge of ageSet) {
    // eslint-disable-next-line no-restricted-syntax
    for (const currentGender of genderSet) {
      dataSet.push({
        age: currentAge,
        gender: currentGender,
        text,
        subject,
        heading,
      });
    }
  }
  return dataSet;
}

function topicPageTestSteps(age, gender, text, subject, heading, locale, user) {
  const topicPage = new TopicPage();
  cookiesSetupAndAccessBodyPage(topicPage, gender, age, user, locale);
  cy.getTestId('topic')
    .click();
  topicPage.clickTopic(heading.replace('\n', ' '));
  // The modals for body and topic pages are exact the same (copy/pasted code). Reusing body modal here.
  assertTopicModal(heading, subject, text, age, user, topicPage);
}

export {
  generateTestDataSet,
  topicPageTestSteps,
};
