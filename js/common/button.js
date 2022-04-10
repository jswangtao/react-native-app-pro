/*
 * @Author: wangtao
 * @Date: 2020-06-24 18:11:19
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-10 23:37:16
 * @Description: Button公共组件
 */

import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Keyboard, ActivityIndicator } from "react-native";

import { px2dp } from "./styles";
import { color_primary } from "./styles/theme";

/**
 * 按钮组件
 */
export default class Button extends Component {
  static defaultProps = {
    text: "确定",
    disabled: false,
    processing: false
  };

  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.disabled !== this.state.disabled) {
  //     this.setState({ disabled: nextProps.disabled })
  //   }
  // }
  static getDerivedStateFromProps(props, state) {
    if (props.disabled !== state.disabled) {
      return {
        disabled: props.disabled
      };
    }

    return null;
  }

  componentWillUnmount() {
    // Button的timer默认是setTimeout，用于防止过快重复点击按钮。SendButton的timer是setInterval，倒计时60秒
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { text } = this.props;

    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity style={this.getBtnStyle()} onPress={this.handleClick} disabled={this.props.disabled}>
          <Text allowFontScaling={false} style={styles.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 获取按钮框的样式
   * @returns {{}}
   */
  getBoxStyle = () => this.state.boxStyle;

  /**
   * 获取按钮的样式
   * @returns {{}}
   */
  getBtnStyle = () => this.state.btnStyle;

  /**
   * 获取按钮文本的样式
   * @returns {styles.longBtnText|{color, fontSize}|*}
   */
  getTextStyle = () => this.state.btnTextStyle;

  /**
   * 处理按钮点击事件
   * 防止重复提交可以把 onClick 的返回值定义为 Promise
   */
  handleClick = async () => {
    // 收起键盘
    Keyboard.dismiss();

    const { disabled } = this.props;
    const { processing } = this.state;

    if (disabled || processing) {
      return;
    }

    // 设置按钮状态执行操作中
    this.setState({
      processing: true
    });

    // 执行 onClick 方法
    await this.props.onClick();
    this.setState({
      processing: false
    });
  };
}

/**
 * 长按钮
 * <View>
 *    <TouchableOpcity>
 *      <Text>
 *          文本
 *      </Text>
 *    </TouchableOpacity>
 * </View>
 * 样式： boxStyle 控制View
 *       btnStyle 控制TouchableOpacity
 *       btnTextStyle 控制 Text
 */
export class LongButton extends Button {
  timer;

  constructor(props) {
    super(props);

    this.state = {
      isLock: false,
      boxStyle: this.props.boxStyle ? StyleSheet.flatten([styles.longBtnBox, this.props.boxStyle]) : styles.longBtnBox,
      btnStyle: this.props.btnStyle ? StyleSheet.flatten([styles.longBtn, this.props.btnStyle]) : styles.longBtn,
      btnTextStyle: this.props.btnTextStyle
        ? StyleSheet.flatten([styles.longBtnText, this.props.btnTextStyle])
        : styles.longBtnText
    };

    if (this.props.disabled || this.state.processing) {
      // 按钮样式
      this.state.btnStyle = StyleSheet.flatten([this.state.btnStyle, styles.disableBgColor]);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { disabled, processing } = nextProps
  //   if (disabled || processing) {
  //     //按钮样式
  //     this.setState({
  //       btnStyle: StyleSheet.flatten([
  //         this.state.btnStyle,
  //         styles.disableBgColor,
  //       ]),
  //     })
  //   } else {
  //     this.setState({
  //       btnStyle: StyleSheet.flatten([
  //         this.state.btnStyle,
  //         { backgroundColor: color_primary },
  //         this.props.btnStyle,
  //       ]),
  //     })
  //   }
  // }
  static getDerivedStateFromProps(props, state) {
    const { disabled, processing } = props;
    if (disabled || processing) {
      // 按钮样式
      return {
        btnStyle: StyleSheet.flatten([state.btnStyle, styles.disableBgColor])
      };
    }
    return {
      btnStyle: StyleSheet.flatten([state.btnStyle, { backgroundColor: color_primary }, props.btnStyle])
    };
  }

  render() {
    const { text } = this.props;
    console.log("🚀🚀🚀wimi======>>>color_primary", color_primary);
    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity style={this.getBtnStyle()} onPress={this._handleClick} disabled={this.props.disabled}>
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleClick = () => {
    if (this.state.isLock) {
      return;
    }

    this.setState(
      {
        isLock: true,
        btnStyle: StyleSheet.flatten([this.state.btnStyle, styles.disableBgColor])
      },
      async () => {
        await this.handleClick();
        this.setState({
          boxStyle: this.props.boxStyle
            ? StyleSheet.flatten([styles.longBtnBox, this.props.boxStyle])
            : styles.longBtnBox,
          btnStyle: this.props.btnStyle ? StyleSheet.flatten([styles.longBtn, this.props.btnStyle]) : styles.longBtn,
          btnTextStyle: this.props.btnTextStyle
            ? StyleSheet.flatten([styles.longBtnText, this.props.btnTextStyle])
            : styles.longBtnText
        });
        if (this.props.disabled || this.state.processing) {
          // 按钮样式
          this.setState({
            btnStyle: StyleSheet.flatten([this.state.btnStyle, styles.disableBgColor])
          });
        }
      }
    );
    this.timer = setTimeout(() => this.setState({ isLock: false }), 600);
  };
}

/**
 * 无背景长按钮
 */
export class LongSimpleButton extends Button {
  constructor(props) {
    super(props);
    this.state = {
      boxStyle: styles.longBtnBox,
      btnStyle: styles.longSimpleBtn,
      btnTextStyle: styles.longSimpleBtnText
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { disabled, processing } = nextProps
  //   if (disabled || processing) {
  //     //按钮样式
  //     this.setState({
  //       btnStyle: StyleSheet.flatten([
  //         this.state.btnStyle,
  //         styles.disableBgColor,
  //       ]),
  //     })
  //   } else {
  //     this.setState({
  //       btnStyle: StyleSheet.flatten([
  //         this.state.btnStyle,
  //         { backgroundColor: color_primary },
  //       ]),
  //     })
  //   }
  // }
  static getDerivedStateFromProps(props, state) {
    const { disabled, processing } = props;
    if (disabled || processing) {
      // 按钮样式
      return {
        btnStyle: StyleSheet.flatten([state.btnStyle, styles.disableBgColor])
      };
    }
    return {
      btnStyle: StyleSheet.flatten([state.btnStyle, { backgroundColor: color_primary }])
    };
  }

  render() {
    const { text } = this.props;
    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity style={this.getBtnStyle()} onPress={this.handleClick} disabled={this.props.disabled}>
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/**
 * 验证码按钮
 */
export class SendButton extends Button {
  static defaultProps = {
    text: "获取验证码",
    time: 60
  };

  constructor(props) {
    super(props);
    this.state = {
      btnStyle: this.props.btnStyle ? StyleSheet.flatten([styles.sendBtn, this.props.btnStyle]) : styles.sendBtn,
      btnTextStyle: this.props.btnTextStyle
        ? StyleSheet.flatten([styles.sendText, this.props.btnTextStyle])
        : styles.sendText,
      // 按钮禁用
      btnDisable: false,
      // 默认倒计时时间
      time: this.props.time,
      // 文本
      text: this.props.text
    };

    if (this.props.disabled || this.state.btnDisable) {
      // 按钮样式
      this.state.btnStyle = StyleSheet.flatten([this.state.btnStyle, styles.disableBgColor]);
      // 按钮文本样式
      this.state.btnTextStyle = StyleSheet.flatten([this.state.btnTextStyle, styles.disableColor]);
    }
  }

  componentWillUnmount() {
    // SendButton的timer是setInterval，倒计时60秒
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { btnDisable, text, time } = this.state;

    const { disabled } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={this.getBtnStyle()}
        onPress={!disabled && !btnDisable ? this._handlePress : null}
        disabled={disabled}
      >
        <Text style={this.getTextStyle()} allowFontScaling={false}>
          {disabled ? text : !btnDisable ? text : `${time}秒后重发`}
        </Text>
      </TouchableOpacity>
    );
  }

  /**
   * 重新发送短信
   */
  _handlePress = () => {
    if (this.props.clickValid && this.props.clickValid() === false) {
      return;
    }

    this.setState(
      {
        time: this.props.time,
        btnDisable: true,
        btnStyle: StyleSheet.flatten([this.state.btnStyle, styles.disableBdColor, this.props.disableBdColor]),
        btnTextStyle: StyleSheet.flatten([this.state.btnTextStyle, styles.disableColor])
      },
      async () => {
        const clickResult = this.props.onClick();
        if (clickResult instanceof Promise) {
          clickResult.catch(() => {
            // 异常情况是否重置按钮
            if (this.props.resetWhenError) {
              this.setState({
                btnStyle: this.props.btnStyle
                  ? StyleSheet.flatten([styles.sendBtn, this.props.btnStyle])
                  : styles.sendBtn,
                btnTextStyle: this.props.btnTextStyle
                  ? StyleSheet.flatten([styles.sendText, this.props.btnTextStyle])
                  : styles.sendText,
                // 默认倒计时时间
                time: this.props.time,
                // 文本
                text: this.props.text,
                // 按钮禁用
                btnDisable: false
              });
              clearInterval(this.timer);
            }
          });
        }
        await this._doCount();
      }
    );
  };

  /**
   * 计时器倒计时
   */
  _doCount = () => {
    const { callback } = this.props;
    this.timer = setInterval(() => {
      if (this.state.time === 1) {
        // 添加回调
        callback && callback();
        clearInterval(this.timer);
        this.setState({
          btnDisable: false,
          btnStyle: this.props.btnStyle ? StyleSheet.flatten([styles.sendBtn, this.props.btnStyle]) : styles.sendBtn,
          btnTextStyle: this.props.btnTextStyle
            ? StyleSheet.flatten([styles.sendText, this.props.btnTextStyle])
            : styles.sendText
        });

        if (this.props.disabled || this.state.processing || this.state.btnDisable) {
          // 按钮样式
          this.setState({
            btnStyle: StyleSheet.flatten([this.state.btnStyle, styles.disableBdColor, this.props.disableBdColor]),
            btnTextStyle: StyleSheet.flatten([this.state.btnTextStyle, styles.disableColor])
          });
        }
      }
      this.setState({
        time: this.state.time - 1
      });
    }, 1000);
  };
}

/**
 * Submit
 */
export class Submit extends Button {
  constructor(props) {
    super(props);
    this.state = {
      boxStyle: this.props.boxStyle ? StyleSheet.flatten([styles.submitBox, this.props.boxStyle]) : styles.submitBox,
      btnStyle: this.props.btnStyle ? StyleSheet.flatten([styles.submitBtn, this.props.btnStyle]) : styles.submitBtn,
      btnTextStyle: this.props.btnTextStyle
        ? StyleSheet.flatten([styles.submitBtnText, this.props.btnTextStyle])
        : styles.submitBtnText
    };
    if (this.props.disabled || this.state.processing) {
      // 按钮样式
      this.state.boxStyle = StyleSheet.flatten([this.state.boxStyle, styles.disablePoorBgColor]);
      this.state.btnStyle = StyleSheet.flatten([this.state.btnStyle, styles.disablePoorBdColor]);
      this.state.btnTextStyle = StyleSheet.flatten([this.state.btnTextStyle, styles.disablePoorColor]);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if ((nextProps && nextProps.disabled) || this.state.processing) {
  //     this.setState({
  //       boxStyle: StyleSheet.flatten([
  //         this.state.boxStyle,
  //         styles.disablePoorBgColor,
  //       ]),
  //       btnStyle: StyleSheet.flatten([
  //         this.state.btnStyle,
  //         styles.disablePoorBdColor,
  //       ]),
  //       btnTextStyle: StyleSheet.flatten([
  //         this.state.btnTextStyle,
  //         styles.disablePoorColor,
  //       ]),
  //     })
  //   } else {
  //     this.setState({
  //       boxStyle: this.props.boxStyle
  //         ? StyleSheet.flatten([styles.submitBox, this.props.boxStyle])
  //         : styles.submitBox,
  //       btnStyle: this.props.btnStyle
  //         ? StyleSheet.flatten([styles.submitBtn, this.props.btnStyle])
  //         : styles.submitBtn,
  //       btnTextStyle: this.props.btnTextStyle
  //         ? StyleSheet.flatten([styles.submitBtnText, this.props.btnTextStyle])
  //         : styles.submitBtnText,
  //     })
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if ((props && props.disabled) || state.processing) {
      return {
        boxStyle: StyleSheet.flatten([state.boxStyle, styles.disablePoorBgColor]),
        btnStyle: StyleSheet.flatten([state.btnStyle, styles.disablePoorBdColor]),
        btnTextStyle: StyleSheet.flatten([state.btnTextStyle, styles.disablePoorColor])
      };
    }
    return {
      boxStyle: props.boxStyle ? StyleSheet.flatten([styles.submitBox, props.boxStyle]) : styles.submitBox,
      btnStyle: props.btnStyle ? StyleSheet.flatten([styles.submitBtn, props.btnStyle]) : styles.submitBtn,
      btnTextStyle: props.btnTextStyle
        ? StyleSheet.flatten([styles.submitBtnText, props.btnTextStyle])
        : styles.submitBtnText
    };
  }

  render() {
    const { text, animating = false } = this.props;
    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity
          style={[this.getBtnStyle(), { flexDirection: "row" }]}
          onPress={this._handleClick}
          disabled={this.props.disabled}
        >
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
          {animating && <ActivityIndicator style={[styles.centering]} color="#FFFFFF" size="small" />}
        </TouchableOpacity>
      </View>
    );
  }

  _handleClick = () => {
    this.setState(
      {
        // 按钮样式
        boxStyle: StyleSheet.flatten([this.state.boxStyle, styles.disablePoorBgColor]),
        btnStyle: StyleSheet.flatten([this.state.btnStyle, styles.disablePoorBdColor]),
        btnTextStyle: StyleSheet.flatten([this.state.btnTextStyle, styles.disablePoorColor])
      },
      async () => {
        await this.handleClick();
        if (this.props.disabled || this.state.processing) {
          // 按钮样式
          this.setState({
            boxStyle: StyleSheet.flatten([this.state.boxStyle, styles.disablePoorBgColor]),
            btnStyle: StyleSheet.flatten([this.state.btnStyle, styles.disablePoorBdColor]),
            btnTextStyle: StyleSheet.flatten([this.state.btnTextStyle, styles.disablePoorColor])
          });
        } else {
          this.setState({
            boxStyle: this.props.boxStyle
              ? StyleSheet.flatten([styles.submitBox, this.props.boxStyle])
              : styles.submitBox,
            btnStyle: this.props.btnStyle
              ? StyleSheet.flatten([styles.submitBtn, this.props.btnStyle])
              : styles.submitBtn,
            btnTextStyle: this.props.btnTextStyle
              ? StyleSheet.flatten([styles.submitBtnText, this.props.btnTextStyle])
              : styles.submitBtnText
          });
        }
      }
    );
  };
}

const styles = StyleSheet.create({
  // begin disable style
  disableBdColor: {
    borderColor: "#CDCCC9"
  },
  disableBgColor: {
    backgroundColor: "#CDCCC9"
  },
  disableColor: {
    color: "#CDCCC9"
  },
  // end disable style

  // begin poorDisable style
  disablePoorBdColor: {
    borderColor: "#e1e1e1"
  },
  disablePoorBgColor: {
    // backgroundColor: '#e1e1e1',
    opacity: 0.6
  },
  disablePoorColor: {
    color: "#FFFFFF"
  },
  // end poorDisable style

  // begin longBtn
  longBtnBox: {
    width: px2dp(640),
    height: px2dp(96),
    overflow: "hidden",
    backgroundColor: color_primary,
    alignItems: "center",
    justifyContent: "center"
  },
  longBtn: {
    flex: 1,
    width: "100%",
    backgroundColor: color_primary,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  longBtnText: {
    color: "#fff",
    fontSize: 16
  },
  longSimpleBtn: {
    backgroundColor: "#fff",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ebebeb",
    borderWidth: 1
  },
  longSimpleBtnText: {
    color: "#333",
    fontSize: 16
  },
  // end longBtn

  // begin sendBtn
  sendBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    // backgroundColor: '#fff',
    // borderWidth: 1 / PixelRatio.get(),
    // borderColor: '#000',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5
  },
  sendText: {
    fontSize: 14,
    color: color_primary
  },
  // end sendBtn

  // begin submit
  submitBox: {
    width: 94,
    height: 48,
    backgroundColor: color_primary,
    alignItems: "center",
    justifyContent: "center"
  },
  submitBtn: {
    // borderWidth: 1,
    // borderColor: '#cb4255',
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  submitBtnText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center"
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8
  }
  // end submit
});
