import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Plot from 'react-plotly.js';
import { valores_peso } from './WeightHistoryScreen'

var peso, altura, imc;
var eixo_x = [ ];

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
      marginBottom: 20,
      fontSize: 14,
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
        FirebaseService.getDataList('leituras', dataIn => this.setState({dataList: dataIn}), 10);
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
        const {dataList} = this.state;
        const {option} = this.title;

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
                              /* Calculo imc */
                              peso = parseFloat(item.Peso);
                              altura = parseFloat(item.Altura);
                              altura = altura * altura * 0.0001;
                              imc =  peso /  altura;
                              imc = parseFloat(imc.toFixed(2))

                              for(var i = 0; i < valores_peso.length ; i++){
                                eixo_x.push(i);
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
                    </View>

                    <TouchableOpacity
                        style= {styles.buttonStyle}
                        activeOpacity = { .5 }
                        onPress={() => this.props.navigation.navigate('AdicionarPeso')}>
                        <Text style={styles.textButton}> Alterar Meta </Text>
                    </TouchableOpacity>

            </ScrollView>
        );
    }
}
