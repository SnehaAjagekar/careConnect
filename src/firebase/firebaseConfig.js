// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa5WoGk2mU158Nw9F_RutNbjRigmtUsME",
  authDomain: "careconnect-21c1c.firebaseapp.com",
  projectId: "careconnect-21c1c",
  storageBucket: "careconnect-21c1c.firebasestorage.app",
  messagingSenderId: "610536665198",
  appId: "1:610536665198:web:72ac0068ff889c456e367f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);