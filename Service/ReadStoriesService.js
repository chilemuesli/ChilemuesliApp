import {Platform} from 'react-native';

export default class ReadStoriesService {
  constructor() {
    this.rnfs = require('react-native-fs');
  }
  getBaseDirectory() {
    if (Platform.OS === 'ios') {
      return this.rnfs.MainBundlePath + '/StoryData';
    } else if (Platform.OS === 'android') {
      return this.rnfs.DocumentDirectoryPath + '/raw';
    }
  }

  readStories() {
    console.log(this.getBaseDirectory());
    return new Promise((resolve, reject) => {
      this.rnfs
        .readFile(this.getBaseDirectory() + '/Stories.json')
        .then(result => {
          console.log('File loaded, try to parse it.');
          resolve(JSON.parse(result));
        })
        .catch(err => {
          console.log('ERROR!');
          console.log(err.message, err.code);
          reject(err);
        });
    });
  }
}
