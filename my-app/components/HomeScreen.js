import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button } from '@material-ui/core';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableHighlight, TextInput, Alert} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color:'black'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'auto',
    padding: 70,
  },

  button: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop:10,
    alignSelf: 'auto',
    justifyContent: 'center'
  },

});

let addItem = item => {
  if(Boolean(Number(item))){
    firebaseDatabase.ref('/leituras/key').update({Peso: item});
    window.alert("Peso adicionado com sucesso");
  }
  else{
    window.alert("Entrada inválida");
  }
  
};

export default class Homescreen extends React.Component {

    handleChange = e => {
    	this.setState({name: e.nativeEvent.text
    	});
  	};


  	handleSubmit = () => {
    	addItem(this.state.name);
    	Alert.alert('Item saved successfully');
	};

    render() {
	    return (
	  		<View style={styles.main}>
		    	<Text style={styles.title}> Adicione peso em kg </Text>

		    	<TextInput style={styles.itemInput} onChange={this.handleChange} />

          <Button   
                    variant="contained"
                    color="Primary" 
                    title="Informações Pessoais"
                    onClick={this.handleSubmit}
                    >Adicionar</Button>

  			</View>
		);
	}
}