import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx-WLPvbcSiJulkBBrRQcpnUOXodkGEec",
  authDomain: "reactlinks-11937.firebaseapp.com",
  projectId: "reactlinks-11937",
  storageBucket: "reactlinks-11937.firebasestorage.app",
  messagingSenderId: "220115140677",
  appId: "1:220115140677:web:74a7b36b3990368d7fe32c",
  measurementId: "G-FT3PZKJQK6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };