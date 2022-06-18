import BasePage from './basePage';

class BodyPage extends BasePage {
  constructor() {
    super();
    this.commonButtonInfoList = [
      //  source of truth for buttonText is the json file
      { testId: 'bowelButton', localeId: 'bowel', buttonText: 'Colon' },
      { testId: 'eyesButton', localeId: 'eyes', buttonText: 'Eye' },
      { testId: 'boneButton', localeId: 'bone', buttonText: 'Bone' },
      { testId: 'liverButton', localeId: 'liver', buttonText: 'Liver' },
      { testId: 'lungsButton', localeId: 'lungs', buttonText: 'Lung' },
      { testId: 'pancreasButton', localeId: 'pancreas', buttonText: 'Pancreas' },
      { testId: 'stomachButton', localeId: 'stomach', buttonText: 'Stomach' },
      { testId: 'aortaButton', localeId: 'aorta', buttonText: 'aorta' },
      { testId: 'heartButton', localeId: 'heart', buttonText: 'Heart' },
      { testId: 'brainButton', localeId: 'brain', buttonText: 'Brain' },
      { testId: 'examButton', localeId: 'stethoscope', buttonText: 'Physical Exam' },
      { testId: 'fallsButton', localeId: 'hip', buttonText: 'Hip' },
      { testId: 'immunizationButton', localeId: 'needle_in_arm', buttonText: 'Needle in arm' },
      { testId: 'sunExposureButton', localeId: 'sun', buttonText: 'Sun' },
      {testId: 'phyActivityButton',localeId: 'figure_outside_body_walking',buttonText: 'Figure outside body walking'},
      { testId: 'covidButton', localeId: 'covid', buttonText: 'Covid' },
      { testId: 'brainGearButton', localeId: 'braingear', buttonText: 'N/A' },
      // { testId: 'moneyButton', localeId: 'money', buttonText: 'N/A' },
      // { testId: 'sleepButton', localeId: 'sleep', buttonText: 'N/A' },
      { testId: 'bpButton', localeId: 'bp', buttonText: 'N/A' },
      { testId: 'genitaliaButton', localeId: 'genitalia', buttonText: 'Genitalia' },
    ];

    this.maleTfButtonInfoList = [
      ...this.commonButtonInfoList,

    ];

    this.femaleTmButtonInfoList = [
      ...this.commonButtonInfoList,
      { testId: 'breastButton', localeId: 'breast', buttonText: 'Breast' }
      // { testId: 'uterusButton', localeId: 'uterus', buttonText: 'Uterus' },
      // { testId: 'ovaryButton', localeId: 'ovary', buttonText: 'Ovary' },
    ];

    this.nonBinaryOrMaleTmOrFemaleTfInfoList = [
      ...this.commonButtonInfoList,
      { testId: 'breastButton', localeId: 'transbreast', buttonText: 'Breast/Chest' },
    ];
  }

  getButtonInfoListByGender(gender) {
    // eslint-disable-next-line no-nested-ternary
    return gender === 'm' ? this.maleTfButtonInfoList : (gender === 'f' ? this.femaleTmButtonInfoList : this.nonBinaryOrMaleTmOrFemaleTfInfoList);
  }

  assertInstructionExists(locale) {
    cy.getTestId('instruction')
      .assertVisibleAndContainText(this.localeFile[locale].body_general_instruction);
  }

  assertSelectedButton(locale, localeId) {
    cy.getTestId('selectedButton')
      .should('have.text', this.localeFile[locale][localeId] || '');
  }

  assertBodyImage(gender) {
    if (gender === this.gender.male) {
      cy.getTestId('maleBodyImg')
        .assertImageVisibleWithSource('/static/media/male_body.2fba4217.png');
    } else if (gender === this.gender.female) {
      cy.getTestId('femaleBodyImg')
        .assertImageVisibleWithSource('/static/media/female_anatomy2.c429ead0.png');
    } else {
      cy.getTestId('transBodyImg')
        .assertImageVisibleWithSource('/static/media/trans_body.5e0b6714.png');
    }
  }
}

export default BodyPage;
