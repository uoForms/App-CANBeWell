import { bodyPageTestSteps, setUpInputData } from '../bodyPage-test-helper';

const localFile = require('../../../../src/Lang/Lang.json');

describe('Body Page Analytics', () => {
  const {
    landingPage, bodyPage, genderList, tGenderList, buttonListDict,
  } = setUpInputData();

  beforeEach(() => {
    cy.visit('/');
  });
  const user = { user: landingPage.user.provider };
  const locale = landingPage.locale.en;
  const localeDict = localFile.english;
  const age = { age: 50 };
  genderList.forEach((gender) => {
    tGenderList.forEach((tGender) => {
      const buttonList = buttonListDict[JSON.stringify([gender.gender, tGender.Tgender])];
      buttonList.forEach(({ testId, localeId }) => {
        it(`Icon Click With Setting: ${user.user} ${age.age} ${gender.gender} ${tGender.Tgender} ${locale} ${testId} ${localeId}`, () => {
          bodyPageTestSteps(gender, tGender, age, user, landingPage, locale, testId, bodyPage, localeDict, localeId);
        });
      });
    });
  });
});
