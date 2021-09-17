import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';
import ReadStoriesService from '../Service/ReadStoriesService';
import AsyncStorage from '@react-native-community/async-storage';

export default class DebugScreen extends React.Component {
  static navigationOptions = {
    title: 'Debug',
  };

  state = {
    readStoryService: new ReadStoriesService(),
    stories: [],
  };

  componentDidMount() {
    this.state.readStoryService
      .readStories()
      .then((result) => {
        console.log('RESULT:');
        console.log(result);
        this.loadingFinished(result);
      })
      .catch((err) => {
        console.log('ERROR!');
        console.log(err);
      });
  }

  loadingFinished = (stories) => {
    this.setState({stories: stories});
    console.log('State:');
    console.log(this.state.stories);
  };

  setAllFound() {
    this.state.stories.forEach((story) => {
      try {
        AsyncStorage.setItem(story.id + '.found', 'true');
      } catch (e) {
        console.log(e);
      }
    });
  }

  setAllNotFound() {
    this.state.stories.forEach((story) => {
      try {
        AsyncStorage.setItem(story.id + '.found', 'false');
      } catch (e) {
        console.log(e);
      }
    });
  }

  render() {
    return (
      <View style={styles.mainView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <View style={styles.buttonView}>
            <Button
              onPress={() => {
                this.setAllFound();
              }}
              style={styles.firstButton}
              title="Alle gefunden"
            />
            <Button
              onPress={() => {
                this.setAllNotFound();
              }}
              title="Keine gefunden"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    marginTop: 5,
  },
  buttonView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  firstButton: {
    marginTop: 0,
  },
});
