/**
 * Main class of the ChilemuesliApp.
 *
 * @format
 * @flow
 */

import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import BeaconsDemoScreen from './Screens/BeaconsDemoScreen';
import StoryListScreen from './Screens/StoryListScreen';
import StoryScreen from './Screens/StoryScreen';
import WebScreen from './Screens/WebScreen';
import ContactScreen from './Screens/ContactScreen';
import DebugScreen from './Screens/DebugScreen';
import TravelInstructionsScreen from './Screens/TravelInstructionsScreen';
import { ThemeProvider } from '@rneui/themed';
import { COLOR_PRIMARY, BORDER_RADIUS } from './Styles/Common';

FontAwesome.loadFont();
MaterialIcons.loadFont();

const theme = {
  Button: {
    type: 'clear',
    buttonStyle: {
      backgroundColor: COLOR_PRIMARY,
      width: 220,
      height: 46,
      marginTop: 12,
      marginBottom: 12,
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={WelcomeScreen}
            options={{title: 'Menü'}}/>
          <Stack.Screen name="StoryList" component={StoryListScreen} />
          <Stack.Screen 
            name="StoryScreen"
            component={StoryScreen}
            options={({ route }) => ({ 
              title: route.params?.selectedStory?.title || ''
            })}
          />
          <Stack.Screen name="WebViewer" component={WebScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen name="TravelInstructions" component={TravelInstructionsScreen} />
          <Stack.Screen name="Debug" component={DebugScreen} />
          <Stack.Screen name="Test" component={BeaconsDemoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
