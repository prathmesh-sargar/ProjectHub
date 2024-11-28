import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCU3qPlFxzCiAZKBzizaXvEC1lUrUnoUtg",
  authDomain: "project-hub-2c8df.firebaseapp.com",
  projectId: "project-hub-2c8df",
  storageBucket: "project-hub-2c8df.appspot.com",
  messagingSenderId: "776701708158",
  appId: "1:776701708158:web:f06cc10c210a248519d52f"
};
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export const imageDb = getStorage(app);


export default app;
