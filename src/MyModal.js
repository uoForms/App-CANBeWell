import React from 'react';
import PropTypes from 'prop-types';
//import {setGender} from './UserInfo';
//import {setPatientProvider} from './UserInfo';
//import {setAge} from './UserInfo';
import {getUserInfo} from './UserInfo';
import './Style/Modal.css';

class MyModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //value: "",
      //selectedPatientProvider: "patient",
      //selectedGender: "",
      //allAgesSelected: false
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleGenderChange = this.handleGenderChange.bind(this);
    //this.handlePatientProviderChange = this.handlePatientProviderChange.bind(this);
    //this.handleAllAgesSelected = this.handleAllAgesSelected.bind(this);
  }

  /*handleChange(event){

    this.setState({value: event.target.value});
    setAge(Number(event.target.value));

  }

  handleAllAgesSelected(event){
      this.setState({
        allAgesSelected: !this.state.allAgesSelected
      }, () => {
        this.setState({value: this.state.allAgesSelected ? "all ages" : ""}); //Call back once setState is done
        setAge(this.state.allAgesSelected ? "all ages" : "");
      });

  }

  handlePatientProviderChange(mEvent) {


    setPatientProvider(mEvent.target.value);
    this.setState({
      selectedPatientProvider: mEvent.target.value
    });

  }

  handleGenderChange(changeEvent) {

    setGender(changeEvent.target.value);
    this.setState({
      selectedGender: changeEvent.target.value
    });

  }*/

  render() {

    // Render info about the user
    if(!this.props.show) {
      return null;
    }

    var allagescheckboxStyle = {
      display: 'block',
    };

    var checkAge = {
      display: 'block',
    };

    var myBoolean_gender = false;
    var myBoolean_age = false;
    var myBoolean_allAge = false;

    var UserInfo = getUserInfo();
    this.state.selectedPatientProvider = UserInfo.patient_provider;
    this.state.selectedGender = UserInfo.gender;
    this.state.selectAge = UserInfo.age;

    if(this.state.selectedPatientProvider == "patient"){
      allagescheckboxStyle.display = "none";
      checkAge.display = "block";
    }
    else if(this.state.selectedPatientProvider == "provider"){
      allagescheckboxStyle.display = "block";
      checkAge.display = "none";
      myBoolean_allAge = true;
    }

    if(this.state.selectedGender == "male"){
      myBoolean_gender = true;
    }
    else if(this.state.selectedGender == "female"){
      myBoolean_gender = true;
    }
    else if(this.state.selectedGender == "all_genders"){
      myBoolean_gender = true;
    }


    if((this.state.selectAge<18 && this.state.selectAge>149)){
      checkAge.display = "block";
      myBoolean_age = false;
    }
    else if((this.state.selectAge>=18 && this.state.selectAge<=149)){
      checkAge.display = "none";
      myBoolean_age = true;
    }

    const myModalStyle = {
      overflow: 'scroll',
      whiteSpace: 'pre-line'
    };


    return (
      <div className="backdrop" >
        <div className="myModal" style={myModalStyle}>
          {this.props.children}

          <div>

            <h1>{this.props.header}</h1>
            <p>{this.props.body}</p>
            <div className="myModalBody">
              {/*close button*/}
              <div className="myModalButton">
                <button onClick={this.props.onClose}>{this.props.button}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  header: PropTypes.string,
  body: PropTypes.string,
  button: PropTypes.string,
  lang: PropTypes.object
};

//this used to be the config modal. i left this here in case we want to revert
/*<div className="radio">
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

<div>
  <form>
    <div id="genderSelector" className="radio">
    {this.props.lang.gender_selector}
      <label>
        <input type="radio" value="male" checked={this.state.selectedGender == 'male'} onChange={this.handleGenderChange}/>
        {this.props.lang.male}
      </label>

      <label>
        <input type="radio" value="female" checked={this.state.selectedGender == 'female'} onChange={this.handleGenderChange} />
        {this.props.lang.female}
      </label>

      <label>
        <input type="radio" value="all_genders" checked={this.state.selectedGender == 'all_genders'} onChange={this.handleGenderChange}/>
        {this.props.lang.other}
      </label>
    </div>
  </form>
</div>*/
{/*select age*/}
/*<div >
  <form>
    <div>
      {this.props.lang.age_selector}
      <input id='abc' type="text" value={this.state.value} onChange={this.handleChange} placeholder={this.props.lang.age_selector_place_holder}/>
      <label style = {allagescheckboxStyle}>
            <input type="checkbox"  checked={this.state.allAgesSelected} onChange={this.handleAllAgesSelected}/>{this.props.lang.all_ages}
      </label>
      <label style = {checkAge}>
            <h5>{this.props.lang.age_help}</h5>
      </label>
      </div>
      </form>
</div>*/

export default MyModal;
