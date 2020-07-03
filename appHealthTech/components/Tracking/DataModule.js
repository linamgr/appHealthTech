import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DataModule(props) {
  return(
    <View style={styles.pedometerData}>
      <Text style={styles.pedometerText}>{props.Text}</Text>
      <Text style={styles.pedometerValue}>{props.Data}</Text>
    </View>
  );
}
  
const styles = StyleSheet.create({
  pedometerData: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 50,  
    backgroundColor: '#add8e6',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  },
  pedometerText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: "bold"
  },
  pedometerValue: {
    display: 'flex',
    justifyContent: 'center',
    color: '#5a5a5a',
    textAlign: 'center'
  }
})
