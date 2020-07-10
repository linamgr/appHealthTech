import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabBarIcon from '../TabBarIcon';

export default function DataModule(props) {
  return(
    <View style={styles.pedometerData}>
      <TabBarIcon name={props.img} style={styles.pedometerIcon} />
      <View style={styles.pedometerTextContainer}>
        <Text style={styles.pedometerText}>{props.TextDate}</Text>
        <Text style={styles.pedometerValue}>{props.DataDate}</Text>

        <Text style={styles.pedometerText}>{props.TextSteps}</Text>
        <Text style={styles.pedometerValue}>{props.DataSteps}</Text>

        <Text style={styles.pedometerText}>{props.TextDuration}</Text>
        <Text style={styles.pedometerValue}>{props.DataDuration}</Text>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  pedometerData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 170,
    height: 140,
    borderRadius: 20,
    justifyContent: "space-around",
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 165,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5 ,
    shadowRadius: 2,
    elevation: 5,
    paddingLeft: 5
  },
  pedometerTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: '50%',
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red"
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
