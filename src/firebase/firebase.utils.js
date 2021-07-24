import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC-p_W8JrZqUZiRHNm7QxQpGF-MCZM0y_w",
  authDomain: "crwn-db-2e629.firebaseapp.com",
  databaseURL: "https://crwn-db-2e629-default-rtdb.firebaseio.com",
  projectId: "crwn-db-2e629",
  storageBucket: "crwn-db-2e629.appspot.com",
  messagingSenderId: "430586356524",
  appId: "1:430586356524:web:8101b7ab54f058fc358289",
};

firebase.initializeApp(config);
export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
