/*
 * @Author: wangtao
 * @Date: 2020-06-28 15:43:56
 * @LastEditors: 汪滔
 * @LastEditTime: 2020-10-12 11:28:44
 * @Description: 首页
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { iconHomeCoffee, iconHomeGray } from "@/images";
import { Button, msg } from "@/common";

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

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    justifyContent: "center"
  }
});
