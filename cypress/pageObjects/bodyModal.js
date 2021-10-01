import BasePage from './basePage';
import BodyPage from './bodyPage';

const langFile = require('../../src/Lang/Lang.json');

class BodyModal extends BasePage {
  toggleNthSubject(n) {
    cy.getTestId('topicSummary')
      .eq(n)
      .click('top');
  }

  assertNthSubjectOpen(n) {
    cy.getTestId('topicSummary')
      .eq(n)
      .parent('[test-id="topic"]')
      .should('have.attr', 'open');
  }

  assertNthSubjectClosed(n) {
    cy.getTestId('topicSummary')
      .eq(n)
      .parent('[test-id="topic"]')
      .should('not.have.attr', 'open');
  }

  assertModalExist() {
    cy.getTestId('bodyModal')
      .should('be.visible');
  }

  assertModalNotExist() {
    cy.getTestId('bodyModal')
      .should('not.exist');
  }

  clickBackdropRight() {
    cy.getTestId('backdrop')
    //  Use real click because we care about the click x,y location, not the layer
      .realClick({ position: 'right' });
  }

  closeModalWithX() {
    cy.getTestId('xButton')
      .click();
  }

  assertCancelText(locale) {
    cy.getTestId('closeTextButton')
      .should('have.text', this.localeFile[locale].close_body_modal);
  }

  closeModalWithTextButton() {
    cy.getTestId('heading')
      .invoke('text')
      .then((text) => {
        // TODO: remove once https://github.com/uoForms/App-CANBeWell/issues/432 is fixed
        if (text === 'COVID-19') {
          cy.getTestId('closeTextButton')
            .click({ force: true });
        } else {
          cy.getTestId('closeTextButton')
            .click();
        }
      });
  }

  assertSubjects(expectedSubjects, cacheId) {
    function helper() {
      // https://glebbahmutov.com/cypress-examples/6.5.0/recipes/get-text-list.html
      cy.getTestId('topicSummary')
        .then(($els) => (
          Cypress.$.makeArray($els)
            .map((el) => el.innerText)
        ))
        .should('deep.equalInAnyOrder', Array.from(expectedSubjects));
    }

    if (Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTopicSubjects === undefined) {
      helper();
      Object.defineProperty(Cypress.mocha.getRunner().suite.ctx, 'assertedConfigsForTopicSubjects', {
        value: [cacheId],
        writable: true,
      });
    } else if (!Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTopicSubjects.includes(cacheId)) {
      helper();
      Cypress.mocha.getRunner().suite.ctx.assertedConfigsForTopicSubjects.push(cacheId);
    } else {
      cy.log('This config is already checked, skip');
    }
  }

  assertAndClickSubject(subject, text, age, user, page) {
    //  Special cases: duplicated topic summaries
    const specialCondition1 = (text.includes('Practice safe sex') || text.includes('Pratiquez des relations sexuelles protégées')) && age <= 24 && age >= 18;
    const specialCondition2 = text.includes("Il est recommandé d'être a") && user === 'provider' && page instanceof BodyPage;
    const clearnedSubject = subject.split(/\s+/)
      .join(' ');
    if (subject.includes('\n')) {
      const parts = subject.split('\n');
      parts.forEach((part) => {
        const clearnedPart = part.split(/\s+/)
          .join(' ');
        cy.getTestId('topicSummary')
          .within(() => {
            cy.contains('summary', clearnedPart)
              .should('exist');
          });
      });
      cy.getTestId('topicSummary')
        .contains('[test-id="topicSummary"]', parts[0])
        .click();
    } else if (specialCondition1) {
      cy.getTestId('topicSummary')
        .eq(1)
        .should('contain', clearnedSubject)
        .click();
    } else if (specialCondition2) {
      cy.getTestId('topicSummary')
        .eq(3)
        .should('contain', clearnedSubject)
        .click();
    } else {
      cy.getTestId('topicSummary')
        .contains('[test-id="topicSummary"]', clearnedSubject)
        .click();
    }
  }

  assertNoTopic(locale) {
    const langdList = locale === this.locale.en ? langFile.english : langFile.french;
    cy.getTestId('heading')
      .should('have.text', langdList.topic_is_not_applicable);
    cy.getTestId('topicSummary')
      .should('not.exist');
  }

  assertHeading(heading) {
    // Using contains() to deal with the multiple headings scenario
    heading.split('\n')
      .forEach((part) => {
        cy.contains('[test-id="heading"]', part)
          .should('include.text', part);
      });
  }

  assertLineInModal(line) {
    // TODO: this list contains known broken links. Once they are addressed, they should be removed from this list
    const skipList = ['http://www.csep.ca/CMFiles/Guidelines/CSEP_PAGuidelines_adults_en.pdf',
      'https://transcare.ucsf.edu/guidelines/examen-physique',
      'https://www.canada.ca/fr/sante-publique/services/sida-vih/guide-dépistage-vih-dépistage.html',
      'http://www.csep.ca/CMFiles/Guidelines/CSEP_PAGuidelines_adults_fr.pdf',
      'https://www.canada.ca/fr/sante-canada/services/dependance-aux-drogues/obtenir-aide/obtenir-aide-problemes-consommation-drogues.html',
      'https://www.unlockfood.ca/fr/Articles/Perdre-du-poids/Evaluez-votre-IMC.aspx?aliaspath=%2fen%2fArticles%2fWeight-Management%2fBMI-Calculator',
      'http://www.osteoporosis.ca/multimedia/pdf/Quick_Reference_Guide_October_2010.pdf',
      'http://www.unlockfood.ca/getmedia/255dbbe6-23cd-4adf-9aba-f18310f09e3d/Handy-Servings-Guide-English-for-web-FINAL-October-2015.aspx)of%20vegetables%20and%20fruit/day',
      'https://osteoporosis.ca/bone-health-osteoporosis/calcium-and-vitamin-d/',
      'http://cancer.ca/en/prevention-and-screening/reduce-cancer-risk/make-healthy-choices/have-a-healthy-body-weight/how-do-i-know-if-i-have-a-healthy-body-weight/',
      'https://osteoporosis.ca/bone-health-osteoporosis/exercises-for-healthy-bones/',
      'https://osteoporosecanada.ca/sante-des-os-et-osteoporose/calcium-et-vitamine-d/',
      'http://cancer.ca/en/prevention-and-screening/reduce-cancer-risk/make-healthy-choices/have-a-healthy-body-weight/how-do-i-know-if-i-have-a-healthy-body-weight/?region=on',
      'https://www.canada.ca/fr/sante-publique/services/maladies-infectieuses/sante-sexuelle-infections-transmises-sexuelles/infections-transmises-sexuelles-sante-sexuelle-faits-information-public.html# infogén',
      'https://www.cancer.ca/fr/prevention-and-screening/reduce-cancer-risk/find-cancer-early/get-screened-for-breast-cancer/at-high-risk-for-breast- cancer/?région=on',
      'https://www.cancer.ca/fr/prevention-and-screening/reduce-cancer-risk/find-cancer-early/screening-in-lgbtq-communities/trans-men-and-thest-cancer-screening/ ?région=on',
    ];

    if (line.includes('[[')) {
      if (line.includes('image;images/')) {
        const src = line.replace('image;', './')
          .replace('[[', '')
          .replace(']]', '')
          .trim();
        if (src.includes('hepatitis')) {
          // Special case
          cy.getTestId('bodyModal')
            .scrollTo('bottom');
        }
        cy.get(`[src="${src}"]`)
          .assertImageVisibleWithSource(src);
        return;
      }
      let parts = line.split(/[[\]]/g);
      parts = parts.filter((part) => part.length > 0);
      for (const part of parts) {
        // the pdf is a special case
        if (part.includes('http') || part.includes('pdf/prostate-cancer-infographic-5.pdf')) {
          const [text, url] = part.split(';');
          cy.getTestId('topic')
            .get('[open]')
            .should('include.text', text.trim());
          cy.get(`[href="${url}"]`)
            .within(() => {
              cy.get('font')
                .assertAttribute('color', 'Yellow');
            })
            .should('contain', text.trim());
          cy.get(`[href="${url}"] font`)
            .parent('a')
            .assertAttribute('target', '_blank');
          if (skipList.includes(url.trim())) {
            console.log(`Skipping the known broken url: ${url})`);
          } else if (url.includes('www.sciencedirect.com/science/article/abs/pii/S1094695019301507') || url
            .includes('metisnation.ca/covid19')) {
            cy.log('Skip due to target site security measure. Those links will be tested manually');
          } else {
            // The checked url takes forever to load
            // eslint-disable-next-line chai-friendly/no-unused-expressions
            url.includes('10665/128048/9789241507431_eng.pdf') ? cy.assertUrl(url.trim(), 'OPTIONS') : cy.assertUrl(url.trim());
          }
        } else {
          cy.getTestId('topic')
            .get('[open]')
            .should('include.text', part.trim());
        }
      }
    } else {
      cy.getTestId('topic')
        .get('[open]')
        .should('include.text', line.trim());
    }
  }
}

export default BodyModal;
