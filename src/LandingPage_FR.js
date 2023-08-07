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
    const currentDate = new Date();
    // Render nothing if the "show" prop is false

    return (
      <div className="landing-page pt-3">
        {this.state.language == "" || null ? (
          <div>
            {/* <div className="center">
            <div className="landing-trans">
            TRANSGENDER Branch
            </div>
            </div> */}
            <section id="landing-page-header">
              <Row className='m-0 d-flex justify-content-around align-items-center'>
                <Col>
                  <img className="landing-logo-header" src={callcompletelogo} alt="CANBeWellLogo" test-id="logo" />
                </Col>
                <Col className='d-flex justify-content-end'>
                  {/* <Link to="/en" className="landing-french-router">English</Link> */}
                  <a href="/en"
                    className="font-description text-brand-blue" onClick={this.handleRedirect}>English</a>
                </Col>
              </Row>
            </section>

            <BannerSlider handleChange={this.handleChange} />

            <div className="landing-button">
              <a href="#"><img className="landing-button-img" src={callchoixsante} onClick={this.handleChange2}
                test-id="fr-redirect-button" /></a>
            </div>

            <section className='primary-background res-blue-width res-blue-height-fr py-3 d-flex flex-column justify-content-center'>
              <div className="landing-notice-privacystmnt font-subHeading text-white" test-id="fr-reliable-resource-statement">
                Rester en santé avec cette ressource gratuite créée par vos professionnels de la santé canadiens
                <a type="button" className="btn btn-link btn-lg font-subHeading text-center align-text-top" href={videoen} target="_blank"
                  onClick={this.openVideoen} test-id="update-banner-en-video">
                  Watch Demo
                </a>
              </div>

              <div className="d-flex justify-content-center my-4">
                <a href="#" type="button" className="btn btn-primary btn-lg" onClick={this.handleChange2}><b>Commencer</b></a>
                <button type="button" className="ml-2 btn btn-outline-primary btn-lg d-inline-block d-md-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
                  <b>Installer l'application</b>
                </button>
              </div>
            </section>

            <section id="landing-page-footer">
              <Row className="d-flex justify-content-center align-items-center m-0 py-1">
                <Col xs={{ order: 1, span: 10 }} sm={{ order: 1, span: 8 }} md={{ order: 2, span: 9 }} className="d-flex justify-content-center align-items-center footer-text mt-3 mx-0">
                  <a className="text-brand-blue text-center font-weight-bold" src={videofr} href="" target="_blank" rel="noopener noreferrer"
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
              <div className="d-flex justify-content-center my-2">
                <div className="copyright">
                  &copy; {currentDate.getFullYear()} choix santé
                </div>
              </div>
            </section>
            <Homescreenfren openDialog={this.props.openDialog} setOpenDialog={this.props.setOpenDialog} />
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