import React from 'react';
import PropTypes from 'prop-types';

import BodyModal from './BodyModal';
import {GaUserEvent, PageViewTimer} from '../Tracking';

//Import Male PNG
import Male from '../assets/MaleBody/male_body.png';
import MaleAorta from '../assets/MaleBody/male_aorta-01.png';
import MaleBowel from '../assets/MaleBody/male_bowel-01.png';
import MaleEyes from '../assets/MaleBody/male_eyes-01.png';
import MaleHeart from '../assets/MaleBody/male_heart-01.png';
import MaleBone from '../assets/MaleBody/male_bone-01.png';
import MaleLiver from '../assets/MaleBody/male_liver-01.png';
import MaleLungs from '../assets/MaleBody/male_lungs-01.png';
import MalePancreas from '../assets/MaleBody/male_pancreas-01.png';
import MaleStomach from '../assets/MaleBody/male_stomach-01.png';
import MaleGenitalia from '../assets/MaleBody/male_genitalia-01.png';

//Import Female PNG
import Female from '../assets/FemaleBody/female_anatomy2.png';
import FemaleAorta from '../assets/FemaleBody/female_aorta-01.png';
import FemaleBowel from '../assets/FemaleBody/female_bowel-01.png';
import FemaleBreast from '../assets/FemaleBody/female_breast-01.png';
import FemaleEyes from '../assets/FemaleBody/female_eyes-01.png';
import FemaleHeart from '../assets/FemaleBody/female_heart-01.png';
import FemaleBone from '../assets/FemaleBody/female_bone-01.png';
import FemaleLiver from '../assets/FemaleBody/female_liver.png';
import FemaleLungs from '../assets/FemaleBody/female_lungs-01.png';
import FemalePancreas from '../assets/FemaleBody/female_pancreas-01.png';
import FemaleStomach from '../assets/FemaleBody/female_stomach-01.png';
import FemaleUterus from '../assets/FemaleBody/female_uterus-01.png';
import FemaleOvary from '../assets/FemaleBody/female_ovary.png';
import FemaleGenitalia from '../assets/FemaleBody/female_genitalia-01.png';

//Import Trans and non-binary PNG
import TransBody from '../assets/TransBody/trans_body.png';
import TransAorta from '../assets/TransBody/trans_aorta.png';
import TransBowel from '../assets/TransBody/trans_bowel.png';
import TransBreast from '../assets/TransBody/trans_breast.png';
import TransEyes from '../assets/TransBody/trans_eyes.png';
import TransHeart from '../assets/TransBody/trans_heart.png';
import TransBone from '../assets/TransBody/trans_bone.png';
import TransLiver from '../assets/TransBody/trans_liver.png';
import TransLungs from '../assets/TransBody/trans_lung.png';
import TransPancreas from '../assets/TransBody/trans_pancreas.png';
import TransStomach from '../assets/TransBody/trans_stomach.png';

//import TransGenital from '../assets/Icons/male_genital.png';
//Import male/female
import MaleFemale from '../assets/Male-Female/femManV1.png';

//Import icons
import brainIcon from '../assets/Icons/icon_brain.png';
import examIcon from '../assets/Icons/icon_exam.png';
import fallsIcon from '../assets/Icons/icon_falls.png';
import immunizationIcon from '../assets/Icons/icon_immunization.png';
import phyactIcon from '../assets/Icons/icon_physact.png';
import sunExposureIcon from '../assets/Icons/icon_sunexposure.png';
import transGenital from '../assets/TransBody/icon_trans.png';
import covidIcon from '../assets/Icons/icon_covid_new.png';
import FemaleGenital from '../assets/Icons/female_genital.png';
import MaleGenital from '../assets/Icons/male_genital.png';
import braingear from '../assets/Icons/icon_braingear.png';
import moneyIcon from '../assets/Icons/icon_money.png';
import sleepIcon from '../assets/Icons/icon_sleep.png';
import bpIcon from '../assets/Icons/icon_bp.png';

import './Body.css';
import '../App.css';


class Anatomy extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            display: [],//{name: "" , body: [{subject: "", text: ""}]}
            previousorganClicked: "",
            organSelected: ""
        };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /*button correspont to the name of the button being press (all lowercase)
    text is what is display on the screen
    and organ is the id of the organ you want to highlight*/
    organClicked = (button, text, organ) => {
        if (organ !== "") {
            try {
                let timerResult = PageViewTimer(
                    this.props.userInfo.preCat,
                    this.props.userInfo.preTime);
                let currTime = timerResult.currTime,
                    timeDiff = timerResult.timeDiff;
                let currNav = "body", currCat = text;
                GaUserEvent(currNav, currCat, this.props.userInfo, timeDiff, this.props.userInfo.preTime, currTime);

                this.props.pageViewStateUpdater(currNav, currCat, currTime);
                if (this.state.previousorganClicked != "") {
                    var clickedElement = document.getElementById(this.state.previousorganClicked);
                    if (clickedElement != null) {
                        clickedElement.style.visibility = "hidden";
                    }
                }
                document.getElementById(organ).style.visibility = "visible";
            } catch (err) {
                console.log(err);
            }
        }
        this.setState({
            organSelected: text,
            previousorganClicked: organ
        });

        setTimeout(function () {
            // if (organ != "") {
            //   try {
            //       document.getElementById(organ).style.visibility = "hidden";
            //   } catch (err) { }
            // }
            this.setState({
                isOpen: !this.state.isOpen,
                display: this.props.getDisplay(button, this.props.userInfo),
                buttonText: this.props.lang.close_body_modal,
                displayConfigOption: false,
                previousorganClicked: organ
            });
        }.bind(this), 100);

    }

    iconClicked = (button, text) => {
        let timerResult = PageViewTimer(
            this.props.userInfo.preCat,
            this.props.userInfo.preTime);
        let currTime = timerResult.currTime,
            timeDiff = timerResult.timeDiff;
        let currNav = "body", currCat = text;
        GaUserEvent(currNav, currCat, this.props.userInfo, timeDiff, this.props.userInfo.preTime, currTime);

        this.props.pageViewStateUpdater(currNav, currCat, currTime);
        if (this.state.previousorganClicked != "") {
            var clickedElement = document.getElementById(this.state.previousorganClicked);
            if (clickedElement != null) {
                clickedElement.style.visibility = "hidden";
            }
        }
        this.setState({
            organSelected: text,
            previousorganClicked: ""
        });
        if (this.state.previousorganClicked != "") {
            document.getElementById(this.state.previousorganClicked).style.visibility = "hidden";
        }
        setTimeout(function () {
            this.setState({
                isOpen: !this.state.isOpen,
                display: this.props.getDisplay(button, this.props.userInfo),
                buttonText: this.props.lang.close_body_modal,
                displayConfigOption: false
            });
        }.bind(this), 100);

    }
    //not used anymore, caused the "double click" problem on phone
    mouseOverOrgans = (button, text) => {
        document.getElementById(button).style.visibility = "visible";
        this.setState({
            organSelected: text
        });

    }
    //not used anymore, caused the "double click" problem on phone
    mouseOutOrgans = (organ) => {
        document.getElementById(organ).style.visibility = "hidden";
        this.setState({
            organSelected: null
        });
    }

    render() {

        const fixedStyle = {
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 3
        };

        //Applying istrangender flag
        if (this.props.isTransgender) {
            //Transgender Body Options
            if (this.props.gender === "male" && this.props.Tgender === "tf") {
                return (
                    <div>
                        <div className="mainRunner">
                            {/*male body*/}
                            <img className="body" src={Male} alt="Male" test-id="maleBodyImg"/>
                            {/*male organ*/}
                            <img id="MaleGenitalia" className="organ" src={MaleGenitalia} alt="MaleGenitalia"/>
                            <img id="MaleAorta" className="organ" src={MaleAorta} alt="MaleAorta"/>
                            <img id="MaleBowel" className="organ" src={MaleBowel} alt="MaleBowel"/>
                            <img id="MaleEyes" className="organ" src={MaleEyes} alt="MaleEyes"/>
                            <img id="MaleHeart" className="organ" src={MaleHeart} alt="MaleHeart"/>
                            <img id="MaleBone" className="organ" src={MaleBone} alt="MaleBone"/>
                            <img id="MaleLiver" className="organ" src={MaleLiver} alt="MaleLiver"/>
                            <img id="MaleLungs" className="organ" src={MaleLungs} alt="MaleLungs"/>
                            <img id="MalePancreas" className="organ" src={MalePancreas} alt="MalePancreas"/>
                            <img id="MaleStomach" className="organ" src={MaleStomach} alt="MaleStomach"/>

                            <button id="bowelButton" test-id="bowelButton" className="maleBowel"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "MaleBowel")}/>
                            <button id="eyesButton" test-id="eyesButton" className="maleEyes"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "MaleEyes")}/>
                            <button id="boneButton" test-id="boneButton" className="maleBone"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "MaleBone")}/>
                            <button id="liverButton" test-id="liverButton" className="maleLiver"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "MaleLiver")}/>
                            <button id="lungsButton" test-id="lungsButton" className="maleLungs"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "MaleLungs")}/>
                            <button id="pancreasButton" test-id="pancreasButton" className="malePancreas"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "MalePancreas")}/>
                            <button id="stomachButton" test-id="stomachButton" className="maleStomach"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "MaleStomach")}/>
                            <button id="aortaButton" test-id="aortaButton" className="maleAorta"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "MaleAorta")}></button>
                            <button id="heartButton" test-id="heartButton" className="maleHeart"
                                    onClick={(button, text, organ) => this.organClicked("heart", this.props.lang.heart, "MaleHeart")}/>
                            {/* <button id="genitaliaButton" className="maleGenitalia" onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "MaleGenitalia")} /> */}
                            <div className="icons">
                                <button id="brainButton" test-id="brainButton" className="brain"
                                        onClick={(button, text, organ) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" test-id="examButton" className="exam"
                                        onClick={(button, text, organ) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" test-id="fallsButton" className="falls"
                                        onClick={(button, text, organ) => this.iconClicked("hip", this.props.lang.hip)}>
                                    <img src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" test-id="immunizationButton" className="immunization"
                                        onClick={(button, text, organ) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" test-id="sunExposureButton" className="sunExposure"
                                        onClick={(button, text, organ) => this.iconClicked("sun", this.props.lang.sun)}>
                                    <img src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" test-id="phyActivityButton" className="phyActivity"
                                        onClick={(button, text, organ) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="maleGenitalia" test-id="genitaliaButton" className="maleGenitalia"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={MaleGenital} alt="MaleGenitalia"/></button>
                                <button id="covidButton" test-id="covidButton" className="covid"
                                        onClick={(button, text, organ) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="brainGearButton" test-id="brainGearButton" className="brainGear"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" test-id="moneyButton" className="money"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" test-id="sleepButton" className="sleep"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" test-id="bpButton" className="bp"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>


                                {/* <button id="genitaliaButton" className="maleGenital" onClick={(button, text, organ) => this.iconClicked("genitalia", this.props.lang.genitalia)}><img src={genitaliaIcon} alt="genitaliaIcon" /> </button> */}
                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       displayConfig={this.state.displayConfigOption}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            } else if (this.props.gender === "female" && this.props.Tgender === "tm") {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={Female} alt="Female" test-id="femaleBodyImg"/>
                            <img id="FemaleGenitalia" className="organ" src={FemaleGenitalia} alt="FemaleGenitalia"/>
                            <img id="FemaleAorta" className="organ" src={FemaleAorta} alt="FemaleAorta"/>
                            <img id="FemaleBowel" className="organ" src={FemaleBowel} alt="FemaleBowel"/>
                            <img id="FemaleBreast" className="organ" src={FemaleBreast} alt="FemaleBreast"/>
                            <img id="FemaleEyes" className="organ" src={FemaleEyes} alt="FemaleEyes"/>
                            <img id="FemaleHeart" className="organ" src={FemaleHeart} alt="FemaleHeart"/>
                            <img id="FemaleBone" className="organ" src={FemaleBone} alt="FemaleBone"/>
                            <img id="FemaleLiver" className="organ" src={FemaleLiver} alt="FemaleLiver"/>
                            <img id="FemaleLungs" className="organ" src={FemaleLungs} alt="FemaleLungs"/>
                            <img id="FemalePancreas" className="organ" src={FemalePancreas} alt="FemalePancreas"/>
                            <img id="FemaleStomach" className="organ" src={FemaleStomach} alt="FemaleStomach"/>
                            <img id="FemaleUterus" className="organ" src={FemaleUterus} alt="FemaleUterus"/>
                            <img id="FemaleOvary" className="organ" src={FemaleOvary} alt="FemaleOvary"/>

                            <button className="femaleBowel" test-id="bowelButton"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "FemaleBowel")}/>
                            <button className="femaleEyes" test-id="eyesButton"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "FemaleEyes")}/>
                            <button className="femaleBone" test-id="boneButton"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "FemaleBone")}/>
                            <button className="femaleLiver" test-id="liverButton"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "FemaleLiver")}/>
                            <button className="femaleLungs" test-id="lungsButton"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "FemaleLungs")}/>
                            <button className="femalePancreas" test-id="pancreasButton"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "FemalePancreas")}/>
                            <button className="femaleStomach" test-id="stomachButton"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "FemaleStomach")}/>
                            <button className="breast" test-id="breastButton"
                                    onClick={(button, text, organ) => this.organClicked("breast", this.props.lang.breast, "FemaleBreast")}/>
                            <button className="femaleAorta" test-id="aortaButton"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "FemaleAorta")}></button>
                            <button className="femaleHeart" test-id="heartButton"
                                    onClick={(button, text, organ) => this.organClicked("heart", this.props.lang.heart, "FemaleHeart")}/>
                            <button className="uterus" test-id="uterusButton"
                                    onClick={(button, text, organ) => this.organClicked("uterus", this.props.lang.uterus, "FemaleUterus")}/>
                            <button className="ovary" test-id="ovaryButton"
                                    onClick={(button, text, organ) => this.organClicked("ovary", this.props.lang.ovary, "FemaleOvary")}/>
                            {/* <button id="genitaliaButton" className="femaleGenitalia" onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "FemaleGenitalia")} /> */}
                            <div className="icons">
                                <button className="brain" test-id="brainButton"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button className="exam" test-id="examButton"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button className="falls" test-id="fallsButton"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button className="immunization" test-id="immunizationButton"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button className="sunExposure" test-id="sunExposureButton"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button className="phyActivity" test-id="phyActivityButton"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="femaleGenitalian" className="femaleGenitalia"
                                        test-id="genitaliaButton"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={FemaleGenital} alt="GenitalF"/></button>
                                <button id="covidButton" className="covid" test-id="covidButton"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="brainGearButton" className="brainGear" test-id="brainGearButton"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money" test-id="moneyButton"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep" test-id="sleepButton"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bpfemale" test-id="bpButton"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                                {/*<button id="genitaliaButton" className="femaleGenital" onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}><img src={fgenitaliaIcon} alt="fgenitaliaIcon" /> </button>*/}

                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <BodyModal show={this.state.isOpen}
                                   onClose={this.toggleModal}
                                   display={this.state.display}
                                   button={this.state.buttonText}
                                   displayConfig={this.state.displayConfigOption}
                                   getTopic={this.props.getDisplay}>
                        </BodyModal>

                    </div>
                );
            }

            //nonbinary:
            else if (this.props.gender === "nonbinary") {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={TransBody} alt="transbody" test-id="transBodyImg"/>
                            {/*TODO find organs that fits the body*/}
                            <img id="Aorta" className="organ" src={TransAorta} alt="Aorta"/>
                            <img id="Bowel" className="organ" src={TransBowel} alt="Bowel"/>
                            <img id="Breast" className="organ" src={TransBreast} alt="Breast"/>
                            <img id="Breast/Chest" className="organ" src={TransBreast} alt="Breast/Chest"/>
                            <img id="Eyes" className="organ" src={TransEyes} alt="Eyes"/>
                            <img id="Heart" className="organ" src={TransHeart} alt="Heart"/>
                            <img id="Bone" className="organ" src={TransBone} alt="Bone"/>
                            <img id="Liver" className="organ" src={TransLiver} alt="Liver"/>
                            <img id="Lungs" className="organ" src={TransLungs} alt="Lungs"/>
                            <img id="Pancreas" className="organ" src={TransPancreas} alt="Pancreas"/>
                            <img id="Stomach" className="organ" src={TransStomach} alt="Stomach"/>
                            <img id="Genital" className="organ" src={transGenital} alt="Genitalt"/>


                            <button id="bowelButton" className="bowel" test-id="bowelButton"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "Bowel")}/>
                            <button id="eyesButton" className="eyes" test-id="eyesButton"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "Eyes")}/>
                            <button id="boneButton" className="bone" test-id="boneButton"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "Bone")}/>
                            <button id="liverButton" className="liver" test-id="liverButton"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "Liver")}/>
                            <button id="lungsButton" className="lungs" test-id="lungsButton"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "Lungs")}/>
                            <button id="pancreasButton" className="pancreas" test-id="pancreasButton"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "Pancreas")}/>
                            <button id="stomachButton" className="stomach" test-id="stomachButton"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "Stomach")}/>
                            <button className="breast" test-id="breastButton"
                                    onClick={(button, text, organ) => this.organClicked("breast/chest", this.props.lang.transbreast, "Breast/Chest")}/>
                            <button id="aortaButton" className="aorta" test-id="aortaButton"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "Aorta")}></button>
                            <button id="heartButton" className="heart" test-id="heartButton"
                                    onClick={(button, text, oran) => this.organClicked("heart", this.props.lang.heart, "Heart")}/>
                            <button className="genitalia"
                                    onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "")}/>
                            <div className="icons">
                                <button id="brainButton" className="brain" test-id="brainButton"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" className="exam" test-id="examButton"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" className="falls" test-id="fallsButton"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" className="immunization" test-id="immunizationButton"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" className="sunExposure" test-id="sunExposureButton"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" className="phyActivity" test-id="phyActivityButton"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="covidButton" className="covid" test-id="covidButton"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="genitaliaButton" className="transGenital" test-id="genitaliaButton"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={transGenital} alt="GenitalT"/></button>
                                <button id="brainGearButton" className="brainGear" test-id="brainGearButton"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money" test-id="moneyButton"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep" test-id="sleepButton"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bpnb" test-id="bpButton"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                                {/*<button id="transButton" className="trans" onClick={(button, text) => this.iconClicked("trans", this.props.lang.covid)}><img src={transIcon} alt="transIcon" /></button>*/}

                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            }
                //end of nonbinary

            //birthchangesstart
            else if ((this.props.gender === "male" && this.props.Tgender === "tm") || (this.props.gender === "female" && this.props.Tgender === "tf")) {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={TransBody} alt="transbody" test-id="transBodyImg"/>
                            {/*TODO find organs that fits the body*/}
                            <img id="Aorta" className="organ" src={TransAorta} alt="Aorta"/>
                            <img id="Bowel" className="organ" src={TransBowel} alt="Bowel"/>
                            <img id="Breast" className="organ" src={TransBreast} alt="Breast"/>
                            <img id="Breast/Chest" className="organ" src={TransBreast} alt="Breast/Chest"/>
                            <img id="Eyes" className="organ" src={TransEyes} alt="Eyes"/>
                            <img id="Heart" className="organ" src={TransHeart} alt="Heart"/>
                            <img id="Bone" className="organ" src={TransBone} alt="Bone"/>
                            <img id="Liver" className="organ" src={TransLiver} alt="Liver"/>
                            <img id="Lungs" className="organ" src={TransLungs} alt="Lungs"/>
                            <img id="Pancreas" className="organ" src={TransPancreas} alt="Pancreas"/>
                            <img id="Stomach" className="organ" src={TransStomach} alt="Stomach"/>
                            <img id="Genital" className="organ" src={transGenital} alt="Genitalt"/>


                            <button id="bowelButton" className="bowel" test-id="bowelButton"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "Bowel")}/>
                            <button id="eyesButton" className="eyes" test-id="eyesButton"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "Eyes")}/>
                            <button id="boneButton" className="bone" test-id="boneButton"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "Bone")}/>
                            <button id="liverButton" className="liver" test-id="liverButton"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "Liver")}/>
                            <button id="lungsButton" className="lungs" test-id="lungsButton"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "Lungs")}/>
                            <button id="pancreasButton" className="pancreas" test-id="pancreasButton"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "Pancreas")}/>
                            <button id="stomachButton" className="stomach" test-id="stomachButton"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "Stomach")}/>
                            <button className="breast" test-id="breastButton"
                                    onClick={(button, text, organ) => this.organClicked("breast/chest", this.props.lang.transbreast, "Breast/Chest")}/>
                            <button id="aortaButton" className="aorta" test-id="aortaButton"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "Aorta")}></button>
                            <button id="heartButton" className="heart" test-id="heartButton"
                                    onClick={(button, text, oran) => this.organClicked("heart", this.props.lang.heart, "Heart")}/>
                            <button className="genitalia"
                                    onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "")}/>
                            <div className="icons">
                                <button id="brainButton" className="brain" test-id="brainButton"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" className="exam" test-id="examButton"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" className="falls" test-id="fallsButton"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" className="immunization" test-id="immunizationButton"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" className="sunExposure" test-id="sunExposureButton"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" className="phyActivity" test-id="phyActivityButton"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="covidButton" className="covid" test-id="covidButton"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="genitaliaButton" className="transGenital" test-id="genitaliaButton"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={transGenital} alt="GenitalT"/></button>
                                <button id="brainGearButton" className="brainGear" test-id="brainGearButton"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money" test-id="moneyButton"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep" test-id="sleepButton"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bptg" test-id="bpButton"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                                {/*<button id="transButton" className="trans" onClick={(button, text) => this.iconClicked("trans", this.props.lang.covid)}><img src={transIcon} alt="transIcon" /></button>*/}

                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            }

                //birthchangesend

            //transgender:
            else if (this.props.gender === "transgender") {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={TransBody} alt="transbody"/>
                            {/*TODO find organs that fits the body*/}
                            <img id="Aorta" className="organ" src={TransAorta} alt="Aorta"/>
                            <img id="Bowel" className="organ" src={TransBowel} alt="Bowel"/>
                            <img id="Breast" className="organ" src={TransBreast} alt="Breast"/>
                            <img id="Breast/Chest" className="organ" src={TransBreast} alt="Breast/Chest"/>
                            <img id="Eyes" className="organ" src={TransEyes} alt="Eyes"/>
                            <img id="Heart" className="organ" src={TransHeart} alt="Heart"/>
                            <img id="Bone" className="organ" src={TransBone} alt="Bone"/>
                            <img id="Liver" className="organ" src={TransLiver} alt="Liver"/>
                            <img id="Lungs" className="organ" src={TransLungs} alt="Lungs"/>
                            <img id="Pancreas" className="organ" src={TransPancreas} alt="Pancreas"/>
                            <img id="Stomach" className="organ" src={TransStomach} alt="Stomach"/>
                            <img id="Genital" className="organ" src={transGenital} alt="Genitalt"/>


                            <button id="bowelButton" className="bowel"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "Bowel")}/>
                            <button id="eyesButton" className="eyes"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "Eyes")}/>
                            <button id="boneButton" className="bone"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "Bone")}/>
                            <button id="liverButton" className="liver"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "Liver")}/>
                            <button id="lungsButton" className="lungs"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "Lungs")}/>
                            <button id="pancreasButton" className="pancreas"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "Pancreas")}/>
                            <button id="stomachButton" className="stomach"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "Stomach")}/>
                            <button className="breast"
                                    onClick={(button, text, organ) => this.organClicked("breast/chest", this.props.lang.transbreast, "Breast/Chest")}/>
                            <button id="aortaButton" className="aorta"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "Aorta")}></button>
                            <button id="heartButton" className="heart"
                                    onClick={(button, text, oran) => this.organClicked("heart", this.props.lang.heart, "Heart")}/>
                            <button className="genitalia"
                                    onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "")}/>
                            <div className="icons">
                                <button id="brainButton" className="brain"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" className="exam"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" className="falls"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" className="immunization"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" className="sunExposure"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" className="phyActivity"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="covidButton" className="covid"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="genitaliaButton" className="transGenital"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={transGenital} alt="GenitalT"/></button>
                                <button id="brainGearButton" className="brainGear"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bp"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                                {/*<button id="transButton" className="trans" onClick={(button, text) => this.iconClicked("trans", this.props.lang.covid)}><img src={transIcon} alt="transIcon" /></button>*/}

                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            }
            //end of transgender


            else if (this.props.gender === "all_genders") {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={MaleFemale} alt="allGenders"/>
                            {/*TODO find organs that fits the body*/}
                            {/*<img id="Aorta" className="organ" src={FemaleAorta} alt="Aorta" />
            <img id="Bowel" className="organ" src={FemaleBowel} alt="Bowel" />
            <img id="Breast" className="organ" src={FemaleBreast} alt="Breast" />
            <img id="Eyes" className="organ" src={FemaleEyes} alt="Eyes" />
            <img id="Heart" className="organ" src={FemaleHeart} alt="Heart" />
            <img id="Bone" className="organ" src={FemaleBone} alt="Bone" />
            <img id="Liver" className="organ" src={FemaleLiver} alt="Liver"/>
            <img id="Lungs" className="organ" src={FemaleLungs} alt="Lungs" />
            <img id="Pancreas" className="organ" src={FemalePancreas} alt="Pancreas" />
            <img  id="Stomach" className="organ" src={FemaleStomach} alt="Stomach" />
            <img id="Uterus" className="organ" src={FemaleUterus} alt="Uterus"/>*/}

                            <button id="bowelButton" className="bowel"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "Bowel")}/>
                            <button id="eyesButton" className="eyes"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "Eyes")}/>
                            <button id="boneButton" className="bone"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "Bone")}/>
                            <button id="liverButton" className="liver"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "Liver")}/>
                            <button id="lungsButton" className="lungs"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lings, "Lungs")}/>
                            <button id="pancreasButton" className="pancreas"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "Pancreas")}/>
                            <button id="stomachButton" className="stomach"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "Stomach")}/>
                            <button className="breast"
                                    onClick={(button, text, organ) => this.organClicked("breast", this.props.lang.breast, "Breast")}/>
                            <button id="aortaButton" className="aorta"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "Aorta")}></button>
                            <button id="heartButton" className="heart"
                                    onClick={(button, text, oran) => this.organClicked("heart", this.props.lang.heart, "Heart")}/>
                            <button className="uterus"
                                    onClick={(button, text, organ) => this.organClicked("uterus", this.props.lang.uterus, "Uterus")}/>
                            <button className="genitalia"
                                    onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "")}/>
                            <button className="ovary"
                                    onClick={(button, text, organ) => this.organClicked("ovary", this.props.lang.ovary, "")}/>
                            <div className="icons">
                                <button id="brainButton" className="brain"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" className="exam"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" className="falls"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" className="immunization"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" className="sunExposure"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" className="phyActivity"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="covidButton" className="covid"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="brainGearButton" className="brainGear"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bp"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                                {/*<button id="genitaliaButton" className="maleGenital" onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}><img src={genitaliaIcon} alt="genitaliaIcon" /> </button>*/}

                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={MaleFemale} alt="MaleFemale"/>;
                        </div>
                    </div>
                );
            }
        } else {
            //Master body options
            if (this.props.gender === "male") {
                return (
                    <div>
                        <div className="mainRunner">
                            {/*male body*/}
                            <img className="body" src={Male} alt="Male"/>
                            {/*male organ*/}
                            <img id="MaleGenitalia" className="organ" src={MaleGenitalia} alt="MaleGenitalia"/>
                            <img id="MaleAorta" className="organ" src={MaleAorta} alt="MaleAorta"/>
                            <img id="MaleBowel" className="organ" src={MaleBowel} alt="MaleBowel"/>
                            <img id="MaleEyes" className="organ" src={MaleEyes} alt="MaleEyes"/>
                            <img id="MaleHeart" className="organ" src={MaleHeart} alt="MaleHeart"/>
                            <img id="MaleBone" className="organ" src={MaleBone} alt="MaleBone"/>
                            <img id="MaleLiver" className="organ" src={MaleLiver} alt="MaleLiver"/>
                            <img id="MaleLungs" className="organ" src={MaleLungs} alt="MaleLungs"/>
                            <img id="MalePancreas" className="organ" src={MalePancreas} alt="MalePancreas"/>
                            <img id="MaleStomach" className="organ" src={MaleStomach} alt="MaleStomach"/>

                            <button id="bowelButton" className="maleBowel"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "MaleBowel")}/>
                            <button id="eyesButton" className="maleEyes"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "MaleEyes")}/>
                            <button id="boneButton" className="maleBone"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "MaleBone")}/>
                            <button id="liverButton" className="maleLiver"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "MaleLiver")}/>
                            <button id="lungsButton" className="maleLungs"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "MaleLungs")}/>
                            <button id="pancreasButton" className="malePancreas"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "MalePancreas")}/>
                            <button id="stomachButton" className="maleStomach"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "MaleStomach")}/>
                            <button id="aortaButton" className="maleAorta"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "MaleAorta")}></button>
                            <button id="heartButton" className="maleHeart"
                                    onClick={(button, text, organ) => this.organClicked("heart", this.props.lang.heart, "MaleHeart")}/>
                            {/* <button id="genitaliaButton" className="maleGenitalia" onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "MaleGenitalia")} /> */}
                            <div className="icons">
                                <button id="brainButton" className="brain"
                                        onClick={(button, text, organ) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" className="exam"
                                        onClick={(button, text, organ) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" className="falls"
                                        onClick={(button, text, organ) => this.iconClicked("hip", this.props.lang.hip)}>
                                    <img src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" className="immunization"
                                        onClick={(button, text, organ) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" className="sunExposure"
                                        onClick={(button, text, organ) => this.iconClicked("sun", this.props.lang.sun)}>
                                    <img src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" className="phyActivity"
                                        onClick={(button, text, organ) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="maleGenitalia" className="maleGenitalia"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={MaleGenital} alt="MaleGenitalia"/></button>
                                <button id="covidButton" className="covid"
                                        onClick={(button, text, organ) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="brainGearButton" className="brainGear"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bp"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       displayConfig={this.state.displayConfigOption}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            } else if (this.props.gender === "female") {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={Female} alt="Female"/>
                            <img id="FemaleGenitalia" className="organ" src={FemaleGenitalia} alt="FemaleGenitalia"/>
                            <img id="FemaleAorta" className="organ" src={FemaleAorta} alt="FemaleAorta"/>
                            <img id="FemaleBowel" className="organ" src={FemaleBowel} alt="FemaleBowel"/>
                            <img id="FemaleBreast" className="organ" src={FemaleBreast} alt="FemaleBreast"/>
                            <img id="FemaleEyes" className="organ" src={FemaleEyes} alt="FemaleEyes"/>
                            <img id="FemaleHeart" className="organ" src={FemaleHeart} alt="FemaleHeart"/>
                            <img id="FemaleBone" className="organ" src={FemaleBone} alt="FemaleBone"/>
                            <img id="FemaleLiver" className="organ" src={FemaleLiver} alt="FemaleLiver"/>
                            <img id="FemaleLungs" className="organ" src={FemaleLungs} alt="FemaleLungs"/>
                            <img id="FemalePancreas" className="organ" src={FemalePancreas} alt="FemalePancreas"/>
                            <img id="FemaleStomach" className="organ" src={FemaleStomach} alt="FemaleStomach"/>
                            <img id="FemaleUterus" className="organ" src={FemaleUterus} alt="FemaleUterus"/>
                            <img id="FemaleOvary" className="organ" src={FemaleOvary} alt="FemaleOvary"/>

                            <button className="femaleBowel"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "FemaleBowel")}/>
                            <button className="femaleEyes"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "FemaleEyes")}/>
                            <button className="femaleBone"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "FemaleBone")}/>
                            <button className="femaleLiver"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "FemaleLiver")}/>
                            <button className="femaleLungs"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lungs, "FemaleLungs")}/>
                            <button className="femalePancreas"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "FemalePancreas")}/>
                            <button className="femaleStomach"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "FemaleStomach")}/>
                            <button className="breast"
                                    onClick={(button, text, organ) => this.organClicked("breast", this.props.lang.breast, "FemaleBreast")}/>
                            <button className="femaleAorta"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "FemaleAorta")}></button>
                            <button className="femaleHeart"
                                    onClick={(button, text, organ) => this.organClicked("heart", this.props.lang.heart, "FemaleHeart")}/>
                            <button className="uterus"
                                    onClick={(button, text, organ) => this.organClicked("uterus", this.props.lang.uterus, "FemaleUterus")}/>
                            <button className="ovary"
                                    onClick={(button, text, organ) => this.organClicked("ovary", this.props.lang.ovary, "FemaleOvary")}/>
                            {/* <button id="genitaliaButton" className="femaleGenitalia" onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "FemaleGenitalia")} /> */}
                            <div className="icons">
                                <button className="brain"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button className="exam"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button className="falls"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button className="immunization"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button className="sunExposure"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button className="phyActivity"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="covidButton" className="covid"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="femaleGenitalian" className="femaleGenitalia"
                                        onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}>
                                    <img src={FemaleGenital} alt="GenitalF"/></button>
                                <button id="brainGearButton" className="brainGear"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bp"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <BodyModal show={this.state.isOpen}
                                   onClose={this.toggleModal}
                                   display={this.state.display}
                                   button={this.state.buttonText}
                                   displayConfig={this.state.displayConfigOption}
                                   getTopic={this.props.getDisplay}>
                        </BodyModal>

                    </div>
                );
            } else if (this.props.gender === "all_genders") {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={MaleFemale} alt="allGenders"/>
                            {/*TODO find organs that fits the body*/}
                            {/*<img id="Aorta" className="organ" src={FemaleAorta} alt="Aorta" />
          <img id="Bowel" className="organ" src={FemaleBowel} alt="Bowel" />
          <img id="Breast" className="organ" src={FemaleBreast} alt="Breast" />
          <img id="Eyes" className="organ" src={FemaleEyes} alt="Eyes" />
          <img id="Heart" className="organ" src={FemaleHeart} alt="Heart" />
          <img id="Bone" className="organ" src={FemaleBone} alt="Bone" />
          <img id="Liver" className="organ" src={FemaleLiver} alt="Liver"/>
          <img id="Lungs" className="organ" src={FemaleLungs} alt="Lungs" />
          <img id="Pancreas" className="organ" src={FemalePancreas} alt="Pancreas" />
          <img  id="Stomach" className="organ" src={FemaleStomach} alt="Stomach" />
          <img id="Uterus" className="organ" src={FemaleUterus} alt="Uterus"/>*/}

                            <button id="bowelButton" className="bowel"
                                    onClick={(button, text, organ) => this.organClicked("colon", this.props.lang.bowel, "Bowel")}/>
                            <button id="eyesButton" className="eyes"
                                    onClick={(button, text, organ) => this.organClicked("eye", this.props.lang.eyes, "Eyes")}/>
                            <button id="boneButton" className="bone"
                                    onClick={(button, text, organ) => this.organClicked("bone", this.props.lang.bone, "Bone")}/>
                            <button id="liverButton" className="liver"
                                    onClick={(button, text, organ) => this.organClicked("liver", this.props.lang.liver, "Liver")}/>
                            <button id="lungsButton" className="lungs"
                                    onClick={(button, text, organ) => this.organClicked("lung", this.props.lang.lings, "Lungs")}/>
                            <button id="pancreasButton" className="pancreas"
                                    onClick={(button, text, organ) => this.organClicked("pancreas", this.props.lang.pancreas, "Pancreas")}/>
                            <button id="stomachButton" className="stomach"
                                    onClick={(button, text, organ) => this.organClicked("stomach", this.props.lang.stomach, "Stomach")}/>
                            <button className="breast"
                                    onClick={(button, text, organ) => this.organClicked("breast", this.props.lang.breast, "Breast")}/>
                            <button id="aortaButton" className="aorta"
                                    onClick={(button, text, organ) => this.organClicked("aorta", this.props.lang.aorta, "Aorta")}></button>
                            <button id="heartButton" className="heart"
                                    onClick={(button, text, oran) => this.organClicked("heart", this.props.lang.heart, "Heart")}/>
                            <button className="uterus"
                                    onClick={(button, text, organ) => this.organClicked("uterus", this.props.lang.uterus, "Uterus")}/>
                            <button className="genitalia"
                                    onClick={(button, text, organ) => this.organClicked("genitalia", this.props.lang.genitalia, "")}/>
                            <button className="ovary"
                                    onClick={(button, text, organ) => this.organClicked("ovary", this.props.lang.ovary, "")}/>
                            <div className="icons">
                                <button id="brainButton" className="brain"
                                        onClick={(button, text) => this.iconClicked("brain", this.props.lang.brain)}>
                                    <img src={brainIcon} alt="brainIcon"/></button>
                                <button id="examButton" className="exam"
                                        onClick={(button, text) => this.iconClicked("physical exam", this.props.lang.stethoscope)}>
                                    <img src={examIcon} alt="examIcon"/></button>
                                <button id="fallsButton" className="falls"
                                        onClick={(button, text) => this.iconClicked("hip", this.props.lang.hip)}><img
                                    src={fallsIcon} alt="fallsIcon"/></button>
                                <button id="immunizationButton" className="immunization"
                                        onClick={(button, text) => this.iconClicked("needle in arm", this.props.lang.needle_in_arm)}>
                                    <img src={immunizationIcon} alt="immunizationIcon"/></button>
                                <button id="sunExposureButton" className="sunExposure"
                                        onClick={(button, text) => this.iconClicked("sun", this.props.lang.sun)}><img
                                    src={sunExposureIcon} alt="sunExposureIcon"/></button>
                                <button id="phyActivityButton" className="phyActivity"
                                        onClick={(button, text) => this.iconClicked("figure outside body walking", this.props.lang.figure_outside_body_walking)}>
                                    <img src={phyactIcon} alt="physicalActivityIcon"/></button>
                                <button id="covidButton" className="covid"
                                        onClick={(button, text) => this.iconClicked("covid", this.props.lang.covid)}>
                                    <img src={covidIcon} alt="covidIcon"/></button>
                                <button id="brainGearButton" className="brainGear"
                                        onClick={(button, text, organ) => this.iconClicked("braingear", this.props.lang.braingear)}>
                                    <img src={braingear} alt="braingear"/></button>
                                <button id="moneyButton" className="money"
                                        onClick={(button, text, organ) => this.iconClicked("money", this.props.lang.money)}>
                                    <img src={moneyIcon} alt="moneyIcon"/></button>
                                <button id="sleepButton" className="sleep"
                                        onClick={(button, text, organ) => this.iconClicked("sleep", this.props.lang.sleep)}>
                                    <img src={sleepIcon} alt="sleepIcon"/></button>
                                <button id="bpButton" className="bp"
                                        onClick={(button, text, organ) => this.iconClicked("bp", this.props.lang.bp)}>
                                    <img src={bpIcon} alt="bpIcon"/></button>
                            </div>
                            <div className="fixSelectedOrgan"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                            </div>
                        </div>


                        <div>
                            <BodyModal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       display={this.state.display}
                                       button={this.state.buttonText}
                                       getTopic={this.props.getDisplay}>
                            </BodyModal>
                        </div>

                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="mainRunner">
                            <img className="body" src={MaleFemale} alt="MaleFemale"/>;
                        </div>
                    </div>
                );
            }

        }
    }
}

Anatomy.propTypes = {
    gender: PropTypes.string,
    userInfo: PropTypes.object,
    getDisplay: PropTypes.func.isRequired,
    lang: PropTypes.object
};


export default Anatomy;
