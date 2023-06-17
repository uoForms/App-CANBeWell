import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import LandingPageEN from './LandingPage_EN.js';
import LandingPageFR from './LandingPage_FR.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Landingpage';
import Homescreeneng from './Homescreeneng';
import Homescreenfren from './Homescreenfren';
//import routes from './routes';
//import registerServiceWorker from './registerServiceWorker';

//import * as firebase from 'firebase';
//import {DB_CONFIG} from './Config/config';
//import { Router } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Link, Switch, } from "react-router-dom";
//import { BrowserRouter as Link } from "react-router-dom";

//firebase.initializeApp(DB_CONFIG);
//ReactDOM.render(<Router routes={routes} />, document.getElementById('root'));
// ReactDOM.render(<CookiesProvider><LandingPage /></CookiesProvider>, document.getElementById('root'));
ReactDOM.render(
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPageEN} />
          <Route path="/fr" component={LandingPageFR} />
        </Switch>
      </Router>
    </CookiesProvider>,
    document.getElementById('root')
  );
// ReactDOM.render(<Homescreeneng />, document.getElementById('homescreen-english'));
// ReactDOM.render(<Homescreenfren />, document.getElementById('homescreen-french'));
