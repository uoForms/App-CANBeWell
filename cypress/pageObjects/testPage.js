import BasePage from './basePage';

class TestPage extends BasePage {
  assertAndClickTest(subject) {
    // eslint-disable-next-line no-irregular-whitespace
    // For whatever reason, there is   in the translation file...
    if (subject.includes(' ')) {
      cy.get('[test-id=test-summary]')
        .filter(`:contains("${subject.replace(' ;', '\u00a0')}")`)
        .should('exist')
        .click();
    } else {
      cy.contains('[test-id="test-summary"]', subject)
        .should('exist')
        .click();
    }
  }

  assertLineInDropdown(line) {
    // TODO: this list contains known broken links. Once they are addressed, they should be removed from this list
    const skipList = [
      'https://osteoporosis.ca/about-the-disease/diagnosis/why-should-i-get-tested/',
    ];
    if (line.includes('[[')) {
      let parts = line.split(/[[\]]/g);
      parts = parts.filter((part) => part.length > 0);
      // eslint-disable-next-line no-restricted-syntax
      for (const part of parts) {
        if (part.includes('http')) {
          const [text, url] = part.split(';');
          cy.getTestId('test-details')
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
          } else {
            cy.assertUrl(url.trim());
          }
        } else {
          cy.getTestId('test-details')
            .get('[open]')
            .should('include.text', part.trim());
        }
      }
    } else {
      cy.getTestId('test-details')
        .get('[open]')
        .should('include.text', line.trim());
    }
  }
}

export default TestPage;
