import firebase from 'firebase'

const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyC-Q1PwFDN1xcKIX5-aczSNgwTMID1aYP4",
  authDomain: "insta-final-b55fe.firebaseapp.com",
  databaseURL: "https://insta-final-b55fe.firebaseio.com",
  projectId: "insta-final-b55fe",
  storageBucket: "insta-final-b55fe.appspot.com",
  messagingSenderId: "126124558391",
  appId: "1:126124558391:web:5548f3ea52cbee8fb817b2",
  measurementId: "G-H0Y9P1K2NR"
})

const db=firebaseApp.firestore()
const auth=firebase.auth();
const storage=firebase.storage()

export{db,auth,storage}
