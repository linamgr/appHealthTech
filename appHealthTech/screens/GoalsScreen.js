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
    margin10: {margin: 10,backgroundColor: '#00BBD3'},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    itemIMChigh: {fontSize: 20, color: 'red', marginBottom:10},
    itemIMClow: { color: '#4DC902', marginBottom:10,  fontStyle:'Bold', fontSize:50},
    listItemHeader: {fontSize: 15, color: '#0000FF'},
    item: {backgroundColor: '#F6F6F6', borderRadius: 20},
    monitorador: {marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#F69ACC',
        alignItems:'left'
    },
    calculador:{
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BBD3',
        alignItems:'left'
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
        textAlign:'center',
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
                                <Text style={styles.listItemHeader}> Peso Atual </Text>
                                <Text style={styles.listItemText}> {item.Peso} Kg </Text>

                                <Text style={styles.listItemHeader}> Meta de Peso </Text>
                                <Text style={styles.listItemText}> 70.0 Kg </Text>
                                
                                <Text style={styles.listItemHeader}> IMC </Text> 
                                <Text style={styles.itemIMChigh}> {imc} </Text>
                                <Text style={styles.listItemText}> Obs.um IMC entre 18,5 e 24,9 é considerado normal  </Text>
                                </View>
                            </View>
                              } else {
                                return <View style={[styles.margin10, styles.item]} key={index} >
                                <View style={{padding:10}}>
                                <Text style={styles.listItemHeader}> Peso Atual </Text>
                                <Text style={styles.listItemText}> {item.Peso} Kg </Text>

                                <Text style={styles.listItemHeader}> Meta de Peso </Text>
                                <Text style={styles.listItemText}> 70.0 Kg </Text>
                                
                                <Text style={styles.listItemHeader}> IMC </Text> 
                                <Text style={styles.itemIMClow}> {imc} </Text>
                                <Text style={styles.listItemText}> Obs.um IMC entre 18,5 e 24,9 é considerado normal  </Text>
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
                  layout={ {width: 500, height: 500, title: 'Evolução no Tempo',backgroundColor:"#C7DDC5"} }
            />
                </View>
                <TouchableOpacity
                    style= {styles.buttonStyle}
                    activeOpacity = { .5 }
                    onPress={() => this.props.navigation.navigate('AdicionarPeso')}>
                    <Text style={styles.textButton}> ADICIONAR PESO </Text>
                    </TouchableOpacity>

                <Button
                        title="Mostrar Historico"
                        onPress={() => this.props.navigation.navigate('MostrarHistorico')}
                />
                <Button
                        title="Metas"
                        onPress={() => this.props.navigation.navigate('AdicionarMetas')}
                />

            </ScrollView>
        );
    }
} 
