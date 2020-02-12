import {Platform} from 'react-native';

export default class ReadStoriesService {
  constructor() {
    this.rnfs = require('react-native-fs');
  }

  getBaseDirectory() {
    if (Platform.OS === 'ios') {
      return this.rnfs.MainBundlePath + '/StoryData/';
    } else if (Platform.OS === 'android') {
      return this.rnfs.DocumentDirectoryPath + '/raw/';
    }
  }

  readStories() {
    let baseDirectory = this.getBaseDirectory();
    console.log(baseDirectory);
    return new Promise((resolve, reject) => {
      this.rnfs
        .readFile(baseDirectory + 'Stories.json')
        .then(result => {
          console.log('File loaded, try to parse it.');
          result = JSON.parse(result);
          result.forEach(story => {
            if (story.audioFile !== undefined && story.audioFile !== '') {
              story.audioFile = baseDirectory + story.audioFile;
            }
            if (story.avatar !== undefined && story.avatar !== '') {
              story.avatar = 'file://' + baseDirectory + story.avatar;
            }
            console.log('story.avatar=' + story.avatar);
            story.imageFiles.forEach((part, index, imageFiles) => {
              imageFiles[index] = baseDirectory + imageFiles[index];
            });
          });
          resolve(result);
        })
        .catch(err => {
          console.log('ERROR!');
          console.log(err.message, err.code);
          reject(err);
        });
    });
  }
}
