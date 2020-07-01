import * as React from 'react';
import {
    Image, Platform, StyleSheet, Text, TouchableOpacity, View
  } from 'react-native';

import PedometerComponent from  '../components/Tracking/PedometerComponent';

export default function ActivityMonitor() {

    return(
        <View style={styles.activityMonitorContainer}>
            <Text style={styles.title}>Histórico de Atividades</Text>
            <PedometerComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    activityMonitorContainer: {
        flex: 1,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    title: {
        color: 'red',
        textAlign: 'center'
    }
})
