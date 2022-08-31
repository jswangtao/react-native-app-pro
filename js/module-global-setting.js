/*
 * @Author: wangtao
 * @Date: 2022-06-06 11:04:07
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-08-31 09:53:42
 * @Description: file content
 */
import React from "react";
import { TouchableOpacity, Image, Platform, ScrollView, Text } from "react-native";

export default function () {
  // 不跟随系统字体大小和字体变化
  Text.defaultProps = { ...Text.defaultProps, allowFontScaling: false };
  const defaultFontFamily = {
    color: "#333333",
    ...Platform.select({
      android: { fontFamily: "" }
    })
  };
  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [defaultFontFamily, origin.props.style]
    });
  };

  TouchableOpacity.defaultProps = {
    ...TouchableOpacity.defaultProps,
    activeOpacity: 0.8
  };

  Image.defaultProps = {
    ...Image.defaultProps,
    resizeMode: "contain"
  };

  ScrollView.defaultProps = {
    ...ScrollView.defaultProps,
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false
  };
}
