import firebase from "firebase/compat";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
// config
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }