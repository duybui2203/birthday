// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsyrHPhgmyQxmB4Xa1NyZUBKLlryFlbPI",
  authDomain: "huongbirthday.firebaseapp.com",
  projectId: "huongbirthday",
  storageBucket: "huongbirthday.firebasestorage.app",
  messagingSenderId: "725716778046",
  appId: "1:725716778046:web:2f016eea33d9ac8fab256f",
  measurementId: "G-1LQXZFFB16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);