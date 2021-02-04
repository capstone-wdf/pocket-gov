import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import { firebaseConfig } from "../../secrets";

if (!firebase.apps.length) {
  console.log('Connected to Firebase')
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
