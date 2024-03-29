import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import LandingPage from './Landingpage';
import Homescreeneng from './Homescreeneng';
import Homescreenfren from './Homescreenfren';
import './index.css';

//import routes from './routes';
//import registerServiceWorker from './registerServiceWorker';

//import * as firebase from 'firebase';
//import {DB_CONFIG} from './Config/config';
//import { Router } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Link, Switch, } from "react-router-dom";
//import { BrowserRouter as Link } from "react-router-dom";

//firebase.initializeApp(DB_CONFIG);
//ReactDOM.render(<Router routes={routes} />, document.getElementById('root'));
ReactDOM.render(<CookiesProvider><LandingPage /></CookiesProvider>, document.getElementById('root'));
// ReactDOM.render(<Homescreeneng />, document.getElementById('homescreen-english'));
// ReactDOM.render(<Homescreenfren />, document.getElementById('homescreen-french'));
