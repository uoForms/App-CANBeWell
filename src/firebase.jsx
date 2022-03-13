import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

//connecting to test database
const firebaseConfig = {
  apiKey: "AIzaSyCl4wyKnUZRt25Vmxbt7-dDoR8tsG02kSk",
  authDomain: "canbewell-2022-test.firebaseapp.com",
  databaseURL: "https://canbewell-2022-test-default-rtdb.firebaseio.com",
  projectId: "canbewell-2022-test",
  storageBucket: "canbewell-2022-test.appspot.com",
  messagingSenderId: "114580889906",
  appId: "1:114580889906:web:97ea5a8d3c77628032f72b",
  measurementId: "G-WLZKR9N34N"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.database()
//const auth = firebase.auth()

export { db}