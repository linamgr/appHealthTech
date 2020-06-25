import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import AdicionarPeso from './components/HomeScreen';
import InformaçõesScreen from './components/About';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Informações: {
    screen: InformaçõesScreen
  },
  AdicionarPeso: {
    screen: AdicionarPeso
  }
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});