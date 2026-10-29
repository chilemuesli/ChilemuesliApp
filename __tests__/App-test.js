/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

it('renders correctly', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  expect(tree.toJSON()).not.toBeNull();
  await act(async () => {
    tree.unmount();
  });
});
