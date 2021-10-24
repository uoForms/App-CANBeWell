import BodyPage from '../../pageObjects/bodyPage';
import { assertTopicModal, cookiesSetupAndAccessBodyPage, readTopicJsonData } from './base-test-helper';
import BodyModal from '../../pageObjects/bodyModal';
import BasePage from '../../pageObjects/basePage';

function getButtonId(gender, buttonText) {
  const bodyPage = new BodyPage();
  const buttonInfoList = bodyPage.getButtonInfoListByGender(gender);
  for (const info of buttonInfoList) {
    if (info.buttonText === buttonText) {
      return info.testId;
    }
  }
  return null;
}

function getButtonText(gender, buttonId) {
  const bodyPage = new BodyPage();
  const buttonInfoList = bodyPage.getButtonInfoListByGender(gender);
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
  for (const currentAge of ageSet) {
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
  for (const topic of topics) {
    const topicGenderList = topic.Gender.split(',');
    if (((topic['Minimum age'] <= age && topic['Maximum age'] >= age) || age === 'all ages') && (
      topicGenderList.includes(gender) || topic.Gender === 'all' || (gender === 'nonbinary-m' && topicGenderList.includes('tf')) || (gender === 'nonbinary-f' && topicGenderList
        .includes('tm'))) && button === topic.Button) {
      if (user === new BasePage().user.patient && topic['General Patient Text'] !== 'n/a') {
        expectedSubjectSet.push(topic.Subject.replace(' \n', '\n'));
      } else if (user === new BasePage().user.provider && topic['Health Provider Text'] !== 'n/a') {
        expectedSubjectSet.push(topic.Subject.replace(' \n', '\n'));
      }
    }
  }
  subjectCache[`${age}${gender}${user}${locale}${button}`] = expectedSubjectSet;
  return expectedSubjectSet;
}

function baseBodyPageTestSteps(gender, age, user, locale, buttonId) {
  const bodyPage = new BodyPage();
  cookiesSetupAndAccessBodyPage(bodyPage, gender, age, user, locale);
  cy.getTestId(buttonId)
  //  The purpose of this test is to bring up the modal. I dont really care if the button is clickable in Cypress' eye.
  //  Clickable assertion will be dealt in user action tests.
    .click({ force: true });
  return bodyPage;
}

function bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user) {
  const bodyPage = baseBodyPageTestSteps(gender, age, user, locale, buttonId);
  assertTopicModal(heading, subject, text, age, user, bodyPage, expectedSubjects(age, gender, user, locale, getButtonText(gender, buttonId)), `${age}${gender}${user}${locale}${getButtonText(gender, buttonId)}`);
}

function bodyPageNoTopicTestSteps(gender, age, user, locale, buttonId) {
  baseBodyPageTestSteps(gender, age, user, locale, buttonId);
  // TODO: remove the skip once https://github.com/uoForms/App-CANBeWell/issues/429 is fixed
  if (!(age >= 75 && user === new BasePage().user.provider && buttonId === 'bowelButton')) {
    new BodyModal()
      .assertNoTopic(locale);
  }
}

export {
  generateTestDataSet,
  bodyPageTestSteps,
  bodyPageNoTopicTestSteps,
  expectedSubjects, getButtonText,
};
