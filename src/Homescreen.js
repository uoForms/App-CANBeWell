import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add to Home Screen
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          For Iphone and Ipad
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           1. Launch “Safari” app.  This does not work from the “Chrome” app.
          </Typography>
          <Typography gutterBottom>
           2. Enter into the address field the URL of the website you want to create a shortcut to. Tap “Go.”
          </Typography>
          <Typography gutterBottom>
            3. Tap the icon featuring a right-pointing arrow coming out of a box along the top of the Safari window to open a drop-down menu.
          </Typography>
          <Typography gutterBottom>
            4. Tap “Add to Home Screen.” Enter the name for the shortcut using the on-screen keyboard and tap “Add.” 
          </Typography>
        </DialogContent>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          For Android
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           1. Launch “Chrome” app.
          </Typography>
          <Typography gutterBottom>
           2. Open the canbewell app website.
          </Typography>
          <Typography gutterBottom>
            3. Tap the menu icon (3 dots in upper right-hand corner) and tap Add to homescreen.
          </Typography>
          <Typography gutterBottom>
            4. Enter a name for the shortcut and then Chrome will add it to your home screen.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
