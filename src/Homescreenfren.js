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
              <div className="homescreen-button-french">
                <button onClick={handleClickOpen}>Ajouter à l'écran d'accueil</button>
                </div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Pour Iphone et Ipad
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
              1. Lancez l'application «Safari». Cela ne fonctionne pas à partir de l'application «Chrome».
              </Typography>
              <Typography gutterBottom>
              2. Entrez dans le champ d'adresse l'URL du site Web vers lequel vous souhaitez créer un raccourci. Appuyez sur "Aller".
              </Typography>
              <Typography gutterBottom>
              3. Appuyez sur l'icône avec une flèche pointant vers la droite sortant d'une boîte en haut de la fenêtre Safari pour ouvrir un menu déroulant.
              </Typography>
              <Typography gutterBottom>
              4. Appuyez sur "Ajouter à l'écran d'accueil". Saisissez le nom du raccourci à l'aide du clavier à l'écran et appuyez sur "Ajouter".
              </Typography>
            </DialogContent>
            <DialogActions>
              <div className="closeButton">
                <button onClick={handleClose}>D'accord</button>
              </div>
            </DialogActions>
          </Dialog>
          </div>
          }
          else if(clientOS =='AndroidOS'){
            return <div>
              <div className="homescreen-button-french">
                <button onClick={handleClickOpen}>Ajouter à l'écran d'accueil</button>
                </div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Pour Android
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
               1. Lancez l'application "Chrome".
              </Typography>
              <Typography gutterBottom>
              2. Ouvrez le site Web de l'application canbewell.
              </Typography>
              <Typography gutterBottom>
              3. Appuyez sur l'icône du menu (3 points dans le coin supérieur droit) et appuyez sur Ajouter à l'écran d'accueil.
              </Typography>
              <Typography gutterBottom>
              4. Entrez un nom pour le raccourci, puis Chrome l'ajoutera à votre écran d'accueil.
              </Typography>
            </DialogContent>
            <DialogActions>
              <div className="closeButton">
                <button onClick={handleClose}>D'accord</button>
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
