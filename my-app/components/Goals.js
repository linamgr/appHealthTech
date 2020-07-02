import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var peso, altura, imc;

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 15, color: '#0000FF'},
    item: {backgroundColor: '#c7c7c7', borderRadius: 20}

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

                                return <View style={[styles.margin10, styles.item]} key={index} >
                                    <View style={{padding:10}}>
                                    <Text style={styles.listItemHeader}> Peso Atual </Text>
                                    <Text style={styles.listItemText}> {item.Peso} Kg </Text>

                                    <Text style={styles.listItemHeader}> Meta de Peso </Text>
                                    <Text style={styles.listItemText}> 70.0 Kg </Text>
                                    
                                    <Text style={styles.listItemHeader}> IMC </Text> 
                                    <Text style={styles.listItemText}> {imc} </Text>
                                    <Text style={styles.listItemText}> Obs.um IMC entre 18,5 e 24,9 é considerado normal  </Text>
                                    </View>
                                </View>
                               
                            }
                        )
                    }

                </View>
                <Button
                        title="Adicionar Peso"
                        onPress={() => this.props.navigation.navigate('AdicionarPeso')}
                />
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