import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDVQc6NVLVk0SHvgxRpuFshsSA4GPGelw",
  authDomain: "icanbewellanalytics-3f628.firebaseapp.com",
  databaseURL: "https://icanbewellanalytics-3f628-default-rtdb.firebaseio.com",
  projectId: "icanbewellanalytics-3f628",
  storageBucket: "icanbewellanalytics-3f628.appspot.com",
  messagingSenderId: "294079611734",
  appId: "1:294079611734:web:f859f2462715e08c430cf7",
  measurementId: "G-H5YSKQTSGM"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.database()
//const auth = firebase.auth()

export { db}