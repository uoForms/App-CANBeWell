import { generateTestDataSet, testPageTestSteps } from '../testPage-test-helper';
import LandingPage from '../../../pageObjects/landingPage';

const topics = require('../../../../src/JSONFolder/HtmlTest-EN.json');

describe('Test Page Text Locale', () => {
  const landingPage = new LandingPage();
  const locale = landingPage.locale.en;
  beforeEach(() => {
    cy.visit('/');
  });

  for (const user of [landingPage.user.patient, landingPage.user.provider]) {
    for (const topic of topics) {
      const dataInputList = generateTestDataSet(topic, user);
      for (const dataInput of dataInputList) {
        const {
          age, gender, text, test,
        } = dataInput;
        it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${test}`, () => {
          testPageTestSteps(age, gender, text, test, user, locale);
        });
      }
    }
  }
});
