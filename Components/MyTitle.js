import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default class MyTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={[styles.defaultStyle, this.props.style]}
        onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
  },
});
