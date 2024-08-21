// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUGmNwcrKVykzlXMmoQETNb8jXC7NuRQM",
  authDomain: "netflixgpt-f19e9.firebaseapp.com",
  projectId: "netflixgpt-f19e9",
  storageBucket: "netflixgpt-f19e9.appspot.com",
  messagingSenderId: "969149183961",
  appId: "1:969149183961:web:35264bb25e599646360bc8",
  measurementId: "G-CG6ND1EWCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// 
export const auth = getAuth();