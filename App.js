import React from 'react';
//import CityList from './CityList'
import { createStackNavigator, createAppContainer } from 'react-navigation'
//import WeatherDetailScreen from './WeatherDetailScreen'
//import Loginpage from './Loginpage';
//import Mainpage from './Mainpage';
/*
const AppNavigator = createStackNavigator(
    {
      CityList : CityList,
      Detail : WeatherDetailScreen,
    },
    {
      initialRouteName: 'CityList',
    }
  
);*/
/*
const AppNavigator = createStackNavigator(
  {
    Loginpage : Loginpage,
    Detail : Mainpage,
  },
  {
    initialRouteName: 'Loginpage',
  }

);*/

class EventPractice extends Component {

  state = {
    message: ''
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input 
          type="text"
          name="message"
          placeholder="아무거나 입력해보세요"
          value={this.state.message}
          onChange={
            (e) => {
              this.setState({
                message: e.target.value
              })
            }
          }
        />
      </div>
    );
  }
}

//export default createAppContainer(AppNavigator);


