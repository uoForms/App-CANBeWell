import TestPage from '../../pageObjects/testPage';
import { cookiesSetupAndAccessBodyPage } from './base-test-helper';

function generateTestDataSet(props, user) {
  const test = props.Test;
  const text = props['Patient/Provider Text'];
  const gender = props.Gender;
  const minAge = props['Minimum age'];
  const maxAge = props['Maximum age'];
  const ageSet = new Set();
  ageSet.add(minAge);
  ageSet.add(maxAge);
  ageSet.add(Math.round((minAge + maxAge) / 2));
  if (user === 'provider' && minAge === 18 && maxAge === 150) {
    ageSet.add('all ages');
  }
  const genderSet = new Set();
  if (gender === 'all') {
    ['f', 'm', 'tm', 'tf'].forEach((item) => genderSet.add(item));
  } else {
    gender.split(',')
      .forEach((item) => genderSet.add(item));
  }
  const dataSet = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const currentAge of ageSet) {
    // eslint-disable-next-line no-restricted-syntax
    for (const currentGender of genderSet) {
      dataSet.push({
        age: currentAge,
        gender: currentGender,
        text,
        test,
      });
    }
  }
  return dataSet;
}

function testPageTestSteps(age, gender, text, test, user, locale) {
  const testPage = new TestPage();
  cookiesSetupAndAccessBodyPage(testPage, gender, age, user, locale);
  cy.getTestId('test')
    .click();
  const page = new TestPage();
  page.assertAndClickTest(test);
  let lines = text.split('\n');
  lines = lines.filter((line) => line.length > 0);
  lines.forEach(page.assertLineInDropdown);
}

export {
  generateTestDataSet,
  testPageTestSteps,
};
