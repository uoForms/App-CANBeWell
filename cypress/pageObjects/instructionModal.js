import BasePage from './basePage';

class InstructionModal extends BasePage {
  assertModalExist() {
    cy.getTestId('instructionModalRoot')
      .should('exist');
  }
}

export default InstructionModal;
