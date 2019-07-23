import React from 'react';
import CityList from './CityList'
import { createStackNavigator, createAppContainer } from 'react-navigation'
//import WeatherDetailScreen from './WeatherDetailScreen'

const AppNavigator = createStackNavigator(
    {
      CityList : CityList,
      //Detail : WeatherDetailScreen,
    },
    {
      initialRouteName: 'CityList',
    }
  
);

export default createAppContainer(AppNavigator);


