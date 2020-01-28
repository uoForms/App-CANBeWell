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
                  <Card.Title style={{ textAlign: 'left'}}>
                    •	Do you want to be healthy? If yes, this Canadian app is for YOU!  <br />
                    •	Did you know that health advice in Canada is different from other countries? And it changes with time? 
                    </Card.Title>
                  <Card.Text style={{ textAlign: 'left'}}>We find the best science for being healthy and update this app regularly. Start by choosing your language below.
              </Card.Text>
                </Card.Body>
              </Card>
              </Col>
              <Col xs={6}>
              <Card border="light" style={{ border: 0, width: '45vw' }}>
                <Card.Body>
                 <Card.Title style={{ textAlign: 'left'}}>
                  •	Voulez-vous être en santé? Si oui utilisez cette appli canadienne !<br />
                  •	Saviez-vous que les conseils pour la santé sont différents au Canada qu’ailleurs? Et que ces conseils changent souvent?
                 </Card.Title>
                 <Card.Text style={{ textAlign: 'left'}}>
                 Ici nous résumons les conseils basés sur la science et nous faisons une mise a jour régulière. Choisissez votre langue préférée pour commencer. 
                 </Card.Text>
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