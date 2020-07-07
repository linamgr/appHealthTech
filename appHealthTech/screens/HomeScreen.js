import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeButtons from '../components/HomeButtons';
import { useLinkProps } from '@react-navigation/native';

const HomeScreen = props => {
    return (
      <View style={styles.screen}>
        <View style={styles.header_container}>
          <Text style={styles.header_text}>Olá Leonardo,</Text>
        </View>
        <View style={styles.components_container}>
          <View style={styles.components_horizontal}>
            <HomeButtons button_background='#52B1CF' icon_name='md-clock' text_button='Lembretes' navigation={props.navigation}/>
            <HomeButtons button_background='#79D18C' icon_name='ios-add-circle' text_button='Módulo 2'/>
          </View>
          <View style={styles.components_horizontal}>
            <HomeButtons button_background='#79D18C' icon_name='ios-add-circle' text_button='Módulo 3'/>            
            <HomeButtons button_background='#79D18C' icon_name='ios-add-circle' text_button='Módulo 4'/>
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      header_container: {
        marginTop: 100,
        width: '80%',
        //backgroundColor: 'rgb(0,0,255)',
      },
      header_text: {
        color: '#707070',
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
      },
      components_container: {
        width: '90%',
        height: 300,
        marginTop: 100,
        //backgroundColor: 'rgb(0,0,255)',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent:'space-between',
      },
      components_horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
  });

  export default HomeScreen;