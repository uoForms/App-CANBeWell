import LandingPage from '../../../pageObjects/landingPage';
import { bodyPageTestSteps, generateTestDataSet } from '../bodyPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTopic-EN.json');

describe('Body Page Text Locale', () => {
  const landingPage = new LandingPage();
  const user = landingPage.user.patient;
  const locale = landingPage.locale.en;
  beforeEach(() => {
    cy.visit('/');
  });

  for (const topic of topics) {
    const dataInputList = generateTestDataSet(topic, user);
    for (const dataInput of dataInputList) {
      const {
        age, gender, text, subject, heading, buttonId,
      } = dataInput;
      if (text === 'n/a') {
        break;
      }
      it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${buttonId}`, () => {
        bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user);
      });
    }
  }
});
