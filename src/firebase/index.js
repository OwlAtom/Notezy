const useEmulators = true;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyARbuR0FhM2OWfKFEMNFykUxNKiisw_jeY",
  authDomain: "ucn-notezy.firebaseapp.com",
  databaseURL:
    "https://ucn-notezy-default-rtdb.europe-west1.firebasedatabase.app/", // real
  projectId: "ucn-notezy",
  storageBucket: "ucn-notezy.appspot.com",
  messagingSenderId: "24839556954",
  appId: "1:24839556954:web:75b20196a6d02507ed2d63",
};

if (useEmulators) {
  firebaseConfig.databaseURL = "http://localhost:9000/?ns=ucn-notezy"; // emulator
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// use this to check if the user is logged in
// or use the pinia store to check the fields "email" and "displayName"
// is checking the pinia store faster than the firebase auth?
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in");
  } else {
    console.log("user is not logged in");
  }
});

if (useEmulators) {
  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8880);
}

// export utils/refs
export { app, auth };
