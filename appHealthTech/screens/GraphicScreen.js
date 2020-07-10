import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';

var peso, altura, imc;
const styles = StyleSheet.create({
    margin10: {backgroundColor: '#52b1cf'},
    fullWidth: {flex: 1},
    header: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 60,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row'
    },
    listItemText: {fontSize: 20,
        color: '#000000',
        marginBottom:10
    },
    itemIMChigh: {
        color: 'red',
        fontStyle:'normal',
        fontWeight:'Bold',
        fontSize:45,
        textAlign: 'center'
    },
    itemIMClow: {
        color: '#4DC902',
        fontStyle:'normal',
        fontWeight:'Bold',
        fontSize:45,
        textAlign: 'center',
    },
    listItemHeader: {fontSize: 15, color: '#0000FF'},
    item: {
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        width: 300,
        alignItems: 'center'
    },
    monitorador: {
        paddingTop:15,
        paddingBottom:15,
        flex:1,
        height:48,
        backgroundColor:'#00BBD3',

    },
    calculador:{
        paddingTop:15,
        paddingBottom:15,
        flex:1,
        height:48,
        backgroundColor:'#F69ACC',

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
      },
      text: {
        color:'#FFFFFF',
        textAlign:'center',
        fontWeight:'Bold',
        fontSize:21,
        marginTop: 15,
        marginBottom: 10
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
                        onPress={() => this.props.navigation.navigate('Metas')}>
                        <Text style={styles.textButton}> Monitorador </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style= {styles.calculador}
                        activeOpacity = { .5 }
                        onPress={() => {}}>
                        <Text style={styles.textButton}> IMC </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text} >Indice de massa corporal</Text>
                <View style={[styles.fullWidth, {alignItems:'center'}]}>
                {
                    dataList && dataList.map(
                        (item, index) => {

                          /* Calculo imc */
                          peso = parseFloat(item.Peso);
                          altura = parseFloat(item.Altura);
                          altura = altura * altura * 0.0001;
                          imc =  peso /  altura;
                          imc = parseFloat(imc.toFixed(2))

                          if (imc >=25) {
                            return <View style={[styles.margin10, styles.item]} key={index} >
                                <Text style={styles.itemIMChigh}> {imc} </Text>
                            </View>
                          } else {
                            return <View style={[styles.margin10, styles.item]} key={index} >

                            <Text style={styles.itemIMClow}> {imc} </Text>
                            </View>
                          }


                        }
                    )
                }
                </View>
           </ScrollView>
        );
    }
}
