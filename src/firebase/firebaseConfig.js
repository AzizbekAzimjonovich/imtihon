import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo8EWsxkNBAM4iPqbaH4xpojHrP09aVSk",
  authDomain: "mykitchen-49155.firebaseapp.com",
  projectId: "mykitchen-49155",
  storageBucket: "mykitchen-49155.appspot.com",
  messagingSenderId: "186322099356",
  appId: "1:186322099356:web:61d80202acfa6f0d40a159",
  measurementId: "G-LL03HRYY6D",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
