import React from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Config from 'react-native-config';

export default class WelcomeScreen extends React.Component {
  openSearchMiceListView() {
    console.log('openSearchMiceListView clicked');
    this.props.navigation.navigate('StoryList', {});
  }

  openTravellingInstructionsView() {
    console.log('openTravellingInstructionsView clicked');
  }

  openContactView() {
    console.log('openContactView clicked');
  }

  openPrivacyPolicyView() {
    console.log('openPrivacyPolicyView clicked');
  }

  openDebugView() {
    console.log('openDebugView clicked');
    this.props.navigation.navigate('Test', {});
  }

  render() {
    return (
      <ScrollView style={styles.view}>
        <View style={styles.button_view}>
          <Button
            onPress={() => {
              this.openSearchMiceListView();
            }}
            title="Müsli suchen"
          />
          <Button
            onPress={() => {
              this.openTravellingInstructionsView();
            }}
            title="Anreise"
          />
          <Button
            onPress={() => {
              this.openContactView();
            }}
            title="Kontakt"
          />
          <Button
            onPress={() => {
              this.openPrivacyPolicyView();
            }}
            title="Datenschutzerklärung"
          />
          <Button
            onPress={() => {
              this.openDebugView();
            }}
            title="Debug"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_view: {
    width: '100%',
  },
});
