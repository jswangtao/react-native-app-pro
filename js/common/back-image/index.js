/*
 * @Author: wangtao
 * @Date: 2020-07-24 20:06:36
 * @LastEditors: 汪滔
 * @LastEditTime: 2021-06-03 17:22:12
 * @Description: file content
 */

import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { isAndroid, px2dp } from '../styles';

export default class BackImage extends PureComponent { // 创建一个返回按钮的组件
  render() {
    return (
      <Image
        source={require('./go-back.png')}
        style={{ width: px2dp(36), height: px2dp(36), }}
      />
    );
  }
}
