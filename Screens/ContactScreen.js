import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Linking,
  Platform,
  Image,
} from 'react-native';
import MyText from '../Components/MyText';
import MyTitle from '../Components/MyTitle';
import {COLOR_PRIMARY} from '../Styles/Common';
import {openComposer} from 'react-native-email-link';

const MAIL_ADDRESS = 'info@ref-hinwil.ch';
const MAIL_SUBJECT = 'Chilemues.li';
const PHONE_NUMBER = '+41 44 937 14 37';
const URL = 'www.ref-hinwil.ch';

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
    };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    const windowWidth = Dimensions.get('window').width;
    const margin = styles.contentView.margin || 0;
    const imageSource = require('./img/LogoRefHinwil.png');
    Image.getSize(
      Image.resolveAssetSource(imageSource).uri,
      (width, height) => {
        const availableWidth = Math.round(windowWidth - margin * 2);
        const ratio = width / height;
        const calculatedHeight = Math.round(availableWidth / ratio);
        this.setState({
          imageWidth: availableWidth,
          imageHeight: calculatedHeight,
        });
      },
      (error) => {
        console.log('Fehler beim Laden des Bildes:', error);
      }
    );
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

  weblinkPressed() {
    console.log('Web link pressed');
    Linking.openURL("https://" + URL).catch((err) => {
      console.error('An error occurred while opening the web link:', err);
    });
  }
  
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentView}>
          <View style={styles.imageView}>
            {this.state.imageWidth > 0 && this.state.imageHeight > 0 && (
              <Image
                source={require('./img/LogoRefHinwil.png')}
                style={{
                  width: this.state.imageWidth,
                  height: this.state.imageHeight,
                  resizeMode: 'contain',
                }}
              />
            )}
          </View>
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
          <MyText style={styles.link} onPress={() => this.weblinkPressed()}>
            {URL}
          </MyText>
          <MyTitle style={styles.topTitle}>Öffnungszeiten Sekretariat</MyTitle>
          <MyText>Dienstag bis Freitag</MyText>
          <MyText>8.30 – 11.30 Uhr / 13.30 – 15.30 Uhr</MyText>
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
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  topTitle: {
    marginTop: 20,
  },
  link: {
    color: COLOR_PRIMARY,
    textDecorationLine: 'underline',
  },
});
