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

function getButtonText(gender, buttonId) {
  const bodyPage = new BodyPage();
  // eslint-disable-next-line no-nested-ternary
  const buttonInfoList = gender === 'm' ? bodyPage.maleTfButtonInfoList : (gender === 'f' ? bodyPage.femaleTmButtonInfoList : bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList);
  // eslint-disable-next-line no-restricted-syntax
  for (const info of buttonInfoList) {
    if (info.testId === buttonId) {
      return info.buttonText;
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

const subjectCache = {};

function expectedSubjects(age, gender, user, locale, button) {
  if (subjectCache[`${age}${gender}${user}${locale}${button}`] !== undefined) {
    return subjectCache[`${age}${gender}${user}${locale}${button}`];
  }
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const topics = require(`../../../src/JSONFolder/HtmlTopic-${locale.toUpperCase()}.json`);
  const expectedSubjectSet = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const topic of topics) {
    if (((topic['Minimum age'] <= age && topic['Maximum age'] >= age) || age === 'all ages') && (topic.Gender.split(',')
      .includes(gender) || topic.Gender === 'all') && button === topic.Button) {
      if (user === 'patient' && topic['General Patient Text'] !== 'n/a') {
        expectedSubjectSet.push(topic.Subject);
      } else if (user === 'provider' && topic['Health Provider Text'] !== 'n/a') {
        expectedSubjectSet.push(topic.Subject);
      }
    }
  }
  subjectCache[`${age}${gender}${user}${locale}${button}`] = expectedSubjectSet;
  return expectedSubjectSet;
}

function bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user) {
  const bodyPage = new BodyPage();
  cookiesSetupAndAccessBodyPage(bodyPage, gender, age, user, locale);
  cy.getTestId(buttonId)
  //  The purpose of this test is to bring up the modal. I dont really care if the button is clickable in Cypress' eye.
  //  Clickable assertion will be dealt in user action tests.
    .click({ force: true });
  assertTopicModal(heading, subject, text, age, user, bodyPage, expectedSubjects(age, gender, user, locale, getButtonText(gender, buttonId)), `${age}${gender}${user}${locale}${getButtonText(gender, buttonId)}`);
}

export {
  generateTestDataSet,
  bodyPageTestSteps,
};
