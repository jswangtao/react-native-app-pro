/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-14 23:58:16
 * @Description: 个人中心
 */

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { XMButton, msg, XMIcon } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";

export default class User extends Component {
  static navigationOptions = () => ({
    title: "我的",
    tabBarIcon: ({ focused }) => <XMIcon name={"mine"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>this is user</Text>
        <XMButton
          text="关于个人"
          style={{ marginTop: 20 }}
          onClick={() => {
            msg.emit("router: goToNext", { routeName: "About" });
          }}
        />
        <XMButton
          text="去登录"
          style={{ marginTop: 20 }}
          onClick={() => {
            msg.emit("router: goToNext", { routeName: "Login" });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
