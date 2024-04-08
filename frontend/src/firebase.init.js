// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAikZAHCX17d_cdK_AHm0Ayz8KpQ3a-tR8",
    authDomain: "imagebook-72985.firebaseapp.com",
    projectId: "imagebook-72985",
    storageBucket: "imagebook-72985.appspot.com",
    messagingSenderId: "182496009040",
    appId: "1:182496009040:web:5118fda0e3affdda2b6a55",
    measurementId: "G-D24FSX4717"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;