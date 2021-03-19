import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

  //Connecting to Transgender database
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


const db = firebase.database()
//const auth = firebase.auth()

export { db}