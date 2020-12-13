import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import ReactGA from "react-ga";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {Button, ButtonToolbar} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify'

import Lang from './Lang/Lang.json';
import './App.css';
import './Button.css';
import './Style/checkbox.css';
import './Style/Modal.css';
import MyModal from './MyModal';
import SideBar from './sideBar';
import Data from './Data.js';
//import InstructionModal from './InstructionModal.js';
import MyBody from './Body/Body.js';
import Tests from './Tests/Tests.js';
import Topics from './Topics/Topics.js';
import IconGender from './listicon.png';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
//import {setGender} from './UserInfo';
//import {setPatientProvider} from './UserInfo';
//import {setAge} from './UserInfo';
import {getUserInfo} from './UserInfo';


class App extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    var userInfo = {
      userID: null,
      sessionID:null,
      gender: null,
      patient_provider: null,
      age: null,
      language: null,
      region: null,
      city: null,
      preNav: null,
      preCat: null,
      preTime: null
    }; // =getUserInfo();
    let DataToDisplay = new Data(this.props.appLanguage);
    var app_language = this.props.appLanguage;


    this.state = {
      userID: cookies.get('userID'),
      sessionID: cookies.get('sessionID'),
      isOpen: false,
      configurationIsOpen: false, //used to be isOpen
      bodyView: true,
      topicsView: false,
      testsView: false,
      language: app_language,
      lang: (typeof userInfo.language == "string") ? Lang[userInfo.language] : Lang[app_language],
      data: DataToDisplay,
      //use cookie here
      firstTime: true,
      onboarded: cookies.get('_onboarded'),
      instructionIsOpen: (cookies.get('_onboarded') == "true") ? false : true,
      age: cookies.get('age'),
      allAgesSelectedCookie: cookies.get('_all_ages_selected'), //a string for some reason
      allAgesSelected: (cookies.get('_all_ages_selected') == "true") ? true : false,
      user: cookies.get('user') || 'patient',
      gender: cookies.get('gender'),
      region: null,
      city: null,
      preNav: null,
      preCat: null,
      userID: null,
      preTime: null
      //allowToClose: false, //obselete! we use to make the user agree before they could press agree
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePatientProviderChange = this.handlePatientProviderChange.bind(this);
    this.handlePatientProviderChangeFromConfig = this.handlePatientProviderChangeFromConfig.bind(this);
    this.handleAllAgesSelected = this.handleAllAgesSelected.bind(this);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }

  componentDidMount() {
    document.getElementById("body").classList = 'active';
    try {
      if (this.state.user == "patient") {
        //document.getElementById("disclaimer").innerHTML = this.state.lang.patientDisclaimer;
        document.getElementById("genderSelector").style.display = "block";
      }
      else if (this.state.user == "provider") {
        //document.getElementById("disclaimer").innerHTML = this.state.lang.providerDisclaimer;
        document.getElementById("genderSelector").style.display = "block";
      }
    } catch (err) { }

    /// The following steps is to get clientID from google analytics and save it to cookies
    const { cookies } = this.props;
    var clientId = null;
    ReactGA.ga(
      function (tracker) {
        clientId = tracker.get('clientId');
      }
    );
    if( !cookies.get('userID') ) 
    {
      cookies.set('userID', clientId, { path: "/" });
    }
      
    console.log('userid:',cookies.get('userID'))

    if( !cookies.get('sessionID') ) 
    {
        cookies.set('sessionID', uuidv4().toString(), { path: "/" });
    }
    console.log('sessionid:',cookies.get('sessionID'))
    //setstate()
    this.setState({
      userID:cookies.get('userID'),
      sessionID:cookies.get('sessionID')
    });
    //count a pageview of body 
    //ReactGA.pageview('body');

    /* navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }); */

    window.fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data.city,
          region: data.region,
        });
      }
      );
  }

  pageViewStateUpdater = ( nav, cat, time ) => {
    console.log(cat+"app.js callback");
    this.setState({
      preNav: nav,
      preCat: cat,
      preTime: time,
    });
  }

  //toggle the config modif
  toggleConfigurationModal = () => {
    var genders = ["male", "female", "all_genders"];
    if (genders.includes(this.state.gender) && ((this.state.age >= 18 && this.state.age <= 150) || this.state.allAgesSelected)) {
      this.setState({
        configurationIsOpen: !this.state.configurationIsOpen
      });
      document.getElementById("config_help").style.display = "none";
    }
    else {
      document.getElementById("config_help").style.display = "block";
    }
  }

  toggleIntrutionModal = () => {
    //if(this.state.allowToClose){
    var genders = ["male", "female", "all_genders"];

    if (genders.includes(this.state.gender) && ((this.state.age >= 18 && this.state.age <= 150) || this.state.allAgesSelected)) {
      const { cookies } = this.props;
      cookies.set('_onboarded', true, { path: '/' });
      this.setState({
        instructionIsOpen: !this.state.instructionIsOpen
      });
      document.getElementById("help").style.display = "none";
    }
    else {
      document.getElementById("help").style.display = "block";
    }
    //}
  }

  /*togglePermission = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        allowToClose: !this.state.allowToClose
      });
  }*/

  /*selectLanguage = (userLang) => {
    this.setState({ //async function
      lang: Lang[userLang]
    });
  }*/

  //top nav func
  bodyClicked = (e) => {
    //e.preventDefault();
    this.setState({
      bodyView: true,
      topicsView: false,
      testsView: false
    });

    document.getElementById("body").classList = 'active';
    document.getElementById("topic").classList = '';
    document.getElementById("test").classList = '';
    //ReactGA.pageview('body');
  }
  topicsClicked = (e) => {
    this.setState({
      bodyView: false,
      topicsView: true,
      testsView: false
    });

    document.getElementById("body").classList = '';
    document.getElementById("topic").classList = 'active';
    document.getElementById("test").classList = '';
    //ReactGA.pageview('topic');
  }
  testsClicked = (e) => {
    this.setState({
      bodyView: false,
      topicsView: false,
      testsView: true
    });

    document.getElementById("body").classList = '';
    document.getElementById("topic").classList = '';
    document.getElementById("test").classList = 'active';
    //ReactGA.pageview('test');
  }

  genderIconClicked = () => {
    this.setState({
      configurationIsOpen: !this.state.configurationIsOpen,
      headerText: this.state.lang.configuration_header,
      buttonText: this.state.lang.config_modal_agree
    });
    //Remove bouncing animation once clicked
    /* if (document.getElementById("genderIcon").classList.contains('drop-down')) {
      document.getElementById("genderIcon").classList.remove('drop-down');
    } */
  }

  goBack() {
    window.location.href = './index.html'; //go back to canBeWell Logo
  }

  //Set age
  handleChange(event) {
    const { cookies } = this.props;
    cookies.set('age', event.target.value, { path: '/' });
    this.setState({ age: event.target.value });
    //setAge(Number(event.target.value));
  }

  //set all ages
  handleAllAgesSelected(event) {
    const { cookies } = this.props;
    cookies.set('_all_ages_selected', !this.state.allAgesSelected, { path: '/' });

    var allAges = !this.state.allAgesSelected ? "all ages" : "";
    cookies.set('age', allAges, { path: '/' });

    this.setState({
      allAgesSelected: (!this.state.allAgesSelected)
    }, () => {
      this.setState({ age: allAges }); //Call back once setState is done
      /*if(this.state.allAgesSelected){
        document.getElementById('myCheck').style.backgroundColor = "#CCCCCC";
      }else{
        document.getElementById('myCheck').style.backgroundColor = "#FFFFFF";
      }*/
    });
  }

  //set User
  handlePatientProviderChange(event) {
    const { cookies } = this.props;
    cookies.set('user', event.target.value, { path: '/' });
    //change disclaimer text
    if (event.target.value == "patient") {
      //document.getElementById("disclaimer").innerHTML = this.state.lang.patientDisclaimer;
      document.getElementById("genderSelector").style.display = "block";

      if (this.state.allAgesSelected) {
        const { cookies } = this.props;
        cookies.set('_all_ages_selected', !this.state.allAgesSelected, { path: '/' });
        var allAges = "";
        cookies.set('age', allAges, { path: '/' });

        this.setState({
          allAgesSelected: (!this.state.allAgesSelected)
        }, () => {
          this.setState({ age: allAges }); //Call back once setState is done
        });
      }
    }
    else if (event.target.value == "provider") {
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
    cookies.set('user', mEvent.target.value, { path: '/' });

    //setPatientProvider(mEvent.target.value);
    this.setState({
      user: mEvent.target.value
    });

    if (mEvent.target.value == "patient" && this.state.allAgesSelected) {

      const { cookies } = this.props;
      cookies.set('_all_ages_selected', !this.state.allAgesSelected, { path: '/' });
      var allAges = "";
      cookies.set('age', allAges, { path: '/' });

      this.setState({
        allAgesSelected: (!this.state.allAgesSelected)
      }, () => {
        this.setState({ age: allAges }); //Call back once setState is done
      });
    }

  }

  //set gender
  handleGenderChange(changeEvent) {

    const { cookies } = this.props;
    cookies.set('gender', changeEvent.target.value, { path: '/' });
    //setGender(changeEvent.target.value);
    this.setState({
      gender: changeEvent.target.value
    });

  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //sideBar func - Temporary commented June 2020
  /*
  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  }

  suggestedAppsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_suggested_apps,
      bodyText: this.state.lang.side_nav_suggested_apps,
      buttonText: this.state.lang.config_modal_agree
    });
  }
  calculatorsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_calculators,
      bodyText: this.state.lang.side_nav_calculators,
      buttonText: this.state.lang.config_modal_agree
    });
  }
  disclaimerClicked = () => {

    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_disclaimer,
      bodyText: this.state.user === "patient" ? this.state.lang.privacypolicy + this.state.lang.disclaimer + this.state.lang.patientDisclaimer + this.state.lang.important : this.state.lang.privacypolicy + this.state.lang.disclaimer + this.state.lang.providerDisclaimer + this.state.lang.important,
      buttonText: this.state.lang.config_modal_agree
    });
  }
  aboutClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_about,
      bodyText: this.state.lang.about,
      buttonText: this.state.lang.config_modal_agree
    });
  }
  settingsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.state.lang.side_nav_settings,
      bodyText: this.state.lang.side_nav_settings,
      buttonText: this.state.lang.config_modal_agree
    });
  }
  */

  render() {
    var userInfo = getUserInfo();
    var userInfo = {
      userID: this.state.userID,
      sessionID: this.state.sessionID,
      gender: this.state.gender,
      patient_provider: this.state.user,
      age: this.state.age,
      language: this.state.language, //TODO plese change that VERY important
      region: this.state.region,
      city: this.state.city,
      preNav: this.state.preNav,
      preCat: this.state.preCat,
      preTime: this.state.preTime
    };

    const fixedStyle = {
      position: 'fixed',
      bottom: 0,
      right: 0,
      border: 0
    };

    var spanStyle = {
      cursor: 'pointer',
      color: '#808080',
      fontSize: 30
    };


    var allagescheckboxStyle = {
      display: 'block',
    };

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: '10px'
    };

    // The modal "window"
    const myModalStyle = {
      backgroundColor: '#fff',
      maxWidth: '99%',
      minHeight: '95%',
      margin: '0 auto',
      textAlign: 'center',
      padding: 10,
      fontSize: '20px',
      overflow: 'scroll',
    };

    // The modal "window"
    const myDisclaimerStyle = {
      maxWidth: '90%',
      maxHeight: '250px',
      margin: '0 auto',
      textAlign: 'left',
      padding: 10,
      overflowY: 'scroll',
      overflowX: 'hidden',
      background: '#f2f2f2',
      fontSize: '18px',
      fontWeight:'12px',
    };
    const termsOfUseStyle={
      'margin-top':'10px'
    };
    const underlineTextTermsOfUse={
      'text-decoration': 'underline',
      'font-weight': '400'
    }

    if (this.state.user == "patient") {
      allagescheckboxStyle.display = "none";
    }
    else if (this.state.user == "provider") {
      allagescheckboxStyle.display = "block";
    }

    var instructionModal = [];
    var configurationModal = [];

    if (this.state.instructionIsOpen) {
      instructionModal = [
        <div key="1" className="backdrop" style={backdropStyle}>
          <div className="myModal" style={myModalStyle}>

            <div className="footer">
              <p>{this.state.lang.instruction_modal_header}</p>

              {/*select user*/}
              <div className="radio">
                <form>
                  {this.state.lang.user_selector}
                  <label >
                    <input type="radio" value="patient" checked={this.state.user === 'patient'} onChange={this.handlePatientProviderChange} />
                    {this.state.lang.patient}
                  </label>
                  <label>
                    <input type="radio" value="provider" checked={this.state.user === 'provider'} onChange={this.handlePatientProviderChange} />
                    {this.state.lang.provider}
                  </label>
                </form>
              </div>
              {/*select gender*/}
              <div>
                <form>
                  <div id="genderSelector" className="radio">
                    {this.state.lang.gender_selector}
                    <label>
                      <input type="radio" value="male" checked={this.state.gender == 'male'} onChange={this.handleGenderChange} />
                      {this.state.lang.male}
                    </label>
                    <label>
                      <input type="radio" value="female" checked={this.state.gender == 'female'} onChange={this.handleGenderChange} />
                      {this.state.lang.female}
                    </label>
                    {/*this.state.user === 'provider' || null ?
                      (<label>
                        <input type="radio" value="all_genders" checked={this.state.gender == 'all_genders'} onChange={this.handleGenderChange} />
                          {this.state.lang.all_genders}
                      </label>) : (<label></label>)
                    */}
                  </div>
                </form>
              </div>
              {/*select age*/}
              <div>
                <form>
                  <div>
                    {this.state.lang.age_selector}
                    <input id='abc' type="text" value={this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age} onChange={this.handleChange} disabled={this.state.allAgesSelected} placeholder={this.state.lang.age_selector_place_holder} onKeyPress={e => { if (e.key === 'Enter') e.preventDefault();}} />
                    <label style={allagescheckboxStyle}>
                      <input id='myCheck' type="checkbox" checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected} />{this.state.lang.all_ages}
                    </label>
                    <label id="help" className="checkAge">
                      <h5>{this.state.lang.age_help}</h5>
                    </label>
                  </div>
                </form>
              </div>

              <div className="termsOfUse" style={termsOfUseStyle}>
              <b>{this.state.lang.disclaimer_header}</b>

              <div style={myDisclaimerStyle}>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.accpetanceheading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.acceptanceInitialStatement)}}></div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.acceptanceAgreeStatement)}}></div>
                            <div>{this.state.lang.acceptanceText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.modificationHeading}</div>
                            <div>{this.state.lang.modificationText1}</div>
                            <div>{this.state.lang.modificationText2}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.websiteContentSpecificationHeading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.websiteContentSpecificationText)}}></div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.websiteSecurityHeading}</div>
                            <div>{this.state.lang.websiteSecurityText1}</div>
                            <div>{this.state.lang.websiteSecurityText2}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.rightsAndOwnershipHeading}</div>
                            <div>{this.state.lang.rightsAndOwnershipText1}</div>
                            <div>{this.state.lang.rightsAndOwnershipText2}</div>
                            <div>{this.state.lang.rightsAndOwnershipText3}</div>
                            <div>{this.state.lang.rightsAndOwnershipText4}</div>
                            <div>{this.state.lang.rightsAndOwnershipText5}</div>
                            <div>{this.state.lang.rightsAndOwnershipText6}</div>
                            <div>{this.state.lang.rightsAndOwnershipText7}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.conditionsHeading}</div>
                            <div>{this.state.lang.conditionsText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.legalActionsHeading}</div>
                            <div>{this.state.lang.legalActionsText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.cookiesHeading}</div>
                            <div>{this.state.lang.cookiesText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.thirdPartyWebHeading}</div>
                            <div>{this.state.lang.thirdPartyWebText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.geographicRestricationsHeading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.geographicRestricationsText)}}></div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.noRelianceHeading}</div>
                            <div>{this.state.lang.noRelianceText1}</div>
                            <div>{this.state.lang.noRelianceText2}</div>
                            <div>{this.state.lang.noRelianceText3}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.disclaimerWarrantiesHeading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.disclaimerWarrantiesText1)}}></div>
                            <div>{this.state.lang.disclaimerWarrantiesText2}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.limitationHeading}</div>
                            <div>{this.state.lang.limitationText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.indemnificationHeading}</div>
                            <div>{this.state.lang.indemnificationText}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.lawAndJurisdictionHeading}</div>
                            <div>{this.state.lang.lawAndJurisdictionText1}</div>
                            <div>{this.state.lang.lawAndJurisdictionText2}</div>
                        </p>
                        <p>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.entireAgreementHeading}</div>
                            <div>{this.state.lang.entireAgreementText}</div>
                        </p>
                        <p>
                            <div>{this.state.lang.dateofAgreement}</div>
                        </p>
              </div>             
              </div> 
              <div>
                <button id="agree" className="buttonAgreeToTerms" onClick={this.toggleIntrutionModal}>{this.state.lang.agree}</button>
                {/* <button onClick={this.goBack} type="button">{this.state.lang.disagree}</button> */}
              </div>
            </div>
            </div>
        </div>
      ];
    } else {
      instructionModal = [null];
    }

    if (this.state.configurationIsOpen == true) {
      configurationModal = [
        <div key="2" className="backdrop" >
          <div className="myModal">

            <div>

              <h1>{this.state.lang.configuration_header}</h1>
              <div className="myModalBody">
                <div className="radio">
                  <form>
                    {this.state.lang.user_selector}
                    <label>
                      <input type="radio" value="patient" checked={this.state.user === 'patient'} onChange={this.handlePatientProviderChangeFromConfig} />
                      {this.state.lang.patient}
                    </label>
                    <label>
                      <input type="radio" value="provider" checked={this.state.user === 'provider'} onChange={this.handlePatientProviderChangeFromConfig} />
                      {this.state.lang.provider}
                    </label>
                  </form>
                </div>

                <div>
                  <form>
                    <div id="genderSelector" className="radio">
                      {this.state.lang.gender_selector}
                      <label>
                        <input type="radio" value="male" checked={this.state.gender == 'male'} onChange={this.handleGenderChange} />
                        {this.state.lang.male}
                      </label>

                      <label>
                        <input type="radio" value="female" checked={this.state.gender == 'female'} onChange={this.handleGenderChange} />
                        {this.state.lang.female}
                      </label>

                      {/*this.state.user === 'provider' || null ?
                      (<label>
                        <input type="radio" value="all_genders" checked={this.state.gender == 'all_genders'} onChange={this.handleGenderChange} />
                          {this.state.lang.all_genders}
                      </label>) : (<label></label>)
                      */}

                    </div>
                  </form>
                </div>
                {/*select age*/}
                <div >
                  <form>
                    <div>
                      {this.state.lang.age_selector}
                      <input id='abc' type="text" value={this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age} onChange={this.handleChange} disabled={this.state.allAgesSelected} placeholder={this.state.lang.age_selector_place_holder} onKeyPress={e => { if (e.key === 'Enter') e.preventDefault();}} />
                      <label style={allagescheckboxStyle}>
                        <input id='check' type="checkbox" checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected} />{this.state.lang.all_ages}
                      </label>
                      <label id="config_help" className="checkAge">
                        <h5>{this.state.lang.age_help}</h5>
                      </label>
                    </div>
                  </form>
                </div>
                {/*close button*/}
                <div className="myModalButton">
                  <button onClick={this.toggleConfigurationModal}>{this.state.lang.config_modal_agree}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ];
    } else {
      configurationModal = [null];
    }

    return (
      <div>

        {/*<SideBar lang={this.state.lang}></SideBar>*/} {/*TODO must fix this modal in the back ground*/}
        {/* Black Sidebar on the main page - Commented June 2020 }
        <div>
          <div id="mySidenav" className="sidenav">
            <a className="closebtn" onClick={this.closeNav}>&times;</a>
            <a onClick={this.suggestedAppsClicked}>{this.state.lang.side_nav_suggested_apps}</a>
            <a onClick={this.calculatorsClicked}>{this.state.lang.side_nav_calculators}</a>
            <a onClick={this.disclaimerClicked}>{this.state.lang.side_nav_disclaimer}</a>
            <a onClick={this.aboutClicked}>{this.state.lang.side_nav_about}</a>
            <a onClick={this.settingsClicked}>{this.state.lang.side_nav_settings}</a>
          </div>
          <div className="header" style={spanStyle}>
            <span onClick={this.openNav}> &#9776;</span>
          </div>
    </div> */}

        {/*this is your header tab*/}
        <div className="topnav">
          <h3>
            <a id="body" onClick={this.bodyClicked}>{this.state.lang.top_nav_body}</a>
            <a id="topic" onClick={this.topicsClicked}>{this.state.lang.top_nav_topics}</a>
            <a id="test" onClick={this.testsClicked}>{this.state.lang.top_nav_tests}</a>
          </h3>
        </div>

        <div className="userinfo-row">
          {/*display user's info*/}
          <Button variant="outline-dark" size='lg' onClick={this.genderIconClicked} className="userInfoStyle">
            <h4>
              <IoIosSettings /> {this.state.lang[this.state.user]}
              {/*this.state.lang.display_gender*/} {this.state.lang[this.state.gender]} | {this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age}
              {/*this.state.lang.display_age*/} 
            </h4>
          </Button>
          {/* <Button variant="outline-dark" href="https://www.surveymonkey.ca/r/95ZW3VZ" size='lg' className="survey-reminder" target="_blank">
           <h4>
            {this.state.language === "english" ? "Take the Survey" : "Prenez le sondage"}
              <AiOutlineExclamationCircle />
            </h4>
          </Button> */}
        </div>

        <div>
          {this.state.configurationIsOpen && <MyBody 
            showBody={this.state.bodyView} 
            userConfig={userInfo} 
            getText={this.state.data.getTopic} 
            lang={this.state.lang}
            pageViewStateUpdater = {this.pageViewStateUpdater}></MyBody>}

            {!this.state.configurationIsOpen && <MyBody 
            showBody={this.state.bodyView} 
            userConfig={userInfo} 
            getText={this.state.data.getTopic} 
            lang={this.state.lang}
            pageViewStateUpdater = {this.pageViewStateUpdater}></MyBody>}
          
          <Tests 
            showTests={this.state.testsView} 
            userConfig={userInfo} 
            data={this.state.data.getListOfTests} 
            lang={this.state.lang} 
            pageViewStateUpdater = {this.pageViewStateUpdater}></Tests>
          <Topics showTopics={this.state.topicsView} 
            userConfig={userInfo} 
            data={this.state.data.getListOfTopics} 
            lang={this.state.lang} 
            pageViewStateUpdater = {this.pageViewStateUpdater}
            onClose={this.toggleModal}
            button={this.state.buttonText}></Topics>
        </div>

        {/* <button style={fixedStyle}>
          <img id="genderIcon" src={IconGender} className="drop-down" alt="IconGender" onClick={this.genderIconClicked} width="75" height="75" />
        </button> */}
        {/*modals*/}
        <div>{instructionModal}</div>
        <div>{configurationModal}</div>

        <MyModal show={this.state.isOpen}
          onClose={this.toggleModal}
          header={this.state.headerText}
          body={this.state.bodyText}
          button={this.state.buttonText}
          lang={this.state.lang}>
        </MyModal>

        {/*<InstructionModal show={this.state.instructionIsOpen}
          onClose={this.toggleIntrutionModal}
          onSelectLang ={this.selectLanguage}
          lang = {this.state.lang}>
        </InstructionModal>*/}
      </div>
    );
  }
}
export default withCookies(App);
