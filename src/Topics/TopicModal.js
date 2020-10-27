import React from 'react';
import PropTypes from 'prop-types';

class TopicModal extends React.Component {

  constructor(props) {
    super(props);
  }

getsubjectArray=(display)=>{
    const Image = "./";
    //all the subjects
    var subjectArray = [];
    var bodys = display;
    
    const blueist = '#27AAE1';

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
    subjectArray.push(<div><h3>{this.props.getTopic}</h3></div>);
    bodys.forEach((body) => {      

      var bodyArray = body.text.split(/(\[\[|\]\]|\n)/g);
      var subject = body.subject.split(/(\[\[|\]\]|\n)/g);
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
              subjectArrayToDisplay.push(<a href={link[1]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
            }
            i++;
          } catch (err) { }
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
                bodyArrayToDisplay.push(<a href={link[0]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
              }
              else {
                bodyArrayToDisplay.push(<a href={link[1]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
              }
            }
            i++;
          } catch (err) { }
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
          <details id={this.props.topic} class="mydetailsItem">
            <summary class="mysummaryItem">
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
        <div id="myBackdrop" onClick={this.props.onClose} className="backdrop" style={backdropStyle}>
        </div>
        <div className="myModal" style={myModalStyle}>
          <div>
            <button className="button4" onClick={this.props.onClose}>X</button>
          </div>
          <div>
            {subject}
            <div className="myModalCloseButton">
              <button className="button3" onClick={this.props.onClose}>{this.props.button}</button>
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
  getTopic: PropTypes.func.isRequired,
};

export default TopicModal;
