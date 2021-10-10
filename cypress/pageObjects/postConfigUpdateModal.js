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

  assertModalNotExist() {
    cy.getTestId('PostConfigUpdateModalRoot')
      .should('not.exist');
  }

  clickOk() {
    cy.getTestId('okButton')
      .click();
    this.assertModalNotExist();
  }

  checkOnlyOneRadioButtonIsChecked(checked, all) {
    for (const radio of all) {
      if (checked === radio) {
        cy.getTestId(checked)
          .should('be.checked');
      } else {
        cy.getTestId(radio)
          .should('not.be.checked');
      }
    }
  }

  assertValues(user, gender, tGender, age, locale) {
    if (user !== undefined) {
      const allOptions = ['patientRadio', 'providerRadio'];
      if (user === this.user.patient) {
        this.checkOnlyOneRadioButtonIsChecked('patientRadio', allOptions);
        cy.getTestId('allAgeCheckboxLabel')
          .should('not.be.visible');
      } else {
        this.checkOnlyOneRadioButtonIsChecked('providerRadio', allOptions);
        cy.getTestId('allAgeCheckboxLabel')
          .should('be.visible');
      }
    }
    if (gender !== undefined) {
      const allOptions = ['maleRadio', 'femaleRadio', 'nonBinaryRadio'];
      if (gender === this.gender.male) {
        this.checkOnlyOneRadioButtonIsChecked('maleRadio', allOptions);
      } else if (gender === this.gender.female) {
        this.checkOnlyOneRadioButtonIsChecked('femaleRadio', allOptions);
      } else {
        this.checkOnlyOneRadioButtonIsChecked('nonBinaryRadio', allOptions);
      }
    }
    if (tGender !== undefined) {
      const allOptions = ['birthMale', 'birthFemale'];
      if (tGender === this.gender.transFemale) {
        this.checkOnlyOneRadioButtonIsChecked('birthMale', allOptions);
      } else {
        this.checkOnlyOneRadioButtonIsChecked('birthFemale', allOptions);
      }
    }

    if (age !== undefined) {
      if (Number.isNaN(Number(age))) {
        cy.getTestId('allAgeCheckbox')
          .should('be.checked');
        this.checkOnlyOneRadioButtonIsChecked('providerRadio', ['patientRadio', 'providerRadio']);
        cy.getTestId('ageInput')
          .should('have.value', this.localeFile[locale].all_ages);
      } else {
        cy.getTestId('ageInput')
          .should('have.value', age);
      }
    }
  }

  setValues(user, gender, tGender, age) {
    if (user !== undefined) {
      if (user === this.user.patient) {
        cy.getTestId('patientRadio')
          .check();
      } else {
        cy.getTestId('providerRadio')
          .check();
      }
    }
    if (gender !== undefined) {
      if (gender === this.gender.male) {
        cy.getTestId('maleRadio')
          .check();
      } else if (gender === this.gender.female) {
        cy.getTestId('femaleRadio')
          .check();
      } else {
        cy.getTestId('nonBinaryRadio')
          .check();
      }
    }
    if (tGender !== undefined) {
      if (tGender === this.gender.transFemale) {
        cy.getTestId('birthMale')
          .check();
      } else {
        cy.getTestId('birthFemale')
          .check();
      }
    }

    if (age !== undefined) {
      if (Number.isNaN(Number(age))) {
        cy.getTestId('allAgeCheckbox')
          .check();
      } else {
        cy.getTestId('ageInput')
          .clear()
          .type(age);
      }
    }
  }
}

export default PostConfigUpdateModal;
