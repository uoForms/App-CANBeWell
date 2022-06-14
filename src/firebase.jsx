import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlMCiRMFB5BQtgF4-JB0lFSju5g_HcLn8",
  authDomain: "icanbewellv2.firebaseapp.com",
  databaseURL: "https://icanbewellv2-default-rtdb.firebaseio.com",
  projectId: "icanbewellv2",
  storageBucket: "icanbewellv2.appspot.com",
  messagingSenderId: "952618416302",
  appId: "1:952618416302:web:2603298d2c19f2e1ea953f"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.database()
//const auth = firebase.auth()

export { db}