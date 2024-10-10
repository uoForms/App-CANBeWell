import React from "react";
import PropTypes from "prop-types";
import { PageViewTimer, GaUserEvent } from "../Tracking";
import "../Button.css";
import TopicsModal from "./TopicsModal";
import TopicListFR from "../JSONFolder/HtmlTopic-FR.json";
import TopicListEN from "../JSONFolder/HtmlTopic-EN.json";
import FilterTopicListFR from "../JSONFolder/FilterTopic-FR.json";
import FilterTopicListEN from "../JSONFolder/FilterTopic-EN.json";
import TopicModal from "./TopicModal";
import DialogBox from "../components/DialogBox";
import FeedbackDialogEn from "../components/feedback-components/FeedbackDialogEn";
import FeedbackDialogFr from "../components/feedback-components/FeedbackDialogFr";
import { englishForm, frenchForm } from "../constants";

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      TopicList:
        this.props.userConfig.language == "french" ? TopicListFR : TopicListEN,
      FilterTopicList:
        this.props.userConfig.language == "french"
          ? FilterTopicListFR
          : FilterTopicListEN,
      language: this.props.userConfig.language,
    };
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  };

  helpClicked = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      headerText: this.props.lang.topic_help_header,
      bodyText: this.props.lang.topic_help_body,
      buttonText: this.props.lang.config_modal_agree,
    });
  };

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
          filterdtopics={this.props.newdata(
            this.state.TopicList,
            this.props.userConfig,
            this.state.FilterTopicList
          )}
          userConfig={this.props.userConfig}
          text={this.props.lang.topic_search_bar_placeholder}
          pageViewStateUpdater={this.pageViewStateUpdater}
          btnText={this.props.lang.close_body_modal}
          onClose={this.props.onClose}
          filterallbtnText={this.props.lang.topic_filter_all}
          filtertopbtnText={this.props.lang.topic_filter_top_10}
          clickOnText={this.props.lang.clickOn_Text}
          language={this.state.language}
          lang={this.props.lang}
        />

        {/*help dialog box*/}
        <TopicsModal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          header={this.state.headerText}
          body={this.state.bodyText}
          button={this.state.buttonText}
          displayConfig={this.state.displayConfigOption}
        ></TopicsModal>
      </div>
    );
  }
}

Topics.propTypes = {
  onClose: PropTypes.func.isRequired,
  showTopics: PropTypes.bool,
  userConfig: PropTypes.object,
  data: PropTypes.func.isRequired,
  newdata: PropTypes.func.isRequired,
  lang: PropTypes.object,
};

class TopicRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      display: [],
      feedbackDialog: false,
    };
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
    this.handleFeedBackToggle = this.handleFeedBackToggle.bind(this);
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  };
  toggleModal = () => {
    if (sessionStorage.getItem("firstVisit") != "true") {
      sessionStorage.setItem("firstVisit", "true");

      this.setState({ feedbackDialog: true });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  handleFeedBackToggle = (type) => {
    if (type === "agree") {
      sessionStorage.setItem("firstVisit", "true");
      const finalLink =
        this.props.language === "french" ? frenchForm : englishForm;
      window.open(finalLink, "_blank");
    }
    this.setState({ feedbackDialog: !this.state.feedbackDialog });
  };
  rowClicked = (title) => {
    let timerResult = PageViewTimer(
      this.props.userInfo.preCat,
      this.props.userInfo.preTime
    );
    let currTime = timerResult.currTime,
      timeDiff = timerResult.timeDiff;
    let currNav = "topics",
      currCat = title;
    GaUserEvent(
      currNav,
      currCat,
      this.props.userInfo,
      timeDiff,
      this.props.userInfo.preTime,
      currTime,
      ""
    );
    this.props.pageViewStateUpdater(currNav, currCat, currTime);
    this.setState({
      isOpen: !this.state.isOpen,
      display: this.props.topic.body,
    });
  };
  render() {
    const tryRequire = () => {
      try {
        return require(`../assets/TopicIcons/${this.props.topic.button.replace(
          /[^a-z0-9]/gi,
          "-"
        )}.png`);
      } catch (err) {
        return null;
      }
    };
    const imageExist = tryRequire();
    return (
      <div className="row topicicon-row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 topicicon">
          {" "}
          {imageExist ? (
            <img
              id={this.props.topic.name}
              src={
                require(`../assets/TopicIcons/${this.props.topic.button.replace(
                  /[^a-z0-9]/gi,
                  "-"
                )}.png`).default
              }
              className="topicsIcon"
            />
          ) : (
            <img
              id={this.props.topic.name}
              src={require("../assets/TopicIcons/defaultIcon.png").default}
              className="topicsIcon"
            />
          )}
        </div>
        <div
          id={this.props.topic.name}
          className="mydetailsItemdiv col-lg-8 col-md-8 col-sm-8 col-xs-8 topictitle"
          onClick={() => this.rowClicked(this.props.topic.name)}
          test-id="topicRow"
        >
          {this.props.topic.name}
        </div>

        <div>
          <TopicModal
            show={this.state.isOpen}
            onClose={this.toggleModal}
            display={this.state.display}
            button={this.props.btnText}
            getTopic={this.props.topic.name}
            clickOnText={this.props.clickOnText}
            userInfo={this.props.userInfo}
          ></TopicModal>

          <DialogBox
            open={this.state.feedbackDialog}
            setOpen={this.handleFeedBackToggle}
            cancelButtonText={this.props.lang.cancel_feedback}
            agreeButtonText={this.props.lang.agree_feedback}
            title={this.props.lang.feedback_dialog_title}
            textComponent={
              this.props.language === "french" ? (
                <FeedbackDialogFr />
              ) : (
                <FeedbackDialogEn />
              )
            }
          />
        </div>
      </div>
    );
  }
}

class TopicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showTop: true,
      showAll: false,
    };
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }
  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  };
  handlemoreitems = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  handleshowtopict = () => {
    this.setState({
      showTop: !this.state.showTop,
      showAll: !this.state.showTop,
    });
  };
  showAllclicked = () => {
    this.setState({ showTop: false, showAll: true });
  };
  showTopclicked = () => {
    this.setState({ showTop: true, showAll: false });
  };
  render() {
    const backdroplistItemStyle = {
      padding: 5,
    };

    //I dont think this is a word
    const blueist = "#0089B5";

    const listItemStyle = {
      backgroundColor: blueist,
      fontWeight: 300,
      borderRadius: 15,
      width: "99%",
      minHeight: 50,
      margin: "0 auto",
      textAlign: "left",
      padding: 10,
      color: "white",
    };

    var rows = [];
    var filterrows = [];
    var index = 0;
    var index1 = 0;
    /*This is where you filter the content to display by comparing the what the user enter and the contend of the json file*/
    this.props.filterdtopics.forEach((topic) => {
      if (
        topic.name
          .toLowerCase()
          .indexOf(this.props.filterText.toLowerCase()) === -1
      ) {
        return;
      }
      filterrows.push(
        <div
          key={index1}
          style={backdroplistItemStyle}
          className="col-lg-3 col-md-6 icontopics"
        >
          <div style={listItemStyle}>
            <TopicRow
              topic={topic}
              userInfo={this.props.userConfig}
              pageViewStateUpdater={this.pageViewStateUpdater}
              btnText={this.props.btnText}
              onClose={this.props.onClose}
              filterallbtnText={this.props.filterallbtnText}
              filtertopbtnText={this.props.filtertopbtnText}
              clickOnText={this.props.clickOnText}
              language={this.props.language}
              lang={this.props.lang}
            />
          </div>
        </div>
      );
      index1++;
    });
    this.props.topics.forEach((topic) => {
      if (
        topic.name
          .toLowerCase()
          .indexOf(this.props.filterText.toLowerCase()) === -1
      ) {
        return;
      }
      rows.push(
        <div
          key={index}
          style={backdroplistItemStyle}
          className="col-lg-3 col-md-6 icontopics"
        >
          <div style={listItemStyle}>
            <TopicRow
              topic={topic}
              userInfo={this.props.userConfig}
              pageViewStateUpdater={this.pageViewStateUpdater}
              btnText={this.props.btnText}
              onClose={this.props.onClose}
              filterallbtnText={this.props.filterallbtnText}
              filtertopbtnText={this.props.filtertopbtnText}
              clickOnText={this.props.clickOnText}
              language={this.props.language}
              lang={this.props.lang}
            />
          </div>
        </div>
      );
      index++;
    });
    const dataForDisplay = this.state.showTop ? filterrows.slice(0, 10) : rows;
    return (
      <>
        <div className="mt-2 mx-3">
          <button
            id="filtershowall"
            type="button"
            onClick={this.showAllclicked}
            className={`button3-1 ${this.state.showAll ? "filteractive" : ""}`}
          >
            {this.props.filterallbtnText}
          </button>
          <button
            id="filtershowtop"
            type="button"
            onClick={this.showTopclicked}
            className={`button3-1 ${this.state.showTop ? "filteractive" : ""}`}
          >
            {this.props.filtertopbtnText}
          </button>
        </div>
        <div className="table">
          <div className="container-fluid">
            <div className="row">{dataForDisplay}</div>
          </div>
        </div>
      </>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange =
      this.handleFilterTextInputChange.bind(this);
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
          test-id="searchBarInput"
        />
      </form>
    );
  }
}

class FilterableTopicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.pageViewStateUpdater = this.pageViewStateUpdater.bind(this);
  }

  pageViewStateUpdater = (nav, cat, time) => {
    this.props.pageViewStateUpdater(nav, cat, time);
  };

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText,
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  render() {
    return (
      <div>
        <TopicTable
          topics={this.props.topics}
          filterdtopics={this.props.filterdtopics}
          userConfig={this.props.userConfig}
          filterText={this.state.filterText}
          pageViewStateUpdater={this.pageViewStateUpdater}
          btnText={this.props.btnText}
          onClose={this.props.onClose}
          filterallbtnText={this.props.filterallbtnText}
          filtertopbtnText={this.props.filtertopbtnText}
          clickOnText={this.props.clickOnText}
          language={this.props.language}
          lang={this.props.lang}
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
