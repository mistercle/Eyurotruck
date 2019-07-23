import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component{
  clickHandler = () => console.log("clicked!")
  render()
  {
    return (
      <View style={styles.container}>
        <Text style={[styles.textBig, styles.textRed]}>Hello, World!</Text>
        <Button title={'click me!'}onPress={this.clickHandler}></Button>
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
