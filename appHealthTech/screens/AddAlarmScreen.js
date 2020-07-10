import React, {useState} from 'react';
import { StyleSheet, 
        Text, 
        View, 
        TextInput, 
        ScrollView, 
        Picker,
        TouchableOpacity} from 'react-native';
import {Fire} from '../service/fire';


const AddAlarmScreen = props => {

    const database = new Fire();
    //Tratamento do campo Horario do Lembrete
    var current_hour = new Date().getHours();
    var string_current_hour = '';
    if(current_hour < 10)
    {
        string_current_hour = '0' + current_hour;
    }
    else
    {
        string_current_hour = string_current_hour + current_hour;
    }
    const [enteredHourGoal, setHEnteredGoal] = useState(string_current_hour);
    const [enteredHourSubmit, setHEnteredSubmit] = useState(enteredHourGoal);

    const [enteredMinGoal, setMEnteredGoal] = useState('00');
    const [enteredMinSubmit, setMEnteredSubmit] = useState(enteredMinGoal);

    const inputHourHandle = (enteredText) => {
        
        if (enteredText.length == 0) 
        {
           enteredText = '0' + enteredHourGoal;
        }
        var num = parseInt(enteredText);
        if(num > 23)
        {
            enteredText = '0' + enteredText[0];
        }
        setHEnteredGoal(enteredText);
    }

    const submitHourHandle = (ObjectEvent) => {
        
        if(ObjectEvent.nativeEvent.text.length == 1)
        {
            //console.log(ObjectEvent.nativeEvent.text);
            //console.log(enteredHourGoal);
            var aux = '0'+ObjectEvent.nativeEvent.text;
            setHEnteredGoal(aux);
        }
    }
    const inputMinHandle = (enteredText) => {
        if (enteredText.length == 0) 
        {
            enteredText = '0' + enteredMinGoal;
        }
        var num = parseInt(enteredText);
        if(num > 59)
        {
            enteredText = '0' + enteredText[0];
        }
        setMEnteredGoal(enteredText);
    }
    const submitMinHandle = (ObjectEvent) => {
        
        if(ObjectEvent.nativeEvent.text.length == 1)
        {
            //console.log(ObjectEvent.nativeEvent.text);
            //console.log(enteredHourGoal);
            var aux = '0'+ObjectEvent.nativeEvent.text;
            setMEnteredGoal(aux);
        }
    }

    //Tratamento campo Nome do Lembrete
    const [enteredNameReminder, setNameReminder] = useState('Beber Água');

    const inputNameReminderHandle = (enteredText) => {
        setNameReminder(enteredText);
    }

    //Tratamento campo Tipo do Lembrete
    const [selectedType, setSelectedType] = useState('agua');

    //Tratamento campo Repetir a cada
    const [enteredHourRepeatGoal, setHRepeatEnteredGoal] = useState('01');
    const [enteredMinRepeatGoal, setMRepeatEnteredGoal] = useState('00');

    const inputHourRepeatHandle = (enteredText) => {
        
        if (enteredText.length == 0) 
        {
           enteredText = '0' + enteredHourRepeatGoal;
        }
        var num = parseInt(enteredText);
        if(num > 23)
        {
            enteredText = '0' + enteredText[0];
        }
        setHRepeatEnteredGoal(enteredText);
    }

    const inputMinRepeatHandle = (enteredText) => {
        if (enteredText.length == 0) 
        {
            enteredText = '0' + enteredMinRepeatGoal;
        }
        var num = parseInt(enteredText);
        if(num > 59)
        {
            enteredText = '0' + enteredText[0];
        }
        setMRepeatEnteredGoal(enteredText);
    }

    const [enteredHourRepeatSubmit, setHRepeatEnteredSubmit] = useState(enteredHourRepeatGoal);
    const [enteredMinRepeatSubmit, setMRepeatEnteredSubmit] = useState(enteredMinRepeatGoal);

    const submitHourRepeatHandle = (ObjectEvent) => {
        
        if(ObjectEvent.nativeEvent.text.length == 1)
        {
            //console.log(ObjectEvent.nativeEvent.text);
            //console.log(enteredHourGoal);
            var aux = '0'+ObjectEvent.nativeEvent.text;
            setHRepeatEnteredGoal(aux);
        }
    }

    const submitMinRepeatHandle = (ObjectEvent) => {
        
        if(ObjectEvent.nativeEvent.text.length == 1)
        {
            //console.log(ObjectEvent.nativeEvent.text);
            //console.log(enteredHourGoal);
            var aux = '0'+ObjectEvent.nativeEvent.text;
            setMRepeatEnteredGoal(aux);
        }
    }
    

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.scroll_style} showsVerticalScrollIndicator={false}>
                <View style={styles.header_container}>
                    <Text style={styles.header_text}>Novo Lembrete</Text>
                </View>
                <View style={styles.input_container}>
                    <View style={styles.text_time_container}>
                        <Text style={styles.text_time}>
                            Horário do Lembrete:
                        </Text>
                    </View>
                    <View style={styles.input_time}>
                        <TextInput
                        style={styles.hourInp}
                        keyboardType={"numeric"}
                        value={enteredHourGoal}
                        maxLength={2}
                        onChangeText={inputHourHandle}
                        onSubmitEditing = {submitHourHandle}
                        />
                        <Text style={styles.hourInp}>
                            :
                        </Text>
                        <TextInput
                        style={styles.minInp}
                        keyboardType={"numeric"}
                        value={enteredMinGoal}
                        maxLength={2}
                        onChangeText={inputMinHandle}
                        onSubmitEditing = {submitMinHandle}
                        />
                        <Text>
                            pm
                        </Text>
                    </View>
                    <View style={styles.text_time_container}>
                        <Text style={styles.text_time}>
                            Tipo do Lembrete:
                        </Text>
                    </View>
                    <View style={styles.text_input_container}>
                        <Picker
                        selectedValue={selectedType}
                        style={{width: '100%'}}
                        onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
                            <Picker.Item label="Remédio" value="remedio"/>
                            <Picker.Item label="Água" value="agua"/>
                        </Picker>
                    </View>
                    <View style={styles.text_time_container}>
                        <Text style={styles.text_time}>
                            Nome do Lembrete:
                        </Text>
                    </View>
                    <TextInput
                    style={styles.text_input_container}
                    value={enteredNameReminder}
                    onChangeText={inputNameReminderHandle}
                    />
                    <View style={styles.text_time_container}>
                        <Text style={styles.text_time}>
                            Repetir a cada:
                        </Text>
                    </View>
                    <View style={styles.input_repeat_time}>
                        <TextInput
                        style={{fontSize: 25}}
                        keyboardType={"numeric"}
                        value={enteredHourRepeatGoal}
                        maxLength={2}
                        onChangeText={inputHourRepeatHandle}
                        onSubmitEditing = {submitHourRepeatHandle}
                        />
                        <Text style={{fontSize:25}}>
                            :
                        </Text>
                        <TextInput
                        style={{fontSize: 25}}
                        keyboardType={"numeric"}
                        value={enteredMinRepeatGoal}
                        maxLength={2}
                        onChangeText={inputMinRepeatHandle}
                        onSubmitEditing = {submitMinRepeatHandle}
                        />
                    </View>
                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => {
                            database.setAlarm(enteredHourGoal+":"+enteredMinGoal,selectedType,enteredNameReminder,enteredHourRepeatGoal+":"+enteredMinRepeatGoal);
                            props.navigation.navigate('HomeScreen');
                            }} style={styles.button_background}>
                            <Text style={styles.text_button}>Pronto!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#52B1CF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll_style: {
        //backgroundColor: '#FFFF',
        width : '100%',
    },
    header_container: {
        marginTop: 80,
        marginBottom: 50,
        width: '80%',
        //backgroundColor: 'rgb(0,0,255)',
      },
      header_text: {
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      input_container: {
          //backgroundColor: '#ffaf',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
      },
      text_time_container: {
        width: 280, 
        //backgroundColor: '#DDDD',
        marginBottom: 15,
      },
      text_time: {
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 'bold',
          textAlign: 'left',
      },
      input_time: {
          flexDirection: 'row',
          backgroundColor: '#FFF',
          padding: 10,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
              width: 0,
              height: 2,},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 15,
          marginBottom: 50,
      },
      hourInp: {
          fontSize: 80,
          fontWeight: 'bold',
      },
      minInp: {
        fontSize: 80,
      },
      text_input_container: {
          backgroundColor: '#FFF',
          width: 300,
          padding: 10,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: {
              width: 0,
              height: 2,},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 15,
          marginBottom: 50,
          fontSize: 18,
      },
      input_repeat_time: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
        marginBottom: 30,
        width: 200,
        justifyContent: "center",
      },
      button_container: {
        marginBottom: 10,
        //backgroundColor: 'rgb(255,0,0)',
      },
      button_background: {
        backgroundColor: '#F69ACC',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        elevation: 5,
      },
      text_button: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
      },

});

export default AddAlarmScreen;