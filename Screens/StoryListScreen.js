import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';
import {COLOR_PRIMARY} from '../Styles/Common';

export default class StoryListScreen extends React.Component {
  state = {
    readStoryService: new ReadStoriesService(),
    stories: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.state.readStoryService
      .readStories()
      .then(result => {
        console.log('RESULT:');
        console.log(result);
        this.loadingFinished(result);
      })
      .catch(err => {
        console.log('ERROR!');
        console.log(err);
      });
  }

  loadingFinished = stories => {
    this.setState({stories: stories});
    console.log('State:');
    console.log(this.state.stories);
  };

  onStorySelected(story) {
    console.log('Story selected: ' + story.id);
    this.props.navigation.navigate('Story', {selectedStory: story});
  }

  render() {
    return (
      <ScrollView style={styles.view}>
        <View>
          {this.state.stories.map((story, i) => (
            <ListItem
              key={i}
              leftAvatar={{source: {uri: story.avatar}}}
              title={story.title}
              onPress={() => this.onStorySelected(story)}
              rightIcon={{name: 'chevron-right', color: COLOR_PRIMARY}}
              bottomDivider={true}
            />
          ))}
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
