import BaseConfigModal from './baseConfigModal';

class InitConfigModal extends BaseConfigModal {
  assertModalExist() {
    cy.getTestId('instructionModalRoot')
      .should('be.visible');
  }

  assertModalNotExist() {
    cy.getTestId('instructionModalRoot')
      .should('not.exist');
  }

  clickTopOk() {
    cy.getTestId('okButtonTop')
      .click();
  }

  assertNoValueError(locale) {
    cy.getTestId('noValueError')
      .assertVisibleAndContainText(this.localeFile[locale].ageandgender_help);
  }

  clickBottomOk() {
    cy.getTestId('okButtonBottom')
      .click();
  }

  assertDefaultValue() {
    const uncheckedElementList = ['providerRadio', 'maleRadio', 'femaleRadio', 'nonBinaryRadio', 'birthMale', 'birthFemale'];
    for (const testId of uncheckedElementList) {
      cy.getTestId(testId)
        .should('not.be.checked');
    }
    cy.getTestId('patientRadio')
      .should('be.checked');
    cy.getTestId('ageInput')
      .should('have.value', '');
    cy.getTestId('allAgeCheckbox')
      .should('not.visible');
  }

  assertAllDisplayText(locale) {
    cy.getTestId('header')
      .assertVisibleAndContainText(this.localeFile[locale].instruction_modal_header);
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
    cy.getTestId('providerRadio')
      .click();
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
    cy.getTestId('tGenderSelectRoot')
      .assertVisibleAndContainText(this.localeFile[locale].Tgender_selector);
    cy.getTestId('tGenderSelectHelp')
      .assertVisibleAndContainText('?');
    cy.getTestId('birthMaleLabel')
      .assertVisibleAndContainText(this.localeFile[locale].tf);
    cy.getTestId('birthfemaleLabel')
      .assertVisibleAndContainText(this.localeFile[locale].tm);
    cy.getTestId('okButtonTop')
      .assertVisibleAndContainText(this.localeFile[locale].agree);
    cy.getTestId('okButtonBottom')
      .assertVisibleAndContainText(this.localeFile[locale].agree);
    cy.getTestId('termOfUseLabel')
      .assertVisibleAndContainText(this.localeFile[locale].disclaimer_header);
    const termOfUseLangList = ['disclaimerBeforeTermsOfUse', 'accpetanceheading', 'acceptanceInitialStatement', 'acceptanceAgreeStatement', 'acceptanceText', 'modificationHeading', 'modificationText1', 'modificationText2', 'websiteContentSpecificationHeading', 'websiteContentSpecificationText', 'websiteSecurityHeading', 'websiteSecurityText1', 'websiteSecurityText2', 'rightsAndOwnershipHeading', 'rightsAndOwnershipText1', 'rightsAndOwnershipText2', 'rightsAndOwnershipText3', 'rightsAndOwnershipText4', 'rightsAndOwnershipText5', 'rightsAndOwnershipText6', 'rightsAndOwnershipText7', 'conditionsHeading', 'conditionsText', 'legalActionsHeading', 'legalActionsText', 'cookiesHeading', 'cookiesText', 'thirdPartyWebHeading', 'thirdPartyWebText', 'geographicRestricationsHeading', 'geographicRestricationsText', 'noRelianceHeading', 'noRelianceText1', 'noRelianceText2', 'noRelianceText3', 'disclaimerWarrantiesHeading', 'disclaimerWarrantiesText1', 'disclaimerWarrantiesText2', 'limitationHeading', 'limitationText', 'indemnificationHeading', 'indemnificationText', 'lawAndJurisdictionHeading', 'lawAndJurisdictionText1', 'lawAndJurisdictionText2', 'entireAgreementHeading', 'entireAgreementText', 'dateofAgreement'];
    for (const lang of termOfUseLangList) {
      // Strip html tags
      const cleanedText = this.localeFile[locale][lang].replace(/(<([^>]+)>)/gi, '');
      cy.getTestId('termOfUseContent')
        .assertVisibleAndContainText(cleanedText);
    }
  }
}

export default InitConfigModal;
