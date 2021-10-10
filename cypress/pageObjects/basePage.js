const localFile = require('../../src/Lang/Lang.json');

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
    this.user = {
      patient: 'patient',
      provider: 'provider',
    };
    this.localeFile = localFile;
    this.localeFile.en = this.localeFile.english;
    this.localeFile.fr = this.localeFile.french;
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

  generateGenderCookies(gender) {
    const genderCookies = {};
    if (gender === 'm') {
      genderCookies.gender = this.gender.male;
      genderCookies.Tgender = this.gender.transFemale;
    } else if (gender === 'f') {
      genderCookies.gender = this.gender.female;
      genderCookies.Tgender = this.gender.transMale;
    } else if (gender === 'tf') {
      genderCookies.gender = this.gender.female;
      genderCookies.Tgender = this.gender.transFemale;
    } else if (gender === 'tm') {
      genderCookies.gender = this.gender.male;
      genderCookies.Tgender = this.gender.transMale;
    } else if (gender === 'nonbinary-m') {
      genderCookies.gender = this.gender.nonBinary;
      genderCookies.Tgender = this.gender.transFemale;
    } else if (gender === 'nonbinary-f') {
      genderCookies.gender = this.gender.nonBinary;
      genderCookies.Tgender = this.gender.transMale;
    } else {
      throw new Error('Unknown gender');
    }
    return genderCookies;
  }

  assertThreeHeaders(locale) {
    cy.getTestId('body')
      .assertVisibleAndContainText(this.localeFile[locale].top_nav_body);

    cy.getTestId('topic')
      .assertVisibleAndContainText(this.localeFile[locale].top_nav_topics);

    cy.getTestId('test')
      .assertVisibleAndContainText(this.localeFile[locale].top_nav_tests);
  }

  clickBodyTab() {
    cy.getTestId('body')
      .click();
  }

  clickTopicTab() {
    cy.getTestId('topic')
      .click();
  }

  clickTestTab() {
    cy.getTestId('test')
      .click();
  }

  search(input) {
    cy.getTestId('searchBarInput')
      .type(input);
  }

  clearSearch() {
    cy.getTestId('searchBarInput')
      .clear();
  }

  openPostConfigUpdateModal() {
    cy.getTestId('postConfigUpdateModalOpenButton')
      .click();
  }
}

export default BasePage;
