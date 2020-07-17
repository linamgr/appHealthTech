import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from './screens/Principal';
import Listar from './screens/Listar';
import Adicionar from './screens/Adicionar';
import Grafico from './screens/Grafico';
import Editar from './screens/Editar';
import Metas from './screens/Metas';
import firebase from 'firebase';

import { YellowBox } from "react-native";
    import _ from "lodash";
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
    }
};

const Stack = createStackNavigator(); 

export default class App extends Component{
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Principal">
        <Stack.Screen name = "Metas" component = {Metas} options={{
        title: 'Metas',
       
        }}/>
        <Stack.Screen name = "Principal" component = {Principal} options={{
        headerShown: false,
        }}/>
        <Stack.Screen name = "Adicionar" component = {Adicionar} options={{
        title: 'Início',

        }}/>
        <Stack.Screen name = "Grafico" component = {Grafico} options={{
        title: 'Início',
        
        }}/>
        <Stack.Screen name = "Listar" component = {Listar} options={{
        title: 'Início',
       
        }}/>
        <Stack.Screen name = "Editar" component = {Editar} options={{
        title: 'Início',
      
        }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
console.disableYellowBox = true; 