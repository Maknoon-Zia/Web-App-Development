import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-jlj7-sflFDAm71JOy7xMl8EB-pTMMdk",
  authDomain: "car-booking-app-200ed.firebaseapp.com",
  projectId: "car-booking-app-200ed",
  storageBucket: "car-booking-app-200ed.firebasestorage.app",
  messagingSenderId: "927606497334",
  appId: "1:927606497334:web:8276f1bb46b213b3833897"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;



