import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';

export default class PedometerComponent extends React.Component {

  state = {
    isPedometerAvailable: 'checking',
    pastDayStepCount: 0,
    beforeYesterdayStepCount: 0,
    currentStepCount: 0,
  };

  componentDidMount() {
    this._subscribe();
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

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastDayStepCount: result.steps });
      },
      error => {
        this.setState({
          pastDayStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    const beforeYesterday = new Date();
    beforeYesterday.setDate(start.getDate() -1);
    Pedometer.getStepCountAsync(beforeYesterday, start).then(
      result => {
        this.setState({ beforeYesterdayStepCount: result.steps });
      },
      error => {
        this.setState({
          beforeYesterdayStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.teste}>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text>
        <Text style={styles.teste2}>Steps taken in the last 24 hours: {this.state.pastDayStepCount}</Text>
        <Text style={styles.teste3}>Steps taken before yesterday: {this.state.beforeYesterdayStepCount}</Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    margin: 10,
    height: '100%',
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teste: {
    flex:1,
    backgroundColor: 'red'
  },
  teste2: {
    flex:5
  },
  teste3: {
    flex:10,
    backgroundColor: 'orange'
  }
});