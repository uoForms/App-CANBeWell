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
      for (const gender of [bodyPage.gender.male, bodyPage.gender.female, bodyPage.gender.nonBinary]) {
        for (const tGender of [bodyPage.gender.transMale, bodyPage.gender.transFemale]) {
          describe(`Locale: ${locale}`, () => {
            beforeEach(() => {
              cy.setupCookies({
                _onboarded: 'true',
                gender,
                Tgender: tGender,
                age: 18,
                user: bodyPage.user.patient,
              });
              landingPage.clickRedirectButton(locale);
            });

            it(`Verify Body Image ${gender} ${tGender}`, () => {
              if (gender === bodyPage.gender.male && tGender === bodyPage.gender.transFemale) {
                bodyPage.assertBodyImage(bodyPage.gender.male);
              } else if (gender === bodyPage.gender.female && tGender === bodyPage.gender.transMale) {
                bodyPage.assertBodyImage(bodyPage.gender.female);
              } else {
                bodyPage.assertBodyImage(bodyPage.gender.nonBinary);
              }
            });

            it('Close Modal', () => {
              cy.log('Skip, tested in the below tests');
            });

            it(`Verify All Buttons Clickable ${gender} ${tGender}`, () => {
              // Special case due to element covering
              const clickLocationDict = { lungsButton: 'bottomRight' };

              let buttonList;
              if (gender === bodyPage.gender.male && tGender === bodyPage.gender.transFemale) {
                buttonList = bodyPage.maleTfButtonInfoList;
              } else if (gender === bodyPage.gender.female && tGender === bodyPage.gender.transMale) {
                buttonList = bodyPage.femaleTmButtonInfoList;
              } else {
                buttonList = bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList;
              }
              let count = 0;
              for (const buttonInfo of buttonList) {
                count++;
                cy.getTestId(buttonInfo.testId)
                  .click(clickLocationDict[buttonInfo.testId] || 'center');
                const modal = new BodyModal();
                modal.assertModalExist();
                // Test different close methods since we are already here
                if (count % 3 === 0) {
                  modal.closeModalWithX();
                } else if (count % 3 === 1) {
                  modal.clickBackdropRight();
                } else {
                  modal.closeModalWithTextButton();
                }
                bodyPage.assertSelectedButton(locale, buttonInfo.localeId);
              }
            });
          });
        }
      }

      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: bodyPage.gender.male,
            Tgender: bodyPage.gender.transFemale,
            age: 18,
            user: bodyPage.user.patient,
          });
          landingPage.clickRedirectButton(locale);
        });

        it('Verify "Tap any body part or icon"', () => {
          bodyPage.assertInstructionExists(locale);
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

        it.only('Close Opened Topic Subjects', () => {
          // Use covid button as the test subject since the code is reused across modals
          cy.getTestId('covidbutton')
            .click();
          const modal = new BodyModal();
          cy.getTestId('topicSummary')
            .then((subjects) => {
              const subjectCount = Cypress.$(subjects).length;
              // eslint-disable-next-line no-var,vars-on-top
              for (var j = 0; j < Math.floor(subjectCount / 2); j++) {
                // Open them one by one
                modal.assertNthSubjectClosed(j);
                modal.toggleNthSubject(j);
                modal.assertNthSubjectOpen(j);
                modal.toggleNthSubject(j);
                modal.assertNthSubjectClosed(j);
              }
              // eslint-disable-next-line block-scoped-var
              const secondHalfStart = j > 4 ? j + 1 : 0;
              // Open all and close all
              for (let k = secondHalfStart; k < subjectCount; k++) {
                modal.assertNthSubjectClosed(k);
                modal.toggleNthSubject(k);
                modal.assertNthSubjectOpen(k);
              }
              for (let k = secondHalfStart; k < subjectCount; k++) {
                modal.assertNthSubjectOpen(k);
                modal.toggleNthSubject(k);
                modal.assertNthSubjectClosed(k);
              }
            });
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
