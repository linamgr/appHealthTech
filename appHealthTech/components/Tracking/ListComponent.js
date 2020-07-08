import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import DataModule  from "./DataModule";

export default class ListComponent extends React.Component {

  state = {
    startDate: null,
    finishDate: null,
  }; 

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
          <DataModule Text="Atividade 1" Data={ this.formatDateToDay()} img="running" />
          <DataModule Text="Atividade 2" Data={ this.formatDateToDay()} img="running" />
          <DataModule Text="Atividade 3" Data={ this.formatDateToDay()} img="running" />
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

  },
});