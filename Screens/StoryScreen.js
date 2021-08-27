import React from 'react';
import {Platform} from 'react-native';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import MyText from '../Components/MyText';
import MyTitle from '../Components/MyTitle';
import ReadStoriesService from '../Service/ReadStoriesService';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import BeaconRangingService from '../Service/BeaconRangingService';

export default class StoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let story = navigation.getParam('selectedStory');
    if (story !== null) {
      return {
        title: story.title,
      };
    }
    return {
      title: '',
    };
  };

  state = {
    readStoryService: new ReadStoriesService(),
    beaconRangingService: new BeaconRangingService(),
    story: null,
    audioLoadingFailed: false,
    found: false,
    distanceToBeaconInMeter: 'unbekannt',
  };

  constructor(props) {
    super(props);
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.selectedStory) {
        this.state.story = this.props.navigation.state.params.selectedStory;
      }
    }
    this.isAlreadyFound();
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      console.log('Running on iOS');
    } else if (Platform === 'android') {
      console.log('Running on Android');
    }
  }

  startRangingForBeacon() {
    this.state.beaconRangingService.startRanging(
      beacon => {
        console.log('Beacon: ' + JSON.stringify(beacon));
        this.setState({distanceToBeaconInMeter: beacon.distance});
        if (beacon.distance >= 0 && beacon.distance < 2) {
          // Found it!
          this.state.beaconRangingService.stopRanging();
          this.showFoundAlert();
          this.setIsAlreadyFound();
        }
      },
      bluetoothState => {
        console.log('BluetoothState: ' + bluetoothState);
      },
      this.state.story.major,
      this.state.story.minor,
    );
  }

  componentWillUnmount() {
    if (!this.state.found) {
      this.state.beaconRangingService.stopRanging();
    }
  }

  showFoundAlert() {
    Alert.alert(
      'Gefunden!',
      'Juhu, du hast die ' + this.state.story.title + ' gefunden!',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  isAlreadyFound = async () => {
    try {
      const value = await AsyncStorage.getItem(this.state.story.id + '.found');
      if (value !== null && value === 'true') {
        this.setState({found: true});
      } else {
        this.startRangingForBeacon();
        console.log(this.state.story.iBeaconName + ' was not found before.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  setIsAlreadyFound = async () => {
    try {
      this.setState({found: true});
      await AsyncStorage.setItem(this.state.story.id + '.found', 'true');
    } catch (e) {
      console.log(e);
    }
    console.log('Value saved.');
  };

  onBuffer() {
    console.log('Audio is buffering....');
  }

  onError() {
    console.log('Audio loading failed!');
  }

  render() {
    const story = this.state.story;
    let title = <MyTitle style={styles.topTitle}>{story.title}</MyTitle>;
    let content = null;

    if (!this.state.found) {
      content = (
        <View>
          {title}
          <MyText style={styles.contentText}>
            Du hast die {story.title} bisher noch nicht gefunden. Die{' '}
            {story.title} ist irgendwo in der Kirche versteckt. Um die{' '}
            Geschichte freizuschalten, musst du die Maus finden und dein{' '}
            Smartphone in ihre Nähe halten. Damit dies funktioniert, muss auf{' '}
            deinem Smartphone Bluetooth aktiviert sein und du musst der{' '}
            Chilemues.li App gestatten auf deinen Standort zuzugreifen.
          </MyText>
          <MyTitle style={styles.distanceTitle}>
            Geschätzte Distanz zur Maus
          </MyTitle>
          <MyText style={styles.distanceText}>
            {isNaN(this.state.distanceToBeaconInMeter)
              ? 'Du bist zu weit entfernt'
              : Math.round(this.state.distanceToBeaconInMeter * 10) / 10 + 'm'}
          </MyText>
        </View>
      );
    } else if (
      this.state.found &&
      story.audioFile !== undefined &&
      story.audioFile !== ''
    ) {
      content = (
        <View>
          {title}
          <Video
            source={{uri: story.audioFile}} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
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
          <MyText style={styles.contentText}>{story.description}</MyText>
        </View>
      );
    }
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentView}>{content}</View>
      </ScrollView>
    );
  }
}
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
  contentText: {
    marginTop: 20,
  },
  distanceTitle: {
    textAlign: 'center',
    marginTop: 30,
  },
  distanceText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  video: {
    marginTop: 20,
    width: '100%',
    height: 'auto',
    minWidth: '100%',
    aspectRatio: ASPECT_RATIO,
  },
});
