import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';
import AsyncStorage from '@react-native-community/async-storage';
import {COLOR_PRIMARY} from '../Styles/Common';

export default class StoryListScreen extends React.Component {
  static navigationOptions = {
    title: 'Müsli',
  };

  state = {
    readStoryService: new ReadStoriesService(),
    stories: [],
    found: [],
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
    stories.forEach(story => {
      this.isAlreadyFound(story);
    });
    console.log('State:');
    console.log(this.state.stories);
  };

  onStorySelected(story) {
    console.log('Story selected: ' + story.id);
    this.props.navigation.navigate('Story', {
      selectedStory: story,
      isAlreadyFound: this.state.found[story.id],
    });
  }

  onContestSelected(){
    console.log('onContestSelected');
  }

  isAlreadyFound = async story => {
    try {
      const value = await AsyncStorage.getItem(story.id + '.found');
      let found = this.state.found;
      if (value !== null && value === 'true') {
        found[story.id] = true;
      } else {
        found[story.id] = false;
      }
      this.setState({found: found});
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let contestListItem = null;
    if (
      this.state.stories.length > 0 &&
      this.state.stories.length === this.state.found.length
    ) {
      //if (!this.state.stories.some(story => !this.state.found[story.id])) {
        contestListItem = (
          <ListItem
            title={'Wettbewerb'}
            rightIcon={{name: 'form', color: COLOR_PRIMARY}}
            onPress={() => this.onContestSelected()}
            bottomDivider={true}
          />
        );
      //}
    }

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
              checkmark={this.state.found[story.id]}
              bottomDivider={true}
            />
          ))}
          {contestListItem}
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
