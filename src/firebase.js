// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLDjRkSF87X_v1TGuxNAEHOzvQqIOFu-w",
    authDomain: "skiptocyte.firebaseapp.com",
    projectId: "skiptocyte",
    storageBucket: "skiptocyte.appspot.com",
    messagingSenderId: "639494550957",
    appId: "1:639494550957:web:1f92182cbf7ef913e79d24",
    measurementId: "G-V921SHZH3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
