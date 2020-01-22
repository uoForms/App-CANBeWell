import React from 'react';

import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_03-02.png';

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
    //console.log("test:" + localStorage.getItem("app_language"));
    //console.log("test:" + this.state.language);
    return (
      <div>
        {this.state.language == "" || null ? (
          <div>
            <h3>Do not use this app for health advice.<br /></h3>
            <h5>It is still under development.<br />
              Ask your health care provider for all health advice.<br />
              <br /></h5>
            <h3>Ne pas utiliser cette application pour des conseils de santé.<br /></h3>
            <h5>L’appli  est encore en développement.<br />
              Veuillez consulter votre professionnel de la santé.</h5>
            <div>
              <img class="landing-logo" src={calllogo} alt="CANBeWellLogo" />
            </div>
            <div className="langButton">
              <button class="langButtonStyle" onClick={this.handleChange} >English</button>
              <button class="langButtonStyle" onClick={this.handleChange2}>Francais</button>
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