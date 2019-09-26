import React from 'react';
import PropTypes from 'prop-types';
import '../Button.css';
import TopicsModal from './TopicsModal';
import TopicList from '../JSONFolder/17MarchHtmlTopic-FR.json';

class Topics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
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

    if(!this.props.showTopics) {
      return null;
    }

    return (

      <div>
        {/*your help button in the right hand corner*/}
        {/*<button className="button button2" onClick={this.helpClicked}>?</button>*/}

        <FilterableTopicTable topics={this.props.data(TopicList,this.props.userConfig)} text={this.props.lang.topic_search_bar_placeholder} />

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
  showTopics: PropTypes.bool,
  userConfig: PropTypes.object,
  data: PropTypes.func.isRequired,
  lang: PropTypes.object,
};

class TopicRow extends React.Component {

  //open another topic/test
  /*openDetails = (id) => {
    var details = document.getElementById(id);
    details.open = true;
  }*/

  render() {

    const Image = "http://quickforms2.eecs.uottawa.ca/canbewell/";
    //all the subjects
    var sujectArray = [];
    var bodys = this.props.topic.body;
    bodys.forEach((body) => {


      var bodyArray = body.text.split(/(\[\[|\]\]|\n)/g);
      var subject = body.subject.split(/(\[\[|\]\]|\n)/g);
      var bodyArrayToDisplay = [];
      var subjectArrayToDisplay = [];

      for(var i = 0; i < subject.length; i++){
        if(subject[i] == '[['){
          var link = subject[i+1].split(';');
          try{
            if(link[0] === "image" || link[0] === "images"){
              var adress = Image + link[1].trim();
              subjectArrayToDisplay.push(<div><img className="imageFromFolder" src={adress} alt="photo"/></div>);
            }
            /*else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
              link[1] = link[1].replace('topic://', '').trim();
              subjectArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }
            else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
              link[1] = link[1].replace('test://', '').trim();
              subjectArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }*/
            else{
              subjectArrayToDisplay.push(<a href={link[1]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
            }
            i++;
          }catch(err){}
        }
        else if(subject[i] == '\n'){
          subjectArrayToDisplay.push(<br/>);
        }
        else if (subject[i] !== ']]' ){
          subjectArrayToDisplay.push(subject[i]);
        }

      }

      for(var i = 0; i < bodyArray.length; i++){
        if(bodyArray[i] == '[['){
          var link = bodyArray[i+1].split(';');

          try{
            if(link[0] === "image" || link[0] === "images"){
              var adress = Image.concat(link[1].trim());
              bodyArrayToDisplay.push(<div><img className="imageFromFolder" src={adress} alt="photo"/></div>);
            }
            /*else if(link[1].indexOf("topic") === 0 || link[1].indexOf("topic") === 1){
              link[1] = link[1].replace('topic://', '').trim();
              bodyArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }
            else if(link[1].indexOf("test") === 0 || link[1].indexOf("test") === 1){
              link[1] = link[1].replace('test://', '').trim();
              bodyArrayToDisplay.push(<span onClick={(id) => this.openDetails(link[1])}><font color="Yellow">{link[0]}</font></span>);
            }*/
            else{
              if(link[1] == null){
                bodyArrayToDisplay.push(<a href={link[0]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
              }
              else{
                bodyArrayToDisplay.push(<a href={link[1]} target="_blank"><font color="Yellow">{link[0]}</font></a>);
              }
            }
            i++;
          }catch(err){}
        }
        else if(bodyArray[i] == '\n'){
          bodyArrayToDisplay.push(<br/>);
        }
        else if ( bodyArray[i] !== ']]' ){
          bodyArrayToDisplay.push(bodyArray[i]);
        }

      }
      sujectArray.push(<div className="topicBody"><b>{subjectArrayToDisplay}<br/></b>{bodyArrayToDisplay}</div>);
    });


    return (
      <details id={this.props.topic.name}>
        <summary><font size="+1"><b>{this.props.topic.name}</b></font></summary>
        <div>{'\n'}{sujectArray}</div>
      </details>
    );
  }
}

class TopicTable extends React.Component {
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
      textAlign:'left',
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
                    <TopicRow topic={topic}/>
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
          text = {this.props.text}
        />
        <TopicTable
          topics={this.props.topics}
          filterText={this.state.filterText}
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
