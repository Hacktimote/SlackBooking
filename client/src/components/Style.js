/**
 * Created by franciosdelpech on 3/10/16.
 */
var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  } = React;

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#475577'
  },

  transparent: {
    marginTop: 70,
    padding: 15,
    backgroundColor: 'transparent',
    flex: 1
  },

  bg : {
    backgroundColor: '#3B3738',
    flex: 1
  },

  verticalCenter: {
    justifyContent: 'center'
  },

  name: {
    color: 'rgba(255, 255, 255, 1)',
    flex: 1,
    fontSize: 15
  },

  subject: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12
  },

  time: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 2
  },

  message: {
    color: 'rgba(255, 255, 255, 1)',
    marginTop: 12,
    flexWrap: 'wrap',
    fontSize: 12
  },

  background: {
    flex: 1,
  },

  sidebar: {
    padding: 10,
    paddingTop: 30,
  },

  link: {
    backgroundColor: 'transparent',
    padding: 5,
    borderColor: '#eeeeee',
    borderWidth:1,
    borderColor: 'transparent'
  },

  controlPanelText: {
    color:'white',
  },

  linkText: {
    fontSize: 20,
    color: '#fff'
  },

  logo: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginTop: -50
  },

  desc: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold'
  },

  sliderMetric: {
    right:10,
    width:30
  },

  slider: {
    width: 150,
    height: 10,
    margin: 10
  },

  button: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#eeeeee',
    borderWidth:1,
    borderBottomColor: '#aaaaaa',
    marginRight:20,
    marginLeft:20,
    alignSelf: 'center',
    marginTop: 10
  },

  buttonColor: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#eeeeee',
    borderWidth:1,
    borderBottomColor: '#aaaaaa',
    marginRight:20,
    marginLeft:20,
    alignSelf: 'center',
    marginTop: 10
  },

});

module.exports= styles;