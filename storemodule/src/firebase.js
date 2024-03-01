// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqAPbp6KXbbQaIgoRlC43v-_yx2ieMAgE",
  authDomain: "medical-store-finder.firebaseapp.com",
  projectId: "medical-store-finder",
  storageBucket: "medical-store-finder.appspot.com",
  messagingSenderId: "645737403535",
  appId: "1:645737403535:web:23e3263703176500cd0cfa",
  measurementId: "G-GNRTGF2RGR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
