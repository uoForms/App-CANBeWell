import React from "react";
import Styles from "../../Style/dialog-box.module.scss";

function FeedbackDialogFr() {
  return (
    <div className={Styles.feedbackDialog}>
      <p>
        SVP prendre <span>2 minutes</span> pour répondre à un bref sondage
        anonyme qui nous aidera à <span>améliorer l'application.:</span>
      </p>
      <ul>
        <li>
          Vos réponses nous aideront à comprendre les besoins de la communauté
          en matière d'information sur la santé.
        </li>
        <li>
          Le sondage est <span>totalement anonyme</span>. Aucune des
          informations que vous fournissez ne peut être utilisée pour vous
          identifier.
        </li>
      </ul>
    </div>
  );
}

export default FeedbackDialogFr;
