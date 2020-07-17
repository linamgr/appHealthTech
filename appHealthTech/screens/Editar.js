import React, {useState, useEffect} from 'react';
import{StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Picker, Alert, Modal, Button} from 'react-native';
import firebase from '../firebase/firebase'
import NumericInput from 'react-native-numeric-input'

/*Resgatar valores do banco de alimentos */
function useAlimentosInput(){
  const [alimentoInput, setAlimentoInput] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('ColecaoGabriel')
    .onSnapshot((snapshot) => {
      const novaEntrada = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setAlimentoInput(novaEntrada)
    })
    return () => unsubscribe()
  }, [])
  return alimentoInput
}


/*Começo do código da tela*/
function Editar({navigation, route}){

  const alimentoInput = useAlimentosInput();
  
  /*Pegar os parâmetros da tela listada*/
  var entradas = route.params['entradas'];

  /*Declaração dos useStates*/
  const [valorCalorico, setValorCalorico] = useState(entradas.valorCalorico);
  const [alimento, setAlimento] = useState(entradas.alimento)
  const [turno, setTurno] = useState(entradas.turno);
  const [quantidade, setQuantidade] = useState(entradas.quantidade);
  const [dia, setDia] = useState(entradas.dia);
  const [mes, setMes] = useState(entradas.mes);
  const [ano, setAno] = useState(entradas.ano);
  const [caloriasRefeicaoTotal, setCaloriasRefeicaoTotal] = useState(entradas.caloriasRefeicaoTotal);
  const [isVisible, setIsVisible] = useState(false);
  
  function onCancelUpdate(){
      navigation.navigate('Listar')
  }
  /*Função que adiciona os valores de useState pro banco e reseta eles no fim*/
  function onSubmitUpdate(e){
    let caloriasRefeicaoTotal = quantidade*valorCalorico
    setCaloriasRefeicaoTotal(caloriasRefeicaoTotal)

    e.preventDefault()
    if(alimento !=  '' && quantidade != '' && turno != '' && dia != ''){
    firebase.firestore().collection('Refeicoes').doc(entradas.id).update({
      alimento,
      quantidade,
      dia,
      mes,
      ano,
      turno,
      valorCalorico,
      caloriasRefeicaoTotal
    })
    .then(() => {
      navigation.navigate('Listar')
    })
    }
    else{
      if((alimento == '' ) || (quantidade == '') || (turno == '')){
      Alert.alert(
        //Notificação
        'Selecione uma opção',
        //Corpo
        'Uma ou todas as caixas não foram selecionadas',
        [
          {text: 'OK', onPress: () => {}}
        ],
        {cancelable: true}
      );
      }
    }
  }

/*BOOLEAN que controla o acesso ao Modal*/
function modalOpener(){
  setIsVisible(true);
}

/*Renderização da tela*/
  return(
    <ScrollView style = {Styles.container}>
    <Button style= {Styles.input} title= 'Escolher alimento' onPress = {modalOpener}/>
        <Modal visible = {isVisible}>
          <ScrollView style = {Styles.container2}>
          {alimentoInput.map((entradas) =>
            <View>
              <TouchableOpacity style = {Styles.row} 
                                onPress = {()=> {setAlimento(entradas.nomeAlimento); setValorCalorico(entradas.valorCalorico); setIsVisible(false)}}>
              <Text style = {Styles.alimentoText}>{entradas.nomeAlimento}</Text>
              <Text style = {Styles.caloriasText}>{entradas.valorCalorico} cal/g</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </Modal>
      <Text style = {Styles.inputQuantidade}>Alimento escohido:</Text>
      <Text style = {Styles.inputAlimento}>{'\n'}{alimento}</Text>
      <Text style= {Styles.inputQuantidade}>Quantidade:</Text>
      <NumericInput value = {quantidade}
                    onChange= {(itemValueQuantidade) => setQuantidade(itemValueQuantidade)}
                    iconsize = {45}
                    totalWidth={360} 
                    totalHeight={50}
                    step = {1}
                    valueType = 'integer'     
      />
      <Text style= {Styles.input}>Data:</Text>
      <View style = {Styles.entradas2}>
            <Picker style= {Styles.data}
                    selectedValue = {dia}
                    onValueChange = {(itemValueDia)=> setDia(itemValueDia)}>
                    <Picker.Item label="" value= "" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="21" />
                    <Picker.Item label="22" value="22" />
                    <Picker.Item label="23" value="23" />
                    <Picker.Item label="24" value="24" />
                    <Picker.Item label="25" value="25" />
                    <Picker.Item label="26" value="26" />
                    <Picker.Item label="27" value="27" />
                    <Picker.Item label="28" value="28" />
                    <Picker.Item label="29" value="29" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="31" value="31" />
            </Picker>
            <Picker style= {Styles.data}
                    selectedValue = {mes}
                    onValueChange = {(itemValueMes)=>setMes(itemValueMes)}>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
            </Picker>
            <Picker style= {Styles.data}
                    selectedValue = {ano}
                    onValueChange = {(itemValueAno)=>setAno(itemValueAno)}>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="2020" value="2020" />
                    <Picker.Item label="2019" value="2019" />
            </Picker>
        </View> 
      <Text style= {Styles.inputTurno}>Turno:</Text>
      <Picker style= {{width:'100%'}}
              selectedValue = {turno}
              onValueChange = {(itemValueTurno) => setTurno(itemValueTurno)}>
        <Picker.Item label="" value="" />
        <Picker.Item label="Café da manhã" value="Café da manhã" />
        <Picker.Item label="Almoço" value="Almoço" />
        <Picker.Item label="Janta" value="Janta" />
      </Picker>
      <View>
        <TouchableOpacity onPress= {onSubmitUpdate}><Text style={Styles.buttonText}>MODIFICAR</Text></TouchableOpacity>
        <TouchableOpacity onPress= {onCancelUpdate}><Text style={Styles.buttonText}>CANCELAR</Text></TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 10
  },

  input: {
    marginTop: 20,
    borderColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
  },

  inputQuantidade: {
    marginTop: 45,
    borderColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  
  inputTurno: {
    borderColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
  },

  textinput: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: 'black'
  },

  buttonText:{
    alignSelf: 'center',
    padding: 30,
    fontSize: 25,
    color: "#f7287b",
    fontWeight: "bold",
  },

  buttonText2:{
    alignSelf: 'center',
    padding: 30,
    fontSize: 25,
    color: 'black',
    fontWeight: "bold",
  },

  resultado: {
    alignSelf: "center",
    color: "lightgray",
    fontSize: 35,
  },
  entradas2:{
    flexDirection: 'row', 
    justifyContent:'space-between',
  },
  data: {
    padding: 60,
  },

  container2: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    marginBottom: 10
  },
  
  alimentoText: {
    position: 'absolute',
    top: 17,
    left: 10,
    fontSize: 30,
    lineHeight: 50,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  caloriasText: {
    fontSize: 30,
    top: 10,
    fontWeight: 'bold',    
    textAlign: 'right',
    color: '#f7287b',
    marginBottom: 25
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

export default Editar;