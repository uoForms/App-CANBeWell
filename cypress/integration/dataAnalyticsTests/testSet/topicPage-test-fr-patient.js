import LandingPage from '../../../pageObjects/landingPage';
import { generateTestDataSet, topicPageTestSteps } from '../topicPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTopic-FR.json');

describe('Topic Page Analytics', () => {
  const landingPage = new LandingPage();
  const user = landingPage.user.patient;
  const locale = landingPage.locale.fr;
  beforeEach(() => {
    cy.visit('/');
  });
  const tempDict = {};
  for (const topic of topics) {
    const dataInputList = generateTestDataSet(topic, user);
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
