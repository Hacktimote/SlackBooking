/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  StatusBarIOS,
  View
} from 'react-native';


import RootRouter from './src/components/RootRouter';

class SlackBooking extends Component {
  render() {
    return (
      <RootRouter />
    );
  }
}

AppRegistry.registerComponent('SlackBooking', () => SlackBooking);
