/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2022-02-19 20:29:30
 * @Description: 个人中心
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { iconUserCoffee, iconUserGray } from "@/images";
import { Button, msg } from "@/common";

const { LongButton } = Button;

export default class User extends Component {
  static navigationOptions = () => ({
    title: "我的",
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? iconUserCoffee : iconUserGray} style={{ width: 24, height: 24 }} />
    )
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
        <LongButton
          text="关于个人"
          boxStyle={{ marginTop: 20 }}
          onClick={() => {
            msg.emit("router: goToNext", { routeName: "About" });
          }}
        />
        <LongButton
          text="去登录"
          boxStyle={{ marginTop: 20 }}
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
