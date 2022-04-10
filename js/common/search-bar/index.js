/*
 * @Author: wangtao
 * @Date: 2021-11-26 18:38:24
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-01-14 14:36:35
 * @Description: file content
 */
import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { px2dp, mainBgColorWhite, mainBgColorLightGray, fontColorBlack } from "../styles";

const noop = () => {};

export default class SearchBar extends React.Component {
  static defaultProps = {
    style: {},
    keyboardType: "default", // default number-pad decimal-pad numeric email-address phone-pad
    value: null, // 搜索框的值
    placeholder: "请输入", // 提示文本
    maxLength: 9999, // 输入的最大字符数
    clearable: true, // 是否启用清除图标，点击清除图标后会清空输入框
    showCancelButton: false, // 是否在搜索框右侧显示取消按钮
    cancelText: "取消", // 取消按钮的文案
    onSearch: noop, // 输入框回车时触发
    onChange: noop, // 输入框内容变化时触发
    onClear: noop, // 点击清除按钮后触发
    onCancel: noop // 点击取消按钮时触发
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    const {
      placeholder,
      maxLength,
      clearable,
      showCancelButton,
      cancelText,
      onSearch,
      onChange,
      onClear,
      onCancel,
      keyboardType,
      style,
      inputStyle
    } = this.props;
    const { value } = this.state;

    return (
      <View style={[styles.container, style]}>
        <View style={[styles.wrap, inputStyle]}>
          <Image style={styles.searchIcon} source={require("./img/icon_search_black.png")} />
          <TextInput
            style={styles.inp}
            placeholder={placeholder}
            placeholderTextColor="#CDCBC8"
            maxLength={maxLength}
            keyboardType={keyboardType}
            onChangeText={text => {
              onChange(text);
              this.setState({ value: text });
            }}
            value={value}
            onEndEditing={() => {
              onSearch();
            }}
          />
          {!!value && !!clearable && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onClear();
                this.setState({ value: "" });
                onChange("");
              }}
            >
              <Image style={styles.searchIcon} source={require("./img/icon_clear_gray.png")} />
            </TouchableOpacity>
          )}
        </View>
        {!!showCancelButton && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancelBtn}
            onPress={() => {
              onCancel();
            }}
          >
            <Text style={styles.cancel} source={require("./img/icon_clear_gray.png")}>
              {cancelText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: px2dp(95),
    backgroundColor: mainBgColorWhite,
    paddingVertical: px2dp(12),
    paddingHorizontal: px2dp(32),
    flexDirection: "row",
    alignItems: "center"
  },
  wrap: {
    flex: 1,
    height: px2dp(70),
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: px2dp(18),
    borderRadius: px2dp(35)
  },
  inp: {
    padding: 0,
    paddingHorizontal: px2dp(18),
    flex: 1
  },
  searchIcon: {
    width: px2dp(36),
    height: px2dp(36)
  },
  clearWrap: {
    position: "absolute",
    right: px2dp(140),
    top: px2dp(48),
    zIndex: 1
  },
  clearIcon: {
    width: px2dp(36),
    height: px2dp(36)
  },
  cancelBtn: {
    paddingLeft: px2dp(32)
  },
  cancel: {
    color: fontColorBlack,
    fontSize: px2dp(28)
  }
});
