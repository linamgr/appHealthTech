import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function Inicial({ navigation }){
    return(
        <View style = {styles.screen}>
        <Text style= {styles.textos}>Hoje:</Text>
        <Text style= {styles.textoProvisorio}>BARRA AQUI</Text>   
            <View style = {styles.buttonContainer}>  
                <Text style = {styles.textos}>Opções:</Text>
                <View style = {styles.button}>
                    <Button title = "Adicionar" 
                            onPress = {() => navigation.navigate('Adicionar')}/>
                </View>
                <View style = {styles.button}>
                    <Button title = "Ingestão por Dia" 
                            onPress = {() => {}}/>
                </View>
                <View style = {styles.button}>
                    <Button title = "Ingestão por Turno" 
                            onPress = {() => {}}/>
                </View>
                <View style = {styles.button}>
                    <Button title = "Historico" 
                            onPress = {() => navigation.navigate('Listar')}/>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        marginLeft: 20
    },
    textos: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "bold",
    },
    textoProvisorio:{
        fontSize: 32,
        marginTop: 10,
        marginBottom: 100
    },
    buttonContainer:{
        width: '100%',
    },
    button: {
        marginTop: 50,
        marginLeft: 15,
        borderRadius: 10,
        width: 300,
        elevation: 10
    }
});

export default Inicial;