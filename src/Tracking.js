import ReactGA from "react-ga";
import MobileDetect from 'mobile-detect';
import { db } from './firebase';

export const initGA = (trackingID) => {           
    ReactGA.initialize(
      trackingID,
      {'cookieExpires': 864000}); //Set ga cookie expires time as 10 days 
 }

export const PageView = () => {  
    ReactGA.pageview(window.location.pathname +  
                     window.location.search); 
}

/**
 * Event - Add custom tracking event.
 * @param {string} category 
 * @param {string} action 
 * @param {string} label 
 */

export const GaEvent = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  };

export const GaModalView = ( virtual_url ) => {
    ReactGA.modalview( virtual_url );
};

export const GaGetID = () => {
    ReactGA.ga(
      function(tracker){
        return tracker.get('clientId');
    });
};

export const matchBrowser = () =>{
  var nAgt = window.navigator.userAgent;
  var browserName = 'other';
  if (nAgt.indexOf("Opera")!=-1) {
    browserName = "Opera";
  }
  else if (nAgt.indexOf("MSIE")!=-1) {
    browserName = "Microsoft Internet Explorer";
  }
  else if (nAgt.indexOf("Chrome")!=-1) {
    browserName = "Chrome";
  }
  else if (nAgt.indexOf("Safari")!=-1) {
    browserName = "Safari";
  }
  else if (nAgt.indexOf("Firefox")!=-1) {
    browserName = "Firefox";
  }
  return browserName;
};

export const matchUserDevice = () => {
  var clientNav = window.navigator;
    var md = new MobileDetect(clientNav.userAgent)
    var mobileBrowser = md.userAgent();
    var clientOS = 'Other';
    var clientDevice = 'Desktop';
    var clientBrowser = matchBrowser();
    // dectect os
    if ( mobileBrowser ){
      clientOS = md.os();
      clientDevice = md.phone() ? md.phone() : md.tablet();
      clientBrowser = mobileBrowser;
    }
    else if ( clientNav.userAgent.indexOf('Mac') != -1 ){
      clientOS = 'MacOS';
      clientDevice = 'Mac';       
    }
    else if ( clientNav.userAgent.indexOf('Windows') != -1 ){
      clientOS = 'Windows'; 
    } 

    return {
      OS: clientOS,
      Device: clientDevice,
      Browser: clientBrowser
    }
};

export const GaUserEvent = ( nav, category, userInfo) => {
  var pageviewURL = nav + "/" + category;
    ReactGA.pageview(pageviewURL);
    var deviceInfo = matchUserDevice(); 
    var label = {
      nav: nav,
      user: userInfo.userID,
      gender: userInfo.gender,
      age: userInfo.age,
      language: userInfo.language,
      role: userInfo.patient_provider,
      category: category.replace("/", " or "),
      os: deviceInfo.OS,
      device: deviceInfo.Device,
      browser: deviceInfo.Browser,
      longitude: userInfo.longitude,
      latitude: userInfo.latitude,
    }
    //var labelString = JSON.stringify(label);
    let eventCatagory = getEventCatagory(label);
    let eventAction = getEventAction(label);
    let eventLabel = getEventLabel(label);
    GaEvent( eventCatagory, eventAction, eventLabel);
    writeClick(label);
};

export const getEventCatagory = (label) => {
  let role = label.role;
  let nav = label.nav;
  let category = label.category;
  let string = role + '-' + nav + '-' + category
  return string;
};

export const getEventAction = (label) => {
  let os = label.os;
  var browser = 'other'
  switch(label.browser){
    case 'Safari': 
      browser = 'Safari';
      break;
    case 'Chrome':
      browser = 'Chrome';
      break;
  }
  let string = os + '-' + browser;
  return string;
};

export const getEventLabel = (label) => {
  var age = null;
  if ( label.age === "all ages")
    age = 'all ages';
  else if ( label.age <= 30 )
    age = 'Young';
  else if ( label.age <= 60 )
    age = 'Middle age';
  else age = 'Senior';
  let string = label.gender + '-' + age + '-' + label.language;
  return string;
};

export const writeClick = ( label ) =>{
  let data = JSON.parse( JSON.stringify(label));
  let date = formatDate( Date.now() );
  db.ref( date ).push(data);
}

export const formatDate = ( date ) => {
  let d = new Date(date),
      mon = '' + ( d.getMonth() + 1 ),
      day = '' + d.getDate(),
      year = d.getFullYear();
  
  if( mon.length < 2)
    mon = '0' + mon;
  if( day.length < 2)
    day = '0' + day;
  return year + mon + day;
}