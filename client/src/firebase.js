// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace this config with your own from Firebase Console
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

// Export auth instance
export const auth = getAuth(app);