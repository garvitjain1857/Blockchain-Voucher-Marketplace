import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCUJFrBWrcVJoZ5LdXvYcvmoOR098j-T-o",
  authDomain: "ecommerce-a0128.firebaseapp.com",
  projectId: "ecommerce-a0128",
  storageBucket: "ecommerce-a0128.appspot.com",
  messagingSenderId: "758652251482",
  appId: "1:758652251482:web:dd0dc50339bb28a7695763",
  measurementId: "G-C3KL7LJK72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth, GoogleAuthProvider,signInWithPopup };

