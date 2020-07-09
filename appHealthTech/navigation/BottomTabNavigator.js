import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import GoalsScreen from '../screens/GoalsScreen';
import WeightHistoryScreen from '../screens/WeightHistoryScreen';
import AboutScreen from '../screens/AboutScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Metas';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Metas"
        component={GoalsScreen}
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
      return 'Informações do Usuário'
  }
}
