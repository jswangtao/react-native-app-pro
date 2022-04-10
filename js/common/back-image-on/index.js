/*
 * @Author: wangtao
 * @Date: 2020-07-24 20:06:36
 * @LastEditors: 汪滔
 * @LastEditTime: 2021-08-12 16:08:28
 * @Description: file content
 */

import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import BackImage from '../back-image';
import { px2dp } from '../styles';
import msg from '../msg';

export default class BackImageOn extends PureComponent {
  // 创建一个返回按钮的组件
  render() {
    const { onClick } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: px2dp(88),
          height: px2dp(88),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'pink'
        }}
        onPress={() => {
          onClick ? onClick() : msg.emit('router: back');
        }}
      >
        <BackImage />
      </TouchableOpacity>
    );
  }
}
