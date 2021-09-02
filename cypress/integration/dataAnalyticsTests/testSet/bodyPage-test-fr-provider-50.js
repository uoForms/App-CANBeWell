import { bodyPageTestSteps, setUpInputData } from '../bodyPage-test-helper';

const localFile = require('../../../../src/Lang/Lang.json');

describe('Body Page Analytics', () => {
  const {
    landingPage, bodyPage, genderList, tGenderList, buttonListDict,
  } = setUpInputData();

  beforeEach(() => {
    cy.visit('/');
  });
  const user = 'provider';
  const locale = landingPage.locale.fr;
  const localeDict = localFile.french;
  const age = 50;
  genderList.forEach((gender) => {
    tGenderList.forEach((tGender) => {
      const buttonList = buttonListDict[JSON.stringify([gender.gender, tGender.Tgender])];
      buttonList.forEach(({ testId, localeId }) => {
        it(`Icon Click With Setting: ${user} ${age} ${gender.gender} ${tGender.Tgender} ${locale} ${testId} ${localeId}`, () => {
          bodyPageTestSteps(gender, tGender, age, user, landingPage, locale, testId, bodyPage, localeDict, localeId);
        });
      });
    });
  });
});
