import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZRWAEGNnuhknlVIi0vnf0Ia04_ScF_60",

  authDomain: "surveysystem-427b4.firebaseapp.com",

  projectId: "surveysystem-427b4",

  storageBucket: "surveysystem-427b4.appspot.com",

  messagingSenderId: "191995297719",

  appId: "1:191995297719:web:21dd6948cf2c663fe0f232",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
