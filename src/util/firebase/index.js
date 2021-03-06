import  firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

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

const auth = firebase.auth();
const firestore = firebase.firestore();



const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged (userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

const startNewPost =  async (post, shareWith, tags, statusDates, link) => {
  try {
    
    await firestore.collection('posts').doc().set({post, shareWith, tags, statusDates, link})
    
    return ('Success');
  }
  catch (error) {
    return (`Error: ${error.code}`)
  }
}

const fetchAllPosts = async (filter) => {
  try {
    const collectionRef = firestore.collection('posts');
    const snapShop = await collectionRef.get();
    const allPosts = snapShop.docs.map (doc => doc.data());

    console.log(allPosts)
  } catch (error) {
    console.log(error.code);
  }
}




export {
  auth,
  firestore,
  startNewPost,
  getCurrentUser,
  fetchAllPosts

}


