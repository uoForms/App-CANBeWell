import BasePage from './basePage';

class BodyPage extends BasePage {

    commonButtonInfoList = [
        {testId: "bowelButton", localeId: 'bowel'},
        {testId: "eyesButton", localeId: 'eyes'},
        {testId: "boneButton", localeId: 'bone'},
        {testId: "liverButton", localeId: 'liver'},
        {testId: "lungsButton", localeId: 'lungs'},
        {testId: "pancreasButton", localeId: 'pancreas'},
        {testId: "stomachButton", localeId: 'stomach'},
        {testId: "aortaButton", localeId: 'aorta'},
        {testId: "heartButton", localeId: 'heart'},
        {testId: "brainButton", localeId: 'brain'},
        {testId: "examButton", localeId: 'stethoscope'},
        {testId: "fallsButton", localeId: 'hip'},
        {testId: "immunizationButton", localeId: 'needle_in_arm'},
        {testId: "sunExposureButton", localeId: 'sun'},
        {testId: "phyActivityButton", localeId: 'figure_outside_body_walking'},
        {testId: "covidButton", localeId: 'covid'},
        {testId: "brainGearButton", localeId: 'braingear'},
        {testId: "moneyButton", localeId: 'money'},
        {testId: "sleepButton", localeId: 'sleep'},
        {testId: "bpButton", localeId: 'bp'},
        {testId: "genitaliaButton", localeId: 'genitalia'},
    ]

    maleTfButtonInfoList = [
        ...this.commonButtonInfoList,

    ]

    femaleTmButtonInfoList = [
        ...this.commonButtonInfoList,
        {testId: "breastButton", localeId: 'breast'},
        {testId: "uterusButton", localeId: 'uterus'},
        {testId: "ovaryButton", localeId: 'ovary'}
    ]

    nonBinaryOrMaleTmOrFemaleTfInfoList = [
        ...this.commonButtonInfoList,
        {testId: "breastButton", localeId: 'transbreast'},
    ]
}

export default BodyPage;
