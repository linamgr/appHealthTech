import {firebase} from '../src/firebase/config';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export class Fire{
    setAlarm( hora, tipo, nome, periodo){

        firebase.database().ref('Alarmes/').push({
            hora: hora,
            tipo: tipo,
            nome: nome,
            periodo: periodo,
            });
        Alert.alert('Lembrete Criado !', 'Um novo lembrete foi criado com sucesso !')
    };

    getAlarm(){
        const [state, setState] = useState();
        firebase.database().ref('Alarmes/').once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path
            setState({ stores: snapshot.val() })
        })
        return state;
    };

    /*getAlarm(){
        firebase.database().ref('Alarmes/').once('value').then(snapshot => {
            this.setState({
                alarms: snapshot.val()
            }); 
        });
    }*/

}
