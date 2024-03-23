// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGBs9o9bBuWCHV-N1SBvXEhijiFdKCebg",
  authDomain: "netflixgpt-d15c0.firebaseapp.com",
  projectId: "netflixgpt-d15c0",
  storageBucket: "netflixgpt-d15c0.appspot.com",
  messagingSenderId: "333257269795",
  appId: "1:333257269795:web:14e7e28324a99980208796",
  measurementId: "G-HJBQCHC089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();