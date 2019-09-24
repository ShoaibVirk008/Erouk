
import React, { Component } from 'react';
import { AppRegistry, AppState, StatusBar, AsyncStorage, Text, NetInfo } from 'react-native';

import AppNavigation from '../Navigation/AppNavigation';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
            <AppNavigation />
      );
  }
}




