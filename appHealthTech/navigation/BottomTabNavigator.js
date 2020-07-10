import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ActivityMonitor from '../screens/ActivityMonitor';
import HistoryMonitor from '../screens/HistoryScreen';
import ListMonitor from '../screens/ListScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Activity Monitor';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="activity-monitor"
        component={ActivityMonitor}
        options={{
          title: 'Monitor de Atividades',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chess-knight" />,
        }}
      />
       <BottomTab.Screen
        name="list-monitor"
        component={ListMonitor}
        options={{
          title: 'Lista de atividades',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="candy-cane" />,
        }}
      />
      {/* <BottomTab.Screen
        name="History-monitor"
        component={HistoryMonitor}
        options={{
          title: 'Histórico de atividades',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="running" />,
        }} /> */}
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
    case 'Activity Monitor':
      return 'Monitor de atividades';
  }
}
