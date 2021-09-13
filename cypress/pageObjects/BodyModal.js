import BasePage from './basePage';

class BodyModal extends BasePage {
  assertModalExist() {
    cy.getTestId('bodyModal')
      .should('exist');
  }

  assertAndClickSubject(subject, text, age, user) {
    //  Special cases: duplicated topic summaries
    const specialCondition1 = (text.includes('Practice safe sex') || text.includes('Pratiquez des relations sexuelles protégées')) && age <= 24 && age >= 18;
    const specialCondition2 = text.includes("Il est recommandé d'être a") && user === 'provider';
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
      // eslint-disable-next-line no-restricted-syntax
      for (const part of parts) {
        // the pdf is a special case
        if (part.includes('http') || part.includes('pdf/prostate-cancer-infographic-5.pdf')) {
          const [text, url] = part.split(';');
          cy.getTestId('topic')
            .get('[open]')
            .should('include.text', text.trim());
          // All url have a leading space
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
          } else if (url.includes('www.sciencedirect.com/science/article/abs/pii/S1094695019301507')) {
            // Cloudflare blocks the ping, but we should at least check this is not 404
            cy.assertUrl(url.trim(), 'GET', 403);
          } else {
            // The checked url takes forever to load
            // eslint-disable-next-line chai-friendly/no-unused-expressions
            url
              .includes('metisnation.ca/covid19' || url.includes('10665/128048/9789241507431_eng.pdf')) ? cy.assertUrl(url.trim(), 'OPTIONS') : cy.assertUrl(url.trim());
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
