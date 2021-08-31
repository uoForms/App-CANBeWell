import BasePage from './basePage'
import instructionModal from './instructionModal'

class LandingPage extends BasePage {
    updateBannerVideoButton = {
        src: {
            [this.locale.en]: '/static/media/video_en.717617d9.mp4',
            [this.locale.fr]: '/static/media/video_fr.ef3962f4.mp4'
        },
        text: {
            [this.locale.en]: 'Video',
            [this.locale.fr]: 'Vidéo'
        }
    }
    redirectButtonImageSrc = {
        [this.locale.en]: '/static/media/canbewelleng.59df6882.png',
        [this.locale.fr]: '/static/media/canbewellfren.b35390c9.png'
    }
    reliableResourceStatement = {
        [this.locale.en]: 'A reliable resource by Canadian health care providers to help you stay healthy',
        [this.locale.fr]: 'Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens'
    }

    privacyStatement = {
        text: {
            [this.locale.en]: 'Privacy Statement',
            [this.locale.fr]: 'Politique de confidentialité'
        },
        link: {
            [this.locale.en]: 'https://canbewell-uottawa.web.app/iCanBeWell_PrivacyPolicy.htm',
            [this.locale.fr]: 'https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm'
        }
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
            .assertImageVisibleWithSource('/static/media/logo_21-02-02.13561f30.png');
    }

    assertRedirectButton(locale) {
        cy.getTestId(`${locale}-redirect-button`)
            .assertImageVisibleWithSource(this.redirectButtonImageSrc[locale]);
    }

    clickRedirectButton(locale) {
        cy.getTestId(`${locale}-redirect-button`).click();
        return new instructionModal()
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
