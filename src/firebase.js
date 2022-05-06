import firebase from "firebase/app";
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyChbwZVXgIPB20vDZ6gg4BFPlsBY-stklM",
    authDomain: "unichat-d4d6e.firebaseapp.com",
    projectId: "unichat-d4d6e",
    storageBucket: "unichat-d4d6e.appspot.com",
    messagingSenderId: "204360239728",
    appId: "1:204360239728:web:4a91c4bb8de6e3bf92c2b5"
}).auth();