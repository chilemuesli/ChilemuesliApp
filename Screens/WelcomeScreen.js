import React from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Config from 'react-native-config';
import {COLOR_PRIMARY, BORDER_RADIUS} from '../Styles/Common';

export default class WelcomeScreen extends React.Component {
  openSearchMiceListView() {
    console.log("openSearchMiceListView clicked");
  }

  openTravellingInstructionsView() {
    console.log("openTravellingInstructionsView clicked");
  }

  openContactView() {
    console.log("openContactView clicked");
  }

  openPrivacyPolicyView() {
    console.log("openPrivacyPolicyView clicked");
  }

  openDebugView() {
    console.log("openDebugView clicked");
    this.props.navigation.navigate('Test', {});
  }

  render() {
    return (
      <ScrollView style={styles.view}>
        <View style={styles.container}>
          <View style={styles.button_view}>
            <Button
              style={styles.button_pos}
              type="clear"
              onPress={() => {
                this.openSearchMiceListView();
              }}
              buttonStyle={styles.button_style}
              titleStyle={styles.button_title_style}
              title="Müsli suchen"
            />
            <Button
              style={styles.button}
              type="clear"
              onPress={() => {
                this.openTravellingInstructionsView();
              }}
              buttonStyle={styles.button_style}
              titleStyle={styles.button_title_style}
              title="Anreise"
            />
            <Button
              style={styles.button}
              type="clear"
              onPress={() => {
                this.openContactView();
              }}
              buttonStyle={styles.button_style}
              titleStyle={styles.button_title_style}
              title="Kontakt"
            />
            <Button
              style={styles.button}
              type="clear"
              onPress={() => {
                this.openPrivacyPolicyView();
              }}
              buttonStyle={styles.button_style}
              titleStyle={styles.button_title_style}
              title="Datenschutzerklärung"
            />
            <Button
              style={styles.button}
              type="clear"
              onPress={() => {
                this.openDebugView();
              }}
              buttonStyle={styles.button_style}
              titleStyle={styles.button_title_style}
              title="Debug"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    //backgroundColor: COLOR_PRIMARY,
  },
  container: {
    margin: 10,
  },
  icon: {
    width: 60,
    height: 60,
  },
  button_view: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_pos: {
    marginTop: 30,
  },
  button_style: {
    backgroundColor: COLOR_PRIMARY,
    width: 200,
    height: 40,
    marginTop: 30,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: BORDER_RADIUS,
  },
  button_title_style: {
    color: 'white',
  },
});
