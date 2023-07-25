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
    // Render nothing if the "show" prop is false
    return (
      <div className="landing-page">
        {this.state.language == "" || null ? (
          <div>
            <section id="landing-page-header">
              <Row className='m-0 landing-page-header-row mt-3'>
                <Col xs={6} md={4} lg={3}>
                  <img className="landing-logo-header" src={callcompletelogo} alt="CANBeWellLogo" test-id="logo" />
                </Col>
                <section className="ml-5 pl-md-3 pl-xl-5 mt-md-4 d-block">
                  {/* <Link to="fr" className="landing-french-router">Français</Link> */}
                  <a href="/fr"
                    className="landing-french-router" onClick={this.handleRedirect}>Français</a>
                </section>
              </Row>
            </section>
            <div className="landing-update" test-id="update-banner">
              {/* <button className="videoButton" src={videofr} onClick={this.openVideofr}
                        test-id="update-banner-fr-video">Vidéo
                </button> */}
              {/*&nbsp;&nbsp; Welcome
                    {/* <button className="videoButton" src={videoen}
                        onClick={this.openVideoen} test-id="update-banner-en-video">Video
                </button> */}
              {/* <a href="#"
                className="landing-get-started" onClick={this.handleChange}>Click to get started</a> */}

            </div>
            <BannerSlider handleChange={this.handleChange} />

            {/* <div className="landing-button">
                <a href="#"><img className="landing-button-img" src={callfren} onClick={this.handleChange2}
                                 test-id="fr-redirect-button"/></a>
              </div> */}

            <div className="landing-button">
              <a href="#"><img className="landing-button-img" src={calleng} onClick={this.handleChange}
                test-id="en-redirect-button" /></a>
            </div>

            <div className="landing-notice-privacystmnt font-subHeading" test-id="en-reliable-resource-statement">
              Your free resource of preventive health information provided by Canadian clinicians.
            </div>

            <div className="d-flex justify-content-center my-3">
              <a href="#" type="button" className="btn btn-primary btn-lg" onClick={this.handleChange}><b>Get started</b></a>
              <button type="button" className="ml-2 btn btn-primary btn-lg d-inline-block d-md-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
                <b>Install App</b>
              </button>
              {/* <button type="button" className="d-inline-block d-md-none" onClick={() => this.props.setOpenDialog(true)} test-id="homeScreenButtonEn">
                Install App
              </button> */}
            </div>
            <section id="landing-page-footer">
              <Row className="d-flex justify-content-center align-items-center m-0">
                <Col xs={{ order: 1, span: 12 }} sm={{ order: 1, span: 8 }} md={{ order: 2, span: 9 }} className="d-flex justify-content-center align-items-center footer-text m-0">
                  <a className="text-brand-blue text-center" src={videoen} href="" target="_blank" rel="noopener noreferrer"
                    onClick={this.openVideoen} test-id="update-banner-en-video">
                    Video
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/iCanBeWell_PrivacyPolicy.htm" target="_blank" rel="noopener noreferrer"
                    test-id="privacy-statement-en" className='text-brand-blue text-center'>
                    Privacy Statement
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a href="/iCanBeWell_AboutUs.htm" target="_blank" rel="noopener noreferrer"
                    test-id="aboutus-statement-en" className='text-brand-blue text-center'>
                    About Us
                  </a>
                </Col>
              </Row>
            </section>

            <Homescreeneng openDialog={this.props.openDialog} setOpenDialog={this.props.setOpenDialog} />

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
export default withRouter(LandingPageEN);