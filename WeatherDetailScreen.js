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
    //const city = navigation.getParam('city', null);
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
            <View style={styles.loadingContainer}>
                <Text style = {styles.text}>데이터를 불러오는 중입니다.</Text>
            </View>
        );
      }

      let celsius = this.state.main.temp - 273.15;
      
      return(
        <View style = {styles.container}>
          <View style = {styles.firstContainer}>
              <Text style = {styles.firstText}> 햇빛 볼 시간입니다! 나갈 준비 하세요!</Text>
          </View> 
          <View style= {styles.ImageContainer}>
              <Image style = {styles.imageStyle} source = {require('./assets/sun.png')}/>
          </View>
          <View style = {styles.textContainer}>
            <Text style = {styles.celsiusText}>
               온도 : {celsius.toFixed(1)}{'\n'}
               기압 : {this.state.main.pressure}{'\n'}
               습도 : {this.state.main.humidity}{'\n'}
               풍속 : {this.state.wind.speed}{'\n'}
            </Text>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    backgroundColor : '#fff',
    //marginTop : Constants.statusBarHeight
  },


  firstContainer : {
    flex : 1,
    backgroundColor : '#fff',
  },


  ImageContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems : 'center',

    
    borderColor: 'red',
    borderWidth: 2,

    
  },
  textContainer : {
    flex : 2,
    backgroundColor: '#fff',
    
    borderColor: 'blue',
    borderWidth: 2,
  },

  firstText : {
    fontSize : 20,
    textAlign : 'center',
    
    borderColor: 'black',
    borderWidth: 2,
  },

  celsiusText :{
    fontSize : 20,
    textAlign: 'center',
  },

  imageStyle : {
    width : 140,
    height : 140,
  },

  loadingContainer: {
    flex : 1,
    backgroundColor : '#fff',
    marginTop: Constants.statusBarHeight,

  }
});