import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import AdicionarPeso from './components/HomeScreen';
import Infos from './components/About';
import MostrarHistorico from './components/History';
import AdicionarMetas from './components/Goals';


export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

const AppNavigator = createStackNavigator({
  Infos: {
    screen: Infos
  },
  AdicionarPeso: {
    screen: AdicionarPeso
  },
  MostrarHistorico: {
    screen: MostrarHistorico
  },
  AdicionarMetas: {
    screen: AdicionarMetas
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