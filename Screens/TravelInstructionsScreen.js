import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import createOpenLink from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {COLOR_PRIMARY} from '../Styles/Common';

const churchAddress = {
  latitude: 47.301343,
  longitude: 8.8472558,
  query: 'Reformierte Kirchgemeinde Hinwil',
  end: 'Reformierte Kirchgemeinde Hinwil'
};
export default class TravelInstructionsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentView}>
          <Text h2 style={styles.topTitle}>
            Anreise
          </Text>
          <View style={styles.iconView}>
            <Icon name="train" size={50} color={COLOR_PRIMARY} />
          </View>
          <Text>Mit der S14 bis zum Bahnhof Hinwil.</Text>
          <View style={styles.iconView}>
            <Icon name="bus" size={50} color={COLOR_PRIMARY} />
          </View>
          <Text>
            {
              'Mit den Bussen der Linien 870 oder 875 bis zur Haltestelle Hinwil, Gstalden.'
            }
          </Text>
          <Text>
            {
              'Von hier sind es noch drei Minuten zu Fuss bis zur Reformierten Kirche Hinwil.'
            }
          </Text>
          <View style={styles.iconView}>
            <Icon name="car" size={50} color={COLOR_PRIMARY} />
          </View>
          <Text>
            {
              'Mit dem Auto kann direkt bis zur Kirche gefahren werden.\n\nAdresse:\nReformierte Kirchgemeinde Hinwil\nFelsenhofstrasse 9\n8340 Hinwil'
            }
          </Text>
          <View style={styles.buttonView}>
            <Button
              onPress={() => createOpenLink(churchAddress)}
              title="Auf der Karte zeigen"
            />
          </View>
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
  iconView: {
    marginTop: 20,
    marginBottom: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  topTitle: {
    textAlign: 'center',
  },
});