import BodyModal from '../../pageObjects/bodyModal';
import LandingPage from '../../pageObjects/landingPage';
import BasePage from '../../pageObjects/basePage';

function readTopicJsonData(props, user) {
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
  if (user === new BasePage().user.provider && minAge === 18 && maxAge === 150) {
    ageSet.add('all ages');
  }
  const genderSet = new Set();
  if (gender === 'all') {
    ['f', 'm', 'tm', 'tf'].forEach((item) => genderSet.add(item));
  } else {
    gender.split(',')
      .forEach((item) => genderSet.add(item));
  }
  if (genderSet.has('tf')) {
    genderSet.add('nonbinary-m');
  }
  if (genderSet.has('tm')) {
    genderSet.add('nonbinary-f');
  }
  const text = user === new BasePage().user.patient ? patientText : providerText;
  return {
    button, heading, subject, ageSet, genderSet, text,
  };
}

function assertTopicModal(heading, subject, text, age, user, page, expectedSubjects, subjectsCacheID) {
  const modal = new BodyModal();
  modal.assertModalExist();
  modal.assertHeading(heading);
  modal.assertSubjects(expectedSubjects, subjectsCacheID);
  modal.assertAndClickSubject(subject, text, Number.isInteger(age) ? age : 0, user, page);
  let lines = text.split('\n');
  lines = lines.filter((line) => line.length > 0);
  lines.forEach(modal.assertLineInModal);
}

function cookiesSetupAndAccessBodyPage(topicPage, gender, age, user, locale) {
  const genderCookies = topicPage.generateGenderCookies(gender);

  let allAgeCookie = {};
  if (age === 'all ages') {
    allAgeCookie = { _all_ages_selected: true };
  }

  cy.setupCookies({
    _onboarded: 'true', ...genderCookies, age: Number.isInteger(age) ? age.toString() : age, user, ...allAgeCookie,
  });
  new LandingPage()
    .clickRedirectButton(locale);
}

export {
  readTopicJsonData,
  assertTopicModal,
  cookiesSetupAndAccessBodyPage,

};
