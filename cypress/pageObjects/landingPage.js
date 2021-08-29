class LandingPage {
  assertUpdateBannerText() {
    cy.getTestId('update-banner')
      .assertVisibleAndContainText('Mise à jour COVID Updated');
  }

  assertUpdateBannerVideoButtonEn() {
    cy.getTestId('update-banner-en-video')
      .assertVisibleAndContainText('Video')
      .assertAttribute('src', '/static/media/video_en.717617d9.mp4')
      .invoke('attr', 'src')
      .then((src) => {
        cy.assertUrl(src);
      });
  }

  assertUpdateBannerVideoButtonFr() {
    cy.getTestId('update-banner-fr-video')
      .assertVisibleAndContainText('Vidéo')
      .assertAttribute('src', '/static/media/video_fr.ef3962f4.mp4')
      .invoke('attr', 'src')
      .then((src) => {
        cy.assertUrl(src);
      });
  }

  assertLogo() {
    cy.getTestId('logo')
      .assertImageVisibleWithSource('/static/media/logo_21-02-02.13561f30.png');
  }

  assertRedirectButtonEn() {
    cy.getTestId('en-redirect-button')
      .assertImageVisibleWithSource('/static/media/canbewelleng.59df6882.png');
  }

  assertRedirectButtonFr() {
    cy.getTestId('fr-redirect-button')
      .assertImageVisibleWithSource('/static/media/canbewellfren.b35390c9.png');
  }

  assertReliableResourceStatementEn() {
    cy.getTestId('en-reliable-resource-statement')
      .assertVisibleAndContainText('A reliable resource by Canadian health care providers to help you stay healthy');
  }

  assertReliableResourceStatementFr() {
    cy.getTestId('fr-reliable-resource-statement')
      .assertVisibleAndContainText('Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens');
  }

  assertPrivacyStatementEn() {
    cy.getTestId('privacy-statement-en')
      .assertVisibleAndContainText('Privacy Statement')
      .assertAttribute('href', 'https://canbewell-uottawa.web.app/iCanBeWell_PrivacyPolicy.htm')
      .invoke('attr', 'href')
      .then((href) => {
        cy.assertUrl(href);
      });
  }

  assertPrivacyStatementFr() {
    cy.getTestId('privacy-statement-fr')
      .assertVisibleAndContainText('Politique de confidentialité')
      .assertAttribute('href', 'https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm')
      .invoke('attr', 'href')
      .then((href) => {
        cy.assertUrl(href);
      });
  }
}

export default LandingPage;
