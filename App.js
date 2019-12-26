/**
 * Main class of the ChilemuesliApp.
 *
 * @format
 * @flow
 */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import BeaconsDemoScreen from './Screens/BeaconsDemoScreen';
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

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
