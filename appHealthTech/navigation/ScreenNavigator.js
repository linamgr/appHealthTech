import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListScreen from '../screens/ListScreen';
import AddAlarmScreen from '../screens/AddAlarmScreen';


const Stack = createStackNavigator();

const WaterScreenNavigator = props => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="WaterScreenList" component={ListScreen} />
            <Stack.Screen name="AddAlarmScreen" component={AddAlarmScreen} />
        </Stack.Navigator>
    );
};

export default WaterScreenNavigator;