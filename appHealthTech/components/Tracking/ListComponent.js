import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import DataModuleAlternative  from "./DataModuleAlternative";
import * as firebase from '../../FirebaseIntegration/firebase';


export default class ListComponent extends React.Component {

  state = {
    startDate: "testeHonesto",
    finishDate: null,
    activitiesArray: [
      {
        "date": "0",
        "initialHour": "0",
        "distance": "0",
        "steps": "0",
        "duration": "0",
        "averageVelocity": "0",
        "id": 0
      }
    ]
  }; 

  componentDidMount(){
    this.getActivitiesArray();
  }


  componentDidUpdate(prevProps) {
    //console.log("update");
    //this.getActivitiesArray();
  }

  contextFunction(snapshot){
  var activitiesArrayAux = [];
    if(!snapshot){
       activitiesArrayAux = [
        {
          "date": "0",
          "initialHour": "0",
          "distance": "0",
          "steps": "0",
          "duration": "0",
          "averageVelocity": "0",
          "id": 0
        }
      ]
    }else{
      let i = 0;
      snapshot.forEach((child)=>{
        let item = {};
        item["date"] = child.val().date;
        item["initialHour"] = child.val().time;
        item["distance"] = child.val().distance;
        item["steps"] = child.val().steps;
        item["duration"] = child.val().duration;
        item["averageVelocity"] = child.val().vel;
        item["id"] = i;    
        activitiesArrayAux.push(item); 
        i++
      });
    }
    this.setState({activitiesArray: activitiesArrayAux});

  }
  
  getActivitiesArray(){ 
    let data = firebase.readAllPedometerData(this.contextFunction.bind(this));
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
          {/* <DataModuleAlternative Text="Atividade 1" Data={ this.formatDateToDay()} img="running" /> */}
          {<ActivitiesElements activitiesArray = {this.state.activitiesArray} style={styles.dataEntry} />}
        </View>
      </ScrollView>
    );
  }
}

var printaQualquerMerda = () => {
  return true
}


const ActivitiesElements = ({activitiesArray}) => (
  <View style={styles.activitiesContainer}>
      { activitiesArray.map(activity => (<DataModuleAlternative key = {activity.id} 
      TextDate = {"Data"} 
      DataDate={activity.date} 

      TextSteps = {"Passos"} 
      DataSteps={activity.steps + " passos"} 

      TextDuration = {"Duração"} 
      DataDuration={activity.duration + "s"} 
      img="running"/>)) }
  </View>
);
{/* <DataModuleAlternative Text="Atividade 1" Data={ this.formatDateToDay()} img="running" /> */}



/*
const activitiesArray = [
  {
    "date": "15/08/2020",
    "initialHour": "15h30",
    "distance": "13",
    "steps": "10",
    "duration": "100",
    "averageVelocity": "20",
    "id": 0
  },
  {
    "date": "23/12/2010",
    "initialHour": "10h30",
    "distance": "17",
    "steps": "122",
    "duration": "11",
    "averageVelocity": "222",
    "id": 1
  }
];
*/

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
  dataEntry: {
    backgroundColor: "black",
  },
  activitiesContainer: {
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "red",
    marginLeft: -140,
  }
});