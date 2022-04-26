/*
 * @Author: wangtao
 * @Date: 2020-06-24 18:11:19
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-26 23:34:17
 * @Description: input公共组件 模仿u-input
 */

import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Keyboard, PixelRatio, TextInput } from "react-native";

import {
  color_primary,
  color_success,
  color_warning,
  color_danger,
  color_white,
  border_color_base
} from "../styles/theme";
import XMIcon from "../icons";
import { px2dp } from "../styles";
const noop = () => {};

export default class Input extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="输入手机号" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 44,
    borderRadius: 4,
    borderColor: border_color_base,
    borderWidth: 2 / PixelRatio.get()
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    fontSize: 18
  }
});
