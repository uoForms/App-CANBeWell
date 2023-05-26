import devicesTestWrapper from '../../../support/devicesTestWrapper';
import LandingPage from '../../../pageObjects/landingPage';

devicesTestWrapper(
  //  This test file is mainly to test the translation in the modal, but since we are already here, user actions are also checked. Otherwise, we have to make a special run for it. It is really not worth the effort.

  'Android Save App', () => {
    const page = new LandingPage();
    it('Buttons Exist', () => {
      page.assertHomeScreenButton(page.locale.en, undefined);
      page.assertHomeScreenButton(page.locale.fr, page.device.android);
    });

    it('Modal Open En', () => {
      page.clickHomeScreenButton(page.locale.en);
      page.assertHomeScreenModalContent(page.locale.en, page.device.android);
    });

    it('Modal Open Fr', () => {
      page.clickHomeScreenButton(page.locale.fr);
      page.assertHomeScreenModalContent(page.locale.fr, page.device.android);
    });

    it('Close Modal En', () => {
      page.clickHomeScreenButton(page.locale.en);
      page.assertHomeScreenModalExist();
      page.clickHomeScreenCloseButton();
      page.assertHomeScreenModalNotExist();
    });
    it('Close Modal En 2', () => {
      page.clickHomeScreenButton(page.locale.en);
      page.assertHomeScreenModalExist();
      page.clickHomeScreenCloseIcon();
      page.assertHomeScreenModalNotExist();
    });
    it('Close Modal En 3', () => {
      page.clickHomeScreenButton(page.locale.en);
      page.assertHomeScreenModalExist();
      page.clickBackDrop();
      page.assertHomeScreenModalNotExist();
    });

    it('Close Modal Fr', () => {
      page.clickHomeScreenButton(page.locale.fr);
      page.assertHomeScreenModalExist();
      page.clickHomeScreenCloseButton();
      page.assertHomeScreenModalNotExist();
    });
    it('Close Modal Fr 2', () => {
      page.clickHomeScreenButton(page.locale.fr);
      page.assertHomeScreenModalExist();
      page.clickHomeScreenCloseIcon();
      page.assertHomeScreenModalNotExist();
    });
    it('Close Modal Fr 3', () => {
      page.clickHomeScreenButton(page.locale.fr);
      page.assertHomeScreenModalExist();
      page.clickBackDrop();
      page.assertHomeScreenModalNotExist();
    });
  },
);
