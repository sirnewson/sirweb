// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlL7EGT8sYKLR-BQLAt0BbjNpw2jCynaA",
  authDomain: "sirnewson-6f757.firebaseapp.com",
  projectId: "sirnewson-6f757",
  storageBucket: "sirnewson-6f757.appspot.com",
  messagingSenderId: "745333727245",
  appId: "1:745333727245:web:f4a5f40b9ae4e05eb93544"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export Firebase services
export {
  db, storage, auth,
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, limit, ref, uploadBytes, getDownloadURL,
  signInWithEmailAndPassword, onAuthStateChanged, signOut
};
