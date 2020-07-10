import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAA6htj2CWGl4kpI6SmBRTKiduYw1-5bC4",
    authDomain: "apphealth-e377c.firebaseapp.com",
    databaseURL: "https://apphealth-e377c.firebaseio.com",
    projectId: "apphealth-e377c",
    storageBucket: "apphealth-e377c.appspot.com",
    messagingSenderId: "104612952948",
    appId: "1:104612952948:web:0755b06b5f690959a48a21",
    measurementId: "G-QT1TZQ0P51"
  };
  
var app = firebase.initializeApp(firebaseConfig);
var database = app.database();        

//Create a interface for this
const email = "lucas@usp.br";
const password = "ASDADS74Hk18salaj!@#"; 
/*
app.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + error.message);
    // ...
});
*/ 
/*
app.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + error.message);
    // ...
});        
*/

function writeData(object)
{   
    //signInWithEmailAndPassword(email,password);_
    var user = app.auth().currentUser;
    if (user) {
        var userId = user.uid;
        database.ref( '/'+userId + '/walks').push(object).then(data => data).catch(error => error);    
    } else {
        console.log("No user signed");
    }
}

function readDataOnce()
{   
    var user = app.auth().currentUser;
    if (!user) {
        console.log("No user signed");
        return;
    } 
    database.ref('/' + user.uid + '/walks').on("value", (snapshot) => {
        console.log(snapshot.val());
        snapshot.forEach((child)=>{
            let item = child.val();
            console.log(item);
        });
    })   
}


export function readAllPedometerData(){
    return readDataOnce();
}

export function pushPedometerData(date){
    writeData(date);
}