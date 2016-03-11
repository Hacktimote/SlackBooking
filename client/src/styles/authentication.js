/**
 * Created by franciosdelpech on 3/11/16.
 */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;
var secondary = require('./variable').brandSecondary;

var {
  StyleSheet,
  Dimensions
  } = React;
var deviceHeight = Dimensions.get('window').height;
console.log(deviceHeight);
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent'
  },
  shadow2: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent',
    marginTop: -35
  },
  color: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: primary
  },
  textInput: {
    height: 40,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    paddingLeft: 10,
  },
  bg : {
    flex: 1,
    marginTop: deviceHeight/1.75,
    backgroundColor: secondary,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0
  },
  abg : {
    flex: 1,
    marginTop: deviceHeight/1.75,
    backgroundColor: secondary,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30
  },
  loginLogo: {
    width: 100,
  },
  background: {
    flex: 1,
    resizeMode: 'stretch'
  },
  logo: {
    marginBottom: 50,
    marginTop: -20,
    height: 150,
    width: 150,
    alignSelf: 'center'
  },
  navbar: {
    borderBottomColor: 'transparent',
  }
});