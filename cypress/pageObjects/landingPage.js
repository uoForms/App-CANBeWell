import capitalize from 'capitalize';
import BasePage from './basePage';

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
    this.device = {
      ios: 'ios',
      android: 'android',
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

  assertHomeScreenButton(locale, device) {
    // TODO: Remove this once https://github.com/uoForms/App-CANBeWell/issues/447 is fixed
    const french = device === this.device.ios ? "Enregister l’appli" : "Enregistrer l'appli";
    cy.getTestId(`homeScreenButton${capitalize(locale)}`)
      .assertVisibleAndContainText(locale === this.locale.en ? 'Save App' : french);
  }

  assertHomeScreenModalContent(locale, device) {
    // TODO: Add image checks once https://github.com/uoForms/App-CANBeWell/issues/446 is fixed
    if (locale === this.locale.en) {
      if (device === this.device.ios) {
        cy.getTestId('homeScreenTitle')
          .assertVisibleAndContainText('For iPhone and iPad');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('1. Launch icanbewell.ca via Safari');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('2. Tap share icon');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('3. Tap "Save App');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('4. Tap "Add" button');
      } else {
        cy.getTestId('homeScreenTitle')
          .assertVisibleAndContainText('For Android');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('1. Launch icanbewell.ca via Chrome');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('2. Tap menu icon');
        cy.getTestId('homeScreenContent')
          .assertVisibleAndContainText('3. Tap "Save App');
      }
    } else if (device === this.device.ios) {
      cy.getTestId('homeScreenTitle')
        .assertVisibleAndContainText('Pour iPhone et iPad');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('1. Lancez icanbewell.ca via Safari');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('2. Appuyez sur l\'icône de partage');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('3. Appuyez sur "Ajouter sur l\'écran d\'accueil"');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('4. Appuyez sur le bouton "Ajouter"');
    } else {
      cy.getTestId('homeScreenTitle')
        .assertVisibleAndContainText('Pour Android');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('1. Lancez icanbewell.ca via Chrome');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('2. Appuyez sur l\'icône de menu');
      cy.getTestId('homeScreenContent')
        .assertVisibleAndContainText('3. Appuyez sur "Ajouter à l\'écran d\'accueil');
    }
    cy.getTestId('homeScreenCloseButton')
      .assertVisibleAndContainText(locale === this.locale.en ? 'OK' : "D'accord");
  }

  clickHomeScreenButton(locale) {
    cy.getTestId(`homeScreenButton${capitalize(locale)}`)
      .click();
  }

  clickHomeScreenCloseButton() {
    cy.getTestId('homeScreenCloseButton')
      .click();
  }

  clickHomeScreenCloseIcon() {
    cy.getTestId('homeScreenCloseIcon')
      .click();
  }

  clickBackDrop() {
    // third party code, cannot insert test-id
    cy.get('[role="presentation"]')
      .click('right');
  }

  assertHomeScreenModalNotExist() {
    cy.getTestId('homeScreenTitle')
      .should('not.exist');
  }

  assertHomeScreenModalExist() {
    cy.getTestId('homeScreenTitle')
      .should('exist');
  }
}

export default LandingPage;
