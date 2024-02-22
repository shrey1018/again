// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVHAWO9cK8XeKbLLL8wMXBTrvNcuOptCs",
  authDomain: "social-media-b574f.firebaseapp.com",
  projectId: "social-media-b574f",
  storageBucket: "social-media-b574f.appspot.com",
  messagingSenderId: "678032457268",
  appId: "1:678032457268:web:c55f54fefe85818043d461"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  auth = getAuth(app);
export const  provider = new GoogleAuthProvider();
export const db = getFirestore(app);