import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';
import { msg } from '../msg';
import { isAndroid, screenWidth } from '../styles';

/**
 * 公共header组件
 */
export default class Header extends Component {
  /**
   * view
   *
   * @returns {XML}
   */
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this._renderTitle()}
        {this._renderLeft()}
        {this._renderRight()}
        {this._renderRightSecond()}
      </View>
    );
  }

  /**
   * 渲染左边区域
   *
   * @returns {XML}
   * @private
   */
  _renderLeft() {
    if (this.props.renderLeft) {
      return <View style={styles.leftContainer}>{this.props.renderLeft()}</View>;
    }

    return ([
      <TouchableOpacity
        activeOpacity={0.2}
        style={[styles.leftImg]}
        onPress={() => this._handleBack()}
      >
        <Image
          style={[styles.img, this.props.imgStyle]}
          source={require('./go-back.png')}
        />
      </TouchableOpacity>,
      this.props.delImgHide !== 'hide' && (
        <TouchableOpacity
          activeOpacity={0.2}
          style={[styles.leftImg, { left: 50 }]}
          onPress={() => (this.props.delPress() ? this.props.delPress() : msg.emit('router: back'))}
        >
          <Image
            style={[{ height: 18, width: 18 }, this.props.imgStyle]}
            source={require('./del.png')}
          />
        </TouchableOpacity>
      ),
    ]);
  }

  /**
   * 渲染右侧区域
   *
   * @returns {XML}
   * @private
   */
  _renderRight() {
    if (this.props.renderRight) {
      return (
        <View style={[styles.rightContainer, this.props.renderRightSecond && styles.right40]}>{this.props.renderRight()}</View>
      );
    }
    return null;
  }

  /**
   * 渲染右侧第二区域
   * @private
   */
  _renderRightSecond() {
    if (this.props.renderRightSecond) {
      return (
        <View style={styles.rightSecondContainer}>{this.props.renderRightSecond()}</View>
      );
    }
    return null;
  }

  /**
   * 渲染标题
   *
   * @returns {*}
   * @private
   */
  _renderTitle() {
    if (this.props.renderTitle) {
      return this.props.renderTitle();
    }
    return (
      <View style={styles.titleContainer}>
        <Text
          style={[styles.titleText, this.props.titleStyle]}
          allowFontScaling={false}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {this.props.title}
        </Text>
      </View>
    );
  }

  /**
   * 处理返回
   * 默认pop路由,除非有自定义的处理
   *
   * @private
   */
  _handleBack = () => {
    if (this.props.onLeftMenuPress) {
      this.props.onLeftMenuPress();
    } else {
      msg.emit('router: back');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    width: screenWidth,
    borderColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  leftImg: {
    height: isAndroid ? 50 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
    // width:isAndroid ? 50 : 45,
  },
  img: {
    width: 20,
    height: 20,
    // tintColor: '#000'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    fontSize: 18,
    fontWeight: isAndroid ? '400' : 'bold',
  },
  rightContainer: {
    height: isAndroid ? 50 : 45,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  right40: {
    right: 40,
  },
  leftContainer: {
    height: isAndroid ? 50 : 45,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
  },
  rightSecondContainer: {
    height: isAndroid ? 50 : 45,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
});
