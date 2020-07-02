import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Plot from 'react-plotly.js';
import { valores_peso } from './WeightHistoryScreen'

var peso, altura, imc;
var eixo_x = [ ];

const styles = StyleSheet.create({
    margin10: {margin: 10,backgroundColor: '#52b1cf'},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    itemIMChigh: {color: 'red', marginBottom:10,  fontStyle:'normal',fontWeight:'Bold', fontSize:50, textAlign: 'center'},
    itemIMClow: { color: '#4DC902', marginBottom:10,  fontStyle:'normal',fontWeight:'Bold', fontSize:"50px", textAlign: 'center'},
    listItemHeader: {fontSize: 15, color: '#0000FF'},
    item: {backgroundColor: '#F6F6F6', borderRadius: 20},
    monitorador: {marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#F69ACC',

    },
    calculador:{
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BBD3',

    },
    buttonStyle: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#F69ACC',
        borderRadius:30,
        borderWidth: 1,
        borderColor: '#F69ACC'
      },
      textButton: {
        color:'#FFFFFF',
        textAlign:'center'
      },
      text: {
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:25
      }
});

export default class Infos extends React.Component {
    state = {
        dataList: null,
    };

    componentDidMount() {
        FirebaseService.getDataList('leituras', dataIn => this.setState({dataList: dataIn}), 10);
    };

    render() {
        const {dataList} = this.state;

        return (
            <ScrollView style={styles.margin10}>
                <View style={{ flexDirection:'row', alignItems:'flex-end',}}>
                    <TouchableOpacity
                        style= {styles.monitorador}
                        activeOpacity = { .5 }
                        onPress={() => this.props.navigation.navigate('AdicionarPeso')}>
                        <Text style={styles.textButton}> Monitorador </Text>
                        </TouchableOpacity>
                    <TouchableOpacity
                        style= {styles.calculador}
                        activeOpacity = { .5 }
                        onPress={() => this.props.navigation.navigate('AdicionarPeso')}>
                        <Text style={styles.textButton}> Calculadora de IMC </Text>
                        </TouchableOpacity>
                        </View>
                <Text style={styles.text} >Indice de massa corporal</Text>
                <View style={styles.fullWidth}>
                    {   

                        dataList && dataList.map(
                            (item, index) => {

                              /* Calculo imc */
                              peso = parseFloat(item.Peso);
                              altura = parseFloat(item.Altura);
                              altura = altura * altura * 0.0001;
                              imc =  peso /  altura;
                              imc = parseFloat(imc.toFixed(2))

                              for(var i = 0; i < valores_peso.length ; i++){
                                eixo_x.push(i);
                              }
                
                              if (imc >=25) {
                                return <View style={[styles.margin10, styles.item]} key={index} >
                                <View style={{padding:10}}>
                                <Text style={styles.itemIMChigh}> {imc} </Text>

                                </View>
                            </View>
                              } else {
                                return <View style={[styles.margin10, styles.item]} key={index} >
                                <View style={{padding:10}}>
                                <Text style={styles.itemIMClow}> {imc} </Text>
                                </View>
                            </View>
                              }

                               
                            }
                        )
                    }
                <Plot
                    backgroundColor= "#C7DDC5"
                  data={[
                    {
                      x: eixo_x,
                      y: valores_peso,
                      type: 'scatter',
                      mode: 'lines',
                      marker: {color: 'red'},
                    },
                    {type: 'bar', x: eixo_x, y: valores_peso},
                  ]}
                  layout={ {width: 338, height: 203,backgroundColor:"#C7DDC5"} }
            />
                </View>
                <TouchableOpacity
                    style= {styles.buttonStyle}
                    activeOpacity = { .5 }
                    onPress={() => this.props.navigation.navigate('AdicionarPeso')}>
                    <Text style={styles.textButton}> ADICIONAR PESO </Text>
                    </TouchableOpacity>
               

            </ScrollView>
        );
    }
} 
