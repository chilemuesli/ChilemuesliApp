import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import ScalableImage from '../Components/ScalableImage';
import MyText from '../Components/MyText';
import MyTitle from '../Components/MyTitle';
import {COLOR_PRIMARY} from '../Styles/Common';
import {openComposer} from 'react-native-email-link';

const MAIL_ADDRESS = 'info@ref-hinwil.ch';
const MAIL_SUBJECT = 'Chilemues.li';
const PHONE_NUMBER = '+41 44 937 14 37';
export default class ContactScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  phoneNumberPressed() {
    console.log('Phone number pressed.');
    Linking.openURL('tel:' + PHONE_NUMBER);
  }

  emailPressed() {
    console.log('E-mail pressed');
    if (Platform.OS === 'ios') {
      openComposer({
        title: 'Mail App wählen',
        message: 'Welche Mail App möchtest du verwenden',
        cancelLabel: 'Abbrechen',
        to: MAIL_ADDRESS,
        subject: MAIL_SUBJECT,
      });
    } else if (Platform.OS === 'android') {
      Linking.openURL('mailto:' + MAIL_ADDRESS);
    }
  }

  render() {
    const logoWidth = Math.min(
      300,
      Dimensions.get('window').width - styles.contentView.margin * 2
    );

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentView}>
          <ScalableImage
            source={require('./img/LogoRefHinwil.png')}
            width={Dimensions.get('window').width - styles.contentView.margin * 2}
          />
          <MyTitle style={styles.topTitle}>Kontakt</MyTitle>
          <MyText>Evangelisch-reformierte Kirchgemeinde Hinwil</MyText>
          <MyText>Felsenhofstrasse 9</MyText>
          <MyText>8340 Hinwil</MyText>
          <MyText style={styles.link} onPress={() => this.phoneNumberPressed()}>
            {PHONE_NUMBER}
          </MyText>
          <MyText style={styles.link} onPress={() => this.emailPressed()}>
            {MAIL_ADDRESS}
          </MyText>
          <MyTitle style={styles.topTitle}>Öffnungszeiten Sekretariat</MyTitle>
          <MyText>Dienstag bis Freitag</MyText>
          <MyText>8.30 – 11.30 Uhr / 13.30 – 15.30 Uhr</MyText>
          <View/>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentView: {
    margin: 10,
    alignItems: 'top',
  },
  topTitle: {
    marginTop: 20,
  },
  link: {
    color: COLOR_PRIMARY,
    textDecorationLine: 'underline',
  },
});
