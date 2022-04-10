/*
 * @Author: wangtao
 * @Date: 2020-07-24 20:06:36
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-02-16 15:27:41
 * @Description: 为了适配沉浸式，并且很好的利用iOS的SafeAreaView，和安卓的StatusBar
 */

import React, { PureComponent } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { isAndroid } from "../styles";

export default class XMSafeAreaView extends PureComponent {
  render() {
    const { children, style } = this.props;
    return (
      <SafeAreaView style={[isAndroid && { paddingTop: StatusBar.currentHeight }, style]}>{children}</SafeAreaView>
    );
  }
}
