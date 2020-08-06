import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAPuIZi-ns_KRkpTjpnEbTnnAYGflqwbwI",
  authDomain: "canbewell-uottawa.firebaseapp.com",
  databaseURL: "https://canbewell-uottawa.firebaseio.com",
  projectId: "canbewell-uottawa",
  storageBucket: "canbewell-uottawa.appspot.com",
  messagingSenderId: "813615648464",
  };
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.database()
//const auth = firebase.auth()

export { db}