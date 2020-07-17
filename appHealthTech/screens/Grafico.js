import React, {useState, useEffect} from 'react';
import {LineChart, BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import { Dimensions, Modal } from "react-native";
import {View, Text, StyleSheet,ImageBackground} from 'react-native';
import firebase from 'firebase';
import { color } from 'react-native-reanimated';

var tot = 0; var tot1 = 0; var tot2 = 0;
var tot3 = 0; var tot4 = 0; var tot5 = 0; var tot6 = 0;

const image = require('../assets/isaac-smith-AT77Q0Njnt0-unsplash.jpg');

function retornaCalDia(){
    var dia1 = new Date().getDate().toString();
    var date2 = new Date().getDate() - 1; var dia2 = date2.toString();
    var date3 = new Date().getDate() - 2; var dia3 = date3.toString();
    var date4 = new Date().getDate() - 3; var dia4 = date4.toString();
    var date5 = new Date().getDate() - 4; var dia5 = date5.toString();
    var date6 = new Date().getDate() - 5; var dia6 = date6.toString();
    var date7 = new Date().getDate() - 6; var dia7 = date7.toString();
    var month = new Date().getMonth() + 1; var monthString = month.toString();
    var year = new Date().getFullYear().toString();
    
    var total = tot
    var total1 = tot1
    var total2 = tot2
    var total3 = tot3
    var total4 = tot4
    var total5 = tot5
    var total6 = tot6

    const [array, setArray] = useState([]);
    
    useEffect(() => {
        const query = firebase.firestore()
        .collection('Refeicoes')
        .where('dia', '>=', dia7)
        .where('mes', '==', monthString)
        .where('ano', '==', year).get().then((snapshot) => {
          (snapshot.docs.forEach(doc => 
            { 
              if(doc.data().dia == dia1){
                total = total + parseInt(doc.data().caloriasRefeicaoTotal)
                }
              if(doc.data().dia == dia2){
                total1 = total + parseInt(doc.data().caloriasRefeicaoTotal)
                }
              if(doc.data().dia == dia3){
                total2 = total2 + parseInt(doc.data().caloriasRefeicaoTotal)
              }
              if(doc.data().dia == dia4){
                total3 = total3 + parseInt(doc.data().caloriasRefeicaoTotal)
              }
              if(doc.data().dia == dia5){
                total4 = total4 + parseInt(doc.data().caloriasRefeicaoTotal)
              }
              if(doc.data().dia == dia6){
                total5 = total5 + parseInt(doc.data().caloriasRefeicaoTotal)
              }
              if(doc.data().dia == dia7){
                total6 = total6 + parseInt(doc.data().caloriasRefeicaoTotal)
              }
            }
          ));

          var gpd = [total6, total5, total4, total3, total2, total1, total];
          /*Setar as Arrays*/
          setArray(gpd)
          
          /*Resetar os valores*/
          total = 0
          total1 = 0
          total2 = 0
          total3 = 0
          total4 = 0
          total5 = 0
          total6 = 0
         })
      }, [])
  return array;
}

var cfdm = 0; var alm = 0; var jnt = 0;

function retornaCalTurno(){
  var date7 = new Date().getDate() - 6; var dia7 = date7.toString();
  var month = new Date().getMonth() + 1; var monthString = month.toString();
  var year = new Date().getFullYear().toString();
  
  var cafe = cfdm
  var almoco = alm
  var janta = jnt

  const [array2, setArray2] = useState([]);
  
  useEffect(() => {
      const query = firebase.firestore()
      .collection('Refeicoes')
      .where('dia', '>=', dia7)
      .where('mes', '==', monthString)
      .where('ano', '==', year).get().then((snapshot) => {
        (snapshot.docs.forEach(doc => 
          { 
            if(doc.data().turno == 'Café da manhã'){
              cafe = cafe + parseInt(doc.data().caloriasRefeicaoTotal)
              }
            if(doc.data().turno == 'Almoço'){
              almoco = almoco + parseInt(doc.data().caloriasRefeicaoTotal)
              }
            if(doc.data().dia == 'Janta'){
              janta = janta + parseInt(doc.data().caloriasRefeicaoTotal)
            }
          }
        ));
        var gpd2 = [cafe, almoco, janta];
        console.log(gpd2)
        /*Setar as Arrays*/
        setArray2(gpd2)
        
        /*Resetar os valores*/
        cafe = 0;
        almoco = 0;
        janta = 0;
       })
    }, [])
return array2;
}

function  Grafico(){
    const array = retornaCalDia();
    const array2 = retornaCalTurno();
    var graphData = array.slice();
    /*graphData = [hoje-6, hoje-5, hoje-4, hoje-3, hoje-2, hoje-1, hoje]*/
    var graphTurno = array2.slice();
    console.log(graphTurno)
    /*graphTurno = [cafeDaManha, Almoco, Janta]*/
    const fill = 'rgb(134, 65, 244)'
    const nomeTurno = ['Cafe', 'Almoço', 'Janta']
    return(
      
    <View style = {styles.screen}>
       <ImageBackground source={image} style={styles.image}>
     <View style = {styles.button}>
        {/*PRO LINECHART
          COLOCAR LEGENDA NOS EIXOS X E Y
          X > REFERENCIANDO O DIA
          Y > REFERENCIANDO OS VALORES DE CALORIA
        */}
        <LineChart
        
                style={{ height: 250}}
                data={graphData}
                svg={{ stroke: 'black', strokeWidth: 2}}
                contentInset={{ top: 20, bottom: 40 }}
        >      
        </LineChart>
      </View>
      <View style = {styles.button}>
        <BarChart
          style={{ height: 200 }}
          data={graphTurno}
          svg={{ stroke: 'black', strokeWidth: 2}}
          contentInset={{ top: 20, bottom: 40 }}
        >      
        </BarChart>
      <Text style={styles.cafeText}>Café</Text>
        <Text style={styles.almocoText}>Almoço</Text>
        <Text style={styles.jantaText}>Jantar</Text>
      <Text>{}</Text>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      backgroundColor:"#e5eeea"
  },
  image: {
    width: '100%',
    height:'100%',
  },
  button:{
      marginRight:40,
      marginLeft:40,
      marginTop:25,
      paddingTop:15,
      paddingBottom:10,
      backgroundColor:'#ECECEC',
      borderWidth: 1.5,
      borderRadius: 15,
      borderColor: 'grey'
    },

  cafeText: {
    position: 'absolute',
    top:250,
    fontSize: 20,
    alignItems: 'flex-start',
    color: 'black',
    marginLeft: 10
  },
  almocoText: {
    position: 'absolute',
    left:110,
    top:250,
    fontSize: 20,
    color: 'black',
    marginLeft: 10
  },
  jantaText: {
    position: 'absolute',
    left:230,
    top:250,
    fontSize: 20,
    alignItems: 'flex-start',
    color: 'black',
    marginLeft: 10
  },
});


export default Grafico;