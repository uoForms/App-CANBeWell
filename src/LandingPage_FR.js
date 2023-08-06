import React from 'react';
import App from './App';
import { PageView, initGA } from './Tracking';
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

// CSS classes
import './LandingPage.css';
// banner slider component file
import BannerSlider from './components/bannerSlider';
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
    // this.props.history.push('/');
    window.location.href = '/';
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
                  {/* <Link to="/en" className="landing-french-router">English</Link> */}
                  <a href="/en"
                    className="landing-french-router" onClick={this.handleRedirect}>English</a>
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

            </div>

            <BannerSlider handleChange={this.handleChange} />

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
            <section className='primary-background res-blue-width py-3'>
              <div className="landing-notice-privacystmnt font-subHeading text-white" test-id="fr-reliable-resource-statement">
                Rester en santé avec cette ressource gratuite créée par vos professionnels de la santé canadiens
              </div>

              <div className="d-flex justify-content-center my-5">
                <a href="#" type="button" className="btn btn-primary btn-lg" onClick={this.handleChange2}><b>Commencer</b></a>
                <button type="button" className="ml-2 btn btn-outline-primary btn-lg d-inline-block d-md-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
                  <b>Installer l'application</b>
                </button>
              </div>
            </section>

            <section id="landing-page-footer">
              <Row className="d-flex justify-content-center align-items-center m-0">
                <Col xs={{ order: 1, span: 10 }} sm={{ order: 1, span: 8 }} md={{ order: 2, span: 9 }} className="d-flex justify-content-center align-items-center footer-text my-3 mx-0">
                  <a className="text-brand-blue text-center" src={videofr} href="" target="_blank" rel="noopener noreferrer"
                    onClick={this.openVideofr} test-id="update-banner-fr-video">Vidéo
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/politiquedeconfidentialite.htm" target="_blank" rel="noopener noreferrer"
                    test-id="privacy-statement-fr" className='text-brand-blue privacyFr text-center'>
                    Politique de confidentialité
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/iCanBeWell_àproposdenous.htm" target="_blank" rel="noopener noreferrer"
                    test-id="aboutus-statement-fr" className='text-brand-blue text-center'>
                    À propos de nous
                  </a>
                </Col>
              </Row>
            </section>

            <div className="d-flex justify-content-center my-5">
              <div className="copyright">
                &copy; 2023 icanbewell
              </div>
            </div>


            <Homescreenfren openDialog={this.props.openDialog} setOpenDialog={this.props.setOpenDialog} />

            {/* <div className="landingButtons">
              <button className="langLandButtonStyle" onClick={this.handleChange} >English</button>
              <button className="langLandButtonStyle" onClick={this.handleChange2}>Français</button>
            </div> */}
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