import React from "react";
import Styles from "../../Style/dialog-box.module.scss";

function FeedbackDialogFr() {
  return (
    <ul className={Styles.feedbackDialog}>
      <li>
        SVP prendre <span>2 minutes</span> pour répondre à un bref sondage
        anonyme qui nous aidera à <span>améliorer l'application.</span>
      </li>
      <li>
        Vos réponses nous aideront à comprendre les besoins de la communauté en
        matière d'information sur la santé.
      </li>
      <li>
        Le sondage est <span>totalement anonyme</span>. Aucune des informations
        que vous fournissez ne peut être utilisée pour vous identifier.
      </li>
    </ul>
  );
}

export default FeedbackDialogFr;
