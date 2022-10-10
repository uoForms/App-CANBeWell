import React from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class BodyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topicDisplayed: []
    };
  }

  getsubjectArray = (display) => {
    const Image = "./";
    var subjectArray = [];
    //kind of redendant sorry
    var topicsToDisplay = display;

    //I dont think this is a word
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
    
    topicsToDisplay.forEach((topic) => {
      var bodys = topic.body;
      //var subject = body.subject;
      subjectArray.push(
        <div>
          <h2 test-id="heading">{topic.name}</h2> <h3>{this.props.clickOnText}<ArrowRightIcon className="arrow-left" sx={{ fontSize: 40 }}/></h3>
        </div>
      );
      var k = 0;
      bodys.forEach((body) => {
        var bodyArray = body.text.split(/(\[\[|\]\]|\n)/g);
        var subject = body.subject.split(/(\[\[|\]\]|\n)/g);
        var bodyArrayToDisplay = [];
        var subjectArrayToDisplay = [];
        var outerTextToDisplay = [];
        var itemID = 0;
        var indexID = "item";
        for (var i = 0; i < subject.length; i++) {
          if (subject[i] == "[[") {
            var link = subject[i + 1].split(";");
            if (link[1] === undefined) {
              link[1] = "undefined";
            }
            //try{
            if (link[0] === "image" || link[0] === "images") {
              var adress = Image + link[1].trim();
              subjectArrayToDisplay.push(
                <div key={itemID}>
                  <img className="imageFromFolder" src={adress} alt="" />
                </div>
              );
            } else {
            /*else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
              var id = topic.name + k;
              k++;
              var mTopic = link[1].replace("topic://", "").trim();
              var outerText = this.getOuterText(mTopic);
              subjectArrayToDisplay.push(<div onClick={(idTarget) => this.togglePopUp(id)}><font color="Yellow">{link[0]}</font><div id={id} className="popup"><span className="popuptext"><p>{outerText}</p></span></div></div>);
            }
            else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
              var testId = topic.name + k;
              k++;
              var mTest = link[1].replace("test://", "").trim();
              var testOuterText = this.getOuterText(mTest);
              subjectArrayToDisplay.push(<div onClick={(idTarget) => this.togglePopUp(testId)}><font color="Yellow">{link[0]}</font><div id={testId} className="popup"><span className="popuptext"><p>{testOuterText}</p></span></div></div>);
            }*/
              subjectArrayToDisplay.push(
                <a href={link[1]} target="_blank" key={itemID}>
                  <font color="Yellow">{link[0]}</font>
                </a>
              );
            }
            i++;
            //}catch(err){}
          } else if (subject[i] == "\n") {
            subjectArrayToDisplay.push(<br />);
          } else if (subject[i] !== "]]") {
            subjectArrayToDisplay.push(subject[i]);
          }
        }

        for (var i = 0; i < bodyArray.length; i++) {
          if (bodyArray[i] == "[[") {
            var link = bodyArray[i + 1].split(";");
            try {
              if (link[0] === "image" || link[0] === "images") {
                var adress = Image + link[1].trim();
                bodyArrayToDisplay.push(
                  <div key={itemID}>
                    <img className="imageFromFolder" src={adress} alt="" />
                  </div>
                );
              } else {
              /*else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
                var id = topic.name + k;
                k++;
                var mTopic = link[1].replace("topic://", "").trim();
                var outerText = this.getOuterText(mTopic);
                subjectArrayToDisplay.push(<div onClick={(idTarget) => this.togglePopUp(id)}><font color="Yellow">{link[0]}</font><div id={id} className="popup"><span className="popuptext"><p>{outerText}</p></span></div></div>);
              }
              else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
                bodyArrayToDisplay.push(<a><font color="Yellow">{link[0]}</font></a>);
              }*/
                bodyArrayToDisplay.push(
                  <a href={link[1]} target="_blank" key={itemID}>
                    <font color="Yellow">{link[0]}</font>
                  </a>
                );
              }
              i++;
            } catch (err) {}
          } else if (bodyArray[i] == "\n") {
            bodyArrayToDisplay.push(<br />);
          } else if (bodyArray[i] !== "]]") {
            bodyArrayToDisplay.push(bodyArray[i]);
          }
        }
        indexID = indexID.concat(itemID.toString());
        subjectArray.push(
          <div className="topicBody" style={listItemStyle}>
            <details id={indexID} class="mydetailsItem" test-id="topic">
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
        itemID++;
      });
    });
    return subjectArray;
  }


  render() {

    // Render info about the user
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
      top: '6%',
      right: '0%',
      //minHeight: '40%',
      margin: '0 auto',
      textAlign: 'left',
      padding: 20,
      color: 'white',
      overflowY: 'auto'
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

BodyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  display: PropTypes.array,
  button: PropTypes.string,
  getTopic: PropTypes.func.isRequired,
};

export default BodyModal;
