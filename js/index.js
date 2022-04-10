/*
 * @Author: wangtao
 * @Date: 2022-04-10 02:20:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-10 03:01:58
 * @Description: file content
 */
import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import AppContainer from './router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'rgba(0, 0, 0, 0)'}
        />
        <AppContainer />
      </View>
    );
  }
}

export default App;
