import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBOiGAXHZ2-AGex7ZEeW-fjZNB01cVpw4k",
  authDomain: "superchat-546f2.firebaseapp.com",
  projectId: "superchat-546f2",
  storageBucket: "superchat-546f2.appspot.com",
  messagingSenderId: "641983071039",
  appId: "1:641983071039:web:fcba84ab9a307761d0898a"
};

// 파이어베이스 설정
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// 구글인증방법 설정
export const googleAuth = new GoogleAuthProvider(app);
export const db = getFirestore(app);