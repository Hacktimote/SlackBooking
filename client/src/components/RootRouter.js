/**
 * Created by franciosdelpech on 3/10/16.
 */
'use strict';

import React, {Component, Navigator, Text, View} from 'react-native';
import {Router, Route, Schema} from 'react-native-router-flux';
//import EventEmitter from 'EventEmitter';
import Home from './Home';
import Login from './Login';
import layout from '../styles/layout';
import AppEventEmitter from '../services/eventEmitter';

export default class RootRouter extends Component {

  componentDidMount() {
    //AppEventEmitter.addListener('drawer.click', this.openControlPanel.bind(this));
  }

  componentWillUnMount() {
    //AppEventEmitter.removeListener('drawer.click');
  }


  render() {
    return(
        <View style={layout.layout}>
          <Router hideNavBar={true}>
            <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
            <Route name="login" component={Login} initial={true} sceneConfig={Navigator.SceneConfigs.FloatFromLeft}/>
            <Route name="home" wrapRouter={false} component={Home}  title="Home" />
          </Router>
        </View>
    );
  }
}