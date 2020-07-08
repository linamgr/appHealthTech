import * as React from 'react';
import {
    Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView
  } from 'react-native';

import PedometerComponent from  '../components/Tracking/PedometerComponent';

export default function ActivityMonitor() {

    return(
        <View style={styles.activityMonitorContainer}>
            <Text style={styles.title}>Atividade Atual</Text>
            <PedometerComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    activityMonitorContainer: {
        display: "flex",
        backgroundColor: 'white',
        minHeight: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#52B1CF',
    },
    title: {
        // fontSize: "1.6em",
        fontSize: 18,
        textAlign: 'center',
        color: "white",
        fontWeight: "bold"
    }
})
