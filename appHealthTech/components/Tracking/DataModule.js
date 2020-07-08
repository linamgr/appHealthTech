import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabBarIcon from '../TabBarIcon';

export default function DataModule(props) {
  return(
    <View style={styles.pedometerData}>
      <TabBarIcon name={props.img} style={styles.pedometerIcon} />
      <View style={styles.pedometerTextContainer}>
        <Text style={styles.pedometerText}>{props.Text}</Text>
        <Text style={styles.pedometerValue}>{props.Data}</Text>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  pedometerData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    height: 50,
    borderRadius: 50,
    justifyContent: "space-around",
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 150,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5 ,
    shadowRadius: 2,
    elevation: 5,
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red"
  },
  pedometerTextContainer: {
    width: '50%',
  },
  pedometerText: {
    fontWeight: "bold",
    textAlign: 'center'
  },
  pedometerValue: {
    color: '#5a5a5a',
    textAlign: 'center'
  }
})
