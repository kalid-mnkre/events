// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9O812XwFG5ZOSgA10aTTcgJYHy4wiQ3o",
  authDomain: "real-time-database-invitees.firebaseapp.com",
  databaseURL: "https://real-time-database-invitees-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "real-time-database-invitees",
  storageBucket: "real-time-database-invitees.appspot.com",
  messagingSenderId: "814287525131",
  appId: "1:814287525131:web:d6a5c6ba9f70f8b56c3e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


 export const db =  getDatabase(app)