import React from "react";
import PropTypes from "prop-types";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { GaUserEvent, PageViewTimer } from "../Tracking";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon from MUI

class TopicModal extends React.Component {
  constructor(props) {
    super(props);
  }

  getsubjectArray = (display) => {
    const Image = "./";
    var subjectArray = [];
    var bodys = display;

    const blueist = "#0089B5";

    const listItemStyle = {
      backgroundColor: "white",
      fontWeight: 700,
      borderRadius: 15,
      width: "100%",
      minHeight: 50,
      margin: "3px",
      textAlign: "left",
      padding: "10px",
      color: blueist,
      fontSize: "1.5rem", // Increase font size,
      border: `2px solid ${blueist}`,
      margin: "10px",
    };

    const handleTopicLinkClick = () => {
      let timerResult = PageViewTimer(
        this.props.userInfo.preCat,
        this.props.userInfo.preTime
      );
      let currTime = timerResult.currTime,
        timeDiff = timerResult.timeDiff;
      let currNav = "topics",
        currCat = this.props.getTopic;
      GaUserEvent(
        currNav,
        currCat,
        this.props.userInfo,
        timeDiff,
        this.props.userInfo.preTime,
        currTime,
        this.props.getTopic
      );
    };

    subjectArray.push(
      <div style={{ textAlign: "center" }}>
        <h2
          test-id="heading"
          style={{
            fontSize: "2.5rem",
            color: `${blueist}`,
            fontWeight: "bold",
          }}
        >
          {this.props.getTopic}
        </h2>
        <h3
          style={{ fontSize: "1.8rem", display: "flex", alignItems: "center" }}
        >
          {this.props.clickOnText}
          <ArrowRightIcon
            className="arrow-icon"
            style={{
              fontSize: 40,
              color: blueist,
              cursor: "pointer",
              marginLeft: "10px",
            }}
          />
        </h3>
      </div>
    );
    const expandedTextStyle = {
      color: "black", // Set color of expanded text to black
      fontSize: "1.5rem",
    };
    bodys.forEach((body) => {
      var bodyArray = body.text.split(/(\[\[|\]\]|\n|\(\<|\>\)|\{\{|\}\})/g);
      var subject = body.subject.split(/(\[\[|\]\]|\n|\(\<|\>\)|\{\{|\}\})/g);
      var subjectArrayToDisplay = [];
      var bodyArrayToDisplay = [];

      for (var i = 0; i < subject.length; i++) {
        if (subject[i] === "[[") {
          var link = subject[i + 1].split(";");
          try {
            if (link[0] === "image" || link[0] === "images") {
              var adress = Image + link[1].trim();
              subjectArrayToDisplay.push(
                <div>
                  <img className="imageFromFolder" src={adress} alt="photo" />
                </div>
              );
            } else {
              subjectArrayToDisplay.push(
                <a
                  href={link[1]}
                  target="_blank"
                  onClick={handleTopicLinkClick}
                >
                  <font color="Yellow">{link[0]}</font>
                </a>
              );
            }
            i++;
          } catch (err) {}
        } else if (subject[i] === "(<") {
          subjectArrayToDisplay.push(
            <b className="boldtext" style={{ fontSize: "1.5rem" }}>
              {subject[i + 1]}
            </b>
          );
          i++;
        } else if (subject[i] === "{{") {
          subjectArrayToDisplay.push(
            <mark className="texthighlight" style={{ fontSize: "1.5rem" }}>
              {subject[i + 1]}
            </mark>
          );
          i++;
        } else if (subject[i] === "\n") {
          subjectArrayToDisplay.push(<br />);
        } else if (subject[i] !== "]]") {
          subjectArrayToDisplay.push(
            <span style={{ fontSize: "1.5rem" }}>{subject[i]}</span>
          );
        }
      }

      for (var i = 0; i < bodyArray.length; i++) {
        if (bodyArray[i] === "[[") {
          var link = bodyArray[i + 1].split(";");
          try {
            if (link[0] === "image" || link[0] === "images") {
              var adress = Image.concat(link[1].trim());
              bodyArrayToDisplay.push(
                <div>
                  <img className="imageFromFolder" src={adress} alt="photo" />
                </div>
              );
            } else {
              bodyArrayToDisplay.push(
                <a
                  href={link[1]}
                  target="_blank"
                  onClick={handleTopicLinkClick}
                  style={{ textDecoration: "underline", color: blueist }}
                >
                  <font color={blueist}>{link[0]}</font>
                </a>
              );
            }
            i++;
          } catch (err) {}
        } else if (bodyArray[i] === "(<") {
          bodyArrayToDisplay.push(
            <b className="boldtext" style={{ fontSize: "1.5rem" }}>
              {bodyArray[i + 1]}
            </b>
          );
          i++;
        } else if (bodyArray[i] === "{{") {
          bodyArrayToDisplay.push(
            <mark className="texthighlight" style={{ fontSize: "1.5rem" }}>
              {bodyArray[i + 1]}
            </mark>
          );
          i++;
        } else if (bodyArray[i] === "\n") {
          bodyArrayToDisplay.push(<br />);
        } else if (bodyArray[i] !== "]]") {
          bodyArrayToDisplay.push(
            <span style={{ fontSize: "1.5rem" }}>{bodyArray[i]}</span>
          );
        }
      }

      subjectArray.push(
        <div className="topicBody" style={listItemStyle}>
          <details
            id={this.props.topic}
            className="mydetailsItem"
            test-id="topic"
          >
            <summary className="mysummaryItem" test-id="topicSummary">
              {subjectArrayToDisplay}
            </summary>
            <br />
            <div style={expandedTextStyle}>{bodyArrayToDisplay}</div>
            {/* {bodyArrayToDisplay} */}
          </details>
        </div>
      );
    });

    return subjectArray;
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    var subject = this.getsubjectArray(this.props.display);

    const backdropStyle = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    const myModalStyle = {
      backgroundColor: "white",
      width: "90%",
      left: "0%",
      top: "10%",
      right: "0%",
      bottom: "0",
      margin: "0 auto",
      textAlign: "left",
      padding: 20,
      color: "black",
      overflowY: "scroll",
      fontSize: "1.5rem", // Increase font size
    };

    const buttonStyle = {
      backgroundColor: "#0089B5", // Same color as feedback button
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.5rem",
    };

    return (
      <div>
        <div
          id="myBackdrop"
          onClick={this.props.onClose}
          className="backdrop"
          style={backdropStyle}
          test-id="backdrop"
        ></div>
        <div className="myModal" style={myModalStyle} test-id="bodyModal">
          <div>
            {/* <button className="button4" onClick={this.props.onClose} test-id="xButton">X</button> */}
            <Button
              sx={{
                position: "absolute",
                right: 0,
                top: 8,
              }}
              onClick={this.props.onClose}
            >
              <CloseIcon
                sx={{
                  color: "#2596be",
                  bgcolor: "#d7df21",
                  borderRadius: "16px",
                }}
              />
            </Button>
          </div>
          <div>
            {subject}
            <div className="myModalCloseButton">
              <Button
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginTop: "20px",
                  width: "100%",
                  bgcolor: "#d7df21",
                  color: "#1285a9",
                  "&:hover": {
                    bgcolor: "#d7df21", // Maintain the background color on hover
                  },
                }}
                onClick={this.props.onClose}
              >
                {this.props.button}
              </Button>
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
  userInfo: PropTypes.object,
};

export default TopicModal;
