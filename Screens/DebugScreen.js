import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from '@rneui/themed';
import ReadStoriesService from '../Service/ReadStoriesService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  COLOR_PRIMARY,
  BUTTON_STYLES,
  BUTTON_TITLE_STYLES,
  FIRST_BUTTON_STYLES,
} from '../Styles/Common';

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
              onPress={() => this.setAllFound()}
              buttonStyle={[BUTTON_STYLES, FIRST_BUTTON_STYLES]}
              titleStyle={BUTTON_TITLE_STYLES}
              title="Alle gefunden"
            />
            <Button
              onPress={() => this.setAllNotFound()}
              buttonStyle={BUTTON_STYLES}
              titleStyle={BUTTON_TITLE_STYLES}
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
});
