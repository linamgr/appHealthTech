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
const email = "lucas_alabmo@usp.br";
const password = "ASDADS7&&asdk18salaj!@#"; 



app.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + error.message + "creating user now:");
    app.auth().createUserWithEmailAndPassword(email, password).catch(error => console.log(error.code()));        
});

//var user = {userId : "iVMFBbfUTNS2WLhOvWP35fwtvVT2"};

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

function readDataOnce(func)
{   
    var user = app.auth().currentUser;
    if (!user) {
        console.log("No user signed");
        return;
    }

    database.ref('/' + user.uid + '/walks').on("value", (snapshot) => {
        //console.log(snapshot.val());
        if(snapshot.val()){
            func(snapshot);
        }

    })
}


export function readAllPedometerData(func){
    return readDataOnce(func);
}

export function pushPedometerData(date){
    writeData(date);
}