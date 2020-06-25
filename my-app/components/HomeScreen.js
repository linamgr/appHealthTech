import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FirebaseService from '../services/FirebaseService.js';
import {firebaseDatabase} from '../utils/firebase';
import { Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableHighlight, TextInput, Alert} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color:'white'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

let addItem = item => {
		firebaseDatabase.ref('/leituras/key').update({Peso: item});
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
	  			<Button
                    title="Informações Pessoais"
                    onPress={() => this.props.navigation.navigate('Informações')}
            	/>
		    	<Text style={styles.title}>Add Peso</Text>

		    	<TextInput style={styles.itemInput} onChange={this.handleChange} />

		    	<TouchableHighlight
			      	style={styles.button}
			      	underlayColor="white"
			      	onPress={this.handleSubmit}>
			      	<Text style={styles.buttonText}>Add</Text>
	    		</TouchableHighlight>

  			</View>
		);
	}
}