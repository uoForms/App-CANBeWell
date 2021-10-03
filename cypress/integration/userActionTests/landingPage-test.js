import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import InstructionModal from '../../pageObjects/instructionModal';

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
      landingPage.clickRedirectButton(landingPage.locale.en);
      const instructionModal = new InstructionModal();
      instructionModal.assertCurrentLocale(landingPage.locale.en);
      instructionModal.assertModalExist();
    });

    it('Redirect(fr) Click', () => {
      landingPage.clickRedirectButton(landingPage.locale.fr);
      const instructionModal = new InstructionModal();
      instructionModal.assertCurrentLocale(landingPage.locale.fr);
      instructionModal.assertModalExist();
    });

    it('Redirect(en) Click (Configured)', () => {
      cy.setupCookies({
        _onboarded: 'true',
        gender: landingPage.gender.male,
        Tgender: landingPage.gender.transFemale,
        age: 18,
        user: 'patient',
      });
      landingPage.clickRedirectButton(landingPage.locale.en);
      const potentialInstructionModal = new InstructionModal();
      potentialInstructionModal.assertCurrentLocale(landingPage.locale.en);
      potentialInstructionModal.assertModalNotExist();
      new BodyPage()
        .assertInstructionExists(potentialInstructionModal.locale.en);
    });

    it('Redirect(fr) Click (Configured)', () => {
      cy.setupCookies({
        _onboarded: 'true',
        gender: landingPage.gender.male,
        Tgender: landingPage.gender.transFemale,
        age: 18,
        user: 'patient',
      });
      landingPage.clickRedirectButton(landingPage.locale.fr);
      const potentialInstructionModal = new InstructionModal();
      potentialInstructionModal.assertCurrentLocale(landingPage.locale.fr);
      potentialInstructionModal.assertModalNotExist();
      new BodyPage()
        .assertInstructionExists(potentialInstructionModal.locale.fr);
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
