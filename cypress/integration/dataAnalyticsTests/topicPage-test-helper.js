import capitalize from 'capitalize';
import { cookiesSetupAndAccessBodyPage, readTopicJsonData } from '../textLocaleTests/base-test-helper';
import TopicPage from '../../pageObjects/topicPage';

function getAge(age) {
  if (age === 'all ages') return 'All Ages';
  if (age <= 30) return 'Young';
  if (age <= 60) return 'Middle Age';
  return 'Senior';
}

function generateTestDataSet(props, user) {
  const {
    heading, ageSet, genderSet, text,
  } = readTopicJsonData(props, user);
  if (text === 'n/a') {
    return [];
  }
  const dataSet = [];
  for (const currentAge of ageSet) {
    for (const currentGender of genderSet) {
      dataSet.push({
        age: currentAge,
        gender: currentGender,
        heading,
      });
    }
  }

  return dataSet;
}

function topicPageTestSteps(age, gender, heading, user, locale) {
  const topicPage = new TopicPage();
  const localeStrDict = {
    [topicPage.locale.en]: 'English', [topicPage.locale.fr]: 'French',
  };
    // same approach used as in text locale text. Reuse the function
  cookiesSetupAndAccessBodyPage(topicPage, gender, age, user, locale);
  cy.getTestId('topic')
    .click();
  cy.intercept({
    url: 'https://www.google-analytics.com/**/collect?*',
    // All v:2 requests are ping type and generated by https://www.googletagmanager.com/gtag/js which our product does not actively use, ignored.
    // t:dc requests are not documented  in https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#commonhits, ignored.
    query: { v: '1', t: 'pageview' },
  })
    .as('ga-pageview');

  cy.intercept({
    url: 'https://www.google-analytics.com/**/collect?*',
    //  See above comment for query selection
    query: { v: '1', t: 'event' },
  })
    .as('ga-event');

  topicPage.clickTopic(heading);
  topicPage
    .assertPageViewGA('@ga-pageview', {
      dp: `topics/${heading}`,
      uid: null,
    });

  topicPage
  //  For whatever reason, ReactGA normalizes input to be title case
    .assertEventGA('@ga-event',
      `${capitalize(user)}-Topics-${capitalize.words(heading)
        .replace('/', ' or ')
        .replace('Or', 'or')
        .replace('In', 'in')
        .replace('Covid', 'COVID')
        .replace('The', 'the')
        .replace('the Body', 'The Body')
        .replace('L’Utérus', 'L’utérus')
        .replace('D’Un', 'D’un')
        .replace('L’Aorte', 'L’aorte')
        .replace('And', 'and')}`,
      'Other-Chrome',
      `${capitalize(topicPage.generateGenderCookies(gender).gender)}-${getAge(age)}-${localeStrDict[locale]}`);
}

export { generateTestDataSet, topicPageTestSteps };