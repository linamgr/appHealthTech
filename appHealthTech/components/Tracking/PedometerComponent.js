import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import DataModule  from "./DataModule";
import * as firebase from '../../FirebaseIntegration/firebase';

export default class PedometerComponent extends React.Component {

  state = {
    isPedometerAvailable: 'checking',
    currentStepCount: 0,
    startDate: null,
    finishDate: null,
    totalTime: 0,
    activityTimer: null,
    running: false
  };

  componentDidMount() {
    firebase.readAllPedometerData();
  }
  
  activityTimerTick = () => {
    let newTime =  (new Date().getTime() - this.state.startDate)/1000;
    newTime = Math.floor(newTime);
    this.setState({ totalTime: newTime });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );
  }
     
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  startPedometer(){
    //console.log("Started counting");
    let startDate = new Date().getTime();
    this.setState({
      currentStepCount: 0,
      startDate: startDate,
      totalTime: 0,
      runnig: true
    });
    
    let timer = setInterval(this.activityTimerTick, 1000);
    this.setState({activityTimer : timer});
    this._subscribe();
  }

  finishPedometer(){
    let stepCount = this.state.currentStepCount;
   // console.log("finish counting" + stepCount);
    let endDate = new Date().getTime();
    clearTimeout(this.state.activityTimer);

    this.setState({
      currentStepCount: stepCount,
      finishDate: endDate,
      running: false,
      activityTimer : null,
    });

    let storagedData = {
      steps : this.state.currentStepCount,
      date : this.formatDateToDay(),
      time : this.formatDateToHour(),
      duration : this.state.totalTime,
      distance : this.calculateDistance(),
      vel : this.calculateAverageVelocity()
    };

    firebase.pushPedometerData(storagedData);

    this._unsubscribe();
  }

  calculateDistance() {
    let distance = this.state.currentStepCount * 0.7;
    return distance.toFixed(3);
  }

  calculateAverageVelocity() {
    if(this.state.totalTime != 0)
      var averageVelocity = 3.6 * this.state.currentStepCount * 0.7 / (this.state.totalTime);
    else
      var averageVelocity = 0;
    
    return averageVelocity.toFixed(3);
  }

  formatDateToDay(){
    if(!this.state.startDate)
      return "";
    let newDate = new Date(this.state.startDate);
    return ("0" + newDate.getDate()).slice(-2) + "/" + ("0" + (newDate.getMonth() + 1)).slice(-2);
  }

  formatDateToHour(){
    if(this.state.startDate) {
      let newDate = new Date(this.state.startDate);
      return this.formatAMPM(newDate);
      //return newDate.getHours() + ":" + newDate.getMinutes();
    }
    return "";
  }

  // teste unitario de formatDateToHour
  // primeiro cenario -> startDate eh vazio (faz o mock dele ser vazio)
  // ----> o teste tem que verificar se o retorno da formatDateToHour foi ""
  // segundo cenario -> startDate nao eh vazio (faz o mock dele sem ser vazio)
  // ----> faz o mock da formatAMPM retornar por exemplo 12/02/2020
  // --------> o teste tem que verificar se o retorno da formatDateToHour foi 12/02/2020

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = ("0" + hours).slice(-2) + ":" + minutes + " " + ampm;
    return strTime;
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.dataModuleContainer}>
        {/* Tem que ver como é o melhor jeito de guardar os dadosa e enviar pros componentes */}
          <DataModule Text="Data" Data={ this.formatDateToDay()} img="calendar-alt" />
          <DataModule Text="Hora início" Data={ this.formatDateToHour()} img="hourglass-start" />
          <DataModule Text="Distância" Data={ this.calculateDistance() + " m" } img="arrows-alt-h" /> 
          <DataModule Text="Passos" Data={ this.state.currentStepCount + " passos"} img="shoe-prints" />
          <DataModule Text="Duração" Data={ this.state.totalTime + " segundos"} img="hourglass-half" />
          <DataModule Text="Vel. Média" Data={ this.calculateAverageVelocity() + " km/h" } img="tachometer-alt"/>
        </View>
         
        <View style = {styles.buttonsContainer}>
          <View style = {styles.button1}>
            {/* <Button 
               onPress={ this.startPedometer.bind(this) }
              title = "Iniciar"
              color = "transparent"
              accessibilityLabel = "Click this to start pedometer" 
            /> */}
            <TouchableOpacity style={ styles.button1 } onPress={ this.startPedometer.bind(this) }> 
              <Text style={ styles.buttonText1 }>INICIAR</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button2}>
            {/* <Button 
               onPress={ this.finishPedometer.bind(this) }
              title="Finalizar"
              color="transparent"
              accessibilityLabel="Click this to end pedometer"
            /> */}
            <TouchableOpacity style={ styles.button2 } onPress={ this.finishPedometer.bind(this) }> 
              <Text style={ styles.buttonText2 }>FINALIZAR</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  dataModuleContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: '#52B1CF',
    margin: 0,
    height: '100%',
    width: 360,
    paddingTop: 0,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red"
  },
  buttonsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    // marginBottom: 50
  },
  button1: {
    borderRadius: 50,
    backgroundColor: "#79D18C",
    width: 90,
    height: 30,
    // textAlign: "center",
    margin: "auto",
    marginRight: 15,
    elevation: 5
  },
  button2: {
    borderRadius: 50,
    backgroundColor: "#F69ACC",
    width: 90,
    height: 30,
    // textAlign: "center",
    margin: "auto",
    marginLeft: 5,
    elevation: 5
  },
  buttonText1: {
    paddingTop: 5,
    paddingLeft: 25,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonText2: {
    paddingTop: 5,
    paddingLeft: 12,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  }
});