import React from 'react';
import PropTypes from 'prop-types';

import { PageViewTimer, GaUserEvent } from '../Tracking';
import '../Button.css';
import TopicsModal from './TopicsModal';
import TopicListFR from '../JSONFolder/HtmlTopic-FR.json';
import TopicListEN from '../JSONFolder/HtmlTopic-EN.json';
import TopicModal from './TopicModal';

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
    this.state =
    {
      isOpen: false,
      display: [],
    }
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }  
  rowClicked = ( title ) => {
    let timerResult = PageViewTimer(
      this.props.userInfo.preCat,
      this.props.userInfo.preTime);
    let currTime = timerResult.currTime,
      timeDiff = timerResult.timeDiff;
    let currNav = "topics", currCat = title;
    GaUserEvent(currNav, currCat, this.props.userInfo, timeDiff, this.props.userInfo.preTime, currTime);
    this.props.pageViewStateUpdater(currNav, currCat, currTime);
    this.setState({
      isOpen: !this.state.isOpen,
      display: this.props.topic.body
    });
  }
  render() {  

    return (
      <div>
      <div
        id={this.props.topic.name} class="mydetailsItemdiv"
        onClick={() => this.rowClicked(this.props.topic.name)}
        >{this.props.topic.name}</div>

        <div>
            <TopicModal 
              show={this.state.isOpen}
              onClose={this.toggleModal}
              display={this.state.display}
              button={this.props.btnText}
              getTopic={this.props.topic.name}>
            </TopicModal>
          </div>
      </div>
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
