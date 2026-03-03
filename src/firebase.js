
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiIbLJVKY0mVX6Fy1jv5NDGmCL8EkG5SQ",
  authDomain: "whatapp-clone-8a55c.firebaseapp.com",
  projectId: "whatapp-clone-8a55c",
   storageBucket: "whatapp-clone-8a55c.firebasestorage.app",
        messagingSenderId: "130045841630",
   appId: "1:130045841630:web:cdec31fc0f12b0817ff24f",
   measurementId: "G-R92Q4FXKP8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);



