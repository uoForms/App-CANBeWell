import BasePage from './basePage';
import InstructionModal from './instructionModal';

class LandingPage extends BasePage {
  constructor() {
    super();
    this.updateBannerVideoButton = {
      src: {
        [this.locale.en]: '/static/media/video_en.3d94c066.mp4',
        [this.locale.fr]: '/static/media/video_fr.e225eae6.mp4',
      },
      text: {
        [this.locale.en]: 'Video',
        [this.locale.fr]: 'Vidéo',
      },
    };
    this.redirectButtonImageSrc = {
      [this.locale.en]: '/static/media/canbewelleng.107fa0a3.png',
      [this.locale.fr]: '/static/media/canbewellfren.301eb9d6.png',
    };
    this.reliableResourceStatement = {
      [this.locale.en]: 'A reliable resource by Canadian health care providers to help you stay healthy',
      [this.locale.fr]: 'Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens',
    };

    this.privacyStatement = {
      text: {
        [this.locale.en]: 'Privacy Statement',
        [this.locale.fr]: 'Politique de confidentialité',
      },
      link: {
        [this.locale.en]: 'https://canbewell-uottawa.web.app/iCanBeWell_PrivacyPolicy.htm',
        [this.locale.fr]: 'https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm',
      },
    };
  }

  assertUpdateBannerText() {
    cy.getTestId('update-banner')
      .assertVisibleAndContainText('Mise à jour COVID Updated');
  }

  assertUpdateBannerVideoButton(locale) {
    cy.getTestId(`update-banner-${locale}-video`)
      .assertVisibleAndContainText(this.updateBannerVideoButton.text[locale])
      .assertAttribute('src', this.updateBannerVideoButton.src[locale])
      .invoke('attr', 'src')
      .then((src) => {
        // File size is too big to do GET call
        cy.assertUrl(src, 'OPTIONS');
      });
  }

  assertUpdateBannerVideoButtonOpenNewTab(spyAlias, locale) {
    cy.getTestId(`update-banner-${locale}-video`)
      .click();
    cy
      .get(`@${spyAlias}`)
      .should('be.calledWith', this.updateBannerVideoButton.src[locale]);
  }

  assertLogo() {
    cy.getTestId('logo')
      .assertImageVisibleWithSource('/static/media/logo_21-02-02.4e1afa71.png');
  }

  assertRedirectButton(locale) {
    cy.getTestId(`${locale}-redirect-button`)
      .assertImageVisibleWithSource(this.redirectButtonImageSrc[locale]);
  }

  clickRedirectButton(locale) {
    cy.getTestId(`${locale}-redirect-button`)
      .click();
    return new InstructionModal();
  }

  assertReliableResourceStatement(locale) {
    cy.getTestId(`${locale}-reliable-resource-statement`)
      .assertVisibleAndContainText(this.reliableResourceStatement[locale]);
  }

  assertPrivacyStatement(locale) {
    cy.getTestId(`privacy-statement-${locale}`)
      .assertVisibleAndContainText(this.privacyStatement.text[locale])
      .assertAttribute('href', this.privacyStatement.link[locale])
      .invoke('attr', 'href')
      .then((href) => {
        cy.assertUrl(href);
      });
  }
}

export default LandingPage;
