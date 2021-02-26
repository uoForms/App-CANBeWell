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
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
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
                <button onClick={handleClickOpen}>Add to Home Screen</button>&nbsp;
                </div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              For Iphone and Ipad
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
               1. Launch Safari app
              </Typography>
              <Typography gutterBottom>
               2. Enter the URL www.icanbewell.ca into the address field and tap “Go”
              </Typography>
              <Typography gutterBottom>
               3. Tap the share button featuring the square with an arrow pointing out of it (at the bottom of the screen on an iPhone, top of screen on an iPad). Safari will open a drop-down menu
              </Typography>
              <Typography gutterBottom>
                4. Scroll down the list of actions and tap “Add to Home Screen.” Enter the name for the shortcut and tap “Add” 
              </Typography>
            </DialogContent>
            <DialogActions>
              <div className="closeButton">
                <button onClick={handleClose}>OK</button>
              </div>
            </DialogActions>
          </Dialog>
          </div>
          }
          else if(clientOS =='AndroidOS'){
            return <div>
              <div className="homescreen-button-english">
                <button onClick={handleClickOpen}>Add to Home Screen</button>
                </div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              For Android
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
               1. Launch Chrome app
              </Typography>
              <Typography gutterBottom>
               2. Open the www.icanbewell.ca website
              </Typography>
              <Typography gutterBottom>
                3. Tap the menu icon (3 dots in upper right-hand corner) and tap "Add to home screen"
              </Typography>
              <Typography gutterBottom>
                4. Enter a name for the shortcut and then Chrome will add it to your home screen
              </Typography>
            </DialogContent>
            <DialogActions>
              <div className="closeButton">
                <button onClick={handleClose}>OK</button>
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
