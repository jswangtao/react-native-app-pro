/*
 * @Author: wangtao
 * @Date: 2020-07-21 17:38:24
 * @LastEditors: 汪滔
 * @LastEditTime: 2021-06-07 10:44:38
 * @Description: 可交互弹框 ;headerCancel 是否展示左上角 x 取消按钮，默认不展示；
 * okBtnBg 是否展示 实心确认按钮 默认false,如果需要实心确认按钮跟okText结合使用即可
 */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {
  screenWidth,
  screenHeight,
  px2dp,
  mainBgColorWhite,
  fontColorBlack,
  fontColorCoffee,
  splitLineColorLightGray,
  fontColorSecDeepGray,
} from '../styles';

import msg from '../msg';
import { noop } from '../noop';

/**
 * 公共MessageBox组件
 */
export default class MessageBox extends PureComponent {
  static defaultProps = {
    title: '',
    text: null,
    okFn: noop,
    cancelFn: noop,
    okText: '确定',
    cancelText: null,
    imgSource: null,
    isClickBg: true
  };

  render() {
    const { headerCancel = false, isClickBg } = this.props;
    return (
      <Modal animationType='fade' transparent visible>
        {
          headerCancel ?
            <View style={styles.container}>
              <View style={styles.containerWrap}>
                <View style={styles.cancelBox}>
                  <TouchableOpacity
                    style={[styles.cancelBtn, { flex: 1 }]}
                    activeOpacity={0.8}
                    onPress={() => {
                      msg.emit('app:messageBox', { isVisible: false });
                    }}
                  >
                    <Image style={styles.cancelImg} source={require('./close.png')} />
                  </TouchableOpacity>
                </View>
                {/* 内容 */}
                {this._renderContent()}
                {/* 底部按钮 */}
                {this._renderFooter()}
              </View>
            </View>
            :
            <TouchableOpacity
              style={styles.container}
              activeOpacity={1}
              onPress={() => {
                if (isClickBg) {
                  msg.emit('app:messageBox', { isVisible: false });
                }
              }}
            >
              <TouchableOpacity
                style={styles.containerWrap}
                activeOpacity={1}
                onPress={() => { }}
              >
                {/* 内容 */}
                {this._renderContent()}
                {/* 底部按钮 */}
                {this._renderFooter()}
              </TouchableOpacity>
            </TouchableOpacity>
        }

      </Modal>
    );
  }

  // 内容
  _renderContent = () => {
    const {
      title,
      text,
      secText,
      imgSource,
    } = this.props;
    return (
      <View style={styles.contentWrap}>
        {!!title && <Text style={styles.titleText}>{title}</Text>}
        {!!imgSource && (
          <Image source={imgSource} resizeMode='contain' style={styles.img} />
        )}
        {!!text && <Text style={styles.descText}>{text}</Text>}
        {!!secText && <Text style={styles.secText}>{secText}</Text>}
      </View>
    );
  };

  // 底部按钮
  _renderFooter = () => {
    const { okText, cancelText, okFn, cancelFn, okBtnBg = false } = this.props;
    return (
      <View style={styles.btn}>
        {!!cancelText && (
          <TouchableOpacity
            style={[styles.btnLeft]}
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('app:messageBox', { isVisible: false });
              cancelFn && cancelFn();
            }}
          >
            <Text style={styles.btnLeftText}>{cancelText}</Text>
          </TouchableOpacity>
        )}
        {!!cancelText && !!okText && <View style={[styles.middleSpliteLine]} />}
        {!!okText && !okBtnBg ? (
          <TouchableOpacity
            style={styles.btnRight}
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('app:messageBox', { isVisible: false });
              okFn && okFn();
            }}
          >

            <Text style={styles.btnRightText}>{okText}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.booterBox}>
            <TouchableOpacity
              style={styles.btnRightTwo}
              activeOpacity={0.8}
              onPress={() => {
                msg.emit('app:messageBox', { isVisible: false });
                okFn && okFn();
              }}
            >

              <Text style={styles.btnRightTextTwo}>{okText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  containerWrap: {
    width: px2dp(600),
    borderRadius: px2dp(12),
    overflow: 'hidden',
    backgroundColor: mainBgColorWhite,
  },
  contentWrap: {
    minHeight: px2dp(188),
    paddingHorizontal: px2dp(48),
    paddingTop: px2dp(56),
    paddingBottom: px2dp(48),
    alignItems: 'center',
  },
  titleText: {
    fontSize: px2dp(36),
    color: fontColorBlack,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descText: {
    fontSize: px2dp(28),
    color: fontColorSecDeepGray,
    textAlign: 'center',
    marginTop: px2dp(28),
  },
  secText: {
    fontSize: px2dp(28),
    color: fontColorSecDeepGray,
    textAlign: 'center',
  },
  body: {},
  btn: {
    height: px2dp(106),
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: splitLineColorLightGray,
    flexDirection: 'row',
  },
  btnLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLeftText: {
    fontSize: px2dp(36),
    color: fontColorBlack,
  },
  middleSpliteLine: {
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: splitLineColorLightGray,
  },
  btnRightText: {
    fontSize: px2dp(36),
    color: fontColorCoffee,
  },
  btnRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: px2dp(240),
    height: px2dp(240),
    marginTop: px2dp(40),
    marginBottom: px2dp(12),
  },
  cancelBtn: {
    color: '#CCCAC8',
    paddingTop: px2dp(48),
    paddingLeft: px2dp(48),
    position: 'absolute',
  },
  cancelImg: {
    width: px2dp(28),
    height: px2dp(28),
  },
  booterBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: px2dp(20)
  },
  btnRightTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: px2dp(480),
    height: px2dp(80),
    backgroundColor: '#BA914A',
    borderRadius: px2dp(8)
  },
  btnRightTextTwo: {
    fontSize: px2dp(32),
    color: mainBgColorWhite
  },
  cancelBox: {
    width: px2dp(96),
    height: px2dp(96)
  }
});
