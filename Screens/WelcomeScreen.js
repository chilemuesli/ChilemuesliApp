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
      <View style={styles.mainView}>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <View style={styles.button_view}>
            <Button
              onPress={() => {
                this.openSearchMiceListView();
              }}
              style={styles.firstButton}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  button_view: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  firstButton: {
    marginTop: 0,
  },
});
