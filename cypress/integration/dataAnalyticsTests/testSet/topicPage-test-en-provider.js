import LandingPage from '../../../pageObjects/landingPage';
import { generateTestDataSet, topicPageTestSteps } from '../topicPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTopic-EN.json');

describe('Topic Page Analytics', () => {
  const landingPage = new LandingPage();
  const user = 'provider';
  const locale = landingPage.locale.en;
  beforeEach(() => {
    cy.visit('/');
  });
  const tempDict = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    const dataInputList = generateTestDataSet(topic, user);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const dataInput of dataInputList) {
      const {
        age, gender, heading,
      } = dataInput;

      const stringify = `${age}${gender}${heading}`;
      if (!(stringify in tempDict)) {
        tempDict[stringify] = true;
        it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${heading}`, () => {
          topicPageTestSteps(age, gender, heading, user, locale);
        });
      }
    }
  }
});
