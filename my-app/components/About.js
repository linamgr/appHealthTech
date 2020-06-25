import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 10, color: '#000000'},
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
                <Button
                        title="Adicionar Peso"
                        onPress={() => this.props.navigation.navigate('AdicionarPeso')}
                />
                <View style={styles.fullWidth}>
                    {
                        dataList && dataList.map(
                            (item, index) => {
                                return <View style={[styles.margin10, styles.item]} key={index} >
                                    <View style={{padding:10}}>
                                    <Text style={styles.listItemHeader}> Nome </Text>
                                    <Text style={styles.listItemText}> {item.Nome} </Text>

                                    <Text style={styles.listItemHeader}> Altura </Text>
                                    <Text style={styles.listItemText}> {item.Altura} </Text>

                                    <Text style={styles.listItemHeader}> Peso </Text>
                                    <Text style={styles.listItemText}> {item.Peso} </Text>
                                    </View>
                                </View>
                            }
                        )
                    }

                </View>
            </ScrollView>
        );
    }
}