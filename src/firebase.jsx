import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

//connecting to test database
const firebaseConfig = {
  apiKey: "AIzaSyDeAzPuFFw6qx2ZfTD2XUU2t0gVi4Fvi9I",
  authDomain: "canbewell-2022-prod.firebaseapp.com",
  databaseURL: "https://canbewell-2022-prod-default-rtdb.firebaseio.com",
  projectId: "canbewell-2022-prod",
  storageBucket: "canbewell-2022-prod.appspot.com",
  messagingSenderId: "77472236262",
  appId: "1:77472236262:web:21a39b1b2f1ba280393127",
  measurementId: "G-16GFHELNYK"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.database()
//const auth = firebase.auth()

export { db}