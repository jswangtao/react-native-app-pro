/*
 * @Author: wangtao
 * @Date: 2020-09-08 16:51:16
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-12 17:15:20
 * @Description: file content
 */
import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';

import { px2dp } from '../styles';

/**
 * 列表为空
 */
export default class XMEmpty extends React.PureComponent {
  render() {
    const {
      emptyImg, desc, subDesc, renderFooter,
    } = this.props;
    return (
      <View style={[styles.emptyBox, this.props.boxStyle]}>
        <Image source={emptyImg} style={styles.img} />
        <Text allowFontSacling={false} style={styles.tips}>
          {desc}
        </Text>
        <Text allowFontSacling={false} style={styles.subTips}>
          {subDesc}
        </Text>
        {renderFooter && renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: px2dp(240),
    height: px2dp(240),
    resizeMode: 'contain',
  },
  tips: {
    color: '#999896',
    fontSize: px2dp(28),
    marginTop: 10,
  },
  subTips: {
    color: '#999896',
    fontSize: px2dp(28),
  },
  btn: {
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 30,
  },
  btnText: {
    fontSize: 16,
    color: '#000',
  },
});
