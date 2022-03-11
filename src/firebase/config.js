import firebase from "firebase/compat";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCf4g7zD_WQvgYCAjrBq8KeiTs6VqKgFqk",
    authDomain: "muz-service.firebaseapp.com",
    projectId: "muz-service",
    storageBucket: "muz-service.appspot.com",
    messagingSenderId: "961036865961",
    appId: "1:961036865961:web:6888b01f8193e25c30b4b8"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }