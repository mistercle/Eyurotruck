import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
          title : `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
      }
  }


  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // const city = navigation.getParam('city', null);
    const city = 'Daejeon';

    fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
      if(this.state.isLoading)
      {
        return (
            <View style={styles.container}>
                <Text style = {styles.text}>데이터를 불러오는 중입니다.</Text>
            </View>
        );
      }

      let celsius = this.state.main.temp - 273.15;

      return(
          <View style= {styles.container}>
              <Image style = {{height : '30%', width : '30%'}} source = {require('./assets/sun.png')}/>
              <Text style = {styles.test}>온도 : {celsius.toFixed(1)}</Text>
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,

    
  },
  text :{
    fontSize : 20,
    textAlign: 'center',
  },

  loadingContainer: {
    flex : 1,
    backgroundColor : '#fff',
    marginTop: Constants.statusBarHeight,

    textAlign : 'center'
  }
});