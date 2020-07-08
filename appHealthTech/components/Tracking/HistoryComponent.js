import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import DataModule  from "./DataModule";

export default class HistoryComponent extends React.Component {

  state = {
    currentStepCount: 0,
    startDate: null,
    finishDate: null,
    totalTime: 0,
    activityTimer: null,
    running: false
  }; 

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
    marginTop: 10,
    paddingTop: 0,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red"
  },
});