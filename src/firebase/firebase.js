// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeOJZ0c1EhqUMj2Llf6XcwjyYvazcZ314",
  authDomain: "pcos-b1241.firebaseapp.com",
  databaseURL: "https://pcos-b1241-default-rtdb.firebaseio.com",
  projectId: "pcos-b1241",
  storageBucket: "pcos-b1241.firebasestorage.app",
  messagingSenderId: "356681884049",
  appId: "1:356681884049:web:39e00279df2d02d0dcfa30",
  measurementId: "G-BXLCKNM634"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;