// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW9HF16Ji_wAJYmnM2Ni-uY75a3X0SGO4",
  authDomain: "ceibo-8a502.firebaseapp.com",
  projectId: "ceibo-8a502",
  storageBucket: "ceibo-8a502.appspot.com",
  messagingSenderId: "428221502483",
  appId: "1:428221502483:web:47dacdb7e86d41a04e5be6",
  measurementId: "G-YV03PN6H65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export  const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);