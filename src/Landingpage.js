import React from 'react';

import App from './App';
import { PageView, initGA } from './Tracking';
import './LandingPage.css';
import calllogo from './assets/Logos/logo_03-02.png';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { db } from './firebase';
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
    console.log(db);
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
                  <Card.Title style={{ textAlign: 'left'}}>
                  Do you want to be healthy and prevent disease? If yes, this Canadian app is for YOU! 
                  </Card.Title>
                </Card.Body>
              </Card>
              </Col>
              <Col xs={6}>
              <Card border="light" style={{ border: 0, width: '45vw' }}>
                <Card.Body>
                 <Card.Title style={{ textAlign: 'left'}}>
                 Voulez-vous être en santé et prévenir les maladies? Si oui utilisez cette appli canadienne !
                 </Card.Title>
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