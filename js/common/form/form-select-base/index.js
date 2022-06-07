/*
 * @Author: wangtao
 * @Date: 2020-07-27 11:28:08
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-06-02 19:59:18
 * @Description: 不带可点击按钮的FormSelect样式
 */
import React from "react";
import { Image, PixelRatio, StyleSheet, Text, View } from "react-native";
import { px2dp, fontColorDeepRed } from "@/styles";

export default class FormSelectBase extends React.Component {
  static defaultProps = {
    style: null, // box样式
    label: "label文本", // label文本
    labelWidth: null, // label宽度
    labelStyle: null, // label样式
    placeholder: "请选择", // placeholder
    required: false, // 是否必须
    disabled: false, // 禁用
    icon: require("./img/icon_right.png"),
    iconVisible: true,
    textStyles: null, // 禁用文本样式和inputText样式
    renderContent: null, // 渲染内容
    renderRight: null // 右边小装饰
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style, label, labelWidth, labelStyle, required } = this.props;

    return (
      <View style={[styles.item, style]}>
        <Text style={[styles.text, labelWidth, labelStyle]} allowFontScaling={false}>
          <Text allowFontScaling={false} style={styles.red}>
            {required && "*"}
          </Text>
          {label}
        </Text>
        <View style={styles.right}>
          {this._renderContent()}
          {this._renderRightDecoration()}
        </View>
      </View>
    );
  }

  _renderContent = () => {
    const { selected, placeholder, textStyles } = this.props;
    return (
      <Text
        style={[styles.textRight, textStyles, selected && selected.value && { color: "#343332" }]}
        allowFontScaling={false}
        numberOfLines={1}
      >
        {selected && selected.value ? selected.value : placeholder}
      </Text>
    );
  };

  _renderRightDecoration = () => {
    const { icon, iconVisible, renderRight } = this.props;
    if (!iconVisible) {
      return null;
    }
    if (renderRight) {
      return renderRight();
    }
    return <Image source={icon} resizeMode="stretch" style={styles.img} />;
  };
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "#E6E6E6",
    marginBottom: 1 / PixelRatio.get(),
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 12,
    // paddingVertical: 15,
    backgroundColor: "#ffffff"
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  textRight: {
    fontSize: px2dp(28),
    color: "#CDCBC8",
    flex: 1,
    textAlign: "right"
  },
  img: {
    height: 14,
    width: 14,
    marginLeft: 6
  },
  text: {
    fontSize: px2dp(28),
    color: "#333",
    marginRight: px2dp(10)
  },
  red: {
    color: fontColorDeepRed
  }
});
