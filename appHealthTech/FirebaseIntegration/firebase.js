import firebase from 'firebase';

// const config = {
//     apiKey: "AIzaSyAA6htj2CWGl4kpI6SmBRTKiduYw1-5bC4",
//     authDomain: "apphealth-e377c.firebaseapp.com",
//     databaseURL: "https://apphealth-e377c.firebaseio.com",
//     storageBucket: "apphealth-e377c.appspot.com",
//     projectId: "apphealth-e377c",
//     messagingSenderId: "104612952948"
//   };
const config = { 
    apiKey: "AIzaSyAA6htj2CWGl4kpI6SmBRTKiduYw1-5bC4",
    authDomain: "apphealth-e377c.firebaseapp.com",
    databaseURL: "https://apphealth-e377c.firebaseio.com",
    projectId: "apphealth-e377c",
    storageBucket: "apphealth-e377c.appspot.com",
    messagingSenderId: "104612952948",
    appId: "1:104612952948:web:0755b06b5f690959a48a21",
    measurementId: "G-QT1TZQ0P51"
}
  
firebase.initializeApp(config);

var database = firebase.database();        

    
export function writeData(object, databaseName)
{
    database.ref(databaseName + '/').push(object).then(data => data).catch(error => error);
}

export function readDataOnce(databaseName)
{
    database.ref('/foods/').on("value", (snapshot) => {

        if(snapshot.hasChildren())
            console.log("salve  -- ");

        console.log(snapshot.val());
        snapshot.forEach((child)=>{
            console.log("eai")
            let item = child.val();
            //item['key'] = child.key;
            console.log(item);
        });
    })   
}