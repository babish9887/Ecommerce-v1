import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBPOoHUcV7Uve0Mbg7xZBzOqiaw9KMExLA",
  authDomain: "digital-oasis-35451.firebaseapp.com",
  projectId: "digital-oasis-35451",
  storageBucket: "digital-oasis-35451.appspot.com",
  messagingSenderId: "263797926684",
  appId: "1:263797926684:web:aeaa3b5aa9bfdc264768d9",
  measurementId: "G-0161DQQTBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage=getStorage(app)
export {storage}