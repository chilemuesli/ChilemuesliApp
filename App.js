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

const WelcomeNavigator = createStackNavigator({
  Home: {
    screen: WelcomeScreen,
  },
});

const TabNavigator = createBottomTabNavigator({
  Home: WelcomeNavigator,
});

/*export default TabNavigator(
  {
    Willkommen: {
      screen: WelcomeStack,
      navigationOptions: {tabBarLabel: 'Willkommen'},
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        var styles = StyleSheet.create({
          PNGImageStyle: {
            width: 25,
            height: 25,
          },
        });
        if (routeName === 'Willkommen') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Kontakt') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else if (routeName === 'Agenda') {
          iconName = `ios-calendar${focused ? '' : '-outline'}`;
        } else if (routeName === 'InfoBox') {
          iconName = `ios-bonfire${focused ? '' : '-outline'}`;
        } else if (routeName === 'Datenschutz') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'navy',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },

);*/

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
