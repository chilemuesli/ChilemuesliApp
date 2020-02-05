import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default class MyText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[styles.defaultStyle, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
  },
});
