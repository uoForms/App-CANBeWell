import React from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { GaUserEvent, PageViewTimer } from '../Tracking';

class TopicModal extends React.Component {

  constructor(props) {
    super(props);
  }

getsubjectArray=(display)=>{
    const Image = "./";
    //all the subjects
    var subjectArray = [];
    var bodys = display;
    
    const blueist = '#0089B5';

    const listItemStyle = {
      backgroundColor: blueist,
      fontWeight: 300,
      borderRadius: 15,
      width: '100%',
      minHeight: 50,
      margin: '3px',
      textAlign: 'left',
      padding: '10px',
      color: 'white'
    };

    //function to handle the onClick event for external links
    const handleTopicLinkClick=() =>{
      let timerResult = PageViewTimer(
        this.props.userInfo.preCat,
        this.props.userInfo.preTime);
      let currTime = timerResult.currTime,
        timeDiff= timerResult.timeDiff;
      let currNav= "topics", currCat= this.props.getTopic;
      GaUserEvent(currNav, currCat, this.props.userInfo, timeDiff, this.props.userInfo.preTime, currTime, this.props.getTopic);
    }

    subjectArray.push(<div><h2 test-id="heading">{this.props.getTopic}</h2> <h3>{this.props.clickOnText}<ArrowRightIcon className="arrow-left" sx={{ fontSize: 40 }}/></h3></div>);
    bodys.forEach((body) => {      
      var bodyArray = body.text.split(/(\[\[|\]\]|\n|\(\<|\>\)|\{\{|\}\})/g);
      var subject = body.subject.split(/(\[\[|\]\]|\n|\(\<|\>\)|\{\{|\}\})/g);
      var bodyArrayToDisplay = [];
      var subjectArrayToDisplay = [];
      var outerTextToDisplay = [];

      for (var i = 0; i < subject.length; i++) {
        if (subject[i] == '[[') {
          var link = subject[i + 1].split(';');
          try {
            if (link[0] === "image" || link[0] === "images") {
              var adress = Image + link[1].trim();
              subjectArrayToDisplay.push(<div><img className="imageFromFolder" src={adress} alt="photo" /></div>);
            }
            else {
              subjectArrayToDisplay.push(<a href={link[1]} target="_blank" onClick={() =>handleTopicLinkClick()}><font color="Yellow">{link[0]}</font></a>);
            }
            i++;
          } catch (err) { }
        }
        else  if(subject[i] == '(<'){
          subjectArrayToDisplay.push(<b className='boldtext'>{subject[i+1]}</b>);
          i++;
        }
        else  if(subject[i] == '{{'){
          subjectArrayToDisplay.push(<mark class="texthighlight">{subject[i+1]}</mark>);
          i++;
        }
        else if (subject[i] == '}}' || subject[i] == '>)') {
          subjectArrayToDisplay.push('');
        }
        else if (subject[i] == '\n') {
          subjectArrayToDisplay.push(<br />);
        }
        else if (subject[i] !== ']]') {
          subjectArrayToDisplay.push(subject[i]);
        }

      }

      for (var i = 0; i < bodyArray.length; i++) {
        if (bodyArray[i] == '[[') {
          var link = bodyArray[i + 1].split(';');

          try {
            if (link[0] === "image" || link[0] === "images") {
              var adress = Image.concat(link[1].trim());
              bodyArrayToDisplay.push(<div><img className="imageFromFolder" src={adress} alt="photo" /></div>);
            }
            else {
              if (link[1] == null) {
                bodyArrayToDisplay.push(<a href={link[0]} target="_blank" onClick={() =>handleTopicLinkClick()}><font color="Yellow">{link[0]}</font></a>);
              }
              else {
                bodyArrayToDisplay.push(<a href={link[1]} target="_blank" onClick={() =>handleTopicLinkClick()}><font color="Yellow">{link[0]}</font></a>);
              }
            }
            i++;
          } catch (err) { }
        }
        else  if(bodyArray[i] == '(<'){
          bodyArrayToDisplay.push(<b className='boldtext'>{bodyArray[i+1]}</b>);
          i++;
        }
        else  if(bodyArray[i] == '{{'){
          bodyArrayToDisplay.push(<mark class="texthighlight">{bodyArray[i+1]}</mark>);
          i++;
        }
        else if (bodyArray[i] == '}}' || bodyArray[i] == '>)') {
          bodyArrayToDisplay.push('');
        } 
        else if (bodyArray[i] == '\n') {
          bodyArrayToDisplay.push(<br />);
        }
        else if (bodyArray[i] !== ']]') {
          bodyArrayToDisplay.push(bodyArray[i]);
        }
      }
      subjectArray.push(
        <div className="topicBody" style={listItemStyle}>
          <details id={this.props.topic} class="mydetailsItem" test-id="topic">
            <summary class="mysummaryItem" test-id="topicSummary">
              <font size="+1">
                {/*<p> <b> */}
                {subjectArrayToDisplay}
                {/* </b> </p>*/}
              </font>
            </summary>
            <br />
            {bodyArrayToDisplay}
            {outerTextToDisplay}
          </details>
        </div>
      );
    });
return subjectArray;
}

  render() {
    if (!this.props.show) {
      return null;
    }
    var subject = [];
    subject = this.getsubjectArray(this.props.display);
    // The gray background
    const backdropStyle = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      //zIndex: 3,
    };

    // The modal "window"
    const myModalStyle = {
      backgroundColor: '#808080',
      width: '90%',
      left: '0%',
      top: '10%',
      right: '0%',
      //minHeight: '40%',
      margin: '0 auto',
      textAlign: 'left',
      padding: 20,
      color: 'white',
      overflowY: 'scroll'
    };

    return (
      <div>
        <div id="myBackdrop" onClick={this.props.onClose} className="backdrop" style={backdropStyle} test-id="backdrop">
        </div>
        <div className="myModal" style={myModalStyle} test-id="bodyModal">
          <div>
            <button className="button4" onClick={this.props.onClose} test-id="xButton">X</button>
          </div>
          <div>
            {subject}
            <div className="myModalCloseButton">
              <button className="button3" test-id="closeTextButton" onClick={this.props.onClose}>{this.props.button}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopicModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  display: PropTypes.array,
  button: PropTypes.string,
  getTopic: PropTypes.string,
  userInfo: PropTypes.object
};

export default TopicModal;