import {FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <FontAwesome5
      name={props.name}
      size={25}
      style={{ marginBottom: -2 }}
      color={Colors.tabIconSelected}
    />
  );
}
