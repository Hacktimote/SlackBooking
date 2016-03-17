/**
 * Created by franciosdelpech on 3/11/16.
 */
'use strict';

import React, {Component, TextInput, View, Image, Text} from 'react-native';
import styles from '../styles/style';
import login from '../styles/logins';
import {Actions} from 'react-native-router-flux';

import {
  MKButton,
  MKColor,
} from  'react-native-material-kit';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    const ColoredRaisedButton = MKButton.coloredButton()
      .withText('LOGIN WITH SLACK')
      .withOnPress(() => {
        Actions.home({data: this.state.value});
      })
      .build();

    return (
      <View style={login.color}>

        <View style={{flex: 3, flexDirection: 'row'}}>

          <View style={styles.container}>
            <Image
              resizeMode="contain"
              source={require('../img/estimote.png')}
              style={login.canvas}/>
          </View>
        </View>
        <View style={login.bg}>
          <View style={{padding:20, borderRadius:10}}>
            <ColoredRaisedButton/>
          </View>
        </View>
      </View>
    );
  }
};