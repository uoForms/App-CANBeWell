import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DialogBox(props) {
  const { open, setOpen, title, text, cancelButtonText, agreeButtonText } =
    props;
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
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <button
          className="buttonDialogClose"
          test-id="xButton"
          onClick={handleClose}
        >
          X
        </button>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAgree}>
            {agreeButtonText}
          </Button>
          <Button onClick={handleClose} autoFocus>
            {cancelButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
