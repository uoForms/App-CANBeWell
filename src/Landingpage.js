import React from 'react';

import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_20-05-02.png';
import videoland from './videos/videojune20.mp4';

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

  openVideo(){
    window.open(videoland);
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
            <div class="landing-update">
            Mise à jour COVID Updated&nbsp;
            <button class="videoButton" src={videoland} onClick={this.openVideo}>Video</button>
                        </div>

           <img class="landing-logo" src={calllogo} alt="CANBeWellLogo" />
                  
            <div className="landingButtons">
              
              <button class="langLandButtonStyle" onClick={this.handleChange} >English</button>
              <button class="langLandButtonStyle" onClick={this.handleChange2}>Français</button>
             
            </div>

            <div className="landingpage-notice-row"> </div>

            <div className="landingpage-notice-row">
              <div className="landingpage-notice-column">
                <div className="landing-notice">
                A reliable resource by Canadian health care providers to help you stay healthy
                </div>
              </div>
              <div className="landingpage-notice-column">
                <div className="landing-notice">
                Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens
                </div>
              </div>
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