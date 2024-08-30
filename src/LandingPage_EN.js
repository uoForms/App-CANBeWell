import React from "react";
import App from "./App";
import { PageView, initGA } from "./Tracking";
import callcompletelogo from "./assets/Logos/icanbewelllogo.png";
import videoen from "./videos/video_en.mp4";
import videofr from "./videos/video_fr.mp4";
import calleng from "./assets/Logos/icanbewelleng.png";
import callfren from "./assets/Logos/canbewellfren.png";
// import homepageimg from './assets/Banner/homepageimage.png';
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Homescreeneng from "./Homescreeneng";
// Css classses
import "./LandingPage.css";

// banner slider component file
import BannerSlider from "./components/bannerSlider";
class LandingPageEN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleHomePage = this.handleHomePage.bind(this);
  }
  handleChange() {
    this.setState({ language: "english" });
    sessionStorage.setItem("firstVisit", "false");
    localStorage.setItem("app_language", this.state.language);
  }
  handleChange2() {
    this.setState({ language: "french" });
    sessionStorage.setItem("firstVisit", "false");
    localStorage.setItem("app_language", this.state.language);
  }
  handleHomePage() {
    this.setState({ language: "" });
    localStorage.setItem("app_language", this.state.language);
  }
  //Redirect to the "/fr" route
  handleRedirect() {
    // this.props.history.push('/fr');
    window.location.href = "/fr";
  }

  openVideoen() {
    window.open(videoen);
  }
  openVideofr() {
    window.open(videofr);
  }

  componentDidMount() {
    initGA("UA-151893001-1");
  }

  render() {
    const currentDate = new Date();
    // Render nothing if the "show" prop is false
    return (
      <div className="landing-page">
        {this.state.language == "" || null ? (
          <div className="pt-3">
            <section id="landing-page-header">
              <Row className="m-0 d-flex justify-content-around align-items-center">
                <Col>
                  <img
                    className="landing-logo-header"
                    src={callcompletelogo}
                    alt="CANBeWellLogo"
                    test-id="logo"
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  {/* <Link to="fr" className="landing-french-router">Français</Link> */}
                  <a
                    href="/fr"
                    className="font-description"
                    onClick={this.handleRedirect}
                  >
                    Français
                  </a>
                </Col>
              </Row>
            </section>

            <BannerSlider language = {'english'} handleChange={this.handleChange} />

            <section className="landing-button">
              <a href="#">
                <img
                  className="landing-button-img"
                  src={calleng}
                  onClick={this.handleChange}
                  test-id="en-redirect-button"
                />
              </a>
            </section>

            <section className="primary-background res-blue-width res-blue-height-en py-3 d-flex flex-column justify-content-center ht_450">
              <div
                className="landing-notice-privacystmnt font-subHeading text-white"
                test-id="en-reliable-resource-statement"
              >
                 We provide resources to improve your well-being 
              </div>

              <div className="flex_btn">
                <a
                  href="#"
                  type="button"
                  className="btn btn-primary btn-lg btn_started btn_alginment"
                  onClick={this.handleChange}
                >
                  <b>Get Started</b>
                </a>
                {/* New code */}
                {/* <a
                                // href="#"
                                type="button"
                                className="btn btn-lg btn_started ml-10 btn_alginment container_button"
                                // onClick={this.handleChange}
                            >
                                <b>Install App</b>
                            </a>  */}

                <button
                  type="button"
                  className="btn btn-lg btn_started ml-10 btn_alginment container_button"
                  onClick={() => this.props.setOpenDialog(true)}
                  test-id="homeScreenButtonEn"
                >
                  <b>Install App</b>
                </button>
              </div>

              <div className="pad_15">
                <a
                  // href="#"
                  type="button"
                  className="btn btn_new btn-lg btn_alginment container_button1"
                  // onClick={this.handleChange}
                  href="/iCanBeWell_NoFamilyMD_NP.htm"
                  rel="noopener"
                  test-id="nofamilymd/np-statement-en"
                >
                  <b>No Family MD/NP?</b>
                </a>
              </div>
              <div className="pad_15">
                <a
                  type="button"
                  className="btn  btn_new btn-lg btn_alginment container_button1"
                  href="/iCanBeWell_CheckYourSymptoms.htm"
                  rel="noopener"
                  test-id="nofamilymd/np-statement-en"
                >
                  <b>Check Your Symptoms</b>
                </a>
              </div>
            </section>

            <section id="landing-page-footer">
              <Row className="d-flex justify-content-center align-items-center m-0 py-3">
                <Col
                  xs={{ order: 1, span: 12 }}
                  sm={{ order: 1, span: 8 }}
                  md={{ order: 2, span: 9 }}
                  className="d-flex justify-content-center align-items-center footer-text mx-0"
                >
                  {/* <a
                                type="button"
                                className="btn btn-link btn-lg font-subHeading text-center align-text-top"
                                href={videoen}
                                target="_blank"
                                test-id="update-banner-en-video"
                            >
                                Watch Demo
                            </a> */}
                  <a
                    className="text-center font-weight-bold col_grey"
                    href={videoen}
                    target="_blank"
                    test-id="update-banner-en-video"
                  >
                    Watch Demo
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a
                    href="/iCanBeWell_PrivacyPolicy.htm"
                    rel="noopener"
                    test-id="privacy-statement-en"
                    className="text-center col_grey"
                  >
                    Privacy Statement
                  </a>
                  <span className="mx-3"> &#124; </span>
                  <a
                    href="/iCanBeWell_AboutUs.htm"
                    rel="noopener"
                    test-id="aboutus-statement-en"
                    className="text-center col_grey"
                  >
                    About Us
                  </a>
                  {/* <span className="mx-3"> &#124; </span>
                                <a
                                    href="/iCanBeWell_NoFamilyMD_NP.htm"
                                    rel="noopener"
                                    test-id="nofamilymd/np-statement-en"
                                    className="text-center"
                                >
                                    No Family MD/NP
                                </a> */}
                </Col>
              </Row>
              <div className="d-flex justify-content-center my-2">
                <div className="copyright">
                  &copy; {currentDate.getFullYear()} icanbewell
                </div>
              </div>
            </section>
            <Homescreeneng
              openDialog={this.props.openDialog}
              setOpenDialog={this.props.setOpenDialog}
            />
          </div>
        ) : (
          <div>
            <App
              appLanguage={this.state.language}
              setAppLanguage={this.handleHomePage}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(LandingPageEN);
