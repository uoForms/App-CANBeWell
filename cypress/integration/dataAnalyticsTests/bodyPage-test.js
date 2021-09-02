const localFile = require('../../../src/Lang/Lang.json');
const devicesTestWrapper = require('../../support/devicesTestWrapper');
const LandingPage = require('../../pageObjects/landingPage');
const BodyPage = require('../../pageObjects/bodyPage');

devicesTestWrapper(
  'Body Page Analytics', () => {
    const landingPage = new LandingPage();
    const bodyPage = new BodyPage();
    const localeList = [landingPage.locale.en, landingPage.locale.fr];
    const localeStrDict = { [landingPage.locale.en]: 'english', [landingPage.locale.fr]: 'french' };
    const genderList = [{ gender: landingPage.gender.male }, { gender: landingPage.gender.female }, { gender: landingPage.gender.nonBinary }];
    const tGenderList = [{ Tgender: landingPage.gender.transFemale }, { Tgender: landingPage.gender.transMale }];
    const userList = [{ user: 'provider' }, { user: 'patient' }];
    const ageList = [{ age: '18' }, { age: '50' }, { age: '70' }, { age: 'all ages' }];
    const ageDict = {
      18: 'Young', 50: 'Middle age', 70: 'Senior', 'all ages': 'all ages',
    };
    const buttonListDict = {
      [JSON.stringify([landingPage.gender.male, landingPage.gender.transFemale])]: bodyPage.maleTfButtonInfoList,
      [JSON.stringify([landingPage.gender.male, landingPage.gender.transMale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
      [JSON.stringify([landingPage.gender.female, landingPage.gender.transFemale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
      [JSON.stringify([landingPage.gender.female, landingPage.gender.transMale])]: bodyPage.femaleTmButtonInfoList,
      [JSON.stringify([landingPage.gender.nonBinary, landingPage.gender.transFemale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
      [JSON.stringify([landingPage.gender.nonBinary, landingPage.gender.transMale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    };

    function capitalizeString(str) {
      return str.charAt(0)
        .toUpperCase() + str.slice(1)
        .toLowerCase();
    }

    beforeEach(() => {
      cy.visit('/');
    });
    ageList.forEach((age) => {
      userList.forEach((user) => {
        localeList.forEach((locale) => {
          const localeDict = localFile[localeStrDict[locale]];
          genderList.forEach((gender) => {
            tGenderList.forEach((tGender) => {
              const buttonList = buttonListDict[JSON.stringify([gender.gender, tGender.Tgender])];
              buttonList.forEach(({ testId, localeId }) => {
                it(`Icon Click With Setting: ${user.user} ${age.age} ${gender.gender} ${tGender.Tgender} ${locale} ${testId} ${localeId}`, () => {
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
                    .click();
                  bodyPage
                    .assertPageViewGA('@ga-pageview', {
                      dp: `body/${localeDict[localeId]}`,
                      uid: null,
                    });
                  bodyPage
                    .assertEventGA('@ga-event',
                      `${capitalizeString(user.user)}-Body-${localeDict[localeId]}`,
                      'Other-Chrome',
                      `${capitalizeString(gender.gender)}-${ageDict[age.age]}-${capitalizeString(localeStrDict[locale])}`);
                });
              });
            });
          });
        });
      });
    });
  },
);