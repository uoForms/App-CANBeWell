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
import {isTransgender} from './config';

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
      Tgender:null,
      patient_provider: null,
      age: null,
      language: null,
      region: null,
      city: null,
      preNav: null,
      preCat: null,
      preTime: null,
    };// = getUserInfo();
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
      visible: true,
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
      Tgender: cookies.get('Tgender'),
      region: null, 
      city: null,
      preNav: null,
      preCat: null,
      preTime: null,
      showMe: true,
      isTransgender: isTransgender //isTransgender -- Flag
      //allowToClose: false, //obselete! we use to make the user agree before they could press agree
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePatientProviderChange = this.handlePatientProviderChange.bind(this);
    this.handlePatientProviderChangeFromConfig = this.handlePatientProviderChangeFromConfig.bind(this);
    this.handleAllAgesSelected = this.handleAllAgesSelected.bind(this);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
    this.handleTransGenderChange = this.handleTransGenderChange.bind(this);
    // this.onChangeTopSurgery=this.onChangeTopSurgery.bind(this);
    // this.onChangeBottomSurgery=this.onChangeBottomSurgery.bind(this);
    // this.onChangeHormoneTherapy=this.onChangeHormoneTherapy.bind(this);
    this.onChangeisEstrogen=this.onChangeisEstrogen.bind(this);
    this.onChangeisTestosterone=this.onChangeisTestosterone.bind(this);
    this.onChangeisBreasts=this.onChangeisBreasts.bind(this);
    this.onChangeisVaginaCervix=this.onChangeisVaginaCervix.bind(this);
    this.onChangeisProstate=this.onChangeisProstate.bind(this);
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

     // this.fieldSelectionDisplayHandle(this.state.gender);

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
      
    if( !cookies.get('sessionID') ) 
    {
        cookies.set('sessionID', uuidv4().toString(), { path: "/" });
    }
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
    this.setState({
      preNav: nav,
      preCat: cat,
      preTime: time,
    });
  }

  //toggle the config modif
  toggleConfigurationModal = () => {
    //Transgener configuration modal
   if(this.state.isTransgender){
    var genders = ["male", "female", "all_genders" , "nonbinary","transgender"]; 
    var Tgenders =["tf","tm"];
    if (genders.includes(this.state.gender) && ((this.state.age >= 18 && this.state.age <= 150) || this.state.allAgesSelected) && Tgenders.includes(this.state.Tgender)) {
      this.setState({
        configurationIsOpen: !this.state.configurationIsOpen
      });
      document.getElementById("config_agehelp").style.display = "none";
    }
    else{
      document.getElementById("config_agehelp").style.display = "block";
    }
  }
  else {
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
}

  //Trangender Intruction modal
  toggleIntrutionModal = () => {
    //Applying istransgender flag
    if(this.state.isTransgender){
    var genders = ["male", "female", "all_genders" , "nonbinary","transgender"];
    var Tgenders =["tf","tm"];
    if (genders.includes(this.state.gender) && ((this.state.age >= 18 && this.state.age <= 150) || this.state.allAgesSelected) && Tgenders.includes(this.state.Tgender) ) {
      const { cookies } = this.props;
      cookies.set('_onboarded', true, { path: '/' });
      this.setState({
        instructionIsOpen: !this.state.instructionIsOpen
      });
      document.getElementById("agehelp").style.display = "none";
      document.getElementById("help").style.display = "none";
    }
    else if(!genders.includes(this.state.gender)  || (!Tgenders.includes(this.state.Tgender)) || (!this.state.allAgesSelected && (this.state.age ==''))){
      document.getElementById("agehelp").style.display = "none";
      document.getElementById("help").style.display = "block";
    }
    else{
      document.getElementById("agehelp").style.display = "block";
      document.getElementById("help").style.display = "none";
    }
  }
  else {
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

  } 
}

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
  }

  goBack() {
    window.location.href = './index.html'; //go back to canBeWell Logo
  }

  //Set age
  handleChange(event) {
    const { cookies } = this.props;
    if (event.target.value>=18 && event.target.value<=150 )
    {
    cookies.set('age', event.target.value, { path: '/' });
        }
        this.setState({ age: event.target.value });
    //setAge(Number(event.target.value));
  }

  handleSubmit(event){
    event.
    reventDefault();
    
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
    cookies.set('gender', changeEvent.target.value, { path: '/' });//curr gender //assigned sex
    
    this.setState({
      gender: changeEvent.target.value
    });

  }


  handleTransGenderChange(TchangeEvent) {

    const { cookies } = this.props;
    cookies.set('Tgender', TchangeEvent.target.value, { path: '/' });

    this.setState({
      Tgender: TchangeEvent.target.value
    });
  }

  onChangeisEstrogen(event) {
    const { cookies } = this.props;
    cookies.set('isEstrogen', !this.state.isEstrogen, { path: '/' });

    this.setState({
      isEstrogen: (!this.state.isEstrogen)
    });
  }

  onChangeisTestosterone(event) {
    const { cookies } = this.props;
    cookies.set('isTestosterone  ', !this.state.isTestosterone  , { path: '/' });

    this.setState({
      isTestosterone: (!this.state.isTestosterone)
    });
  }

  onChangeisBreasts(event) {
    const { cookies } = this.props;
    cookies.set('isBreasts', !this.state.isBreasts, { path: '/' });

    this.setState({
      isBreasts: (!this.state.isBreasts)
    });
  }

  onChangeisVaginaCervix(event) {
    const { cookies } = this.props;
    cookies.set('isVaginaCervix', !this.state.isVaginaCervix, { path: '/' });

    this.setState({
      isVaginaCervix: (!this.state.isVaginaCervix)
    });
  }

  onChangeisProstate(event) {
    const { cookies } = this.props;
    cookies.set('isProstate', !this.state.isProstate, { path: '/' });

    this.setState({
      isProstate: (!this.state.isProstate)
    });
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

 helpClicked = () => {
  
  this.setState({
    isOpen: !this.state.isOpen,
    headerText: this.state.lang.config_modal_Gender_help_header,
    bodyText: this.state.lang.config_modal_Gender_help_body,
    buttonText: this.state.lang.config_modal_agree,
  });
 }
 helpClicked2 = () => {
  
  this.setState({
    isOpen: !this.state.isOpen,
    headerText: this.state.lang.config_modal_SexAtBirth_help_header,
    bodyText: this.state.lang.config_modal_SexAtBirth_help_body,
    buttonText: this.state.lang.config_modal_agree,
  });
 }
  render() {
    var userInfo = getUserInfo();
    var userInfo = {
      userID: this.state.userID,
      sessionID: this.state.sessionID,
      gender: this.state.gender,
      Tgender:this.state.Tgender,
      patient_provider: this.state.user,
      age: this.state.age,
      language: this.state.language, //TODO plese change that VERY important
      region: this.state.region,
      city: this.state.city,
      preNav: this.state.preNav,
      preCat: this.state.preCat,
      preTime: this.state.preTime,
      isEstrogen:this.state.isEstrogen,
      isTestosterone:this.state.isTestosterone,
      isBreasts:this.state.isBreasts,
      isVaginaCervix:this.state.isVaginaCervix,
      isProstate:this.state.isProstate,
      isTransgender:this.state.isTransgender
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
      'marginRight':'140px',
    };
    var fieldSelectionDiv = {
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
      textAlign: 'left',
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
      fontSize: '16px',
      fontWeight:'12px',
    };
    const termsOfUseStyle={
      'marginTop':'10px'
    };
    const content={
      'textAlign':'center',
      'marginLeft': '40%'
    };
    const genderCss={
      'textAlign':'left'
    }
    
    const titleCSS={
      'textAlign':'left',
      'marginLeft': '12%'
    }
    const underlineTextTermsOfUse={
      'textDecoration': 'underline',
      'fontWeight': '400'
    }
    const termOfUseCss={
      'marginLeft':'40%'
    }

    if (this.state.user == "patient") {
      allagescheckboxStyle.display = "none";
    }
    else if (this.state.user == "provider") {
      allagescheckboxStyle.display = "block";
    }
    
    if(this.state.isTransgender){
    if(this.state.gender==="nonbinary"|| this.state.gender==="transgender"){
      fieldSelectionDiv.display = "block";
    }
    else {
      fieldSelectionDiv.display = "none";
    }
  }

    var instructionModal = []; //first choose box/page
    var configurationModal = []; // top left choose which appears on main body page
    
 //Applying the isTransgender flag for first pop up choose box
 console.log("print::::",isTransgender);
  if(this.state.isTransgender){
    //Transgender choose box
      if (this.state.instructionIsOpen) {
      //Transgender Instruction modal
      instructionModal = [
        
        <div key="1" className="backdrop" style={backdropStyle}>
          <div className="myModal" style={myModalStyle} test-id="instructionModalRoot">
          <div>
            </div>
            <div className="footer">
              <div style={content}>
              <p id="choose_mod" style={titleCSS}><strong>{this.state.lang.instruction_modal_header} </strong></p>

              {/*select user*/}
              <div className="radio" style={genderCss}>
                <form>
                  <p id="user_mod">{this.state.lang.user_selector}</p>
                   <label id="pat_mod">
                    <input type="radio" value="patient" checked={this.state.user === 'patient'} onChange={this.handlePatientProviderChange} />
                    {this.state.lang.patient}
                  </label>
                  <br/>
                   
                  <label id="prov_mod">
                    <input type="radio" value="provider" checked={this.state.user === 'provider'} onChange={this.handlePatientProviderChange} />
                    {this.state.lang.provider}
                  </label>
                </form>
              </div>
              
              {/*select age*/}
              <div>
                <form>
                  <div style={genderCss}>
                    {this.state.lang.age_selector}
                    {/* <input id='abcd' type="text" value={this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age} onChange={this.handleChange} disabled={this.state.allAgesSelected} placeholder={this.state.lang.age_selector_place_holder} onKeyPress={e => { if (e.key === 'Enter') e.preventDefault();}} /> */}
                    <input id='abc' type="text" value={this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age} onChange={this.handleChange} disabled={this.state.allAgesSelected} placeholder={this.state.lang.age_selector_place_holder} onKeyPress={e => { if (e.key === 'Enter') e.preventDefault();}} />
                    <label style={allagescheckboxStyle}>
                      <input id='myCheck' type="checkbox" checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected} />{this.state.lang.all_ages}
                    </label>
                  </div>
                </form>
              </div>
              {/*select gender*/}
              <div>
                    <div id="genderSelector" className="radio" style={genderCss}>
                     <div className="gender_mod"> <strong>{this.state.lang.gender_selector}</strong>
                        {/* this is the original button, works fine 
                        but i have applied css zindex and positioned it over other div which is trick that doesnt aligns with screen size */}
                     {/* this button is crack takes me to the landing page */}
                       <button className="button button23" onClick={this.helpClicked}>?</button> 
                     </div>                    
                      <label id="male_radio">
                        <input type="radio" value="male" checked={this.state.gender == 'male'} onChange={this.handleGenderChange} />
                        {this.state.lang.male}
                      </label>
                      <br/>
                      <label id="female_radio">
                        <input type="radio" value="female" checked={this.state.gender == 'female'} onChange={this.handleGenderChange} />
                        {this.state.lang.female}
                      </label>
                      <br/>

                    <label id="nb_radio">
                      <input  type="radio" value="nonbinary" checked={this.state.gender == 'nonbinary'} onChange={this.handleGenderChange} />
                      {this.state.lang.nonbinary}
                    </label>
                    <br/>
                    {/* <label id="trans_radio">
                      <input type="radio" value="transgender" checked={this.state.gender == 'transgender'} onChange={this.handleGenderChange} />
                      {this.state.lang.transgender}
                    </label> */}
                      {/*this.state.user === 'provider' || null ?
                      (<label>
                        <input type="radio" value="all_genders" checked={this.state.gender == 'all_genders'} onChange={this.handleGenderChange} />
                          {this.state.lang.all_genders}
                      </label>) : (<label></label>)
                      */}

                    </div>
                  {/* {Are you a Transgender} */}
                   {/* {Are you a Transgender} */}
                   <div id="TgenderSelector" className="radio" style={genderCss}>
                   <div className="Tgender_mod"><strong> {this.state.lang.Tgender_selector}</strong>
                          <button className="button button24" onClick={this.helpClicked2}>?</button> 
                   </div>
                      
                      <label id="birth_male_mod">
                      <input type="radio" value="tf" checked={this.state.Tgender == 'tf'} onChange={this.handleTransGenderChange} />
                      {this.state.lang.tf}
                      </label>
                      <br/>
                      <label id="female_male_mod">
                      <input type="radio" value="tm" checked={this.state.Tgender == 'tm'} onChange={this.handleTransGenderChange} />
                      {this.state.lang.tm}
                     </label>
                     </div>
                    <label id="help" className="checkAge">
                        <h5>{this.state.lang.ageandgender_help}</h5>
                      </label>
                      <label id="agehelp" className="checkAge">
                        <h5>{this.state.lang.age_help}</h5>
                      </label>
                {/*Field selection based on gender*/}
              </div>
              </div>
              
            <button id="agree" className="buttonAgreeToTerms" style={termOfUseCss} onClick={this.toggleIntrutionModal}>{this.state.lang.agree}</button>
              <div className="termsOfUse" style={termsOfUseStyle}>
              <b>{this.state.lang.disclaimer_header}</b>

              <div style={myDisclaimerStyle}>
                        <div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.disclaimerBeforeTermsOfUse)}}></div>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.accpetanceheading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.acceptanceInitialStatement)}}></div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.acceptanceAgreeStatement)}}></div>
                            
                            <div>{this.state.lang.acceptanceText}</div>
                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.modificationHeading}</div>
                            <div>{this.state.lang.modificationText1}</div>
                            <div>{this.state.lang.modificationText2}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.websiteContentSpecificationHeading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.websiteContentSpecificationText)}}></div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.websiteSecurityHeading}</div>
                            <div>{this.state.lang.websiteSecurityText1}</div>
                            <div>{this.state.lang.websiteSecurityText2}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.rightsAndOwnershipHeading}</div>
                            <div>{this.state.lang.rightsAndOwnershipText1}</div>
                            <div>{this.state.lang.rightsAndOwnershipText2}</div>
                            <div>{this.state.lang.rightsAndOwnershipText3}</div>
                            <div>{this.state.lang.rightsAndOwnershipText4}</div>
                            <div>{this.state.lang.rightsAndOwnershipText5}</div>
                            <div>{this.state.lang.rightsAndOwnershipText6}</div>
                            <div>{this.state.lang.rightsAndOwnershipText7}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.conditionsHeading}</div>
                            <div>{this.state.lang.conditionsText}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.legalActionsHeading}</div>
                            <div>{this.state.lang.legalActionsText}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.cookiesHeading}</div>
                            <div>{this.state.lang.cookiesText}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.thirdPartyWebHeading}</div>
                            <div>{this.state.lang.thirdPartyWebText}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.geographicRestricationsHeading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.geographicRestricationsText)}}></div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.noRelianceHeading}</div>
                            <div>{this.state.lang.noRelianceText1}</div>
                            <div>{this.state.lang.noRelianceText2}</div>
                            <div>{this.state.lang.noRelianceText3}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.disclaimerWarrantiesHeading}</div>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.disclaimerWarrantiesText1)}}></div>
                            <div>{this.state.lang.disclaimerWarrantiesText2}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.limitationHeading}</div>
                            <div>{this.state.lang.limitationText}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.indemnificationHeading}</div>
                            <div>{this.state.lang.indemnificationText}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.lawAndJurisdictionHeading}</div>
                            <div>{this.state.lang.lawAndJurisdictionText1}</div>
                            <div>{this.state.lang.lawAndJurisdictionText2}</div>

                            <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.entireAgreementHeading}</div>
                            <div>{this.state.lang.entireAgreementText}</div>

                            <div>{this.state.lang.dateofAgreement}</div>
                        </div>
              </div>             
              </div> 
              <div>
                <button id="agree" className="buttonAgreeToTerms" style={termOfUseCss} onClick={this.toggleIntrutionModal}>{this.state.lang.agree}</button>
                {/* <button onClick={this.goBack} type="button">{this.state.lang.disagree}</button> */}
              </div>
            </div>
            </div>
        </div>
      ];
      } 
 }else {
      //Master Choose box
      if (this.state.instructionIsOpen) {
        //Master Instruction modal

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
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.disclaimerBeforeTermsOfUse)}}></div>
                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.accpetanceheading}</div>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.acceptanceInitialStatement)}}></div>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.acceptanceAgreeStatement)}}></div>
                        
                        <div>{this.state.lang.acceptanceText}</div>
                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.modificationHeading}</div>
                        <div>{this.state.lang.modificationText1}</div>
                        <div>{this.state.lang.modificationText2}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.websiteContentSpecificationHeading}</div>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.websiteContentSpecificationText)}}></div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.websiteSecurityHeading}</div>
                        <div>{this.state.lang.websiteSecurityText1}</div>
                        <div>{this.state.lang.websiteSecurityText2}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.rightsAndOwnershipHeading}</div>
                        <div>{this.state.lang.rightsAndOwnershipText1}</div>
                        <div>{this.state.lang.rightsAndOwnershipText2}</div>
                        <div>{this.state.lang.rightsAndOwnershipText3}</div>
                        <div>{this.state.lang.rightsAndOwnershipText4}</div>
                        <div>{this.state.lang.rightsAndOwnershipText5}</div>
                        <div>{this.state.lang.rightsAndOwnershipText6}</div>
                        <div>{this.state.lang.rightsAndOwnershipText7}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.conditionsHeading}</div>
                        <div>{this.state.lang.conditionsText}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.legalActionsHeading}</div>
                        <div>{this.state.lang.legalActionsText}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.cookiesHeading}</div>
                        <div>{this.state.lang.cookiesText}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.thirdPartyWebHeading}</div>
                        <div>{this.state.lang.thirdPartyWebText}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.geographicRestricationsHeading}</div>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.geographicRestricationsText)}}></div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.noRelianceHeading}</div>
                        <div>{this.state.lang.noRelianceText1}</div>
                        <div>{this.state.lang.noRelianceText2}</div>
                        <div>{this.state.lang.noRelianceText3}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.disclaimerWarrantiesHeading}</div>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.lang.disclaimerWarrantiesText1)}}></div>
                        <div>{this.state.lang.disclaimerWarrantiesText2}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.limitationHeading}</div>
                        <div>{this.state.lang.limitationText}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.indemnificationHeading}</div>
                        <div>{this.state.lang.indemnificationText}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.lawAndJurisdictionHeading}</div>
                        <div>{this.state.lang.lawAndJurisdictionText1}</div>
                        <div>{this.state.lang.lawAndJurisdictionText2}</div>

                        <div className="underlineTextTermsOfUse" style={underlineTextTermsOfUse}>{this.state.lang.entireAgreementHeading}</div>
                        <div>{this.state.lang.entireAgreementText}</div>

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
      }
    }
   
  //Applying the isTransgender flag for second choose box
  if(this.state.isTransgender){ 
    if (this.state.configurationIsOpen == true) {
      //Transgender configuration modal
      configurationModal = [
        <div key="2" className="backdrop" test-id="PostConfigUpdateModalBackdrop">
          <div className="myModal" test-id="PostConfigUpdateModalRoot">
            <div>
              <h1 test-id="PostConfigUpdateModalHeader"><strong>{this.state.lang.configuration_header}</strong></h1>
              <div className="myModalBody">
                <div className="radio">                  
                <form test-id="userForm">
                    {this.state.lang.user_selector}
                     <br/>
                    <label test-id="patientLabel">
                      <input test-id="patientRadio" type="radio" value="patient" checked={this.state.user === 'patient'} onChange={this.handlePatientProviderChangeFromConfig} />
                      {this.state.lang.patient}
                    </label>
                     <br/>
                    <label test-id="providerLabel">
                      <input test-id="providerRadio" type="radio" value="provider" checked={this.state.user === 'provider'} onChange={this.handlePatientProviderChangeFromConfig} />
                      {this.state.lang.provider}
                    </label>
                  </form>
                </div>
                {/*select age*/}
                <div >
                  <form test-id="ageForm">
                    <div>
                      {this.state.lang.age_selector}

                      <input test-id="ageInput" id='abc' type="text" value={this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age} onChange={this.handleChange} disabled={this.state.allAgesSelected} placeholder={this.state.lang.age_selector_place_holder} />
                      <label style={allagescheckboxStyle} test-id="allAgeCheckboxLabel">
                        <input test-id="allAgeCheckbox" id='check' type="checkbox" checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected} />{this.state.lang.all_ages}
                      </label>
                    </div>
                  </form>
                </div>

                <div>
                  <form>
                    <div id="genderSelector" className="radio" test-id="genderSelectRoot">
                      {this.state.lang.gender_selector}<strong>
                        <button test-id="genderSelectHelp" className="button button22" onClick={this.helpClicked}>?</button></strong>
                       <br/>
                      <label id="male_radio" test-id="maleRadioLabel">
                        <input test-id="maleRadio" type="radio" value="male" checked={this.state.gender == 'male'} onChange={this.handleGenderChange} />
                        {this.state.lang.male}
                      </label>
                      <br/>
                      <label id="female_radio" test-id="femaleRadioLabel">
                        <input test-id="femaleRadio" type="radio" value="female" checked={this.state.gender == 'female'} onChange={this.handleGenderChange} />
                        {this.state.lang.female}
                      </label>
                      <br/>
                      <label test-id="nonBinaryRadioLabel">
                        <input test-id="nonBinaryRadio" type="radio" value="nonbinary" checked={this.state.gender == 'nonbinary'} onChange={this.handleGenderChange} />
                        {this.state.lang.nonbinary}
                      </label>
                      <br/>
                   {/* <label>
                      <input type="radio" value="transgender" checked={this.state.gender == 'transgender'} onChange={this.handleGenderChange} />
                      {this.state.lang.transgender}
                    </label> */}
                      {/*this.state.user === 'provider' || null ?
                      (<label>
                        <input type="radio" value="all_genders" checked={this.state.gender == 'all_genders'} onChange={this.handleGenderChange} />
                          {this.state.lang.all_genders}
                      </label>) : (<label></label>)
                      */}
                    </div>
                  </form>
                     {/* {Are you a Transgender} */}
                     <div id="TgenderSelector" className="radio" test-id="tGenderSelectRoot">
                      {this.state.lang.Tgender_selector}<strong>
                      <button test-id="tGenderSelectHelp" className="button button25" onClick={this.helpClicked2}>?</button></strong>
                      <br/>
                      <label id="birth_male_mod" test-id="birthMaleLabel">
                      <input test-id="birthMale" type="radio" value="tf" checked={this.state.Tgender == 'tf'} onChange={this.handleTransGenderChange} />
                      {this.state.lang.tf}
                      </label>
                      <br/>
                      <label id="female_male_mod" test-id="birthfemaleLabel">
                      <input test-id="birthFemale" type="radio" value="tm" checked={this.state.Tgender == 'tm'} onChange={this.handleTransGenderChange} />
                      {this.state.lang.tm}
                     </label>
                     </div>
                      <label id="config_agehelp" className="checkAge" test-id="ageError">
                        <h5>{this.state.lang.age_help}</h5>
                      </label>
                  </div>
                {/*close button*/}
                <div className="myModalButton">
                  <button onClick={this.toggleConfigurationModal} test-id="okButton">{this.state.lang.config_modal_agree}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ];
     } 
   }else {
      if (this.state.configurationIsOpen == true) {
        //Master Configuration modal
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
                      <div id="genderSelector" className="radio, test">
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
    }
  } 
  

    return (
      <div test-info-locale={this.state.language}>
        {/*this is your header tab*/}
        <div className="topnav">
          <h3>
            <a id="body"  test-id="body" onClick={this.bodyClicked}>{this.state.lang.top_nav_body}</a>
            <a id="topic" test-id="topic" onClick={this.topicsClicked}>{this.state.lang.top_nav_topics}</a>
            <a id="test" test-id="test" onClick={this.testsClicked}>{this.state.lang.top_nav_tests}</a>
          </h3>
        </div>
        
        <div className="userinfo-row">
          {/*display user's info*/}
          <Button variant="outline-dark" size='lg' onClick={this.genderIconClicked} className="userInfoStyle" test-id="postConfigUpdateModalOpenButton">
            <h4>
              <IoIosSettings /> {this.state.lang[this.state.user]}
               {/*this.state.lang.display_gender*/} {[(this.state.gender == "male"  && this.state.Tgender == "tf") ?  this.state.lang[this.state.gender]
               : (this.state.gender == "female" && this.state.Tgender == "tm") ? this.state.lang[this.state.gender]
               : (!this.state.isTransgender && (this.state.gender == "male" || this.state.gender == "female" )) ? this.state.lang[this.state.gender]
               : (this.state.language == 'french' && this.state.gender == "male" && this.state.Tgender == "tm") ? "Transmasculin"
               : (this.state.language == 'french' && this.state.gender == "female" && this.state.Tgender == "tf") ? "Transféminine"
               : (this.state.gender == "male" && this.state.Tgender == "tm") ? "Transmasculine"
               : (this.state.gender == "female" && this.state.Tgender == "tf") ? "Transfeminine"
               : (this.state.gender == "nonbinary" ? this.state.lang[this.state.gender] : this.state.Tgender)]} 
               | {this.state.age == "all ages" ? this.state.lang.all_ages : this.state.age}
              {/*this.state.lang.display_age*/} 
            </h4>
          </Button>
        </div>

        <div>
          {this.state.configurationIsOpen && <MyBody 
            showBody={this.state.bodyView} 
            userConfig={userInfo} 
            getText={this.state.data.getTopic} 
            lang={this.state.lang}
            isTransgender={this.state.isTransgender}
            pageViewStateUpdater = {this.pageViewStateUpdater}></MyBody>}

            {!this.state.configurationIsOpen && <MyBody 
            showBody={this.state.bodyView} 
            userConfig={userInfo} 
            getText={this.state.data.getTopic} 
            lang={this.state.lang}
            isTransgender={this.state.isTransgender}
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