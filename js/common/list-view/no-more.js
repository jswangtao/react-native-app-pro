/*
 * @Author: wangtao
 * @Date: 2022-04-30 15:12:09
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-05-26 13:41:17
 * @Description: file content
 */
import React from "react";
import { Text, View } from "react-native";
export default class NoMore extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <View
        style={{
          height: 60,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ color: "#999" }}>{text}</Text>
      </View>
    );
  }
}
