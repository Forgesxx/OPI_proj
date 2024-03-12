import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA2mA4h-PuNJMJO0fJzvsLKAeHjxuLSXHQ",
    authDomain: "forgesxx.firebaseapp.com",
    projectId: "forgesxx",
    storageBucket: "forgesxx.appspot.com",
    messagingSenderId: "677071800415",
    appId: "1:677071800415:web:b5dad14fb11e90f1d773ea"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();