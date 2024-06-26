import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0ytkeq6ub8iA4285uHxPZQID30hZOzco",
  authDomain: "tache-validation.firebaseapp.com",
  projectId: "tache-validation",
  storageBucket: "tache-validation.appspot.com",
  messagingSenderId: "150102074122",
  appId: "1:150102074122:web:60e6f6cba5d43179ebd0f3"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
