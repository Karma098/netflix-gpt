// Import the functions you need from the SDKs you need
import { getAuth} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbKihbw_qfVFyGRgmyL94sXCU18pcDruU",
  authDomain: "netflixgpt-1aa0f.firebaseapp.com",
  projectId: "netflixgpt-1aa0f",
  storageBucket: "netflixgpt-1aa0f.appspot.com",
  messagingSenderId: "368483422378",
  appId: "1:368483422378:web:921ab2737d60d26e9640d3",
  measurementId: "G-Y3MFGVGJ31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();