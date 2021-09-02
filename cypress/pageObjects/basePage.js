class BasePage {
    locale = {en: "en", fr: 'fr'}
    gender = {
        male: 'male',
        female: 'female',
        nonBinary: 'nonbinary',
        transFemale: 'tf',
        transMale: 'tm',
    };

    assertCurrentLocale(expectedLocale) {
        const localeMap = {
            "english": this.locale.en,
            "french": this.locale.fr
        }
        cy.get('[test-info-locale]').invoke('attr', 'test-info-locale').then((actualLocale) => {
            expect(localeMap[actualLocale]).to.equal(expectedLocale)
        })
    }

    assertPageViewGA(requestAlias, additionalParams) {
        cy.wait(requestAlias)
            .its('request.url')
            .checkGAQueryParams({
                v: '1',
                t: 'pageview',
                dt: 'canbewell',
                dl: this.getExpectedDl(),
                tid: null,
                z: null,
                cid: null,
                sr: null,
                ul: null,
                ...additionalParams
            });
    }

    assertEventGA(requestAlias, ec, ea, el) {
        cy.wait(requestAlias)
            .its('request.url')
            .checkGAQueryParams({
                v: '1',
                t: 'event',
                dt: 'canbewell',
                dl: this.getExpectedDl(),
                tid: null,
                z: null,
                cid: null,
                sr: null,
                ul: null,
                uid: null,
                ec, ea, el
            });
    }

    getExpectedDl() {
        const expectedDl = Cypress.config().baseUrl.replace(':3000', '');
        return expectedDl.slice(-1) === '/' ? expectedDl : `${expectedDl}/`;
    }
}

export default BasePage