import LandingPage from '../../../pageObjects/landingPage';
import testPageTestSteps from '../testPage-test-helper';
import { generateTestDataSet } from '../../textLocaleTests/testPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTest-EN.json');

describe('Test Page Analytics', () => {
  const locale = new LandingPage().locale.en;
  beforeEach(() => {
    cy.visit('/');
  });

  for (const user of ['patient', 'provider']) {
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
