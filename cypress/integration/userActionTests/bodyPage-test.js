import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import TestPage from '../../pageObjects/testPage';
import TopicPage from '../../pageObjects/topicPage';
import PostConfigUpdateModal from '../../pageObjects/postConfigUpdateModal';
import BodyModal from '../../pageObjects/bodyModal';

devicesTestWrapper(
  'Body Page', () => {
    const landingPage = new LandingPage();
    const bodyPage = new BodyPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: bodyPage.gender.male,
            Tgender: bodyPage.gender.transFemale,
            age: 18,
            user: 'patient',
          });
          landingPage.clickRedirectButton(locale);
        });

        it('Update Config Triggers Content Update', () => {
          cy.document()
            .then((doc) => {
              if (doc.documentElement.clientHeight === 414) {
                // TODO: remove the skip once 435 is fixed
                cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
              } else {
                bodyPage.openPostConfigUpdateModal();
                const modal = new PostConfigUpdateModal();
                modal.setValues(undefined, bodyPage.gender.nonBinary, undefined, undefined);
                modal.clickOk();
                bodyPage.assertBodyImage(bodyPage.gender.nonBinary);
              }
            });
        });

        it('Update Config Triggers Content Update 2', () => {
          cy.document()
            .then((doc) => {
              if (doc.documentElement.clientHeight === 414) {
                // TODO: remove the skip once 435 is fixed
                cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
              } else {
                bodyPage.openPostConfigUpdateModal();
                const modal = new PostConfigUpdateModal();
                modal.setValues(undefined, bodyPage.gender.female, bodyPage.gender.transMale, undefined);
                modal.clickOk();
                bodyPage.assertBodyImage(bodyPage.gender.female);
              }
            });
        });

        it('Update Config Triggers Content Update 3', () => {
          cy.document()
            .then((doc) => {
              if (doc.documentElement.clientHeight === 414) {
                // TODO: remove the skip once 435 is fixed
                cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
              } else {
                bodyPage.openPostConfigUpdateModal();
                const modal = new PostConfigUpdateModal();
                modal.setValues(bodyPage.user.provider, undefined, undefined, undefined);
                modal.clickOk();
                cy.getTestId('heartButton')
                  .click();
                const bodyModal = new BodyModal();
                // TODO: include fr when heart translation is in
                bodyModal.assertContainSubject('Physical activity');
              }
            });
        });

        it('Update Config Triggers Content Update 4', () => {
          cy.document()
            .then((doc) => {
              if (doc.documentElement.clientHeight === 414) {
                // TODO: remove the skip once 435 is fixed
                cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
              } else {
                bodyPage.openPostConfigUpdateModal();
                const modal = new PostConfigUpdateModal();
                modal.setValues(undefined, undefined, undefined, 150);
                modal.clickOk();
                cy.getTestId('fallsButton')
                  .click();
                const bodyModal = new BodyModal();
                bodyModal.assertHaveAtLeastOneSubject();
              }
            });
        });

        it('Verify Tabs exist', () => {
          bodyPage.assertThreeHeaders(locale);
        });

        it('Go to Test Page', () => {
          bodyPage.clickTestTab();
          new TestPage()
            .assertAtLeastOneHeadingDisplayed();
        });

        it('Go to Topic Page', () => {
          bodyPage.clickTopicTab();
          new TopicPage()
            .assertAtLeastOneHeadingDisplayed();
        });
      });
    }
  },
);
