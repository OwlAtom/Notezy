// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyARbuR0FhM2OWfKFEMNFykUxNKiisw_jeY",
  authDomain: "ucn-notezy.firebaseapp.com",
  databaseURL: "http://localhost:9000/?ns=ucn-notezy", // emulator
  // databaseURL: "https://ucn-notezy-default-rtdb.europe-west1.firebasedatabase.app/", // real
  projectId: "ucn-notezy",
  storageBucket: "ucn-notezy.appspot.com",
  messagingSenderId: "24839556954",
  appId: "1:24839556954:web:75b20196a6d02507ed2d63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export utils/refs
export { app };
