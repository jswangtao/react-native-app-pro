/*
 * @Author: wangtao
 * @Date: 2020-06-24 18:11:19
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-26 17:40:03
 * @Description: Button公共组件 模仿u-button
 */

import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Keyboard, PixelRatio, ActivityIndicator } from "react-native";

import { color_primary, color_success, color_warning, color_danger, color_white, border_color_base } from "../theme";
import XMIcon from "../icons";
const noop = () => {};
/**
 * Button
 */

let processing = false;

export default class Button extends Component {
  static defaultProps = {
    text: "确定",
    type: "default", // 按钮的样式类型 default / primary / danger/ warning / success
    disabled: false, // 是否禁用
    loading: false, // 按钮名称前是否带 loading 图标
    plain: false, // 按钮是否镂空，背景色透明
    hairline: true, // 是否显示按钮的细边框
    style: {}, // 样式
    icon: "",
    iconSize: 18,
    iconColor: "#999",
    onClick: noop
  };

  constructor(props) {
    super(props);

    this.state = {
      activeBtnStyle: props.disabled
        ? StyleSheet.flatten([styles.activeBtnStyle, { backgroundColor: color_white, opacity: 0.5 }])
        : styles.activeBtnStyle,
      boxStyle: props.style ? StyleSheet.flatten([styles.submitBox, props.style]) : styles.submitBox,
      btnStyle: props.btnStyle ? StyleSheet.flatten([styles.submitBtn, props.btnStyle]) : styles.submitBtn,
      btnTextStyle: props.btnTextStyle
        ? StyleSheet.flatten([styles.submitBtnText, props.btnTextStyle])
        : styles.submitBtnText
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props && props.disabled) {
  //     return {
  //       activeBtnStyle: StyleSheet.flatten([styles.activeBtnStyle, { backgroundColor: color_white, opacity: 0.5 }]),
  //       boxStyle: props.style ? StyleSheet.flatten([styles.submitBox, props.style]) : styles.submitBox,
  //       btnStyle: props.btnStyle ? StyleSheet.flatten([styles.submitBtn, props.btnStyle]) : styles.submitBtn,
  //       btnTextStyle: props.btnTextStyle
  //         ? StyleSheet.flatten([styles.submitBtnText, props.btnTextStyle])
  //         : styles.submitBtnText
  //     };
  //   }
  //   if (processing) {
  //     return {
  //       activeBtnStyle: StyleSheet.flatten([state.activeBtnStyle, { opacity: 0.15 }]),
  //       boxStyle: props.style ? StyleSheet.flatten([styles.submitBox, props.style]) : styles.submitBox,
  //       btnStyle: props.btnStyle ? StyleSheet.flatten([styles.submitBtn, props.btnStyle]) : styles.submitBtn,
  //       btnTextStyle: props.btnTextStyle
  //         ? StyleSheet.flatten([styles.submitBtnText, props.btnTextStyle])
  //         : styles.submitBtnText
  //     };
  //   }
  //   if (props && !props.disabled && !processing) {
  //     return {
  //       activeBtnStyle: styles.activeBtnStyle,
  //       boxStyle: props.style ? StyleSheet.flatten([styles.submitBox, props.style]) : styles.submitBox,
  //       btnStyle: props.btnStyle ? StyleSheet.flatten([styles.submitBtn, props.btnStyle]) : styles.submitBtn,
  //       btnTextStyle: props.btnTextStyle
  //         ? StyleSheet.flatten([styles.submitBtnText, props.btnTextStyle])
  //         : styles.submitBtnText
  //     };
  //   }
  //   return null;
  // }

  render() {
    const { text, loading, icon, iconSize, iconColor } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={this.getBoxStyle()}
        onPress={this._handleClick}
        onPressIn={this._handleClickActive}
        onPressOut={this._handleClickInActive}
        disabled={this.props.disabled}
      >
        <View style={this.getBtnStyle()}>
          {processing && loading && (
            <ActivityIndicator size="small" color={border_color_base} style={{ marginRight: 4 }} />
          )}
          {!!icon && <XMIcon name={icon} size={iconSize} color={iconColor} style={{ marginRight: 4 }} />}
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
        </View>
        <View style={this.getActiveBtnStyle()} />
      </TouchableOpacity>
    );
  }

  _handleClickActive = () => {
    // 设置按钮状态执行操作中
    processing = true;
    this.setState({
      activeBtnStyle: StyleSheet.flatten([styles.activeBtnStyle, { opacity: 0.15 }])
    });
  };
  _handleClickInActive = () => {
    processing = false;
    this.setState({
      activeBtnStyle: StyleSheet.flatten([styles.activeBtnStyle, { opacity: 0 }])
    });
  };

  /**
   * 获取按钮框的样式
   * @returns {{}}
   */
  getBoxStyle = () => {
    const { type, plain, hairline } = this.props;
    let { boxStyle } = this.state;
    if (type === "primary") {
      boxStyle = StyleSheet.flatten([boxStyle, { backgroundColor: color_primary, borderColor: color_primary }]);
    }
    if (type === "success") {
      boxStyle = StyleSheet.flatten([boxStyle, { backgroundColor: color_success, borderColor: color_success }]);
    }
    if (type === "warning") {
      boxStyle = StyleSheet.flatten([boxStyle, { backgroundColor: color_warning, borderColor: color_warning }]);
    }
    if (type === "danger") {
      boxStyle = StyleSheet.flatten([boxStyle, { backgroundColor: color_danger, borderColor: color_danger }]);
    }
    if (plain) {
      boxStyle = StyleSheet.flatten([boxStyle, { backgroundColor: "rgba(255,255,255,0)" }]);
    }
    if (!hairline) {
      boxStyle = StyleSheet.flatten([boxStyle, { borderWidth: 0 }]);
    }
    return boxStyle;
  };

  //
  getActiveBtnStyle = () => {
    const { disabled } = this.props;
    if (disabled) {
      return StyleSheet.flatten([styles.activeBtnStyle, { backgroundColor: color_white, opacity: 0.5 }]);
    }
    if (processing) {
      return StyleSheet.flatten([this.state.activeBtnStyle, { opacity: 0.15 }]);
    }
    return styles.activeBtnStyle;
  };

  /**
   * 获取按钮的样式
   */
  getBtnStyle = () => this.state.btnStyle;

  /**
   * 获取按钮文本的样式
   */
  getTextStyle = () => {
    const { type, plain } = this.props;
    let { btnTextStyle } = this.state;
    if (type === "primary" || type === "success" || type === "warning" || type === "danger") {
      btnTextStyle = StyleSheet.flatten([btnTextStyle, { color: color_white }]);
    }

    if (plain) {
      if (type === "primary") {
        btnTextStyle = StyleSheet.flatten([btnTextStyle, { color: color_primary }]);
      }
      if (type === "success") {
        btnTextStyle = StyleSheet.flatten([btnTextStyle, { color: color_success }]);
      }
      if (type === "warning") {
        btnTextStyle = StyleSheet.flatten([btnTextStyle, { color: color_warning }]);
      }
      if (type === "danger") {
        btnTextStyle = StyleSheet.flatten([btnTextStyle, { color: color_danger }]);
      }
    }
    return btnTextStyle;
  };

  /**
   * 处理按钮点击事件
   * 防止重复提交可以把 onClick 的返回值定义为 Promise
   */
  _handleClick = async () => {
    // 收起键盘
    Keyboard.dismiss();
    const { disabled } = this.props;

    if (disabled || processing) {
      return;
    }

    // 执行 onClick 方法
    await this.props.onClick();
  };
}

const styles = StyleSheet.create({
  activeBtnStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    position: "absolute",
    opacity: 0
  },

  // begin submit
  submitBox: {
    height: 44,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: color_white,
    alignSelf: "center" //这里不设置，会导致如果外部没有指定弹性布局方式会自动撑满父级，因为rn的display没有inline-block等属性，只有采取这种方式
  },
  submitBtn: {
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  submitBtnText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center"
  }
  // end submit
});
