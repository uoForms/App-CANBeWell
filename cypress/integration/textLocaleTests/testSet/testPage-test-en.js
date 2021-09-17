import { generateTestDataSet, testPageTestSteps } from '../testPage-test-helper';
import LandingPage from '../../../pageObjects/landingPage';

const topics = require('../../../../src/JSONFolder/HtmlTest-EN.json');

describe('Test Page Text Locale', () => {
  const locale = new LandingPage().locale.en;
  beforeEach(() => {
    cy.visit('/');
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const user of ['patient', 'provider']) {
    // eslint-disable-next-line no-restricted-syntax
    for (const topic of topics) {
      const dataInputList = generateTestDataSet(topic, user);
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
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
