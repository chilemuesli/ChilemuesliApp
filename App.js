/**
 * Main class of the ChilemuesliApp.
 *
 * @format
 * @flow
 */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import BeaconsDemoScreen from './Screens/BeaconsDemoScreen';
import StoryListScreen from './Screens/StoryListScreen';
import {ThemeProvider} from 'react-native-elements';
import {COLOR_PRIMARY, BORDER_RADIUS} from './Styles/Common';

Ionicons.loadFont();

const theme = {
  Button: {
    type: 'clear',
    buttonStyle: {
      backgroundColor: COLOR_PRIMARY,
      width: 200,
      height: 40,
      marginTop: 30,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: BORDER_RADIUS,
    },
    titleStyle: {
      color: 'white',
    },
  },
};

const MainNavigator = createStackNavigator({
  Home: {
    screen: WelcomeScreen,
    routeName: 'Home',
  },
  StoryList: {
    screen: StoryListScreen,
    routeName: 'StoryList',
  },
  Test: {
    screen: BeaconsDemoScreen,
    routeName: 'Test',
  },
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
