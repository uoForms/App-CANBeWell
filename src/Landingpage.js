import React from 'react';
import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_21-02-02.png';
import videoen from './videos/video_en.mp4';
import videofr from './videos/video_fr.mp4';
import calleng from './assets/Logos/canbewelleng.png';
import callfren from './assets/Logos/canbewellfren.png';

import 'bootstrap/dist/css/bootstrap.min.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      language: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  handleChange() {
    this.setState({ language: "english" })
    localStorage.setItem("app_language", this.state.language);
    //return (<App app_language={this.state.language} />)
  }
  handleChange2() {
    this.setState({ language: "french" })
    localStorage.setItem("app_language", this.state.language);
  }

  openVideoen(){
    window.open(videoen);
  }
  openVideofr(){
    window.open(videofr);
  }

  componentDidMount() {
    initGA('UA-151893001-3');
  }

  render() {
    // Render nothing if the "show" prop is false
    return (
      <div className="landing-page">
        {this.state.language == "" || null ? (
          <div>
          <div class="landing-update">
          <button class="videoButton" src={videofr} onClick={this.openVideofr}>Vidéo</button>
          &nbsp;&nbsp;Mise à jour COVID Updated&nbsp;&nbsp;
            <button class="videoButton" src={videoen} onClick={this.openVideoen}>Video</button>
          </div>
           <img class="landing-logo" src={calllogo} alt="CANBeWellLogo" />
                <div className="landing-button">
                  <a href="#"><img className="landing-button-img" src={callfren} onClick={this.handleChange2} /></a>
                </div>
                <div className="landing-button">
                  <a href="#"><img className="landing-button-img" src={calleng} onClick={this.handleChange} /></a>
                </div>

                <div className="landing-notice-privacystmnt">
                A reliable resource by Canadian health care providers to help you stay healthy
                </div>

                <div className="landingpage-notice-row"> </div>
                <div className="landingpage-notice-row">
              <div className="landingpage-notice-column">
              <div className="landing-notice-privacystmnt-english">
                {/*<a href= "/iCanBeWell_PrivacyPolicy.htm" target="_blank">{"PrivacyStatement"}</a>*/}
                <a href= "https://canbewell-uottawa.web.app/iCanBeWell_PrivacyPolicy.htm" className="landing-notice-english">{"Privacy Statement"} </a>
                &nbsp;<a href= "#" className="slash">{<h4>&#124;</h4>} </a>
                </div>
                <div id="homescreen-english"></div>
              </div>
              <div className="landingpage-notice-column">
              <div className="landing-notice-privacystmnt-french">
                {/*<a href= "/politiquedeconfidentialite.htm" target="_blank">{"Politique de confidentialité"}</a>*/}
                {/* <a href= "https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm" >{"Politique de confidentialité"}</a> */}
                {/* </div> */}
                {/* <div id="homescreen-french"></div> */}
                <a href= "https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm" className="landing-notice-french">{"Politique de confidentialité"}</a>
                <div id="homescreen-french"></div>
                </div> 
              </div>
            </div>

                <div className="landing-notice-privacystmnt">
                Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens
                </div>
            
            <div className="landingButtons">
              <button class="langLandButtonStyle" onClick={this.handleChange} >English</button>
              <button class="langLandButtonStyle" onClick={this.handleChange2}>Français</button>
            </div>
          </div>
        ) : (
            <div>
              <App appLanguage={this.state.language} />
            </div>
          )}
      </div>
    );
  }
}
export default LandingPage;