// sideBar.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyModal from './MyModal';
import './App.css';
import './Button.css';

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //sideBar func
  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  }

  suggestedAppsClicked = () => {
        this.setState({
          isOpen: !this.state.isOpen,
          headerText: this.props.lang.side_nav_suggested_apps,
          bodyText: this.props.lang.side_nav_suggested_apps,
          buttonText: this.props.lang.config_modal_agree
        });
  }
  calculatorsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.props.lang.side_nav_calculators,
      bodyText: this.props.lang.side_nav_calculators,
      buttonText: this.props.lang.config_modal_agree
    });
  }
  disclaimerClicked = () => {
    let userInfo = {patient_provider: "patient"}

    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.props.lang.side_nav_disclaimer,
      bodyText: userInfo.patient_provider === "patient" ? this.props.lang.patientDisclaimer : this.props.lang.providerDisclaimer,
      buttonText: this.props.lang.config_modal_agree
    });
  }
  aboutClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.props.lang.side_nav_about,
      bodyText: this.props.lang.about,
      buttonText: this.props.lang.config_modal_agree
    });
  }
  settingsClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.props.lang.side_nav_settings,
      bodyText: this.props.lang.side_nav_settings,
      buttonText: this.props.lang.config_modal_agree
    });
  }

    render(){
        var spanStyle = {
          cursor: 'pointer',
          color: '#808080',
          fontSize: 30
        };

        return (
          <div>
            <div className="header" style={spanStyle}>
              <span onClick={this.openNav}> &#9776;</span>
              {/*<span onClick={(userLang) => this.selectLanguage("english")}>En/</span>
              <span onClick={(userLang) => this.selectLanguage("french")}>Fr</span>*/}
            </div>
            {/*This is your sidenav stuff*/}
            <div id="mySidenav" className="sidenav">
              <a className="closebtn" onClick={this.closeNav}>&times;</a>
              <a onClick={this.suggestedAppsClicked}>{this.props.lang.side_nav_suggested_apps}</a>
              <a onClick={this.calculatorsClicked}>{this.props.lang.side_nav_calculators}</a>
              <a onClick={this.disclaimerClicked}>{this.props.lang.side_nav_disclaimer}</a>
              <a onClick={this.aboutClicked}>{this.props.lang.side_nav_about}</a>
              <a onClick={this.settingsClicked}>{this.props.lang.side_nav_settings}</a>
            </div>

            <MyModal show={this.state.isOpen}
              onClose={this.toggleModal}
              header={this.state.headerText}
              button={this.state.buttonText}
              lang = {this.props.lang}
              age = "12">
            </MyModal>
          </div>
        )
    }
}

SideBar.propTypes = {
  lang: PropTypes.object
};

export default SideBar;
