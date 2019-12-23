/**
 * Main class of the ChilemuesliApp.
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import BeaconsDemoScreen from './Screens/BeaconsDemoScreen';

Ionicons.loadFont();

const MainNavigator = createStackNavigator({
  Home: {
    screen: WelcomeScreen,
    routeName: 'Home',
  },
  Test: {
    screen: BeaconsDemoScreen,
    routeName: 'Test',
  },
});

const AboutNavigator = createStackNavigator({
  Test: {
    screen: BeaconsDemoScreen,
    routeName: 'Test',
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: MainNavigator,
    },
    About: {
      screen: AboutNavigator,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
          //iconName = `ios-home${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'About') {
          iconName = 'ios-information-circle-outline';
        } else if (routeName === 'Settings') {
          iconName = 'ios-options';
        } else {
          iconName = 'ios-frowno';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);
const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render() {
    return <AppContainer />;
  }
}
