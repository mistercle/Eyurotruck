import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Constants } from 'expo';
import Clock from 'react-live-clock'

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
        
        <ImageBackground source = {require('./assets/day.jpg')} style={{width: '100%', height: '100%'}}>
          <View style = {styles.firstContainer}>
              <Text style = {styles.firstText}> 햇빛 볼 시간입니다! 나갈 준비 하세요!</Text>
          </View> 
          <View style= {styles.mainContainer}>
            <View style = {styles.iconContainer}>
              <Image style = {styles.imageStyle} source = {require('./assets/sun.png')}/>
              <Text style = {styles.iconText}>맑음</Text>
            </View>
            <View style = {styles.tempContainer}>
              <Text style = {styles.celsiusText}>{celsius.toFixed(1)}C</Text>
            </View>
          </View>
          <View style = {styles.subContainer}>
            <Text style = {styles.celsiusText}>
            </Text>
          </View>
        </ImageBackground>
        
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


  mainContainer: {
    flex: 2,
    flexDirection : "row",
    backgroundColor: '#fff',
    alignItems : 'center',

    
    borderColor: 'red',
    borderWidth: 2,

    
  },

  iconContainer : {
    flex : 1,
    alignItems : 'center',
    
    borderColor: 'red',
    borderWidth: 2,
  },

  tempContainer : {
    flex : 1,

    borderColor: 'red',
    borderWidth: 2,
  },
  
  
  lastContainer : {
    flex : 2,
    flexDirection : 'row',
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

  iconText : {
    fontSize : 25,
    textAlign : 'center',

    
  },

  celsiusText :{
    fontSize : 40,
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