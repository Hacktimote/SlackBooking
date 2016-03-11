/**
 * Created by franciosdelpech on 3/10/16.
 */
'use strict';

import React, {Component, Text, View, ScrollView} from 'react-native';
import styles from '../styles/style';
import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {

  render() {

    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };

    const titleConfig = {
      title: 'Hello, world',
    };

    return(
      <View style={home.color}>
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig} />
        <ScrollView style={{backgroundColor: 'transparent'}}>
          <View style={home.listContainer}>
            <Text style={home.list}>
              Welcome!
            </Text>
          </View>
          <View style={home.listContainer}>
            <Text style={home.list}>
              Native Starter Free version!
            </Text>
          </View>
          <View style={home.breakline}>
          </View>
          <View>
            <ButtonRounded
              onPress={Actions.login}
              text="Logout" />
          </View>
        </ScrollView>
      </View>
    );
  }
}