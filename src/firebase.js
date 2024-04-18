
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkXtN9rFBoFZRRtp4nk0DMOTdlA7ps_Ow",
  authDomain: "london-event-dde64.firebaseapp.com",
  databaseURL: "https://london-event-dde64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "london-event-dde64",
  storageBucket: "london-event-dde64.appspot.com",
  messagingSenderId: "761173502675",
  appId: "1:761173502675:web:cb9bc5054f9fc61e82c226"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
export default db;