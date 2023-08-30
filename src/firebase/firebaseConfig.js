// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwhCNa5uQjsuncC2frnb0YfSRMBY6Id2s",
  authDomain: "crud-react-firebase-front-5.firebaseapp.com",
  projectId: "crud-react-firebase-front-5",
  storageBucket: "crud-react-firebase-front-5.appspot.com",
  messagingSenderId: "1010880102199",
  appId: "1:1010880102199:web:07b8a5d7b60a893eace4b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
