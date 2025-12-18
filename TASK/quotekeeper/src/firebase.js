import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhmQ1oop_79PqAdEy3mhbNU8v6rNAfZlo",
  authDomain: "qoutekeeper.firebaseapp.com",
  projectId: "qoutekeeper",
  storageBucket: "qoutekeeper.firebasestorage.app",
  messagingSenderId: "938990993942",
  appId: "1:938990993942:web:e1cce506ef024071786b37",
  measurementId: "G-NBPFS7H9PZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
