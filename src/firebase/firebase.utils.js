import { initializeApp } from 'firebase/app';
import "firebase/auth";
import { getFirestore, doc,getDoc,setDoc,collection,writeBatch } from "firebase/firestore";
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

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  'promt': 'select_account'
});
export const signInWithGoogle = () => signInWithPopup(auth,provider);

export const db = getFirestore();
export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const docRef = doc(db, "users", `${userAuth.uid}`);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) {
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(docRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return docRef;
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    Array.prototype.forEach.call(objectsToAdd, obj => {
    //objectsToAdd.forEach((obj) => {
      const newDocRef = doc(collectionRef);
      console.log(newDocRef);
      batch.set(newDocRef, obj);
  });
   return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}


 

export default app;