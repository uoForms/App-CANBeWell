import LandingPage from '../../../pageObjects/landingPage';
import BodyPage from '../../../pageObjects/bodyPage';
import { bodyPageNoTopicTestSteps } from '../bodyPage-test-helper';

describe('Body Page Text Locale No Topic Modal', () => {
  const landingPage = new LandingPage();

  beforeEach(() => {
    cy.visit('/');
  });

  for (const user of [landingPage.user.patient, landingPage.user.provider]) {
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      for (const gender of ['m', 'f', 'tm', 'tf', 'nonbinary-m', 'nonbinary-f']) {
        const bodyPage = new BodyPage();
        const buttonInfoList = bodyPage.getButtonInfoListByGender(gender);
        for (const buttonInfo of buttonInfoList) {
          if (buttonInfo.buttonText === 'N/A') {
            it(`Run with setting: 18, ${gender}, ${locale}, ${user} ${buttonInfo.testId}`, () => {
              bodyPageNoTopicTestSteps(gender, 18, user, locale, buttonInfo.testId);
            });
            if (user === landingPage.user.provider) {
              it(`Run with setting: all ages, ${gender}, ${locale}, ${user} ${buttonInfo.testId}`, () => {
                bodyPageNoTopicTestSteps(gender, 'all ages', user, locale, buttonInfo.testId);
              });
            }
          }
        }
      }
    }
  }
});
