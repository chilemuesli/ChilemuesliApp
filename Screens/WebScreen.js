import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import Config from 'react-native-config';

export default class WebScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  state = {
    URL: Config.WELCOME_URL,
  };

  constructor(props) {
    super(props);
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.URL
    ) {
      this.state.URL = this.props.navigation.state.params.URL;
    }
  }

  onShouldStartLoadWithRequest(navigator) {
    //this.webview.stopLoading();
    return true;
  }

  render() {
    return (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        source={{uri: this.state.URL}}
        style={styles.scrollView}
        scalesPageToFit={true}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
        onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
      />
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});
