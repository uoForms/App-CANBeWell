import React from 'react';
import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_21-02-02.png';
import videoen from './videos/video_en.mp4';
import videofr from './videos/video_fr.mp4';
import calleng from './assets/Logos/icanbewelleng.png';
import callfren from './assets/Logos/canbewellfren.png';
import homepageimg from './assets/Banner/homepageimage.png';
import { withRouter } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import Homescreeneng from './Homescreeneng';


class LandingPageEN extends React.Component {
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

  //Redirect to the "/fr" route
  handleRedirect() {
    this.props.history.push('/fr');
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
          <>
            <section id="landing-page-header">
              <div>
                <img className="landing-logo" src={calllogo} alt="CANBeWellLogo" test-id="logo" />
                <img className="landing-button-img-en" src={calleng}
                  test-id="en-redirect-button" />
                <img className="landing-button-img-fr" src={callfren}
                  test-id="fr-redirect-button" />
              </div>

              {/* <div className="landing-button">
                <a href="#"><img className="landing-button-img" src={callfren} onClick={this.handleChange2}
                                 test-id="fr-redirect-button"/></a>
              </div>*/}

              {/* <h3 className="landing-button-EN" test-id="landing-EN">
                <b>EN</b>
              </h3>
            <h4 className="landing-page-line"> | </h4> */}
              <div className="landing-lang-switch">
                <a className="landing-english-en">EN</a> |
                <a onClick={this.handleRedirect}> FR</a>
              </div>
              {/* <h className="landing-button-FR" test-id="landing-FR">
                <a onClick={this.handleRedirect}>FR</a>
              </h> */}

              {/* <button onClick={this.handleChange2}>FR</button> */}



              {/* <div className="landing-notice-privacystmnt" test-id="en-reliable-resource-statement">
                A reliable resource by Canadian health care providers to help you stay healthy
              </div> */}
            </section>
            <section>
              <img className="home-page-img" src={homepageimg}
                test-id="img-home-page" />
            </section>



            <section className="rectangle-blue d-flex flex-column px-4 px-md-5">
              <div className='font-weight-bold text-white pt-3 font-title' test-id="en-welcome-message">
                Welcome to icanbewell
              </div>
              <div className="text-white font-subHeading mt-5 mt-md-3" test-id="en-reliable-resource-statement">
                Your free resource of preventive health information provided by Canadian clinicians.
                <span className="videoButton-en btn btn-link d-inline-block d-md-none px-2" test-id="en-video-button">
                  <a className='font-subHeading' onClick={this.openVideoen}>Watch Demo</a>
                </span>
              </div>
              <div className='d-flex mt-5 mt-md-4 align-items-center'>
                <button type="button" className="btn btn-primary btn-lg" onClick={this.handleChange}><b>Get started</b></button>
                <button className="videoButton-en ml-5 btn btn-link d-none d-md-block" test-id="en-video-button">
                  <a onClick={this.openVideoen}>Watch Demo</a>
                </button>
                <button type="button" className="ml-5 btn btn-outline-primary btn-lg d-inline-block d-md-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
                  Save App
                </button>
              </div>
            </section>



            {/* <div className='welcome-message-fr' test-id="fr-welcome-message">
                Bienvenue à choixsanté
              </div> */}

            <section id="landing-page-footer">
              <Row className="d-flex justify-content-center align-items-center">
                <Col xs={{ order: 2, span: 12 }} md={{ order: 1, span: 3 }} className="text-center text-md-left footer-text my-3">
                  <span>&copy; 2023 icanbewell </span>
                </Col>
                <Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 9 }} className="d-flex justify-content-center justify-content-md-end  align-items-center footer-text my-3">
                  <a href="/iCanBeWell_PrivacyPolicy.htm" test-id="privacy-statement-en">Privacy Statement </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/iCanBeWell_AboutUs.htm" test-id="aboutus-statement-en">About Us</a>
                  <span className="mx-3"> &#124; </span>
                  <a href="#" test-id="contactus-statement-en">Contact Us</a>
                </Col>
              </Row>
              <Homescreeneng openDialog={this.props.openDialog} setOpenDialog={this.props.setOpenDialog} />
              {/* <div className="landing-notice-privacystmnt-fr" test-id="fr-reliable-resource-statement">
                Rester en santé avec cette ressource créée par vos professionnels de la santé canadiens
              </div> */}

              {/* <div className="videoButton-fr" test-id="fr-video-button">
                       <a onClick={this.openVideofr}>Démonstration</a>
              </div> */}


              {/* <div className="landing-update" test-id="update-banner">
                <button className="videoButton" src={videofr} onClick={this.openVideofr}
                        test-id="update-banner-fr-video">Vidéo
                </button>
                &nbsp;&nbsp;Bienvenue Welcome&nbsp;&nbsp;
                <button className="videoButton" src={videoen}
                        onClick={this.openVideoen} test-id="update-banner-en-video">Video
                </button>
              </div> */}

              <div className="landingButtons">
                <button className="langLandButtonStyle" onClick={this.handleChange} >English</button>
                <button className="langLandButtonStyle" onClick={this.handleChange2}>Français</button>
              </div>

            </section>
          </>
        ) : (
          <div>
            <App appLanguage={this.state.language} />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(LandingPageEN);