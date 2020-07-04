import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ScreenNavigator from './ScreenNavigator';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'WaterTabNav';


export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown:false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} >
      <BottomTab.Screen
        name="WaterTabNav"
        component={ScreenNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={ScreenNavigator}
        options={{
          title: 'Lembretes',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-clock" />,
        }}
      />
    </BottomTab.Navigator>

  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'WaterTabNav':
      return 'Gerenciador de Lembretes';
    case 'Links':
      return 'Links to learn more';
  }
}
