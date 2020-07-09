import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, SnapshotViewIOS} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Plot from 'react-plotly.js';

var peso, altura, imc;
var eixo_x = [ ];
var eixo_y = [ ];
var valores_peso = [];
firebaseDatabase.ref('/leituras/key/Meta').once('value').then(snapshot => { peso = (snapshot.val()); });

const styles = StyleSheet.create({
    margin10: {backgroundColor: '#52b1cf'},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    itemIMChigh: {color: 'red', marginBottom:10,  fontStyle:'normal',fontWeight:'Bold', fontSize:50, textAlign: 'center'},
    itemIMClow: { color: '#4DC902', marginBottom:10,  fontStyle:'normal',fontWeight:'Bold', fontSize:50, textAlign: 'center'},
    listItemHeader: {fontSize: 15, color: '#0000FF'},
    item: {margin: 10,backgroundColor: '#F6F6F6', borderRadius: 20},
    monitorador: {
        flex: 1,
        paddingTop:15,
        paddingBottom:15,
        height: 48,
        backgroundColor:'#F69ACC',

    },
    calculador:{
        flex: 1,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#00BBD3',

    },
    buttonStyle: {
        marginTop:15,
        paddingTop:15,
        paddingBottom:15,
        width: 300,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#F69ACC',
        borderRadius:30,
        borderWidth: 1,
        borderColor: '#F69ACC'
    },
    buttonStyle1: {
        marginTop:30,
        paddingTop:15,
        paddingBottom:15,
        width: 200,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#C4C4C4',
        borderRadius:30,
        borderWidth: 1,
        borderColor: '#C4C4C4'
    },
    textButton: {
        color:'#FFFFFF',
        textAlign:'center',
        fontWeight:'Bold',
        fontSize: 18,
        textAlign: 'center'
    },
    text: {
        color:'#FFFFFF',
        textAlign:'center',
        fontWeight:'Bold',
        fontSize:21
    },
    itemInput: {
      flex: 282,
      height: 38,
      padding: 4,
      marginRight: 30,
      marginLeft: 30,
      marginTop: 10,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'black',
      backgroundColor: 'white'
    },
    title: {
      fontSize: 16,
      fontWeight: 'Bold',
      textAlign: 'center',
      color:'#FFFFFF'
    },
    grafico: {
        flex: 1,
        alignItems: 'center',
        paddingTop:15,
        paddingBottom:15
    }
});

let addItem = item => {
  if(Boolean(Number(item)) && Number(item) > 0){
    firebaseDatabase.ref('/leituras/key').update({Peso: item});
    window.alert("Peso adicionado com sucesso");
    
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    firebaseDatabase.ref('/leituras/key/Meta').once('value').then(snapshot => { peso = (snapshot.val()); });

    firebaseDatabase.ref('/leituras/key/historico').push({Peso: item, Data: dateTime});
  }
  else{
    window.alert("Entrada inválida");
  }

};

export default class Infos extends React.Component {
    state = {
        dataList: null,
    };
    title = 'Rastreador de Metas de Saúde'

    componentDidMount() {
        firebaseDatabase.ref('/leituras/key/Meta').once('value').then(snapshot => { peso = (snapshot.val()); });
        FirebaseService.getDataList('leituras/key/historico', dataIn => this.setState({dataList: dataIn}), 10);
        valores_peso = [];
    };

    handleChange = e => {
    	this.setState({name: e.nativeEvent.text
    	});
  	};


  	handleSubmit = () => {
      addItem(this.state.name);
      this.props.navigation.navigate('Goals');
  };

    render() {
        firebaseDatabase.ref('/leituras/key/Meta').once('value').then(snapshot => { peso = (snapshot.val()); });
        const {dataList} = this.state;
        const {option} = this.title;
        
        dataList && dataList.map(
            (item, index) => {
                valores_peso.push(item.Peso)
            }
        );
        return (
            <ScrollView style={styles.margin10}>

                <View style={{ flexDirection:'row', alignItems:'center',}}>
                    <TouchableOpacity
                        style= {styles.monitorador}
                        activeOpacity = { .5 }
                        onPress={() => {}}>
                        <Text style={styles.textButton}> Monitorador </Text>
                        </TouchableOpacity>
                    <TouchableOpacity
                        style= {styles.calculador}
                        activeOpacity = { .5 }
                        onPress={() => this.props.navigation.navigate('Graphic')}>
                        <Text style={styles.textButton}> IMC </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.grafico}>
                    {   
                        dataList && dataList.map(
                            (item, index) => {

                              for(var i = 0; i < valores_peso.length ; i++){
                                eixo_x.push(i);
                                eixo_y[i] = peso;
                              }
                              
                          }
                        )
                    }
                    <Plot
                    backgroundColor= "#C7DDC5"
                    data={[
                    {
                    type: 'scatter',
                    x: eixo_x,
                    y: valores_peso,
                    mode: 'lines+markers',
                    name: 'peso',
                    marker: {
                        color: 'blue',
                        size: 8
                      },
                      line: {
                        color: 'blue',
                        width: 1
                      }
                    },
                    {
                    type: 'scatter',
                    x: eixo_x,
                    y: eixo_y,
                    mode: 'lines',
                    name: 'meta',
                    marker: {
                        color: 'red',
                        size: 8
                        },
                        line: {
                        color: 'red',
                        width: 1
                        }
                        },
                          ]
                       }
                      layout={ 
                        {
                        title:'Histórico de Pesos',
                        height: 300,
                        width: 450,
                      }
                    }

                    />
                    </View>

                    <View style={{ flexDirection:'column', alignItems:'center',}}>
                        <Text style={styles.title}>Insira aqui o seu peso atual</Text>

                        <TextInput style={styles.itemInput}
                            placeholder="Peso(kg)"
                            onChangeText={text =>"digite o peso aqui"}
                            onChange={this.handleChange} />

                        <TouchableOpacity
                            style= {styles.buttonStyle}
                            activeOpacity = { .5 }
                            onPress={this.handleSubmit}>
                            <Text style={styles.textButton}> Adicionar Peso </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style= {styles.buttonStyle1}
                            activeOpacity = { .5 }
                            onPress={() => this.props.navigation.navigate('AdicionarPeso')}>
                            <Text style={styles.textButton}> Alterar Meta </Text>
                        </TouchableOpacity>
                    </View>



            </ScrollView>
        );
    }
}
