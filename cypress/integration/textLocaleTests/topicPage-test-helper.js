import { assertTopicModal, cookiesSetupAndAccessBodyPage, readTopicJsonData } from './base-test-helper';
import TopicPage from '../../pageObjects/topicPage';
import BasePage from '../../pageObjects/basePage';

function generateTestDataSet(props, user) {
  const {
    heading, subject, ageSet, genderSet, text,
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
      });
    }
  }
  return dataSet;
}

const headingCache = {};

function expectedHeadings(age, gender, user, locale) {
  if (headingCache[`${age}${gender}${user}${locale}`] !== undefined) {
    return headingCache[`${age}${gender}${user}${locale}`];
  }
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const topics = require(`../../../src/JSONFolder/HtmlTopic-${locale.toUpperCase()}.json`);
  const expectedHeadingSet = new Set();
  for (const topic of topics) {
    const topicGenderList = topic.Gender.split(',');
    if (((topic['Minimum age'] <= age && topic['Maximum age'] >= age) || age === 'all ages') && (
      topicGenderList.includes(gender) || topic.Gender === 'all' || (gender === 'nonbinary-m' && topicGenderList.includes('tf')) || (gender === 'nonbinary-f' && topicGenderList
        .includes('tm')))) {
      if (user === new BasePage().user.patient && topic['General Patient Text'] !== 'n/a') {
        expectedHeadingSet.add(topic['Topic heading'].replace('\n', ' '));
      } else if (user === new BasePage().user.provider && topic['Health Provider Text'] !== 'n/a') {
        expectedHeadingSet.add(topic['Topic heading'].replace('\n', ' '));
      }
    }
  }
  headingCache[`${age}${gender}${user}${locale}`] = expectedHeadingSet;
  return expectedHeadingSet;
}

const subjectCache = {};

function expectedSubjects(age, gender, user, locale, heading) {
  if (subjectCache[`${age}${gender}${user}${locale}${heading}`] !== undefined) {
    return subjectCache[`${age}${gender}${user}${locale}${heading}`];
  }
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const topics = require(`../../../src/JSONFolder/HtmlTopic-${locale.toUpperCase()}.json`);
  const expectedSubjectSet = [];
  for (const topic of topics) {
    const topicGenderList = topic.Gender.split(',');
    if (((topic['Minimum age'] <= age && topic['Maximum age'] >= age) || age === 'all ages') && (
      topicGenderList.includes(gender) || topic.Gender === 'all' || (gender === 'nonbinary-m' && topicGenderList.includes('tf')) || (gender === 'nonbinary-f' && topicGenderList
        .includes('tm'))) && heading === topic['Topic heading']) {
      if (user === new BasePage().user.patient && topic['General Patient Text'] !== 'n/a') {
        expectedSubjectSet.push(topic.Subject.replace(' \n', '\n'));
      } else if (user === new BasePage().user.provider && topic['Health Provider Text'] !== 'n/a') {
        expectedSubjectSet.push(topic.Subject.replace(' \n', '\n'));
      }
    }
  }
  subjectCache[`${age}${gender}${user}${locale}${heading}`] = expectedSubjectSet;
  return expectedSubjectSet;
}

function topicPageTestSteps(age, gender, text, subject, heading, locale, user) {
  const topicPage = new TopicPage();
  cookiesSetupAndAccessBodyPage(topicPage, gender, age, user, locale);
  cy.getTestId('topic')
    .click();
  topicPage.assertHeadings(expectedHeadings(age, gender, user, locale), `${age}${gender}${user}${locale}`);
  topicPage.clickTopic(heading);
  // The modals for body and topic pages are exact the same (copy/pasted code). Reusing body modal here.
  assertTopicModal(heading, subject, text, age, user, topicPage, expectedSubjects(age, gender, user, locale, heading), `${age}${gender}${user}${locale}${heading}`);
}

export {
  generateTestDataSet,
  topicPageTestSteps,
};
