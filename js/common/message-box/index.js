/*
 * @Author: wangtao
 * @Date: 2020-07-21 17:38:24
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-06 11:58:19
 * @Description: 可交互弹框 ;headerCancel 是否展示左上角 x 取消按钮，默认不展示；
 * okBtnBg 是否展示 实心确认按钮 默认false,如果需要实心确认按钮跟okText结合使用即可
 */

import React, { PureComponent } from "react";
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity, Modal } from "react-native";
import { screenWidth, px2dp } from "../../styles";

import msg from "../msg";
import { noop } from "../noop";
import { border_color_base, color_primary, color_text_primary } from "../theme";

/**
 * 公共MessageBox组件
 */
export default class MessageBox extends PureComponent {
  static defaultProps = {
    title: "",
    content: null,
    confirmFn: noop,
    cancelFn: noop,
    confirmText: "确定",
    cancelText: null,
    renderContent: noop,
    // 是否显示
    visible: false
  };

  render() {
    return (
      <Modal animationType="fade" transparent visible={this.props.visible} statusBarTranslucent>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => {
            msg.emit("app:messageBox", { isVisible: false });
          }}
        >
          <TouchableOpacity style={styles.containerWrap} activeOpacity={1} onPress={() => {}}>
            {/* 内容 */}
            {this._renderContent()}
            {/* 底部按钮 */}
            {this._renderFooter()}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  // 内容
  _renderContent = () => {
    const { title, content } = this.props;
    return (
      <View style={styles.contentWrap}>
        {!!title && <Text style={styles.titleText}>{title}</Text>}
        {!!content && <Text style={styles.descText}>{content}</Text>}
        {!content && !!this.props.renderContent && this.props.renderContent()}
      </View>
    );
  };

  // 底部按钮
  _renderFooter = () => {
    const { confirmText, cancelText, confirmFn, cancelFn } = this.props;
    return (
      <View style={styles.btn}>
        {!!cancelText && (
          <TouchableOpacity
            style={[styles.btnLeft]}
            onPress={() => {
              msg.emit("app:messageBox", { isVisible: false });
              cancelFn && cancelFn();
            }}
          >
            <Text style={styles.btnLeftText}>{cancelText}</Text>
          </TouchableOpacity>
        )}
        {!!cancelText && !!confirmText && <View style={[styles.middleSpliteLine]} />}
        {!!confirmText && (
          <TouchableOpacity
            style={styles.btnRight}
            onPress={() => {
              msg.emit("app:messageBox", { isVisible: false });
              confirmFn && confirmFn();
            }}
          >
            <Text style={styles.btnRightText}>{confirmText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  containerWrap: {
    width: px2dp(600),
    borderRadius: px2dp(12),
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  contentWrap: {
    minHeight: px2dp(188),
    paddingHorizontal: px2dp(48),
    paddingTop: px2dp(56),
    paddingBottom: px2dp(48),
    alignItems: "center"
  },
  titleText: {
    fontSize: px2dp(36),
    fontWeight: "bold",
    textAlign: "center"
  },
  descText: {
    fontSize: px2dp(28),
    lineHeight: px2dp(38),
    color: color_text_primary,
    textAlign: "center",
    marginTop: px2dp(28)
  },

  btn: {
    height: px2dp(106),
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: border_color_base,
    flexDirection: "row"
  },
  btnLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnLeftText: {
    fontSize: px2dp(36)
  },
  middleSpliteLine: {
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: border_color_base
  },
  btnRightText: {
    fontSize: px2dp(36),
    color: color_primary
  },
  btnRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
