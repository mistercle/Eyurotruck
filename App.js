import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class App extends React.Component 
{
  render() 
  {
    return (
      <View style={styles.container}>
        <Image source = {{uri: "https://facebook.github.io/react-native/img/favicon.png", width : 64, height : 64}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,

    borderColor : 'red',
    borderWidth : 2.
  },    
  
});
