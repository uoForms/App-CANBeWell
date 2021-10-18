import LandingPage from '../../../pageObjects/landingPage';
import BodyPage from '../../../pageObjects/bodyPage';
import { bodyPageNoTopicTestSteps, expectedSubjects } from '../bodyPage-test-helper';

describe('Body Page Text Locale No Topic Modal', () => {
  const landingPage = new LandingPage();

  beforeEach(() => {
    cy.visit('/');
  });
  // Join each topic by its fields and calculate what are the optimized test data is just to complex, bruce force here
  // eslint-disable-next-line no-plusplus
  for (let age = 18; age <= 38; age++) {
    for (const user of [landingPage.user.patient, landingPage.user.provider]) {
      for (const gender of ['m', 'f', 'tm', 'tf', 'nonbinary-m', 'nonbinary-f']) {
        for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
          const bodyPage = new BodyPage();
          const buttonInfoList = bodyPage.getButtonInfoListByGender(gender)
            .filter((info) => info.buttonText !== 'N/A');
          for (const buttonInfo of buttonInfoList) {
            if (expectedSubjects(age, gender, user, locale, buttonInfo.buttonText).length === 0) {
              it(`Run with setting: ${age}, ${gender}, ${locale}, ${user} ${buttonInfo.testId}`, () => {
                bodyPageNoTopicTestSteps(gender, age, user, locale, buttonInfo.testId);
              });
            }
          }
        }
      }
    }
  }
});
