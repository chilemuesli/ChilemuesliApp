import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import MyText from '../Components/MyText';
import MyTitle from '../Components/MyTitle';
import createOpenLink from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from '@rneui/themed';
import {
  COLOR_PRIMARY, 
  BUTTON_STYLES, 
  BUTTON_TITLE_STYLES
} from '../Styles/Common';
import {useRoute, useNavigation} from '@react-navigation/native';

const ICON_SIZE = 40;
const churchAddress = {
  latitude: 47.301343,
  longitude: 8.8472558,
  query: 'Reformierte Kirchgemeinde Hinwil',
  end: 'Reformierte Kirchgemeinde Hinwil',
};
const TravelInstructionsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Screen-Titel aus den Parametern setzen oder Default-Wert verwenden
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title || 'Anreise',
    });
  }, [navigation, route.params?.title]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.contentView}>
        <MyTitle style={styles.topTitle}>Anreise</MyTitle>
        <View style={styles.iconView}>
          <Icon name="train" size={ICON_SIZE} color={COLOR_PRIMARY} />
        </View>
        <MyText>Mit der S14 bis zum Bahnhof Hinwil.</MyText>
        <View style={styles.iconView}>
          <Icon name="bus" size={ICON_SIZE} color={COLOR_PRIMARY} />
        </View>
        <MyText>
          Mit den Bussen der Linien 870 oder 875 bis Hinwil, Gstalden.
        </MyText>
        <MyText>
          {
            'Von hier sind es noch drei Minuten Fussmarsch zur Reformierten Kirche.'
          }
        </MyText>
        <View style={styles.iconView}>
          <Icon name="car" size={ICON_SIZE} color={COLOR_PRIMARY} />
        </View>
        <MyText>
          {
            'Reformierte Kirchgemeinde Hinwil\nFelsenhofstrasse 9\n8340 Hinwil'
          }
        </MyText>
        <View style={styles.buttonView}>
          <Button
            onPress={() => createOpenLink(churchAddress)}
            buttonStyle={BUTTON_STYLES}
            titleStyle={BUTTON_TITLE_STYLES}
            title="Auf der Karte zeigen"
          />
        </View>
        <MyText>
          Mit dem Auto kann direkt bis zur Kirche gefahren werden.
        </MyText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentView: {
    margin: 10,
  },
  iconView: {
    marginTop: 15,
    marginBottom: 15,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonView: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  topTitle: {
    //textAlign: 'center',
  },
});

export default TravelInstructionsScreen;
