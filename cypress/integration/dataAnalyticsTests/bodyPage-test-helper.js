function capitalizeString(str) {
  return str.charAt(0)
    .toUpperCase() + str.slice(1)
    .toLowerCase();
}

function bodyPageTestSteps(gender, tGender, age, user, landingPage, locale, testId, bodyPage, localeDict, localeId, ageDict) {
  const localeStrDict = { [landingPage.locale.en]: 'english', [landingPage.locale.fr]: 'french' };
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
      `${capitalizeString(user)}-Body-${localeDict[localeId]}`,
      'Other-Chrome',
      `${capitalizeString(gender.gender)}-${ageDict[age.age]}-${capitalizeString(localeStrDict[locale])}`);
}

export default bodyPageTestSteps;
