import React from 'react';
//import CityList from './CityList'
import { createStackNavigator, createAppContainer, TabRouter } from 'react-navigation'
//import WeatherDetailScreen from './WeatherDetailScreen'
import Loginpage from './Loginpage';
import Registerpage from './Registerpage';
import Mainpage from './Mainpage';
import CheckTab from './TabNavigator/CheckTab';
import WaitTab from './TabNavigator/WaitTab';
import RequestTab from './TabNavigator/RequestTab';
import IdleTab from './TabNavigator/IdleTab';
import OngoingTab from './TabNavigator/OngoingTab';
import CarCheckTab from './TabNavigator/CarCheckTab';

const AppNavigator = createStackNavigator(
  {
    Loginpage : Loginpage,
    Registerpage : Registerpage,
    Mainpage : Mainpage,
    WaitTab : WaitTab,
    RequestTab : RequestTab,
    CheckTab :  CheckTab,
    IdleTab : IdleTab,
    OngoingTab : OngoingTab,
    CarCheckTab : CarCheckTab
  },
  {
    initialRouteName: 'RequestTab',
  }

);
export default createAppContainer(AppNavigator);


