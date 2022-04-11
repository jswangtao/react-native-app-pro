/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-04-11 09:59:14
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { iconHomeCoffee, iconHomeGray } from "@/images";
import { Button, msg, Icon } from "@/common";
import api from "@/api";
// import Icon from "react-native-vector-icons/FontAwesome";

const { LongButton } = Button;

export default class Main extends Component {
  static navigationOptions = () => ({
    title: "首页",
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? iconHomeCoffee : iconHomeGray} style={{ width: 24, height: 24 }} />
    )
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
        <Icon name={"icon_edit"} size={24} color={"#999"} />

        <Text>this is Main</Text>
        <LongButton
          text="goTo测试页面"
          boxStyle={{ marginTop: 20 }}
          onClick={() => {
            msg.emit("router: goToNext", { routeName: "Test" });
          }}
        />
      </View>
    );
  }

  // 获取客服电话
  getCustomService = () => {
    const params = {
      code: "ydxlmkfdh"
    };
    api.user.getConfigValue(params).then(res => {
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
