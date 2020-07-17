
import * as firebase from 'firebase'
import 'firebase/firestore';

// pega isso do firebase -- ver documentação e criar uma app web
const firebaseConfig = { // apiKey, authDomain, etc. (see above)
  apiKey: "AIzaSyCY9A4DEjhybJ1Xhnz6gqaZLgDN_noybw0",
  authDomain: "teste-df697.firebaseapp.com",
  databaseURL: "https://teste-df697.firebaseio.com",
  projectId: "teste-df697",
  storageBucket: "teste-df697.appspot.com",
  messagingSenderId: "275598047537",
  appId: "1:275598047537:web:9525eec946228ab0bf1810",
  measurementId: "G-S6XR1TTRW2"
}; 

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const database = firebase.database();
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
