import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdOt-NTYOsMrRmAKHLmRQ009CijZb9Hsk",
  authDomain: "reactnative-project-7c3f4.firebaseapp.com",
  projectId: "reactnative-project-7c3f4",
  storageBucket: "reactnative-project-7c3f4.appspot.com",
  messagingSenderId: "789369988733",
  appId: "1:789369988733:web:0a516a44e902e78ad8f314",
  measurementId: "G-8285ZLNQTX"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };