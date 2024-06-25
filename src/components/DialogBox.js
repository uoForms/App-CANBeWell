import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import Styles from "../Style/dialog-box.module.scss";
import logo from "../assets/Logos/logo_21-02-02.png";

export default function DialogBox(props) {
  const {
    open,
    setOpen,
    title,
    cancelButtonText,
    agreeButtonText,
    textComponent,
  } = props;
  const theme = useTheme();
  const handleAgree = () => {
    setOpen("agree");
  };

  const handleClose = () => {
    setOpen("cancel");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        className={Styles.dialogBox}
      >
        <div className={Styles.title}>
          <img src={logo} width="50px" />
          <DialogTitle
            id="responsive-dialog-title"
            className={Styles.dialogTitle}
          >
            {title}
          </DialogTitle>
        </div>
        <button
          className="buttonDialogClose"
          test-id="xButton"
          onClick={handleClose}
        >
          X
        </button>
        <DialogContent>{textComponent}</DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleAgree}
            className={Styles.agreeButton}
          >
            {agreeButtonText}
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            className={Styles.cancelButton}
          >
            {cancelButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
