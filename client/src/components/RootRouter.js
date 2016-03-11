/**
 * Created by franciosdelpech on 3/10/16.
 */
'use strict';

import React, {Component, Navigator, Text, View} from 'react-native';
import {Router, Route, Schema} from 'react-native-router-flux';
import EventEmitter from 'EventEmitter';
import Home from './Home';
import layout from '../styles/layout';
import AppEventEmitter from '../services/eventEmitter';

export default class RootRouter extends Component {

  componentDidMount() {
    AppEventEmitter.addListener('hamburger.click', this.openControlPanel.bind(this));
  }

  componentWillUnMount() {
    AppEventEmitter.removeListener('hamburger.click');
  }

  closeControlPanel(navigation) {
    if(navigation.type == 'AFTER_ROUTER_ROUTE') {
      this.refs.drawer.close();
    }
  }

  render() {
    return(

        <View style={layout.layout}>

          <Router hideNavBar={false} dispatch={this.closeControlPanel.bind(this)}>
            <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
            <Route name="login" component={Login} />
            <Route name="home" wrapRouter={false} component={Home} initial={true} title="Home" />
          </Router>
        </View>
    );
  }
}