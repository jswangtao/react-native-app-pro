/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: wangtao
 * @LastEditTime: 2022-10-30 15:05:23
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {} from "@/images";
import { msg, Icon, XMButton } from "@/common";
import { color_2A64F4, color_CCCCCC } from "@/styles";
import api from "@/api";

export default class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => <Icon name={"home1"} size={24} color={focused ? color_2A64F4 : color_CCCCCC} />
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCustomService();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="test" onPress={this.test}></Button>
      </View>
    );
  }

  test = () => {
    console.log("🚀🚀🚀wimi======>>>w222");
    msg.emit("router: goToNext", {
      routeName: "About"
    });
  };

  // 获取客服电话
  getCustomService = () => {
    const params = {
      code: "ydxlmkfdh"
    };
    api.user.getConfigValue(params).then(res => {
      console.log("🚀🚀🚀wimi======>>>res", res);
      if (res.success) {
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
