import React, {useEffect, useLayoutEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';  // Avatar zusätzlich importieren
import ReadStoriesService from '../Service/ReadStoriesService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR_PRIMARY} from '../Styles/Common';
import {useNavigation} from '@react-navigation/native';

const StoryListScreen = () => {
  const navigation = useNavigation();
  const [readStoryService] = React.useState(new ReadStoriesService());
  const [stories, setStories] = React.useState([]);
  const [found, setFound] = React.useState({});

  // Screen-Titel setzen
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Müsli',
    });
  }, [navigation]);

  const isAlreadyFound = React.useCallback(
    async (story) => {
      try {
        const value = await AsyncStorage.getItem(story.id + '.found');
        let updatedFound = {...found};
        if (value !== null && value === 'true') {
          updatedFound[story.id] = true;
        } else {
          updatedFound[story.id] = false;
        }
        setFound(updatedFound);
      } catch (e) {
        console.log(e);
      }
    },
    [found]
  );

  const loadData = React.useCallback(() => {
    const loadingFinished = (storiesResult) => {
      console.log('Setting state with stories:', JSON.stringify(storiesResult, null, 2));
      setStories(storiesResult);
      storiesResult.forEach((story) => {
        isAlreadyFound(story);
      });
    };

    console.log('Loading stories...');
    readStoryService
      .readStories()
      .then((result) => {
        console.log('RESULT:', JSON.stringify(result, null, 2));
        if (!result || result.length === 0) {
          console.warn('No stories received');
        }
        loadingFinished(result);
      })
      .catch((err) => {
        console.error('ERROR loading stories:', err);
      });
  }, [readStoryService, isAlreadyFound]);
  // isAlreadyFound is now wrapped in useCallback above

  // Call loadData when the component mounts
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // Handler for when a story is selected
  const onStorySelected = (story) => {
    if (story) {
      navigation.navigate('StoryScreen', {
        selectedStory: story,
      });
    } else {
      console.warn('Keine Story zum Anzeigen ausgewählt');
    }
  };

  console.log('Rendering with stories:', stories.length);
  // Render-Methode hinzufügen
  return (
    <ScrollView style={styles.view}>
      <View>
        {stories && stories.length > 0 ? (
          stories.map((story, i) => (
            <ListItem
              key={i}
              onPress={() => onStorySelected(story)}
              bottomDivider
            >
              <Avatar
                source={
                  story.avatar
                    ? {uri: story.avatar}
                    : require('../assets/img/LogoMuesli.png')
                }
                rounded
                imageProps={styles.avatarImage}
                containerStyle={styles.avatarContainer}
                size={50}
              />
              <ListItem.Content>
                <ListItem.Title>{story.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name="chevron-right"
                color={COLOR_PRIMARY}
                size={24}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Keine Müslis gefunden</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  avatarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarImage: {
    resizeMode: 'cover',
  },
});

// Default-Export hinzufügen
export default StoryListScreen;
