import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Test Website
// const firebaseConfig = {
//   apiKey: "AIzaSyCl4wyKnUZRt25Vmxbt7-dDoR8tsG02kSk",
//   authDomain: "canbewell-2022-test.firebaseapp.com",
//   databaseURL: "https://canbewell-2022-test-default-rtdb.firebaseio.com",
//   projectId: "canbewell-2022-test",
//   storageBucket: "canbewell-2022-test.appspot.com",
//   messagingSenderId: "114580889906",
//   appId: "1:114580889906:web:97ea5a8d3c77628032f72b",
//   measurementId: "G-WLZKR9N34N",
// };
//For Production website
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

const app = initializeApp(firebaseConfig);
//const auth = firebase.auth()

export const db = getDatabase(app);

export const firebaseStorage = getStorage(app);
