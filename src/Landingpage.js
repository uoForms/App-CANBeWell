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
    initGA('UA-151893001-1');
  }

  render() {
    // Render nothing if the "show" prop is false
    return (
      <div className="landing-page">
        {this.state.language == "" || null ? (
            <div>
              {/* <div className="center">
            <div className="landing-trans">
            TRANSGENDER Branch
            </div>
            </div> */}
              <div className="landing-update" test-id="update-banner">
                <button className="videoButton" src={videofr} onClick={this.openVideofr}
                        test-id="update-banner-fr-video">Vidéo
                </button>
                &nbsp;&nbsp;Bienvenue Welcome&nbsp;&nbsp;
                <button className="videoButton" src={videoen}
                        onClick={this.openVideoen} test-id="update-banner-en-video">Video
                </button>
              </div>
              <img className="landing-logo" src={calllogo} alt="CANBeWellLogo" test-id="logo"/>
              <div className="landing-button">
                <a href="#"><img className="landing-button-img" src={callfren} onClick={this.handleChange2}
                                 test-id="fr-redirect-button"/></a>
              </div>
              <div className="landing-button">
                <a href="#"><img className="landing-button-img" src={calleng} onClick={this.handleChange}
                                 test-id="en-redirect-button"/></a>
              </div>

              <div className="landing-notice-privacystmnt" test-id="en-reliable-resource-statement">
                A reliable resource by Canadian health care providers to help you stay healthy
              </div>

              <div className="landingpage-notice-row"></div>
              <div className="landingpage-notice-row d-flex justify-content-center">

                <div className="landingpage-notice-column">
                  <div className="landing-notice-privacystmnt-english">
                    {/*<a href= "/iCanBeWell_PrivacyPolicy.htm" target="_blank">{"PrivacyStatement"}</a>*/}
                    <a href="/iCanBeWell_PrivacyPolicy.htm"
                       className="landing-notice-english" test-id="privacy-statement-en">{"Privacy Statement"} </a>
                    &nbsp;<a href="#" className="slash">{<h4>&#124;</h4>} </a>
                  </div>
                </div>

                <div className="landingpage-notice-column">
                  <div className="landing-notice-privacystmnt-french">
                    {/*<a href= "/politiquedeconfidentialite.htm" target="_blank">{"Politique de confidentialité"}</a>*/}
                    {/* <a href= "https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm" >{"Politique de confidentialité"}</a> */}
                    {/* </div> */}
                    {/* <div id="homescreen-french"></div> */}
                    <a href="/politiquedeconfidentialite.htm"
                       className="landing-notice-french"
                       test-id="privacy-statement-fr">{"Politique de confidentialité"}</a>
                       &nbsp;<a href="#" className="slash">{<h4>&#124;</h4>} </a>

                  </div>
                </div>

                <div className="landingpage-notice-column">
                  <div className="landing-notice-aboutus-english">
                    <a href="/iCanBeWell_AboutUs.htm"
                       className="landing-notice-english" test-id="aboutus-statement-en">{"About Us"} </a>
                    &nbsp;<a href="#" className="slash">{<h4>&#124;</h4>} </a>
                  </div>
                </div>

                <div className="landingpage-notice-column">
                  <div className="landing-notice-aboutus-french">
                    <a href="/iCanBeWell_àproposdenous.htm"
                       className="landing-notice-french"
                       test-id="aboutus-statement-fr">{"À propos de nous"}</a>

                  </div>
                </div>



              </div>

              <div className="landing-notice-privacystmnt" test-id="fr-reliable-resource-statement">
                Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens
              </div>
              <div className="landingpage-notice-row"></div>
              <div className="landingpage-notice-row">
                <div className="landingpage-notice-column">
                  <div className="homescreen-eng">
                    <div id="homescreen-english"></div>
                  </div>
                </div>
                <div className="landingpage-notice-column">
                  <div className="homescreen-fre">
                    <div id="homescreen-french"></div>
                  </div>
              </div>
            </div>

            <div className="landingButtons">
              <button className="langLandButtonStyle" onClick={this.handleChange} >English</button>
              <button className="langLandButtonStyle" onClick={this.handleChange2}>Français</button>
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