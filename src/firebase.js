// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDvSuxyCBEv-l9XSP6gHHCO-lyPS1GzdYs",
  authDomain: "vite-store.firebaseapp.com",
  projectId: "vite-store",
  storageBucket: "vite-store.firebasestorage.app",
  messagingSenderId: "716813431197",
  appId: "1:716813431197:web:c9da32684e7145b1be3f74",
  measurementId: "G-R8EGE3KGD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };