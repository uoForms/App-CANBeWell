import BasePage from './basePage';

class PostConfigUpdateModal extends BasePage {
  assertAllDisplayText(locale) {
    cy.getTestId('PostConfigUpdateModalHeader')
      .assertVisibleAndContainText(this.localeFile[locale].configuration_header);
    cy.getTestId('userForm')
      .assertVisibleAndContainText(this.localeFile[locale].user_selector);
    cy.getTestId('patientLabel')
      .assertVisibleAndContainText(this.localeFile[locale].patient);
    cy.getTestId('providerLabel')
      .assertVisibleAndContainText(this.localeFile[locale].provider);
    cy.getTestId('ageForm')
      .assertVisibleAndContainText(this.localeFile[locale].age_selector);
    cy.getTestId('ageInput')
      .should('be.visible')
      .assertAttribute('placeholder', this.localeFile[locale].age_selector_place_holder);
    cy.getTestId('allAgeCheckboxLabel')
      .assertVisibleAndContainText(this.localeFile[locale].all_ages);
    cy.getTestId('genderSelectRoot')
      .assertVisibleAndContainText(this.localeFile[locale].gender_selector);
    cy.getTestId('genderSelectHelp')
      .assertVisibleAndContainText('?');
    cy.getTestId('maleRadioLabel')
      .assertVisibleAndContainText(this.localeFile[locale].male);
    cy.getTestId('femaleRadioLabel')
      .assertVisibleAndContainText(this.localeFile[locale].female);
    cy.getTestId('nonBinaryRadioLabel')
      .assertVisibleAndContainText(this.localeFile[locale].nonbinary);
    cy.document()
      .then((doc) => {
        if (doc.documentElement.clientHeight === 414) {
          // TODO: remove the skip once 435 is fixed
          cy.log('Skip due to https://github.com/uoForms/App-CANBeWell/issues/435');
        } else {
          cy.getTestId('tGenderSelectRoot')
            .assertVisibleAndContainText(this.localeFile[locale].Tgender_selector);
          cy.getTestId('tGenderSelectHelp')
            .assertVisibleAndContainText('?');
          cy.getTestId('birthMaleLabel')
            .assertVisibleAndContainText(this.localeFile[locale].tf);
          cy.getTestId('birthfemaleLabel')
            .assertVisibleAndContainText(this.localeFile[locale].tm);
          cy.getTestId('okButton')
            .assertVisibleAndContainText(this.localeFile[locale].config_modal_agree);
        }
      });
  }

  assertModalExist() {
    cy.getTestId('PostConfigUpdateModalRoot')
      .should('be.visible');
  }
}

export default PostConfigUpdateModal;
