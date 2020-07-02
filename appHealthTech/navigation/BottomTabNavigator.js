import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import GoalsScreen from '../screens/GoalsScreen';
import LinksScreen from '../screens/LinksScreen';
import WeightTrackerScreen from '../screens/WeightTrackerScreen';
import WeightHistoryScreen from '../screens/WeightHistoryScreen';
import AboutScreen from '../screens/AboutScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Weight History';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Weight"
        component={WeightTrackerScreen}
        options={{
          title: 'Weight Tracker',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Weight History"
        component={WeightHistoryScreen}
        options={{
          title: 'Weight History',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'User info',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Goals':
      return 'See your stats and goals';
    case 'Weight':
      return 'Weight Tracker';
    case 'Weight History':
      return 'Weight History';
    case 'About':
      return 'User info'
    case 'Links':
      return 'Links to learn more';
  }
}
