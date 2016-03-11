/**
 * Created by franciosdelpech on 3/11/16.
 */

/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;

var {
  StyleSheet,
  } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  color: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: primary
  },
  listContainer: {
    borderBottomColor: '#453F41',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.6,
    marginLeft: 22,
    marginRight: 22,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  list: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center'
  },
  toolbar: {
    height: 70,
    backgroundColor: '#322A2A',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingTop: 30
  },
  breakline : {
    marginTop: 15
  }
});