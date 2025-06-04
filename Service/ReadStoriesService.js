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
    console.log('Checking path:', baseDirectory + 'Stories.json'); // Debug-Log hinzufügen

    // Prüfe zuerst, ob die Datei existiert
    return this.rnfs.exists(baseDirectory + 'Stories.json')
      .then(exists => {
        if (!exists) {
          console.error('Stories.json nicht gefunden in:', baseDirectory);
          return Promise.reject(new Error('Stories.json not found'));
        }
        
        return this.rnfs.readFile(baseDirectory + 'Stories.json');
      })
      .then((result) => {
        console.log('Raw file content:', result); // Debug-Log hinzufügen
        try {
          const parsed = JSON.parse(result);
          console.log('Parsed stories:', parsed); // Debug-Log hinzufügen
          
          return parsed.map(story => ({
            ...story,
            audioFile: story.audioFile ? baseDirectory + story.audioFile : undefined,
            avatar: story.avatar ? 'file://' + baseDirectory + story.avatar : undefined,
            imageFiles: story.imageFiles.map(img => baseDirectory + img)
          }));
        } catch (e) {
          console.error('JSON Parse Error:', e);
          return Promise.reject(e);
        }
      });
  }
}
