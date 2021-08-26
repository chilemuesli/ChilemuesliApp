import React from 'react';
import {ScrollView, View, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Image from 'react-native-scalable-image';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Menü',
  };

  openSearchMiceListView() {
    console.log('openSearchMiceListView clicked');
    this.props.navigation.navigate('StoryList', {});
  }

  openTravellingInstructionsView() {
    console.log('openTravellingInstructionsView clicked');
    this.props.navigation.navigate('TravelInstructions', {});
  }

  openContactView() {
    console.log('openContactView clicked');
    this.props.navigation.navigate('Contact', {});
  }

  openPrivacyPolicyView() {
    console.log('openPrivacyPolicyView clicked');
    console.log('Try to open WebViewer');
    this.props.navigation.navigate('WebViewer', {
      URL:
        'https://www.chilemues.li/mobile-pages/datenschutzerklaerung-mobile/',
      title: 'Datenschutz',
    });
  }

  openDebugView() {
    console.log('openDebugView clicked');
    this.props.navigation.navigate('Test', {});
  }

  render() {
    return (
      <View style={styles.mainView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <Image
            source={require('../assets/img/LogoMuesli.png')}
            width={Dimensions.get('window').width / 3}
          />
          <View style={styles.buttonView}>
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
            {/*<Button
              onPress={() => {
                this.openDebugView();
              }}
              title="Debug"
            />*/}
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
  image: {
    flex: 1,
    marginTop: 5,
  },
  buttonView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  firstButton: {
    marginTop: 0,
  },
});
