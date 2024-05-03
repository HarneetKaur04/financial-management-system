import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB4raKevG9035z_JxlzakV90KOCuo9ESh4",
  authDomain: "finance-management-tracker.firebaseapp.com",
  projectId: "finance-management-tracker",
  storageBucket: "finance-management-tracker.appspot.com",
  messagingSenderId: "296158875933",
  appId: "1:296158875933:web:d9917b747732ab197a51f4",
  measurementId: "G-WGLTB695T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };