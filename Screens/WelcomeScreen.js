import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from '@rneui/themed';
import ScalableImage from '../Components/ScalableImage';
import {
  COLOR_PRIMARY,
  BUTTON_STYLES,
  BUTTON_TITLE_STYLES,
  FIRST_BUTTON_STYLES,
} from '../Styles/Common';

const BUTTON_WIDTH = 370; // Passe diesen Wert ggf. an deine längsten Texte an

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Menü',
  };

  state = {
    logoTouchCount: 0,
    lastLogoTouch: 0,
  };

  onLogoTouch() {
    console.log('Logo clicked');
    if (
      this.state.lastLogoTouch === 0 ||
      Date.now() - 1000 < this.state.lastLogoTouch
    ) {
      this.setState({lastLogoTouch: Date.now()});
      this.setState({logoTouchCount: this.state.logoTouchCount + 1});
      if (this.state.logoTouchCount >= 4) {
        this.setState({lastLogoTouch: 0});
        this.setState({logoTouchCount: 0});
        this.openDebugView();
      }
    } else {
      this.setState({lastLogoTouch: Date.now()});
      this.setState({logoTouchCount: 0});
    }
  }

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
      URL: 'https://www.chilemues.li/mobile-pages/datenschutzerklaerung-mobile/',
      title: 'Datenschutz',
    });
  }

  openHelpView() {
    console.log('openHelpView clicked');
    console.log('Try to open WebViewer');
    this.props.navigation.navigate('WebViewer', {
      URL: 'https://www.chilemues.li/mobile-pages/anleitung/',
      title: 'Anleitung',
    });
  }

  openDebugView() {
    console.log('openDebugView clicked');
    this.props.navigation.navigate('Debug', {});
  }

  render() {
    return (
      <View style={styles.mainView}>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <View style={styles.logoContainer}>
            <TouchableWithoutFeedback onPress={() => this.onLogoTouch()}>
              <ScalableImage
                source={require('../assets/img/LogoMuesli.png')}
                width={Dimensions.get('window').width * 0.6}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <Button
              onPress={() => this.openSearchMiceListView()}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              style={styles.firstButton}
              title="Müsli suchen"
            />
            <Button
              onPress={() => this.openTravellingInstructionsView()}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              title="Anreise"
            />
            <Button
              onPress={() => this.openContactView()}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              title="Kontakt"
            />
            <Button
              onPress={() => this.openPrivacyPolicyView()}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              title="Datenschutzerklärung"
            />
            <Button
              onPress={() => this.openHelpView()}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              title="Anleitung"
            />
            {/*<Button
              onPress={() => this.openDebugView()}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
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
    backgroundColor: '#ffffff',
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    width: '100%',
  },
  buttonView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: BUTTON_STYLES,
  buttonTitle: BUTTON_TITLE_STYLES,
  firstButton: FIRST_BUTTON_STYLES,
});
