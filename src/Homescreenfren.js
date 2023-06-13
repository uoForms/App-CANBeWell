import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './Button.css';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MobileDetect from 'mobile-detect';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5" test-id="homeScreenTitle">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon test-id="homeScreenCloseIcon" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ openDialog, setOpenDialog }) {

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  var clientNav = window.navigator;
  var md = new MobileDetect(clientNav.userAgent);
  var clientOS = md.os();

  return (
    <div>
      {
        (() => {
          if (clientOS == 'iOS') {
            return <div>
              {/* <div className="homescreen-button-french">
                &nbsp;<button test-id="homeScreenButtonFr" onClick={handleClickOpen}>Enregister l’appli</button>
                </div> */}
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog ? openDialog : false}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Pour iPhone et iPad
                </DialogTitle>
                <DialogContent test-id="homeScreenContent" dividers className="Diacontent">
                  <h4>1. Lancez choixsante.ca via Safari</h4>
                  <img src={require('./images/instruction-2_french.png').default} className="instructionimg" />
                  <h4>2. Appuyez sur l'icône de partage</h4>
                  <img src={require('./images/instruction_2.png').default} className="instructionimg" />
                  <h4>3. Appuyez sur "Enregister l’appli"</h4>
                  <img src={require('./images/instruction_fren_1.png').default} className="instructionimg" />
                  <h4>4. Appuyez sur le bouton "Ajouter"</h4>
                  <img src={require('./images/instruction-1_french.png').default} className="instructionimg" />
                </DialogContent>
                <DialogActions>
                  <div className="closeButton">
                    <button test-id="homeScreenCloseButton" onClick={handleClose}>D'accord</button>
                  </div>
                </DialogActions>
              </Dialog>
            </div>
          }
          else if (clientOS == 'AndroidOS') {
            return <div>
              {/* <div className="homescreen-button-french">
              &nbsp;<button test-id="homeScreenButtonFr" onClick={handleClickOpen}>Enregister l’appli</button>
                </div> */}
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog ? openDialog : false}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Pour Android
                </DialogTitle>
                <DialogContent test-id="homeScreenContent" dividers className="Diacontent">
                  <h4>1. Lancez icanbewell.ca via Chrome</h4>
                  <img src={require('./images/android_1.jpg').default} className="instructionimg" />
                  <h4>2. Appuyez sur l'icône de menu</h4>
                  <img src={require('./images/android_2.jpg').default} className="instructionimg" />
                  <h4>3. Appuyez sur "Enregister l’appli"</h4>
                  <img src={require('./images/android_fren_1.jpg').default} className="instructionimg" />
                </DialogContent>
                <DialogActions>
                  <div className="closeButton">
                    <button test-id="homeScreenCloseButton" onClick={handleClose}>D'accord</button>
                  </div>
                </DialogActions>
              </Dialog>
            </div>
          }
        })()
      }
    </div>
  );
}
