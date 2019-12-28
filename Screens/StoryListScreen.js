import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import ReadStoriesService from '../Service/ReadStoriesService';

export default class StoryListScreen extends React.Component {
  state = {
    readStoryService: new ReadStoriesService(),
  };

  constructor(props) {
    super(props);
    this.state.readStoryService.readStories();
  }
  render() {
    return (
      <ScrollView style={styles.view}>
        <View />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
