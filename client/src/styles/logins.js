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
var deviceWidth = Dimensions.get('window').width;

console.log(deviceHeight);
module.exports = StyleSheet.create({
  color: {
    flex: 1,
    backgroundColor: primary
  },
  bg: {
    flex: 1,
    backgroundColor: secondary,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  imageContainer:{
    flex: 3,
    flexDirection: 'row'
  },
  canvas: {
    top: 0,
    left: 0,
    width: deviceWidth,
    flex:1
  },
  background: {
    flex: 1,
    resizeMode: 'stretch'
  },
  navbar: {
    borderBottomColor: 'transparent',
  }
});