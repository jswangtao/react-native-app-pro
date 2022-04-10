/*
 * @Author: wangtao
 * @Date: 2020-06-29 11:01:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-12 15:47:48
 * @Description: tip组件
 */

import React, { PureComponent } from 'react';

import {
  View, Text, Image, StyleSheet, BackHandler,
} from 'react-native';

import Overlay from './overlay';

const noop = () => {};

export default class Tip extends PureComponent {
  static defaultProps = {
    // 是否显示
    visible: false,
    // 显示的消息的内容
    text: '',
    // 是否模态
    modal: false,
    // 消失时间 当time=false时不限时间
    time: 2000,
    // tip消失后的callback
    onTipDisappear: noop,
    // 提示图标，目前仅支持success和warning，其他需传入icon图片
    icon: '',
    // 支付loading
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.visible) {
      if (props.time) {
        // 默认2s后关闭
        setTimeout(() => {
          props.onTipDisappear();
          return {
            visible: false,
          };
        }, props.time);
      }
      // 如果当前的属性为显示状态，则立刻去显示
      return {
        visible: true,
      };
    }
    return {
      visible: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
  }

  render() {
    // 如果不现实直接remove掉
    if (!this.state.visible) {
      return null;
    }
    return (
      <Overlay
        style={[
          this.props.icon && { backgroundColor: 'rgba(0,0,0,0.1)' },
          this.props.style,
        ]}
        modal={this.props.modal}
        icon={this.props.icon}
      >
        <View style={[styles.tip, this.props.icon && styles.bgw]}>
          {this._renderIcon()}
          {this.props.text ? (
            <Text
              style={[styles.text, this.props.icon && styles.iconText]}
              allowFontScaling={false}
              numberOfLines={3}
            >
              {this.props.text}
            </Text>
          ) : null}
          {this.props.loading && (
            <Image
              style={styles.loading}
              source={require('./img/loading.gif')}
            />
          )}
        </View>
      </Overlay>
    );
  }

  _onBackAndroid = () => {
    if (this.props.modal && this.props.visible) {
      return true;
    }
    return false;
  };

  _renderIcon() {
    if (this.props.icon === 'success') {
      return <Image style={styles.icon} source={require('./img/ok.png')} />;
    } if (this.props.icon === 'warning') {
      return (
        <Image style={styles.icon} source={require('./img/warning.png')} />
      );
    } if (this.props.icon === 'pay') {
      return <Image style={styles.icon} source={require('./img/pay.png')} />;
    } if (this.props.icon) {
      return <Image style={styles.icon} source={this.props.icon} />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  tip: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 55,
    height: 55,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
  bgw: {
    // backgroundColor: 'rgba(100,100,100,0.5)',
    borderRadius: 15,
    width: 130,
    height: 130,
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconText: {
    color: '#eee',
    fontSize: 18,
  },
  loading: {
    width: (159 / 38) * 10,
    height: 10,
    marginTop: 5,
  },
});
