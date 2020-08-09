import React from 'react';
import PropTypes from 'prop-types';

import { PageViewTimer, GaUserEvent } from '../Tracking';
import '../Button.css';
import TopicsModal from './TopicsModal';
import TopicListFR from '../JSONFolder/HtmlTopic-FR.json';
import TopicListEN from '../JSONFolder/HtmlTopic-EN.json';

class Topics extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      isOpen: false,
      TopicList: this.props.userConfig.language == "french" ? TopicListFR : TopicListEN
    }
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  }

  helpClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.props.lang.topic_help_header,
      bodyText: this.props.lang.topic_help_body,
      buttonText: this.props.lang.config_modal_agree,
    });
  }

  render() {

    if (!this.props.showTopics) {
      return null;
    }
    console.log("propsTOPICS:::",this.props,"proptypes::",PropTypes);
    return (
      <div>
        {/*your help button in the right hand corner*/}
        {/*<button className="button button2" onClick={this.helpClicked}>?</button>*/}

        <FilterableTopicTable 
          topics={this.props.data(this.state.TopicList, this.props.userConfig)} 
          userConfig={this.props.userConfig}
          text={this.props.lang.topic_search_bar_placeholder} 
          pageViewStateUpdater = {this.pageViewStateUpdater}
          btnText={this.props.lang.close_body_modal}
          onClose={this.props.onClose}
          />

        {/*help dialog box*/}
        <TopicsModal show={this.state.isOpen}
          onClose={this.toggleModal}
          header={this.state.headerText}
          body={this.state.bodyText}
          button={this.state.buttonText}
          displayConfig={this.state.displayConfigOption}>
        </TopicsModal>
      </div>
    );
  }
}

Topics.propTypes = {
  onClose: PropTypes.func.isRequired,
  showTopics: PropTypes.bool,
  userConfig: PropTypes.object,
  data: PropTypes.func.isRequired,
  lang: PropTypes.object,
};

class TopicRow extends React.Component {

  constructor(props) {
    super(props);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  }

  
  rowToggled = ( title ) => {
    let timerResult = PageViewTimer(
      this.props.userInfo.preCat,
      this.props.userInfo.preTime);
    let currTime = timerResult.currTime,
      timeDiff = timerResult.timeDiff;
    let currNav = "topics", currCat = title;
    GaUserEvent(currNav, currCat, this.props.userInfo, timeDiff, this.props.userInfo.preTime, currTime);
    this.props.pageViewStateUpdater(currNav, currCat, currTime);
    //this.setState({
          //this.props.isOpen= !this.props.isOpen,
          //this.props.show=this.props.isOpen
        //});
  }

  render() {
    const Image = "./";
    console.log("props:::",this.props,"proptypes::",PropTypes);
    //all the subjects
    var sujectArray = [];
    var bodys = this.props.topic.body;
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
            /*else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
              link[1] = link[1].replace('topic://', '').trim();
              subjectArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }
            else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
              link[1] = link[1].replace('test://', '').trim();
              subjectArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }*/
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
            /*else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
              link[1] = link[1].replace('topic://', '').trim();
              bodyArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }
            else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
              link[1] = link[1].replace('test://', '').trim();
              bodyArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }*/
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
      // sujectArray.push(<div className="topicBody"><b>{subjectArrayToDisplay}<br /></b>{bodyArrayToDisplay}</div>);
      sujectArray.push(
        <div className="topicBody" style={listItemStyle}>
          <details id={this.props.topic.name} class="mydetailsItem">
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


    return (
      // sujectArray.push(<div className="topicBody" >
      <details 
        id={this.props.topic.name} class="mydetailsItem"
        onToggle={() => this.rowToggled(this.props.topic.name)}
      >
        <summary>
          <font size="+1">
            <b>{this.props.topic.name}</b>
          </font>
        </summary>
        <div>
        <div id="myBackdrop" onClick={this.props.onClose} className="backdrop" style={backdropStyle}>
          <div>
            <button className="button4" onClick={this.props.onClose}>X</button>
          </div>
        </div>
        <div className="myModal" style={myModalStyle}>
          <div>
            {sujectArray}
            <div className="myModalCloseButton">
              <button className="button3" onClick={this.props.onClose}>{this.props.btnText}</button>
            </div>
          </div>
        </div>
      </div>
      </details>
      // </div>
      // )
    );
  }
}


class TopicTable extends React.Component {
  constructor(props) {
    super(props);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }
  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  }
  render() {
    console.log("propsFILTERTOPICSTABLE:::",this.props,"proptypes::",PropTypes);
    const backdroplistItemStyle = {
      padding: 5
    };

    //I dont think this is a word
    const blueist = '#27AAE1';

    const listItemStyle = {
      backgroundColor: blueist,
      fontWeight: 300,
      borderRadius: 15,
      width: '99%',
      minHeight: 50,
      margin: '0 auto',
      textAlign: 'left',
      padding: 10,
      color: 'white'
    };

    var rows = [];
    var index = 0;
    /*This is where you filter the content to display by comparing the what the user enter and the contend of the json file*/
    this.props.topics.forEach((topic) => {
      if (topic.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(<div key={index} style={backdroplistItemStyle}>
        <div style={listItemStyle}>
          <TopicRow 
            topic={topic}
            userInfo={this.props.userConfig} 
            pageViewStateUpdater = {this.pageViewStateUpdater}
            btnText={this.props.btnText}
            onClose={this.props.onClose}
            />
        </div>
      </div>);
      index++;
    });
    return (
      <div className='table'>
        {rows}
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control searchbar"
          type="text"
          placeholder={this.props.text}
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterableTopicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  render() {
    console.log("propsFILTERTOPICS:::",this.props,"proptypes::",PropTypes);
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
          text={this.props.text}
        />
        <TopicTable
          topics={this.props.topics}
          userConfig={this.props.userConfig}
          filterText={this.state.filterText}
          pageViewStateUpdater = {this.pageViewStateUpdater}
          btnText={this.props.btnText}
          onClose={this.props.onClose}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  text: PropTypes.string,
};
FilterableTopicTable.propTypes = {
  text: PropTypes.string,
};

export default Topics;
