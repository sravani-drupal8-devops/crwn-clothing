import { initializeApp } from 'firebase/app';
import "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH6Yr6wWJaGHMVsr0udIiWh0oWL0swWNQ",
  authDomain: "crwn-db-9ad47.firebaseapp.com",
  projectId: "crwn-db-9ad47",
  storageBucket: "crwn-db-9ad47.appspot.com",
  messagingSenderId: "672386316074",
  appId: "1:672386316074:web:c113417c720d63bd59d053",
  measurementId: "G-ERHN3FTFWR"
};

const app = initializeApp(firebaseConfig);

//export const auth = firebase.auth();
export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  'promt': 'select_account'
});
export const signInWithGoogle = () => signInWithPopup(auth,provider);

export default app;