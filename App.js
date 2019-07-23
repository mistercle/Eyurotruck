import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class App extends React.Component 
{
  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(console.log);
  }
  renderItem({ name }) {
    return (
      <View style={styles.item} key = {name}>
        <Text style={styles.text}>{name}</Text>
      </View>
    );
  }
  render() 
  {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item) => item.name}
                data={this.fruits}
      />
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
  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'orange',
    borderColor: 'red',
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});
