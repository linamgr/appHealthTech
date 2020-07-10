import * as React from 'react';
import {
    Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView
  } from 'react-native';

import HistoryComponent from  '../components/Tracking/HistoryComponent';

export default function HistoryMonitor() {

    return(
        <View style={styles.historyMonitorContainer}>
            <Text style={styles.title}>Detalhes da Atividade</Text>
            <HistoryComponent/>
        </View>
    )
}

const styles = StyleSheet.create({
    historyMonitorContainer: {
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
