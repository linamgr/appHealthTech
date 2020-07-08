import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
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
    firebase.readDataOnce('users');
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
      currentStepCount: 0,
      finishDate: endDate,
      running: false,
      activityTimer : null,
    });

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
    if(this.state.startDate){
      let newDate = new Date(this.state.startDate);
      return this.formatAMPM(newDate);
      //return newDate.getHours() + ":" + newDate.getMinutes();
    }
    return "";
  }

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
      <ScrollView>
        <View style={styles.container}>
        {/* Tem que ver como é o melhor jeito de guardar os dadosa e enviar pros componentes */}
          <DataModule Text="Data" Data={ this.formatDateToDay() } />
          <DataModule Text="Hora início" Data={ this.formatDateToHour() } />
          <DataModule Text="Distância" Data={ this.calculateDistance() + " m" } /> 
          <DataModule Text="Passos" Data={ this.state.currentStepCount + " steps"} />
          <DataModule Text="Duração" Data={ this.state.totalTime + " seconds"} />
          <DataModule Text="Vel. Média" Data={ this.calculateAverageVelocity() + " km/h" }/>
        </View>
         
        <View style = {styles.buttonsContainer}>
          <View style = {styles.button1}>
            <Button 
               onPress={ this.startPedometer.bind(this) }
              title = "Start Pedometer"
              color = "#0F4C81"
              accessibilityLabel = "Click this to start pedometer" 
            />
          </View>
          <View style={styles.button2}>
            <Button 
               onPress={ this.finishPedometer.bind(this) }
              title="Finish Pedometer"
              color="#292929"
              accessibilityLabel="Click this to end pedometer"
            />
          </View> 
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#779ecb',
    margin: 10,
    height: '100%',
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
    // borderWidth: "1px",
    // borderStyle: "solid",
    // borderColor:  "black",
    marginBottom: 50
  },
  button1: {
    // marginLeft: 'auto',
    marginRight: 20,
  },
  button2: {
    marginLeft: 20,
    // marginRight: 'auto',
    // marginLeft: '1.5em',
  },
});