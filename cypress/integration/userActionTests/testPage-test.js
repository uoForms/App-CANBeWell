import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import TestPage from '../../pageObjects/testPage';
import TopicPage from '../../pageObjects/topicPage';

devicesTestWrapper(
  'Test Page', () => {
    const landingPage = new LandingPage();
    const testPage = new TestPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: testPage.gender.male,
            Tgender: testPage.gender.transFemale,
            age: 18,
            user: 'patient',
          });
          landingPage.clickRedirectButton(locale);
          new BodyPage()
            .clickTopicTab();
        });
        it('Verify Tabs exist', () => {
          testPage.assertHThreeHeaders(locale);
        });
        it('Go to Body Page', () => {
          testPage.clickBodyTab();
          new BodyPage()
            .assertInstructionExists(locale);
        });

        it('Go to Topic Page', () => {
          testPage.clickTopicTab();
          new TopicPage()
            .assertAtLeastOneHeadingDisplayed();
        });
      });
    }
  },
);
