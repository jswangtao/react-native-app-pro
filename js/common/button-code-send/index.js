/*
 * @Author: wangtao
 * @Date: 2020-06-24 18:11:19
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-26 22:11:30
 * @Description: 发送验证码
 */

import React from "react";

import Button from "../button";
const noop = () => {};
/**
 * SendCodeButton
 */
export default class SendCodeButton extends Button {
  static defaultProps = {
    text: "获取验证码",
    time: 60,
    clickValid: noop, //校验函数
    hairline: false,
    plain: true,
    type: "primary"
  };

  constructor(props) {
    super(props);
    this.state = {
      // 按钮禁用
      btnDisable: false,
      // 默认倒计时时间
      time: this.props.time,
      // 文本
      text: this.props.text
    };
  }

  componentWillUnmount() {
    // SendButton的timer是setInterval，倒计时60秒
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { btnDisable, text, time } = this.state;

    const { disabled, hairline, plain, type } = this.props;
    return (
      <Button
        {...this.props}
        text={disabled ? text : !btnDisable ? text : `${time}秒后重发`}
        type={type}
        hairline={hairline}
        plain={plain}
        onClick={() => {
          !disabled && !btnDisable ? this._handlePress() : null;
        }}
      />
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
        btnDisable: true
      },
      async () => {
        const clickResult = this.props.onClick && this.props.onClick();
        if (clickResult instanceof Promise) {
          clickResult.catch(() => {
            // 异常情况是否重置按钮
            if (this.props.resetWhenError) {
              this.setState({
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
          btnDisable: false
        });
      }
      this.setState({
        time: this.state.time - 1
      });
    }, 1000);
  };
}
