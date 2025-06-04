import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {useRoute, useNavigation} from '@react-navigation/native';

const WebScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const url = route.params?.URL || Config.WELCOME_URL;

  // Titel aus den Navigation-Parametern setzen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title || '',
    });
  }, [navigation, route.params?.title]);

  const onShouldStartLoadWithRequest = navigator => {
    return true;
  };

  return (
    <WebView
      source={{uri: url}}
      style={styles.scrollView}
      scalesPageToFit={true}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      onNavigationStateChange={onShouldStartLoadWithRequest}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default WebScreen;
