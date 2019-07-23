import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Constants } from 'expo'

export default class CityList extends React.Component
{
    static navigationOptions = {
        title : 'Cities',
    };

    constructor(props) 
    {
        super(props);
    
        this.state = 
        {
          cities: [],
        };
    }
    componentDidMount() 
    {
      fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
        .then(response => response.json())
        .then(cities => {
          console.log('cities =', cities.length);
          this.setState({
            cities
          });
        });
    }
    
    onPressCity(item)
    {
        console.log('onPresscity = ', item)
        this.props.navigation.navigate('Detail')
    }



    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress = {() => this.onPressCity(city)}>
                <Text style={styles.text}>{city}</Text>
            </TouchableOpacity>
        );
    }

    render()
    {
        return (
            <FlatList style = {styles.container}
                      renderItem = {({ item }) => this.renderItem(item)}
                      keyExtractor = { item => item}
                      data = { this.state.cities }
            />
        )
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
      
