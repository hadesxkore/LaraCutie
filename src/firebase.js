// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAvC0-0F9vWjN6Ty4FVvFc8urBU8K_bkI",
  authDomain: "my-date-app-f9855.firebaseapp.com",
  projectId: "my-date-app-f9855",
  storageBucket: "my-date-app-f9855.appspot.com",
  messagingSenderId: "633041575878",
  appId: "1:633041575878:web:b5eb7f59585361f1aa1cc7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
