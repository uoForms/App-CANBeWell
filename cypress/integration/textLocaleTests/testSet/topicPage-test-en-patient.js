import LandingPage from '../../../pageObjects/landingPage';
import { generateTestDataSet, topicPageTestSteps } from '../topicPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTopic-EN.json');

describe('Topic Page Text Locale', () => {
  const landingPage = new LandingPage();
  const user = 'patient';
  const locale = landingPage.locale.en;
  beforeEach(() => {
    cy.visit('/');
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    const dataInputList = generateTestDataSet(topic, user);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const dataInput of dataInputList) {
      const {
        age, gender, text, subject, heading,
      } = dataInput;
      if (text === 'n/a') {
        break;
      }
      it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${heading}`, () => {
        topicPageTestSteps(age, gender, text, subject, heading, locale, user);
      });
    }
  }
});
