import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDI4KCtSWqTrKQsyqWtK-dICEjeKU9fw44",
  authDomain: "react-slack-f1bae.firebaseapp.com",
  databaseURL: "https://react-slack-f1bae.firebaseio.com",
  projectId: "react-slack-f1bae",
  storageBucket: "react-slack-f1bae.appspot.com",
  messagingSenderId: "662812747890",
  appId: "1:662812747890:web:571430844834f9a5233aeb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
