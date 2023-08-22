import React from 'react';
import App from './App';
import { PageView, initGA } from './Tracking';
import callcompletelogo from './assets/Logos/icanbewelllogo.png';
import videoen from './videos/video_en.mp4';
import videofr from './videos/video_fr.mp4';
import calleng from './assets/Logos/icanbewelleng.png';
import callfren from './assets/Logos/canbewellfren.png';
// import homepageimg from './assets/Banner/homepageimage.png';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Homescreeneng from './Homescreeneng';
// Css classses
import './LandingPage.css';

// banner slider component file
import BannerSlider from './components/bannerSlider';
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
    this.handleHomePage = this.handleHomePage.bind(this);
  }
  handleChange() {
    this.setState({ language: "english" })
    localStorage.setItem("app_language", this.state.language);
  }
  handleChange2() {
    this.setState({ language: "french" })
    localStorage.setItem("app_language", this.state.language);
  }
  handleHomePage() {
    this.setState({ language: "" })
    localStorage.setItem("app_language", this.state.language)
  }
  //Redirect to the "/fr" route
  handleRedirect() {
    // this.props.history.push('/fr');
    window.location.href = '/fr';
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
      <div className="landing-page">
        {this.state.language == "" || null ? (
          <div className="pt-3">
            <section id="landing-page-header">
              <Row className='m-0 d-flex justify-content-around align-items-center'>
                <Col>
                  <img className="landing-logo-header" src={callcompletelogo} alt="CANBeWellLogo" test-id="logo" />
                </Col>
                <Col className='d-flex justify-content-end'>
                  {/* <Link to="fr" className="landing-french-router">Français</Link> */}
                  <a href="/fr"
                    className="font-description" onClick={this.handleRedirect}>Français</a>
                </Col>
              </Row>
            </section>

            <BannerSlider handleChange={this.handleChange} />

            <section className="landing-button">
              <a href="#"><img className="landing-button-img" src={calleng} onClick={this.handleChange}
                test-id="en-redirect-button" /></a>
            </section>

            <section className='primary-background res-blue-width res-blue-height-en py-3 d-flex flex-column justify-content-center'>
              <div className="landing-notice-privacystmnt font-subHeading text-white" test-id="en-reliable-resource-statement">
                Your free resource of preventive health information provided by Canadian clinicians.
                <a type="button" className="btn btn-link btn-lg font-subHeading text-center align-text-top" href={videoen} target="_blank"
                  onClick={this.openVideoen} test-id="update-banner-en-video">
                  Watch Demo
                </a>
              </div>

              <div className="d-flex justify-content-center my-4" >
                <a href="#" type="button" className="btn btn-primary btn-lg" onClick={this.handleChange}><b>Get started</b></a>
                <button type="button" className="ml-2 btn btn-outline-primary btn-lg d-inline-block d-xl-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
                  <b>Install App</b>
                </button>
              </div>
            </section>


            <section id="landing-page-footer">
              <Row className="d-flex justify-content-center align-items-center m-0 py-3">
                <Col xs={{ order: 1, span: 12 }} sm={{ order: 1, span: 8 }} md={{ order: 2, span: 9 }} className="d-flex justify-content-center align-items-center footer-text mx-0">
                  <a className="text-center font-weight-bold" href={videoen} target="_blank" rel="noopener"
                    onClick={this.openVideoen} test-id="update-banner-en-video">
                    Watch Demo
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/iCanBeWell_PrivacyPolicy.htm" target="_blank" rel="noopener"
                    test-id="privacy-statement-en" className='text-center'>
                    Privacy Statement
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/iCanBeWell_AboutUs.htm" target="_blank" rel="noopener"
                    test-id="aboutus-statement-en" className='text-center'>
                    About Us
                  </a>
                </Col>
              </Row>
              <div className="d-flex justify-content-center my-2">
                <div className="copyright">
                  &copy; {currentDate.getFullYear()} icanbewell
                </div>
              </div>
            </section>
            <Homescreeneng openDialog={this.props.openDialog} setOpenDialog={this.props.setOpenDialog} />
          </div>
        ) : (
          <div>
            <App appLanguage={this.state.language} setAppLanguage={this.handleHomePage} />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(LandingPageEN);