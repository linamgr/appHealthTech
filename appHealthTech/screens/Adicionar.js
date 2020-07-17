import React, {useState, useEffect} from 'react';
import{StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Picker, Alert, Modal} from 'react-native';
import firebase from '../firebase/firebase'
import NumericInput from 'react-native-numeric-input'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
console.disableYellowBox = true; 



var date = new Date().getDate().toString();
var month = new Date().getMonth() + 1;
var monthString = month.toString();
var year = new Date().getFullYear().toString();

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
function Adicionar({navigation}){

  const alimentoInput = useAlimentosInput();

  /*Declaração dos useStates*/
  const [valorCalorico, setValorCalorico] = useState( );
  const [alimento, setAlimento] = useState('');
  const [turno, setTurno] = useState('');
  const [quantidade, setQuantidade] = useState( );
  const [dia, setDia] = useState(date);
  const [mes, setMes] = useState(monthString);
  const [ano, setAno] = useState(year);
  const [caloriasRefeicaoTotal, setCaloriasRefeicaoTotal] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const quantidadeHandler = (variavel) => {
    let qtd = parseInt(variavel)
    setQuantidade(qtd);
    };

  /*Função que adiciona os valores de useState pro banco e reseta eles no fim*/
  function onSubmit(e){
    let caloriasRefeicaoTotal = calcCalGrama(quantidade,valorCalorico)
    setCaloriasRefeicaoTotal(caloriasRefeicaoTotal)

    e.preventDefault()
    if(alimento !=  '' && quantidade != '' && turno != '' && dia != ''){
    firebase.firestore().collection('Refeicoes').add({
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
      setAlimento('')
      setQuantidade('')
      setDia('')
      setMes('')
      setAno('')
      setTurno('')
      setValorCalorico('')
      setCaloriasRefeicaoTotal('')
      navigation.navigate('Principal')
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

 function calcCalGrama(qtd,valorCal)
{
  return qtd*valorCal;
}


/*Renderização da tela*/
  return(
    <ScrollView style = {Styles.container}>
       <AwesomeButtonRick type="secondary" style = {Styles.box}
            paddingHorizontal = {15}
            borderWidth = {0.7}
            borderColor = 'black'
            stretch = 'true'
            raiseLevel = {2.5}
            
            backgroundDarker='rgb(175,244,65)' borderColor = 'black'
            
            onPress = {modalOpener}>
            
            
            Buscar Alimento
  
            </AwesomeButtonRick>
        <Modal visible = {isVisible}>
          <ScrollView style = {Styles.container2}>
          {alimentoInput.map((entradas) =>
            <View>
              <TouchableOpacity key = {entradas.id}
                                style = {Styles.row} 
                                onPress = {()=> {setAlimento(entradas.nomeAlimento); setValorCalorico(entradas.valorCalorico); setIsVisible(false)}}>
              <Text style = {Styles.alimentoText}>{entradas.nomeAlimento}</Text>
              <Text style = {Styles.caloriasText}>{entradas.valorCalorico} cal/g</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </Modal>
      <Text style = {Styles.inputQuantidade}>Alimento escohido</Text>
      <Text style = {Styles.inputAlimento}>{'\n'}{alimento}</Text>
      <Text style= {Styles.inputQuantidade}>Quantidade</Text>
      <TextInput placeholder = "Quantidade(em gramas)" 
                 keyboardType = "numeric" 
                 style={Styles.textinput}
                 onChangeText={quantidadeHandler}
                 value = {quantidade} />
      <Text style= {Styles.input}>Data</Text>
      <View style = {Styles.entradas2}>
            <Picker style= {Styles.data}
                    key = {Picker.Item.value}
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
                    key = {Picker.Item.value}
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
                    key = {Picker.Item.value}
                    onValueChange = {(itemValueAno)=>setAno(itemValueAno)}>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="2020" value="2020" />
                    <Picker.Item label="2019" value="2019" />
            </Picker>
        </View> 
      <Text style= {Styles.inputTurno}>Turno</Text>
      <Picker style= {{width:'100%'}}
              key = {Picker.Item.value}
              selectedValue = {turno}
              onValueChange = {(itemValueTurno) => setTurno(itemValueTurno)}>
        <Picker.Item label="" value="" />
        <Picker.Item label="Café da manhã" value="Café da manhã" />
        <Picker.Item label="Almoço" value="Almoço" />
        <Picker.Item label="Janta" value="Janta" />
      </Picker>
        <TouchableOpacity onPress= {onSubmit}><Text style={Styles.buttonText}>ADICIONAR</Text></TouchableOpacity>
    </ScrollView>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignContent: 'center',
  },

  input: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center'
  },

  inputQuantidade: {
    marginTop: 45,
    fontSize: 24,
    textAlign: 'center',
  },
  
  inputTurno: {
    textAlign: 'center',
    fontSize: 24,
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
  },
  box:{
    width: '100%',
    marginTop:50,
  },
  button:{
  
    //marginLeft: '40%',
    marginTop:10,
    //justifyContent: 'center',
    //alignItems: 'center',
    height:60,
    width: 60,
    backgroundColor:'#9be5c5',
    borderRadius:100,
    borderWidth: 1,
    borderColor: 'black'
  },
});

export default Adicionar;