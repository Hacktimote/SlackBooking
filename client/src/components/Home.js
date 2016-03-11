/**
 * Created by franciosdelpech on 3/10/16.
 */
'use strict';

import React, {Component, Text, View, ScrollView, Image} from 'react-native';
import styles from '../styles/style';
import NavigationBar from 'react-native-navbar';
import home from '../styles/home';
import {Actions} from 'react-native-router-flux';
import Card from './Card';


export default class Home extends Component {

  render() {

    const rightButtonConfig = {
      title: 'Login',
      handler: () => alert('hello!'),
    };

    const titleConfig = {
      title: 'My meeting rooms',
    };

    return (
      <View style={home.color}>
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}/>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {/* Here the magic happens*/}
            <Card />
            <Card />
          </View>
        </ScrollView>
      </View>
    );
  }
}