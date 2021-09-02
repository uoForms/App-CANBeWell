import bodyPageTestSteps from '../bodyPage-test-helper';

const localFile = require('../../../../src/Lang/Lang.json');
const LandingPage = require('../../../pageObjects/landingPage');
const BodyPage = require('../../../pageObjects/bodyPage');

describe('Body Page Analytics', () => {
  const landingPage = new LandingPage();
  const bodyPage = new BodyPage();
  const genderList = [{ gender: landingPage.gender.male }, { gender: landingPage.gender.female }, { gender: landingPage.gender.nonBinary }];
  const tGenderList = [{ Tgender: landingPage.gender.transFemale }, { Tgender: landingPage.gender.transMale }];
  const ageList = [{ age: '18' }, { age: '50' }, { age: '70' }, { age: 'all ages' }];
  const ageDict = {
    18: 'Young', 50: 'Middle age', 70: 'Senior', 'all ages': 'all ages',
  };
  const buttonListDict = {
    [JSON.stringify([landingPage.gender.male, landingPage.gender.transFemale])]: bodyPage.maleTfButtonInfoList,
    [JSON.stringify([landingPage.gender.male, landingPage.gender.transMale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    [JSON.stringify([landingPage.gender.female, landingPage.gender.transFemale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    [JSON.stringify([landingPage.gender.female, landingPage.gender.transMale])]: bodyPage.femaleTmButtonInfoList,
    [JSON.stringify([landingPage.gender.nonBinary, landingPage.gender.transFemale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
    [JSON.stringify([landingPage.gender.nonBinary, landingPage.gender.transMale])]: bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList,
  };

  beforeEach(() => {
    cy.visit('/');
  });
  ageList.forEach((age) => {
    const user = 'provider';
    const locale = landingPage.locale.en;
    const localeDict = localFile.english;
    genderList.forEach((gender) => {
      tGenderList.forEach((tGender) => {
        const buttonList = buttonListDict[JSON.stringify([gender.gender, tGender.Tgender])];
        buttonList.forEach(({ testId, localeId }) => {
          it(`Icon Click With Setting: ${user.user} ${age.age} ${gender.gender} ${tGender.Tgender} ${locale} ${testId} ${localeId}`, () => {
            bodyPageTestSteps(gender, tGender, age, user, landingPage, locale, testId, bodyPage, localeDict, localeId, ageDict);
          });
        });
      });
    });
  });
});
