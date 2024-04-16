// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg3zheh-NT6SLR174bR_mueIRVD8fyhPk",
  authDomain: "m3h1a-1n.firebaseapp.com",
  projectId: "m3h1a-1n",
  storageBucket: "m3h1a-1n.appspot.com",
  messagingSenderId: "577547912333",
  appId: "1:577547912333:web:72208086030587138f0ec4",
  measurementId: "G-55P10FH234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);