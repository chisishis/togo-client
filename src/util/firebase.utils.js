import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB0Je0GR_8tJIm9bQBCrU7GchqfUXbQERg",
    authDomain: "togo-b7cd6.firebaseapp.com",
    databaseURL: "https://togo-b7cd6.firebaseio.com",
    projectId: "togo-b7cd6",
    storageBucket: "togo-b7cd6.appspot.com",
    messagingSenderId: "534193105426",
    appId: "1:534193105426:web:f9ba649f83dad06556c6cb",
    measurementId: "G-VQGSYQFE7G"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
