import React from 'react';
import CityList from './CityList'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const AppNavigator = createStackNavigator({
  Home : {
    screen : CityList
  }
})

export default createAppContainer(AppNavigator);


