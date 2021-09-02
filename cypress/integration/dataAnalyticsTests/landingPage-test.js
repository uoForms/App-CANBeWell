const devicesTestWrapper = require('../../support/devicesTestWrapper');
const LandingPage = require('../../pageObjects/landingPage');

devicesTestWrapper(
  'Landing Page Analytics', () => {
    it('Page View', () => {
      cy.intercept({
        url: 'https://www.google-analytics.com/**/collect?*',
        //  All v=2 requests are ping type and generated by https://www.googletagmanager.com/gtag/js which our product does not actively use, ignored.
        query: { v: '1' },
      })
        .as('ga');
      cy.visit('/');
      new LandingPage()
        .assertPageViewGA('@ga');
    });
  },
);
