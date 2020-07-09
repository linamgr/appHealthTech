import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDgpyO4-pCkvd4NDvfHs7DzbrAfxTw0kV0",
    authDomain: "apphealthtech.firebaseapp.com",
    databaseURL: "https://apphealthtech.firebaseio.com",
    projectId: "apphealthtech",
    storageBucket: "apphealthtech.appspot.com",
    messagingSenderId: "1057048173126",
    appId: "1:1057048173126:web:7d3c80fc39c5bfa5eac847"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };