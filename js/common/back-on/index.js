/*
 * @Author: wangtao
 * @Date: 2020-07-24 20:06:36
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-12 21:54:08
 * @Description: file content
 */

import React, { PureComponent } from "react";
import { TouchableOpacity, Image } from "react-native";
import { px2dp } from "../styles";
import msg from "../msg";

export default class XMBackOn extends PureComponent {
  // 创建一个返回按钮的组件
  render() {
    const { onClick, style } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            width: px2dp(88),
            height: px2dp(88),
            justifyContent: "center",
            alignItems: "center"
            // backgroundColor: "pink"
          },
          style
        ]}
        onPress={() => {
          onClick ? onClick() : msg.emit("router:back");
        }}
      >
        <Image source={require("./go-back.png")} style={{ width: px2dp(36), height: px2dp(36) }} />
      </TouchableOpacity>
    );
  }
}
