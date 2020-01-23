import React from 'react';

import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_03-02.png';
import { Card, Row, Col, Container } from 'react-bootstrap';
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
    //console.log("test:" + localStorage.getItem("app_language"));
    //console.log("test:" + this.state.language);
    return (
      <div class="landing-page">
        {this.state.language == "" || null ? (
          <div>
            <Container>
            <Row>
            <Col xs={6}>
              <Card border="light" style={{ border: 0 ,width: '45vw'}}>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'left'}}>Do not use this app for health advice.<br /></Card.Title>
                  <Card.Text style={{ textAlign: 'left'}}>It is still under development.
                    Ask your health care provider for all health advice.
              </Card.Text>
                </Card.Body>
              </Card>
              </Col>
              <Col xs={6}>
              <Card border="light" style={{ border: 0, width: '45vw' }}>
                <Card.Body>
                 <Card.Title style={{ textAlign: 'left'}}>Ne pas utiliser cette application pour des conseils de santé.</Card.Title>
                 <Card.Text style={{ textAlign: 'left'}}>L’appli  est encore en développement.
                    Veuillez consulter votre professionnel de la santé.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
              </Row>
            </Container>
            <div class="center">
              <img class="landing-logo" src={calllogo} alt="CANBeWellLogo" />
            </div>
            <div className="langButton">
              <button class="langButtonStyle" onClick={this.handleChange} >English </button>
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