import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';

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

  render() {
    return (
      <ScrollView style={styles.view}>
        <View>
          {this.state.stories.map((l, i) => (
            <ListItem
              key={l.id}
              //leftAvatar={{source: {uri: l.avatar_url}}}
              title={l.title}
              //subtitle={l.subtitle}
              bottomDivider
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
