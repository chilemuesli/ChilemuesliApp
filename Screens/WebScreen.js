import React from 'react';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';

type Props = {
  url?: string,
};

export default class WebScreen extends React.Component<Props> {
  static defaultProps = {
    url: Config.WELCOME_URL,
  };
  render() {
    return (
      <WebView
        source={{uri: Props.url}}
        style={{marginTop: 0}}
        scalesPageToFit={true}
      />
    );
  }
}
