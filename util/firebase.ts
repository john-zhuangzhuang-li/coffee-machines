import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
