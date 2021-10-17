import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import InitConfigModal from '../../pageObjects/InitConfigModal';

devicesTestWrapper(
  'Init Config Modal', () => {
    const landingPage = new LandingPage();
    // const page = new BodyPage();

    const modal = new InitConfigModal();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          landingPage.clickRedirectButton(locale);
        });

        it('Open Modal', () => {
          modal.assertModalExist();
        });

        it('Text Display', () => {
          modal.assertAllDisplayText(locale);
        });

        it('Default Value', () => {
          modal.assertDefaultValue();
        });

        it('Update Value', () => {
          modal.setValues(modal.user.patient, modal.gender.female, modal.gender.transMale, 50);
          modal.assertValues(modal.user.patient, modal.gender.female, modal.gender.transMale, 50, locale);
          modal.clickTopOk();
          cy.checkCookies({
            _onboarded: 'true',
            gender: modal.gender.female,
            Tgender: modal.gender.transMale,
            age: 50,
            //  TODO: add user cookie when https://github.com/uoForms/App-CANBeWell/issues/445 is fixed
          });
        });

        it('Update Value 2', () => {
          modal.setValues(modal.user.provider, modal.gender.male, modal.gender.transMale, 'all ages');
          modal.assertValues(modal.user.provider, modal.gender.male, modal.gender.transMale, 'all ages', locale);
          modal.clickBottomOk();
          cy.checkCookies({
            _onboarded: 'true',
            _all_ages_selected: true,
            age: 'all%20ages',
            user: landingPage.user.provider,
            gender: modal.gender.male,
            Tgender: modal.gender.transMale,
          });
        });

        it('Update Value 3', () => {
          modal.setValues(modal.user.provider, modal.gender.nonBinary, modal.gender.transMale, 25);
          modal.assertValues(modal.user.provider, modal.gender.nonBinary, modal.gender.transMale, 25, locale);
          modal.clickBottomOk();
          cy.checkCookies({
            _onboarded: 'true',
            age: 25,
            user: landingPage.user.provider,
            gender: modal.gender.nonBinary,
            Tgender: modal.gender.transMale,
          });
        });
        //
        // it('Error', () => {
        //   cy.document()
        //     .then((doc) => {
        //       if (doc.documentElement.clientHeight === 414) {
        //         // TODO: remove the skip once 435 is fixed
        //         cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
        //       } else {
        //         modal.setValues(undefined, undefined, undefined, '160', true);
        //         modal.clickOk(false);
        //         modal.assertAgeErrorMessage(locale);
        //       }
        //     });
        // });
        //
        // it('Error 2', () => {
        //   cy.document()
        //     .then((doc) => {
        //       if (doc.documentElement.clientHeight === 414) {
        //         // TODO: remove the skip once 435 is fixed
        //         cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
        //       } else {
        //         modal.setValues(undefined, undefined, undefined, '6', true);
        //         modal.clickOk(false);
        //         modal.assertAgeErrorMessage(locale);
        //       }
        //     });
        // });
        //
        // it('Error 3', () => {
        //   cy.document()
        //     .then((doc) => {
        //       if (doc.documentElement.clientHeight === 414) {
        //         // TODO: remove the skip once 435 is fixed
        //         cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
        //       } else {
        //         modal.setValues(undefined, undefined, undefined, '%**&', true);
        //         modal.clickOk(false);
        //         modal.assertAgeErrorMessage(locale);
        //       }
        //     });
        // });
        //
        // it('Error 4', () => {
        //   cy.document()
        //     .then((doc) => {
        //       if (doc.documentElement.clientHeight === 414) {
        //         // TODO: remove the skip once 435 is fixed
        //         cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
        //       } else {
        //         modal.setValues(undefined, undefined, undefined, 'aksjhdkjas', true);
        //         modal.clickOk(false);
        //         modal.assertAgeErrorMessage(locale);
        //       }
        //     });
        // });
        //
        // it('Error and Recover', () => {
        //   cy.document()
        //     .then((doc) => {
        //       if (doc.documentElement.clientHeight === 414) {
        //         // TODO: remove the skip once 435 is fixed
        //         cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
        //       } else {
        //         modal.setValues(undefined, undefined, undefined, 'aksjhdkjas', true);
        //         modal.clickOk(false);
        //         modal.assertAgeErrorMessage(locale);
        //         modal.setValues(undefined, undefined, undefined, 20, true);
        //         modal.clickOk();
        //       }
        //     });
        // });
        //
        // it('Close Modal', () => {
        //   cy.log('Skip, this feature is tested multiple times in the previous tests whenever we call modal.clickOk() with no argument');
        // });
        //
        // it('Check Question Mark Message - Gender', () => {
        //   modal.clickGenderQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.assertContent(locale, infoModal.modalType.gender);
        //   infoModal.assertHeader(locale, infoModal.modalType.gender);
        // });
        //
        // it('Check Question Mark Message - Sex Assigned At Birth', () => {
        //   modal.clickSexAssignedAtBirthQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.assertContent(locale, infoModal.modalType.genderAtBirth);
        //   infoModal.assertHeader(locale, infoModal.modalType.genderAtBirth);
        // });
        //
        // it('Close Question Mark Message - Gender', () => {
        //   modal.clickGenderQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.clickX();
        //   infoModal.assertNotExist();
        // });
        //
        // it('Close Question Mark Message - Gender 2', () => {
        //   modal.clickGenderQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.clickBackdropRight();
        //   infoModal.assertNotExist();
        // });
        //
        // it('Close Question Mark Message - Gender 3', () => {
        //   modal.clickGenderQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.clickOk();
        //   infoModal.assertNotExist();
        // });
        //
        // it('Close Question Mark Message - Sex Assigned At Birth', () => {
        //   modal.clickSexAssignedAtBirthQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.clickX();
        //   infoModal.assertNotExist();
        // });
        //
        // it('Close Question Mark Message - Sex Assigned At Birth 2', () => {
        //   modal.clickSexAssignedAtBirthQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.clickBackdropRight();
        //   infoModal.assertNotExist();
        // });
        //
        // it('Close Question Mark Message - Sex Assigned At Birth 3', () => {
        //   modal.clickSexAssignedAtBirthQuestionMark();
        //   const infoModal = new InformationModal();
        //   infoModal.assertExist();
        //   infoModal.clickOk();
        //   infoModal.assertNotExist();
        // });
      });
    }
  },
);
