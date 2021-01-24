import ReactGA from "react-ga";
import React from "react";
import MobileDetect from 'mobile-detect';
import { db } from './firebase';
/*import $ from jQuery;*/

export const initGA = (trackingID) => {
  ReactGA.initialize(
    trackingID,
  ); 
}

/*export const sendOutbound = (event) => {
  event.preventDefault();
  ReactGA.event({
   category: 'Externallinks',
   action: 'ClickonLink',
   label: 'clicks'
 });
 <a href= {'https://www.canada.ca/en/public-health/services/video/covid-19-wear-non-medical-mask-face-covering-properly.html'} onClick={sendOutbound}></a>
}*/

export const PageViewTimer = (prePage, preTime) => {
  let currTime = Date.now();
  if (prePage === null)
    return {
      currTime: currTime,
      timeDiff: null
    }
  else {
    let timeDiff = (currTime - preTime) / 1000;
    console.log(timeDiff);
    return {
      currTime: currTime,
      timeDiff: timeDiff
    }
  }
}


/**
 * Event - Add custom tracking event.
 * @param {string} category 
 * @param {string} action 
 * @param {string} label 
 */

const GaEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};
export default GaEvent;

export const GaModalView = (virtual_url) => {
  ReactGA.modalview(virtual_url);
};

export const GaGetID = () => {
  ReactGA.ga(
    function (tracker) {
      return tracker = tracker.get('clientId');
    });
};
/*export const outBound = () => {
var hostname = window.location.hostname; 
jQuery("body a").click(function(){

      if(jQuery(this).attr("href").indexOf(hostname)== -1){

           ga('send', 'event', {'eventCategory': "Outbound Links", 'eventAction': "OnClick", 'eventLabel': jQuery(this).attr("href")});

      }
});
}*/

export const matchBrowser = () => {
  var nAgt = window.navigator.userAgent;
  var browserName = 'other';
  if (nAgt.indexOf("Opera") != -1) {
    browserName = "Opera";
  }
  else if (nAgt.indexOf("MSIE") != -1) {
    browserName = "Microsoft Internet Explorer";
  }
  else if (nAgt.indexOf("Chrome") != -1) {
    browserName = "Chrome";
  }
  else if (nAgt.indexOf("Safari") != -1) {
    browserName = "Safari";
  }
  else if (nAgt.indexOf("Firefox") != -1) {
    browserName = "Firefox";
  }
  return browserName;
};

export const matchUserDevice = () => {
  var clientNav = window.navigator;
  var md = new MobileDetect(clientNav.userAgent)
  var mobileBrowser = md.userAgent();
  var clientOS = 'Other';
  var clientDevice = 'WindowsPC';
  var clientBrowser = matchBrowser();
  // dectect os
  if (mobileBrowser) {
    clientOS = md.os();
    clientDevice = md.phone() ? md.phone() : md.tablet();
    clientBrowser = mobileBrowser;
  }
  else if (clientNav.userAgent.indexOf('Mac') != -1) {
    clientOS = 'MacOS';
    clientDevice = 'Mac';
  }
  else if (clientNav.userAgent.indexOf('Windows') != -1) {
    clientOS = 'Windows';
    clientDevice = 'WindowsPC'
  }
  if (clientOS === 'AndroidOS' ) {
    clientDevice = 'AndroidPhone'
  }

  return {
    OS: clientOS,
    Device: clientDevice,
    Browser: clientBrowser
  }
};

export const GaUserEvent = (currNav, currCat, userInfo, timeDiff, preTime, currTime) => {
  let pageviewURL = currNav + "/" + currCat;
  ReactGA.pageview(pageviewURL);
  var deviceInfo = matchUserDevice();
  let date = formatDate(Date.now());
  var label = {
    navigation: currNav,
    userid: userInfo.userID,
    sessionid: userInfo.sessionID,
    gender: userInfo.gender,
    age: userInfo.age,
    language: userInfo.language,
    role: userInfo.patient_provider,
    item: currCat.replace("/", " or "),
    os: deviceInfo.OS,
    device: deviceInfo.Device,
    browser: deviceInfo.Browser,
    region: userInfo.region,
    city: userInfo.city,
    date: date,
  }
  let eventCatagory = getEventCatagory(label);
  let eventAction = getEventAction(label);
  let eventLabel = getEventLabel(label);
  GaEvent(eventCatagory, eventAction, eventLabel);

  if (userInfo.preCat != null) {
    writeClick(label, currTime);
    var preLabel = {
      navigation: userInfo.preNav,
      userid: userInfo.userID,
      sessionid: userInfo.sessionID,
      gender: userInfo.gender,
      age: userInfo.age,
      language: userInfo.language,
      role: userInfo.patient_provider,
      item: userInfo.preCat.replace("/", " or "),
      os: deviceInfo.OS,
      device: deviceInfo.Device,
      browser: deviceInfo.Browser,
      region: userInfo.region,
      city: userInfo.city,
      date: date,
      pageviewtime: timeDiff,
    }
    writeClick(preLabel, preTime);
  }
  else {

    writeClick(label, currTime);
  }
};


export const getEventCatagory = (label) => {
  let role = label.role;
  let navigation = label.navigation;
  let item = label.item;
  let string = role + '-' + navigation + '-' + item
  return string;
};

export const getEventAction = (label) => {
  let os = label.os;
  var browser = 'other'
  switch (label.browser) {
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
  if (label.age === "all ages")
    age = 'all ages';
  else if (label.age <= 30)
    age = 'Young';
  else if (label.age <= 60)
    age = 'Middle age';
  else age = 'Senior';
  let string = label.gender + '-' + age + '-' + label.language;
  return string;
};

export const writeClick = (label, currTime) => {
  let data = JSON.parse(JSON.stringify(label));
  db.ref(data.date + '/' + currTime).set(data);
}

export const formatDate = (date) => {
  let d = new Date(date),
    mon = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (mon.length < 2)
    mon = '0' + mon;
  if (day.length < 2)
    day = '0' + day;
  return year + mon + day;
}

