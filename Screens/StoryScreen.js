import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';

export default class StoryScreen extends React.Component {
  state = {
    readStoryService: new ReadStoriesService(),
    story: null,
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

  render() {
    const story = this.state.story;
    return (
      <ScrollView style={styles.view}>
        <View>
          <Text h1>{story.title}</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
