import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import ReactGA from "react-ga";
import { IoIosSettings } from "react-icons/io";
import { Button, ButtonToolbar, Media } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";

import Lang from "./Lang/Lang.json";
import "./App.css";
import "./Button.css";
import "./Style/checkbox.css";
import "./Style/Modal.css";
import MyModal from "./MyModal";
import Data from "./Data.js";
//import InstructionModal from './InstructionModal.js';
import MyBody from "./Body/Body.js";
import Tests from "./Tests/Tests.js";
import Topics from "./Topics/Topics.js";
//import {setGender} from './UserInfo';
//import {setPatientProvider} from './UserInfo';
//import {setAge} from './UserInfo';
import { getUserInfo } from "./UserInfo";
import { isTransgender } from "./config";

// Home and arrow back icon logo
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { englishForm, frenchForm } from "./constants.js";
import FeedbackDialogEn from "./components/feedback-components/FeedbackDialogEn.js";
import FeedbackDialogFr from "./components/feedback-components/FeedbackDialogFr";
import DialogBox from "./components/DialogBox.js";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    var userInfo = {
      userID: null,
      sessionID: null,
      gender: null,
      Tgender: null,
      patient_provider: null,
      age: null,
      language: null,
      region: null,
      city: null,
      preNav: null,
      preCat: null,
      preTime: null,
    }; // = getUserInfo();
    let DataToDisplay = new Data(this.props.appLanguage);
    var app_language = this.props.appLanguage;

    this.state = {
      userID: cookies.get("userID"),
      sessionID: cookies.get("sessionID"),
      isOpen: false,
      configurationIsOpen: false, //used to be isOpen
      bodyView: cookies.get("user") == "provider" ? false : true,
      topicsView: cookies.get("user") == "provider" ? true : false,
      testsView: false,
      visible: true,
      language: app_language,
      lang:
        typeof userInfo.language == "string"
          ? Lang[userInfo.language]
          : Lang[app_language],
      data: DataToDisplay,
      //use cookie here
      firstTime: true,
      onboarded: cookies.get("_onboarded"),
      instructionIsOpen: cookies.get("_onboarded") == "true" ? false : true,
      age: !cookies.get("age") ? 18 : cookies.get("age"),
      allAgesSelectedCookie: cookies.get("_all_ages_selected"), //a string for some reason
      allAgesSelected:
        cookies.get("_all_ages_selected") == "true" ? true : false,
      user: cookies.get("user") || "patient",
      gender: cookies.get("gender"),
      Tgender: cookies.get("Tgender"),
      region: null,
      city: null,
      preNav: null,
      preCat: null,
      preTime: null,
      showMe: true,
      isTransgender: isTransgender, //isTransgender -- Flag
      //allowToClose: false, //obselete! we use to make the user agree before they could press agree
      getStartedFormID: !cookies.get("_onboarded") ? 0 : 1,
      feedbackDialog: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePatientProviderChange =
      this.handlePatientProviderChange.bind(this);
    this.handlePatientProviderChangeFromConfig =
      this.handlePatientProviderChangeFromConfig.bind(this);
    this.handleAllAgesSelected = this.handleAllAgesSelected.bind(this);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
    this.handleTransGenderChange = this.handleTransGenderChange.bind(this);
    // this.onChangeTopSurgery=this.onChangeTopSurgery.bind(this);
    // this.onChangeBottomSurgery=this.onChangeBottomSurgery.bind(this);
    // this.onChangeHormoneTherapy=this.onChangeHormoneTherapy.bind(this);
    this.onChangeisEstrogen = this.onChangeisEstrogen.bind(this);
    this.onChangeisTestosterone = this.onChangeisTestosterone.bind(this);
    this.onChangeisBreasts = this.onChangeisBreasts.bind(this);
    this.onChangeisVaginaCervix = this.onChangeisVaginaCervix.bind(this);
    this.onChangeisProstate = this.onChangeisProstate.bind(this);
    this.feedbackHandle = this.feedbackHandle.bind(this);

    //handle home redirect
    this.handleHomeRedirect = this.handleHomeRedirect.bind(this);
  }

  componentDidMount() {
    if (this.state.bodyView) {
      document.getElementById("body").classList = "active";
    } else if (this.state.topicsView) {
      document.getElementById("topic").classList = "active";
    } else if (this.state.testsView) {
      document.getElementById("test").classList = "active";
    }
    try {
      if (this.state.user == "patient") {
        //document.getElementById("disclaimer").innerHTML = this.state.lang.patientDisclaimer;
        document.getElementById("genderSelector").style.display = "block";
      } else if (this.state.user == "provider") {
        //document.getElementById("disclaimer").innerHTML = this.state.lang.providerDisclaimer;
        document.getElementById("genderSelector").style.display = "block";
      }

      // this.fieldSelectionDisplayHandle(this.state.gender);
    } catch (err) {}

    /// The following steps is to get clientID from google analytics and save it to cookies
    const { cookies } = this.props;
    var clientId = null;
    ReactGA.ga(function (tracker) {
      clientId = tracker.get("clientId");
    });
    if (!cookies.get("userID")) {
      cookies.set("userID", clientId, { path: "/" });
    }

    if (!cookies.get("sessionID")) {
      cookies.set("sessionID", uuidv4().toString(), { path: "/" });
    }
    //setstate()
    this.setState({
      userID: cookies.get("userID"),
      sessionID: cookies.get("sessionID"),
    });
    //count a pageview of body
    //ReactGA.pageview('body');

    /* navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }); */

    window
      .fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          city: data.city,
          region: data.region,
        });
      });
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.setState({
      preNav: nav,
      preCat: cat,
      preTime: time,
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

  feedbackHandle() {
    this.setState({ feedbackDialog: true });
  }

  //toggle the config modif
  toggleConfigurationModal = () => {
    //Transgener configuration modal
    if (this.state.isTransgender) {
      var genders = [
        "male",
        "female",
        "all_genders",
        "nonbinary",
        "transgender",
      ];
      var Tgenders = ["tf", "tm"];
      if (
        genders.includes(this.state.gender) &&
        ((this.state.age >= 18 && this.state.age <= 150) ||
          this.state.allAgesSelected) &&
        Tgenders.includes(this.state.Tgender)
      ) {
        this.setState({
          configurationIsOpen: !this.state.configurationIsOpen,
        });
        document.getElementById("config_agehelp").style.display = "none";
      } else {
        document.getElementById("config_agehelp").style.display = "block";
      }
    } else {
      var genders = ["male", "female", "all_genders"];
      if (
        genders.includes(this.state.gender) &&
        ((this.state.age >= 18 && this.state.age <= 150) ||
          this.state.allAgesSelected)
      ) {
        this.setState({
          configurationIsOpen: !this.state.configurationIsOpen,
        });
        document.getElementById("config_help").style.display = "none";
      } else {
        document.getElementById("config_help").style.display = "block";
      }
    }
  };

  //Trangender Intruction modal
  toggleIntrutionModal = () => {
    //Applying istransgender flag

    if (this.state.isTransgender) {
      var genders = [
        "male",
        "female",
        "all_genders",
        "nonbinary",
        "transgender",
      ];
      var Tgenders = ["tf", "tm"];
      if (
        genders.includes(this.state.gender) &&
        ((this.state.age >= 18 && this.state.age <= 150) ||
          this.state.allAgesSelected) &&
        Tgenders.includes(this.state.Tgender)
      ) {
        const { cookies } = this.props;
        if (this.state.user == "provider") {
          this.setState({
            bodyView: false,
            topicsView: true,
            testsView: false,
          });
          document.getElementById("body").classList = "";
          document.getElementById("topic").classList = "active";
          document.getElementById("test").classList = "";
        }
        cookies.set("_onboarded", true, { path: "/" });
        this.setState({
          instructionIsOpen: !this.state.instructionIsOpen,
        });
        document.getElementById("agehelp").style.display = "none";
        document.getElementById("help").style.display = "none";
      } else if (
        !genders.includes(this.state.gender) ||
        !Tgenders.includes(this.state.Tgender) ||
        (!this.state.allAgesSelected && this.state.age == "")
      ) {
        document.getElementById("agehelp").style.display = "none";
        document.getElementById("help").style.display = "block";
      } else {
        document.getElementById("agehelp").style.display = "block";
        document.getElementById("help").style.display = "none";
      }
    } else {
      var genders = ["male", "female", "all_genders"];

      if (
        genders.includes(this.state.gender) &&
        ((this.state.age >= 18 && this.state.age <= 150) ||
          this.state.allAgesSelected)
      ) {
        const { cookies } = this.props;
        cookies.set("_onboarded", true, { path: "/" });
        this.setState({
          instructionIsOpen: !this.state.instructionIsOpen,
        });
        document.getElementById("help").style.display = "none";
      } else {
        document.getElementById("help").style.display = "block";
      }
    }
  };

  //top nav func
  bodyClicked = (e) => {
    //e.preventDefault();
    this.setState({
      bodyView: true,
      topicsView: false,
      testsView: false,
    });

    document.getElementById("body").classList = "active";
    document.getElementById("topic").classList = "";
    document.getElementById("test").classList = "";
    //ReactGA.pageview('body');
  };
  topicsClicked = (e) => {
    this.setState({
      bodyView: false,
      topicsView: true,
      testsView: false,
    });

    document.getElementById("body").classList = "";
    document.getElementById("topic").classList = "active";
    document.getElementById("test").classList = "";
    //ReactGA.pageview('topic');
  };
  testsClicked = (e) => {
    this.setState({
      bodyView: false,
      topicsView: false,
      testsView: true,
    });

    document.getElementById("body").classList = "";
    document.getElementById("topic").classList = "";
    document.getElementById("test").classList = "active";
    //ReactGA.pageview('test');
  };

  genderIconClicked = () => {
    this.setState({
      headerText: this.state.lang.configuration_header,
      buttonText: this.state.lang.config_modal_agree,
      instructionIsOpen: true,
    });
  };

  changeGetStartedFormID = (direction) => {
    const { cookies } = this.props;
    if (direction === "forward") {
      this.setState((prevState) => ({
        getStartedFormID: prevState.getStartedFormID + 1,
      }));
    } else if (direction === "back") {
      this.setState((prevState) => ({
        getStartedFormID: prevState.getStartedFormID - 1,
      }));
    } else if (direction === "close") {
      // Close the form when on "Details" by setting getStartedFormID to -1
      this.setState({
        instructionIsOpen: false,
      });
    }
  };

  goBack() {
    window.location.href = "./index.html"; //go back to canBeWell Logo
  }

  //Set age
  handleChange(event) {
    const { cookies } = this.props;
    if (event.target.value >= 18 && event.target.value <= 150) {
      cookies.set("age", event.target.value, { path: "/" });
    }
    this.setState({ age: event.target.value });
    //setAge(Number(event.target.value));
  }

  handleSubmit(event) {
    event.reventDefault();
  }

  //set all ages
  handleAllAgesSelected(event) {
    const { cookies } = this.props;
    cookies.set("_all_ages_selected", !this.state.allAgesSelected, {
      path: "/",
    });

    var allAges = !this.state.allAgesSelected ? "all ages" : "";
    cookies.set("age", allAges, { path: "/" });

    this.setState(
      {
        allAgesSelected: !this.state.allAgesSelected,
      },
      () => {
        this.setState({ age: allAges }); //Call back once setState is done
      }
    );
  }

  //set User
  handlePatientProviderChange(event) {
    const { cookies } = this.props;
    cookies.set("user", event.target.value, { path: "/" });
    //change disclaimer text
    if (event.target.value == "patient") {
      //document.getElementById("disclaimer").innerHTML = this.state.lang.patientDisclaimer;
      document.getElementById("genderSelector").style.display = "block";

      if (this.state.allAgesSelected) {
        const { cookies } = this.props;
        cookies.set("_all_ages_selected", !this.state.allAgesSelected, {
          path: "/",
        });
        var allAges = "";
        cookies.set("age", allAges, { path: "/" });

        this.setState(
          {
            allAgesSelected: !this.state.allAgesSelected,
          },
          () => {
            this.setState({ age: allAges }); //Call back once setState is done
          }
        );
      }
    } else if (event.target.value == "provider") {
      //document.getElementById("disclaimer").innerHTML = this.state.lang.providerDisclaimer;
      document.getElementById("genderSelector").style.display = "block";
    }
    //setPatientProvider(event.target.value);

    this.setState({
      user: event.target.value,
    });
  }

  handlePatientProviderChangeFromConfig(mEvent) {
    const { cookies } = this.props;
    cookies.set("user", mEvent.target.value, { path: "/" });

    //setPatientProvider(mEvent.target.value);
    this.setState({
      user: mEvent.target.value,
    });

    if (mEvent.target.value == "patient" && this.state.allAgesSelected) {
      const { cookies } = this.props;
      cookies.set("_all_ages_selected", !this.state.allAgesSelected, {
        path: "/",
      });
      var allAges = "";
      cookies.set("age", allAges, { path: "/" });

      this.setState(
        {
          allAgesSelected: !this.state.allAgesSelected,
        },
        () => {
          this.setState({ age: allAges }); //Call back once setState is done
        }
      );
    }
  }

  //set gender
  handleGenderChange(changeEvent) {
    const { cookies } = this.props;
    cookies.set("gender", changeEvent.target.value, { path: "/" }); //curr gender //assigned sex

    this.setState({
      gender: changeEvent.target.value,
    });
  }

  handleTransGenderChange(TchangeEvent) {
    const { cookies } = this.props;
    cookies.set("Tgender", TchangeEvent.target.value, { path: "/" });

    this.setState({
      Tgender: TchangeEvent.target.value,
    });
  }

  onChangeisEstrogen(event) {
    const { cookies } = this.props;
    cookies.set("isEstrogen", !this.state.isEstrogen, { path: "/" });

    this.setState({
      isEstrogen: !this.state.isEstrogen,
    });
  }

  onChangeisTestosterone(event) {
    const { cookies } = this.props;
    cookies.set("isTestosterone  ", !this.state.isTestosterone, { path: "/" });

    this.setState({
      isTestosterone: !this.state.isTestosterone,
    });
  }

  onChangeisBreasts(event) {
    const { cookies } = this.props;
    cookies.set("isBreasts", !this.state.isBreasts, { path: "/" });

    this.setState({
      isBreasts: !this.state.isBreasts,
    });
  }

  onChangeisVaginaCervix(event) {
    const { cookies } = this.props;
    cookies.set("isVaginaCervix", !this.state.isVaginaCervix, { path: "/" });

    this.setState({
      isVaginaCervix: !this.state.isVaginaCervix,
    });
  }

  onChangeisProstate(event) {
    const { cookies } = this.props;
    cookies.set("isProstate", !this.state.isProstate, { path: "/" });

    this.setState({
      isProstate: !this.state.isProstate,
    });
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  helpClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.config_modal_Gender_help_header,
      bodyText: this.state.lang.config_modal_Gender_help_body,
      buttonText: this.state.lang.config_modal_agree,
    });
  };
  helpClicked2 = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.config_modal_SexAtBirth_help_header,
      bodyText: this.state.lang.config_modal_SexAtBirth_help_body,
      buttonText: this.state.lang.config_modal_agree,
    });
  };

  // handle home redirect with language selection
  handleHomeRedirect() {
    // this.props.setAppLanguage();
  }
  render() {
    var userInfo = getUserInfo();
    var userInfo = {
      userID: this.state.userID,
      sessionID: this.state.sessionID,
      gender: this.state.gender,
      Tgender: this.state.Tgender,
      patient_provider: this.state.user,
      age: this.state.age,
      language: this.state.language, //TODO plese change that VERY important
      region: this.state.region,
      city: this.state.city,
      preNav: this.state.preNav,
      preCat: this.state.preCat,
      preTime: this.state.preTime,
      isEstrogen: this.state.isEstrogen,
      isTestosterone: this.state.isTestosterone,
      isBreasts: this.state.isBreasts,
      isVaginaCervix: this.state.isVaginaCervix,
      isProstate: this.state.isProstate,
      isTransgender: this.state.isTransgender,
    };

    const fixedStyle = {
      position: "fixed",
      bottom: 0,
      right: 0,
      border: 0,
    };

    var spanStyle = {
      cursor: "pointer",
      color: "#808080",
      fontSize: 30,
    };

    var allagescheckboxStyle = {
      display: "block",
      marginRight: "140px",
    };
    var fieldSelectionDiv = {
      display: "block",
    };

    // The gray background
    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: "10px",
    };

    // The modal "window"
    const myModalStyle = {
      backgroundColor: "#fff",
      maxWidth: "99%",
      minHeight: "95%",
      margin: "0 auto",
      textAlign: "center",
      padding: 10,
      fontSize: "20px",
      overflow: "hidden scroll",
    };

    // The modal "window"
    const myDisclaimerStyle = {
      height: "60vh",
      margin: "0 auto",
      textAlign: "left",
      padding: 10,
      overflowY: "scroll",
      overflowX: "hidden",
      background: "#f2f2f2",
      fontSize: "16px",
      fontWeight: "12px",
    };
    const termsofUseLabel = {
      color: "#fff",
      fontFamily: "'Lato', 'Source Sans Pro', sans-serif",
      fontSize: "2rem",
      fontWeight: "bold",
    };
    const termsOfUseText = {
      fontFamily: "Calibri Light, sans-serif",
    };
    const termsOfUseHead = {
      fontSize: "14pt",
      lineHeight: "115%",
      fontFamily: "Calibri Light, sans-serif",
      fontWeight: "bold",
      margin: "10px 0",
      color: "#1b55a4",
    };

    const genderCss = {
      textAlign: "left",
      fontWeight: "400",
    };

    const titleCSS = {
      textAlign: "center",
      marginLeft: "12%",
    };
    const underlineTextTermsOfUse = {
      textDecoration: "underline",
      fontWeight: "400",
    };
    const termOfUseCss = {
      marginLeft: "40%",
    };

    if (this.state.user == "patient") {
      allagescheckboxStyle.display = "none";
    } else if (this.state.user == "provider") {
      allagescheckboxStyle.display = "block";
    }

    if (this.state.isTransgender) {
      if (
        this.state.gender === "nonbinary" ||
        this.state.gender === "transgender"
      ) {
        fieldSelectionDiv.display = "block";
      } else {
        fieldSelectionDiv.display = "none";
      }
    }

    var instructionModal = []; //first choose box/page
    var configurationModal = []; // top left choose which appears on main body page

    const ages = Array.from({ length: 133 }, (_, index) => index + 18);

    //Applying the isTransgender flag for first pop up choose box
    console.log("print::::", isTransgender);
    if (this.state.isTransgender) {
      //Transgender choose box
      if (this.state.getStartedFormID === 0) {
        if (this.state.instructionIsOpen) {
          //Transgender Instruction modal
          instructionModal = [
            <div key="1" className="backdrop" style={backdropStyle}>
              <div
                className="myModal"
                // style={myModalStyle}
                test-id="instructionModalRoot"
              >
                <div className="instructionModalCss">
                  <div
                    className="row m-0 d-flex align-items-center"
                    style={{
                      background:
                        "linear-gradient(to right, #1b55a4 1%, #1b63b0 46%, #1a7ec6 87%)",
                      padding: "30px",
                    }}
                  >
                    <div className="col-2 p-0 text-left" id="termsButton">
                      <FaArrowLeft
                        size={24}
                        className="icon-brand-color"
                        onClick={this.props.setAppLanguage}
                      />
                    </div>

                    <div
                      className="col-8 text-center"
                      style={termsofUseLabel}
                      test-id="termOfUseLabel"
                    >
                      {this.state.lang.disclaimer_header}
                    </div>

                    <div className="col-2"></div>
                  </div>

                  <div
                    className="termsOfUse"
                    style={{ "line-height": "normal" }}
                  >
                    <div style={myDisclaimerStyle} test-id="termOfUseContent">
                      <div>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.disclaimerBeforeTermsOfUse
                            ),
                          }}
                        ></div>
                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.accpetanceheading}
                        </div>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.acceptanceInitialStatement
                            ),
                          }}
                        ></div>
                        <p></p>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.acceptanceAgreeStatement
                            ),
                          }}
                        ></div>
                        <p></p>
                        <div style={termsOfUseText}>
                          {this.state.lang.acceptanceText}
                        </div>
                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.modificationHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.modificationText1}
                        </div>
                        <p></p>
                        <div style={termsOfUseText}>
                          {this.state.lang.modificationText2}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.websiteContentSpecificationHeading}
                        </div>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.websiteContentSpecificationText
                            ),
                          }}
                        ></div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.websiteSecurityHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.websiteSecurityText1}
                        </div>
                        <p></p>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.websiteSecurityText2
                            ),
                          }}
                        ></div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.rightsAndOwnershipHeading}
                        </div>
                        <div style={termsOfUseText}>
                          <div>{this.state.lang.rightsAndOwnershipText1}</div>
                          <p></p>
                          <div>{this.state.lang.rightsAndOwnershipText2}</div>
                          <p></p>
                          <div>{this.state.lang.rightsAndOwnershipText3}</div>
                          <p></p>
                          <div>{this.state.lang.rightsAndOwnershipText4}</div>
                          <p></p>
                          <div>{this.state.lang.rightsAndOwnershipText5}</div>
                          <p></p>
                          <div>{this.state.lang.rightsAndOwnershipText6}</div>
                          <p></p>
                          <div>{this.state.lang.rightsAndOwnershipText7}</div>
                        </div>
                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.conditionsHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.conditionsText}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.legalActionsHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.legalActionsText}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.cookiesHeading}
                        </div>
                        <p></p>
                        <div style={termsOfUseText}>
                          {this.state.lang.cookiesText}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.thirdPartyWebHeading}
                        </div>
                        <p></p>
                        <div style={termsOfUseText}>
                          {this.state.lang.thirdPartyWebText}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.geographicRestricationsHeading}
                        </div>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.geographicRestricationsText
                            ),
                          }}
                        ></div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.noRelianceHeading}
                        </div>
                        <div style={termsOfUseText}>
                          <div>{this.state.lang.noRelianceText1}</div>
                          <p></p>
                          <div>{this.state.lang.noRelianceText2}</div>
                          <p></p>
                          <div>{this.state.lang.noRelianceText3}</div>
                        </div>
                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.disclaimerWarrantiesHeading}
                        </div>
                        <div
                          style={termsOfUseText}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              this.state.lang.disclaimerWarrantiesText1
                            ),
                          }}
                        ></div>
                        <p></p>
                        <div style={termsOfUseText}>
                          {this.state.lang.disclaimerWarrantiesText2}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.limitationHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.limitationText}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.indemnificationHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.indemnificationText}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.lawAndJurisdictionHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.lawAndJurisdictionText1}
                        </div>
                        <p></p>
                        <div style={termsOfUseText}>
                          {this.state.lang.lawAndJurisdictionText2}
                        </div>

                        <div
                          className="underlineTextTermsOfUse"
                          style={termsOfUseHead}
                        >
                          {this.state.lang.entireAgreementHeading}
                        </div>
                        <div style={termsOfUseText}>
                          {this.state.lang.entireAgreementText}
                        </div>
                        <p></p>
                        <div
                          style={{
                            termsOfUseHead,
                            color: "#1b55a4",
                            fontSize: "10pt",
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.lang.dateofAgreement}
                        </div>
                      </div>
                    </div>
                    <br />
                    <Button
                      variant="secondary"
                      test-id="okButtonBottom"
                      id="agree"
                      onClick={() => this.changeGetStartedFormID("forward")}
                    >
                      {this.state.lang.agree}
                    </Button>
                  </div>
                </div>
              </div>
            </div>,
          ];
        }
      } else {
        if (this.state.instructionIsOpen) {
          //Transgender Instruction modal
          instructionModal = [
            <div key="1" className="backdrop" style={backdropStyle}>
              <div
                className="myModal"
                // style={myModalStyle}
                test-id="instructionModalRoot"
              >
                <div className="instructionModalCss">
                  <div className="row m-0 d-flex align-items-center">
                    <div className="col-1 p-0 text-left">
                      <FaArrowLeft
                        size={24}
                        className="icon-brand-color"
                        onClick={
                          this.props.cookies.get("_onboarded")
                            ? () => this.changeGetStartedFormID("close")
                            : () => this.changeGetStartedFormID("back")
                        }
                      />
                    </div>
                    <div
                      className="col-11 p-0 text-center"
                      style={{
                        // fontFamily: "Inter",
                        fontSize: "17px",
                        fontWeight: "700",
                        lineHeight: "29px",
                        letterSpacing: "0em",
                        textAlign: "left",
                      }}
                      test-id="header"
                    >
                      {this.state.lang.instruction_modal_header}
                    </div>
                  </div>
                  <div className="content">
                    <div
                      style={{
                        "font-family": "Inter",
                        "font-size": "14px",
                        "font-weight": "400",
                        "line-height": "20px",
                        "letter-spacing": "0em",
                        "text-align": "left",
                        "margin-bottom": "1rem",
                      }}
                    >
                      {this.state.lang.header_description}
                    </div>

                    {/*select age*/}
                    <div>
                      <form test-id="ageForm">
                        <div>
                          {this.state.lang.age_selector}
                          <select
                            id="abc"
                            name="age"
                            test-id="ageInput"
                            value={this.state.age}
                            onChange={this.handleChange}
                          >
                            {ages.map((age, i) => (
                              <option key={i} value={age}>
                                {age}
                              </option>
                            ))}
                          </select>
                          <label
                            style={allagescheckboxStyle}
                            test-id="allAgeCheckboxLabel"
                          >
                            <input
                              id="myCheck"
                              test-id="allAgeCheckbox"
                              type="checkbox"
                              checked={this.state.allAgesSelected}
                              onChange={this.handleAllAgesSelected}
                            />
                            {this.state.lang.all_ages}
                          </label>
                        </div>
                      </form>
                    </div>
                    {/*select gender*/}
                    <div>
                      <div
                        id="genderSelector"
                        className="radio"
                        test-id="genderSelectRoot"
                      >
                        <div>
                          {this.state.lang.gender_selector}
                          {/* this is the original button, works fine 
                        but i have applied css zindex and positioned it over other div which is trick that doesnt aligns with screen size */}
                          {/* this button is crack takes me to the landing page */}
                          <button
                            test-id="genderSelectHelp"
                            className="button button23"
                            onClick={this.helpClicked}
                          >
                            ?
                          </button>
                        </div>
                        <div className="radio-flex-container">
                          <label id="male_radio" test-id="maleRadioLabel">
                            <input
                              type="radio"
                              test-id="maleRadio"
                              value="male"
                              checked={this.state.gender === "male"}
                              onChange={this.handleGenderChange}
                            />
                            {this.state.lang.male}
                          </label>

                          <label id="female_radio" test-id="femaleRadioLabel">
                            <input
                              test-id="femaleRadio"
                              type="radio"
                              value="female"
                              checked={this.state.gender === "female"}
                              onChange={this.handleGenderChange}
                            />
                            {this.state.lang.female}
                          </label>

                          <label id="nb_radio" test-id="nonBinaryRadioLabel">
                            <input
                              test-id="nonBinaryRadio"
                              type="radio"
                              value="nonbinary"
                              checked={this.state.gender === "nonbinary"}
                              onChange={this.handleGenderChange}
                            />
                            {this.state.lang.nonbinary}
                          </label>
                        </div>
                      </div>
                      {/* {Are you a Transgender} */}
                      <div
                        id="TgenderSelector"
                        className="radio"
                        test-id="tGenderSelectRoot"
                      >
                        <div className="Tgender_mod">
                          <strong> {this.state.lang.Tgender_selector}</strong>
                          <button
                            test-id="tGenderSelectHelp"
                            className="button button24"
                            onClick={this.helpClicked2}
                          >
                            ?
                          </button>
                        </div>
                        <div className="radio-flex-container">
                          <label id="birth_male_mod" test-id="birthMaleLabel">
                            <input
                              type="radio"
                              test-id="birthMale"
                              value="tf"
                              checked={this.state.Tgender === "tf"}
                              onChange={this.handleTransGenderChange}
                            />
                            {this.state.lang.tf}
                          </label>

                          <label
                            id="female_male_mod"
                            test-id="birthfemaleLabel"
                          >
                            <input
                              test-id="birthFemale"
                              type="radio"
                              value="tm"
                              checked={this.state.Tgender === "tm"}
                              onChange={this.handleTransGenderChange}
                            />
                            {this.state.lang.tm}
                          </label>
                        </div>
                      </div>
                      <label
                        id="help"
                        className="checkAge"
                        test-id="noValueError"
                      >
                        <h5>{this.state.lang.ageandgender_help}</h5>
                      </label>
                      <label
                        id="agehelp"
                        className="checkAge"
                        test-id="ageError"
                      >
                        <h5>{this.state.lang.age_help}</h5>
                      </label>
                      {/*Field selection based on gender*/}
                      {/*select user*/}
                      <div className="radio">
                        <form test-id="userForm">
                          <p id="user_mod">{this.state.lang.user_selector}</p>
                          <div className="radio-flex-container">
                            <label id="pat_mod" test-id="patientLabel">
                              <input
                                type="radio"
                                test-id="patientRadio"
                                value="patient"
                                checked={this.state.user === "patient"}
                                onChange={this.handlePatientProviderChange}
                              />
                              {this.state.lang.patient}
                            </label>

                            <label id="prov_mod" test-id="providerLabel">
                              <input
                                type="radio"
                                test-id="providerRadio"
                                value="provider"
                                checked={this.state.user === "provider"}
                                onChange={this.handlePatientProviderChange}
                              />
                              {this.state.lang.provider}
                            </label>
                          </div>
                        </form>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="secondary"
                          test-id="okButtonBottom"
                          id="agree"
                          onClick={() => {
                            this.setState({ getStartedFormID: 2 });
                            this.toggleIntrutionModal();
                          }}
                        >
                          {this.state.lang.config_modal_agree}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
          ];
        }
      }
    }

    return (
      <div test-info-locale={this.state.language}>
        {/*this is your header tab*/}
        <div className="topnav">
          <h3>
            <a id="body" test-id="body" onClick={this.bodyClicked}>
              {this.state.lang.top_nav_body}
            </a>
            <a id="topic" test-id="topic" onClick={this.topicsClicked}>
              {this.state.lang.top_nav_topics}
            </a>
            <a id="test" test-id="test" onClick={this.testsClicked}>
              {this.state.lang.top_nav_tests}
            </a>
          </h3>
        </div>

        <div className="my-4 mx-2 mx-md-3 mx-lg-4 d-flex justify-content-between">
          {/*display user's info*/}

          <div>
            <FaHome
              size={window.innerWidth < 768 ? 32 : 40}
              className="icon-brand-color"
              onClick={this.props.setAppLanguage}
            />
          </div>
          <div>
            <Button
              variant="secondary"
              size="lg"
              onClick={this.genderIconClicked}
              test-id="postConfigUpdateModalOpenButton"
            >
              <IoIosSettings className="font-icon mb-1" />{" "}
              {[
                this.state.gender == "male" && this.state.Tgender == "tf"
                  ? this.state.lang[this.state.gender]
                  : this.state.gender == "female" && this.state.Tgender == "tm"
                  ? this.state.lang[this.state.gender]
                  : !this.state.isTransgender &&
                    (this.state.gender == "male" ||
                      this.state.gender == "female")
                  ? this.state.lang[this.state.gender]
                  : this.state.language == "french" &&
                    this.state.gender == "male" &&
                    this.state.Tgender == "tm"
                  ? "Transmasculin"
                  : this.state.language == "french" &&
                    this.state.gender == "female" &&
                    this.state.Tgender == "tf"
                  ? "Transféminine"
                  : this.state.gender == "male" && this.state.Tgender == "tm"
                  ? "Transmasculine"
                  : this.state.gender == "female" && this.state.Tgender == "tf"
                  ? "Transfeminine"
                  : this.state.gender == "nonbinary"
                  ? this.state.lang[this.state.gender]
                  : this.state.Tgender,
              ]}{" "}
              {this.state.age == "all ages"
                ? this.state.lang.all_ages
                : this.state.age}
            </Button>
          </div>
          <p
            className="font-weight-bold font-size-xl feedback"
            // href={this.state.language === "french" ? frenchForm : englishForm}
            // target="_blank"
            style={{ fontSize: "1.7em" }}
            rel="noopener"
            test-id="update-banner-en-video"
            onClick={this.feedbackHandle}
          >
            {this.state.lang.feedback}
          </p>
        </div>

        <DialogBox
          open={this.state.feedbackDialog}
          setOpen={this.handleFeedBackToggle}
          title={this.state.lang.feedback_dialog_title}
          cancelButtonText={this.state.lang.cancel_feedback}
          agreeButtonText={this.state.lang.agree_feedback}
          textComponent={
            this.state.language === "french" ? (
              <FeedbackDialogFr />
            ) : (
              <FeedbackDialogEn />
            )
          }
        />

        <div>
          {this.state.configurationIsOpen && (
            <MyBody
              showBody={this.state.bodyView}
              userConfig={userInfo}
              getText={this.state.data.getTopic}
              lang={this.state.lang}
              isTransgender={this.state.isTransgender}
              pageViewStateUpdater={this.pageViewStateUpdater}
            ></MyBody>
          )}

          {!this.state.configurationIsOpen && (
            <MyBody
              showBody={this.state.bodyView}
              userConfig={userInfo}
              getText={this.state.data.getTopic}
              lang={this.state.lang}
              isTransgender={this.state.isTransgender}
              pageViewStateUpdater={this.pageViewStateUpdater}
            ></MyBody>
          )}

          <Tests
            showTests={this.state.testsView}
            userConfig={userInfo}
            data={this.state.data.getListOfTests}
            lang={this.state.lang}
            pageViewStateUpdater={this.pageViewStateUpdater}
          ></Tests>
          <Topics
            showTopics={this.state.topicsView}
            userConfig={userInfo}
            data={this.state.data.getListOfTopics}
            newdata={this.state.data.getListOfFilteredTopics}
            lang={this.state.lang}
            pageViewStateUpdater={this.pageViewStateUpdater}
            onClose={this.toggleModal}
            button={this.state.buttonText}
            language={userInfo.language}
          ></Topics>
        </div>

        <div>{instructionModal}</div>

        <MyModal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          header={this.state.headerText}
          body={this.state.bodyText}
          button={this.state.buttonText}
          lang={this.state.lang}
        ></MyModal>
      </div>
    );
  }
}
export default withCookies(App);
