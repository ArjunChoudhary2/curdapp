// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk0CEgPBF2wAzkxbVOBmwoGD0cIZhFwHw",
  authDomain: "crudapp1-6bdae.firebaseapp.com",
  projectId: "crudapp1-6bdae",
  storageBucket: "crudapp1-6bdae.appspot.com",
  messagingSenderId: "1035535857473",
  appId: "1:1035535857473:web:19e3295d851239a9b593c0",
  measurementId: "G-K60M6PSN90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
