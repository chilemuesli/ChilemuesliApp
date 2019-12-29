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
    this.rnfs.readDir(this.getBaseDirectory()).then(result => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([this.rnfs.stat(result[0].path), result[0].path]);
    });
  }
}
