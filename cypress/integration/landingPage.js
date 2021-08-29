import devicesTestWrapper from '../support/devicesTestWrapper';
import LandingPage from '../pageObjects/landingPage';

devicesTestWrapper(
  'Landing Page', () => {
    let landingPage;
    beforeEach(() => {
      landingPage = new LandingPage();
    });

    it('Update Banner', () => {
      landingPage.assertUpdateBannerText();
      landingPage.assertUpdateBannerVideoButtonEn();
      landingPage.assertUpdateBannerVideoButtonFr();
    });

    it('Logo', () => {
      landingPage.assertLogo();
    });

    it('Redirect Button', () => {
      landingPage.assertRedirectButtonEn();
      landingPage.assertRedirectButtonFr();
    //  TODO: click those buttons
    });

    it('Reliable Resource Statement', () => {
      landingPage.assertReliableResourceStatementEn();
      landingPage.assertReliableResourceStatementFr();
    });

    it('Privacy Statement', () => {
      //  TODO: Assert privacy statement content once https://github.com/uoForms/App-CANBeWell/issues/405 is addressed
      landingPage.assertPrivacyStatementEn();
      landingPage.assertPrivacyStatementFr();
    });
  },
);
