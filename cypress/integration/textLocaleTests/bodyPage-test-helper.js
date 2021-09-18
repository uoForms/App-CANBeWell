import BodyPage from '../../pageObjects/bodyPage';
import { assertTopicModal, cookiesSetupAndAccessBodyPage, readTopicJsonData } from './base-test-helper';

function getButtonId(gender, buttonText) {
  const bodyPage = new BodyPage();
  // eslint-disable-next-line no-nested-ternary
  const buttonInfoList = gender === 'm' ? bodyPage.maleTfButtonInfoList : (gender === 'f' ? bodyPage.femaleTmButtonInfoList : bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList);
  // eslint-disable-next-line no-restricted-syntax
  for (const info of buttonInfoList) {
    if (info.buttonText === buttonText) {
      return info.testId;
    }
  }
  return null;
}

function generateTestDataSet(props, user) {
  const {
    button, heading, subject, ageSet, genderSet, text,
  } = readTopicJsonData(props, user);
  const dataSet = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const currentAge of ageSet) {
    // eslint-disable-next-line no-restricted-syntax
    for (const currentGender of genderSet) {
      dataSet.push({
        age: currentAge,
        gender: currentGender,
        text,
        subject,
        heading,
        buttonId: getButtonId(currentGender, button),
      });
    }
  }
  return dataSet;
}

function bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user) {
  const bodyPage = new BodyPage();
  cookiesSetupAndAccessBodyPage(bodyPage, gender, age, user, locale);
  cy.getTestId(buttonId)
  //  The purpose of this test is to bring up the modal. I dont really care if the button is clickable in Cypress' eye.
  //  Clickable assertion will be dealt in user action tests.
    .click({ force: true });
  assertTopicModal(heading, subject, text, age, user);
}

export {
  generateTestDataSet,
  bodyPageTestSteps,
};
