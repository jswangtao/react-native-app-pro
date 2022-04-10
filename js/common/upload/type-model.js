/*
 * @Author: wangtao
 * @Date: 2020-06-29 16:32:41
 * @LastEditors: 汪滔
 * @LastEditTime: 2021-11-22 19:08:14
 * @Description: file content
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  mainBgColorLightGray,
  mainBgColorWhite,
  fontColorBlack,
  screenWidth,
  px2dp,
  screenHeight,
  isAndroid,
} from '@/styles';
import { _ } from '@/common';

export default class TypeModel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { onChange, selectImg } = this.props;

    return (
      <Modal
        animationType='slide'
        transparent
        visible
        onRequestClose={() => {
          onChange('isShowTypeSelect', false);
        }}
        onShow={() => {}}
      >
        <TouchableOpacity
          style={styles.mask}
          onPress={() => {
            onChange('isShowTypeSelect', false);
          }}
        />
        <View style={[styles.infoContainer]}>
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onChange('isShowTypeSelect', false);
                selectImg('WatermarkCamera');
              }}
            >
              <Text style={styles.itemTxt}>水印相机</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onChange('isShowTypeSelect', false);
                selectImg('image');
              }}
            >
              <Text style={styles.itemTxt}>本地相册</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  // 提交
  submit = () => {};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainBgColorLightGray,
    justifyContent: 'center',
  },
  mask: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  infoContainer: {
    width: screenWidth,
    maxHeight: 0.5 * screenHeight,
    backgroundColor: mainBgColorWhite,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: px2dp(12),
    overflow: 'hidden',
    zIndex: 10,
    ..._.ifIphoneX(
      { paddingBottom: px2dp(60) },
      isAndroid ? { paddingBottom: px2dp(0) } : { paddingBottom: px2dp(0) },
    ),
  },

  body: {
    // minHeight: px2dp(200)
  },
  item: {
    height: px2dp(88),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTxt: {
    fontSize: px2dp(32),
    color: fontColorBlack,
  },
});
