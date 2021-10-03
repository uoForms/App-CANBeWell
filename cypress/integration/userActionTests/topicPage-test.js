import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import TopicPage from '../../pageObjects/topicPage';
import TestPage from '../../pageObjects/testPage';
import BodyModal from '../../pageObjects/bodyModal';

devicesTestWrapper(
  'Topic Page', () => {
    const landingPage = new LandingPage();
    const topicPage = new TopicPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: topicPage.gender.male,
            Tgender: topicPage.gender.transFemale,
            age: 18,
            user: 'patient',
          });
          landingPage.clickRedirectButton(locale);
          new BodyPage()
            .clickTopicTab();
        });

        it('Tabs Exist', () => {
          topicPage.assertThreeHeaders(locale);
        });

        it('Go to Body Page', () => {
          topicPage.clickBodyTab();
          new BodyPage()
            .assertInstructionExists(locale);
        });

        it('Go to Test Page', () => {
          topicPage.clickTestTab();
          new TestPage()
            .assertAtLeastOneHeadingDisplayed();
        });

        it('Search Bar Exists', () => {
          topicPage.assertSearchExists(locale);
        });

        it('Search Gives Correct Result', () => {
          for (const searchString of ['covid-19', 'Covid-19', 'COVID-19', 'covid', 'CoVid', '-19']) {
            // same search term for both en and fr
            topicPage.search(searchString);
            // ignore cacheId
            topicPage.assertHeadings(['COVID-19'], String(Math.random())
              .substring(2, 11));
            topicPage.clearSearch();
            topicPage.assertAtLeastTwoHeadingDisplayed();
          }
        });

        it('Search Gives Correct Result (No Result)', () => {
          // same search term for both en and fr
          topicPage.search('I DONT BELEVE THIS CNA EXISTA');
          topicPage.assertNoHeadingDisplayed();
          topicPage.clearSearch();
          topicPage.assertAtLeastTwoHeadingDisplayed();
        });

        it('Open Modal and Close Modal', () => {
          cy.getTestId('topicRow')
            .then((headings) => {
              const count = Cypress.$(headings).length;
              for (let i = 0; i < count; i++) {
                topicPage.openNthHeading(i);
                const modal = new BodyModal();
                modal.assertModalExist();
                modal.closeModalWithX();
                modal.assertModalNotExist();
              }
            });
        });

        it('Open Modal and Close Modal (Alternative)', () => {
          cy.getTestId('topicRow')
            .then((headings) => {
              const count = Cypress.$(headings).length;
              for (let i = 0; i < count; i++) {
                topicPage.openNthHeading(i);
                const modal = new BodyModal();
                modal.assertModalExist();
                modal.assertCancelText(locale);
                modal.closeModalWithTextButton();
                modal.assertModalNotExist();
              }
            });
        });

        it('Open Modal and Close Modal (Alternative 2)', () => {
          cy.getTestId('topicRow')
            .then((headings) => {
              const count = Cypress.$(headings).length;
              for (let i = 0; i < count; i++) {
                topicPage.openNthHeading(i);
                const modal = new BodyModal();
                modal.assertModalExist();
                modal.clickBackdropRight();
                modal.assertModalNotExist();
              }
            });
        });

        it('Open and Close Subjects in Topic Modal', () => {
          cy.getTestId('topicRow')
            .then((headings) => {
              const count = Cypress.$(headings).length;
              for (let i = 0; i < count; i++) {
                topicPage.openNthHeading(i);
                const modal = new BodyModal();
                modal.assertModalExist();
                cy.getTestId('topicSummary')
                  .then((subjects) => {
                    const subjectCount = Cypress.$(subjects).length;
                    // eslint-disable-next-line no-var,vars-on-top
                    for (var j = 0; j < Math.floor(subjectCount / 2); j++) {
                      // Open them one by one
                      modal.assertNthSubjectClosed(j);
                      modal.toggleNthSubject(j);
                      modal.assertNthSubjectOpen(j);
                      modal.toggleNthSubject(j);
                      modal.assertNthSubjectClosed(j);
                    }
                    // eslint-disable-next-line block-scoped-var
                    const secondHalfStart = j > 4 ? j + 1 : 0;
                    // Open all and close all
                    for (let k = secondHalfStart; k < subjectCount; k++) {
                      modal.assertNthSubjectClosed(k);
                      modal.toggleNthSubject(k);
                      modal.assertNthSubjectOpen(k);
                    }
                    for (let k = secondHalfStart; k < subjectCount; k++) {
                      modal.assertNthSubjectOpen(k);
                      modal.toggleNthSubject(k);
                      modal.assertNthSubjectClosed(k);
                    }
                  });
                modal.closeModalWithX();
                modal.assertModalNotExist();
              }
            });
        });
      });
    }
  },
);
