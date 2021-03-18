import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

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


const db = firebase.database()
//const auth = firebase.auth()

export { db}