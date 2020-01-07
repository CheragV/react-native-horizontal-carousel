/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text
} from 'react-native';
import HorizontalCarousel from './src'

const LIST_DATA = [
  {
      id: 'Enjoy',
      description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
  },
  {
      id: 'Designed',
      description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
  },
  {
      id: 'Corporate',
      description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
  },
  {
      id: 'Spicexpress',
      description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
  },
  {
      id: 'Apply',
      description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
  },
  {
      id: 'Change',
      description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
  }
];

const App: () => React$Node = () => {
  return (
        <HorizontalCarousel
          // containerWidth = {300}
          renderRow = {(index, item) => (
            <Text style = {{ padding: 10 }} numberOfLines = {4}>
                {item.description}
            </Text>
          )}
          dotColor = "red"
          data={LIST_DATA}
          forwardText = {'next'}
          backwardText = {'previous'}
        />
  );
};

export default App;
