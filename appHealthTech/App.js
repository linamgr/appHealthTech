import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import GoalsScreen from './screens/GoalsScreen';
import GraphicScreen from './screens/GraphicScreen.js';
import WeightTrackerScreen from './screens/WeightTrackerScreen';

const Stack = createStackNavigator();
const Tabc = createBottomTabNavigator();
/*function  Tabs() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Goals"
        component={GoalsScreen} 
        />
      <Tab.Screen name="Weight History"
        component={WeightHistoryScreen} 
        />
    </Tab.Navigator>
  )

}*/
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
            <Stack.Screen name="Graphic" component={GraphicScreen}
            options={{
              headerStyle: {
                backgroundColor: '#52b1cf'
              },
              headerTintColor: '#FFF'
              
              
            } }/>
            <Stack.Screen name="AdicionarPeso" component={WeightTrackerScreen}
            options={{
              headerStyle: {
                backgroundColor: '#52b1cf'
              },
              headerTintColor: '#FFF'
              
              
            } }/>
            <Stack.Screen name="Goals" component={GoalsScreen}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
