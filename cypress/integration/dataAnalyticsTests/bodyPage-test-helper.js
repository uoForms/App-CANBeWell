import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';

const capitalize = require('capitalize');

function bodyPageTestSteps(gender, tGender, age, user, landingPage, locale, testId, bodyPage, localeDict, localeId) {
  const localeStrDict = {
    [landingPage.locale.en]: 'English', [landingPage.locale.fr]: 'French',
  };
  const ageDict = {
    18: 'Young', 50: 'Middle age', 70: 'Senior', 'all ages': 'All Ages',
  };
  cy.setupCookies({
    _onboarded: 'true', ...gender, ...tGender, ...age, ...user,
  });

  landingPage.clickRedirectButton(locale);

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

  cy.getTestId(testId)
  //  The purpose of data analytics test is to check if requests are successful. I dont really care if the button is clickable in Cypress' eye.
  //  Clickable assertion will be dealt in user action tests.
    .click({ force: true });

  bodyPage
    .assertPageViewGA('@ga-pageview', {
      dp: `body/${localeDict[localeId]}`,
      uid: null,
    });
  // TODO: remove this when https://github.com/uoForms/App-CANBeWell/issues/413 is resolved
  if (localeDict[localeId]) {
    bodyPage
    //  For whatever reason, ReactGA normalizes input to be title case
      .assertEventGA('@ga-event',
        `${capitalize(user.user)}-Body-${capitalize.words(localeDict[localeId])
          .replace('/', ' or ')
          .replace('OR', 'or')}`,
        'Other-Chrome',
        `${capitalize(gender.gender)}-${ageDict[age.age]}-${localeStrDict[locale]}`);
  } else {
    cy.log('Skip check due to Issue 413');
  }
}

function setUpInputData() {
  const landingPage = new LandingPage();
  const bodyPage = new BodyPage();
  const genderList = [{ gender: landingPage.gender.male }, { gender: landingPage.gender.female }, { gender: landingPage.gender.nonBinary }];
  const tGenderList = [{ Tgender: landingPage.gender.transFemale }, { Tgender: landingPage.gender.transMale }];

  const buttonListDict = {
    [JSON.stringify([landingPage.gender.male, landingPage.gender.transFemale])]: bodyPage.maleTfButtonInfoList,
    [JSON.stringify([landingPage.gender.male, landingPage.gender.transMale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    [JSON.stringify([landingPage.gender.female, landingPage.gender.transFemale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    [JSON.stringify([landingPage.gender.female, landingPage.gender.transMale])]: bodyPage.femaleTmButtonInfoList,
    [JSON.stringify([landingPage.gender.nonBinary, landingPage.gender.transFemale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    [JSON.stringify([landingPage.gender.nonBinary, landingPage.gender.transMale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
  };
  return {
    landingPage, bodyPage, genderList, tGenderList, buttonListDict,
  };
}

export {
  bodyPageTestSteps,
  setUpInputData,
};
