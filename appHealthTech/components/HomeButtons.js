import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as React from 'react';

export default function HomeButtons(props) {
  return (
    <View style={{
        width: '46%',
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: props.button_background,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('WaterTabNav');}}>
            <Text style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
            }}>{props.text_button}</Text>
            <View style={{alignItems:'center', marginTop:10}}>
            <Ionicons
            name={props.icon_name}
            size={40}
            color='#FFF'
            />
            </View>
        </TouchableOpacity>
    </View>
  );
}
