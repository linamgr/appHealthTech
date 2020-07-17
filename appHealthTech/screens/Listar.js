import React, {Component, useState, useEffect} from 'react';
import{ StyleSheet, Text, View, Alert, ScrollView} from 'react-native';
import firebase from '../firebase/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';


function useEntradaInput(){
  const [entradaInput, setEntradaInput] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Refeicoes')
    .onSnapshot((snapshot) => {
      const novaEntrada = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setEntradaInput(novaEntrada)
    })
    return () => unsubscribe()
  }, [])
  return entradaInput
}

export default function Listar({navigation, route}){
  const entradaInput = useEntradaInput();
  return(
    <ScrollView style = {Styles.container}>
        {entradaInput.map((entradas) =>
        <TouchableOpacity onPress = {() => 
          {Alert.alert(
            //Notificação
            'O que deseja fazer?',
            //Corpo
            '',
            [
              {text: 'Modificar', onPress: () => {
                navigation.navigate('Editar', {entradas: entradas})
              }},
              {text: 'Excluir', onPress: () => {
                firebase.firestore().collection('Refeicoes').doc(entradas.id).delete().then(
                navigation.navigate('Principal'))
              }}
            ],
            {cancelable: true}
          );}
        }>
          <View style = {Styles.row}>
          <Text style = {Styles.alimentoText}>Alimento: {entradas.alimento}</Text>
          <Text style = {Styles.turnoText}>Turno: {entradas.turno}</Text>
          <Text style = {Styles.diaText}>{entradas.dia}/{entradas.mes}/{entradas.ano}</Text>
          <Text style = {Styles.caloriasText}>{entradas.caloriasRefeicaoTotal}cal</Text>
          </View>
        </TouchableOpacity>
        )}
    </ScrollView>
  );
}

//{retornaCalorias(itemData.item.value2)}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    marginBottom: 10
  },
  
  alimentoText: {
    fontSize: 20,
    lineHeight: 40,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  
  turnoText: {
    fontSize: 20,
    lineHeight: 40,
    fontWeight: 'bold',
    textAlign: 'right'
  },

  diaText: {
    position: 'absolute',
    fontSize: 20,
    bottom: 1,
    left: 10,
    lineHeight: 40,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 10
  },

  caloriasText: {
    position: 'absolute',
    fontSize: 48,
    top: 10,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    color: 'gray',
    marginLeft: 10
  },

  row: {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderBottomColor: 'black'
  }
});