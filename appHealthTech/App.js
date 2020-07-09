import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import TabBarIcon from './components/TabBarIcon';
import GoalsScreen from './screens/GoalsScreen';
import GraphicScreen from './screens/GraphicScreen';
import WeightHistoryScreen from './screens/WeightHistoryScreen';
import AboutScreen from './screens/AboutScreen';
import WeightTrackerScreen from './screens/WeightTrackerScreen';


const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const GoalsStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Metas';


export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomTabNavigator}
            options={{
              headerStyle: {
                backgroundColor: '#52b1cf'
              },
              headerTintColor: '#FFF'
              
              
            } }/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

function GoalsStackScreen() {
  return (
    <GoalsStack.Navigator>
      <GoalsStack.Screen name="Metas" component={GoalsScreen} />
      <GoalsStack.Screen name="IMC" title='Cálculo do IMC' component={GraphicScreen} options={
        {
          headerStyle: {
            backgroundColor: '#52b1cf'
          },
          headerTintColor: '#FFF'
        } 
      } />
      <Stack.Screen name="AdicionarPeso" component={WeightTrackerScreen} options={
        {
          headerStyle: {
            backgroundColor: '#52b1cf'
          },
          headerTintColor: '#FFF'
        } 
      } />
    </GoalsStack.Navigator>
  );
}

function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Metas"
        component={GoalsStackScreen}
        options={{
          title: 'Metas',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-analytics" />,
        }}
      />
      <BottomTab.Screen
        name="Histórico"
        component={WeightHistoryScreen}
        options={{
          title: 'Histórico',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-filing" />,
        }}
      />
      <BottomTab.Screen
        name="Usuário"
        component={AboutScreen}
        options={{
          title: 'Usuário',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Metas':
      return 'Rastreador de Metas de Saúde';
    case 'Histórico':
      return 'Histórico de Pesos';
    case 'Usuário':
      return 'Informações do Usuário';
    case 'Graphic':
        return 'Índice de Massa Corporal (IMC)'
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
