import React from 'react';
import PropTypes from 'prop-types';
import '../Button.css';
//import BodyModal from './BodyModal';
import BodyHelpModal from './BodyHelpModal';
import Anatomy from './anatomicalView';
import '../App.css';


class MyBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      help: false,
      isOpen: false,
      width: 0,
      height: 0,
      display: [{ name: "", body: [{ subject: "", text: "" }] }],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleHelp = () => {
    this.setState({
      help: !this.state.help
    });
  }

  helpClicked = () => {
    this.setState({
      help: !this.state.help,
      headerText: "Help",
      bodyText: "Here what you need to do on page Body",
      buttonText: "Got It?",
      displayConfigOption: false
    });
  }


  render() {

    if (!this.props.showBody) {
      return null;
    }

    return (

      <div>

        {/*<button className="button button2" onClick={this.helpClicked}>?</button> */}

        <div align="center"><h4 className="instruction">{this.props.lang.body_general_instruction}</h4></div>
        <div>
          <Anatomy 
            gender={this.props.userConfig.gender} 
            userInfo={this.props.userConfig} 
            getDisplay={this.props.getText} 
            lang={this.props.lang}
            pageViewStateUpdater = {this.pageViewStateUpdater}
            ></Anatomy>
        </div>

        <BodyHelpModal
          show={this.state.help}
          onClose={this.toggleHelp}
          header={this.state.headerText}
          body={this.state.bodyText}
          button={this.state.buttonText}>
        </BodyHelpModal>


      </div>
    );
  }
}

MyBody.propTypes = {
  showBody: PropTypes.bool,
  userConfig: PropTypes.object,
  getText: PropTypes.func.isRequired,
  lang: PropTypes.object
};

export default MyBody;
