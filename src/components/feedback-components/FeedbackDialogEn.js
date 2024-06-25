import React from "react";
import Styles from "../../Style/dialog-box.module.scss";

function FeedbackDialogEn() {
  return (
    <ul className={Styles.feedbackDialog}>
      <li>
        Please take <span>2 minutes</span> to complete a brief, anonymous survey
        to help us <span>improve the app</span>
      </li>
      <li>
        Your answers will help us understand health information needs in the
        community.
      </li>
      <li>
        The survey is <span>completely anonymous</span>. None of the information
        you provide can be used to identify you.
      </li>
    </ul>
  );
}

export default FeedbackDialogEn;
