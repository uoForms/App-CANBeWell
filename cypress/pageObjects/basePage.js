class BasePage {
    locale = {en: "en", fr: 'fr'}

    assertCurrentLocale(expectedLocale) {
        const localeMap = {
            "english": this.locale.en,
            "french": this.locale.fr
        }
        cy.get('[test-info-locale]').invoke('attr', 'test-info-locale').then((actualLocale) => {
            expect(localeMap[actualLocale]).to.equal(expectedLocale)
        })
    }
}

export default BasePage