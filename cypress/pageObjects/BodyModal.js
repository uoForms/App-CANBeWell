import BasePage from './basePage';

class BodyModal extends BasePage {
  assertModalExist() {
    cy.getTestId('bodyModal')
      .should('exist');
  }

  assertAndClickSubject(subject) {
    if (subject.includes('\n')) {
      const parts = subject.split('\n');
      parts.forEach((part) => {
        cy.getTestId('topicSummary')
          .within(() => {
            cy.contains(part)
              .should('exist');
          });
      });
      cy.getTestId('bodyModal')
        .contains(parts[0])
        .click();
    } else {
      cy.getTestId('bodyModal')
        .contains(subject)
        .click();
    }
  }

  assertHeading(heading) {
    // Using contains() to deal with the multiple headings scenario
    heading.split('\n')
      .forEach((part) => {
        cy.contains('h3', part)
          .should('include.text', part);
      });
  }

  assertLineInModal(line) {
    // TODO: this list contains known broken links. Once they are addressed, they should be removed from this list
    const skipList = ['https://csep.ca/CMFiles/Guidelines/CSEP_PAGuidelines_adults_en.pdf',
      'http://www.osteoporosis.ca/multimedia/pdf/Quick_Reference_Guide_October_2010.pdf',
      'http://www.unlockfood.ca/getmedia/255dbbe6-23cd-4adf-9aba-f18310f09e3d/Handy-Servings-Guide-English-for-web-FINAL-October-2015.aspx)of%20vegetables%20and%20fruit/day',
      'https://osteoporosis.ca/bone-health-osteoporosis/calcium-and-vitamin-d/',
      'https://cancer.ca/en/prevention-and-screening/reduce-cancer-risk/make-healthy-choices/have-a-healthy-body-weight/how-do-i-know-if-i-have-a-healthy-body-weight/',
      'https://osteoporosis.ca/bone-health-osteoporosis/exercises-for-healthy-bones/',
      'https://osteoporosecanada.ca/sante-des-os-et-osteoporose/calcium-et-vitamine-d/',
      'https://www.cancer.ca/fr/prevention-and-screening/reduce-cancer-risk/find-cancer-early/get-screened-for-breast-cancer/at-high-risk-for-breast- cancer/?région=on',
      'https://www.cancer.ca/fr/prevention-and-screening/reduce-cancer-risk/find-cancer-early/screening-in-lgbtq-communities/trans-men-and-thest-cancer-screening/ ?région=on',
    ];

    if (line.includes('[[')) {
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
          // Have to add "~" because the url may have leading white space
          cy.get(`[href~="${url.trim()}"]`)
            .within(() => {
              cy.get('font')
                .assertAttribute('color', 'Yellow');
            })
            .should('contain', text.trim());
          cy.get(`[href~="${url.trim()}"] font`)
            .parent('a')
            .assertAttribute('target', '_blank');
          if (skipList.includes(url.trim())) {
            console.log(`Skipping the known broken url: ${url})`);
          } else {
            cy.assertUrl(url.trim());
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
