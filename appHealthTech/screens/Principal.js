import React, {useState, useEffect} from 'react';
import {View, Text as RCTText, StyleSheet,ImageBackground,Image} from 'react-native';
import firebase from '../firebase/firebase';
import {ProgressCircle} from 'react-native-svg-charts';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { Icon } from 'react-native-elements';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//trabalha a requisição de fonts
const fetchFonts = () => {
  return Font.loadAsync({
      'Bangers-Regular': require('../assets/fonts/Bangers-Regular.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'DancingScript-VariableFont_wght':require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),
  
  });
};

/*Variáveis globais pra soma*/
var meta = 0
var tot = 0
//imagem para o background
const image = require('../assets/ella-olsson-C1Q3qOTlegg-unsplash.jpg');
const icon_plus = require('../assets/adicionar.png');
function useEntradaCalDiaria(){
    var total = tot
    const [somaCaloriasDoDia, setSomaCaloriasDoDia] = useState();
    const [arg, setArg] = useState([]); 
    var date = new Date().getDate().toString();
    var month = new Date().getMonth() + 1;
    var monthString = month.toString();
    var year = new Date().getFullYear().toString();
    
    useEffect(() => {
      const query1 = firebase.firestore()
      .collection('Refeicoes')
      .where('dia', '==', date)
      .where('mes', '==', monthString)
      .where('ano', '==', year)
      .onSnapshot((snapshot) => {
        (snapshot.docs.forEach(doc => 
          {
            total = total + parseInt(doc.data().caloriasRefeicaoTotal)
           
          }
        ));
        setSomaCaloriasDoDia(total)
        total = 0
       })
    }, [])
    return somaCaloriasDoDia
}
 
function useEntradaMetas(){
    const [metaDiaria, setMetaDiaria] = useState();
    useEffect(() => {
    const query2 = firebase.firestore()
    .collection('user').get().then((snapshot) => {
        (snapshot.forEach(doc => 
            {
              meta = parseInt(doc.data().calDiaria)
            }
        ));
        setMetaDiaria(meta)
     })
    }, [])
    return metaDiaria
}

function calcPercentual(valorSoma,valorMeta)
{
    return valorSoma/valorMeta;
}

 function calcPercentagem(p)
{
    return (p*100).toFixed(2);
}

function Principal({ navigation }){
    var soma = useEntradaCalDiaria();
    var meta = useEntradaMetas();
    
    let percentual = calcPercentual(soma,meta)
    let porcentagem = calcPercentagem(percentual)

    const [dataLoaded, setDataLoaded] = useState(false);//Setar estado para as fonts
    //Verificar o carregamento da font
    if(!dataLoaded){
        return(
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                />
        );
    }
    return(
        <View>
            <ImageBackground source={image} style={styles.image}>
            <RCTText style= {styles.textos}>App Healty "</RCTText>
            <RCTText style= {styles.sub}>Calorias Diárias</RCTText>
            <ProgressCircle
              style={{height: 150,top:25}} 
              strokeWidth = {5} progress={percentual} 
              
              progressColor={'rgb(134,65,244)'}
              backgroundColor={'rgb(175,244,65)'}
            >
            <RCTText style= {styles.caloriasPercent}>{porcentagem}%</RCTText>
            </ProgressCircle>
            <RCTText style= {styles.caloriasText}>{soma}/{meta}cal</RCTText>                
            
            <AwesomeButtonRick type="secondary" style = {styles.box1}
            paddingHorizontal = {15}
            borderWidth = {0.7}
            borderColor = 'black'
            stretch = 'true'
            raiseLevel = {2.5}
            
            backgroundDarker='rgb(175,244,65)' borderColor = 'black'
            
            onPress = {() => navigation.navigate('Adicionar')}>
            
            
            Nova Ingestão
  
            </AwesomeButtonRick>
            <AwesomeButtonRick type="secondary" style = {styles.box}
            borderWidth = {0.7}
            borderColor = 'black'
            stretch = 'true'
            raiseLevel = {2.5}
            backgroundDarker={'rgb(175,244,65)' }borderColor = 'black'
            onPress = {() => navigation.navigate('Grafico')}>
            
              Estatísticas 
  
            </AwesomeButtonRick>
            <AwesomeButtonRick type="secondary" style = {styles.box}
            paddingHorizontal = {15}
            borderWidth = {0.7}
            borderColor = 'black'
            stretch = 'true'
            raiseLevel = {2.5}
            backgroundDarker='rgb(175,244,65)' borderColor = 'black'
            onPress = {() => navigation.navigate('Listar')}>
            
            Histórico
            
            </AwesomeButtonRick>
            </ImageBackground>
            
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: 'center',
    },
    image: {
        width: '100%',
        height:'100%',
      },
    textos: {
        marginTop: 30,
        fontSize: 50,
        marginStart:20,
        color: '#ffff00',        
        fontFamily: 'Bangers-Regular',
    },
    sub: {
      //marginTop: 30,
      fontSize: 20,
      marginStart:30,
      color: 'black',        
      fontFamily: 'Bangers-Regular',
      //textShadowColor:'black',
      //textShadowRadius:10,
  },
    caloriasPercent: {
        top:55,
        color: 'black',
        fontSize: 30,
        alignSelf: 'center',
        fontFamily:'DancingScript-VariableFont_wght',
      },
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignSelf: 'center',

      },
    caloriasText: {
        top: 45,
        fontSize: 25,
        textAlign: 'center',
        color: 'black',
        fontFamily:'DancingScript-VariableFont_wght',
        //color: 'rgb(134, 65, 244)',
      },
    box1:{
        width: '60%',
        marginTop:90,
        marginStart:20,
    },
    box:{
        width: '60%',
        marginStart:20,
        marginTop:5,
      },
});

export default Principal;