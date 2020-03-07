import React from 'react';

import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_03-02.png';

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
  componentDidMount() {
    initGA('UA-151893001-1');
    PageView();
  }

  render() {
    // Render nothing if the "show" prop is false
    return (
      <div className="landing-page">
        {this.state.language == "" || null ? (
          <div>
            <div class="center">
              <img class="landing-logo" src={calllogo} alt="CANBeWellLogo" />
            </div>
            <div className="langButton">
              <button class="langButtonStyle" onClick={this.handleChange} >English </button>
              <button class="langButtonStyle" onClick={this.handleChange2}>Francais</button>
            </div>
            <div className="landingpage-notice-row">
              <div className="landingpage-notice-column">
                <div className="landing-notice">
                  A reliable resource by Canadian family physicians to help you stay healthy
                </div>
              </div>
              <div className="landingpage-notice-column">
                <div className="landing-notice">
                  Rester en santé avec cette ressource créée par des médecins de famille canadiens
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