import React, { Component} from 'react';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity,
  } from 'react-native';
import {firebase} from '../src/firebase/config';
import { FlatList } from 'react-native-gesture-handler';
import { Fire } from '../service/fire';
var itens = [
  /*{
    id: "1",
    hora: "20:00",
    nome: "Beber Água",
    periodo: "01:00",
    tipo: "agua"
  },
  {
    id: "2",
    hora: "00:00",
    nome: "Antibiotico",
    periodo: "06:00",
    tipo: "remedio"
  },
  {
    id: "3",
    hora: "02:00",
    nome: "Beber Água",
    periodo: "01:00",
    tipo: "agua"
  }*/
];

var hasToUpdate = true;

class ListScreen extends Component {
  //const isFocused = useIsFocused();
  
  /*const database = new Fire();
  Alarms = database.getAlarm();
  console.log(Alarms);*/
  
  
  //const [state, setState] = useState();
  /*const readFireData = () => {
    firebase.database().ref('Alarmes/').once('value').then(snapshot => {
      // snapshot.val() is the dictionary with all your keys/values from the '/store' path
      setState({ stores: snapshot.val() })
    })
  }
  if(isFocused)
  {
    readFireData();
    console.log(state);
  }*/

  /*React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      firebase.database().ref('Alarmes/').once('value').then(snapshot => {
        // snapshot.val() is the dictionary with all your keys/values from the '/store' path
        setState({ stores: snapshot.val() })
        console.log(state);
      })
    });
    return unsubscribe;
  }, [props.navigation]);*/

  constructor(){
    super();
    this.state = {
      data: [],
      isLoaded: false,
    }
  }

  componentDidMount(){
    /*firebase.database().ref('Alarmes/').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      var array_itens = [];
      for(var key in data){
        var obj = data[key];
        array_itens.push({
          id: key,
          hora: obj.hora,
          nome: obj.nome,
          periodo: obj.periodo,
          tipo: obj.tipo
        })
      }
      itens = array_itens;
      console.log(itens);
    });
  }*/
    var data_array = [];
    const { navigation } = this.props;
    //this.focusListener = navigation.addListener("focus", () => {
      firebase.database().ref('Alarmes/').once('value').then(
        snapshot => {
          this.setState({
            stores: snapshot.val()
          });
          //console.log('User data: ', this.state.stores);
          var array_itens = [];
          for(var key in this.state.stores){
            var obj = this.state.stores[key];
            array_itens.push({
              id: key,
              hora: obj.hora,
              nome: obj.nome,
              periodo: obj.periodo,
              tipo: obj.tipo
            })
          }
          itens = array_itens;
          console.log("BBBBBBB: ", itens);
          data_array.push({itens});
        }
      );
      //console.log("Mudou de tela \n");
      //hasToUpdate = true;
    //});
    this.setState({
      data: data_array,
      isLoaded: true
    })
  }

  UNSAFE_componentWillMount(){
    /*firebase.database().ref('Alarmes/').once('value').then(
      snapshot => {
        this.setState({
          stores: snapshot.val()
        });
        //console.log('User data: ', this.state.stores);
        var array_itens = [];
        for(var key in this.state.stores){
          var obj = this.state.stores[key];
          array_itens.push({
            id: key,
            hora: obj.hora,
            nome: obj.nome,
            periodo: obj.periodo,
            tipo: obj.tipo
          })
        }
        itens = array_itens;
        console.log("CCCCCCCCCCCCC: ", itens);
      }
    );*/
  }

  renderItem(item)  {
    //console.log("renderItem:", itens);
    var icon_name, color_icon;
    if(item.tipo == 'remedio')
    {
      icon_name="medical-bag";
      color_icon = '#ff3333';
    }
    else
    {
      icon_name="cup";
      color_icon='#3399ff';
    }
    return (
      <View style={styles.item_background}>
        <MaterialCommunityIcons
        name={icon_name}
        size={30}
        //color={color_icon}
        style={{marginHorizontal: 3}}
        />
        <View style={styles.item_text_container}>
          <Text style={{fontSize: 17, fontWeight:'bold'}}>
            {item.nome}
          </Text>
          <Text style={{fontSize: 14}}>
          Início: {item.hora} | A cada {item.periodo} horas
          </Text>
        </View>
        <View styles={styles.item_button}>
          <TouchableOpacity>
            <AntDesign
            name={'minuscircle'}
            size={25}
            style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render(){
    return (
      <View style={styles.screen}>
        <View style={styles.header_container}>
          <Text style={styles.header_text}>Olá Leonardo,</Text>
        </View>
        {this.state.isLoaded ?
        <FlatList
        style={{marginHorizontal: 15, height: 400}}
        data={this.state.data}
        renderItem={(item) => this.renderItem(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        //extraData={hasToUpdate}
        />
      :
        <Text>Nao Carregou</Text>}
        <View style={styles.item_container} key={'ESSE'}>
            {!(this.state.data === []) ? 
            <FlatList
            style={{marginHorizontal: 15, height: 400}}
            data={this.state.data}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            //extraData={hasToUpdate}
            />
            :
            <Text>Aqui!!!</Text>}
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('AddAlarmScreen');}} style={styles.button_background}>
            <Text style={styles.text_button}>+ Adicionar Lembrete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#52B1CF',
    alignItems: 'center',
    justifyContent:  'space-between',
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
    marginBottom: 50,
    //backgroundColor: 'rgb(255,0,0)',
  },
  button_background: {
    backgroundColor: '#F69ACC',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    width:'100%',
  },
  text_button: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item_container:{
    //backgroundColor: '#FFF',
    width: '100%'
  },
  item_background:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 2,
  },
  item_text_container:{

  },
  item_button:{

  }

});

export default ListScreen;
