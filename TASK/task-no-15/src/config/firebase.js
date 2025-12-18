import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRPP71UCBg6CVJjsrpWiwzUz7OA21v1ps",
  authDomain: "task-15-authentication.firebaseapp.com",
  projectId: "task-15-authentication",
  storageBucket: "task-15-authentication.firebasestorage.app",
  messagingSenderId: "115037514139",
  appId: "1:115037514139:web:e359edbdcd63e7c5c6d93e",
  measurementId: "G-41JHP3CDH5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider };