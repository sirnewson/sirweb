import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlL7EGT8sYKLR-BQLAt0BbjNpw2jCynaA",
  authDomain: "sirnewson-6f757.firebaseapp.com",
  projectId: "sirnewson-6f757",
  storageBucket: "sirnewson-6f757.firebasestorage.app",
  messagingSenderId: "745333727245",
  appId: "1:745333727245:web:f4a5f40b9ae4e05eb93544"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
