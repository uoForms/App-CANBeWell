import LandingPage from '../../../pageObjects/landingPage';
import testPageTestSteps from '../testPage-test-helper';
import { generateTestDataSet } from '../../textLocaleTests/testPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTest-FR.json');

describe('Test Page Analytics', () => {
  const landingPage = new LandingPage();
  const locale = landingPage.locale.fr;
  beforeEach(() => {
    cy.visit('/');
  });

  for (const user of [landingPage.user.patient, landingPage.user.provider]) {
    for (const topic of topics) {
      // Same data is generated as text locale tests, reuse the function
      const dataInputList = generateTestDataSet(topic, user);
      for (const dataInput of dataInputList) {
        const {
          age, gender, test,
        } = dataInput;
        it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${test}`, () => {
          testPageTestSteps(age, gender, test, user, locale);
        });
      }
    }
  }
});
