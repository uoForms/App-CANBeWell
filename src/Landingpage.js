import React from 'react';
import PropTypes from 'prop-types';
import App from './App';
import calllogo from './assets/Logos/logo_03-02.png';


class LandingPage extends React.Component {

    constructor(props) {
        super(props);
     this.state={
       language:""
     }
  this.handleChange= this.handleChange.bind(this);
  this.handleChange2= this.handleChange2.bind(this);
  
    }
    handleChange(){
        this.setState({language:"english"})
        localStorage.setItem("app_language",this.state.language);
        return (<App app_language={this.state.language}/>)
    }
    handleChange2(){
        this.setState({language:"french"})
        localStorage.setItem("app_language",this.state.language);
    }
    
  render() {
    // Render nothing if the "show" prop is false
   console.log("test:"+localStorage.getItem("app_language"));
   console.log("test:"+this.state.language);
      return (

            <div>
           
           {this.state.language =="" || null ?(
                   <div>
  <div><img  src={calllogo} alt="CANBeWellLogo"/></div>
        
        <div class="langButton">
   
            
                <button class="langButtonStyle" onClick={this.handleChange} >English</button>
            
               <button class="langButtonStyle" onClick={this.handleChange2}>Francais</button>
           
            </div>
                   </div>
                 ):(
                   <div><App appLanguage={this.state.language}/> </div>
                 )}
               
             </div>
         
      );
   
}}


export default LandingPage;
