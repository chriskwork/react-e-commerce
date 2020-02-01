import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDkhAyMAq8QWrFpCeM6BXgc5zmZse-oTWI",
  authDomain: "shop-tutorial-db.firebaseapp.com",
  databaseURL: "https://shop-tutorial-db.firebaseio.com",
  projectId: "shop-tutorial-db",
  storageBucket: "shop-tutorial-db.appspot.com",
  messagingSenderId: "601950552759",
  appId: "1:601950552759:web:9e6279a96adde62efe8332",
  measurementId: "G-HJLYQQF2Y9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth}`);
  const snapShot = await userRef.get();
  // console.log(snapShot)
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
