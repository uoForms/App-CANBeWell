import React from 'react';
import './LandingPage.css';

import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from "react-router-dom";
import LandingPageEN from './LandingPage_EN.js';
import LandingPageFR from './LandingPage_FR.js';



import 'bootstrap/dist/css/bootstrap.min.css';



const LandingPage = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/fr" component={() => <LandingPageFR openDialog={openDialog} setOpenDialog={setOpenDialog} />} />
          <Route path="/" component={() => <LandingPageEN openDialog={openDialog} setOpenDialog={setOpenDialog} />} />
          

        </Switch>
      </Router>
    </>
  );
}
export default LandingPage;