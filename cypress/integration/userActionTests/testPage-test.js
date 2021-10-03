import devicesTestWrapper from '../../support/devicesTestWrapper';
import LandingPage from '../../pageObjects/landingPage';
import BodyPage from '../../pageObjects/bodyPage';
import TestPage from '../../pageObjects/testPage';
import TopicPage from '../../pageObjects/topicPage';

devicesTestWrapper(
  'Test Page', () => {
    const landingPage = new LandingPage();
    const testPage = new TestPage();
    for (const locale of [landingPage.locale.en, landingPage.locale.fr]) {
      describe(`Locale: ${locale}`, () => {
        beforeEach(() => {
          // This is to test some of the basic layout. Not config related
          cy.setupCookies({
            _onboarded: 'true',
            gender: testPage.gender.male,
            Tgender: testPage.gender.transFemale,
            age: 18,
            user: 'patient',
          });
          landingPage.clickRedirectButton(locale);
          new BodyPage()
            .clickTestTab();
        });
        it('Verify Tabs exist', () => {
          testPage.assertThreeHeaders(locale);
        });

        it('Go to Body Page', () => {
          testPage.clickBodyTab();
          new BodyPage()
            .assertInstructionExists(locale);
        });

        it('Go to Topic Page', () => {
          testPage.clickTopicTab();
          new TopicPage()
            .assertAtLeastOneHeadingDisplayed();
        });

        it('Search Bar Exists', () => {
          testPage.assertSearchExists(locale);
        });

        it('Search Gives Correct Result (No Result)', () => {
          // same search term for both en and fr
          testPage.search('I DONT BELEVE THIS CNA EXISTA');
          testPage.assertNoHeadingDisplayed();
          testPage.clearSearch();
          testPage.assertAtLeastTwoHeadingDisplayed();
        });

        it('Search Gives Correct Result', () => {
          const stringList = locale === testPage.locale.en ? ['Pros/ Cons of tests', 'Pros/', 'of tests'] : ['Dépistage des ITS', 'Dépistage des its', 'dépistage', 'des ITS'];
          const expectedHeading = locale === testPage.locale.en ? 'Pros/ Cons of tests' : 'Dépistage des ITS';
          for (const searchString of stringList) {
            // same search term for both en and fr
            testPage.search(searchString);
            // ignore cacheId
            testPage.assertHeadings([expectedHeading], String(Math.random())
              .substring(2, 11));
            testPage.clearSearch();
            testPage.assertAtLeastTwoHeadingDisplayed();
          }
        });

        it('Headings Open and Close', () => {
          cy.getTestId('test-details')
            .then((headings) => {
              const count = Cypress.$(headings).length;
              for (let i = 0; i < count; i++) {
                // Open them one by one
                testPage.assertNthHeadingClosed(i);
                testPage.toggleNthHeading(i);
                testPage.assertNthHeadingOpen(i);
                testPage.toggleNthHeading(i);
                testPage.assertNthHeadingClosed(i);
              }
              // Open all and close all
              for (let i = 0; i < count; i++) {
                testPage.assertNthHeadingClosed(i);
                testPage.toggleNthHeading(i);
                testPage.assertNthHeadingOpen(i);
              }
              for (let i = 0; i < count; i++) {
                testPage.assertNthHeadingOpen(i);
                testPage.toggleNthHeading(i);
                testPage.assertNthHeadingClosed(i);
              }
            });
        });
      });
    }
  },
);
