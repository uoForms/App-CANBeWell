import React from 'react';
import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/homepageimage.png';
import videoen from './videos/video_en.mp4';
import videofr from './videos/video_fr.mp4';
import calleng from './assets/Logos/icanbewelleng.png';
import callcompletelogo from './assets/Logos/icanbewelllogo.png';
import callfren from './assets/Logos/canbewellfren.png';
import callchoixsante from './assets/Logos/choixsantefren.png'
import 'bootstrap/dist/css/bootstrap.min.css';
// import homepageimg from './assets/Banner/homepageimage.png';

import { Link, withRouter } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import Homescreenfren from './Homescreenfren';

class LandingPageFR extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      language: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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
  //Redirect to the "/" route
  handleRedirect() {
    this.props.history.push('/');
  }

  openVideoen() {
    window.open(videoen);
  }
  openVideofr() {
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
            <section id="landing-page-header">
              <Row className='m-0 landing-page-header-row mt-3'>
                <Col xs={6} md={4} lg={3}>
                  <img className="landing-logo-header" src={callcompletelogo} alt="CANBeWellLogo" test-id="logo" />

                </Col>
                <section className="ml-5 pl-md-3 pl-xl-5 mt-md-4 d-block">
                <Link to="/en" className="landing-french-router">English</Link>
                  {/* <a href="#"
                    className="landing-french-router" onClick={this.handleRedirect}>English</a> */}
                </section>
                <Col xs={6} md={8} lg={6}>

                </Col>
              </Row>
            </section>
            <div className="landing-update" test-id="update-banner">
              {/* <button className="videoButton" src={videofr} onClick={this.openVideofr}
                        test-id="update-banner-fr-video">Vidéo
                </button> */}
              {/*&nbsp;&nbsp; Bienvenue
                    {/* <button className="videoButton" src={videoen}
                        onClick={this.openVideoen} test-id="update-banner-en-video">Video
                </button> */}
              <a href="#"
                className="landing-get-started" onClick={this.handleChange2}>Cliquez pour débuter</a>

            </div>

            <div className='d-flex justify-content-center'>
              <a href="#"><img className="landing-logo" src={calllogo} alt="CANBeWellLogo" onClick={this.handleChange2}
                test-id="logo" /></a>
            </div>

            <div className="landing-button">
              <a href="#"><img className="landing-button-img" src={callchoixsante} onClick={this.handleChange2}
                test-id="fr-redirect-button" /></a>
            </div>
            {/* <div className="landing-button">
                <a href="#"><img className="landing-button-img" src={calleng} onClick={this.handleChange}
                                 test-id="en-redirect-button"/></a>
              </div> */}

            {/* <div className="landing-notice-privacystmnt" test-id="en-reliable-resource-statement">
                A reliable resource by Canadian health care providers to help you stay healthy
              </div> */}

            <div className="landing-notice-privacystmnt" test-id="fr-reliable-resource-statement">
              Rester en santé avec cette ressource gratuite créée par vos professionnels de la santé canadiens
            </div>

            <div className="landingpage-notice-row"></div>
            <div className="landingpage-notice-row d-flex justify-content-center">
              <div className="landingpage-notice-column">
                <div className="landing-notice-video-french">
                  {/*<a href= "/iCanBeWell_PrivacyPolicy.htm" target="_blank">{"PrivacyStatement"}</a>*/}
                  {/* <a href="/iCanBeWell_PrivacyPolicy.htm"
                        className="landing-notice-english" test-id="privacy-statement-en">{"Privacy Statement"} </a> */}
                  <a className="landing-notice-french" src={videofr} href=""
                    onClick={this.openVideofr} test-id="update-banner-fr-video">Vidéo
                  </a>
                  &nbsp;<a href="#" className="slash">{<h4>&#124;</h4>} </a>
                </div>
              </div>
              {/* <button className="videoButton" src={videofr} onClick={this.openVideofr}
                        test-id="update-banner-fr-video">Vidéo
                </button> */}

              <div className="landingpage-notice-column">
                <div className="landing-notice-privacystmnt-french">
                  {/*<a href= "/politiquedeconfidentialite.htm" target="_blank">{"Politique de confidentialité"}</a>*/}
                  {/* <a href= "https://canbewell-uottawa.web.app/politiquedeconfidentialite.htm" >{"Politique de confidentialité"}</a> */}
                  {/* </div> */}
                  {/* <div id="homescreen-french"></div> */}
                  <a href="/politiquedeconfidentialite.htm"
                    className="landing-notice-french privacyFr"
                    test-id="privacy-statement-fr">{"Politique de confidentialité"}</a>
                  &nbsp;<a href="#" className="slash">{<h4>&#124;</h4>} </a>
                </div>
              </div>

              {/* <div className="landingpage-notice-column">
                  <div className="landing-notice-aboutus-english">
                    <a href="/iCanBeWell_AboutUs.htm"
                       className="landing-notice-english" test-id="aboutus-statement-en">{"About Us"} </a>
                    &nbsp;<a href="#" className="slash">{<h4>&#124;</h4>} </a>
                  </div>
                </div> */}

              <div className="landingpage-notice-column">
                <div className="landing-notice-aboutus-french">
                  <a href="/iCanBeWell_àproposdenous.htm"
                    className="landing-notice-french"
                    test-id="aboutus-statement-fr">{"À propos de nous"}</a>

                </div>
              </div>



            </div>


            <div className="d-flex justify-content-center my-3">
              <button type="button" className="d-inline-block d-md-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
              Installer l'application
              </button>
            </div>
            <Homescreenfren openDialog={this.props.openDialog} setOpenDialog={this.props.setOpenDialog} />

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
export default withRouter(LandingPageFR);