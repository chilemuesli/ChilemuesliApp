import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';
import Video from 'react-native-video';

export default class StoryScreen extends React.Component {
  state = {
    readStoryService: new ReadStoriesService(),
    story: null,
    audioLoadingFailed: false,
  };

  constructor(props) {
    super(props);
    //console.log(props);
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.selectedStory
    ) {
      this.state.story = this.props.navigation.state.params.selectedStory;
    }
  }

  onBuffer() {
    console.log('Audio is buffering....');
  }

  onError() {
    console.log('Audio loading failed!');
  }

  render() {
    const story = this.state.story;
    let video = <Text>{'Audio file: ' + story.audioFile}</Text>;

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
          posterResizeMode="cover"
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
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  video: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 200,
    width: 300,
  },
});
