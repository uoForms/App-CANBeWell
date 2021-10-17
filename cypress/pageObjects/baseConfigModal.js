import BasePage from './basePage';

class BaseConfigModal extends BasePage {
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
        cy.getTestId('ageInput')
          .should('be.disabled');
      } else {
        cy.getTestId('ageInput')
          .should('have.value', age);
      }
    }
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

  setValues(user, gender, tGender, age, ignoreAgeCheck = false) {
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
      if (Number.isNaN(Number(age)) && !ignoreAgeCheck) {
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

export default BaseConfigModal;
