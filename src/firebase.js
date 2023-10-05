// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDLA7GQmuKkKD1oz4Hv9w9ulK55lis2AFw",
  authDomain: "hosipitalapp-2c2af.firebaseapp.com",
  projectId: "hosipitalapp-2c2af",
  storageBucket: "hosipitalapp-2c2af.appspot.com",
  messagingSenderId: "931033275560",
  appId: "1:931033275560:web:75b9bb7d31a0f1fe76b69d",
  measurementId: "G-PR1PFDNWQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);