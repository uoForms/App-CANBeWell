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
            user: landingPage.user.provider,
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

            it('Default Value', () => {
              modal.assertValues(modal.user.provider, modal.gender.male, modal.gender.transFemale, 18, locale);
            });

            it('Default Value 2', () => {
              cy.setupCookies({
                _onboarded: 'true',
                gender: landingPage.gender.female,
                Tgender: landingPage.gender.transFemale,
                age: 50,
                user: landingPage.user.patient,
              });
              cy.reload();
              landingPage.clickRedirectButton(locale);
              pageInfo.pageFn();
              page.openPostConfigUpdateModal();
              modal.assertValues(modal.user.patient, modal.gender.female, modal.gender.transFemale, 50, locale);
            });

            it('Default Value 3', () => {
              cy.setupCookies({
                _onboarded: 'true',
                gender: landingPage.gender.nonBinary,
                Tgender: landingPage.gender.transMale,
                age: 80,
                user: landingPage.user.patient,
              });
              cy.reload();
              landingPage.clickRedirectButton(locale);
              pageInfo.pageFn();
              page.openPostConfigUpdateModal();
              modal.assertValues(modal.user.patient, modal.gender.nonBinary, modal.gender.transMale, 80, locale);
            });

            it('Default Value 4', () => {
              cy.setupCookies({
                _onboarded: 'true',
                gender: landingPage.gender.nonBinary,
                Tgender: landingPage.gender.transFemale,
                _all_ages_selected: true,
                age: 'all%20ages',
                user: landingPage.user.provider,
              });
              cy.reload();
              landingPage.clickRedirectButton(locale);
              pageInfo.pageFn();
              page.openPostConfigUpdateModal();
              modal.assertValues(modal.user.provider, modal.gender.nonBinary, modal.gender.transFemale, 'All ages', locale);
            });

            it('Update Value', () => {
              cy.document()
                .then((doc) => {
                  if (doc.documentElement.clientHeight === 414) {
                    // TODO: remove the skip once 435 is fixed
                    cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
                  } else {
                    modal.setValues(modal.user.patient, modal.gender.female, modal.gender.transMale, 50);
                    modal.assertValues(modal.user.patient, modal.gender.female, modal.gender.transMale, 50, locale);
                    modal.clickOk();
                    cy.checkCookies({
                      _onboarded: 'true',
                      gender: modal.gender.female,
                      Tgender: modal.gender.transMale,
                      age: 50,
                      user: modal.user.patient,
                    });
                  }
                });
            });

            it('Update Value 2', () => {
              cy.document()
                .then((doc) => {
                  if (doc.documentElement.clientHeight === 414) {
                    // TODO: remove the skip once 435 is fixed
                    cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
                  } else {
                    modal.setValues(undefined, undefined, undefined, 'all ages');
                    modal.assertValues(undefined, undefined, undefined, 'all ages', locale);
                    modal.clickOk();
                    cy.checkCookies({
                      _onboarded: 'true',
                      _all_ages_selected: true,
                      age: 'all%20ages',
                      user: landingPage.user.provider,
                    });
                  }
                });
            });

            //  Add test cases for :  error, close modal, question mark and more
            //   otherp pages with cookies change trigger events
          });
        }
      });
    }
  },
);
