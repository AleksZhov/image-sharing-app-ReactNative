import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdOt-NTYOsMrRmAKHLmRQ009CijZb9Hsk",
  authDomain: "reactnative-project-7c3f4.firebaseapp.com",
  projectId: "reactnative-project-7c3f4",
  storageBucket: "reactnative-project-7c3f4.appspot.com",
  messagingSenderId: "789369988733",
  appId: "1:789369988733:web:0a516a44e902e78ad8f314",
  measurementId: "G-8285ZLNQTX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;





