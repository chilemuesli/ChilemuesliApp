import React from 'react';
import {Platform} from 'react-native';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import MyText from '../Components/MyText';
import MyTitle from '../Components/MyTitle';
import ReadStoriesService from '../Service/ReadStoriesService';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BeaconRangingService from '../Service/BeaconRangingService';
import {Button} from '@rneui/themed';
import {
  COLOR_PRIMARY,
  BUTTON_STYLES,
  BUTTON_TITLE_STYLES
} from '../Styles/Common';
import {useRoute, useNavigation} from '@react-navigation/native';

const Pulse = require('react-native-pulse').default;

const StoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const selectedStory = route.params?.selectedStory;

  // Frühe Rückgabe, wenn keine Story übergeben wurde
  if (!selectedStory) {
    return (
      <View style={styles.contentView}>
        <MyText>Keine Story gefunden</MyText>
      </View>
    );
  }

  const [state, setState] = React.useState({
    readStoryService: new ReadStoriesService(),
    beaconRangingService: new BeaconRangingService(),
    story: selectedStory,  // Hier wird die selectedStory verwendet
    audioLoadingFailed: false,
    searching: false,
    found: false,
    distanceToBeaconInMeter: 'unbekannt',
  });

  // Screen-Titel setzen
  React.useLayoutEffect(() => {
    if (selectedStory?.title) {
      navigation.setOptions({
        title: selectedStory.title,
      });
    }
  }, [navigation, selectedStory]);

  React.useEffect(() => {
    isAlreadyFound();
  }, [isAlreadyFound]);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      console.log('Running on iOS');
    } else if (Platform === 'android') {
      console.log('Running on Android');
    }
  }, []);

  const startRangingForBeacon = () => {
    state.beaconRangingService.startRanging(
      (beacon) => {
        console.log('Beacon: ' + JSON.stringify(beacon));
        console.log('Distance: ' + beacon.distance);
        if (beacon.distance >= 0) {
          setState(prevState => ({...prevState, distanceToBeaconInMeter: beacon.distance}));
          if (beacon.distance <= 3) {
            // Found it!
            state.beaconRangingService.stopRanging();
            showFoundAlert();
            setIsAlreadyFound();
            setState(prevState => ({...prevState, searching: false}));
          }
        } else {
          setState(prevState => ({...prevState, distanceToBeaconInMeter: 'unbekannt'}));
        }
      },
      (bluetoothState) => {
        console.log('BluetoothState: ' + bluetoothState);
      },
      state.story.major,
      state.story.minor,
    );
  }

  React.useEffect(() => {
    return () => {
      if (state.searching) {
        state.beaconRangingService.stopRanging();
      }
    };
  }, [state.searching]);

  const showFoundAlert = () => {
    Alert.alert(
      'Gefunden!',
      'Juhu, du hast die ' + state.story.title + ' gefunden!',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  const isAlreadyFound = async () => {
    try {
      const value = await AsyncStorage.getItem(state.story.id + '.found');
      if (value !== null && value === 'true') {
        setState(prevState => ({...prevState, found: true}));
      } else {
        console.log(state.story.id + ' was not found before.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setIsAlreadyFound = async () => {
    try {
      setState(prevState => ({...prevState, found: true}));
      await AsyncStorage.setItem(state.story.id + '.found', 'true');
    } catch (e) {
      console.log(e);
    }
    console.log('Value saved.');
  };

  const startSearching = () => {
    setState(prevState => ({...prevState, searching: true}));
    startRangingForBeacon();
  }

  const onBuffer = () => {
    console.log('Audio is buffering....');
  }

  const onError = () => {
    console.log('Audio loading failed!');
  }

  const story = state.story;
  let title = <MyTitle style={styles.topTitle}>{story.title}</MyTitle>;
  let content = null;
  let article = '';
  let articleLow = '';
  if (story.article) {
    article = story.article + ' ';
    articleLow = story.article.toLowerCase() + ' ';
  }

  if (!state.found && !state.searching) {
    content = (
      <View>
        {title}
        <MyText style={styles.contentText}>
          Du hast {articleLow}
          {story.title} bisher noch nicht gefunden. Die Chilemuesli sind
          irgendwo in der Kirche versteckt. Um die Geschichte freizuschalten,
          musst du {articleLow}
          {story.title} finden und dein Smartphone näher als 2m heranbringen.
          Damit dies funktioniert, muss auf deinem Smartphone Bluetooth
          aktiviert sein und du musst der Chilemues.li App gestatten auf
          deinen Standort zuzugreifen.
        </MyText>
        <View style={styles.buttonView}>
          <Button
            onPress={() => {
              startSearching();
            }}
            buttonStyle={BUTTON_STYLES}
            titleStyle={BUTTON_TITLE_STYLES}
            title="Suche starten"
          />
        </View>
      </View>
    );
  } else if (state.searching) {
    content = (
      <View>
        {title}
        <MyTitle style={styles.distanceTitle}>
          Geschätzte Distanz zur Maus
        </MyTitle>

        <View style={styles.sonarView}>
          <Pulse
            color={COLOR_PRIMARY}
            numPulses={3}
            diameter={400}
            speed={20}
            duration={2000}
          />
          <MyText style={styles.distanceText}>
            {isNaN(state.distanceToBeaconInMeter)
              ? 'Du bist zu weit entfernt'
              : Math.round(state.distanceToBeaconInMeter * 10) / 10 +
                'm'}
          </MyText>
        </View>
      </View>
    );
  } else if (state.found) {
    let video = <View />;
    if (story.audioFile) {
      video = (
        <Video
          source={{uri: story.audioFile}} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }} // Store reference
          onBuffer={onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be load
          //poster={story.imageFiles[0]}
          ignoreSilentSwitch="ignore"
          posterResizeMode={'center'}
          audioOnly={true}
          controls={true}
          paused={true}
          muted={false}
          style={styles.video}
        />
      );
    }
    let copyright = <View />;
    if (story.copyrightNotice) {
      copyright = (
        <MyText style={styles.copyrightText}>{story.copyrightNotice}</MyText>
      );
    }
    content = (
      <View>
        {title}
        {video}
        {copyright}
        <MyText style={styles.contentText}>{story.description}</MyText>
      </View>
    );
  }
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.contentView}>{content}</View>
    </ScrollView>
  );
};

const ASPECT_RATIO = 16 / 9;
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentView: {
    margin: 10,
  },
  topTitle: {
    textAlign: 'center',
  },
  copyrightText: {
    marginTop: 10,
    fontSize: 14,
  },
  contentText: {
    marginTop: 20,
  },
  distanceTitle: {
    textAlign: 'center',
    marginTop: 40,
  },
  sonarView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
    //marginTop: 120,
  },
  distanceText: {
    fontSize: 30,
    textAlign: 'center',
    //marginTop: 50,
  },
  buttonView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  video: {
    marginTop: 20,
    width: '100%',
    height: 'auto',
    minWidth: '100%',
    aspectRatio: ASPECT_RATIO,
  },
});

export default StoryScreen;
