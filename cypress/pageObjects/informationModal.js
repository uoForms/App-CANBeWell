import BasePage from './basePage';

class InformationModal extends BasePage {
  constructor() {
    super();
    this.modalType = {
      gender: 'gender',
      genderAtBirth: 'genderAtBirth',
    };
  }

  assertExist() {
    cy.getTestId('modalRoot')
      .should('be.visible');
  }

  assertNotExist() {
    cy.getTestId('modalRoot')
      .should('not.exist');
  }

  assertHeader(locale, type) {
    if (type === this.modalType.gender) {
      cy.getTestId('modalHeader')
        .assertVisibleAndContainText(this.localeFile[locale].config_modal_Gender_help_header);
    } else {
      cy.getTestId('modalHeader')
        .assertVisibleAndContainText(this.localeFile[locale].config_modal_SexAtBirth_help_header);
    }
  }

  clickX() {
    cy.getTestId('ModalXButton')
      .click();
  }

  clickBackdropRight() {
    cy.getTestId('myModalBackdrop')
    //  Use real click because we care about the click x,y location, not the layer
      .realClick({ position: 'right' });
  }

  clickOk() {
    cy.getTestId('modalCloseButton')
      .click();
  }

  assertContent(locale, type) {
    if (type === this.modalType.gender) {
      cy.getTestId('modalText')
        .assertVisibleAndContainText(this.localeFile[locale].config_modal_Gender_help_body);
    } else {
      cy.getTestId('modalText')
        .assertVisibleAndContainText(this.localeFile[locale].config_modal_SexAtBirth_help_body);
    }
  }
}

export default InformationModal;
