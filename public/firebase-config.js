// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK_Ax-nOB6XZjWfP4s6JpmI-8TVTFVnc4",
  authDomain: "onion23-13b73.firebaseapp.com",
  projectId: "onion23-13b73",
  storageBucket: "onion23-13b73.firebasestorage.app",
  messagingSenderId: "253083603315",
  appId: "1:253083603315:web:f9b31016612f22cc78f506",
  measurementId: "G-5YBNH7K3ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);