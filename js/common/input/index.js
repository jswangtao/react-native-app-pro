/*
 * @Author: wangtao
 * @Date: 2020-06-24 18:11:19
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-02 20:00:39
 * @Description: input公共组件 模仿u-input
 */

import React, { Component, ReactElement } from "react";
import { TouchableOpacity, StyleSheet, View, TextInput } from "react-native";

import { color_text_regular, border_color_base, color_text_placeholder } from "../theme";
import XMIcon from "../icons";
const noop = () => {};

export default class Input extends Component {
  static defaultProps = {
    style: {},
    border: "surround", //边框类型，surround-四周边框，bottom-底部边框，none-无边框
    clearable: false, //是否显示清除控件
    type: "text", //输入框类型   password
    placeholderTextColor: color_text_placeholder,
    prefixIcon: "",
    prefixIconSize: 28,
    prefixIconColor: color_text_regular,
    suffixIcon: "",
    suffixIconSize: 28,
    suffixIconColor: color_text_regular,
    prefix: ReactElement,
    suffix: ReactElement,
    onChangeText: noop
  };
  constructor(props) {
    super(props);
    this.state = {
      boxStyle: props.style ? StyleSheet.flatten([styles.container, props.style]) : styles.container,
      value: props.value,
      type: props.type,
      secureTextEntry: props.secureTextEntry || props.type === "password"
    };
  }

  render() {
    const {
      clearable,
      placeholderTextColor,
      prefixIcon,
      prefixIconSize,
      prefixIconColor,
      suffixIcon,
      suffixIconSize,
      suffixIconColor,
      prefix,
      suffix
    } = this.props;
    const { value, type, secureTextEntry } = this.state;
    return (
      <View style={this.getBoxStyle()}>
        {prefix}
        {!!prefixIcon && (
          <XMIcon name={prefixIcon} size={prefixIconSize} color={prefixIconColor} style={{ marginRight: 4 }} />
        )}
        <TextInput
          {...this.props}
          style={styles.input}
          placeholderTextColor={placeholderTextColor}
          clearButtonMode="never"
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={this._onChangeText}
        />

        {type === "password" && (
          <TouchableOpacity onPress={this._onChangeSecureTextEntry}>
            <XMIcon
              name={secureTextEntry ? "eye-close" : "eye"}
              size={suffixIconSize}
              color={suffixIconColor}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        )}

        {!!suffixIcon && (
          <XMIcon name={suffixIcon} size={suffixIconSize} color={suffixIconColor} style={{ marginLeft: 4 }} />
        )}
        {!!clearable && !!value && (
          <TouchableOpacity onPress={this._onClear}>
            <XMIcon name={"round_close_fill"} size={18} color={border_color_base} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
        {suffix}
      </View>
    );
  }

  // 切换密码框
  _onChangeSecureTextEntry = () => {
    const { secureTextEntry } = this.state;
    this.setState({ secureTextEntry: !secureTextEntry });
  };

  // 清除
  _onClear = () => {
    const { onChangeText } = this.props;
    this.setState({ value: "" });
    onChangeText("");
  };

  _onChangeText = text => {
    const { onChangeText } = this.props;
    this.setState({ value: text });
    onChangeText(text);
  };

  getBoxStyle = () => {
    const { border } = this.props;
    let { boxStyle } = this.state;

    if (border === "bottom") {
      boxStyle = StyleSheet.flatten([boxStyle, { borderWidth: 0, borderBottomWidth: 1 }]);
    }
    if (border === "none") {
      boxStyle = StyleSheet.flatten([boxStyle, { borderWidth: 0 }]);
    }

    return boxStyle;
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 44,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderColor: border_color_base,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    fontSize: 18
  }
});
