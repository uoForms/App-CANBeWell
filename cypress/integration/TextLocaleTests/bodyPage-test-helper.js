import BodyPage from '../../pageObjects/bodyPage';
import LandingPage from '../../pageObjects/landingPage';
import BodyModal from '../../pageObjects/BodyModal';

function getButtonId(gender, buttonText) {
  const bodyPage = new BodyPage();
  // eslint-disable-next-line no-nested-ternary
  const buttonInfoList = gender === 'm' ? bodyPage.maleTfButtonInfoList : (gender === 'f' ? bodyPage.femaleTmButtonInfoList : bodyPage.nonBinaryOrMaleTmOrFemaleTfInfoList);
  // eslint-disable-next-line no-restricted-syntax
  for (const info of buttonInfoList) {
    if (info.buttonText === buttonText) {
      return info.testId;
    }
  }
  return null;
}

function generateTestDataSet(props, user) {
  const button = props.Button;
  const heading = props['Topic heading'];
  const subject = props.Subject;
  const patientText = props['General Patient Text'];
  const providerText = props['Health Provider Text'];
  const gender = props.Gender;
  const minAge = props['Minimum age'];
  const maxAge = props['Maximum age'];
  const ageSet = new Set();
  ageSet.add(minAge);
  ageSet.add(maxAge);
  ageSet.add(Math.round((minAge + maxAge) / 2));
  const genderSet = new Set();
  if (gender === 'all') {
    ['f', 'm', 'tm', 'tf'].forEach((item) => genderSet.add(item));
  } else {
    gender.split(',')
      .forEach((item) => genderSet.add(item));
  }
  const text = user === 'patient' ? patientText : providerText;
  const dataSet = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const currentAge of ageSet) {
    // eslint-disable-next-line no-restricted-syntax
    for (const currentGender of genderSet) {
      dataSet.push({
        age: currentAge,
        gender: currentGender,
        text,
        subject,
        heading,
        buttonId: getButtonId(currentGender, button),
      });
    }
  }
  return dataSet;
}

function bodyPageTestSteps(age, gender, text, subject, heading, buttonId, locale, user) {
  const genderCookies = {};
  const bodyPage = new BodyPage();
  if (gender === 'm') {
    genderCookies.gender = bodyPage.gender.male;
    genderCookies.Tgender = bodyPage.gender.transFemale;
  } else if (gender === 'f') {
    genderCookies.gender = bodyPage.gender.female;
    genderCookies.Tgender = bodyPage.gender.transMale;
  } else {
    // Only select this combination to verify the text, the gender/Tgenter display should be verified in user action tests
    genderCookies.gender = bodyPage.gender.male;
    genderCookies.Tgender = bodyPage.gender.transMale;
  }

  cy.setupCookies({
    _onboarded: 'true', ...genderCookies, age: age.toString(), user,
  });
  new LandingPage()
    .clickRedirectButton(locale);
  cy.getTestId(buttonId)
    .click();
  const modal = new BodyModal();
  modal.assertModalExist();
  modal.assertHeading(heading);
  modal.assertAndClickSubject(subject);
  const lines = text.split('\n');
  lines.forEach(modal.assertLineInModal);
}

export {
  generateTestDataSet,
  bodyPageTestSteps,
};
