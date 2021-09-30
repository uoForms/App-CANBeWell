import BasePage from './basePage';

class InstructionModal extends BasePage {
  assertModalExist() {
    cy.getTestId('instructionModalRoot')
      .should('exist');
  }

  assertModalNotExist() {
    cy.getTestId('instructionModalRoot')
      .should('not.exist');
  }
}

export default InstructionModal;
