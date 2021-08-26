/**
 * Main class of the ChilemuesliApp.
 *
 * @format
 * @flow
 */

import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import BeaconsDemoScreen from './Screens/BeaconsDemoScreen';
import StoryListScreen from './Screens/StoryListScreen';
import StoryScreen from './Screens/StoryScreen';
import WebScreen from './Screens/WebScreen';
import ContactScreen from './Screens/ContactScreen';
import TravelInstructionsScreen from './Screens/TravelInstructionsScreen';
import {ThemeProvider} from 'react-native-elements';
import {COLOR_PRIMARY, BORDER_RADIUS} from './Styles/Common';

FontAwesome.loadFont();
MaterialIcons.loadFont();

const theme = {
  Button: {
    type: 'clear',
    buttonStyle: {
      backgroundColor: COLOR_PRIMARY,
      width: 220,
      height: 46,
      marginTop: 15,
      marginBottom: 15,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: BORDER_RADIUS,
    },
    titleStyle: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Roboto-Light',
    },
  },
  ListItem: {
    titleStyle: {
      color: 'black',
      fontSize: 18,
      fontFamily: 'Roboto-Light',
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
  Story: {
    screen: StoryScreen,
    routeName: 'Story',
  },
  WebViewer: {
    screen: WebScreen,
    routeName: 'WebViewer',
  },
  Contact: {
    screen: ContactScreen,
    routeName: 'Contact',
  },
  TravelInstructions: {
    screen: TravelInstructionsScreen,
    routeName: 'TravelInstructions',
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
