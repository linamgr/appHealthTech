import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ListScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Olá Leonardo,</Text>
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('AddAlarmScreen');}} style={styles.button_background}>
          <Text style={styles.text_button}>+ Adicionar Lembrete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#52B1CF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_container: {
    marginTop: 100,
    width: '80%',
    //backgroundColor: 'rgb(0,0,255)',
  },
  header_text: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  button_container: {
    marginBottom: 100,
    //backgroundColor: 'rgb(255,0,0)',
  },
  button_background: {
    backgroundColor: '#F69ACC',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  text_button: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListScreen;
