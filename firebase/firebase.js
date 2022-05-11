import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAGSXys82qQMuEOwhXRx9YXt91nyLbqV_o",
  authDomain: "dev-bros-baff7.firebaseapp.com",
  projectId: "dev-bros-baff7",
  storageBucket: "dev-bros-baff7.appspot.com",
  messagingSenderId: "4305116888",
  appId: "1:4305116888:web:93f04f3663fa47d677c1ad",
  measurementId: "G-PB1GF3FPBN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
