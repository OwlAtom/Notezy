// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyARbuR0FhM2OWfKFEMNFykUxNKiisw_jeY",
  authDomain: "ucn-notezy.firebaseapp.com",
  projectId: "ucn-notezy",
  storageBucket: "ucn-notezy.appspot.com",
  messagingSenderId: "24839556954",
  appId: "1:24839556954:web:75b20196a6d02507ed2d63",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// use this to check if the user is logged in
// or use the pinia store to check the fields "email" and "displayName"
// is checking the pinia store faster than the firebase auth?
app.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("user is logged in");
  } else {
    console.log("user is not logged in");
  }
});

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const documentsCollection = db.collection("documents");

// export utils/refs
export { db, auth, documentsCollection };
