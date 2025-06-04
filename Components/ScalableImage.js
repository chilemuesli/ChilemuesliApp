import React from 'react';
import {Image, Dimensions} from 'react-native';

const ScalableImage = ({source, width}) => (
  <Image
    source={source}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      width: width,
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    }}
  />
);

export default ScalableImage;
