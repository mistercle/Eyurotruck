import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


class CounterButton extends React.Component
{
  state = {
    counter : 0,
  };

  clickHandler = () => {
    this.setState({
      counter : this.state.counter + 1,
    });
  };

  render()
  {
    return (
      <View>
        <Text style={[styles.textBig, styles.textRed]}>Hello, World!</Text>
        <Text>{this.state.counter}</Text>
        <Button title={'click me!'}onPress={this.clickHandler}></Button>
      </View>
    );
  }
}

export default class App extends React.Component 
{
  render() 
  {
    return (
      <View style={styles.container}>
        <CounterButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBig:{
    fontSize : 32,
  },
  textRed:{
    color : 'red'
  },
});
