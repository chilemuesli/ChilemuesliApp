import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import BeaconRangingService from '../Service/BeaconRangingService';

export default class StoryScreen extends React.Component {
  state = {
    readStoryService: new ReadStoriesService(),
    beaconRangingService: new BeaconRangingService(),
    story: null,
    audioLoadingFailed: false,
    found: false,
  };

  constructor(props) {
    super(props);
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.selectedStory
    ) {
      this.state.story = this.props.navigation.state.params.selectedStory;
    }
    this.isAlreadyFound();
  }

  componentDidMount() {
    this.state.beaconRangingService.startRanging(
      beaconsMap => {
        console.log('BeaconsMap: ' + beaconsMap);
      },
      bluetoothState => {
        console.log('BluetoothState: ' + bluetoothState);
      },
      this.state.story.iBeaconName,
    );
  }

  componentWillUnmount() {
    this.state.beaconRangingService.stopRanging();
  }

  isAlreadyFound = async () => {
    try {
      const value = await AsyncStorage.getItem(
        this.state.story.iBeaconName + '.found',
      );
      if (value !== null && value === 'true') {
        this.setState({found: true});
      } else {
        console.log(this.state.story.iBeaconName + ' was not found before.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  setIsAlreadyFound = async () => {
    try {
      await AsyncStorage.setItem(
        this.state.story.iBeaconName + '.found',
        'true',
      );
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
    let video = null;

    if (story.audioFile !== undefined && story.audioFile !== '') {
      video = (
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
      );
    }
    return (
      <ScrollView style={styles.view}>
        <View>
          <Text h1>{story.title}</Text>
          {video}
        </View>
      </ScrollView>
    );
  }
}
const ASPECT_RATIO = 16 / 9;
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: 'auto',
    minWidth: '100%',
    aspectRatio: ASPECT_RATIO,
  },
});
