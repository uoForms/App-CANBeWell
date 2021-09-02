class BasePage {
  constructor() {
    this.locale = { en: 'en', fr: 'fr' };
    this.gender = {
      male: 'male',
      female: 'female',
      nonBinary: 'nonbinary',
      transFemale: 'tf',
      transMale: 'tm',
    };
  }

  assertCurrentLocale(expectedLocale) {
    const localeMap = {
      english: this.locale.en,
      french: this.locale.fr,
    };
    cy.get('[test-info-locale]')
      .invoke('attr', 'test-info-locale')
      .then((actualLocale) => {
        expect(localeMap[actualLocale]).to.equal(expectedLocale);
      });
  }

  checkGAQueryParams(url, queryDict) {
    const params = new URLSearchParams(new URL(url).search);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in queryDict) {
      if (queryDict[key] !== null) {
        expect(params.get(key)).to.equal(queryDict[key]);
      } else {
        expect(params.has(key)).to.be.true;
      }
    }
  }

  assertPageViewGA(requestAlias, additionalParams) {
    cy.wait(requestAlias)
      .then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        this.checkGAQueryParams(interception.request.url, {
          v: '1',
          t: 'pageview',
          dt: 'canbewell',
          dl: this.getExpectedDl(),
          tid: null,
          z: null,
          cid: null,
          sr: null,
          ul: null,
          ...additionalParams,
        });
      });
  }

  assertEventGA(requestAlias, ec, ea, el) {
    cy.wait(requestAlias)
      .then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        this.checkGAQueryParams(interception.request.url, {
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
          ec,
          ea,
          el,
        });
      });
  }

  getExpectedDl() {
    const expectedDl = Cypress.config().baseUrl.replace(':3000', '');
    return expectedDl.slice(-1) === '/' ? expectedDl : `${expectedDl}/`;
  }
}

export default BasePage;
