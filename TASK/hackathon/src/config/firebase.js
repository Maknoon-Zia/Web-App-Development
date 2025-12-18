import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // ✅ Import Auth

const firebaseConfig = {
  apiKey: "AIzaSyBFiSIwrKlzusH3sbuOrg_u9uUuqYDLcII",
  authDomain: "hackathon-eventregsystem.firebaseapp.com",
  projectId: "hackathon-eventregsystem",
  storageBucket: "hackathon-eventregsystem.firebasestorage.app",
  messagingSenderId: "504058801489",
  appId: "1:504058801489:web:424972b0f6404af0323770",
  measurementId: "G-DWFXQ7ZQ4T"
};


const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth ✅
const auth = getAuth(app);

// Export both Firestore and Auth
export { db, auth };