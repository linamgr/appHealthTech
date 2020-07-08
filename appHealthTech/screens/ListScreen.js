import * as React from 'react';
import {
    Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView
  } from 'react-native';

import ListComponent from  '../components/Tracking/ListComponent';

export default function ListMonitor() {

    return(
        <View style={styles.listMonitorContainer}>
            <Text style={styles.title}>Lista de Atividades</Text>
            <ListComponent/>
        </View>
    )
}

const styles = StyleSheet.create({
    listMonitorContainer: {
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
        fontSize: 18,
        textAlign: 'center',
        color: "white",
        fontWeight: "bold"
    }
})
