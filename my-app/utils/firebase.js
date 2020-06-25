import firebase from 'firebase';
//import firebase from 'expo-firebase-app';
//import 'expo-firebase-database';

const prodConfig = {
    apiKey: "AIzaSyCH2E8OqroB7nlMECgr_2bWQtCTWkowlF8",
    authDomain: "tutorial-ca340.firebaseapp.com",
    databaseURL: "https://tutorial-ca340.firebaseio.com",
    projectId: "tutorial-ca340",
    storageBucket: "tutorial-ca340.appspot.com",
    messagingSenderId: "116920596963",
};

const devConfig = {
    apiKey: "AIzaSyCH2E8OqroB7nlMECgr_2bWQtCTWkowlF8",
    authDomain: "tutorial-ca340.firebaseapp.com",
    databaseURL: "https://tutorial-ca340.firebaseio.com",
    projectId: "tutorial-ca340",
    storageBucket: "tutorial-ca340.appspot.com",
    messagingSenderId: "116920596963",
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();