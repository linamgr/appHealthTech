import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import {Button} from '@material-ui/core';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 15, color: '#0000FF'},
    item: {backgroundColor: '#c7c7c7', borderRadius: 20}

});

export default class AboutScreen extends React.Component {
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
                                return <View style={[styles.margin10, styles.item]} key={index} >
                                    <View style={{padding:10}}>
                                    <Text style={styles.listItemHeader}> Nome </Text>
                                    <Text style={styles.listItemText}> {item.Nome} </Text>

                                    <Text style={styles.listItemHeader}> Altura (cm) </Text>
                                    <Text style={styles.listItemText}> {item.Altura} </Text>

                                    <Text style={styles.listItemHeader}> Peso (kg) </Text>
                                    <Text style={styles.listItemText}> {item.Peso} </Text>
                                    </View>
                                </View>
                            }
                        )
                    }

                </View>
                <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => this.props.navigation.navigate('AdicionarPeso')}
                        >Adicionar Peso atual</Button>
            </ScrollView>
        );
    }
}

