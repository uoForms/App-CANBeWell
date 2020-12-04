import React from 'react';
import PropTypes from 'prop-types';
//import {setGender} from './UserInfo';
//import {setPatientProvider} from './UserInfo';
//import {setAge} from './UserInfo';
import {getUserInfo} from './UserInfo';
//import DisclaimerText from './Disclaimer.json';
import './Style/checkbox.css';

class InstructionModal extends React.Component {

  constructor(props) {
    super(props);

    setPatientProvider('patient');
    this.state = {
      selectedPatientProvider: 'patient',
      allAgesSelected: false,
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePatientProviderChange = this.handlePatientProviderChange.bind(this);
    this.handleAllAgesSelected = this.handleAllAgesSelected.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    setAge(Number(event.target.value));

  }

  goBack() {
    window.location.href = './index.html';
  }

  handlePatientProviderChange(event) {

    if (event.target.value == "patient") {
      document.getElementById("disclaimer").innerHTML = this.props.lang.patientDisclaimer;
      document.getElementById("genderSelector").style.display = "block";
    }
    else if (event.target.value == "provider") {
      document.getElementById("disclaimer").innerHTML = this.props.lang.providerDisclaimer;
      document.getElementById("genderSelector").style.display = "block";
    }
    setPatientProvider(event.target.value);

    this.setState({
      selectedPatientProvider: event.target.value,
    });

  }

  handleAllAgesSelected(event) {

    this.setState({
      allAgesSelected: !this.state.allAgesSelected
    }, () => {
      this.setState({ value: this.state.allAgesSelected ? "all ages" : "" }); //Call back once setState is done
      setAge(this.state.allAgesSelected ? "all ages" : "");

    });
  }

  handleGenderChange(changeEvent) {

    setGender(changeEvent.target.value);
    this.setState({
      selectedGender: changeEvent.target.value
    });

  }

  render() {

    // Render intruction view
    if (!this.props.show) {
      return null;
    }

    var allagescheckboxStyle = {
      display: 'block',
    };

    var checkAge = {
      display: 'block',
    };


    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: '10px'
    };

    // The modal "window"
    const myModalStyle = {
      backgroundColor: '#fff',
      maxWidth: '99%',
      minHeight: '95%',
      margin: '0 auto',
      textAlign: 'center',
      padding: 10,
      fontSize: '20px',
      overflow: 'scroll',
    };

    // The modal "window"
    const myDisclaimerStyle = {
      maxWidth: '90%',
      maxHeight: '150px',
      margin: '0 auto',
      textAlign: 'center',
      padding: 10,
      overflowY: 'scroll',
      overflowX: 'hidden',
      background: '#f2f2f2',
      fontSize: '15px'
    };

    var UserInfo = getUserInfo();
    this.state.selectedPatientProvider = UserInfo.patient_provider;
    this.state.selectedGender = UserInfo.gender;
    this.state.selectAge = UserInfo.age;
    var myBoolean_age = false;
    var myBoolean_gender = false;
    var myBoolean_allAge = false;


    if (this.state.selectedPatientProvider == "patient") {
      allagescheckboxStyle.display = "none";
      checkAge.display = "block";
    }
    else if (this.state.selectedPatientProvider == "provider") {
      allagescheckboxStyle.display = "block";
      checkAge.display = "none";
      myBoolean_allAge = true;
    }

    if (this.state.selectedGender == "male") {
      myBoolean_gender = true;
    }
    else if (this.state.selectedGender == "female") {
      myBoolean_gender = true;
    }
    else if (this.state.selectedGender == "all_genders") {
      myBoolean_gender = true;
    }

    if ((this.state.selectAge < 18 && this.state.selectAge > 150)) {
      checkAge.display = "block";
      myBoolean_gender = false;
    }
    else if ((this.state.selectAge >= 18 && this.state.selectAge <= 150)) {
      checkAge.display = "none";
      myBoolean_age = true;
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="myModal" style={myModalStyle}>

          <div className="footer">
            <p>{this.props.lang.instruction_modal_header}</p>

            {/*select user*/}
            <div className="radio">
              <form>
                {this.props.lang.user_selector}
                <label>
                  <input type="radio" value="patient" checked={this.state.selectedPatientProvider === 'patient'} onChange={this.handlePatientProviderChange} />
                  {this.props.lang.patient}
                </label>
                <label>
                  <input type="radio" value="provider" checked={this.state.selectedPatientProvider === 'provider'} onChange={this.handlePatientProviderChange} />
                  {this.props.lang.provider}
                </label>
              </form>
            </div>
            {/*select gender*/}
            <div>
              <form>
                <div id="genderSelector" className="radio">
                  {this.props.lang.gender_selector}
                  <label>
                    <input type="radio" value="male" checked={this.state.selectedGender == 'male'} onChange={this.handleGenderChange} />
                    {this.props.lang.male}
                  </label>

                  <label>
                    <input type="radio" value="female" checked={this.state.selectedGender == 'female'} onChange={this.handleGenderChange} />
                    {this.props.lang.female}
                  </label>

                  {/* {this.state.selectedPatientProvider === 'provider' || null ?
                    (<label>
                      <input type="radio" value="all_genders" checked={this.state.selectedGender == 'all_genders'} onChange={this.handleGenderChange} />
                      {this.props.lang.other}
                    </label>) : (<label></label>)
                    } */}
                </div>
              </form>
            </div>
            {/*select age*/}
            <div >
              <form>
                <div>
                  {this.props.lang.age_selector}
                  <input id='abc' type="text" value={this.state.value} onChange={this.handleChange} placeholder={this.props.lang.age_selector_place_holder} />
                  <label style={allagescheckboxStyle}>
                    <input type="checkbox" checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected} />{this.props.lang.all_ages}
                  </label>
                  <label style={checkAge}>
                    <h5>{this.props.lang.age_help}</h5>
                  </label>
                </div>
              </form>
            </div>
            <div>
              <button onClick={this.props.onClose} disabled={!(myBoolean_gender && (myBoolean_age || myBoolean_allAge))}>{this.props.lang.agree}</button>
              <button onClick={this.goBack} type="button">{this.props.lang.disagree}</button>
            </div>
            <b>{this.props.lang.disclaimer_header}</b>
            <div style={myDisclaimerStyle}>
              <p id="disclaimer">{this.props.lang.patientDisclaimer}</p>
            </div>

            <div>
              <button onClick={this.props.onClose} disabled={!(myBoolean_gender && (myBoolean_age || myBoolean_allAge))}>{this.props.lang.agree}</button>
              <button onClick={this.goBack} type="button">{this.props.lang.disagree}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InstructionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  //permision: PropTypes.bool,
  //giveThePermissionToClose: PropTypes.func.isRequired,
  onSelectLang: PropTypes.func.isRequired,
  lang: PropTypes.object
};

export default InstructionModal;
