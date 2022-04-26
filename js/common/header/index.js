import React, { Component } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import msg from "../msg";
import { screenWidth, px2dp } from "../styles";
import BackImageOn from "../back-image-on";
import { getStatusBarHeight } from "../util";

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
    const { style } = this.props;
    return (
      <>
        <View style={[styles.statusBar, { height: getStatusBarHeight() }]}></View>
        <View style={[styles.container, style]}>
          {this._renderLeft()}
          {this._renderTitle()}
          {this._renderRight()}
        </View>
      </>
    );
  }

  /**
   * 渲染左边区域
   *
   * @returns {XML}
   * @private
   */
  _renderLeft() {
    const { renderLeft, leftStyle } = this.props;
    if (renderLeft) {
      return <View style={[styles.leftContainer, leftStyle]}>{renderLeft()}</View>;
    }
    return <BackImageOn onClick={this._handleBack} style={styles.leftContainer} />;
  }

  /**
   * 渲染右侧区域
   *
   * @returns {XML}
   * @private
   */
  _renderRight() {
    const { renderRight } = this.props;
    if (renderRight) {
      return <View style={styles.rightContainer}>{renderRight()}</View>;
    }
  }

  /**
   * 渲染标题
   *
   * @returns {*}
   * @private
   */
  _renderTitle() {
    const { renderTitle, titleStyle, title } = this.props;
    if (renderTitle) {
      return renderTitle();
    }
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, titleStyle]} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
          {title}
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
    const { onLeftMenuPress } = this.props;
    if (onLeftMenuPress) {
      onLeftMenuPress();
    } else {
      msg.emit("router: back");
    }
  };
}

const styles = StyleSheet.create({
  statusBar: {
    width: screenWidth,
    backgroundColor: "rgba(255,255,255,1)"
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: px2dp(88),
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "#ebebeb",
    borderBottomWidth: 2 / PixelRatio.get(),
    position: "relative"
  },
  leftContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    zIndex: 1
  },
  img: {
    width: px2dp(36),
    height: px2dp(36)
    // tintColor: '#000'
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: "#000",
    fontSize: px2dp(36),
    fontWeight: "bold"
  },
  rightContainer: {
    // height: isAndroid ? 50 : 45,
    position: "absolute",
    right: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
