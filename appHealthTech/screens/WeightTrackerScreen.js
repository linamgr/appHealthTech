import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
    backgroundColor: '#52b1cf'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color:'#FFFFFF'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'auto',
    padding: 70
  },
  button: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'auto',
    justifyContent: 'center'
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

export default class Homescreen extends React.Component {

    handleChange = e => {
    	this.setState({name: e.nativeEvent.text
    	});
  	};


  	handleSubmit = () => {
    	addItem(this.state.name);
  };
  

    render() {
	    return (
	  		<View style={styles.main}>
	  			
		    	<Text style={styles.title}>Insira aqui o peso desejado</Text>

          <TextInput style={styles.itemInput}
          placeholder="Peso(kg)"
          onChangeText={text =>"digite o peso aqui"}
          onChange={this.handleChange} />

          <TouchableOpacity
                    style= {styles.buttonStyle}
                    activeOpacity = { .5 }
                    onPress={this.handleSubmit}>
                    <Text style={styles.textButton}> REGISTRAR </Text>
                    </TouchableOpacity>
  			</View>
		);
	}
}