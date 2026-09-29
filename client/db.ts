// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1DRVxHYilbQope8FYgI1L9ddmzEcFxMs",
  authDomain: "ppt-online-dd028.firebaseapp.com",
  databaseURL: "https://ppt-online-dd028-default-rtdb.firebaseio.com",
  projectId: "ppt-online-dd028",
  storageBucket: "ppt-online-dd028.firebasestorage.app",
  messagingSenderId: "146365942461",
  appId: "1:146365942461:web:99f583473385de9ffec5d4",
  measurementId: "G-9C336G1HQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db =getDatabase(app)