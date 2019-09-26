//import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import LandingPage from './Landingpage';
//import routes from './routes';
//import registerServiceWorker from './registerServiceWorker';

//import * as firebase from 'firebase';
//import {DB_CONFIG} from './Config/config';
//import { Router } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Link, Switch, } from "react-router-dom";
//import { BrowserRouter as Link } from "react-router-dom";

//firebase.initializeApp(DB_CONFIG);
//ReactDOM.render(<Router routes={routes} />, document.getElementById('root'));
ReactDOM.render(<CookiesProvider><LandingPage/></CookiesProvider>, document.getElementById('root'));

/*ReactDOM.render(
  <Router basename="/canbewell">
    <div>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={Logo}/>
      <Route path={`${process.env.PUBLIC_URL}/App`} component={App} />
    </div>
  </Router>, document.getElementById('root'));*/

  //registerServiceWorker();

  /*ReactDOM.render(

  <Route exact path={`${process.env.PUBLIC_URL}/`} component={Logo}/>
  <Route path={`${process.env.PUBLIC_URL}/#/App`} component={App} />


                  <Router>
                  <Switch><Route path='/' component={Home}>
                    <Route exact component={logo}/>
                    <Route path='home' component={App}/>
                    <Route Path='*' component={logo}/>
                  </Route></Switch></Router>, document.getElementById('root'));*/
