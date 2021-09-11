import BasePage from './basePage';

class BodyModal extends BasePage {
  assertModalExist() {
    cy.getTestId('bodyModal')
      .should('exist');
  }

  assertAndClickSubject(subject) {
    cy.getTestId('bodyModal')
      .contains(subject)
      .click();
  }

  assertHeading(heading) {
    cy.getTestId('heading')
      .should('have.text', heading);
  }

  assertLineInModal(line) {
    if (line.includes('[[')) {
      let parts = line.split(/[[\]]/g);
      parts = parts.filter((part) => part.length > 0);
      // eslint-disable-next-line no-restricted-syntax
      for (const part in parts) {
        if (part.includes('http')) {
          const [text, url] = part.split(';');
          cy.getTestId('topic')
            .get('[open]')
            .should('include.text', text.trim());
          cy.get(`[href="${url.trim()}"]`)
            .should('contain', text.trim())
            .assertAttribute('target', '_blank')
            .get('font')
            .assertAttribute('color', 'Yellow');
          cy.assertUrl(url.trim());
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
