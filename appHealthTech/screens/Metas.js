import React, {useState, useEffect} from 'react';
import{StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Picker, Alert, Modal, Button} from 'react-native';
import firebase from '../firebase/firebase'
import NumericInput from 'react-native-numeric-input'

export function calculaIdade(dia,mes,ano)
{
    var diaAtual = new Date().getDate();
    var mesAtual = new Date().getMonth()+1;
    var anoAtual = new Date().getFullYear();
    let idade = anoAtual-ano
    let mesIdade = mesAtual-mes
    if(mesIdade<0)
    {
      idade = idade-1
      return idade;
    }
    else
    {
      let diaIdade = diaAtual-dia
      if(diaIdade<0)
      {
        idade=idade-1
        return idade;
      }
      else
      {
        return idade;
      }
    }
}

export function calculaCalorias(peso, altura, idade, sexo, nivelAtiv, objetivo)
{
    if(sexo=='m') //calculo para homem
    {
      //taxa metabolica basal para homens(TMB) = 66.47 + (13.75 * peso [kg]) + (5.003 * altura [cm]) − (6.755 * idade [anos])
        let tmb=66.47 + (13.75*peso) + (5.003*altura) - (6.755*idade)
        if(nivelAtiv=='leve') //atividade leve
        {
          tmb=tmb*1.375
        }
        else
        {
          if(nivelAtiv=='moderada') //atividade moderada
          {
            tmb=tmb*1.55
          }
          else
          {
            if(nivelAtiv=='elevada') //atividade elevada
            {
              tmb=tmb*1.725
            }
            else //atividade intensa
            {
              tmb=tmb*1.9
            }
          }
        }
        if(objetivo=='gpeso') //para ganhar peso
        {
            return tmb*1.1; //para ganhar peso: aumenta em 10% a taxa de calorias ingerida
        }
        else
        {
          if(objetivo=='ppeso') //para perder peso
          {
              return tmb*0.9; //para perder peso: diminui em 10% a taxa de calorias ingeridas
          }
          else //para manter peso
          {
              return tmb; // para manter peso: mantem a taxa calculada
          }
        }
    }
    else //calculo para mulher
    {
      //taxa metabolica basal para mulheres(TMB) = 655.1 + (9.563 * peso [kg]) + (1.85 * altura [cm]) − (4.676 * idade [anos])
      let tmb = 655.1 + (9.563*peso) + (1.85*altura) - (4.676*idade)
        if(nivelAtiv=='leve') //atividade leve
        {
          tmb=tmb*1.375
        }
        else
        {
          if(nivelAtiv=='moderada') //atividade moderada
          {
            tmb=tmb*1.55
          }
          else
          {
            if(nivelAtiv=='elevada') //atividade elevada
            {
              tmb=tmb*1.725
            }
            else //atividade intensa
            {
              tmb=tmb*1.9
            }
          }
        }
        if(objetivo=='gpeso') //para ganhar peso
        {
            return tmb*1.1; //para ganhar peso: aumenta em 10% a taxa de calorias ingerida
        }
        else
        {
          if(objetivo=='ppeso') //para perder peso
          {
              return tmb*0.9; //para perder peso: diminui em 10% a taxa de calorias ingeridas
          }
          else //para manter peso
          {
              return tmb; // para manter peso: mantem a taxa calculada
          }
        }
    }
}

/*Começo do código da tela*/
function Metas({navigation}){
    
    const [peso, setPeso] = useState( );
    const [altura, setAltura] = useState();
    const [dia, setDia] = useState();
    const [mes, setMes] = useState();
    const [ano, setAno] = useState();
    const [sexo, setSexo] = useState('');
    const [nivelAtividade, setNivelAtividade] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [calDiaria, setCalDiaria] = useState();


  /*Função que adiciona os valores de useState pro banco e reseta eles no fim*/
  function onSubmit(e){
    let cal = calculaCalorias(parseFloat(peso),parseFloat(altura),calculaIdade(parseInt(dia),parseInt(mes),parseInt(ano)),sexo,nivelAtividade,objetivo).toFixed(2)
    setCalDiaria(cal)

    e.preventDefault()
    if(peso !=  '' && altura != '' && nivelAtividade != '' && objetivo != '' && sexo != ''){
    firebase.firestore().collection('user').add({
      peso,
      altura,
      sexo,
      nivelAtividade,
      objetivo,
      calDiaria
    })
    .then(() => {
      navigation.navigate('Principal')
    })
    }
    else{
      if((peso == '' ) || (altura == '') || (sexo == '')|| (objetivo == '')){
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

/*Renderização da tela*/
  return(
    <ScrollView style = {Styles.container}>
    <Text style= {Styles.inputQuantidade}>Peso(kg):</Text>
      <NumericInput value = {peso}
                    onChange= {(itemValuePeso) => setPeso(itemValuePeso)}
                    iconsize = {45}
                    totalWidth={360} 
                    initValue = {70}
                    totalHeight={50}
                    step = {0.5}
                    valueType = 'real'     
      />
    <Text style= {Styles.inputQuantidade}>Altura(cm):</Text>
      <NumericInput value = {altura}
                    onChange= {(itemValueAltura) => setAltura(itemValueAltura)}
                    iconsize = {45}
                    totalWidth={360} 
                    maxValue = {240}
                    minValue = {130}
                    initValue = {170}
                    totalHeight={50}
                    step = {1}
                    valueType = 'integer'     
      />
      <Text style= {Styles.input}>Data de nascimento:</Text>
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
                    <Picker.Item label="2018" value="2018" />
                    <Picker.Item label="2017" value="2017" />
                    <Picker.Item label="2016" value="2016" />
                    <Picker.Item label="2015" value="2015" />
                    <Picker.Item label="2014" value="2014" />
                    <Picker.Item label="2013" value="2013" />
                    <Picker.Item label="2012" value="2012" />
                    <Picker.Item label="2011" value="2011" />
                    <Picker.Item label="2010" value="2010" />
                    <Picker.Item label="2009" value="2009" />
                    <Picker.Item label="2008" value="2008" />
                    <Picker.Item label="2007" value="2007" />
                    <Picker.Item label="2006" value="2006" />
                    <Picker.Item label="2005" value="2005" />
                    <Picker.Item label="2004" value="2004" />
                    <Picker.Item label="2003" value="2003" />
                    <Picker.Item label="2002" value="2002" />
                    <Picker.Item label="2001" value="2001" />
                    <Picker.Item label="2000" value="2000" />
                    <Picker.Item label="1999" value="1999" />                    
                    <Picker.Item label="1998" value="1998" />
                    <Picker.Item label="1997" value="1997" />
                    <Picker.Item label="1996" value="1996" />
                    <Picker.Item label="1995" value="1995" />
                    <Picker.Item label="1994" value="1994" />
                    <Picker.Item label="1993" value="1993" />
                    <Picker.Item label="1992" value="1992" />
                    <Picker.Item label="1991" value="1991" />
                    <Picker.Item label="1990" value="1990" />
            </Picker>
        </View> 
      <Text style= {Styles.inputTurno}>Sexo:</Text>      
      <Picker
        selectedValue={sexo}
        style={Styles.inputTurno}
        onValueChange={(v) => setSexo(v)}>
        <Picker.Item label="Masculino" value="m" />
        <Picker.Item label="Feminino" value="f" />
      </Picker>
      <Text style= {Styles.inputTurno}>Nivel de atividade diária:</Text>      
      <Picker
        selectedValue={nivelAtividade}
        style={Styles.inputTurno}
        onValueChange={(v) => setNivelAtividade(v)}>    
        <Picker.Item label="Leve" value="leve" />
        <Picker.Item label="Moderada" value="moderada" />
        <Picker.Item label="Elevada" value="elevada" />
        <Picker.Item label="Intensa" value="intensa" />
      </Picker>
      <Text style= {Styles.inputTurno}>Objetivo:</Text>      
      <Picker
        selectedValue={objetivo}
        style={Styles.inputTurno}
        onValueChange={(v) => setObjetivo(v)}>    
        <Picker.Item label="Ganhar Peso" value="gpeso" />
        <Picker.Item label="Perder Peso" value="ppeso" />
        <Picker.Item label="Manter Peso" value="mpeso" />
      </Picker>
        <TouchableOpacity onPress= {onSubmit}><Text style={Styles.buttonText}>SETAR METAS</Text></TouchableOpacity>
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

export default Metas;

