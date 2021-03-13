import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import {isTransgender} from './config';

if(isTransgender){
  //connecting to Transgender database
const firebaseConfig = {
  apiKey: "AIzaSyCLe-xIVjYyE9EBgQiuvsd4CyB2C7baoe4",
  authDomain: "transgender-canbewell.firebaseapp.com",
  databaseURL: "https://transgender-canbewell-default-rtdb.firebaseio.com",
  projectId: "transgender-canbewell",
  storageBucket: "transgender-canbewell-default-rtdb.appspot.com",
  messagingSenderId: "454936296780",
  };
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
}
else{
  //Connecting to Test(export-csv-canbewell) database
  const firebaseConfig = {
    apiKey: "AIzaSyA3szGH387ezJSfbaPJKs9QHzz4QYBSoFw",
    authDomain: "export-csv-canbewell.firebaseapp.com",
    databaseURL: "https://export-csv-canbewell.firebaseio.com",
    projectId: "export-csv-canbewell",
    storageBucket: "export-csv-canbewell.appspot.com",
    messagingSenderId: "150585800085",
    };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}

const db = firebase.database()
//const auth = firebase.auth()

export { db}