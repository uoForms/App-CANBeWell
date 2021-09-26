import LandingPage from '../../../pageObjects/landingPage';
import BodyPage from '../../../pageObjects/bodyPage';
import { bodyPageNoTopicTestSteps } from '../bodyPage-test-helper';

const topics = require('../../../../src/JSONFolder/HtmlTopic-EN.json');

describe('Body Page Text Locale No Topic Modal', () => {
  const landingPage = new LandingPage();

  beforeEach(() => {
    cy.visit('/');
  });
  for (const user of ['patient', 'provider']) {
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      const buttonsFromTopics = new Set(topics.map((topic) => topic.Button));
      // tf is the same as tm, ignore
      for (const gender of ['m', 'f', 'tm']) {
        const bodyPage = new BodyPage();
        // eslint-disable-next-line no-nested-ternary
        const buttonInfoList = gender === 'm' ? bodyPage.maleTfButtonInfoList : (gender === 'f' ? bodyPage.femaleTmButtonInfoList : bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList);
        for (const buttonInfo of buttonInfoList) {
          if (buttonInfo.buttonText === 'N/A') {
            it(`Run with setting: 18, ${gender}, ${locale}, ${user} ${buttonInfo.testId}`, () => {
              bodyPageNoTopicTestSteps(gender, 18, user, locale, buttonInfo.testId);
            });
            if (user === 'provider') {
              it(`Run with setting: all ages, ${gender}, ${locale}, ${user} ${buttonInfo.testId}`, () => {
                bodyPageNoTopicTestSteps(gender, 'all ages', user, locale, buttonInfo.testId);
              });
            }
          }
        }
      }
    }
  }
  // for (const topic of topics) {
  //   const dataInputList = generateTestDataSet(topic, user);
  //   for (const dataInput of dataInputList) {
  //     const {
  //       age, gender, text, subject, heading, buttonId,
  //     } = dataInput;
  //     if (text === 'n/a') {
  //       break;
  //     }
  //     it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${buttonId}`, () => {
  //       bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user);
  //     });
  //   }
  // }
});
