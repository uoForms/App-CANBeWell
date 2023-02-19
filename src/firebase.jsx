import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Test Website 
const firebaseConfig = {
  apiKey: "AIzaSyBeGl_efZAusMgwnk1zbsekj3zO79Hg_gg",
  authDomain: "icanbewell-firebase-events.firebaseapp.com",
  databaseURL: "https://icanbewell-firebase-events-default-rtdb.firebaseio.com",
  projectId: "icanbewell-firebase-events",
  storageBucket: "icanbewell-firebase-events.appspot.com",
  messagingSenderId: "415118709552",
  appId: "1:415118709552:web:756ff03adba67bb9bdeef5",
  measurementId: "G-GWFFM3TL3W",
  // persistenceEnabled: false
};
//For Production website
// const firebaseConfig = {
//   apiKey: "AIzaSyDeAzPuFFw6qx2ZfTD2XUU2t0gVi4Fvi9I",
//   authDomain: "canbewell-2022-prod.firebaseapp.com",
//   databaseURL: "https://canbewell-2022-prod-default-rtdb.firebaseio.com",
//   projectId: "canbewell-2022-prod",
//   storageBucket: "canbewell-2022-prod.appspot.com",
//   messagingSenderId: "77472236262",
//   appId: "1:77472236262:web:21a39b1b2f1ba280393127",
//   measurementId: "G-16GFHELNYK"
// };
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


const db = firebase.database()
//const auth = firebase.auth()

export { db}

// To disconnect firebase realtime database from the application
// firebase.database().goOffline();

// To start sending data from app to firebase realtime database
firebase.database().ref().push()

// After disconnecting the firebase realtime database from the app, if you want to sync/upload all the previous data (while offline) to firebase realtime database you have to use the following command 
// firebase.database().goOnline();


