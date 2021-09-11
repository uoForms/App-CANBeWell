import devicesTestWrapper from '../../../support/devicesTestWrapper';
import LandingPage from '../../../pageObjects/landingPage';
import { bodyPageTestSteps, generateTestDataSet } from '../bodyPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTopic-EN.json');

devicesTestWrapper('Body Page Text Locale', () => {
  const landingPage = new LandingPage();
  const user = 'patient';
  const locale = landingPage.locale.en;

  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    const dataInputList = generateTestDataSet(topic, user);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const dataInput of dataInputList) {
      const {
        age, gender, text, subject, heading, buttonId,
      } = dataInput;
      if (text === 'n/a') {
        break;
      }
      it(`Run with setting: ${age}, ${gender}, ${locale}, ${user}`, () => {
        bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user);
      });
    }
  }
});
