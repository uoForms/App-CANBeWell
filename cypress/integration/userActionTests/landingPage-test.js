import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';

devicesTestWrapper(
  'Landing Page', () => {
    let landingPage;
    const redirectAlias = 'redirect';
    beforeEach(() => {
      landingPage = new LandingPage();
      cy
        .window()
        .then((win) => {
          cy.spy(win, 'open')
            .as(redirectAlias);
        });
    });

    it('Update Banner', () => {
      landingPage.assertUpdateBannerText();
      landingPage.assertUpdateBannerVideoButton(landingPage.locale.en);
      landingPage.assertUpdateBannerVideoButton(landingPage.locale.fr);
    });

    it('Update Banner Action', () => {
      //  This test involves new tabs, it is normal that a new browser window pops up during test run.
      //  You can close it right after
      landingPage.assertUpdateBannerVideoButtonOpenNewTab(redirectAlias, landingPage.locale.en);
      landingPage.assertUpdateBannerVideoButtonOpenNewTab(redirectAlias, landingPage.locale.fr);
    });

    it('Logo', () => {
      landingPage.assertLogo();
    });

    it('Redirect Button', () => {
      landingPage.assertRedirectButton(landingPage.locale.en);
      landingPage.assertRedirectButton(landingPage.locale.fr);
    });

    it('Redirect(en) Click', () => {
      const instructionModal = landingPage.clickRedirectButton(landingPage.locale.en);
      instructionModal.assertCurrentLocale(landingPage.locale.en);
      instructionModal.assertModalExist();
    });

    it('Redirect(fr) Click', () => {
      const instructionModal = landingPage.clickRedirectButton(landingPage.locale.fr);
      instructionModal.assertCurrentLocale(landingPage.locale.fr);
      instructionModal.assertModalExist();
    });

    it('Reliable Resource Statement', () => {
      landingPage.assertReliableResourceStatement(landingPage.locale.en);
      landingPage.assertReliableResourceStatement(landingPage.locale.fr);
    });

    it('Privacy Statement', () => {
      // TODO:
      // 1. Add click action check (Cypress does not support two domains), need to address https://github.com/uoForms/App-CANBeWell/issues/405
      // 2. Assert content of privacy statements once issue 405 is addressed
      landingPage.assertPrivacyStatement(landingPage.locale.en);
      landingPage.assertPrivacyStatement(landingPage.locale.fr);
    });
  },
);
