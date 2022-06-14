/*
 * @Author: wangtao
 * @Date: 2020-06-29 11:01:03
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-14 18:17:33
 * @Description: tip组件
 */

import React, { PureComponent } from "react";

import { View, Text, StyleSheet } from "react-native";

import XMOverlay from "../overlay";
import Loading from "../loading";
import Icon from "../icons";

const noop = () => {};

export default class XMToast extends PureComponent {
  static defaultProps = {
    style: {},
    // 是否显示
    visible: false,
    // 显示的消息的内容
    title: "",
    // 是否模态
    mask: false,
    // 消失时间 当time=0时不限时间
    time: 2500,
    // tip消失后的callback
    complete: noop,
    // 提示图标
    icon: "",
    // 提示图标的颜色
    iconColor: "#67C23A"
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.visible) {
      if (props.time) {
        // 默认2s后关闭
        setTimeout(() => {
          props.complete();
          return {
            visible: false
          };
        }, props.time);
      }
      // 如果当前的属性为显示状态，则立刻去显示
      return {
        visible: true
      };
    }
    return {
      visible: false
    };
  }

  render() {
    // 如果不显示直接remove掉
    if (!this.state.visible) {
      return null;
    }
    return (
      <XMOverlay style={this.props.style} mask={this.props.mask}>
        <View style={[styles.tip, this.props.mask && styles.bgw]}>
          {this._renderIcon()}
          {this.props.title ? (
            <Text style={[styles.text, this.props.mask && styles.iconText]} allowFontScaling={false} numberOfLines={3}>
              {this.props.title}
            </Text>
          ) : null}
        </View>
      </XMOverlay>
    );
  }

  _renderIcon() {
    if (this.props.icon === "loading") {
      return <Loading />;
    }
    if (this.props.icon) {
      return <Icon name={this.props.icon} size={44} color={this.props.iconColor} />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  tip: {
    // flexDirection: 'row',
    alignItems: "center"
  },
  icon: {
    width: 55,
    height: 55
  },
  text: {
    color: "#FFF",
    fontSize: 16
  },
  bgw: {
    backgroundColor: "rgba(51, 50, 50, 0.9)",
    borderRadius: 8,
    width: 130,
    height: 100,
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 15
  },
  iconText: {
    color: "#eee",
    fontSize: 14
  }
});
