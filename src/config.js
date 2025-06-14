import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export const firebaseApp = initializeApp({
  apiKey: "AIzaSyANt5f9BMdDFqgsNL7tYfctQJ4NVxfpudU",
  authDomain: "chatapp-43202.firebaseapp.com",
  projectId: "chatapp-43202",
  storageBucket: "chatapp-43202.appspot.com",
  messagingSenderId: "499362633040",
  appId: "1:499362633040:web:8bebec95683bb44343c855"
});
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
