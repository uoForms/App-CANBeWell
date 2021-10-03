import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import TestPage from '../../pageObjects/testPage';
import TopicPage from '../../pageObjects/topicPage';
import BodyPage from '../../pageObjects/bodyPage';
import PostConfigUpdateModal from '../../pageObjects/postConfigUpdateModal';

devicesTestWrapper(
  'Post Config Update Modal', () => {
    const landingPage = new LandingPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is the default config, update will be made through the test
          cy.setupCookies({
            _onboarded: 'true',
            gender: landingPage.gender.male,
            Tgender: landingPage.gender.transFemale,
            age: 18,
            user: 'provider',
          });
          landingPage.clickRedirectButton(locale);
        });
        const pageList = [
          {
            pageFn: () => {
            },
            instance: new BodyPage(),
          },
          { pageFn: new BodyPage().clickTopicTab, instance: new TopicPage() },
          { pageFn: new BodyPage().clickTestTab, instance: new TestPage() },
        ];
        for (const pageInfo of pageList) {
          const page = pageInfo.instance;

          describe(page.constructor.name, () => {
            const modal = new PostConfigUpdateModal();
            beforeEach(() => {
              pageInfo.pageFn();
              page.openPostConfigUpdateModal();
            });

            it('Open Modal', () => {
              modal.assertModalExist();
            });

            it('Text Display', () => {
              modal.assertAllDisplayText(locale);
            });

            //  Add test cases for : default values, cookies change, error, close modal, question mark and more
            //   otherp pages with cookies change trigger events
          });
        }
      });
    }
  },
);
