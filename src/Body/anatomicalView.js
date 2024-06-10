import React from "react";
import PropTypes from "prop-types";

import BodyModal from "./BodyModal";
import { GaUserEvent, PageViewTimer } from "../Tracking";
import Tooltip from "@material-ui/core/Tooltip";

//Import Male PNG
import Male from "../assets/MaleBody/male_body.png";
import MaleAorta from "../assets/MaleBody/male_aorta-01.png";
import MaleBowel from "../assets/MaleBody/male_bowel-01.png";
import MaleEyes from "../assets/MaleBody/male_eyes-01.png";
import MaleMouth from "../assets/MaleBody/male_mouth.png";
import MaleHeart from "../assets/MaleBody/male_heart-01.png";
import MaleBone from "../assets/MaleBody/male_bone-01.png";
import MaleLiver from "../assets/MaleBody/male_liver-01.png";
import MaleLungs from "../assets/MaleBody/male_lungs-01.png";
import MalePancreas from "../assets/MaleBody/male_pancreas-01.png";
import MaleStomach from "../assets/MaleBody/male_stomach-01.png";
import MaleKidney from "../assets/MaleBody/male_kidney.png";

// import MaleGenitalia from '../assets/MaleBody/male_genitalia-01.png';

//Import Female PNG
import Female from "../assets/FemaleBody/female_anatomy2.png";
import FemaleAorta from "../assets/FemaleBody/female_aorta-01.png";
import FemaleBowel from "../assets/FemaleBody/female_bowel-01.png";
import FemaleBreast from "../assets/FemaleBody/female_breast-01.png";
import FemaleEyes from "../assets/FemaleBody/female_eyes-01.png";
import FemaleMouth from "../assets/FemaleBody/female_mouth.png";
import FemaleHeart from "../assets/FemaleBody/female_heart-01.png";
import FemaleBone from "../assets/FemaleBody/female_bone-01.png";
import FemaleLiver from "../assets/FemaleBody/female_liver.png";
import FemaleLungs from "../assets/FemaleBody/female_lungs-01.png";
import FemalePancreas from "../assets/FemaleBody/female_pancreas-01.png";
import FemaleStomach from "../assets/FemaleBody/female_stomach-01.png";
import FemaleUterus from "../assets/FemaleBody/female_uterus-01.png";
import FemaleOvary from "../assets/FemaleBody/female_ovary.png";
import FemaleKidney from "../assets/FemaleBody/female_kidney.png";
// import FemaleGenitalia from '../assets/FemaleBody/female_genitalia-01.png';

//Import Trans and non-binary PNG
import TransBody from "../assets/TransBody/trans_body.png";
import TransAorta from "../assets/TransBody/trans_aorta.png";
import TransBowel from "../assets/TransBody/trans_bowel.png";
import TransBreast from "../assets/TransBody/trans_breast.png";
import TransEyes from "../assets/TransBody/trans_eyes.png";
import TransMouth from "../assets/TransBody/trans_mouth.png";
import TransHeart from "../assets/TransBody/trans_heart.png";
import TransBone from "../assets/TransBody/trans_bone.png";
import TransLiver from "../assets/TransBody/trans_liver.png";
import TransLungs from "../assets/TransBody/trans_lung.png";
import TransPancreas from "../assets/TransBody/trans_pancreas.png";
import TransStomach from "../assets/TransBody/trans_stomach.png";
import TransKidney from "../assets/TransBody/trans_kidney.png";

//import TransGenital from '../assets/Icons/male_genital.png';
//Use following import and variable to show image on starting page (behind the Choose form)
// import MaleFemale from '../assets/Male-Female/(insert_name).png';

//Import icons
import brainIcon from "../assets/Icons/icon_brain.png";
import examIcon from "../assets/Icons/icon_exam.png";
import fallsIcon from "../assets/Icons/icon_falls.png";
import immunizationIcon from "../assets/Icons/icon_immunization.png";
import phyactIcon from "../assets/Icons/icon_physact.png";
import sunExposureIcon from "../assets/Icons/icon_sunexposure.png";
import covidIcon from "../assets/Icons/icon_covid_new.png";

import transGenital from "../assets/TransBody/icon_trans.png";
import FemaleGenital from "../assets/Icons/female_genital.png";
import MaleGenital from "../assets/Icons/male_genital.png";

import braingear from "../assets/Icons/icon_braingear.png";
import moneyIcon from "../assets/Icons/icon_money_1.png";
import sleepIcon from "../assets/Icons/icon_sleep_1.png";
import bpIcon from "../assets/Icons/icon_bp.png";
import symptomcheckerIcon from "../assets/Icons/icon_symptomchecker.png";
import familydoctorIcon from "../assets/Icons/icon_familydoctor.png";

import "./Body.css";
import "../App.css";

import "./Body.css";
import "../App.css";
import DialogBox from "../components/DialogBox";
import { englishForm, frenchForm } from "../constants";

class Anatomy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      display: [], //{name: "" , body: [{subject: "", text: ""}]}
      previousorganClicked: "",
      organSelected: "",
      feedbackDialog: false,
    };
  }

  toggleModal = () => {
    if (sessionStorage.getItem("firstVisit") != "true") {
      this.setState({ feedbackDialog: true });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleFeedBackToggle = (type) => {
    if (type === "agree") {
      sessionStorage.setItem("firstVisit", "true");
      const finalLink =
        this.state.language === "french" ? frenchForm : englishForm;
      window.open(finalLink, "_blank");
    }
    this.setState({ feedbackDialog: !this.state.feedbackDialog });
  };

  /*button correspont to the name of the button being press (all lowercase)
    text is what is display on the screen
    and organ is the id of the organ you want to highlight*/
  organClicked = (button, text, organ) => {
    if (organ !== "") {
      try {
        let timerResult = PageViewTimer(
          this.props.userInfo.preCat,
          this.props.userInfo.preTime
        );
        let currTime = timerResult.currTime,
          timeDiff = timerResult.timeDiff;
        let currNav = "body",
          currCat = text;
        GaUserEvent(
          currNav,
          currCat,
          this.props.userInfo,
          timeDiff,
          this.props.userInfo.preTime,
          currTime,
          ""
        );

        this.props.pageViewStateUpdater(currNav, currCat, currTime);
        if (this.state.previousorganClicked != "") {
          var clickedElement = document.getElementById(
            this.state.previousorganClicked
          );
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
      previousorganClicked: organ,
    });

    setTimeout(
      function () {
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
          previousorganClicked: organ,
        });
      }.bind(this),
      100
    );
  };

  iconClicked = (button, text) => {
    let timerResult = PageViewTimer(
      this.props.userInfo.preCat,
      this.props.userInfo.preTime
    );
    let currTime = timerResult.currTime,
      timeDiff = timerResult.timeDiff;
    let currNav = "body",
      currCat = text;
    GaUserEvent(
      currNav,
      currCat,
      this.props.userInfo,
      timeDiff,
      this.props.userInfo.preTime,
      currTime,
      ""
    );

    this.props.pageViewStateUpdater(currNav, currCat, currTime);
    if (this.state.previousorganClicked != "") {
      var clickedElement = document.getElementById(
        this.state.previousorganClicked
      );
      if (clickedElement != null) {
        clickedElement.style.visibility = "hidden";
      }
    }
    this.setState({
      organSelected: text,
      previousorganClicked: "",
    });
    if (this.state.previousorganClicked != "") {
      document.getElementById(
        this.state.previousorganClicked
      ).style.visibility = "hidden";
    }
    setTimeout(
      function () {
        this.setState({
          isOpen: !this.state.isOpen,
          display: this.props.getDisplay(button, this.props.userInfo),
          buttonText: this.props.lang.close_body_modal,
          displayConfigOption: false,
        });
      }.bind(this),
      100
    );
  };
  //not used anymore, caused the "double click" problem on phone
  mouseOverOrgans = (button, text) => {
    document.getElementById(button).style.visibility = "visible";
    this.setState({
      organSelected: text,
    });
  };
  //not used anymore, caused the "double click" problem on phone
  mouseOutOrgans = (organ) => {
    document.getElementById(organ).style.visibility = "hidden";
    this.setState({
      organSelected: null,
    });
  };

  render() {
    const fixedStyle = {
      position: "fixed",
      bottom: 0,
      left: 0,
      zIndex: 3,
    };

    //Male
    if (this.props.gender === "male" && this.props.Tgender === "tf") {
      return (
        <div>
          <div className="mainRunner">
            {/*male body*/}
            <img className="body" src={Male} alt="Male" test-id="maleBodyImg" />
            {/*Highlighted images on clicking the body*/}
            <img
              id="MaleAorta"
              className="organ"
              src={MaleAorta}
              alt="MaleAorta"
            />
            <img
              id="MaleBowel"
              className="organ"
              src={MaleBowel}
              alt="MaleBowel"
            />
            <img
              id="MaleEyes"
              className="organ"
              src={MaleEyes}
              alt="MaleEyes"
            />
            <img
              id="MaleMouth"
              className="organ"
              src={MaleMouth}
              alt="MaleMouth"
            />
            <img
              id="MaleHeart"
              className="organ"
              src={MaleHeart}
              alt="MaleHeart"
            />
            <img
              id="MaleBone"
              className="organ"
              src={MaleBone}
              alt="MaleBone"
            />
            <img
              id="MaleLiver"
              className="organ"
              src={MaleLiver}
              alt="MaleLiver"
            />
            <img
              id="MaleLungs"
              className="organ"
              src={MaleLungs}
              alt="MaleLungs"
            />
            <img
              id="MalePancreas"
              className="organ"
              src={MalePancreas}
              alt="MalePancreas"
            />
            <img
              id="MaleStomach"
              className="organ"
              src={MaleStomach}
              alt="MaleStomach"
            />
            <img
              id="MaleKidney"
              className="organ"
              src={MaleKidney}
              alt="MaleKidney"
            />

            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bowel}</h3>}
            >
              <button
                id="bowelButton"
                test-id="bowelButton"
                className="maleBowel"
                onClick={(button, text, organ) =>
                  this.organClicked("colon", this.props.lang.bowel, "MaleBowel")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.eyes}</h3>}
            >
              <button
                id="eyesButton"
                test-id="eyesButton"
                className="maleEyes"
                onClick={(button, text, organ) =>
                  this.organClicked("eye", this.props.lang.eyes, "MaleEyes")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.mouth}</h3>}
            >
              <button
                id="mouthButton"
                test-id="mouthButton"
                className="maleMouth"
                onClick={(button, text, organ) =>
                  this.organClicked("mouth", this.props.lang.mouth, "MaleMouth")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bone}</h3>}
            >
              <button
                id="boneButton"
                test-id="boneButton"
                className="maleBone"
                onClick={(button, text, organ) =>
                  this.organClicked("bone", this.props.lang.bone, "MaleBone")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.liver}</h3>}
            >
              <button
                id="liverButton"
                test-id="liverButton"
                className="maleLiver"
                onClick={(button, text, organ) =>
                  this.organClicked("liver", this.props.lang.liver, "MaleLiver")
                }
              />
            </Tooltip>

            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                id="kidneyButtom"
                test-id="kidneyButtom"
                className="maleKidneyLeft"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "kidney",
                    this.props.lang.kidney,
                    "MaleKidney"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                id="kidneyButtom"
                test-id="kidneyButtom"
                className="maleKidneyRight"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "kidney",
                    this.props.lang.kidney,
                    "MaleKidney"
                  )
                }
              />
            </Tooltip>

            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.lungs}</h3>}
            >
              <button
                id="lungsButton"
                test-id="lungsButton"
                className="maleLungs"
                onClick={(button, text, organ) =>
                  this.organClicked("lung", this.props.lang.lungs, "MaleLungs")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.pancreas}</h3>
              }
            >
              <button
                id="pancreasButton"
                test-id="pancreasButton"
                className="malePancreas"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "pancreas",
                    this.props.lang.pancreas,
                    "MalePancreas"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.stomach}</h3>
              }
            >
              <button
                id="stomachButton"
                test-id="stomachButton"
                className="maleStomach"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "stomach",
                    this.props.lang.stomach,
                    "MaleStomach"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.aorta}</h3>}
            >
              <button
                id="aortaButton"
                test-id="aortaButton"
                className="maleAorta"
                onClick={(button, text, organ) =>
                  this.organClicked("aorta", this.props.lang.aorta, "MaleAorta")
                }
              ></button>
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.heart}</h3>}
            >
              <button
                id="heartButton"
                test-id="heartButton"
                className="maleHeart"
                onClick={(button, text, organ) =>
                  this.organClicked("heart", this.props.lang.heart, "MaleHeart")
                }
              />
            </Tooltip>

            {/* For icons around body - Covid, Brain, Genatelia, etc. */}
            <div className="icons">
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.brain}</h3>
                }
              >
                <button
                  id="brainButton"
                  test-id="brainButton"
                  className="brain"
                  onClick={(button, text, organ) =>
                    this.iconClicked("brain", this.props.lang.brain)
                  }
                >
                  <img src={brainIcon} alt="brainIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.stethoscope}
                  </h3>
                }
              >
                <button
                  id="examButton"
                  test-id="examButton"
                  className="exam"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "physical exam",
                      this.props.lang.stethoscope
                    )
                  }
                >
                  <img src={examIcon} alt="examIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.hip}</h3>}
              >
                <button
                  id="fallsButton"
                  test-id="fallsButton"
                  className="falls"
                  onClick={(button, text, organ) =>
                    this.iconClicked("hip", this.props.lang.hip)
                  }
                >
                  <img src={fallsIcon} alt="fallsIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.needle_in_arm}
                  </h3>
                }
              >
                <button
                  id="immunizationButton"
                  test-id="immunizationButton"
                  className="immunization"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "needle in arm",
                      this.props.lang.needle_in_arm
                    )
                  }
                >
                  <img src={immunizationIcon} alt="immunizationIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.sun}</h3>}
              >
                <button
                  id="sunExposureButton"
                  test-id="sunExposureButton"
                  className="sunExposure"
                  onClick={(button, text, organ) =>
                    this.iconClicked("sun", this.props.lang.sun)
                  }
                >
                  <img src={sunExposureIcon} alt="sunExposureIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.figure_outside_body_walking}
                  </h3>
                }
              >
                <button
                  id="phyActivityButton"
                  test-id="phyActivityButton"
                  className="phyActivity"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "figure outside body walking",
                      this.props.lang.figure_outside_body_walking
                    )
                  }
                >
                  <img src={phyactIcon} alt="physicalActivityIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.genitalia}</h3>
                }
              >
                <button
                  id="maleGenitalia"
                  test-id="genitaliaButton"
                  className="maleGenitalia"
                  onClick={(button, text) =>
                    this.iconClicked("genitalia", this.props.lang.genitalia)
                  }
                >
                  <img src={MaleGenital} alt="MaleGenitalia" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.covid}</h3>
                }
              >
                <button
                  id="covidButton"
                  test-id="covidButton"
                  className="covid"
                  onClick={(button, text, organ) =>
                    this.iconClicked("covid", this.props.lang.covid)
                  }
                >
                  <img src={covidIcon} alt="covidIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.braingear}</h3>
                }
              >
                <button
                  id="brainGearButton"
                  test-id="brainGearButton"
                  className="brainGear"
                  onClick={(button, text, organ) =>
                    this.iconClicked("braingear", this.props.lang.braingear)
                  }
                >
                  <img src={braingear} alt="braingear" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.money}</h3>
                }
              >
                <button
                  id="moneyButton"
                  test-id="moneyButton"
                  className="money"
                  onClick={(button, text, organ) =>
                    this.iconClicked("money", this.props.lang.money)
                  }
                >
                  <img src={moneyIcon} alt="moneyIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.sleep}</h3>
                }
              >
                <button
                  id="sleepButton"
                  test-id="sleepButton"
                  className="sleep"
                  onClick={(button, text, organ) =>
                    this.iconClicked("sleep", this.props.lang.sleep)
                  }
                >
                  <img src={sleepIcon} alt="sleepIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.bp}</h3>}
              >
                <button
                  id="bpButton"
                  test-id="bpButton"
                  className="bp"
                  onClick={(button, text, organ) =>
                    this.iconClicked("bp", this.props.lang.bp)
                  }
                >
                  <img src={bpIcon} alt="bpIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.symptomchecker}
                  </h3>
                }
              >
                <button
                  id="symptomcheckerButton"
                  test-id="symptomcheckerButton"
                  className="symptomchecker"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "symptomchecker",
                      this.props.lang.symptomchecker
                    )
                  }
                >
                  <img src={symptomcheckerIcon} alt="symptomchecker" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.familydoctor}
                  </h3>
                }
              >
                <button
                  id="familydoctorButton"
                  test-id="familydoctorButton"
                  className="familydoctor"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "familydoctor",
                      this.props.lang.familydoctor
                    )
                  }
                >
                  <img src={familydoctorIcon} alt="familydoctor" />
                </button>
              </Tooltip>

              {/* <button id="genitaliaButton" className="maleGenital" onClick={(button, text, organ) => this.iconClicked("genitalia", this.props.lang.genitalia)}><img src={genitaliaIcon} alt="genitaliaIcon" /> </button> */}
            </div>
          </div>

          <div>
            <BodyModal
              show={this.state.isOpen}
              onClose={this.toggleModal}
              display={this.state.display}
              button={this.state.buttonText}
              displayConfig={this.state.displayConfigOption}
              getTopic={this.props.getDisplay}
              clickOnText={this.props.lang.clickOn_Text}
              userInfo={this.props.userInfo}
            ></BodyModal>
          </div>
          <div>
            <DialogBox
              open={this.state.feedbackDialog}
              setOpen={this.handleFeedBackToggle}
              title={this.props.lang.feedback_dialog_title}
              text={this.props.lang.feedback_text}
              cancelButtonText={this.props.lang.cancel_feedback}
              agreeButtonText={this.props.lang.agree_feedback}
            />
          </div>
        </div>
      );
    }

    //Female
    else if (this.props.gender === "female" && this.props.Tgender === "tm") {
      return (
        <div>
          <div className="mainRunner">
            <img
              className="body"
              src={Female}
              alt="Female"
              test-id="femaleBodyImg"
            />
            {/* <img id="FemaleGenitalia" className="organ" src={FemaleGenitalia} alt="FemaleGenitalia" /> */}
            <img
              id="FemaleAorta"
              className="organ"
              src={FemaleAorta}
              alt="FemaleAorta"
            />
            <img
              id="FemaleBowel"
              className="organ"
              src={FemaleBowel}
              alt="FemaleBowel"
            />
            <img
              id="FemaleBreast"
              className="organ"
              src={FemaleBreast}
              alt="FemaleBreast"
            />
            <img
              id="FemaleEyes"
              className="organ"
              src={FemaleEyes}
              alt="FemaleEyes"
            />
            <img
              id="FemaleMouth"
              className="organ"
              src={FemaleMouth}
              alt="FemaleMouth"
            />
            <img
              id="FemaleHeart"
              className="organ"
              src={FemaleHeart}
              alt="FemaleHeart"
            />
            <img
              id="FemaleBone"
              className="organ"
              src={FemaleBone}
              alt="FemaleBone"
            />
            <img
              id="FemaleLiver"
              className="organ"
              src={FemaleLiver}
              alt="FemaleLiver"
            />
            <img
              id="FemaleLungs"
              className="organ"
              src={FemaleLungs}
              alt="FemaleLungs"
            />
            <img
              id="FemalePancreas"
              className="organ"
              src={FemalePancreas}
              alt="FemalePancreas"
            />
            <img
              id="FemaleStomach"
              className="organ"
              src={FemaleStomach}
              alt="FemaleStomach"
            />
            <img
              id="FemaleUterus"
              className="organ"
              src={FemaleUterus}
              alt="FemaleUterus"
            />
            <img
              id="FemaleOvary"
              className="organ"
              src={FemaleOvary}
              alt="FemaleOvary"
            />
            <img
              id="FemaleKidney"
              className="organ"
              src={FemaleKidney}
              alt="FemaleKidney"
            />

            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bowel}</h3>}
            >
              <button
                className="femaleBowel"
                test-id="bowelButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "colon",
                    this.props.lang.bowel,
                    "FemaleBowel"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.eyes}</h3>}
            >
              <button
                className="femaleEyes"
                test-id="eyesButton"
                onClick={(button, text, organ) =>
                  this.organClicked("eye", this.props.lang.eyes, "FemaleEyes")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.mouth}</h3>}
            >
              <button
                className="femaleMouth"
                test-id="mouthButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "mouth",
                    this.props.lang.mouth,
                    "FemaleMouth"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bone}</h3>}
            >
              <button
                className="femaleBone"
                test-id="boneButton"
                onClick={(button, text, organ) =>
                  this.organClicked("bone", this.props.lang.bone, "FemaleBone")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.liver}</h3>}
            >
              <button
                className="femaleLiver"
                test-id="liverButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "liver",
                    this.props.lang.liver,
                    "FemaleLiver"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.lungs}</h3>}
            >
              <button
                className="femaleLungs"
                test-id="lungsButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "lung",
                    this.props.lang.lungs,
                    "FemaleLungs"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.pancreas}</h3>
              }
            >
              <button
                className="femalePancreas"
                test-id="pancreasButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "pancreas",
                    this.props.lang.pancreas,
                    "FemalePancreas"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.stomach}</h3>
              }
            >
              <button
                className="femaleStomach"
                test-id="stomachButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "stomach",
                    this.props.lang.stomach,
                    "FemaleStomach"
                  )
                }
              />
            </Tooltip>
            <Tooltip title={<h3 style={{ color: "#fff" }}>breast</h3>}>
              <button
                className="breast"
                test-id="breastButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "breast",
                    this.props.lang.breast,
                    "FemaleBreast"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.aorta}</h3>}
            >
              <button
                className="femaleAorta"
                test-id="aortaButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "aorta",
                    this.props.lang.aorta,
                    "FemaleAorta"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.heart}</h3>}
            >
              <button
                className="femaleHeart"
                test-id="heartButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "heart",
                    this.props.lang.heart,
                    "FemaleHeart"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                className="femaleKidney"
                test-id="kidneyButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "kidney",
                    this.props.lang.kidney,
                    "FemaleKidney"
                  )
                }
              />
            </Tooltip>

            <div className="icons">
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.brain}</h3>
                }
              >
                <button
                  className="brain"
                  test-id="brainButton"
                  onClick={(button, text) =>
                    this.iconClicked("brain", this.props.lang.brain)
                  }
                >
                  <img src={brainIcon} alt="brainIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.stethoscope}
                  </h3>
                }
              >
                <button
                  className="exam"
                  test-id="examButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "physical exam",
                      this.props.lang.stethoscope
                    )
                  }
                >
                  <img src={examIcon} alt="examIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.hip}</h3>}
              >
                <button
                  className="falls"
                  test-id="fallsButton"
                  onClick={(button, text) =>
                    this.iconClicked("hip", this.props.lang.hip)
                  }
                >
                  <img src={fallsIcon} alt="fallsIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.needle_in_arm}
                  </h3>
                }
              >
                <button
                  className="immunization"
                  test-id="immunizationButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "needle in arm",
                      this.props.lang.needle_in_arm
                    )
                  }
                >
                  <img src={immunizationIcon} alt="immunizationIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.sun}</h3>}
              >
                <button
                  className="sunExposure"
                  test-id="sunExposureButton"
                  onClick={(button, text) =>
                    this.iconClicked("sun", this.props.lang.sun)
                  }
                >
                  <img src={sunExposureIcon} alt="sunExposureIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.figure_outside_body_walking}
                  </h3>
                }
              >
                <button
                  className="phyActivity"
                  test-id="phyActivityButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "figure outside body walking",
                      this.props.lang.figure_outside_body_walking
                    )
                  }
                >
                  <img src={phyactIcon} alt="physicalActivityIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.genitalia}</h3>
                }
              >
                <button
                  id="femaleGenitalian"
                  className="femaleGenitalia"
                  test-id="genitaliaButton"
                  onClick={(button, text) =>
                    this.iconClicked("genitalia", this.props.lang.genitalia)
                  }
                >
                  <img src={FemaleGenital} alt="GenitalF" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.covid}</h3>
                }
              >
                <button
                  id="covidButton"
                  className="covid"
                  test-id="covidButton"
                  onClick={(button, text) =>
                    this.iconClicked("covid", this.props.lang.covid)
                  }
                >
                  <img src={covidIcon} alt="covidIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.braingear}</h3>
                }
              >
                <button
                  id="brainGearButton"
                  className="brainGear"
                  test-id="brainGearButton"
                  onClick={(button, text, organ) =>
                    this.iconClicked("braingear", this.props.lang.braingear)
                  }
                >
                  <img src={braingear} alt="braingear" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.money}</h3>
                }
              >
                <button
                  id="moneyButton"
                  test-id="moneyButton"
                  className="money"
                  onClick={(button, text, organ) =>
                    this.iconClicked("money", this.props.lang.money)
                  }
                >
                  <img src={moneyIcon} alt="moneyIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.sleep}</h3>
                }
              >
                <button
                  id="sleepButton"
                  test-id="sleepButton"
                  className="sleep"
                  onClick={(button, text, organ) =>
                    this.iconClicked("sleep", this.props.lang.sleep)
                  }
                >
                  <img src={sleepIcon} alt="sleepIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.bp}</h3>}
              >
                <button
                  id="bpButton"
                  className="bpfemale"
                  test-id="bpButton"
                  onClick={(button, text, organ) =>
                    this.iconClicked("bp", this.props.lang.bp)
                  }
                >
                  <img src={bpIcon} alt="bpIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.symptomchecker}
                  </h3>
                }
              >
                <button
                  id="symptomcheckerButton"
                  test-id="symptomcheckerButton"
                  className="symptomchecker"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "symptomchecker",
                      this.props.lang.symptomchecker
                    )
                  }
                >
                  <img src={symptomcheckerIcon} alt="symptomchecker" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.familydoctor}
                  </h3>
                }
              >
                <button
                  id="familydoctorButton"
                  test-id="familydoctorButton"
                  className="familydoctor"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "familydoctor",
                      this.props.lang.familydoctor
                    )
                  }
                >
                  <img src={familydoctorIcon} alt="familydoctor" />
                </button>
              </Tooltip>
              {/*<button id="genitaliaButton" className="femaleGenital" onClick={(button, text) => this.iconClicked("genitalia", this.props.lang.genitalia)}><img src={fgenitaliaIcon} alt="fgenitaliaIcon" /> </button> */}
            </div>
          </div>
          <BodyModal
            show={this.state.isOpen}
            onClose={this.toggleModal}
            display={this.state.display}
            button={this.state.buttonText}
            displayConfig={this.state.displayConfigOption}
            getTopic={this.props.getDisplay}
            clickOnText={"hii"}
            userInfo={this.props.userInfo}
          ></BodyModal>

          <div>
            <DialogBox
              open={this.state.feedbackDialog}
              setOpen={this.handleFeedBackToggle}
              title={this.props.lang.feedback_dialog_title}
              text={this.props.lang.feedback_text}
              cancelButtonText={this.props.lang.cancel_feedback}
              agreeButtonText={this.props.lang.agree_feedback}
            />
          </div>
        </div>
      );
    }

    //Nonbinary
    else if (this.props.gender === "nonbinary") {
      return (
        <div>
          <div className="mainRunner">
            <img
              className="body"
              src={TransBody}
              alt="transbody"
              test-id="transBodyImg"
            />
            {/*TODO find organs that fits the body*/}
            <img id="Aorta" className="organ" src={TransAorta} alt="Aorta" />
            <img id="Bowel" className="organ" src={TransBowel} alt="Bowel" />
            <img id="Breast" className="organ" src={TransBreast} alt="Breast" />
            <img
              id="Breast/Chest"
              className="organ"
              src={TransBreast}
              alt="Breast/Chest"
            />
            <img id="Eyes" className="organ" src={TransEyes} alt="Eyes" />
            <img id="Mouth" className="organ" src={TransMouth} alt="Mouth" />
            <img id="Heart" className="organ" src={TransHeart} alt="Heart" />
            <img id="Bone" className="organ" src={TransBone} alt="Bone" />
            <img id="Liver" className="organ" src={TransLiver} alt="Liver" />
            <img id="Lungs" className="organ" src={TransLungs} alt="Lungs" />
            <img
              id="Pancreas"
              className="organ"
              src={TransPancreas}
              alt="Pancreas"
            />
            <img
              id="Stomach"
              className="organ"
              src={TransStomach}
              alt="Stomach"
            />
            <img
              id="Genital"
              className="organ"
              src={transGenital}
              alt="Genitalt"
            />
            <img id="Kidney" className="organ" src={TransKidney} alt="Kidney" />

            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bowel}</h3>}
            >
              <button
                id="bowelButton"
                className="bowel"
                test-id="bowelButton"
                onClick={(button, text, organ) =>
                  this.organClicked("colon", this.props.lang.bowel, "Bowel")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.eyes}</h3>}
            >
              <button
                id="eyesButton"
                className="eyes"
                test-id="eyesButton"
                onClick={(button, text, organ) =>
                  this.organClicked("eye", this.props.lang.eyes, "Eyes")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.mouth}</h3>}
            >
              <button
                id="mouthButton"
                className="mouth"
                test-id="mouthButton"
                onClick={(button, text, organ) =>
                  this.organClicked("mouth", this.props.lang.mouth, "Mouth")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bone}</h3>}
            >
              <button
                id="boneButton"
                className="bone"
                test-id="boneButton"
                onClick={(button, text, organ) =>
                  this.organClicked("bone", this.props.lang.bone, "Bone")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.liver}</h3>}
            >
              <button
                id="liverButton"
                className="liver"
                test-id="liverButton"
                onClick={(button, text, organ) =>
                  this.organClicked("liver", this.props.lang.liver, "Liver")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.lungs}</h3>}
            >
              <button
                id="lungsButton"
                className="lungs"
                test-id="lungsButton"
                onClick={(button, text, organ) =>
                  this.organClicked("lung", this.props.lang.lungs, "Lungs")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.pancreas}</h3>
              }
            >
              <button
                id="pancreasButton"
                className="pancreas"
                test-id="pancreasButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "pancreas",
                    this.props.lang.pancreas,
                    "Pancreas"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.stomach}</h3>
              }
            >
              <button
                id="stomachButton"
                className="stomach"
                test-id="stomachButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "stomach",
                    this.props.lang.stomach,
                    "Stomach"
                  )
                }
              />
            </Tooltip>
            <Tooltip title={<h3 style={{ color: "#fff" }}>breast</h3>}>
              <button
                className="breast"
                test-id="breastButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "breast/chest",
                    this.props.lang.transbreast,
                    "Breast/Chest"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.aorta}</h3>}
            >
              <button
                id="aortaButton"
                className="aorta"
                test-id="aortaButton"
                onClick={(button, text, organ) =>
                  this.organClicked("aorta", this.props.lang.aorta, "Aorta")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.heart}</h3>}
            >
              <button
                id="heartButton"
                className="heart"
                test-id="heartButton"
                onClick={(button, text, oran) =>
                  this.organClicked("heart", this.props.lang.heart, "Heart")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                id="kidneyButton"
                className="kidneyLeft"
                test-id="kidneyButton"
                onClick={(button, text, oran) =>
                  this.organClicked("kidney", this.props.lang.kidney, "Kidney")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                id="kidneyButton"
                className="kidneyRight"
                test-id="kidneyButton"
                onClick={(button, text, oran) =>
                  this.organClicked("kidney", this.props.lang.kidney, "Kidney")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.genitalia}</h3>
              }
            >
              <button
                className="genitalia"
                onClick={(button, text, organ) =>
                  this.organClicked("genitalia", this.props.lang.genitalia, "")
                }
              />
            </Tooltip>

            <div className="icons">
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.brain}</h3>
                }
              >
                <button
                  id="brainButton"
                  className="brain"
                  test-id="brainButton"
                  onClick={(button, text) =>
                    this.iconClicked("brain", this.props.lang.brain)
                  }
                >
                  <img src={brainIcon} alt="brainIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.stethoscope}
                  </h3>
                }
              >
                <button
                  id="examButton"
                  className="exam"
                  test-id="examButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "physical exam",
                      this.props.lang.stethoscope
                    )
                  }
                >
                  <img src={examIcon} alt="examIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.hip}</h3>}
              >
                <button
                  id="fallsButton"
                  className="falls"
                  test-id="fallsButton"
                  onClick={(button, text) =>
                    this.iconClicked("hip", this.props.lang.hip)
                  }
                >
                  <img src={fallsIcon} alt="fallsIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.needle_in_arm}
                  </h3>
                }
              >
                <button
                  id="immunizationButton"
                  className="immunization"
                  test-id="immunizationButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "needle in arm",
                      this.props.lang.needle_in_arm
                    )
                  }
                >
                  <img src={immunizationIcon} alt="immunizationIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.sun}</h3>}
              >
                <button
                  id="sunExposureButton"
                  className="sunExposure"
                  test-id="sunExposureButton"
                  onClick={(button, text) =>
                    this.iconClicked("sun", this.props.lang.sun)
                  }
                >
                  <img src={sunExposureIcon} alt="sunExposureIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.figure_outside_body_walking}
                  </h3>
                }
              >
                <button
                  id="phyActivityButton"
                  className="phyActivity"
                  test-id="phyActivityButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "figure outside body walking",
                      this.props.lang.figure_outside_body_walking
                    )
                  }
                >
                  <img src={phyactIcon} alt="physicalActivityIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.covid}</h3>
                }
              >
                <button
                  id="covidButton"
                  className="covid"
                  test-id="covidButton"
                  onClick={(button, text) =>
                    this.iconClicked("covid", this.props.lang.covid)
                  }
                >
                  <img src={covidIcon} alt="covidIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.genitalia}</h3>
                }
              >
                <button
                  id="genitaliaButton"
                  className="transGenital"
                  test-id="genitaliaButton"
                  onClick={(button, text) =>
                    this.iconClicked("genitalia", this.props.lang.genitalia)
                  }
                >
                  <img src={transGenital} alt="GenitalT" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.braingear}</h3>
                }
              >
                <button
                  id="brainGearButton"
                  className="brainGear"
                  test-id="brainGearButton"
                  onClick={(button, text, organ) =>
                    this.iconClicked("braingear", this.props.lang.braingear)
                  }
                >
                  <img src={braingear} alt="braingear" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.money}</h3>
                }
              >
                <button
                  id="moneyButton"
                  test-id="moneyButton"
                  className="money"
                  onClick={(button, text, organ) =>
                    this.iconClicked("money", this.props.lang.money)
                  }
                >
                  <img src={moneyIcon} alt="moneyIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.sleep}</h3>
                }
              >
                <button
                  id="sleepButton"
                  test-id="sleepButton"
                  className="sleep"
                  onClick={(button, text, organ) =>
                    this.iconClicked("sleep", this.props.lang.sleep)
                  }
                >
                  <img src={sleepIcon} alt="sleepIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.bp}</h3>}
              >
                <button
                  id="bpButton"
                  className="bpnb"
                  test-id="bpButton"
                  onClick={(button, text, organ) =>
                    this.iconClicked("bp", this.props.lang.bp)
                  }
                >
                  <img src={bpIcon} alt="bpIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.symptomchecker}
                  </h3>
                }
              >
                <button
                  id="symptomcheckerButton"
                  test-id="symptomcheckerButton"
                  className="symptomchecker"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "symptomchecker",
                      this.props.lang.symptomchecker
                    )
                  }
                >
                  <img src={symptomcheckerIcon} alt="symptomchecker" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.familydoctor}
                  </h3>
                }
              >
                <button
                  id="familydoctorButton"
                  test-id="familydoctorButton"
                  className="familydoctor"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "familydoctor",
                      this.props.lang.familydoctor
                    )
                  }
                >
                  <img src={familydoctorIcon} alt="familydoctor" />
                </button>
              </Tooltip>
              {/*<button id="transButton" className="trans" onClick={(button, text) => this.iconClicked("trans", this.props.lang.covid)}><img src={transIcon} alt="transIcon" /></button>*/}
            </div>
            {/* <div className="fixSelectedOrgan" test-id="selectedButton"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                        </div> */}
          </div>

          <div>
            <BodyModal
              show={this.state.isOpen}
              onClose={this.toggleModal}
              display={this.state.display}
              button={this.state.buttonText}
              getTopic={this.props.getDisplay}
              clickOnText={"Hii"}
              userInfo={this.props.userInfo}
            ></BodyModal>
          </div>

          <div>
            <DialogBox
              open={this.state.feedbackDialog}
              setOpen={this.handleFeedBackToggle}
              title={this.props.lang.feedback_dialog_title}
              text={this.props.lang.feedback_text}
              cancelButtonText={this.props.lang.cancel_feedback}
              agreeButtonText={this.props.lang.agree_feedback}
            />
          </div>
        </div>
      );
    }
    //end of nonbinary

    //Transgender
    else if (
      (this.props.gender === "male" && this.props.Tgender === "tm") ||
      (this.props.gender === "female" && this.props.Tgender === "tf")
    ) {
      return (
        <div>
          <div className="mainRunner">
            <img
              className="body"
              src={TransBody}
              alt="transbody"
              test-id="transBodyImg"
            />
            {/*TODO find organs that fits the body*/}
            <img id="Aorta" className="organ" src={TransAorta} alt="Aorta" />
            <img id="Bowel" className="organ" src={TransBowel} alt="Bowel" />
            <img id="Breast" className="organ" src={TransBreast} alt="Breast" />
            <img
              id="Breast/Chest"
              className="organ"
              src={TransBreast}
              alt="Breast/Chest"
            />
            <img id="Eyes" className="organ" src={TransEyes} alt="Eyes" />
            <img id="Mouth" className="organ" src={TransMouth} alt="Mouth" />
            <img id="Heart" className="organ" src={TransHeart} alt="Heart" />
            <img id="Bone" className="organ" src={TransBone} alt="Bone" />
            <img id="Liver" className="organ" src={TransLiver} alt="Liver" />
            <img id="Lungs" className="organ" src={TransLungs} alt="Lungs" />
            <img
              id="Pancreas"
              className="organ"
              src={TransPancreas}
              alt="Pancreas"
            />
            <img
              id="Stomach"
              className="organ"
              src={TransStomach}
              alt="Stomach"
            />
            <img
              id="Genital"
              className="organ"
              src={transGenital}
              alt="Genitalt"
            />
            <img id="Kidney" className="organ" src={TransKidney} alt="Kidney" />

            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bowel}</h3>}
            >
              <button
                id="bowelButton"
                className="bowel"
                test-id="bowelButton"
                onClick={(button, text, organ) =>
                  this.organClicked("colon", this.props.lang.bowel, "Bowel")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.eyes}</h3>}
            >
              <button
                id="eyesButton"
                className="eyes"
                test-id="eyesButton"
                onClick={(button, text, organ) =>
                  this.organClicked("eye", this.props.lang.eyes, "Eyes")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.mouth}</h3>}
            >
              <button
                id="mouthButton"
                className="mouth"
                test-id="mouthButton"
                onClick={(button, text, organ) =>
                  this.organClicked("mouth", this.props.lang.mouth, "Mouth")
                }
              />
            </Tooltip>

            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.bone}</h3>}
            >
              <button
                id="boneButton"
                className="bone"
                test-id="boneButton"
                onClick={(button, text, organ) =>
                  this.organClicked("bone", this.props.lang.bone, "Bone")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.liver}</h3>}
            >
              <button
                id="liverButton"
                className="liver"
                test-id="liverButton"
                onClick={(button, text, organ) =>
                  this.organClicked("liver", this.props.lang.liver, "Liver")
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.lungs}</h3>}
            >
              <button
                id="lungsButton"
                className="lungs"
                test-id="lungsButton"
                onClick={(button, text, organ) =>
                  this.organClicked("lung", this.props.lang.lungs, "Lungs")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.pancreas}</h3>
              }
            >
              <button
                id="pancreasButton"
                className="pancreas"
                test-id="pancreasButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "pancreas",
                    this.props.lang.pancreas,
                    "Pancreas"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.stomach}</h3>
              }
            >
              <button
                id="stomachButton"
                className="stomach"
                test-id="stomachButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "stomach",
                    this.props.lang.stomach,
                    "Stomach"
                  )
                }
              />
            </Tooltip>
            <Tooltip title={<h3 style={{ color: "#fff" }}>breast</h3>}>
              <button
                className="breast"
                test-id="breastButton"
                onClick={(button, text, organ) =>
                  this.organClicked(
                    "breast/chest",
                    this.props.lang.transbreast,
                    "Breast/Chest"
                  )
                }
              />
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.aorta}</h3>}
            >
              <button
                id="aortaButton"
                className="aorta"
                test-id="aortaButton"
                onClick={(button, text, organ) =>
                  this.organClicked("aorta", this.props.lang.aorta, "Aorta")
                }
              ></button>
            </Tooltip>
            <Tooltip
              title={<h3 style={{ color: "#fff" }}>{this.props.lang.heart}</h3>}
            >
              <button
                id="heartButton"
                className="heart"
                test-id="heartButton"
                onClick={(button, text, oran) =>
                  this.organClicked("heart", this.props.lang.heart, "Heart")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.genitalia}</h3>
              }
            >
              <button
                className="genitalia"
                onClick={(button, text, organ) =>
                  this.organClicked("genitalia", this.props.lang.genitalia, "")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                id="kidneyButton"
                className="kidneyLeft"
                test-id="kidneyButton"
                onClick={(button, text, oran) =>
                  this.organClicked("kidney", this.props.lang.kidney, "Kidney")
                }
              />
            </Tooltip>
            <Tooltip
              title={
                <h3 style={{ color: "#fff" }}>{this.props.lang.kidney}</h3>
              }
            >
              <button
                id="kidneyButton"
                className="kidneyRight"
                test-id="kidneyButton"
                onClick={(button, text, oran) =>
                  this.organClicked("kidney", this.props.lang.kidney, "Kidney")
                }
              />
            </Tooltip>

            <div className="icons">
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.brain}</h3>
                }
              >
                <button
                  id="brainButton"
                  className="brain"
                  test-id="brainButton"
                  onClick={(button, text) =>
                    this.iconClicked("brain", this.props.lang.brain)
                  }
                >
                  <img src={brainIcon} alt="brainIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.stethoscope}
                  </h3>
                }
              >
                <button
                  id="examButton"
                  className="exam"
                  test-id="examButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "physical exam",
                      this.props.lang.stethoscope
                    )
                  }
                >
                  <img src={examIcon} alt="examIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.hip}</h3>}
              >
                <button
                  id="fallsButton"
                  className="falls"
                  test-id="fallsButton"
                  onClick={(button, text) =>
                    this.iconClicked("hip", this.props.lang.hip)
                  }
                >
                  <img src={fallsIcon} alt="fallsIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.needle_in_arm}
                  </h3>
                }
              >
                <button
                  id="immunizationButton"
                  className="immunization"
                  test-id="immunizationButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "needle in arm",
                      this.props.lang.needle_in_arm
                    )
                  }
                >
                  <img src={immunizationIcon} alt="immunizationIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.sun}</h3>}
              >
                <button
                  id="sunExposureButton"
                  className="sunExposure"
                  test-id="sunExposureButton"
                  onClick={(button, text) =>
                    this.iconClicked("sun", this.props.lang.sun)
                  }
                >
                  <img src={sunExposureIcon} alt="sunExposureIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.figure_outside_body_walking}
                  </h3>
                }
              >
                <button
                  id="phyActivityButton"
                  className="phyActivity"
                  test-id="phyActivityButton"
                  onClick={(button, text) =>
                    this.iconClicked(
                      "figure outside body walking",
                      this.props.lang.figure_outside_body_walking
                    )
                  }
                >
                  <img src={phyactIcon} alt="physicalActivityIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.covid}</h3>
                }
              >
                <button
                  id="covidButton"
                  className="covid"
                  test-id="covidButton"
                  onClick={(button, text) =>
                    this.iconClicked("covid", this.props.lang.covid)
                  }
                >
                  <img src={covidIcon} alt="covidIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.genitalia}</h3>
                }
              >
                <button
                  id="genitaliaButton"
                  className="transGenital"
                  test-id="genitaliaButton"
                  onClick={(button, text) =>
                    this.iconClicked("genitalia", this.props.lang.genitalia)
                  }
                >
                  <img src={transGenital} alt="GenitalT" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.braingear}</h3>
                }
              >
                <button
                  id="brainGearButton"
                  className="brainGear"
                  test-id="brainGearButton"
                  onClick={(button, text, organ) =>
                    this.iconClicked("braingear", this.props.lang.braingear)
                  }
                >
                  <img src={braingear} alt="braingear" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.money}</h3>
                }
              >
                <button
                  id="moneyButton"
                  test-id="moneyButton"
                  className="money"
                  onClick={(button, text, organ) =>
                    this.iconClicked("money", this.props.lang.money)
                  }
                >
                  <img src={moneyIcon} alt="moneyIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>{this.props.lang.sleep}</h3>
                }
              >
                <button
                  id="sleepButton"
                  test-id="sleepButton"
                  className="sleep"
                  onClick={(button, text, organ) =>
                    this.iconClicked("sleep", this.props.lang.sleep)
                  }
                >
                  <img src={sleepIcon} alt="sleepIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={<h3 style={{ color: "#fff" }}>{this.props.lang.bp}</h3>}
              >
                <button
                  id="bpButton"
                  className="bptg"
                  test-id="bpButton"
                  onClick={(button, text, organ) =>
                    this.iconClicked("bp", this.props.lang.bp)
                  }
                >
                  <img src={bpIcon} alt="bpIcon" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.symptomchecker}
                  </h3>
                }
              >
                <button
                  id="symptomcheckerButton"
                  test-id="symptomcheckerButton"
                  className="symptomchecker"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "symptomchecker",
                      this.props.lang.symptomchecker
                    )
                  }
                >
                  <img src={symptomcheckerIcon} alt="symptomchecker" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <h3 style={{ color: "#fff" }}>
                    {this.props.lang.familydoctor}
                  </h3>
                }
              >
                <button
                  id="familydoctorButton"
                  test-id="familydoctorButton"
                  className="familydoctor"
                  onClick={(button, text, organ) =>
                    this.iconClicked(
                      "familydoctor",
                      this.props.lang.familydoctor
                    )
                  }
                >
                  <img src={familydoctorIcon} alt="familydoctor" />
                </button>
              </Tooltip>
              {/*<button id="transButton" className="trans" onClick={(button, text) => this.iconClicked("trans", this.props.lang.covid)}><img src={transIcon} alt="transIcon" /></button>*/}
            </div>
            {/* <div className="fixSelectedOrgan" test-id="selectedButton"><h1 style={fixedStyle}>{this.state.organSelected}</h1>
                        </div> */}
          </div>

          <div>
            <BodyModal
              show={this.state.isOpen}
              onClose={this.toggleModal}
              display={this.state.display}
              button={this.state.buttonText}
              getTopic={this.props.getDisplay}
              clickOnText={"hii"}
              userInfo={this.props.userInfo}
            ></BodyModal>
          </div>
          <div>
            <DialogBox
              open={this.state.feedbackDialog}
              setOpen={this.handleFeedBackToggle}
              title={this.props.lang.feedback_dialog_title}
              text={this.props.lang.feedback_text}
              cancelButtonText={this.props.lang.cancel_feedback}
              agreeButtonText={this.props.lang.agree_feedback}
            />
          </div>
        </div>
      );
    }

    //Non-body elements (navbar, home, icons, etc.)
    else {
      return (
        <div>
          <div className="mainRunner">
            {/* <img className="body" src={MaleFemale} alt="MaleFemale" />; */}
          </div>
        </div>
      );
    }
  }
}

Anatomy.propTypes = {
  gender: PropTypes.string,
  userInfo: PropTypes.object,
  getDisplay: PropTypes.func.isRequired,
  lang: PropTypes.object,
};

export default Anatomy;
