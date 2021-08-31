import devicesTestWrapper from '../support/devicesTestWrapper';
import LandingPage from '../pageObjects/landingPage';

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

    it('Update Banner Action', () => {
      //  This test is seperated out because it involves new tabs
      //  Videos are not viewable in this case
      landingPage.assertUpdateBannerVideoButtonOpenNewTab(redirectAlias, landingPage.locale.en);
      landingPage.assertUpdateBannerVideoButtonOpenNewTab(redirectAlias, landingPage.locale.fr);
    });
  },
);
