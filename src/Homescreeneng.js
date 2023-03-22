import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './Button.css';
import './LandingPage.css';
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
      <Typography test-id="homeScreenTitle" variant="h5">{children}</Typography>
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

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  var clientNav = window.navigator;
  var md = new MobileDetect(clientNav.userAgent);
  var clientOS = md.os();

  return (
    <div>
      {
        (() => {
          if(clientOS == 'iOS'){
            return <div>
              <div className="homescreen-button-english">
                <button onClick={handleClickOpen} test-id="homeScreenButtonEn">Save App</button>&nbsp;
                </div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              For iPhone and iPad
            </DialogTitle>
            <DialogContent test-id="homeScreenContent" dividers className="Diacontent">
              <h4>1. Launch icanbewell.ca via Safari</h4>
              <img src={require('./images/instruction_1.png').default} className="instructionimg" />
              <h4>2. Tap share icon</h4>
              <img src={require('./images/instruction_2.png').default} className="instructionimg" />
              <h4>3. Tap "Save App"</h4>
              <img src={require('./images/instruction_3.png').default} className="instructionimg" />
              <h4>4. Tap "Add" button</h4>
              <img src={require('./images/instruction_4.png').default} className="instructionimg" />
            </DialogContent>
            <DialogActions>
              <div className="closeButton">
                <button test-id="homeScreenCloseButton" onClick={handleClose}>OK</button>
              </div>
            </DialogActions>
          </Dialog>
          </div>
          }
          else if(clientOS =='AndroidOS'){
            return <div>
              <div className="homescreen-button-english">
                <button test-id="homeScreenButtonEn" onClick={handleClickOpen}>Save app</button>&nbsp;
                </div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              For Android
            </DialogTitle>
            <DialogContent test-id="homeScreenContent" dividers className="Diacontent">
            <h4>1. Launch icanbewell.ca via Chrome</h4>
              <img src={require('./images/android_1.jpg').default} className="instructionimg" />
              <h4>2. Tap menu icon</h4>
              <img src={require('./images/android_2.jpg').default} className="instructionimg" />
              <h4>3. Tap "Save App"</h4>
              <img src={require('./images/android_eng_1.jpg').default} className="instructionimg" />
            </DialogContent>
            <DialogActions>
              <div className="closeButton">
                <button test-id="homeScreenCloseButton" onClick={handleClose}>OK</button>
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
