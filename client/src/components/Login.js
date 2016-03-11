/**
 * Created by franciosdelpech on 3/11/16.
 */
'use strict';

import React, {Component, TextInput, View, Image, Text} from 'react-native';
import styles from '../styles/style';
import login from '../styles/authentication';
import {Actions} from 'react-native-router-flux';

import {
  MKButton,
  MKColor,
} from  'react-native-material-kit';


// customize the material design theme
// MK.setTheme({
//   primaryColor: MKColor.Teal,
//   accentColor: MKColor.Purple,
// });


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

  }

  render() {
    const ColoredRaisedButton = MKButton.coloredButton()
      .withText('LOGIN')
      .withOnPress(() => {
        Actions.home({data:this.state.value });
      })
      .build();

    return (
      <View style={login.color}>
        <View style={login.bg}>
          <View
            style={{position:'relative',borderColor: 'white', borderWidth: 0.8, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 15, marginTop: 5,}}>
            <TextInput
              style={login.textInput}
              placeholder={'EMAIL'}
              onChangeText={(value) => this.setState({value})}
              value={this.state.value}/>
          </View>
          <View
            style={{position:'relative',borderColor: 'white', borderWidth: 0.8, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, margin: 15, marginTop: 5,}}>
            <TextInput
              style={login.textInput}
              placeholder={'PASSWORD'}
              secureTextEntry={true}/>
          </View>
          <View style={{padding:20}}>
            <ColoredRaisedButton/>
          </View>
        </View>
      </View>
    );
  }
};